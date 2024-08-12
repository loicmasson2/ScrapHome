import fsPromises from "fs/promises";
import path from "path";
import { House } from "~/lib/definitions";
import {processEnv} from "@next/env";

export async function getLocalData() {
  // Get the path of the json file
  // const filePath = "./src/app/json/data.json";
  const prefix = processEnv().NODE_ENV === "development" ? "./src/app/" : "./";
  const filePath = path.join(prefix, "json/data.json");
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  // @ts-ignore
  const objectData = JSON.parse(jsonData);

  return objectData;
}

export async function getLocalDataForOneHouse(id: string) {
  // Get the path of the json file
  const prefix = processEnv().NODE_ENV === "development" ? "./src/app/" : "./";
  const filePath = path.join(prefix, "json/data.json");


  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  // @ts-ignore
  const objectData = JSON.parse(jsonData);

  return objectData.find((house: House) => house.id === id);
}
