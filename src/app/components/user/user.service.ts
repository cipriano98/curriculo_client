import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { api, environment } from 'src/environments/environment';

import { UtilService } from '../../shared/utils.service';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private utils: UtilService
  ) { }

  private api = api.production;

  public listaInicial: User[] = [];
  public listaUpdates: User[] = [];

  private listaInicialSource = new Subject<User[]>();
  private listaUpdatesSource = new Subject<User[]>();

  listaInicial$ = this.listaInicialSource.asObservable();
  listaUpdates$ = this.listaUpdatesSource.asObservable();

  del(id: number) {
    this.listaInicial = this.listaInicial.filter(elementListaInicial => {
      return elementListaInicial.id != id;
    });
    this.listaInicialSource.next(this.listaInicial);
  }

  add(userSave: User) {
    this.listaInicial.push(userSave);
    this.listaInicialSource.next(this.listaInicial);
  }

  save(userSave: User) {
    this.listaUpdates = [];
    this.listaUpdates.push(userSave);
    this.listaUpdatesSource.next(this.listaUpdates);
  }

  getBase(): Observable<any[]> {
    return this.http.get<any[]>(this.api + '/user')
      .pipe(
        tap(user => {
          console.dir(user)
          this.listaInicial = user;
          this.listaInicialSource.next(this.listaInicial);
          this.utils.log(`Loaded users`);
        }),
        catchError(this.utils.handleError('getBase', []))
      );
  }

  deleteBase(id: number): Observable<User> {
    const url = `${this.api + '/user'}/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(user => {
        this.del(id);
        this.utils.log(`Deleted user`);
      }),
      catchError(this.utils.handleError<User>('deleteUser'))
    );
  }

  getBasePorId(id: number): Observable<User> {
    const url = `${this.api + '/user'}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(user => this.utils.log(`User found`)),
      catchError(this.utils.handleError<User>(`getBasePorId id=${id}`))
    );
  }

  getBasePorEmail(email: string): Observable<User> {
    const url = `${this.api + '/user'}/email/${email}`;
    return this.http.get<User>(url).pipe(
      tap(
        user => {
          if (user.email !== null)
            this.utils.log('Este email já existe em nossa base de dados')
          else
            this.utils.log(`Este email não existe em nossa base de dados`)
        },
        error => this.utils.log(`Erro na função getBasePorEmail → ${error}`)
      ),
      catchError(this.utils.handleError<User>(`getBasePorEmail email=${email}`))
    );
  }

  saveBase(user: User): Observable<User> {
    if (user.id) {
      return this.http.put<User>(this.api + '/user/' + user.id, user, httpOptions).pipe(
        tap((user: User) => {
          console.log('User changed:', user);
          this.save(user);
          this.utils.log(`Updated user`);
        }),
        catchError(this.utils.handleError<User>('addUser'))
      );
    } else {
      return this.http.post<User>(this.api + '/user/signup', user, httpOptions).pipe(
        tap((user: User) => {
          console.log('User created:', user);
          this.add(user);
          this.utils.log(`Added user`);
        }),
        catchError(this.utils.handleError<User>('addUser'))
      );
    }
  }

}
