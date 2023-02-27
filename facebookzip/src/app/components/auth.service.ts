import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { post } from './post-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string
  public isAuthenticated = false
  private authStatusListener = new Subject<boolean>()
  private tokenTimer: any
  private userId: string
  constructor(private http: HttpClient, private router: Router, private alertify: AlertifyService) { }
  getToken() {
    return this.token
  }
  getauthStatusListener() {
    return this.authStatusListener.asObservable()
  }
  getisAuth() {
    return this.isAuthenticated
  }
  getUserId() {
    return this.userId
  }
  createUser(firstName: string, lastName: string, emailorphone: string, password: string, date: string) {
    const authData: AuthData = { firstName: firstName, lastName: lastName, emailorphone: emailorphone, password: password, date: date }
    this.http.post('http://localhost:3000/api/user/signup', authData).subscribe((response) => {
      console.log(response)
      this.router.navigate(['/home'])
    }, error => {
      this.authStatusListener.next(false)
    })
    this.alertify.success("You have successfully registerd your data")
  }
  LogIn(emailorphone: string, password: string) {
    const Post: post = { emailorphone: emailorphone, password: password }
    this.http.post<{ token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/user/login', Post).subscribe(response => {
      console.log(response)
      const token = response.token
      this.token = token
      if (token) {
        this.isAuthenticated = true
        this.authStatusListener.next(true)
        const expirationDuration = response.expiresIn
        this.setAuthTimer(expirationDuration)
        const userId = response.userId
        const now = new Date()
        const expirationDate = new Date(now.getTime() + expirationDuration + 1000)
        console.log(expirationDate)
        this.saveAuthData(token, expirationDate)
        this.router.navigate(['/home'])
        this.alertify.success("Congrats you are logged in successfully")
      }
      else {
        this.alertify.error('Kindly provide the required fields')
      }
    })
  }
  autoAuthUser() {
    const authInformation = this.getAuthData()
    if (!authInformation) {
      return
    }
    const now = new Date()
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime()
    console.log(authInformation, expiresIn)
    if (expiresIn > 0) {
      this.token = authInformation.token
      this.isAuthenticated = true
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
    }
  }
  Logout() {
    //this.token=null
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.router.navigate(['/chatapp'])
    clearTimeout(this.tokenTimer)
    //this.userId=null
    this.clearAuthData()
  }
  private setAuthTimer(duration: number) {
    console.log('setting timer:' + duration)
    this.tokenTimer = setTimeout(() => {
      this.Logout()
    }, duration)
  }
  private saveAuthData(token: string, expressionDate: Date) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expressionDate.toISOString())
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration')
  }
  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    if (!token || !expirationDate) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}
