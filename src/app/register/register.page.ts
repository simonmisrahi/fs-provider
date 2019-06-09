import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from "@angular/common/http";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage { 
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
    console.log("Submitting")
    console.log(this.user);    
  
    this.httpClient
    .post("http://localhost:3000/api/providers",this.user)
    .subscribe(
      (response) => {
        console.log(response);
        this.navCtrl.navigateForward('tabs');
      },
      async (err) => {
        console.log(err);
        const alert = await this.alertcontroller.create({
          header: 'Alert',
          subHeader: 'Email Error',
          message: 'This email has already been used',
          buttons: ['ok']
        });
        return await alert.present();
           
    }
    
    );

  }
  ngOnInit() {
}

}