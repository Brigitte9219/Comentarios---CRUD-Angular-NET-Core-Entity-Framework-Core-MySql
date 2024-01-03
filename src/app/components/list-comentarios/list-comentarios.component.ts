import { Component } from '@angular/core';
import { Comentario } from 'src/app/interfaces/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent {

  listComentarios: Comentario[]=[];

constructor(private _comentarioService: ComentarioService){ }

ngOnInit(): void{
  this.getComentarios();
}

getComentarios(){
  this._comentarioService.getListComentarios().subscribe(data => {
    //console.log(data);
    this.listComentarios = data;
  }, error =>{
    console.log(error);
  })
}

eliminarComentario(id: any) {//tambien se puede hacer asi (id: number | undefined)
  console.log(id);
  this._comentarioService.deleteComentario(id).subscribe(data => {
    this.getComentarios();
  }, error =>{
    console.log(error);
  })
  }

}
