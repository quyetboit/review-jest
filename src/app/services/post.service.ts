import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable, of } from "rxjs";
import { Post, User } from "../models";

@Injectable()
export class PostService {
  constructor (private http: HttpClient) {}

  getPosts(_start = 0, _limit = 5): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api_url}/posts`, {
      params: { _start, _limit }
    });
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.api_url}/posts/${id}`);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.api_url}/users/${userId}`);
  }

  uploadFile(file: File) {
    if (file.size >= 5_000_000) {
      return of ({ success: false });
    }

    return of ({ success: true });
  }
}