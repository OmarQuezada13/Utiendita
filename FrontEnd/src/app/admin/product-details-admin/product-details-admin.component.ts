import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticulosService } from "src/app/services/articulos.service";

@Component({
  selector: "app-product-details-admin",
  templateUrl: "./product-details-admin.component.html",
  styleUrls: ["./product-details-admin.component.scss"],
})
export class ProductDetailsAdminComponent implements OnInit {
  articulo: any[] = [];
  nombre: any;
  descripcion: any;
  costo: any;
  inventario: any;
  constructor(
    private router: Router,
    public articuloService: ArticulosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (window.localStorage.getItem("usuario") == null) {
      this.router.navigate([`login`]);
    }
    this.infoProducto();
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

  eliminar() {
    this.articuloService
      .eliminar(this.articulo[0]._id)
      .then((data) => {
        this.router.navigate([`admin`]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  actualizar() {
    let id = this.route.snapshot.paramMap.get("id");

    this.articuloService
      .modificar(id, this.nombre, this.descripcion, this.costo, this.inventario)
      .then((data) => {
        this.router.navigate([`admin`]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
