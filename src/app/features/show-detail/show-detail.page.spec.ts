import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowDetailPageComponent } from './show-detail.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ShowDetailPageComponent', () => {
  let component: ShowDetailPageComponent;
  let fixture: ComponentFixture<ShowDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ShowDetailPageComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
            snapshot: { params: { id: '1' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowDetailPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
  });
});