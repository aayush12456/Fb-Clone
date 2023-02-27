import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatappComponent } from './components/chatapp/chatapp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './components/home/home.component';
import { ErrorInterceptor } from './components/error-interceptor';
import { ErrorComponent } from './components/error/error.component';
import { AlertifyService } from './components/alertify.service';
import { MatListModule } from '@angular/material/list';
import { ContentComponent } from './components/content/content.component';
import { BoxComponent } from './components/box/box.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageComponent } from './components/page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatappComponent,
    ModalComponent,
    NavbarComponent,
    HomeComponent,
    ErrorComponent,
    ContentComponent,
    BoxComponent,
    PageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, AlertifyService],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],

})
export class AppModule { }
