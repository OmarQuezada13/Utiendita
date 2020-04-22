import { SubirFotoComponent } from "./admin/subir-articulo/subir-foto/subir-foto.component";
import { ProductDetailsAdminComponent } from "./admin/product-details-admin/product-details-admin.component";
import { RegisterComponent } from "./register/register.component";
import { ConfiguracionComponent } from "./tab3/configuracion/configuracion.component";
import { SubirArticuloComponent } from "./admin/subir-articulo/subir-articulo.component";
import { AdminComponent } from "./admin/admin.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration,
} from "@ionic-native/paypal";

import { ProductDetailsComponent } from "./tab1/product-details/product-details.component";
import { LoginComponent } from "./login/login.component";
import { ComprasComponent } from "./tab3/compras/compras.component";
import { from } from "rxjs";

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    LoginComponent,
    AdminComponent,
    SubirArticuloComponent,
    ComprasComponent,
    ConfiguracionComponent,
    RegisterComponent,
    ProductDetailsAdminComponent,
    SubirFotoComponent,
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
