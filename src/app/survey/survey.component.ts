import { Component, OnInit } from '@angular/core';
import { Survey } from '../data/survey';
import { Group } from '../data/group';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { OpenQuestion } from '../data/open-question';
import { SurveyServicoService } from '../data/survey-servico.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  private titulo: string;
  private descricao: string;
  private enunciado: string;
  private resposta: string[];
  private inicio: string;
  private grupo: string;
  private fim: string;
  private usuariokey;
  private lists;
  private user: Observable<firebase.User>;
  private questionarios: Observable<any>;
  private questionariokey;
  private grupokey;


  constructor(private servico: SurveyServicoService,
    public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) this.usuariokey = user.uid;
      this.questionarios = this.servico.getAllQuestionario(this.usuariokey);
    })
     
  }

  toData(data): number {
    let temp = data.split('/');
    return new Date(parseInt(temp[2]), parseInt(temp[1]) - 1, parseInt(temp[0])).getTime();
  }

  formatDate(timestamp): string {
    let d = new Date(timestamp);
    return (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + "/" +
      (d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + "/" +
      d.getFullYear();
  }

  salvarQuestionario() {

    let group: Group = new Group();

    group.titulo = this.grupo;
    group.abertas = [];
    group.fechadas = [];
    this.addQuestion(group);

    if (this.usuariokey != undefined) {
      let questao: OpenQuestion = new OpenQuestion();
      questao.enunciado = this.enunciado;
      questao.respota = this.resposta;
      let questionario: Survey = new Survey();
      questionario.titulo = this.titulo;
      // questionario.inicio = this.toData(this.inicio);
      // questionario.fim = this.toData(this.fim);
      this.questionariokey = this.servico.addQuestionario(questionario, this.usuariokey);
      console.log("Questionario key", this.questionariokey);
      this.grupokey = this.servico.addGrupo(group, this.usuariokey,this.questionariokey);
     // console.log(questao)
    }
    else {
      alert("Usuário não definido");
    }
     alert("Formulário Cadastrado");
  }

  addQuestion(grupo: Group) {
    let questao: OpenQuestion = new OpenQuestion();
    questao.enunciado = this.enunciado;
    questao.respota = this.resposta;
    grupo.abertas.push(questao);
  }




}
