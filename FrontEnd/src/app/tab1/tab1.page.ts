import { ArticulosService } from "./../services/articulos.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  articulos: any[] = [];
  constructor(
    private router: Router,
    public articuloService: ArticulosService,
    public usuarioService: UsuarioService
  ) {}
  ngOnInit() {
    this.obtenerArticulos();
    if (window.localStorage.getItem("usuario") == null) {
      this.router.navigate([`login`]);
    }
  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.obtenerArticulos();
    }, 2000);
  }

  viewProduct(id: any) {
    this.router.navigate([`details/${id}`]);
  }

  obtenerArticulos() {
    this.articuloService.getArticulos().subscribe(
      (data) => {
        this.articulos = data["cont"];
      },
      (error) => {
        console.error(error);
      }
    );
  }
  obtenerImagen(id: any) {
    this.articuloService
      .obtenerImagen(id)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
