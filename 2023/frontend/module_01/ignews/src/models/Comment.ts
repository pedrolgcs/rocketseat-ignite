interface IComment {
  id: string;
  content: string;
  publishedAt: Date;
  likes: number;
}

export type { IComment };
