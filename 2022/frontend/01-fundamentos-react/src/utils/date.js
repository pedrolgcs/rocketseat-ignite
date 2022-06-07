import { format, formatDistanceToNow } from 'date-fns';
import ptBb from 'date-fns/locale/pt-BR';

function formatePublishedAt(publishedAt) {
  return format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBb });
}

function formatePublishedDateRelative(publishedAt) {
  return formatDistanceToNow(publishedAt, { locale: ptBb, addSuffix: true });
}

export { formatePublishedAt, formatePublishedDateRelative };
