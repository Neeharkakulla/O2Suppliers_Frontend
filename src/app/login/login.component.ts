import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from '../../model/user-details';
import { UserService } from '../../service/user.service';
import { REACTIVE_NODE } from '@angular/core/primitives/signals';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  admin: boolean = false;
  showModal: boolean = true;
  loginForm!: FormGroup;
  registerForm !: FormGroup
  submitted = false;
  tLoginRegister = false;
  log!: any;
  validate = true;
  user!: UserDetails;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,) { }
  show() {
    this.showModal = true;
  }
  Logout() {

    this.log = undefined
  }


  toggleLoginRegister() {

    if (window.sessionStorage.getItem("role") == "admin") {
      this.admin = true;
      alert("Registration for admin is Disabled contact your administrator")
      return;
    }
    else {
      this.admin = false;
    }
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
    if (window.sessionStorage.getItem("role") == "admin") {
      this.admin = false;

    }


    const loginForm = document.getElementById("loginForm");
    if (loginForm)
      loginForm.style.display = "none";
  }
  ngOnInit() {
    this.showModal = true;

    this.registerForm = this.formBuilder.group({

      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', [Validators.required, Validators.minLength(6)]],
      role: [],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$"),]]
    });

    this.loginForm = this.formBuilder.group({


      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: [],

    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.user = this.loginForm.value;

    this.user.role = window.sessionStorage.getItem("role");


    this.userService.validateUser(this.user)?.subscribe(data => {

      if (data != null) {
        this.hide();
        this.userService.auser = data;
        if (this.user.role === "user")
          this.router.navigate(['/userdashboard'])
        else if (this.user.role === "admin")
          this.router.navigate(['/admindashboard'])
        else if (this.user.role === "supplier")
          this.router.navigate(['/supplierdashboard'])
        else if (this.user.role === "doctor")
          this.router.navigate(['/doctordashboard'])
      }
      else {
        const login = document.getElementById("login");
        if (login)
          login.innerHTML = "<p color='red'> Invalid Credentials</p>"
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
    this.user = this.registerForm.value
    this.user.role = window.sessionStorage.getItem("role");
    this.userService.registerUser(this.user)?.subscribe(data => {

      if (data)
        this.toggleLoginRegister();
    }, err => {
      alert(err.name)
    });
  }


}
