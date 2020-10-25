//app.component.ts
import { Component, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TableAddComponent } from './table-add/table-add.component';
 import { MessageService } from 'primeng/api';
import {Table , TableService } from 'primeng/table';
import {FormControl} from '@angular/forms';
import { Product } from './product';
import { ProductService } from './productservice';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Injectable } from '@angular/core';



export interface UsersData {
  name: string;
  job: string;
  id: number;
  timeOfDay : Date;

}
/* export interface Food {
  value: string;
  viewValue: string;
}
  const foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ]; */




const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence', job:' teacher',timeOfDay : new Date('2020-04-24')},
  {id: 1560608796014, name: 'Machine Learning', job:'teacher',timeOfDay : new Date('2020-04-24')},
  {id: 1560608787815, name: 'Robotic Process Automation' , job: 'teacher',timeOfDay : new Date('2020-04-24')},
  {id: 1560608805101, name: 'Blockchain' , job: 'teacher',timeOfDay : new Date('2020-04-24')}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TableService, {
    provide: Table}],
    
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'name', 'job', 'timeOfDay', 'status']
  dataSource = ELEMENT_DATA;
  toppings = new FormControl();
  products1: Product[];
  isAvailable : any;
    products2: Product[];
    expandedElement : string;
    
    statuses: SelectItem[];

    clonedProducts: { [s: string]: Product; } = {};
  
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog,private productService: ProductService ,
    
    
    private messageService: MessageService) {}
  ngOnInit() {
  
this.expandedElement = "aa";

    this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]
}





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
      job:row_obj.job,
      timeOfDay : row_obj.timeOfDay,
    });
    this.table.renderRows();
    
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = {...product};
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
  onRowEditCancel(product: Product, index: number) {
    this.products2[index] = this.clonedProducts[product.id];
    delete this.products2[product.id];
}
}