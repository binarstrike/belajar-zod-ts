// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  name: z.string(),
  //             ^ 🕵️‍♂️
  // phoneNumber: z.string().optional(),
  phoneNumber: z.string().min(5).max(20).optional(),
  //* .min() dan .max() dipakai untuk menentukan panjang minimal dan maksimal string
  // email: z.string(),
  email: z.string().email(),
  //* .email() dipakai untuk memvalidasi email
  // website: z.string().optional(),
  website: z.string().url().optional(),
  //* .url() dipakai untuk memvalidasi url
});

type FormType = z.infer<typeof Form>;
//   ^?

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should fail if you pass a phone number with too few characters", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      phoneNumber: "1",
    })
  ).toThrowError("String must contain at least 5 character(s)");
});

it("Should fail if you pass a phone number with too many characters", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      phoneNumber: "1238712387612387612837612873612387162387",
    })
  ).toThrowError("String must contain at most 20 character(s)");
});

it("Should throw when you pass an invalid email", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt",
    })
  ).toThrowError("Invalid email");
});

it("Should throw when you pass an invalid website URL", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      website: "/",
    })
  ).toThrowError("Invalid url");
});

it("Should pass when you pass a valid website URL", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      website: "https://mattpocock.com",
    })
  ).not.toThrowError();
});
