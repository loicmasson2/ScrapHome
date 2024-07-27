import { fakeData } from "~/app/home/fakeData";
import { House } from "~/lib/definitions";
import HouseDisplay from "~/app/components/house-display";

export default async function HomePage() {
  const data: House[] = await fakeData();

  return <HouseDisplay data={data} />;
}
