import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor( private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private router: Router ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      first: '',
      last: '',
      username: '',
      email: '',
      password: ''
    })
  }

  register() {
    let first = this.registerForm.get('first').value;
    let last = this.registerForm.get('last').value;
    let username = this.registerForm.get('username').value;
    let email = this.registerForm.get('email').value;
    let password = this.registerForm.get('password').value;
    this.authService.register(email, password);
    this.userService.createUser(first, last, username, email);
  }

}
