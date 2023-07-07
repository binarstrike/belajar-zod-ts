// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const StarWarsPerson = z
  .object({ name: z.string() })
  .transform((person) => ({ ...person, nameAsArray: person.name.split(" ") }));

/**
 * [zod .transform()](https://zod.dev/?id=transform)
 */

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

type StarWarsPersonType = z.infer<typeof StarWarsPerson>;
//   ^?

export const fetchStarWarsPeople = async () => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people.json"
  ).then((res) => res.json());

  // console.log(data);
  const parsedData = StarWarsPeopleResults.parse(data);
  return parsedData.results;
};

// TESTS

it("Should resolve the name and nameAsArray", async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: "Luke Skywalker",
    nameAsArray: ["Luke", "Skywalker"],
  });
});
