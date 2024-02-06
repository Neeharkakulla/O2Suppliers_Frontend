import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ImageviewerComponent } from '../imageviewer/imageviewer.component';
import { DoctorLoginComponent } from '../doctor-login/doctor-login.component';
import { LoginComponent } from '../login/login.component';
import { SupplierLoginComponent } from '../supplier-login/supplier-login.component';
import { SlideShowComponent } from "../slide-show/slide-show.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ImageviewerComponent, DoctorLoginComponent, LoginComponent, SupplierLoginComponent, SlideShowComponent]
})
export class HomeComponent {
  imagesUrl!: String[]
  role: any;
  constructor(private userService: UserService,
    private router: Router) { }



  ngOnInit() {
    this.imagesUrl = [
      '../../assets/images/slider1.jpg',
      '../../assets/images/slider2.jpg',
      '../../assets/images/slider3.jpg',
      '../../assets/images/slider4.jpg'];
  }



  @HostListener('window:scroll', ['$event'])
  handleScroll(event: KeyboardEvent) {
    let scroll = window.pageYOffset;
    console.log(scroll)
    if (scroll >= 700) {
      const aboutimage = document.getElementById("aboutimage")
      if (aboutimage != null)
        aboutimage.style.animation = '2.5s fadeInFromRight 1'
      const aboutheading = document.getElementById("aboutheading")
      if (aboutheading != null)
        aboutheading.style.animation = '2.5s fadeInFromLeft 1'
      const aboutpara = document.getElementById("aboutpara");
      if (aboutpara)
        aboutpara.style.animation = '2.5s fadeInFromLeft 1'
    }
    if (scroll >= 1050) {
      const visionimage = document.getElementById("visionimage")
      if (visionimage)
        visionimage.style.animation = '2.5s fadeInFromLeft 1'
      const visionheading = document.getElementById("visionheading")
      if (visionheading)
        visionheading.style.animation = '2.5s fadeInFromRight 1'
      const visionpara = document.getElementById("visionpara");
      if (visionpara)
        visionpara.style.animation = '2.5s fadeInFromRight 1'
    }
    if (scroll >= 1450) {
      const missionimage = document.getElementById("missionimage");
      if (missionimage)
        missionimage.style.animation = '2.5s fadeInFromRight 1'
      const missionheading = document.getElementById("missionheading");
      if (missionheading)
        missionheading.style.animation = '2.5s fadeInFromLeft 1'
      const missionpara = document.getElementById("missionpara");
      if (missionpara)
        missionpara.style.animation = '2.5s fadeInFromLeft 1'
    }
  }
  login(role: String) {

    this.role = role;
    window.sessionStorage.setItem("role", role.toString());


    if (this.role === "user" || this.role === "admin") {
      const loginForm = document.getElementById("loginForm");
      if (loginForm != null) {
        loginForm.style.display = "inline-block";
      }
      const login = document.getElementById("login");
      if (login != null) {
        login.innerHTML = "";
      }
    }
    if (this.role === "doctor") {
      const doctorForm = document.getElementById("doctorForm");
      if (doctorForm) {
        doctorForm.style.display = "inline-block";
      }
      const login = document.getElementById("login");
      if (login != null) {
        login.innerHTML = "";
      }
    }
    if (this.role === "suppliers") {
      const supplierForm = document.getElementById("supplierForm")
      if (supplierForm != null) {
        supplierForm.style.display = "inline-block";
      }
      const login = document.getElementById("login");
      if (login != null) {
        login.innerHTML = "";
      }
    }
  }
  close() {

    if (this.role === "user" || this.role === "admin") {
      const loginForm = document.getElementById("loginForm");
      if (loginForm != null) {
        loginForm.style.display = "none";
      }
      const login = document.getElementById("login");
      if (login != null) {
        login.innerHTML = "";
      }
    }
    if (this.role === "doctor") {
      const doctorForm = document.getElementById("doctorForm")
      if (doctorForm != null) {
        doctorForm.style.display = "none";
      }
      const login = document.getElementById("login");
      if (login != null) {
        login.innerHTML = "";
      }
    }
    if (this.role === "suppliers") {
      const supplierForm = document.getElementById("supplierForm")
      if (supplierForm != null) {
        supplierForm.style.display = "none";
      }

      const login = document.getElementById("login");
      if (login != null) {
        login.innerHTML = "";
      }
    }
  }

}

