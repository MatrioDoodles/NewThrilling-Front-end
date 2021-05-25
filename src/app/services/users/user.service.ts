import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { HttpClient } from '@angular/common/http';

export class User{
  constructor(
    public id:number,
    public name:string,
    public username:string,
    public surname:string,
    public mail:string,
    public phone:string,
    public adress:string,
    public password:string,
    public city:string,
    public salary:string,
    public role:Role,
  ){}
}
export class Role{
  constructor(
    public id:number,
    public label:string
    ){

  }
}
export const ENTITY_URL = 'users'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  getAllUsers(){
    return this.httpClient
   .get<User[]>(`${API_URL}/${ENTITY_URL}/GetAllUsers`);

  }

  // getUserByTenant(tenant){
  //   return this.httpClient
  //  .post<User[]>(`${API_URL}/${ENTITY_URL}/GetAllUsersT`,tenant);
  // }

  getUserById(Userid){
    return this.httpClient
   .get<User>(`${API_URL}/${ENTITY_URL}/${Userid}`);
  }

  getUserByUsername(username){
    return this.httpClient
   .get<User>(`${API_URL}/${ENTITY_URL}/searchUserByUsername/${username}`);
  }
  getUserByRoleLivreur(){
    return this.httpClient
      .get<User[]>(`${API_URL}/${ENTITY_URL}/searchUserByRole/LIVREUR`);
  }
  getUserByRoleLivreurAndCity(city){
    return this.httpClient
      .get<User[]>(`${API_URL}/${ENTITY_URL}/searchUserByRoleAndCity/LIVREUR/${city}`);
  }
  getUserByRoleConsultant(){
    return this.httpClient
      .get<User[]>(`${API_URL}/${ENTITY_URL}/searchUserByRole/CONSULTANT`);
  }
  getUserByRoleAdministrateur(){
    return this.httpClient
      .get<User[]>(`${API_URL}/${ENTITY_URL}/searchUserByRole/ADMINISTRATEUR`);
  }
  UpdateUserBYid(User){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModUser`,User);
  }

  AddUser(User){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addUser`,User);
  }

  deleteUserById(Userid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelUser/${Userid}`);
  }
  getAllRoles(){
    return this.httpClient
   .get<Role[]>(`${API_URL}/roles/GetAllRoles`);
  }
}
