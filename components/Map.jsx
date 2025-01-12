import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9uZWV0dG9waXdhbGEiLCJhIjoiY201c3d1eDh4MHBwZDJycGx6OTU5ZzgzbCJ9.GPkBHcra43wE672RVSDiFA";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    console.log("Container ref:", mapContainer.current);
    if (!mapContainer.current) return;
    if (map.current) return;

    try {
      console.log("Initializing map...");
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-79.918476, 43.261129],
        zoom: 15.5,
        pitch: 45,
      });

      console.log("Map initialized:", map.current);

      map.current.addControl(new mapboxgl.NavigationControl());
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => map.current?.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      className="map-container"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "red",
      }}
    />
  );
};

export default Map;
