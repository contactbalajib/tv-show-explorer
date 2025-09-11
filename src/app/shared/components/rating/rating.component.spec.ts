import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';
import { By } from '@angular/platform-browser';

describe('RatingComponent', () => {
  let fixture: ComponentFixture<RatingComponent>;
  let comp: RatingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RatingComponent] }).compileComponents();
    fixture = TestBed.createComponent(RatingComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should not render badge when value is null', () => {
    comp.value = null;
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge).toBeNull();
  });

  it('should render badge when value is set', () => {
    comp.value = 4.5;
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge).not.toBeNull();
    expect(badge.nativeElement.textContent).toContain('⭐ 4.5');
  });
});
