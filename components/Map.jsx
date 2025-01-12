import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9uZWV0dG9waXdhbGEiLCJhIjoiY201c3d1eDh4MHBwZDJycGx6OTU5ZzgzbCJ9.GPkBHcra43wE672RVSDiFA";

const Map = ({ buildings }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const createCustomMakerElement = (status) => {
    const markerUrl = status
      ? "https://i.pinimg.com/originals/4d/52/e4/4d52e4cc8095c745dcf821c1ed568f78.png"
      : "https://djsaurbhofficial.wordpress.com/wp-content/uploads/2015/10/wpid-sdsddssds.png";

    const markerElement = document.createElement("div");
    markerElement.className = "custome marker";
    markerElement.style.width = "25px";
    markerElement.style.height = "25px";
    markerElement.style.backgroundImage = `url(${markerUrl})`;
    markerElement.style.backgroundSize = "cover";
    return markerElement;
  };

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/roneettopiwala/cm5sv19i300do01s31cs24ege",
      center: [-79.918406, 43.261629], // Adjust these coordinates for your location
      zoom: 15.8,
      pitch: 65,
      bearing: 120,
    });

    map.current.on("load", () => {
      // Add markers for each location
      if (buildings && buildings.length > 0) {
        buildings.forEach((building) => {
          new mapboxgl.Marker({
            element: createCustomMakerElement(building.status),
          })
            .setLngLat(building.location)
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <h3>${building.name}</h3>
                <p>Status: ${
                  building.status ? " Rooms Available" : "No Rooms"
                }</p>
              `)
            )
            .addTo(map.current);
        });
      }
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Clean up on unmount
    return () => map.current.remove();
  }, [buildings]);

  return <div ref={mapContainer} className="map-container" />;
};

export default Map;
