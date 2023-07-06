// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  repoName: z.string(),
  // keywords: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional().default([]),
});
//* karena pemberian kata kunci pada repository misalnya git bersifat opsional dan jika properti keywords kosong atau tidak
//* di input maka nilai yang dihasilkan adalah undefined oleh karena itu method .default() untuk memberi nilai default yaitu
//* berupa array kosong

type FormInput = z.input<typeof Form>;
type FormOutput = z.infer<typeof Form>;

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should include keywords if passed", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
    keywords: ["123"],
  });

  expect(result.keywords).toEqual(["123"]);
});

it("Should automatically add keywords if none are passed", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
  });

  expect(result.keywords).toEqual([]);
});
