import { AlertController } from "@ionic/angular";
import { CompraService } from "./../services/compra.service";
import { UsuarioService } from "./../services/usuario.service";
import { CarritoService } from "./../services/carrito.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration,
} from "@ionic-native/paypal/ngx";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  carritos: any[] = [];
  totalPagar;
  botonPagar: boolean = true;

  cantidad: any;
  usuario: any = JSON.parse(window.localStorage.getItem("usuario"));

  constructor(
    private router: Router,
    public carritoService: CarritoService,
    public usuarioService: UsuarioService,
    public compraServicio: CompraService,
    // private payPal: PayPal,
    private alertController: AlertController
  ) {}
  ionViewDidLoad() {
    if (window.localStorage.getItem("usuario") == null) {
      this.router.navigate([`login`]);
    }
    this.getCarrito(this.usuario._id);
  }
  viewProduct(id: any) {
    this.router.navigate([`details/${id}`]);
  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.getCarrito(this.usuario._id);
    }, 2000);
  }

  getCarrito(id: any) {
    this.carritoService
      .getCarrito(id)
      .then((data) => {
        this.carritos = data["cont"];
        this.totalaPagar();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  deleteCarrito(id: any) {
    this.carritoService
      .deleteCarrito(id)
      .then((data) => {
        this.getCarrito(this.usuario._id);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  putCarrito(id: any, cantidad: Number) {
    this.carritoService
      .putCarrito(id, cantidad)
      .then((data) => {
        this.getCarrito(this.usuarioService.usuario._id);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // payButtonHandler() {
  //   this.payPal
  //     .init({
  //       PayPalEnvironmentProduction: "",
  //       PayPalEnvironmentSandbox:
  //         "AccE05azJqE5lsOKo2bKHRbJwHRXlRMRMh68-TIE10JuFRdETt7GAzIury6YTneTSsGBNFE6NdFztpjW",
  //     })
  //     .then(
  //       () => {
  //         // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  //         this.payPal
  //           .prepareToRender(
  //             "PayPalEnvironmentSandbox",
  //             new PayPalConfiguration({
  //               // Only needed if you get an "Internal Service Error" after PayPal login!
  //               //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  //               acceptCreditCards: true,
  //             })
  //           )
  //           .then(
  //             () => {
  //               let payment = new PayPalPayment(
  //                 this.totalPagar,
  //                 "MXM",
  //                 "Description",
  //                 "sale"
  //               );
  //               this.payPal.renderSinglePaymentUI(payment).then(
  //                 () => {
  //                   // Successfully paid
  //                   this.compraCarrito();
  //                 },
  //                 () => {
  //                   // Error or render dialog closed without being successful
  //                 }
  //               );
  //             },
  //             () => {
  //               // Error in configuration
  //             }
  //           );
  //       },
  //       () => {
  //         // Error in initialization, maybe PayPal isn't supported or something else
  //       }
  //     );
  // }

  totalaPagar() {
    let pagar = 0;
    for (let index = 0; index < this.carritos.length; index++) {
      pagar =
        pagar +
        this.carritos[index].cantidad * this.carritos[index].articulo.costo;

      this.totalPagar = pagar;
    }
    if (this.carritos.length == 0) {
      this.totalPagar = 0;
    }
  }

  comprar(articulo, cantidad) {
    this.compraServicio
      .comprar(articulo, cantidad)
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  compraCarrito() {
    this.carritos.forEach((carrito) => {
      this.comprar(carrito.articulo._id, carrito.cantidad);
    });
    this.carritos.forEach((carrito) => {
      this.deleteCarrito(carrito._id);
    });
  }
}
