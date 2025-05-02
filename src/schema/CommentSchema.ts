import * as y from "yup";

export const CommentSchema = y.object({
  id: y.string().optional(),
  content: y.string().required(),
  postId: y.string().required(),
});
type ICommentSchema = y.InferType<typeof CommentSchema>;

export default ICommentSchema;
