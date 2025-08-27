import { TestBed } from '@angular/core/testing';
import { ShowDetailPageComponent } from './show-detail.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShowDetailPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ShowDetailPageComponent, HttpClientTestingModule, RouterTestingModule] }).compileComponents();
  });
  it('should create', () => {
    const fixture = TestBed.createComponent(ShowDetailPageComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
