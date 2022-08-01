import { format, formatDistanceToNow } from 'date-fns';
import ptBb from 'date-fns/locale/pt-BR';

function formatePublishedAt(publishedAt: Date) {
  return format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBb });
}

function formatePublishedDateRelative(publishedAt: Date) {
  return formatDistanceToNow(publishedAt, { locale: ptBb, addSuffix: true });
}

export { formatePublishedAt, formatePublishedDateRelative };
