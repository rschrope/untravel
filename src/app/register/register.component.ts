import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor( private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  register() {
    let email = this.registerForm.get('email').value;
    let password = this.registerForm.get('password').value;
    this.authService.register(email, password);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }
}
