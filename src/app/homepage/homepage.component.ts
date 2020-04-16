import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) { }

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
}
