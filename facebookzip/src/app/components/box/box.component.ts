import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Data } from '../data-model';
import { DataService } from '../data.service';
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  datas: Data[] = []
  private postSub: Subscription
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPost()
    this.postSub = this.dataService.getPostUpdateListener().subscribe((data: Data[]) => {
      this.datas = data
    })
  }

}
