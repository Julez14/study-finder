import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

mapboxgl.accessToken = "pk.eyJ1Ijoicm9uZWV0dG9waXdhbGEiLCJhIjoiY201c3d1eDh4MHBwZDJycGx6OTU5ZzgzbCJ9.GPkBHcra43wE672RVSDiFA";

const Map = ({ buildings }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Hardcode your 5 points here
  const fixedPoints = [
    [-79.918108, 43.265512], // Point 1
    [-79.917162, 43.265028], // Point 2
    [-79.916477, 43.263917], // Point 3
    [-79.918441, 43.260086], // Point 4
    [-79.919771, 43.259711]  // Point 5
  ];

  const createCustomMarkerElement = (status) => {
    const markerUrl = status
      ? "https://i.pinimg.com/originals/4d/52/e4/4d52e4cc8095c745dcf821c1ed568f78.png"
      : "https://djsaurbhofficial.wordpress.com/wp-content/uploads/2015/10/wpid-sdsddssds.png";
    const markerElement = document.createElement("div");
    markerElement.className = "custom-marker";
    markerElement.style.width = "25px";
    markerElement.style.height = "25px";
    markerElement.style.backgroundImage = `url(${markerUrl})`;
    markerElement.style.backgroundSize = "cover";
    return markerElement;
  };

  const getOptimizedRoute = async () => {
    try {
      // Wait for map style to be loaded
      if (!map.current.isStyleLoaded()) {
        await new Promise(resolve => {
          map.current.once('style.load', resolve);
        });
      }

      const coordinates = fixedPoints
        .map(point => `${point[0]},${point[1]}`)
        .join(';');

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}?alternatives=false&geometries=geojson&overview=full&steps=true&access_token=${mapboxgl.accessToken}`
      );

      if (!response.ok) throw new Error('Failed to fetch route');

      const data = await response.json();

      // Check if we have a valid route
      if (!data.routes || !data.routes[0] || !data.routes[0].geometry) {
        throw new Error('Invalid route data received');
      }

      // Remove existing route layer and source if they exist
      if (map.current.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeSource('route');
      }

      // Add the route source and layer
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: data.routes[0].geometry
        }
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#ff0000', // Darker blue color
          'line-width': 10,
          'line-opacity': 1.0,
        }
      });

      // Fit the map to show all points
      const bounds = new mapboxgl.LngLatBounds();
      fixedPoints.forEach(point => bounds.extend(point));

      // Update the route info HTML
      const routeInfo = document.createElement('div');
      routeInfo.className = 'route-info';
      routeInfo.innerHTML = `
      <h3>Walking Route</h3>
      <p>Total Distance: ${(data.routes[0].distance / 1000).toFixed(2)} km</p>
      <p>Estimated Time: ${Math.ceil(data.routes[0].duration / 60)} minutes</p>
`;
      
      const existingRouteInfo = mapContainer.current.querySelector('.route-info');
      if (existingRouteInfo) {
        existingRouteInfo.remove();
      }
      mapContainer.current.appendChild(routeInfo);

    } catch (error) {
      console.error('Error creating route:', error);
    }
  };

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/roneettopiwala/cm5sv19i300do01s31cs24ege",
      center: [-79.918476, 43.261129],
      zoom: 16,
      pitch: 65,
      bearing: 120,
    });

    map.current.on("load", () => {
      // Add the buildings markers
      if (buildings && buildings.length > 0) {
        buildings.forEach((building) => {
          new mapboxgl.Marker({
            element: createCustomMarkerElement(building.status),
          })
            .setLngLat(building.location)
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <h3>${building.name}</h3>
                <p>Status: ${building.status ? "Rooms Available" : "No Rooms"}</p>
              `)
            )
            .addTo(map.current);
        });
      }

      // Calculate and show the route
      getOptimizedRoute();
    }
  );

    map.current.addControl(new mapboxgl.NavigationControl());

    return () => map.current.remove();
  }, [buildings]);

  return <div ref={mapContainer} className="map-container"/>;
};

export default Map;