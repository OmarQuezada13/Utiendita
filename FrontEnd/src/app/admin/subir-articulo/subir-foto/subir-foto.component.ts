import { ArticulosService } from "src/app/services/articulos.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
@Component({
  selector: "app-subir-foto",
  templateUrl: "./subir-foto.component.html",
  styleUrls: ["./subir-foto.component.scss"],
})
export class SubirFotoComponent implements OnInit {
  miFoto: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private camera: Camera,
    private file: File,
    private articuloService: ArticulosService
  ) {}

  ngOnInit() {
    if (window.localStorage.getItem("usuario") == null) {
      this.router.navigate([`login`]);
    }
  }

  tomarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.subirImagen(base64Image);
      },
      (err) => {
        // Handle error
      }
    );
  }

  subirImagen(base64: any) {
    let id = this.route.snapshot.paramMap.get("id");

    this.articuloService
      .subirImagen(base64, id)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
