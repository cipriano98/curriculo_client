import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  private api = environment.curriculumApi;

  public ListInitial: User[] = [];
  public listUpdates: User[] = [];

  private ListInitialSource = new Subject<User[]>();
  private listUpdatesSource = new Subject<User[]>();

  ListInitial$ = this.ListInitialSource.asObservable();
  listUpdates$ = this.listUpdatesSource.asObservable();

  del(id: number) {
    this.ListInitial = this.ListInitial.filter(elementListInitial => {
      return elementListInitial.id != id;
    });
    this.ListInitialSource.next(this.ListInitial);
  }

  add(userSave: User) {
    this.ListInitial.push(userSave);
    this.ListInitialSource.next(this.ListInitial);
  }

  save(userSave: User) {
    this.listUpdates = [];
    this.listUpdates.push(userSave);
    this.listUpdatesSource.next(this.listUpdates);
  }

  getBase(): Observable<any[]> {
    return this.http.get<any[]>(this.api + '/user')
      .pipe(
        tap(user => {
          this.ListInitial = user
          this.ListInitialSource.next(this.ListInitial)
        }),
        catchError(this.utils.handleError('getBase', []))
      )
  }

  deleteBase(id: number): Observable<User> {
    const url = `${this.api + '/user'}/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(user => {
        this.del(id)
      }),
      catchError(this.utils.handleError<User>('deleteUser'))
    );
  }

  getBasePorId(id: number): Observable<User> {
    const url = `${this.api + '/user'}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(user => console.log(`User found`)),
      catchError(this.utils.handleError<User>(`getBasePorId id=${id}`))
    );
  }

  getBasePorEmail(email: string): Observable<User> {
    const url = `${this.api + '/user'}/email/${email}`;
    return this.http.get<User>(url).pipe(
      tap(
        user => {
          if (user.email !== null)
            console.log('Este email já existe em nossa base de dados')
          else
            console.log(`Este email não existe em nossa base de dados`)
        },
        error => console.log(`Erro na função getBasePorEmail → ${error}`)
      ),
      catchError(this.utils.handleError<User>(`getBasePorEmail email=${email}`))
    );
  }

  fetchCEP(cep): Observable<any> {
    console.dir(cep)

    const url = `https://api.postmon.com.br/v1/cep/${cep}`
    console.dir(url);
    return this.http.get<any>(url).pipe(
      tap(
        cep => {
          console.dir(cep)
          if (cep != { error: true })
            console.log('Este cep existe e será carregado')
          else
            console.log(`O cep informado não foi reconhecido pelo sistema`)
        },
        error => console.log(`Erro na função fetchCEP → ${error}`)
      ),
      catchError(this.utils.handleError<any>(`fetchCEP cep=${cep}`))
    );
  }

  saveBase(user: User): Observable<User> {
    if (user.id) {
      const UserId = user.id
      delete user.id
      delete user['newPassword']
      return this.http.put<User>(`${this.api}/user/${UserId}`, user, httpOptions).pipe(
        tap((user: User) => {
          this.save(user)
        }),
        catchError(this.utils.handleError<User>('addUser'))
      );
    } else {
      return this.http.post<User>(this.api + '/user/signup', user, httpOptions).pipe(
        tap((user: User) => {
          console.log('User created:', user);
          this.add(user);
          console.log(`Added user`);
        }),
        catchError(this.utils.handleError<User>('addUser'))
      );
    }
  }

}
