import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { By } from '@angular/platform-browser';

describe('LoaderComponent', () => {
  let fixture: ComponentFixture<LoaderComponent>;
  let comp: LoaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LoaderComponent] }).compileComponents();
    fixture = TestBed.createComponent(LoaderComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should not render loader when show is false', () => {
    comp.show = false;
    fixture.detectChanges();
    const loaderDiv = fixture.debugElement.query(By.css('.loader'));
    expect(loaderDiv).toBeNull();
  });

  it('should render loader when show is true', () => {
    comp.show = true;
    fixture.detectChanges();
    const loaderDiv = fixture.debugElement.query(By.css('.loader'));
    expect(loaderDiv).not.toBeNull();
    expect(loaderDiv.nativeElement.textContent).toContain('Loading...');
  });
});
