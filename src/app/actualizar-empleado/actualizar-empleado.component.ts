import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrl: './actualizar-empleado.component.css'
})

export class ActualizarEmpleadoComponent {

  id: number;
  empleado: Empleado=new Empleado();

  constructor(private empleadoService: EmpleadoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];

    this.empleadoService.obtenerEmpleadoPorId(this.id).subscribe(
      dato=>{
        this.empleado = dato;
      }),
      catchError(error => {
        console.error('Error al obtener el empleado', error);
        this.router.navigate(['/']);
        return error;
      })
  }

  actualizarEmpleado(){
    this.empleadoService.actualizarEmpleado(this.id, this.empleado).subscribe(
      ()=>{
        console.log('Empleado actualizado correctamente');
        this.router.navigate(['/']);
      },
      error=>{
        console.error('Error al actualizar el empleado', error);
      }
    )
  }

  onSubmit(){
    this.actualizarEmpleado();
  }

}
