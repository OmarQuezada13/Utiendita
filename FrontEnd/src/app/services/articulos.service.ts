import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ArticulosService {
  url = "http://192.168.1.80:3000/api/";
  constructor(private http: HttpClient) {}

  getArticulos() {
    return this.http.get(`${this.url}articulo/obtener`);
  }
  getArticulo(id: any) {
    return this.http.get(`${this.url}articulo/obtener/${id}`);
  }
  registrar(nombre: any, descripcion: any, costo: any, inventario: any) {
    return this.http
      .post(`${this.url}articulo/registrar`, {
        nombre,
        descripcion,
        costo,
        inventario,
      })
      .toPromise();
  }
  eliminar(id: any) {
    return this.http.delete(`${this.url}articulo/eliminar/${id}`).toPromise();
  }
  modificar(
    id: any,
    nombre: any,
    descripcion: any,
    costo: any,
    inventario: any
  ) {
    return this.http
      .put(`${this.url}articulo/actualizar/${id}`, {
        nombre,
        descripcion,
        costo,
        inventario,
      })
      .toPromise();
  }
  subirImagen(archivo: any, id: any) {
    return this.http
      .put(`${this.url}/upload/articulo/${id}`, {
        archivo,
      })
      .toPromise();
  }
  obtenerImagen(id) {
    return this.http.get(`${this.url}imagen/articulo/${id}`).toPromise();
  }
}
