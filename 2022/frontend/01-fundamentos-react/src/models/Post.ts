interface IAuthor {
  avatarUrl: string;
  name: string;
  role: string;
}

interface IContent {
  type: string;
  content: string;
}

interface IPost {
  id: string;
  author: IAuthor;
  content: IContent[];
  publishedAt: Date;
}

export type { IAuthor, IContent, IPost };
