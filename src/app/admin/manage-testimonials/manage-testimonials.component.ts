import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-testimonials',
  templateUrl: './manage-testimonials.component.html',
  styleUrls: ['./manage-testimonials.component.css']
})
export class ManageTestimonialsComponent implements OnInit {
  constructor(public home: HomeService, public dialog: MatDialog) { }

  @ViewChild('callDeleteDailog') deleteDialog !: TemplateRef<any>;
  @ViewChild('callChangeStatusDailog') changeStatusDialog !: TemplateRef<any>;


  ngOnInit(): void {
    this.home.getAllTestimonials();
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.deleteDialog).afterClosed().subscribe(
      result => {
        if (result != undefined) {
          if (result == 'yes')
            this.home.deleteTestimonial(id);
          else if (result == 'no')
            console.log('thank you')
        }
      });
  }

  approveTestimonial(id: number, status: string) {
    const dialogRef = this.dialog.open(this.changeStatusDialog).afterClosed().subscribe(
      result => {
        if (result != undefined) {
          if (result == 'yes')
            this.home.UpdateTestimonial(id, status);
          else if (result == 'no')
            console.log('thank you')
        }
      });

  }



}
