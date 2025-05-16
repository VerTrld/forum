interface IPost extends IDefault {
  title: string;
  content: string;
  name: string;
  owner: IPerson;
  _count?: {
    comments: string;
  };
}
