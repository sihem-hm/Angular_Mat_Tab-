//app.component.ts
import { Component, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableAddComponent } from './table-add/table-add.component';
import { MessageService } from 'primeng/api';
import { Table, TableService } from 'primeng/table';
import { FormControl } from '@angular/forms';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Injectable } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
} from '@angular/forms';

export interface UsersData {
  name: string;
  job: string;
  id: number;
  timeOfDay: Date;
  description: string;
  action: string;
  editRow: boolean;
}

const ELEMENT_DATA: UsersData[] = [
  {
    id: 1560608769632,
    name: 'Artificial Intelligence',
    job: ' teacher',
    timeOfDay: new Date('2020-04-24'),
    description: 'it will be shown in expended row ',
    action: 'delete ',
    editRow: false,
  },
  {
    id: 1560608796014,
    name: 'Machine Learning',
    job: 'teacher',
    timeOfDay: new Date('2020-04-24'),
    description: 'it will be shown in expended row',
    action: 'add ',
    editRow: false,
  },
  {
    id: 1560608787815,
    name: 'Robotic Process Automation',
    job: 'teacher',
    timeOfDay: new Date('2020-04-24'),
    description: 'it will be shown in expended row',
    action: 'delete ',
    editRow: false,
  },
  {
    id: 1560608805101,
    name: 'Blockchain',
    job: 'teacher',
    timeOfDay: new Date('2020-04-24'),
    description: 'it will be shown in expended row',
    action: 'add ',
    editRow: false,
  },
];
interface Food {
  id: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    TableService,
    {
      provide: Table,
    },
  ],

  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AppComponent {
  icon: any;
  selected: string;
  title = 'app';
  displayedColumns: string[] = [
    'icon',
    'id',
    'name',
    'job',
    'timeOfDay',
    'statuses',
    'actions',
  ];

  dataSource = ELEMENT_DATA;
  customerForm: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  toppings = new FormControl();
  isAvailable: any;
  expandedElement: string;
  statuses: SelectItem[];
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;


  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    this.selected = 'aa';
    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' },
    ];
  }

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(TableAddComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    var d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name,
      job: row_obj.job,
      action: row_obj.action,
      timeOfDay: row_obj.timeOfDay,
      description: row_obj.description,
      editRow: row_obj.editRow,
    });
    debugger;
    this.table.renderRows();
  }
  updateRowData(row_obj) {
    console.log(row_obj);
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name;
        value.job = row_obj.job;
        value.timeOfDay = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }

  rowclicked(row_obj): void {
    console.log(row_obj);
    this.updaterowedit();
    row_obj.editRow = true;
    console.log(row_obj.editRow);
  }
  updaterowedit(): void {
    const editrow = this.dataSource.find((row) => row.editRow == true);
    if (!!editrow) {
      editrow.editRow = false;
    }
  }
}
