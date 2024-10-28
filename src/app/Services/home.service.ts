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
      console.log(this.testimonials)


    }, err => {
      console.log(err.message)
    });
  }


  homePage: any = [];
  getHomePage() {
    this.http.get('https://localhost:7117/api/Home').subscribe(result => {
      this.homePage = result;

    }, err => {
      console.log(err.message)
    });
  }


  contactInfo: any = [];
  getContactInfo() {
    this.http.get('https://localhost:7117/api/Contact').subscribe(result => {
      this.contactInfo = result;

    }, err => {
      console.log(err.message)
    });
  }


  aboutPage: any = [];
  getAboutInfo() {
    this.http.get('https://localhost:7117/api/About').subscribe(result => {
      this.aboutPage = result;

    }, err => {
      console.log(err.message)
    });
  }


  userProfileInfo: any;
  getUserProfileInfo(userId: any) {
    this.http.get('https://localhost:7117/api/User/getUserById/' + userId).subscribe(
      result => {
        this.userProfileInfo = result;
        console.log("USERID", userId)
        console.log("RESULT", result)
      }, err => {
        console.log('no cant bring data for the user')
      });
  }


  airlineProfileInfo: any;
  getAirlineProfileInfo(airId: any) {
    this.http.get('https://localhost:7117/api/Airline/GetAirlineById/' + airId).subscribe(
      result => {
        this.airlineProfileInfo = result;
      }, err => {
        console.log(err.message)
      });
  }



  CreateTestimonial(body: any) {
    this.http.post('https://localhost:7117/api/Testimonial/CreateTestimonial', body).subscribe(
      resp => {
        console.log('Testimonial created')
      }, err => {
        console.log(err.message)
      });
  }


  deleteTestimonial(id: number) {
    this.http.delete('https://localhost:7117/api/Testimonial/DeleteTestimonial/' + id).subscribe(
      result => {
        console.log('the testimonial is deleted');
      }, err => {
        console.log(err.message)
      });
    window.location.reload();
  }


  UpdateTestimonial(id: number, status: string) {
    //debugger

    this.http.put('https://localhost:7117/api/Testimonial/ChangeTestimonialStatus/' + id + '/' + status, null).subscribe(
      (resp) => {
        console.log('Testimonial status updated')
      }, err => {
        console.log('Error')
      })
    window.location.reload();
  }



}
