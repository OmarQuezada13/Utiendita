import { Component, OnInit } from "@angular/core";
import { ArticulosService } from "../services/articulos.service";
import { UsuarioService } from "../services/usuario.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  articulos: any[] = [];
  constructor(
    private router: Router,
    protected articuloService: ArticulosService,
    protected usuarioService: UsuarioService
  ) {}
  ngOnInit() {
    if (window.localStorage.getItem("usuario") == null) {
      this.router.navigate([`login`]);
    }
    this.obtenerArticulos();
  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.obtenerArticulos();
    }, 2000);
  }

  viewProduct(id: any) {
    this.router.navigate([`admin/details/${id}`]);
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
  subirArticulo() {
    this.router.navigate([`admin/subirArticulo`]);
  }
  cerrarSesion() {
    this.router.navigate([`login`]);
    this.usuarioService.usuario = null;
    window.localStorage.removeItem("usuario");
  }
}
