import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrl: './lista-empleados.component.css'
})

export class ListaEmpleadosComponent {

  empleados: Empleado[];

  constructor(private empleadoService: EmpleadoService, private router:Router) {}
    ngOnInit(): void{
      this.obtenerListaEmpleados();
    }

    actualizarEmpleado(id:number){
      this.router.navigate(['actualizar-empleado', id]);
    }

    eliminarEmpleado(id:number){
      this.empleadoService.eliminarEmpleado(id).subscribe(dato=>{
        console.log(dato);
        this.obtenerListaEmpleados();
      })
    }

    private obtenerListaEmpleados(){
      this.empleadoService.obtenerListaEmpleados().subscribe(
        dato => {this.empleados = dato;});
    }
   

}
