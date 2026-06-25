import { Component, OnInit } from '@angular/core';
import { Moda } from '../../models/moda.model';
import { ModaService } from '../../services/moda.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  publicacoes: Moda[] = [];

  formVisivel = false;

  publicacaoParaEditar: Moda | null = null;

  publicacaoDetalhes: Moda | null = null;

  termoBusca = '';

  categoriaFiltro = '';

  constructor(private modaService: ModaService) {}

  ngOnInit(): void {
    this.carregarPublicacoes();
  }

  carregarPublicacoes(): void {
    this.publicacoes = this.modaService.listar();
  }

  get publicacoesFiltradas(): Moda[] {
    return this.publicacoes.filter(p => {
      const buscaOk = p.titulo.toLowerCase().includes(this.termoBusca.toLowerCase()) ||
                      p.descricao.toLowerCase().includes(this.termoBusca.toLowerCase());
      const categoriaOk = !this.categoriaFiltro || p.categoria === this.categoriaFiltro;
      return buscaOk && categoriaOk;
    });
  }

  get categorias(): string[] {
    const cats = this.publicacoes
      .map(p => p.categoria)
      .filter((c): c is string => !!c);
    return [...new Set(cats)];
  }

  abrirFormCriacao(): void {
    this.publicacaoParaEditar = null;
    this.formVisivel = true;
  }

  abrirFormEdicao(publicacao: Moda): void {
    this.publicacaoParaEditar = publicacao;
    this.formVisivel = true;
  }

  salvarPublicacao(dados: Omit<Moda, 'id'>): void {
    if (this.publicacaoParaEditar) {
      this.modaService.editar(this.publicacaoParaEditar.id, dados);
    } else {
      this.modaService.criar(dados);
    }
    this.fecharForm();
    this.carregarPublicacoes();
  }

  fecharForm(): void {
    this.formVisivel = false;
    this.publicacaoParaEditar = null;
  }

  excluirPublicacao(id: number): void {
    const confirmou = confirm('Tem certeza que deseja excluir esta publicação?');
    if (confirmou) {
      this.modaService.excluir(id);
      this.carregarPublicacoes();
    }
  }

  verDetalhes(publicacao: Moda): void {
    this.publicacaoDetalhes = publicacao;
  }

  fecharDetalhes(): void {
    this.publicacaoDetalhes = null;
  }

  limparFiltros(): void {
    this.termoBusca = '';
    this.categoriaFiltro = '';
  }
}
