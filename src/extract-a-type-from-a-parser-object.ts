// CODE

import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

// const logStarWarsPeopleResults = (data: unknown) => {
//                                            ^ 🕵️‍♂️
//* untuk meng-ekstrak tipe data dari sebuah object schema zod bisa menggunakan type z.infer
const logStarWarsPeopleResults = (
  data: z.infer<typeof StarWarsPeopleResults>
) => {
  data.results.map((person) => {
    console.log(person.name);
  });
};
