import { z } from "zod";
import { Equal, Expect } from "helpers/type-utils";

/**
 * 🕵️‍♂️ Refactor this code below to reduce the duplication,
 * while also making sure the cases don't go red!
 */

const User = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

/**
 * [zod .extend()](https://zod.dev/?id=extend)
 *
 * [zod .pick() .omit()](https://zod.dev/?id=pickomit)
 */

const foo = User.pick({ id: true, name: true })
  .omit({ id: true })
  .extend({ bla: z.string() });
type fooType = z.infer<typeof foo>;
//    ^?

// const Post = z.object({
//   id: z.string().uuid(),
//   title: z.string(),
//   body: z.string(),
// });

//* .pick() digunakan untuk mengambil zod type pada type z.object() lain
//* .extend() bingung jelasin lihat aja di bawah mirip keyword extends pada interface typecsript
const Post = User.pick({ id: true }).extend({
  title: z.string(),
  body: z.string(),
});
type PostType = z.infer<typeof Post>;
//    ^?

// const Comment = z.object({
//   id: z.string().uuid(),
//   text: z.string(),
// });
const Comment = User.pick({ id: true }).extend({
  text: z.string(),
});
type CommentType = z.infer<typeof Comment>;
//    ^?

type cases = [
  Expect<Equal<z.infer<typeof Comment>, { id: string; text: string }>>,
  Expect<
    Equal<z.infer<typeof Post>, { id: string; title: string; body: string }>
  >,
  Expect<Equal<z.infer<typeof User>, { id: string; name: string }>>
];
