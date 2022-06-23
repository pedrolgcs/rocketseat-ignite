import { ILesson } from '.';

interface ITeacher {
  id: string;
  name: string;
  bio: string;
  avatarURL: string;
  lessons?: ILesson[];
}

export type { ITeacher };
