import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import classnames from 'classnames';

type LessonProps = {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
};

const Lesson: React.FC<LessonProps> = ({ title, slug, availableAt, type }) => {
  const { slug: slugParams } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );

  const isActiveLesson = slugParams === slug;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={classnames(
          'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',
          {
            'bg-green-500': isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classnames(
                'text-sm font-medium flex items-center gap-2',
                {
                  'text-blue-500': !isActiveLesson,
                  'text-white': isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={classnames(
              'text-xs rounded px-2 py-[2px] text-white border',
              {
                'border-white': isActiveLesson,
                'border-green-300': !isActiveLesson,
              }
            )}
          >
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong
          className={classnames('mt-5 block', {
            'text-gray-200': !isActiveLesson,
            'text-white': isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
};

export { Lesson };
