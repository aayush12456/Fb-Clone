import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ContentComponent } from '../content/content.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cookieMessage = 'this website uses cookies in order to offer you the most relevant information.please accept cookies for optimal performance'
  cookieDismiss = 'Yes, I accept cookies'
  cookieLinkText = 'learn more'
  environmentFrontend = 'https://profoto.com/uk/cookies?gclid=CjwKCAjw2f-VBhAsEiwAO4lNeGO-9mEkjDuj0uWsSwgQYB2KicK_aXDDKJke904CCZr7GBo4jo2mDhoCGA8QAvD_BwE'
  constructor(private titleService: Title, private dialog: MatDialog) {
    titleService.setTitle('Facebook')
  }
  contentDialog() {
    this.dialog.open(ContentComponent)
  }
  ngOnInit() {
    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#164969"
        },
        button: {
          background: "#ffe000",
          text: "#164969"
        }
      },
      theme: "classic",
      content: {
        message: this.cookieMessage,
        dismiss: this.cookieDismiss,
        link: this.cookieLinkText,
        href: this.environmentFrontend + "/dataprivacy"
      }
    });
  }

}

