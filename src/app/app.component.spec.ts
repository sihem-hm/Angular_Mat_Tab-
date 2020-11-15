import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './Material.Module/Material.Module.module';

describe('AppComponent', () => {
  //let component: AppComponent ;
  let fixture;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [],
      imports: [MaterialModule, BrowserAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }));
  it('should create the app', () => {
    expect(app).toBeTruthy();
    // component.ngOnInit();
    /*   const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance; */
  });
  it(`should have as title of 'app  '`, () => {
    expect(app.title).toEqual('app');
  });

  it(`should 1+ 1 '`, () => {
    expect(1 + 1).toEqual(2);
  });
});

/*  it('should say hello', () => {
    // Arrange
    const fixture = spyOn(AppComponent.addRowData, 'emit');
    // Act
    AppComponent.addRowData();
    // Assert
    expect(addRowData).toHaveBeenCalled();
    expect(addRowData).toHaveBeenCalledWith('Hello');
}); */

/* it(`should have a title 'I love pizza!'`, async(() => {
 const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  expect(app.title).toEqual('I love pizza!');
})); */

/* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('signupProject app is running!');
  }); */
