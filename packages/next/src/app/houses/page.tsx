import { fakeData } from "~/app/houses/fakeData";
import { House } from "~/lib/definitions";
import HouseDisplay from "~/app/components/house-display";

export default async function HousesPage() {
  const data: House[] = await fakeData();

  return <HouseDisplay data={data} />;
}
