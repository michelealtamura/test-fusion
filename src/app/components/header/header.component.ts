import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/model/utente';
import { C } from 'src/app/service/c';
import { ModelloService } from 'src/app/service/modello.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() public titolo?: string;

  constructor(private modello: ModelloService, private router: Router){}

  get utente(): Utente | undefined {
    return this.modello.getPersistentBean<Utente>(C.UTENTE_LOGIN);
  }

  logout(): void {
    this.modello.removePersistentBean(C.UTENTE_LOGIN);
    this.router.navigateByUrl('/login');
  }

}
