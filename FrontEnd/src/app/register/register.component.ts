import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../services/usuario.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  nombre: String;
  apellidos: String;
  matricula: String;
  password: String;

  constructor(
    private usuarioService: UsuarioService,
    public alertController: AlertController,
    public router: Router
  ) {}
  registrar(nombre: any, apellidos: any, matricula: any, contrasena: any) {
    this.usuarioService
      .registro(nombre, apellidos, matricula, contrasena)
      .then((data) => {
        this.presentAlert();
        this.router.navigate(["/login"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  ngOnInit() {}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Exito",
      message: " se ha registrado correctamente",
      buttons: ["OK"],
    });

    await alert.present();
  }
  navigaionToUser() {
    this.router.navigate(["/login"]);
  }
}
