import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorDetails } from '../../model/doctor-details';
import { DoctorService } from '../../service/doctor.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './doctor-login.component.html',
  styleUrl: './doctor-login.component.css'
})
export class DoctorLoginComponent {

  admin: boolean = false;
  showModal: boolean = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup
  submitted = false;
  tLoginRegister = false;
  log!: any;
  validate = true;
  doctor!: DoctorDetails;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private doctorService: DoctorService,) { }
  show() {
    this.showModal = true;
  }
  Logout() {

    this.log = undefined
  }


  toggleLoginRegister() {


    if (this.tLoginRegister == false) {
      this.tLoginRegister = true;
    } else {
      this.tLoginRegister = false;
    }
  }

  //Bootstrap Modal Close event
  hide() {
    if (this.tLoginRegister == true)
      this.toggleLoginRegister()
    const doctorForm = document.getElementById("doctorForm");
    if (doctorForm)
      doctorForm.style.display = "none";
  }
  ngOnInit() {
    this.showModal = true;

    this.registerForm = this.formBuilder.group({

      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', [Validators.required, Validators.minLength(6)]],
      role: ['doctor'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      hospitalName: ['', Validators.required],
      city: ['', Validators.required]

    });

    this.loginForm = this.formBuilder.group({


      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['doctor'],

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  get r() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.doctor = this.loginForm.value;


    this.doctorService.validateUser(this.doctor).subscribe(data => {

      if (data != null) {
        this.doctorService.adoctor = data;
        this.router.navigateByUrl('/doctordashboard')
      }
      else {
        const logindoctor = document.getElementById("logindoctor");
        if (logindoctor)
          logindoctor.innerHTML = "<p color='red'> Invalid Credentials</p>"
      }
    }, err => {
      alert(err.name)
    })




  }



  onRegister() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      this.showModal = false;
    }
    this.doctor = this.registerForm.value

    this.doctorService.registerUser(this.doctor).subscribe(data => {

      if (data)
        this.toggleLoginRegister();
    }, err => {
      alert(err.name)
    });
  }


}

