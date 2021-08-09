import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './home/home.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  addUser(user: User): Observable<User> {
    return this.http.post<User>('https://reqres.in/api/users', user)
  }

  deleteUser(id: number): Observable<any>{
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.delete(url)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`https://reqres.in/api/users/${user.id}`, user)
  }

}
