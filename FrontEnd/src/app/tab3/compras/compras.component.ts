import { Router } from "@angular/router";
import { CompraService } from "./../../services/compra.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-compras",
  templateUrl: "./compras.component.html",
  styleUrls: ["./compras.component.scss"],
})
export class ComprasComponent implements OnInit {
  compras: any[] = [];
  usuario: any = JSON.parse(window.localStorage.getItem("usuario"));
  constructor(private compraService: CompraService, private router: Router) {}

  ngOnInit() {
    if (window.localStorage.getItem("usuario") == null) {
      this.router.navigate([`login`]);
    }
    this.compraService
      .verCompras()
      .then((data) => {
        this.compras = data["cont"];
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
