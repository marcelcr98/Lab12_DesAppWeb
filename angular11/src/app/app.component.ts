import { Component } from '@angular/core';
import { ProductosService } from './services/productos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab11';
  lista=null;
  prod: any = {
    id:null,
    nombre:null,
    tipo:null,
    precio:null,
    cantidad:null
  }
  constructor(private productosServicio: ProductosService) {}

  ngOnInit() {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.productosServicio.listar().subscribe(result => {
      this.lista = result;
    });
  }

  nuevo() {
    this.productosServicio.nuevo(this.prod).subscribe(result => {
      if (result=='ok') {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  eliminar(id) {
  	if(!confirm("Esta seguro que desea eliminar este registro?"))
  		return;
    this.productosServicio.eliminar(id).subscribe(result => {
      if (result=='ok') {
        this.recuperarTodos();
      }
    });
  }

  actualizar() {
    this.productosServicio.actualizar(this.prod).subscribe(result => {
      //if (result.nModified =='1') {
        this.limpiar();
        this.recuperarTodos();
      //}
    });    
  }
  
  mostrar(id: any) {
    this.productosServicio.mostrar(id).subscribe(result => {
      this.prod = result
    });
  }

  hayRegistros() {
    return true;
  }
  limpiar(){
    this.prod = { 
      id:null,
    nombre:null,
    tipo:null,
    precio:null,
    cantidad:null
    };
  }
}