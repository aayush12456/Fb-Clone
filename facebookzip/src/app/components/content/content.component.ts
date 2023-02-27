import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Data } from '../data-model';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(public dataService: DataService) { }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }
    console.log(form.value)
    this.dataService.addPost(form.value.content)
    form.resetForm()
  }
  ngOnInit(): void {
  }

}
