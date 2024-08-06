"use client";
import { useState } from "react";
import Link from "next/link";
import { House } from "~/lib/definitions";
import MapboxMap from "~/app/components/mapbox-map";
import { ListIcon, MapIcon, BedDouble } from "lucide-react";

const MapView = (props: { data: House[] }) => {
  return (
    <div className={"flex h-screen w-screen"}>
      <MapboxMap data={props.data} />
    </div>
  );
};

const ListView = (props: { data: House[] }) => {
  return (
    <div id={"list"} className="md:flex md:flex-row md:flex-wrap">
      {props.data.map((house: House) => {
        return (
          <Link href={`/house/${house.id}`} key={house.id} className="m-4 rounded-xl bg-base-300 shadow-md md:flex md:max-w-xl">
            <figure className={"rounded-xl md:basis-1/3"}>
              <img
                className={
                  "rounded-t-xl object-cover md:rounded-l-xl md:rounded-r-none h-full"
                }
                src={`https:${Object.values(house.images.images)[0].image.uri.replace("{imageParameters}", "fit,q80")}`}
                alt="Album"
              />
            </figure>
            <div className="flex flex-col end-2 justify-between px-4 py-4 md:py-2 gap-4 md:gap-2 md:basis-2/3">
              <h2 className="font-bold">{house.summary}</h2>
              <p className={"font-semibold"}>{Number(house.price).toLocaleString()} €</p>
              <div id={"info"} className={"flex flex-row justify-between"}>
                <div className={"flex flex-row gap-1"}>
                  <BedDouble className={"w-8"} />
                  <p>{house.rooms}</p>
                </div>
                <p>{house.size} m²</p>
                <p>{house.year}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default function HouseDisplay(props: { data: House[] }) {
  const [toggleViewMode, setToggleViewMode] = useState(true);
  return (
    <div>
      <div className="flex justify-end p-5 items-center align-middle">
        <label className="swap">
          <input
            type="checkbox"
            onClick={() => setToggleViewMode(!toggleViewMode)}
          />
          <div className="swap-on flex gap-2">
            <p> Switch to the map view</p>
            <MapIcon className={"mt-0.5"} />
          </div>
          <div className="swap-off flex gap-2">
            <p>Switch to the list view</p>
            <ListIcon className={"mt-0.5"} />
          </div>
        </label>
      </div>
      {toggleViewMode ? (
        <ListView data={props.data} />
      ) : (
        <MapView data={props.data} />
      )}
    </div>
  );
}
