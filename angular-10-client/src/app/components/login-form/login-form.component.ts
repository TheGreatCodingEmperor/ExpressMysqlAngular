import { Component, OnInit } from '@angular/core';
import { AccountService, AccessToken } from '../../services/account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.signIn({ username: this.username, password: this.password }).subscribe(
      res => {
        console.log(res);
      }, error => {
        console.log(error);
      }
    );
  }
}
