interface IComment extends IDefault {
  content: string;
  postId: string;
  owner: IPerson;
}
