import { Injectable } from '@angular/core';
import { Moda } from '../models/moda.model';

@Injectable({
  providedIn: 'root'
})
export class ModaService {

  private publicacoes: Moda[] = [
    {
      id: 1,
      titulo: 'Look casual de inverno',
      descricao: 'Combinação com jaqueta jeans, tricot bege e botas Chelsea para dias frios.',
      imagem: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
      categoria: 'Casual'
    },
    {
      id: 2,
      titulo: 'Street style urbano',
      descricao: 'Moletom oversized, calça cargo e tênis chunky. O estilo das ruas reinventado.',
      imagem: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=500&fit=crop',
      categoria: 'Street'
    },
    {
      id: 3,
      titulo: 'Elegância minimalista',
      descricao: 'Vestido midi neutro com sandálias de salto e bolsa estruturada.',
      imagem: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop',
      categoria: 'Elegante'
    },
    {
      id: 4,
      titulo: 'Verão romântico',
      descricao: 'Vestido floral leve, chapéu de palha e sandálias rasteiras para dias quentes.',
      imagem: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop',
      categoria: 'Romântico'
    },
    {
      id: 5,
      titulo: 'Power dressing',
      descricao: 'Blazer oversized com calça de alfaiataria. Perfeito para reuniões e eventos.',
      imagem: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&h=500&fit=crop',
      categoria: 'Formal'
    },
    {
      id: 6,
      titulo: 'Look boho chic',
      descricao: 'Estampas étnicas, franjas e acessórios naturais para um visual livre e despojado.',
      imagem: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop',
      categoria: 'Boho'
    }
  ];

  private proximoId = 7;

  listar(): Moda[] {
    return this.publicacoes;
  }

  buscarPorId(id: number): Moda | undefined {
    return this.publicacoes.find(p => p.id === id);
  }

  criar(novaPublicacao: Omit<Moda, 'id'>): Moda {
    const publicacao: Moda = {
      ...novaPublicacao,
      id: this.proximoId++
    };
    this.publicacoes.push(publicacao);
    return publicacao;
  }

  editar(id: number, dadosAtualizados: Omit<Moda, 'id'>): boolean {
    const index = this.publicacoes.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.publicacoes[index] = { ...dadosAtualizados, id };
    return true;
  }

  excluir(id: number): boolean {
    const index = this.publicacoes.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.publicacoes.splice(index, 1);
    return true;
  }
}
