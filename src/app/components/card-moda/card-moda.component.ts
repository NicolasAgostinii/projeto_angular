import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Moda } from '../../models/moda.model';

@Component({
  selector: 'app-card-moda',
  templateUrl: './card-moda.component.html',
  styleUrls: ['./card-moda.component.css']
})
export class CardModaComponent {

  @Input() publicacao!: Moda;

  @Output() aoEditar = new EventEmitter<Moda>();
  @Output() aoExcluir = new EventEmitter<number>();
  @Output() aoVerDetalhes = new EventEmitter<Moda>();

  descricaoExpandida = false;

  editarPublicacao(): void {
    this.aoEditar.emit(this.publicacao);
  }

  excluirPublicacao(): void {
    this.aoExcluir.emit(this.publicacao.id);
  }

  verDetalhes(): void {
    this.aoVerDetalhes.emit(this.publicacao);
  }

  toggleDescricao(): void {
    this.descricaoExpandida = !this.descricaoExpandida;
  }
}
