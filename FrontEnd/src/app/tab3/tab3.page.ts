import { UsuarioService } from "./../services/usuario.service";
import { Router } from "@angular/router";
import { Component } from "@angular/core";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  imageFilePath = "";
  usuario: any = JSON.parse(window.localStorage.getItem("usuario"));
  constructor(private router: Router, public usuarioService: UsuarioService) {}
  ngOnInit() {
    if (this.usuario == null) {
      this.router.navigate([`login`]);
    }
  }
  verRuta() {
    console.log(this.imageFilePath);
  }
  cerrarSesion() {
    this.router.navigate([`login`]);
    this.usuarioService.usuario = null;
    window.localStorage.removeItem("usuario");
  }
  verCompras() {
    this.router.navigate([`verCompras`]);
  }
}
