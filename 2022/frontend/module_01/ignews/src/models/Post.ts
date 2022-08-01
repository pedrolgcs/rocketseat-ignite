import { IAuthor } from '.';

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

export type { IContent, IPost };
