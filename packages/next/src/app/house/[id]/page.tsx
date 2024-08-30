import { House } from "~/lib/definitions";
import { getLocalDataForOneHouse } from "~/lib/localdata";

export default async function HomePage({ params }: { params: { id: string } }) {
  const house: House = await getLocalDataForOneHouse(params.id);

  return (
    <div className={"flex justify-center"}>
      <div className={"flex flex-col max-w-5xl"}>
        <div className={"flex flex-row gap-2"}>
          <p>{house.price}</p>
          <p>{house.size}</p>
        </div>
        <div className={"flex flex-row gap-2"}>
          <p>{house.address}</p>
          <p>{house.summary}</p>
        </div>
        <div className="flex carousel h-1/2 w-full rounded-box">
          {Object.values(house.images.images).map((image, index) => {
            return (
              <div id={`${image.id}`} key={`${image.id}`} className={"carousel-item w-full"}>
                <img
                  className={"w-full"}
                  src={`https:${image.image.uri.replace("{imageParameters}", "fit,q80")}`}
                  alt="Carouse image"
                />
              </div>
            );
          })}
        </div>

        <div className="flex w-full justify-center gap-2 py-2">
          {Object.values(house.images.images).map((image, index) => {
            return (
              <a href={`#${image.id}`} key={`button-${image.id}`} className="btn btn-xs">
                {index+1}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
