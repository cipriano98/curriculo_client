import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, tap, timeout, map } from 'rxjs/operators';
import { Usuario } from './Usuario';
import { environment } from 'src/environments/environment';
import { UtilService } from '../../shared/utils.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private utils: UtilService
  ) { }

  private api = environment.curriculumApi;

  public listaInicial: Usuario[] = [];
  public listaUpdates: Usuario[] = [];

  private listaInicialSource = new Subject<Usuario[]>();
  private listaUpdatesSource = new Subject<Usuario[]>();

  listaInicial$ = this.listaInicialSource.asObservable();
  listaUpdates$ = this.listaUpdatesSource.asObservable();

  del(id: number) {
    this.listaInicial = this.listaInicial.filter(elementlistaInicial => {
      return elementlistaInicial.id != id;
    });
    this.listaInicialSource.next(this.listaInicial);
  }

  add(usuarioSave: Usuario) {
    this.listaInicial.push(usuarioSave);
    this.listaInicialSource.next(this.listaInicial);
  }

  save(usuarioSave: Usuario) {
    this.listaUpdates = [];
    this.listaUpdates.push(usuarioSave);
    this.listaUpdatesSource.next(this.listaUpdates);
  }

  getBase(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.api + '/usuario')
      .pipe(
        tap(usuario => {
          this.listaInicial = usuario;
          this.listaInicialSource.next(this.listaInicial);
          this.utils.log(`Usuários carregados`);
        }),
        catchError(this.utils.handleError('getBase', []))
      );
  }

  deleteBase(usuario: Usuario | number): Observable<Usuario> {
    const id = typeof usuario === 'number' ? usuario : usuario.id;
    const url = `${this.api + '/usuario'}/${id}`;
    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(usuario => {
        this.del(id);
        this.utils.log(`Usuário excluído`);
      }),
      catchError(this.utils.handleError<Usuario>('deleteUsuário'))
    );
  }

  getBasePorId(id: number): Observable<Usuario> {
    const url = `${this.api + '/usuario'}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(fas => this.utils.log(`Usuário encontrado`)),
      catchError(this.utils.handleError<Usuario>(`getBasePorId id=${id}`))
    );
  }

  getBasePorEmail(email: string): Observable<Usuario> {
    const url = `${this.api + '/usuario'}/email/${email}`;
    return this.http.get<Usuario>(url).pipe(
      tap(
        fas => {
          if (fas.email !== null)
            this.utils.log('Este email já existe em nossa base de dados')
          else
            this.utils.log(`Este email não existe em nossa base de dados`)
        },
        error => this.utils.log(`Erro na função getBasePorEmail → ${error}`)
      ),
      catchError(this.utils.handleError<Usuario>(`getBasePorEmail email=${email}`))
    );
  }

  saveBase(usuario: Usuario): Observable<Usuario> {
    if (usuario.id) {
      return this.http.put<Usuario>(this.api + '/usuario/' + usuario.id, usuario, httpOptions).pipe(
        tap((user: Usuario) => {
          console.log('Usuário alterado:', user);
          this.save(user);
          this.utils.log(`Usuário atualizado`);
        }),
        catchError(this.utils.handleError<Usuario>('addUsuário'))
      );
    } else {
      return this.http.post<Usuario>(this.api + '/usuario/signup', usuario, httpOptions).pipe(
        tap((user: Usuario) => {
          console.log('Usuário criado:', user);
          this.add(user);
          this.utils.log(`Usuário adicionado`);
        }),
        catchError(this.utils.handleError<Usuario>('addUsuário'))
      );
    }
  }

}
