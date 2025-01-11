// components/Map.js
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1Ijoicm9uZWV0dG9waXdhbGEiLCJhIjoiY201c2toZmU4MDlscDJpcHdyazkwaTM3biJ9.udysslYRCmierKF_mYbmLw";

const Map = ({ center = [-74.5, 40], zoom = 9 }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/roneettopiwala/cm5stz138006q01rs5p9k6l55", // Map style
      center : [-79.918476,43.261129],
      zoom: 15.5 // Initial zoom level
    });

    // Clean up on unmount
    return () => map.remove();
  }, [center, zoom]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />;
};

export default Map;
