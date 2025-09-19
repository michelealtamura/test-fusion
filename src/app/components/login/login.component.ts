import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelloService } from 'src/app/service/modello.service';
import { C } from 'src/app/service/c';
import { Utente } from 'src/app/model/utente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private modello: ModelloService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get utente(): Utente | undefined {
    return this.modello.getPersistentBean<Utente>(C.UTENTE_LOGIN);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const email = this.form.get('email')?.value;
    // In assenza di backend, simuliamo autenticazione
    const token = 'mock-token-' + Date.now();
    const utente = new Utente(email, token);
    this.modello.putPersistentBean(C.UTENTE_LOGIN, utente);
    this.submitting = false;
    // Redirect alla root (l'applicazione può cambiare destinazione)
    this.router.navigateByUrl('/');
  }

  logout(): void {
    this.modello.removePersistentBean(C.UTENTE_LOGIN);
    // Rimaniamo su /login dopo logout per mostrare il form
    this.router.navigateByUrl('/login');
  }

}
