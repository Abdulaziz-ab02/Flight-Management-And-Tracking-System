import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-airport',
  templateUrl: './create-airport.component.html',
  styleUrls: ['./create-airport.component.css']
})
export class CreateAirportComponent {
  constructor(public admin:AdminService){}
  cities: { cityname: string, id: number }[] = [];


  createAirport : FormGroup= new FormGroup ({
    airportname : new FormControl ("",Validators.required),
    iatacode:new FormControl ("",Validators.required),
    longitude:new FormControl ("",Validators.required),
    latitude : new FormControl ("",Validators.required),
    airportimage:new FormControl (),
    cityid:new FormControl ("",Validators.required)
   })
  


 ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.admin.GetAllCiies().subscribe(
      (res: any[]) => {
        this.cities = res.map(cityObj => ({
          cityname: cityObj.cityname,
          id: cityObj.id
        }));
      },
      (err: any) => {
        console.error('Error loading cities:', err);
      }
    );
  }

  
   save(){
    this.admin.createAirport(this.createAirport.value);
    window.location.reload();
   }
  
   uploadFile(file:any){
    if(file.length==0)
      return;
    let upload=<File> file[0];
    const formData= new FormData();
    formData.append("file",upload,upload.name);
    this.admin.uploadImage(formData);
    
     }


}
