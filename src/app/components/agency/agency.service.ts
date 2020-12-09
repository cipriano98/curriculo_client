import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Agency } from './agency';
import { environment } from 'src/environments/environment';
import { UtilService } from '../../shared/utils.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(
    private http: HttpClient,
    private utils: UtilService
  ) { }

  private api = environment.curriculumApi;

  public ListInitial: Agency[] = [];
  public listUpdates: Agency[] = [];

  private ListInitialSource = new Subject<Agency[]>();
  private listUpdatesSource = new Subject<Agency[]>();

  ListInitial$ = this.ListInitialSource.asObservable();
  listUpdates$ = this.listUpdatesSource.asObservable();

  del(id: string) {
    this.ListInitial = this.ListInitial.filter(elementListInitial => {
      return elementListInitial.id != id;
    });
    this.ListInitialSource.next(this.ListInitial);
  }

  add(agencySave: Agency) {
    this.ListInitial.push(agencySave);
    this.ListInitialSource.next(this.ListInitial);
  }

  save(agencySave: Agency) {
    this.listUpdates = [];
    this.listUpdates.push(agencySave);
    this.listUpdatesSource.next(this.listUpdates);
  }

  getBase(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.api + '/agency')
      .pipe(
        tap(agency => {
          this.ListInitial = agency;
          this.ListInitialSource.next(this.ListInitial);
          console.log(`Agency found`);
        }),
        catchError(this.utils.handleError('getBase', []))
      );
  }

  deleteBase(id: string): Observable<Agency> {
    const url = `${this.api + '/agency'}/${id}`;
    return this.http.delete<Agency>(url, httpOptions).pipe(
      tap(agency => {
        this.del(id);
        console.log(`Deleted Agency`);
      }),
      catchError(this.utils.handleError<Agency>('agency'))
    );
  }

  getBasePorId(id: number): Observable<Agency> {
    const url = `${this.api + '/agency'}/${id}`;
    return this.http.get<Agency>(url).pipe(
      tap(agency => console.log(`Agency found`)),
      catchError(this.utils.handleError<Agency>(`getBasePorId id=${id}`))
    );
  }

  saveBase(agency: Agency): Observable<Agency> {

    if (agency.id) {
      return this.http.put<Agency>(this.api + '/agency/' + agency.id, agency, httpOptions).pipe(
        tap((org: Agency) => {
          this.save(org);
          console.log(`Updated Agency`);
        }),
        catchError(this.utils.handleError<Agency>('AlterAgency'))
      );
    }

    return this.http.post<Agency>(this.api + '/agency', agency, httpOptions).pipe(
      tap((org: Agency) => {
        this.add(org);
        console.log(`Crated Agency`);
      }),
      catchError(this.utils.handleError<Agency>('addAgency'))
    );
  }

}
