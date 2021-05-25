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
  showloader=false
  hide = true;

  constructor(private router: Router,
              private Auth:AuthenticationService,
  ) {}

  ngOnInit(): void {
    sessionStorage.clear();
    localStorage.clear();
  }
  handleLogin(){
    this.showloader = true;
  this.Auth.Login(this.username,this.password).subscribe(
    (response:any) =>{


      // this.footer.setConnected(true);
      setTimeout(()=>{
        if(response){
          this.showloader=false;
        }
        if(sessionStorage.getItem('role')==='ADMINISTRATEUR')
          this.router.navigate(['NTPModule/primary-module/welcome'])
        else
        this.router.navigate(['NTPModule/primary-module/listOrders'])
      },2000)

    },
    (error:any) =>{
      console.log(error)
      this.invalidLogin=true
    }
  )

  }
  hideloader() {

    // Setting display of spinner
    // element to none
    document.getElementById('loading')
      .style.display = 'none';
  }
}
