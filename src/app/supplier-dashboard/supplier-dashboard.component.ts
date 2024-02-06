import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationForm } from '../../model/application-form';
import { SupplierDetails } from '../../model/supplier-details';
import { ImageService } from '../../service/image.service';
import { O2SupplierService } from '../../service/o2-supplier.service';
import { ApplicationFormService } from '../../service/application-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageviewerComponent } from '../imageviewer/imageviewer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-dashboard',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,ImageviewerComponent],
  templateUrl: './supplier-dashboard.component.html',
  styleUrl: './supplier-dashboard.component.css'
})
export class SupplierDashboardComponent {


  supplier!: SupplierDetails
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
  constructor(private supplierService: O2SupplierService,
    private formService: ApplicationFormService,
    private router: Router,
    private imageService: ImageService) { }

  ngOnInit(): void {
    if (this.supplierService.asupplier == undefined)
      this.router.navigate([''])
    this.supplier = this.supplierService.asupplier
    this.getApplications();
  }
  getApplications() {
    this.formService.getApplicationsWithSupplier().subscribe(data => {
      this.applications = data
    }, err => {
      alert(err.name)
    });
  }


  logout() {
    this.supplierService.asupplier = undefined
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
    this.supplierService.validatepassword(this.oldPassword).subscribe(data => {
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
    this.supplierService.asupplier.password = this.newpassword;
    this.supplierService.changePassword().subscribe(data => {
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
  approveDelivery(form: ApplicationForm) {
    this.formService.approveDelivery(form).subscribe(data => {
      this.applications = data
    })
  }


}
