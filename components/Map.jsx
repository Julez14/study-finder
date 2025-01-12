import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9uZWV0dG9waXdhbGEiLCJhIjoiY201c2toZmU4MDlscDJpcHdyazkwaTM3biJ9.udysslYRCmierKF_mYbmLw";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/roneettopiwala/cm5stz138006q01rs5p9k6l55",
      center: [-79.918476, 43.261129], // Adjust these coordinates for your location
      zoom: 15.5,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Clean up on unmount
    return () => map.current.remove();
  }, []);

  return <div ref={mapContainer} className="map-container" />;
};

export default Map;
