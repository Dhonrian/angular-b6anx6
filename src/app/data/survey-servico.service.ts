import { Injectable } from '@angular/core';
import { User } from '../data/user';
import { Survey } from '../data/survey';
import { OpenQuestion } from '../data/open-question';
import { Group } from '../data/group';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';



@Injectable()
export class SurveyServicoService {

  private key;

  constructor(private bd: AngularFireDatabase) { }

  insertUsuario(usuario: User) {
    this.bd.list("prj/usuarios").push(usuario)
      .then((result: any) => { console.log(result.key); })
      .catch((error: any) => { console.log(error) });
  }


  addQuestionario(q: Survey, key: string){
    console.log(q);
    let a = this.bd.list(`prj/usuarios/${key}/questionarios/`).push(q).key;
    return a;
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

    getQuestionario(usuariokey:string, questionariokey: string) {
    return this.bd.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}`,
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
   let grupokey = this.bd.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/grupos`).push(g).key;
   return grupokey;
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


  addQuestaoAberta(q: OpenQuestion, key: string, questionariokey: string, grupokey: string): void {
    console.log(q);
    this.bd.list(`prj/usuarios/${key}/questionarios/${questionariokey}/grupos/${grupokey}/questao-aberta/`).push(q)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }


}