import { TestBed } from '@angular/core/testing';
import { SearchPageComponent } from './search.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SearchPageComponent, HttpClientTestingModule] }).compileComponents();
  });
  it('should create', () => {
    const fixture = TestBed.createComponent(SearchPageComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
