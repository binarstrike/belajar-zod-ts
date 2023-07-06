// CODE

import { expect, it } from "vitest";
import { z } from "zod";

enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

const Form = z.object({
  repoName: z.string(),
  //! privacyLevel: z.string(),
  //* privacyLevel: z.enum(["private", "public"]),
  //* privacyLevel: z.nativeEnum(Visibility),
  privacyLevel: z.nativeEnum(Visibility),
});

//* tujuan dari test ini adalah bagaimana cara agar zod dapat memiliki tipe yang telah ditetapkan sebelumnya,
//* jika pada typescript bisa menggunakan union type
//? type visibility = "public" | "private";

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should fail if an invalid privacyLevel passed", async () => {
  expect(() =>
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "something-not-allowed",
    })
  ).toThrowError();
});

it("Should permit valid privacy levels", async () => {
  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "private",
    }).privacyLevel
  ).toEqual("private");

  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "public",
    }).privacyLevel
  ).toEqual("public");
});
