import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  onSignup(form: NgForm) {
    if (form.invalid) {
      return
    }
    console.log(form.value)
    this.authService.createUser(form.value.firstName, form.value.lastName, form.value.emailorphone, form.value.password, form.value.date)
    form.resetForm()
  }
  constructor(public authService: AuthService) { }

  ngOnInit(): void {


  }

}
