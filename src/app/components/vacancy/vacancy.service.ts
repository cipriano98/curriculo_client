import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Observable } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { environment } from '../../../environments/environment'
import { UtilService } from '../../shared/utils.service'
import { Vacancy } from './vacancy'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class VacancyService {


  constructor(
    private http: HttpClient,
    private utils: UtilService
  ) { }

  private api = environment.curriculumApi

  public ListInitial: Vacancy[] = []
  public listUpdates: Vacancy[] = []
  private ListInitialSource = new Subject<Vacancy[]>()
  private listUpdatesSource = new Subject<Vacancy[]>()
  ListInitial$ = this.ListInitialSource.asObservable()
  listUpdates$ = this.listUpdatesSource.asObservable()


  del(codeVacancy: number) {
    this.ListInitial = this.ListInitial.filter(elementListInitial => {
      return elementListInitial.codeVacancy != codeVacancy
    })
    this.ListInitialSource.next(this.ListInitial)
  }

  add(vacancySave: Vacancy) {
    this.ListInitial.push(vacancySave)
    this.ListInitialSource.next(this.ListInitial)
  }

  save(vacancySave: Vacancy) {
    this.listUpdates = []
    this.listUpdates.push(vacancySave)
    this.listUpdatesSource.next(this.listUpdates)
  }

  getBase(userId?: string): Observable<Vacancy[]> {
    let url = `${this.api}/user/vacancy`
    if(userId) url += `?userId=${userId}`
    return this.http.get<Vacancy[]>(url)
      .pipe(
        tap(vacancy => {
          this.ListInitial = vacancy
          console.dir(vacancy)
          this.ListInitialSource.next(this.ListInitial)
        }),
        catchError(this.utils.handleError('getBase', []))
      )
  }

  deleteBase(codeVacancy: number): Observable<Vacancy> {
    const url = `${this.api + '/user'}/vacancy/${codeVacancy}`
    return this.http.delete<Vacancy>(url, httpOptions).pipe(
      tap(vacancy => {
        this.del(codeVacancy)
      }),
      catchError(this.utils.handleError<Vacancy>('deleteVacancy'))
    )
  }

  getBaseById(codeVacancy: number): Observable<Vacancy> {
    const url = `${this.api + '/user'}/vacancy/${codeVacancy}`
    return this.http.get<Vacancy>(url).pipe(
      tap(vacancy => console.log(`Vacancy found`)),
      catchError(this.utils.handleError<Vacancy>(`getBasePorId codeVacancy=${codeVacancy}`))
    )
  }

  saveBase(vacancy: Vacancy, userId?: number): Observable<Vacancy> {
    if (vacancy.codeVacancy) { // Se existe id, o método altera a entidade
      return this.alterBase(vacancy, userId)
    } else { // Se não existe id, o método cria uma nova entidade
      return this.createBase(vacancy, userId)
    }
  }

  alterBase(vacancy: Vacancy, userId?: number): Observable<Vacancy> {
    const codeVacancy = vacancy.codeVacancy
    let url = `${this.api}/user/vacancy/${codeVacancy}`
    if (userId) url += `/connect/${userId}`
    console.dir(url);
    delete vacancy.codeVacancy
    return this.http.put<Vacancy>(url, vacancy, httpOptions).pipe(
      tap((newVacancy) => {
        this.save(newVacancy)
      }),
      catchError(this.utils.handleError<Vacancy>('addUser'))
    )
  }

  createBase(vacancy: Vacancy, userId: number): Observable<Vacancy> {
    delete vacancy.codeVacancy
    vacancy.userid = userId
    return this.http.post<Vacancy>(this.api + '/user/vacancy', vacancy, httpOptions).pipe(
      tap((vacancy: Vacancy) => {
        this.add(vacancy)
        console.log(`Added vacancy`)
      }),
      catchError(this.utils.handleError<Vacancy>('addVacancy'))
    )
  }
}
