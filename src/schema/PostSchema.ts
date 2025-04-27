import * as y from "yup";

export const PostSchema = y.object({
  title: y.string().required(),
  content: y.string().required(),
  personId: y.string().required(),
});
type IPostSchema = y.InferType<typeof PostSchema>;

export default IPostSchema;
