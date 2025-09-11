import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { By } from '@angular/platform-browser';

describe('ErrorComponent', () => {
  let fixture: ComponentFixture<ErrorComponent>;
  let comp: ErrorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ErrorComponent] }).compileComponents();
    fixture = TestBed.createComponent(ErrorComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should not render error message when message is empty', () => {
    comp.message = '';
    fixture.detectChanges();
    const errorDiv = fixture.debugElement.query(By.css('.error'));
    expect(errorDiv).toBeNull();
  });

  it('should render error message when message is set', () => {
    comp.message = 'Test error';
    fixture.detectChanges();
    const errorDiv = fixture.debugElement.query(By.css('.error'));
    expect(errorDiv).not.toBeNull();
    expect(errorDiv.nativeElement.textContent).toContain('Test error');
  });
});
