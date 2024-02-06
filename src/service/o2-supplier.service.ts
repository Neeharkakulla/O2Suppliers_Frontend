import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class O2SupplierService {
  unBlockSupplier(supplier: any) {
    return this.http.post<any[]>(this.baseUrl+"/unblock",supplier)

  }
 
  blockSupplier(supplier: any) {
    return this.http.post<any[]>(this.baseUrl+"/block",supplier)
  }
  changePassword() {
    return this.http.post(this.baseUrl+'/newpassword',this.asupplier);
      }
  validatepassword(oldPassword: any) {
    return this.http.post<boolean>(this.baseUrl+"/validate/"+this.asupplier.email,oldPassword)
  }
  getAllSuppliers() {
    return this.http.get<any[]>(this.baseUrl+"/getAll")
  }
  private baseUrl="http://localhost:8001/api/users/supplier"
  asupplier!: any;
  registerUser(supplier:any) {
   return this.http.post(this.baseUrl+"/register",supplier)
  }
  validateUser(supplier: any) {
    return this.http.post<any>(this.baseUrl+"/login",supplier)
  }

  constructor(private http:HttpClient) { }
}

