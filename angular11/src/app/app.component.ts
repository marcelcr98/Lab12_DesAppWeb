import { Component } from '@angular/core';
import { ProductosService } from './services/productos.service';
import { HttpClient } from '@angular/common/http';
import { UploadService } from './services/upload.service';

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
  constructor(private productosServicio: ProductosService, private serviceUpload: UploadService) {}

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



  

  uploadedFiles: Array < File > ;
   
  fileChange(element) {
    console.log('fileChangexx');
    this.uploadedFiles = element.target.files;
  }
  upload() {
    console.log('uploadxxx');
    let formData = new FormData();
    console.log('uploadedFiles:');
    console.log(this.uploadedFiles);
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      console.log('Inicio FOR');
      // formData.append("file[]",this.uploadedFiles[0]);
      formData.append("file",
	    this.uploadedFiles[i],
      this.uploadedFiles[i].name);

    }
    console.log('formData:');
    console.log(formData);
    this.serviceUpload.uploadFile(formData).subscribe((res)=> {
      console.log('response received is ', res);
    });
  }
}