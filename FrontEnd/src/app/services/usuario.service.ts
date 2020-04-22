import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  url2 = "http://192.168.1.80:3000/api/usuario/registrar";
  url = "http://192.168.1.80:3000/api/login";
  usuario: any;
  constructor(private http: HttpClient) {}

  login(matricula: any, contraseña: any) {
    return this.http.post(`${this.url}`, { matricula, contraseña }).toPromise();
  }
  registro(nombre: any, apellidos: any, matricula: any, contraseña: any) {
    return this.http
      .post(`${this.url2}`, {
        nombre,
        apellidos,
        matricula,
        contraseña,
      })
      .toPromise();
  }
}
