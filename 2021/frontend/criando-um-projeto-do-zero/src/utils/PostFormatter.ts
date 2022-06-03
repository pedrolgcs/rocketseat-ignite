import { Document } from '@prismicio/client/types/documents';
import { format } from 'date-fns';
import { RichText } from 'prismic-dom';
import { ptBR } from 'date-fns/locale';

interface PostPreview {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostComplete {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
    banner: {
      url: string;
    };
    content: string;
  };
}

class PostFormatter {
  public static ParseDate(date: string): string {
    return format(new Date(date), 'd MMM YYY', {
      locale: ptBR,
    });
  }

  public static Preview(post: Document): PostPreview {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  }

  public static Complete(post: Document): PostComplete {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        banner: {
          url: post.data.banner.url,
        },
        author: post.data.author,
        content: post.data.content,
      },
    };
  }
}

export { PostFormatter };
