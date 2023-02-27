import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Subject } from 'rxjs';
import { Data } from './data-model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: Data[] = []
  private postUpdated = new Subject<Data[]>()
  getPost() {
    this.http.get<{ message: string, data: Data[] }>('http://localhost:3000/api/post/get').subscribe((postData) => {
      this.data = postData.data
      this.postUpdated.next([...this.data])
    })
  }
  getPostUpdateListener() {
    return this.postUpdated.asObservable()
  }
  addPost(content: string) {
    const data: Data = { content: content }
    this.http.post<{ message: string }>('http://localhost:3000/api/post', data).subscribe((response) => {
      console.log(response.message)
      this.data.push(data)
      this.postUpdated.next([...this.data])
    })
  }
  constructor(private http: HttpClient) { }
}
