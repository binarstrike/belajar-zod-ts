// CODE

import { expect, it } from "vitest";
import { z } from "zod";

// const PersonResult = z.unknown();
//* sebenarnya hasil request dari api mengembalikan banyak data tapi untuk kali ini yang dibutuhkan hanya properti
//* `name`
const PersonResult = z.object({
  //                      ^ 🕵️‍♂️
  name: z.string(),
});

export const fetchStarWarsPersonName = async (id: string) => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people/" + id + ".json"
  ).then((res) => res.json());
  const parsedData = PersonResult.parse(data);
  console.log(parsedData); //* hanya log properti dari object yang dibutuhkan sesuai object schema pada PersonResult
  return parsedData.name;
};

// TESTS

it("Should return the name", async () => {
  expect(await fetchStarWarsPersonName("1")).toEqual("Luke Skywalker");
  expect(await fetchStarWarsPersonName("2")).toEqual("C-3PO");
});
