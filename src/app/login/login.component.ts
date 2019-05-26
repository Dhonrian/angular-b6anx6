import { Component } from '@angular/core';
import { ambiente } from '../ambiente';
import * as firebase from 'firebase/app';
import { User } from '../data/user';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { SurveyServicoService } from '../data/survey-servico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private servico: SurveyServicoService
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        let idusuario = firebase.auth().currentUser.uid;
        console.log(idusuario);
        let usuario: User = new User();
        usuario.usuario = idusuario;
        this.servico.insertUsuario(usuario);
        this.router.navigate(['/user']);
      })
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        let idusuario = firebase.auth().currentUser.uid;
        console.log(idusuario);
        let usuario: User = new User();
        usuario.usuario = idusuario;
        this.servico.insertUsuario(usuario);
        this.router.navigate(['/user']);
      })
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        let idusuario = firebase.auth().currentUser.uid;
        console.log(idusuario);
        let usuario: User = new User();
        usuario.usuario = idusuario;
        this.servico.insertUsuario(usuario);
        this.router.navigate(['/user']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
  }
}