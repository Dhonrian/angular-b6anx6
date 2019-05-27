import { Injectable } from '@angular/core';
import { User } from '../data/user';
import { Survey } from '../data/survey';
import { Group } from '../data/group';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';



@Injectable()
export class SurveyServicoService {

  constructor(private bd: AngularFireDatabase) { }

  insertUsuario(usuario: User) {
    this.bd.list("prj/usuarios").push(usuario)
      .then((result: any) => { console.log(result.key); })
      .catch((error: any) => { console.log(error) });
  }


  addQuestionario(q: Survey, key: string): void {
    console.log(q);
    this.bd.list(`prj/usuarios/${key}/questionarios/`).push(q)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getAllUsuario() {
    return this.bd.list('prj/usuarios',
      ref => ref.orderByChild('prj/usuarios/usuario')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  getAllQuestionario(usuariokey:string) {
    return this.bd.list(`prj/usuarios/${usuariokey}/questionarios/`,
      ref => ref.orderByChild('prj/usuarios/questionarios/titulo')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  addGrupo(g: Group, usuariokey:string, questionariokey: string){
    console.log(g);
    this.bd.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/grupos`).push(g)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
  

  getAllGrupo(usuariokey:string, questionariokey:string) {
    return this.bd.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/grupos`,
      ref => ref.orderByChild('prj/usuarios/questionarios/grupos/titulo')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }




}