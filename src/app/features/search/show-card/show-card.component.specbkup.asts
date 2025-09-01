import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowCardComponent } from './show-card.component';

describe('ShowCardComponent', () => {
  let component: ShowCardComponent;
  let fixture: ComponentFixture<ShowCardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ShowCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(ShowCardComponent);
    component = fixture.componentInstance;
    component.show = { id: 1, name: 'Test', genres: [], rating: { average: 8.6 }, image: {} } as any;
    fixture.detectChanges();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});
