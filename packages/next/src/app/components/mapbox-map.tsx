"use client";
import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { House } from "~/lib/definitions";

// import the mapbox-gl styles so that the map is displayed correctly

function MapboxMap(props: { data: House[] }) {
  // this is where the map instance will be stored after initialization
  const [map, setMap] = React.useState<mapboxgl.Map>();

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: "mapbox://styles/loicmasson/cjr81xe2o07l42so0vcxxw1pn", // style URL
      center: [24.945831, 60.192059], // starting position
      zoom: 10, // starting zoom
    });

    props.data.map((house) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div>
           <h1>${house.summary}</h1>
           <span>${house.price}</span>
           <img alt="${house.summary}" 
           className={"object-cover"}
           src=https:${Object.values(house.images.images)[0].image.uri.replace("{imageParameters}", "fit,q80")}
           alt="Album" />
        </div>
      `);

      new mapboxgl.Marker()
        .setLngLat([house.geolocation.longitude, house.geolocation.latitude])
        .setPopup(popup)
        .addTo(mapboxMap);
    });

    // save the map object to React.useState
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "80%" }} />;
}

export default MapboxMap;
