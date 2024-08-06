import { fakeDataForOneHouse } from "~/app/houses/fakeData";
import { House } from "~/lib/definitions";

export default async function HomePage({params}: { params: { id: string } }) {
    const house: House = await fakeDataForOneHouse(params.id);

    return (
        <div>
            <p>FULL PAGE{params.id}</p>
        </div>
    );
}
