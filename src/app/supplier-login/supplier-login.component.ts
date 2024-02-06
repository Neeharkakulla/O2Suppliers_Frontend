import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierDetails } from '../../model/supplier-details';
import { O2SupplierService } from '../../service/o2-supplier.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ImageviewerComponent } from '../imageviewer/imageviewer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-login',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,ImageviewerComponent],
  templateUrl: './supplier-login.component.html',
  styleUrl: './supplier-login.component.css'
})
export class SupplierLoginComponent {

  admin: boolean = false;
  showModal: boolean = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup
  submitted = false;
  tLoginRegister = false;
  log: any;
  validate = true;
  supplier!: SupplierDetails;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private supplierService: O2SupplierService,) { }
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
    const supplierForm = document.getElementById("supplierForm");
    if (supplierForm)
      supplierForm.style.display = "none";
  }
  ngOnInit() {
    this.showModal = true;

    this.registerForm = this.formBuilder.group({

      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', [Validators.required, Validators.minLength(6)]],
      role: ['supplier'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      industryName: ['', Validators.required],
      city: ['', Validators.required]

    });

    this.loginForm = this.formBuilder.group({


      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['supplier'],

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
    this.supplier = this.loginForm.value;


    this.supplierService.validateUser(this.supplier).subscribe(data => {

      if (data != null) {
        this.supplierService.asupplier = data;
        this.router.navigateByUrl('/suppliersdashboard')
      }
      else {
        const supplierlogin = document.getElementById("supplierlogin");
        if (supplierlogin)
          supplierlogin.innerHTML = "<p color='red'> Invalid Credentials</p>"
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
    this.supplier = this.registerForm.value

    this.supplierService.registerUser(this.supplier).subscribe(data => {

      if (data)
        this.toggleLoginRegister();
    }, err => {
      alert(err.name)
    });
  }
}
