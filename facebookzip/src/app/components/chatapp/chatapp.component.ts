import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription
  isLoading = false


  openDialog() {
    this.dialog.open(ModalComponent)
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.authService.LogIn(form.value.emailorphone, form.value.password)
    form.resetForm()
  }
  constructor(private dialog: MatDialog, public authService: AuthService, private titleService: Title) {
    titleService.setTitle('Facebook-log in or signup')
  }
  ngOnInit() {
    this.authStatusSub = this.authService.getauthStatusListener().subscribe(authStatus => {
      this.isLoading = false
    })

  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
  }
}
