import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {HttpClient} from "@angular/common/http";
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage { 

  public email: string = "";
  public password: string = "";
  public user: any = {
    name: "",
    email: "",
    password:"" 
  };

  constructor(
    private httpClient: HttpClient,
    private alertcontroller: AlertController,
    private navCtrl: NavController
  ) {}


  navToLogin() {
    const authReq = {
      email: this.email,
      password: this.password
    };
    console.log("Submitting")
    console.log(this.user);    
  
    this.httpClient
    .post("http://localhost:3000/api/auth",authReq)
    .subscribe(
      (response: any) => {
        console.log(response);
        const userId = response.id;

        localStorage.setItem("user_id", userId);
        
        this.navCtrl.navigateForward('tabs', {
          queryParams: {
            user_id: userId
          }
        });
      },
      err => {
        alert("Failed top login. Incorrect Username or Password.");
      }
    );
  }

  navToExplore() {
      this.navCtrl.navigateForward('tabs');
    }
    navToRegister(){
    this.navCtrl.navigateForward('register');
      
        

  };

ngOnInit() {

}
}