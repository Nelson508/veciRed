import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor( public navCtrl: NavController ) { }

  ngOnInit() {
  }

  
  registro(registrarse:NgForm){

    console.log(registrarse.valid);
  }

  login() {
    this.navCtrl.navigateRoot('/login');
  }
}
