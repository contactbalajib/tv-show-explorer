import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TvMazeApiService } from './tvmaze-api.service';

describe('TvMazeApiService', () => {
  let service: TvMazeApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TvMazeApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  it('searchShows should call API', () => {
    service.searchShows('girls').subscribe();
    const req = httpMock.expectOne('https://api.tvmaze.com/search/shows?q=girls');
    expect(req.request.method).toBe('GET');
  });
  it('getShow should call API', () => {
    service.getShow(1).subscribe();
    const req = httpMock.expectOne('https://api.tvmaze.com/shows/1');
    expect(req.request.method).toBe('GET');
  });
  it('getCast should call API', () => {
    service.getCast(2).subscribe();
    const req = httpMock.expectOne('https://api.tvmaze.com/shows/2/cast');
    expect(req.request.method).toBe('GET');
  });
  it('getEpisodes should call API', () => {
    service.getEpisodes(3).subscribe();
    const req = httpMock.expectOne('https://api.tvmaze.com/shows/3/episodes');
    expect(req.request.method).toBe('GET');
  });
});
