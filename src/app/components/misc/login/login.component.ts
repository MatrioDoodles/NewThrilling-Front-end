import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  errorMsg='Invalid Credentials'
  invalidLogin=false
  hide = true;

  constructor(private router: Router,
              private Auth:AuthenticationService) { }
  
  ngOnInit(): void {
  }
  handleLogin(){
  this.Auth.Login(this.username,this.password).subscribe(
    (response:any) =>{
      console.log(response)
      this.router.navigate(['welcome'])
    },
    (error:any) =>{
      console.log(error)
      this.invalidLogin=true
    }
  )
 
  }
}
