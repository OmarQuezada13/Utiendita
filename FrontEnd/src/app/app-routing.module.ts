import { SubirFotoComponent } from "./admin/subir-articulo/subir-foto/subir-foto.component";
import { ProductDetailsAdminComponent } from "./admin/product-details-admin/product-details-admin.component";
import { RegisterComponent } from "./register/register.component";
import { SubirArticuloComponent } from "./admin/subir-articulo/subir-articulo.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { NgModule, Component } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ProductDetailsComponent } from "./tab1/product-details/product-details.component";
import { ComprasComponent } from "./tab3/compras/compras.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "registro",
    component: RegisterComponent,
  },
  {
    path: "verCompras",
    component: ComprasComponent,
  },
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "details/:id",
    component: ProductDetailsComponent,
  },
  {
    path: "admin",
    component: AdminComponent,
  },
  {
    path: "admin/subirArticulo",
    component: SubirArticuloComponent,
  },
  {
    path: "admin/details/:id",
    component: ProductDetailsAdminComponent,
  },
  {
    path: "admin/subir/:id",
    component: SubirFotoComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
