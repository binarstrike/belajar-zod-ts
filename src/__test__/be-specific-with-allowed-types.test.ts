// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  repoName: z.string(),
  //! privacyLevel: z.string()
  // privacyLevel: z.enum(["private", "public"]), //* ini sama saja seperti z.union() dengan z.literal(), lebih singkat
  privacyLevel: z.union([z.literal("private"), z.literal("public")]),
});

type FormType = z.infer<typeof Form>;
//      ^?

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
