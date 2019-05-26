import { Component, OnInit } from '@angular/core';
import { Survey} from '../data/survey';
import { SurveyServicoService } from '../data/survey-servico.service';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  private titulo: string;
  private inicio: string;
  private fim: string;
  private usuariokey


  constructor(private servico: SurveyServicoService) { }

  ngOnInit() {
  }
  toData(data):number {
    let temp = data.split('/');
    return new Date(parseInt(temp[2]), parseInt(temp[1]) - 1, parseInt(temp[0])).getTime();
  }

  formatDate(timestamp):string{
    let d = new Date(timestamp);
    return (d.getDate() < 10? "0"+d.getDate() : d.getDate())  +"/"+
          (d.getMonth() < 9? "0"+(d.getMonth()+1) : d.getMonth()+1)  +"/"+
          d.getFullYear();
  }

  salvarQuestionario() {
    if (this.usuariokey != undefined) {
      let questionario: Survey = new Survey();
      questionario.titulo = this.titulo;
      questionario.inicio = this.toData(this.inicio);
      questionario.fim = this.toData(this.fim);
      this.servico.addQuestionario(questionario, this.usuariokey);
    }
    else{
      alert("Usuário não definido")
    }
  }


}