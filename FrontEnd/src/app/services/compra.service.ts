import { UsuarioService } from "./usuario.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CompraService {
  url = "http://192.168.1.80:3000/api/compra/";
  usuario: any = JSON.parse(window.localStorage.getItem("usuario"));
  constructor(private http: HttpClient) {}

  comprar(articulo: any, cantidad: any) {
    return this.http
      .post(`${this.url}registrar`, {
        usuario: this.usuario._id,
        articulo,
        cantidad,
      })
      .toPromise();
  }
  verCompras() {
    return this.http.get(`${this.url}obtener/${this.usuario._id}`).toPromise();
  }
}
