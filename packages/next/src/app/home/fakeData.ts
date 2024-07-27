"use server";

import { promises as fs } from "fs";

export async function fakeData() {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");
  return JSON.parse(file);
}
