import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-degree-facility',
  templateUrl: './degree-facility.component.html',
  styleUrls: ['./degree-facility.component.css']
})
export class DegreeFacilityComponent implements OnInit{

  degreeId: number=0;
  degreeName: string = '';
  facilities: any[] = [];


  constructor( private route: ActivatedRoute, private adminService: AdminService, private router: Router ) {}


  ngOnInit(): void {  
    
     this.route.queryParams.subscribe((params) => {
      this.degreeId = +params['id'];  // Convert the degreeId to a number
      this.degreeName = params['name']; // Get the degree name

      this.GetAllFacilitesByDegreeId(this.degreeId);
    });
  
  }





   // Method to fetch facilities by degreeId
   GetAllFacilitesByDegreeId(id: number): void {
    console.log('Fetching facilities for degree ID:', id);
    this.adminService.GetAllFacilitesByDegree(id).subscribe(
      (res: any[]) => {console.log('Facilities fetched:', res);
        this.facilities = res;
         // Directly assign response to facilities array
      },
      (err: any) => {
        console.error('Error fetching facilities:', err);
      }
    );
  }

  goBack() {
    this.router.navigate(['/admin/Degree']); // Navigate to the Degree page
  }
}
