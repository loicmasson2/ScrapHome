"use server";

import { promises as fs } from "fs";
import { House } from "~/lib/definitions";

export async function fakeData() {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");
  return JSON.parse(file);
}

export async function fakeDataForOneHouse(id: string) {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");
  return JSON.parse(file).find((house: House) => house.id === id);
}
