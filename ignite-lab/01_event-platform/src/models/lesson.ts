import { ITeacher, IChallenge } from '.';

interface ILesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  lessonType: 'live' | 'class';
  videoId: string;
  availableAt: string;
  teacher?: ITeacher;
  challenge?: IChallenge;
}

export type { ILesson };
