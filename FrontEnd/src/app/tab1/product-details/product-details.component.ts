import { UsuarioService } from "./../../services/usuario.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ArticulosService } from "../../services/articulos.service";
import { CarritoService } from "../../services/carrito.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit {
  articulos: any[] = [];
  articulo: any[] = [];
  usuario: any = JSON.parse(window.localStorage.getItem("usuario"));
  constructor(
    private router: Router,
    public articuloService: ArticulosService,
    private route: ActivatedRoute,
    public carritoService: CarritoService,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.obtenerProductos();
    this.infoProducto();
    if (window.localStorage.getItem("usuario") == null) {
      this.router.navigate([`login`]);
    }
  }

  viewProduct(id: any) {
    this.router.navigate([`details/${id}`]);
  }

  obtenerProductos() {
    this.articuloService.getArticulos().subscribe(
      (data) => {
        this.articulos = data["cont"];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  infoProducto() {
    let id = this.route.snapshot.paramMap.get("id");
    this.articuloService.getArticulo(id).subscribe(
      (data) => {
        this.articulo = data["cont"];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  postCarrito(usuario: any, articulo: any, cantidad: any) {
    this.carritoService
      .postCarrito(usuario, articulo, cantidad)
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  }
}
