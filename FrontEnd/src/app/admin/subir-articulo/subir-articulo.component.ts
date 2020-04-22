import { Router } from "@angular/router";
import { ArticulosService } from "./../../services/articulos.service";
import { File } from "@ionic-native/file/ngx";
import { Component, OnInit } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-subir-articulo",
  templateUrl: "./subir-articulo.component.html",
  styleUrls: ["./subir-articulo.component.scss"],
})
export class SubirArticuloComponent implements OnInit {
  miFoto: any;
  nombre: any;
  descripcion: any;
  costo: any;
  inventario: any;
  constructor(
    private camera: Camera,
    private file: File,
    private articuloService: ArticulosService,
    private router: Router
  ) {}

  ngOnInit() {
    if (window.localStorage.getItem("usuario") == null) {
      this.router.navigate([`login`]);
    }
  }

  agregarArticulo() {
    let id: any;
    this.articuloService
      .registrar(this.nombre, this.descripcion, this.costo, this.inventario)
      .then((data) => {
        id = data["cont"]._id;
        this.router.navigate([`admin/subir/${id}`]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  tomarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        let filename = imageData.substring(imageData.lastIndexOf("/") + 1);
        let path = imageData.substring(0, imageData.lastIndexOf("/") + 1);
        this.file.readAsDataURL(path, filename).then((base64) => {
          this.miFoto = base64;
        });
      },
      (err) => {
        // Handle error
      }
    );
  }
  obtenerFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    };
    this.camera.getPicture().then(
      (imageData) => {
        let filename = imageData.substring(imageData.lastIndexOf("/") + 1);
        let path = imageData.substring(0, imageData.lastIndexOf("/") + 1);
        this.file.readAsDataURL(path, filename).then((base64) => {
          this.miFoto = base64;
        });
      },
      (err) => {
        // Handle error
      }
    );
  }
}
