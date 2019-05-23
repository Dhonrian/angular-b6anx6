import { Injectable } from '@angular/core';
import { User } from '../data/user';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class SurveyServicoService {

  constructor(private bd: AngularFireDatabase) { }

  insertUsuario(usuario: User) {
    this.bd.list("prj/usuario").push(usuario)
      .then((result: any) => { console.log(result.key); })
      .catch((error: any) => { console.log(error) });
  }






}