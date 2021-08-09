import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../home/home.component'

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss']
})
export class AddEditFormComponent implements OnInit {
  userForm = new FormGroup({})
  editUser: User = {id:0, first_name:'', last_name:'', email: '', avatar:''}
  constructor(
    private dialogRef: MatDialogRef<AddEditFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data:any
  ) { 
    if(data != null){
      this.editUser = data;
    }
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      first_name: new FormControl(this.editUser.first_name, [Validators.required]),
      last_name: new FormControl(this.editUser.last_name, [Validators.required]),
      email: new FormControl(this.editUser.email, [Validators.required]),
      avatar: new FormControl(this.editUser.avatar, [Validators.required])
    })
  }

  save() {
    this.dialogRef.close({id:this.editUser.id,...this.userForm.value});
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
