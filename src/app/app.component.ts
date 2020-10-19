//app.component.ts
import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TableAddComponent } from './table-add/table-add.component';
import { MessageService } from 'primeng/api';
import {Table , TableService } from 'primeng/table';

export interface UsersData {
  name: string;
  job: string;
  id: number;

}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence', job:' teacher'},
  {id: 1560608796014, name: 'Machine Learning', job:'teacher'},
  {id: 1560608787815, name: 'Robotic Process Automation' , job: 'teacher'},
  {id: 1560608805101, name: 'Blockchain' , job: 'teacher'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TableService, {
    provide: Table
    

  }],
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'name', 'job','action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(TableAddComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
        
      }
      else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      job:row_obj.job
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
