import { House } from "~/lib/definitions";
import HouseDisplay from "~/app/components/house-display";
import {getLocalData} from "~/lib/localdata";

export default async function HousesPage() {
  const data: House[] = await getLocalData();

  return <HouseDisplay data={data} />;
}
