import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { ambiente } from '../ambiente';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { User } from '../data/user';
import { SurveyServicoService } from '../data/survey-servico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit {

  private userId: Observable<firebase.User>;
  private questionarios: Observable<any>;
  private usuariokey;

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private servico: SurveyServicoService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private router:Router
  ) {

  }

  ngOnInit() {
    this.afAuth.authState.subscribe(userId => {
      if (userId) this.usuariokey = userId.uid;
      this.questionarios = this.servico.getAllQuestionario(this.usuariokey);

    })
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }


  editForm(key: string) {
    this.router.navigate(['/survey/',key]);
  }

  excluirForm(key: string) {
    this.servico.excluirQuestionario(this.usuariokey, key);
  }

  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err))
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }


  goto(usuariokey:string):void{
    this.router.navigate(['/questionario/',usuariokey]);
  }

}
