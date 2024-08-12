import fsPromises from "fs/promises";
import path from "path";
import { House } from "~/lib/definitions";
// import * as process from "node:process";

export async function getLocalData() {
  console.info("HELLO", process.cwd())
  // Get the path of the json file
  // const filePath = "./src/app/json/data.json";

  const filePath = "~/app/json/data.json";
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  // @ts-ignore
  const objectData = JSON.parse(jsonData);

  return objectData;
}

export async function getLocalDataForOneHouse(id: string) {
  console.info("HELLO", process.cwd())
  // Get the path of the json file
  const filePath = "~/app/json/data.json";

  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  // @ts-ignore
  const objectData = JSON.parse(jsonData);

  return objectData.find((house: House) => house.id === id);
}
