import { Question } from './question';
import { OpenQuestion } from './open-question';

export class Group {

  titulo: string;
  fechadas: Question[];
  abertas: OpenQuestion[];

}