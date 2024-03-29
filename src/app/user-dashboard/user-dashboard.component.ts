import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationForm } from '../../model/application-form';
import { Router } from '@angular/router';
import { UserDetails } from '../../model/user-details';
import { ImageService } from '../../service/image.service';
import { UserService } from '../../service/user.service';
import { ApplicationFormService } from '../../service/application-form.service';
import { ImageviewerComponent } from '../imageviewer/imageviewer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,ImageviewerComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  oldPassword: any;
  passwordValid: boolean = false;
  newpassword: any;
  newpassword2: any;
  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private imageService: ImageService,
    private formService: ApplicationFormService) { }

  application: boolean = false;
  checkStatus: boolean = false;
  myDetails: boolean = false;
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageUploded: boolean = false;
  imageName: any;
  user!: UserDetails;
  applicationForm!: FormGroup;
  submitted: boolean = false;
  applications!: ApplicationForm[];

  @Output() imagedata:any;
  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  apply() {
    this.submitted = true;
    console.log(this.applicationForm.value)
    if (!this.imageUploded) {
      alert("Please Upload Supporting Document")
      return;
    }
    this.formService.applyForm(this.applicationForm.value).subscribe(data => {
      alert("Succesfully Submitted")
      this.myApplications()
    }, err => {
      alert(err.name)
    });
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {

    let acceptedType = ['image/png', 'image/jpg', 'image/jpeg']
    let i = 0;
    for (let type of acceptedType) {

      if (type != this.selectedFile.type) {

        i++;
      }
      else
        break;



    }

    if (i >= 3) {
      const imageerror = document.getElementById("imageerror");
      if (imageerror)
        imageerror.innerHTML = "<p>Accepted formats .jpg .jpeg .png </p>"
      return;
    }

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.imageService.uploadImage(uploadImageData)
      .subscribe(response => {
        this.applicationForm.value.imageId = response.id;
        this.imageUploded = true;


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
  logout() {
    this.userService.auser = undefined;
    this.router.navigate([''])
  }

  showForm() {
    this.checkStatus = false;
    this.myDetails = false;
    this.application = true;

  }
  myApplications() {
    this.application = false;
    this.myDetails = false;
    this.checkStatus = true;

    this.formService.myApplication(this.user.email).subscribe(data => this.applications = data)
  }
  myAccount() {
    this.checkStatus = false;
    this.application = false;
    this.myDetails = true;

  }
  cancel(form: ApplicationForm) {
    form.status = false
    this.formService.cancel(form).subscribe();

  }
  revoke(form: ApplicationForm) {
    form.status = true
    this.formService.revoke(form).subscribe();

  }
  ngOnInit(): void {
    this.user = this.userService.auser;
    if (this.user == undefined || this.user == null)
      this.router.navigate([''])
 
    this.applicationForm = this.formBuilder.group({
      applicantName: [this.user.firstName + " " + this.user.lastName, Validators.required],
      applicantMail: [this.user.email, Validators.required],
      patientName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      mobile: [this.user.number],
      imageId: []
    });

    this.myApplications();
  }
  validate() {
    this.userService.validatepassword(this.oldPassword).subscribe(data => {
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
    this.userService.auser.password = this.newpassword;
    this.userService.changePassword().subscribe(data => {
      alert(" Password Succesfully Changed")
      this.newpassword = ""
      this.newpassword2 = ""
      this.oldPassword = ""
      this.passwordValid = false;
    });
  }

}

