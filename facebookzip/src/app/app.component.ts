import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './components/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'chatapp';

  navbarfixed: boolean = false
  private authStatusLib: Subscription
  UserisAuthenticated = false
  Showcontent = false
  Disablecontent = true 


  showContent() {
    this.Showcontent = true
    this.Disablecontent = false
  }
  disableContent() {
    this.Showcontent = false
    this.Disablecontent = true
  }
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true
    }
    else {
      this.navbarfixed = false
    }
  }
  loggedin() { }
  constructor(private authService: AuthService) { }
  Logout() {
    this.authService.Logout()
  }
  ngOnInit() {
    this.authStatusLib = this.authService.getauthStatusListener().subscribe(isAuthenticated => {
      this.UserisAuthenticated = isAuthenticated
    })
    this.authService.autoAuthUser()
    this.UserisAuthenticated = this.authService.getisAuth()
  }
  ngOnDestroy() {
    this.authStatusLib.unsubscribe()
  }
}
