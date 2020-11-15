import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { MaterialModule } from '../Material.Module/Material.Module.module';
import { TableAddComponent } from './table-add.component';

class MdDialogMock {
  open() {
    return {
      afterClosed: () => of([]),
    };
  }
}

describe('TableAddComponent', () => {
  let component: TableAddComponent;
  let fixture: ComponentFixture<TableAddComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TableAddComponent],
      imports: [MaterialModule,BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: MatDialogRef,
          useClass: MdDialogMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
