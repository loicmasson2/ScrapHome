import { House } from "~/lib/definitions";
import { getLocalDataForOneHouse } from "~/lib/localdata";

export default async function HomePage({ params }: { params: { id: string } }) {
  const house: House = await getLocalDataForOneHouse(params.id);

  return (
    <div>
      <p>FULL PAGE{params.id}</p>
    </div>
  );
}
