import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { RegistrarEmpleadoComponent } from './registrar-empleado/registrar-empleado.component';
import { ActualizarEmpleadoComponent } from './actualizar-empleado/actualizar-empleado.component';

const routes: Routes = [
  { path: 'empleados', component: ListaEmpleadosComponent },
  { path: '', redirectTo: 'empleados', pathMatch:'full' }, // Redirect to empleados page if no other route matches
  { path: 'registrar-empleado', component: RegistrarEmpleadoComponent },
  { path: 'actualizar-empleado/:id', component: ActualizarEmpleadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
