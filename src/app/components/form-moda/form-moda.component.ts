import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Moda } from '../../models/moda.model';

@Component({
  selector: 'app-form-moda',
  templateUrl: './form-moda.component.html',
  styleUrls: ['./form-moda.component.css']
})
export class FormModaComponent implements OnChanges {

  @Input() publicacaoParaEditar: Moda | null = null;
  @Input() visivel = false;

  @Output() aoSalvar = new EventEmitter<Omit<Moda, 'id'>>();
  @Output() aoFechar = new EventEmitter<void>();

  categorias = ['Casual', 'Elegante', 'Street', 'Romântico', 'Formal', 'Boho', 'Esportivo', 'Vintage'];

  titulo = '';
  descricao = '';
  imagem = '';
  categoria = '';

  erros: { [campo: string]: string } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['publicacaoParaEditar']) {
      if (this.publicacaoParaEditar) {
        this.titulo = this.publicacaoParaEditar.titulo;
        this.descricao = this.publicacaoParaEditar.descricao;
        this.imagem = this.publicacaoParaEditar.imagem;
        this.categoria = this.publicacaoParaEditar.categoria || '';
      } else {
        this.limparFormulario();
      }
    }
  }

  get modoEdicao(): boolean {
    return this.publicacaoParaEditar !== null;
  }

  validar(): boolean {
    this.erros = {};
    if (!this.titulo.trim()) this.erros['titulo'] = 'O título é obrigatório.';
    if (!this.descricao.trim()) this.erros['descricao'] = 'A descrição é obrigatória.';
    if (!this.imagem.trim()) this.erros['imagem'] = 'A URL da imagem é obrigatória.';
    return Object.keys(this.erros).length === 0;
  }

  salvar(): void {
    if (!this.validar()) return;

    this.aoSalvar.emit({
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      imagem: this.imagem.trim(),
      categoria: this.categoria || undefined
    });

    this.limparFormulario();
  }

  fechar(): void {
    this.limparFormulario();
    this.aoFechar.emit();
  }

  private limparFormulario(): void {
    this.titulo = '';
    this.descricao = '';
    this.imagem = '';
    this.categoria = '';
    this.erros = {};
  }
}
