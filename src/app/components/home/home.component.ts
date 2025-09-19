import { Component, OnInit } from '@angular/core';

export interface Anomalia {
  id: string;
  dataRilevazione: Date;
  ora: string;
  livello: 'Alto' | 'Basso' | 'Critico';
  origine: 'Impianto' | 'Utenza';
  tipologia: 'Manuale' | 'Algoritmo';
  note: string;
  stato: 'Attivo' | 'Dismesso';
  sensore: string;
  codice: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  activeTab: 'Attive' | 'Dismesse' = 'Attive';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 97;

  anomalie: Anomalia[] = [
    {
      id: '1',
      dataRilevazione: new Date('2025-01-25'),
      ora: '10:45',
      livello: 'Alto',
      origine: 'Impianto',
      tipologia: 'Manuale',
      note: '',
      stato: 'Attivo',
      sensore: 'Umidità Ambientale',
      codice: 'WTR-18193'
    },
    {
      id: '2',
      dataRilevazione: new Date('2025-01-25'),
      ora: '09:40',
      livello: 'Basso',
      origine: 'Utenza',
      tipologia: 'Algoritmo',
      note: '',
      stato: 'Attivo',
      sensore: 'Temperatura Acqua',
      codice: 'WTR-86406'
    },
    {
      id: '3',
      dataRilevazione: new Date('2025-01-25'),
      ora: '08:20',
      livello: 'Basso',
      origine: 'Impianto',
      tipologia: 'Algoritmo',
      note: '',
      stato: 'Attivo',
      sensore: 'Temperatura Acqua',
      codice: 'WTR-99179'
    },
    {
      id: '4',
      dataRilevazione: new Date('2025-01-25'),
      ora: '07:15',
      livello: 'Alto',
      origine: 'Utenza',
      tipologia: 'Algoritmo',
      note: '',
      stato: 'Attivo',
      sensore: 'Livello Serbatoio',
      codice: 'WTR-36122'
    },
    {
      id: '5',
      dataRilevazione: new Date('2025-01-25'),
      ora: '05:10',
      livello: 'Critico',
      origine: 'Utenza',
      tipologia: 'Algoritmo',
      note: '',
      stato: 'Attivo',
      sensore: 'Umidità Ambientale',
      codice: 'WTR-31147'
    },
    {
      id: '6',
      dataRilevazione: new Date('2025-01-25'),
      ora: '23:50',
      livello: 'Critico',
      origine: 'Utenza',
      tipologia: 'Manuale',
      note: '',
      stato: 'Attivo',
      sensore: 'pH',
      codice: 'WTR-18544'
    },
    {
      id: '7',
      dataRilevazione: new Date('2025-01-25'),
      ora: '22:35',
      livello: 'Basso',
      origine: 'Impianto',
      tipologia: 'Algoritmo',
      note: '',
      stato: 'Attivo',
      sensore: 'Torbidità',
      codice: 'WTR-24584'
    },
    {
      id: '8',
      dataRilevazione: new Date('2025-01-25'),
      ora: '21:30',
      livello: 'Alto',
      origine: 'Utenza',
      tipologia: 'Algoritmo',
      note: '',
      stato: 'Attivo',
      sensore: 'Livello Serbatoio',
      codice: 'WTR-29797'
    },
    {
      id: '9',
      dataRilevazione: new Date('2025-01-25'),
      ora: '20:55',
      livello: 'Basso',
      origine: 'Utenza',
      tipologia: 'Manuale',
      note: '',
      stato: 'Attivo',
      sensore: 'Livello Serbatoio',
      codice: 'WTR-34694'
    },
    {
      id: '10',
      dataRilevazione: new Date('2025-01-25'),
      ora: '19:40',
      livello: 'Alto',
      origine: 'Utenza',
      tipologia: 'Algoritmo',
      note: '',
      stato: 'Attivo',
      sensore: 'Temperatura Acqua',
      codice: 'WTR-93632'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get filteredAnomalies(): Anomalia[] {
    return this.anomalie.filter(anomalia => {
      const matchesTab = anomalia.stato === this.activeTab.replace('e', 'o');
      const matchesSearch = !this.searchTerm || 
        anomalia.sensore.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        anomalia.codice.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        anomalia.livello.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }

  get paginatedAnomalies(): Anomalia[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAnomalies.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAnomalies.length / this.itemsPerPage);
  }

  setActiveTab(tab: 'Attive' | 'Dismesse'): void {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.currentPage = 1;
  }

  changePage(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    } else if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  changeItemsPerPage(count: number): void {
    this.itemsPerPage = count;
    this.currentPage = 1;
  }

  getLevelClass(livello: string): string {
    switch (livello) {
      case 'Alto': return 'level-alto';
      case 'Basso': return 'level-basso';
      case 'Critico': return 'level-critico';
      default: return '';
    }
  }

  getOriginClass(origine: string): string {
    switch (origine) {
      case 'Impianto': return 'origin-impianto';
      case 'Utenza': return 'origin-utenza';
      default: return '';
    }
  }

  getTipologiaClass(tipologia: string): string {
    switch (tipologia) {
      case 'Manuale': return 'tipologia-manuale';
      case 'Algoritmo': return 'tipologia-algoritmo';
      default: return '';
    }
  }

  editAnomalia(anomalia: Anomalia): void {
    console.log('Edit anomalia:', anomalia);
    // Implementa la logica di modifica
  }

  viewDetails(anomalia: Anomalia): void {
    console.log('View details:', anomalia);
    // Implementa la logica per visualizzare i dettagli
  }

  exportData(): void {
    console.log('Export data');
    // Implementa la logica di esportazione
  }
}
