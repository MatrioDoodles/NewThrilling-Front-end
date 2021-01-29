import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.const";
import {Product} from "../products/product.service";

export class Comment {
  constructor(
    public id:number,
    public comment:string,
    public nom:string,
    public rating:number,
    public approuved:boolean,
    public product:Product
  ) {
  }
}

export const ENTITY_URL = 'comments'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }
  getAllComments(){
    return this.httpClient
      .get<Comment[]>(`${API_URL}/${ENTITY_URL}/GetAllComments`);

  }

  getCommentById(Commentid){
    return this.httpClient
      .get<Comment>(`${API_URL}/${ENTITY_URL}/${Commentid}`);
  }


  getCommentsByProductApprouved(productId){
    return this.httpClient
      .get<Comment[]>(`${API_URL}/${ENTITY_URL}/GetAllCommentsByProductApprouved/${productId}`);
  }
  getNoneApprouvedComment(){
    return this.httpClient
      .get<Comment[]>(`${API_URL}/${ENTITY_URL}/GetAllCommentsNoneApprouved`);
  }

  UpdateCommentBYid(Comment){
    return this.httpClient
      .put(`${API_URL}/${ENTITY_URL}/ModComment`,Comment);
  }

  AddComment(Comment){
    return this.httpClient
      .post(`${API_URL}/${ENTITY_URL}/addComment`,Comment);
  }

  deleteCommentById(Commentid){
    return this.httpClient
      .delete(`${API_URL}/${ENTITY_URL}/DelComment/${Commentid}`);
  }
}
