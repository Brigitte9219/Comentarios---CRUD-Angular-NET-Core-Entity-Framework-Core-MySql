import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/app/interfaces/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent {
  agregarComentario: FormGroup;
  accion = 'Agregar';
  id = 0;
  comentario: Comentario | undefined;

  constructor(private fb: FormBuilder,
              private _comentarioService: ComentarioService,//se llama el servicio
              private router: Router,//se usa para movernos entre componentes
              private aRoute: ActivatedRoute){//Se usa para extraer el id
  this.agregarComentario = this.fb.group({
    titulo: ['', Validators.required],
    creador: ['', Validators.required],
    texto: ['', Validators.required],
  })
  this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit():void {
  this.esEditar();
  }

  //Cambia el nombre de Agregar a Editar cuando se da click en "Editar" y adicional muestra los datos en el formulario para poder editarlos
  esEditar(){
  if (this.id !== 0){
    this.accion = 'Editar';
    this._comentarioService.getComentario(this.id).subscribe(data => {
      console.log(data);
      this.comentario = data;
      this.agregarComentario.patchValue({
        titulo: data.titulo,
        texto: data.texto,
        creador: data.creador,
      })
    }, error => {
      console.log(error);
    })
  }
  }

  agregarEditarComentario(){
  console.log(this.agregarComentario);

  if(this.comentario == undefined){
  //Agregamos un nuevo comentario
  const comentario: Comentario = {
    titulo: this.agregarComentario.get('titulo')?.value,
    creador: this.agregarComentario.get('creador')?.value,
    texto: this.agregarComentario.get('texto')?.value,
    fechaCreacion: new Date
  }

  this._comentarioService.saveComentario(comentario).subscribe(data => {
  this.router.navigate(['/']);
  }, error => {
    console.log(error);
  })
  }else{
  //Editamos comentario
  const comentario: Comentario = {
    id: this.comentario.id,
    titulo: this.agregarComentario.get('titulo')?.value,
    creador: this.agregarComentario.get('creador')?.value,
    texto: this.agregarComentario.get('texto')?.value,
    fechaCreacion: this.comentario.fechaCreacion
  }
  this._comentarioService.updateComentario(this.id, comentario).subscribe(data => {
    this.router.navigate(['/']);
  }, error => {
    console.log(error);
  })
}
}
}
