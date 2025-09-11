import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { SearchPageComponent } from './search.page';
import { TvMazeApiService } from '../../core/services/tvmaze-api.service';
import { ShowCardComponent } from './show-card/show-card.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { SearchResult, Show } from '../../core/models/show.model';

const mockShows: SearchResult[] = [
  {
    show: { id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8 }, image: {} } as Show,
    score: 0
  },
  {
    show: { id: 2, name: 'Another Show', genres: ['Comedy'], rating: { average: 7 }, image: {} } as Show,
    score: 0
  },
  {
    show: { id: 3, name: 'Third Show', genres: ['Action'], rating: { average: 9 }, image: {} } as Show,
    score: 0
  }
];

class MockApi {
  searchShows(q: string) {
    if (q === 'error') return throwError(() => new Error('API Error'));
    return of(mockShows);
  }
}

describe('SearchPageComponent', () => {
  let fixture: ComponentFixture<SearchPageComponent>;
  let comp: SearchPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchPageComponent, ReactiveFormsModule, ShowCardComponent, LoaderComponent, ErrorComponent],
      providers: [{ provide: TvMazeApiService, useClass: MockApi }]
    });
    fixture = TestBed.createComponent(SearchPageComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should initialize form with validators', () => {
    expect(comp.form.get('q')).toBeTruthy();
    comp.form.get('q')!.setValue('ab');
    expect(comp.form.invalid).toBeTrue();
    comp.form.get('q')!.setValue('abc');
    expect(comp.form.valid).toBeTrue();
  });

  it('should call API and set shows on valid input', fakeAsync(() => {
    comp.form.get('q')!.setValue('test');
    tick(300); // debounceTime
    expect(comp.loading()).toBeFalse();
    expect(comp.shows().length).toBe(3);
    expect(comp.error()).toBe('');
  }));

  it('should handle API error', fakeAsync(() => {
    comp.form.get('q')!.setValue('error');
    tick(300);
    expect(comp.error()).toBe('Failed to load shows');
    expect(comp.shows().length).toBe(0);
  }));

  it('should reset shows and loading for short input', fakeAsync(() => {
    comp.form.get('q')!.setValue('ab');
    tick(300);
    expect(comp.shows().length).toBe(0);
    expect(comp.loading()).toBeFalse();
  }));

  it('should paginate results', () => {
    comp.shows.set(mockShows.map(r => r.show));
    comp.page.set(1);
    expect(comp.paged.length).toBe(comp.pageSize);
    comp.page.set(2);
    expect(comp.paged.length).toBe(comp.shows().length - comp.pageSize);
  });

  it('should calculate totalPages', () => {
    comp.shows.set(mockShows.map(r => r.show));
    expect(comp.totalPages()).toBe(1);
    comp.pageSize = 1;
    expect(comp.totalPages()).toBe(3);
  });

  it('should go to next and previous page', () => {
    comp.shows.set(mockShows.map(r => r.show));
    comp.pageSize = 1;
    comp.page.set(1);
    comp.next();
    expect(comp.page()).toBe(2);
    comp.prev();
    expect(comp.page()).toBe(1);
  });

  it('should not go below page 1 or above totalPages', () => {
    comp.shows.set(mockShows.map(r => r.show));
    comp.pageSize = 1;
    comp.page.set(1);
    comp.prev();
    expect(comp.page()).toBe(1);
    comp.page.set(3);
    comp.next();
    expect(comp.page()).toBe(3);
  });

  it('should set loading and error signals', fakeAsync(() => {
    comp.form.get('q')!.setValue('test');
    tick(300);
    expect(comp.loading()).toBeFalse();
    comp.error.set('Some error');
    expect(comp.error()).toBe('Some error');
  }));
});
