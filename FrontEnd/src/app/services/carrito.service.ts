import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CarritoService {
  url = "http://192.168.1.80:3000/api/";
  constructor(private http: HttpClient) {}

  getCarrito(id: any) {
    return this.http.get(`${this.url}carrito/obtener/${id}`).toPromise();
  }

  postCarrito(usuario: any, articulo: any, cantidad: any) {
    return this.http
      .post(`${this.url}carrito/registrar/`, {
        usuario,
        articulo,
        cantidad,
      })
      .toPromise();
  }
  deleteCarrito(id: any) {
    return this.http.delete(`${this.url}carrito/eliminar/${id}`).toPromise();
  }
  putCarrito(id: any, cantidad: Number) {
    return this.http
      .put(`${this.url}carrito/actualizar/${id}`, { cantidad })
      .toPromise();
  }
}
