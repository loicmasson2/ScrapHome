import { Modal } from "~/app/@modal/(.)house/[id]/modal";
import { House } from "~/lib/definitions";
import { BedDouble } from "lucide-react";
import Link from "next/link";
import { getLocalDataForOneHouse } from "~/lib/localdata";

export default async function HouseModal({
  params: { id: houseId },
}: {
  params: { id: string };
}) {
  const house: House = await getLocalDataForOneHouse(houseId);

  return (
    <Modal>
      <div
        key={house.id}
        className="m-6 rounded-xl bg-base-300 shadow-md md:flex md:max-w-xl md:flex-col"
      >
        <figure className={"rounded-xl md:basis-1/3"}>
          <img
            className={
              "h-full rounded-t-xl object-cover md:rounded-l-xl md:rounded-r-none"
            }
            src={`https:${Object.values(house.images.images)[0].image.uri.replace("{imageParameters}", "fit,q80")}`}
            alt="Album"
          />
        </figure>
        <div className="end-2 flex flex-col justify-between gap-4 px-4 py-4 md:basis-2/3 md:gap-2 md:py-2">
          <h2 className="font-bold">{house.summary}</h2>
          <p className={"font-semibold"}>
            {Number(house.price).toLocaleString()} €
          </p>
          <div id={"info"} className={"flex flex-row justify-between"}>
            <div className={"flex flex-row gap-1"}>
              <BedDouble className={"w-8"} />
              <p>{house.rooms}</p>
            </div>
            <p>{house.size} m²</p>
            <p>{house.year}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
