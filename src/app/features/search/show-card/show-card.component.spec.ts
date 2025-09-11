import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowCardComponent } from './show-card.component';
import { Show } from '../../../core/models/show.model';
import { ActivatedRoute } from '@angular/router';

describe('ShowCardComponent', () => {
  let component: ShowCardComponent;
  let fixture: ComponentFixture<ShowCardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    }).compileComponents();
    fixture = TestBed.createComponent(ShowCardComponent);
    component = fixture.componentInstance;
    // Provide a valid Show object for input
    component.show = {
      id: 1,
      name: 'Test Show',
      genres: ['Drama'],
      rating: { average: 8.6 },
      image: { medium: '', original: '' }
    } as Show;
    fixture.detectChanges();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});
