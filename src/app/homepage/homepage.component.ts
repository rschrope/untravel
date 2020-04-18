import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router, public userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  routeToRegister() {
    this.router.navigate(['register']);
  }
  routeToLogin() {
    this.router.navigate(['login']);
  }
  routeToHome() {
    this.router.navigate(['homepage']);
  }

  logout() {
    this.authService.logout();
  }
}
