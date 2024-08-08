import fsPromises from "fs/promises";
import path from "path";
import { House } from "~/lib/definitions";

export async function getLocalData() {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), "json/data.json");
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  // @ts-ignore
  const objectData = JSON.parse(jsonData);

  return objectData;
}

export async function getLocalDataForOneHouse(id: string) {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), "json/data.json");
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  // @ts-ignore
  const objectData = JSON.parse(jsonData);

  return objectData.find((house: House) => house.id === id);
}
