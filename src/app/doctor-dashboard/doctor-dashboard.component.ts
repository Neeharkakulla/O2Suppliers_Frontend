import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationForm } from '../../model/application-form';
import { DoctorDetails } from '../../model/doctor-details';
import { DoctorService } from '../../service/doctor.service';
import { ImageService } from '../../service/image.service';
import { ApplicationFormService } from '../../service/application-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ImageviewerComponent } from '../imageviewer/imageviewer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,ImageviewerComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {
  emergency: string = "select"
  doctor!: DoctorDetails
  applications!: ApplicationForm[]
  oldPassword: any;
  passwordValid: boolean = false;
  newpassword: any;
  newpassword2: any;
  checkStatus: boolean = true;
  myDetails: boolean = false;
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageUploded: boolean = false;
  imageName: any;
  @Output() imagedata:any;
  constructor(private doctorService: DoctorService,
    private formService: ApplicationFormService,
    private router: Router,
    private imageService: ImageService) { }

  ngOnInit(): void {
    if (this.doctorService.adoctor == undefined)
      this.router.navigate([''])
    this.doctor = this.doctorService.adoctor
    this.getApplications();
  }
  getApplications() {
    this.formService.getApplicationsWithDoctor().subscribe(data => {
      this.applications = data
    }, err => {
      alert(err.name)
    });
  }


  logout() {
    this.doctorService.adoctor = undefined
    this.router.navigate([''])
  }
  myAccount() {
    this.checkStatus = false;
    this.myDetails = true;


  }
  waitingApplications() {
    this.checkStatus = true;
    this.myDetails = false;

  }
  validate() {
    this.doctorService.validatepassword(this.oldPassword).subscribe(data => {
      if (data)
        this.passwordValid = true;
      else
        alert("Please enter a valid Password")
    });
  }
  changePassword() {
    if (!this.passwordValid) {
      alert("Please validate your Password")
      return;
    }
    console.log(this.newpassword2 == this.newpassword)
    console.log(this.newpassword2 === this.newpassword)
    if (!(this.newpassword === this.newpassword2)) {
      alert("Passwords Did not match")
      return;
    }
    this.doctorService.adoctor.password = this.newpassword;
    this.doctorService.changePassword().subscribe(data => {
      alert(" Password Succesfully Changed")
      this.newpassword = ""
      this.newpassword2 = ""
      this.oldPassword = ""
      this.passwordValid = false;
    });
  }
//Gets called when the user clicks on retieve image button to get the image from back end
getImage(id: any) {
  //Make a call to Sprinf Boot to get the Image Bytes.
  this.imagedata=undefined;
  this.imageService.getImage(id).subscribe(
    res => {
      this.retrieveResonse = res;
      this.imagedata=this.retrieveResonse.picByte;
    }
  );
}
  approve(form: ApplicationForm) {
    form.approvedBy = this.doctor.firstName + " " + this.doctor.lastName
    if (form.emergency == null && form.emergency == undefined) {
      alert("Please Specify Emergency!")
      return
    }
    this.formService.approve(form).subscribe(data => {
      this.applications = data;
    })
  }

}
