import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient) { }


  testimonials: any = [];
  
  getAllTestimonials() {
   
    this.http.get('https://localhost:7117/api/Testimonial').subscribe(result => {
        this.testimonials = result;
      },
      err => {
        console.log(err.message)
      }
    );
  }



}
