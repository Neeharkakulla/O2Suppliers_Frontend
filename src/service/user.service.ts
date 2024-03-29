import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  unBlockUser(user: any) {
    return this.http.post<any[]>(this.baseUrl+"/user/unblock",user)
  }
  blockUser(user: any) {
    return this.http.post<any[]>(this.baseUrl+"/user/block",user)
  }
  getAllUsers() {
    return this.http.get<any[]>(this.baseUrl+"/getAll")
  }
  changePassword() {
   return this.http.post(this.baseUrl+'/newpassword',this.auser);
  }
  validatepassword(oldPassword: any) {
    
    return this.http.post<boolean>(this.baseUrl+"/validate/"+this.auser.email,oldPassword)
  }
  getImage(imageName: any) {
    console.log(imageName)
    return this.http.get(this.baseUrl+'/image/get/' +imageName)
  }
  uploadFile(uploadImageData: FormData) {
   return  this.http.post(this.baseUrl+'/image/upload', uploadImageData, { observe: 'response' });
  }
  
  
  
  private baseUrl="http://localhost:8001/api/users"
  auser: any;
 
  constructor(private http:HttpClient) { }
  
  registerUser(user: any) {
    if(user.role!="admin")
      return this.http.post<boolean>(this.baseUrl+"/user/register",user);
    return;
  }
  validateUser(user: any) {
    
    if(user.role==='user')
       return this.http.post<any>(this.baseUrl+"/user/login",user)
    if(user.role==='admin')
      return this.http.post<any>(this.baseUrl+"/admin/login",user)
   return;
  }
}
