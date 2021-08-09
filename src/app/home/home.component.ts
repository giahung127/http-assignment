import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  responseData: any
  editFormCheck: boolean = false
  url: string = 'https://reqres.in/api/users'
  constructor(
    private userService: UsersService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { 
    this.getRequest()
  }

  getRequest(){
    return this.http.get(this.url)
    .subscribe(res => {
      this.responseData = res
      this.responseData = this.responseData.data
    });
  }
 
  ngOnInit(): void {
  }

  addUser(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddEditFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(user => {
    user.id = this.getLastedId()
    this.userService.addUser(user)
    .subscribe(data => this.responseData.push(data))
    })
  }

  deleteUser(id: number){
    this.userService.deleteUser(id)
    .subscribe(this.responseData = this.responseData.filter((user: User) => user.id != id));
  }

  updateUser(_user: User){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = _user;
    const dialogRef = this.dialog.open(AddEditFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(user =>{
    this.userService.updateUser(user)
    .subscribe( data => {
      for (let x in this.responseData){
        if (this.responseData[x].id == data.id) {
          this.responseData[x] = data;
          console.log(this.responseData[x])
          console.log(data)
          break;
        }
      }}
    )})
    
  }

  getLastedId():number{
    let lastedId: number = 0
    for(const x of this.responseData){
      if (x.id > lastedId){ 
        lastedId = x.id;
      }
    }
    return lastedId + 1
  }

  changeForm() {
    this.editFormCheck = !this.editFormCheck
  }
}


export interface User {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}