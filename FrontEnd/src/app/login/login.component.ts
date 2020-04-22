import { UsuarioService } from "./../services/usuario.service";
import { Component, OnInit } from "@angular/core";
// import { UsuarioService } from "../services/usuario.service";
import { NavController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  contrasena: any;
  matricula: any;
  usuario: any;
  constructor(
    private navCtrl: NavController,
    public router: Router,
    public alertController: AlertController,
    protected usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = window.localStorage.getItem("usuario");
    if (this.usuario != null) {
      this.usuarioService.usuario = this.usuario;
      if (this.usuario.rol === "admin") {
        this.router.navigate([`admin`]);
      } else {
        this.router.navigate([`tabs/tab1`]);
      }
    }
  }

  login(matricula: any, contraseña: any) {
    this.usuarioService
      .login(matricula, contraseña)
      .then((data) => {
        this.usuarioService.usuario = data["usrDB"];
        window.localStorage["usuario"] = JSON.stringify(
          this.usuarioService.usuario
        );

        if (this.usuarioService.usuario.rol === "admin") {
          this.router.navigate([`admin`]);
        } else {
          this.router.navigate([`tabs/tab1`]);
        }
      })
      .catch((error) => {
        this.presentAlert();
      });
  }
  registar() {
    this.router.navigate([`registro`]);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Error",
      subHeader: "Credenciales Incorrectas",
      message: "Usuario y/o Contraseña son incorrectos, intente de nuevo",
      buttons: ["OK"],
    });

    await alert.present();
  }
}
