import { Group } from './group';

export class Survey {
  titulo: string;
  inicio: firebase.firestore.Timestamp;
  fim: firebase.firestore.Timestamp;
  grupos: Group[];

}