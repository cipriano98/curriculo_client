import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Organizacao } from './model/Organizacao';
import { environment } from 'src/environments/environment';
import { UtilService } from '../shared/utils.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizacaoService {

  constructor(
    private http: HttpClient,
    private utils: UtilService
  ) { }

  private api = environment.curriculumApi;

  public listaInicial: Organizacao[] = [];
  public listaUpdates: Organizacao[] = [];

  private listaInicialSource = new Subject<Organizacao[]>();
  private listaUpdatesSource = new Subject<Organizacao[]>();

  listaInicial$ = this.listaInicialSource.asObservable();
  listaUpdates$ = this.listaUpdatesSource.asObservable();

  del(id: number) {
    this.listaInicial = this.listaInicial.filter(elementlistaInicial => {
      return elementlistaInicial.id != id;
    });
    this.listaInicialSource.next(this.listaInicial);
  }

  add(organizacaoSave: Organizacao) {
    this.listaInicial.push(organizacaoSave);
    this.listaInicialSource.next(this.listaInicial);
  }

  save(organizacaoSave: Organizacao) {
    this.listaUpdates = [];
    this.listaUpdates.push(organizacaoSave);
    this.listaUpdatesSource.next(this.listaUpdates);
  }

  getBase(): Observable<Organizacao[]> {
    return this.http.get<Organizacao[]>(this.api + '/organizacao')
      .pipe(
        tap(organizacao => {
          this.listaInicial = organizacao;
          this.listaInicialSource.next(this.listaInicial);
          this.utils.log(`Organizações carregadas`);
        }),
        catchError(this.utils.handleError('getBase', []))
      );
  }

  deleteBase(organizacao: Organizacao | number): Observable<Organizacao> {
    const id = typeof organizacao === 'number' ? organizacao : organizacao.id;
    const url = `${this.api + '/organizacao'}/${id}`;
    return this.http.delete<Organizacao>(url, httpOptions).pipe(
      tap(organizacao => {
        this.del(id);
        this.utils.log(`Organização excluída`);
      }),
      catchError(this.utils.handleError<Organizacao>('organizacao'))
    );
  }

  getBasePorId(id: number): Observable<Organizacao> {
    const url = `${this.api + '/organizacao'}/${id}`;
    return this.http.get<Organizacao>(url).pipe(
      tap(fas => this.utils.log(`Organização encontrada`)),
      catchError(this.utils.handleError<Organizacao>(`getBasePorId id=${id}`))
    );
  }

  agendarSync(organizacao: Organizacao): Observable<any> {
    console.dir('organizacao', organizacao);
    return this.http.post<Organizacao>(this.api + '/agendarsync', organizacao, httpOptions).pipe(
      map((org: Organizacao) => {
        console.dir('org', org);
        this.utils.log(`Agendamento realizado`);
      }),
      catchError(this.utils.handleError<{}>(`Erro ao agendar sincronização para  ${organizacao.nome.toUpperCase()}`))
    );
  }

  saveBase(organizacao: Organizacao): Observable<Organizacao> {

    if (organizacao.id) {
      return this.http.put<Organizacao>(this.api + '/organizacao/' + organizacao.id, organizacao, httpOptions).pipe(
        tap((org: Organizacao) => {
          this.save(org);
          this.utils.log(`Organização atualizada`);
        }),
        catchError(this.utils.handleError<Organizacao>('alterorganizacao'))
      );
    }

    return this.http.post<Organizacao>(this.api + '/organizacao', organizacao, httpOptions).pipe(
      tap((org: Organizacao) => {
        this.add(org);
        this.utils.log(`Organização adicionada`);
      }),
      catchError(this.utils.handleError<Organizacao>('addorganizacao'))
    );
  }

  sincronizarDados(organizacao: Organizacao, completa: boolean): Observable<any> {
    if (organizacao.id) {
      if (organizacao.sincronizando) {
        this.utils.sendMessage(`Sincronização de ${organizacao.nome.toUpperCase()} já está em andamento`, 10000)
        return;
      }
      let url = '/organizacao/sincronizar';
      if (completa) { url += '/todos' };

      console.log(`${organizacao.nome.toUpperCase()} → Sincronizando...`)
      let mensagem = `O sistema iniciou uma sincronização ${completa ? 'completa' : ''} para
        ${organizacao.nome.toUpperCase()}, após seu término a data da última sincronização será atualizada.
        Consulte a organização mais tarde e verifique.`;

      this.utils.sendMessage(mensagem, 10000)
      return this.http.post<Organizacao>(this.api + url, organizacao, httpOptions)
        .pipe(
          map(org => {
            if (org) {
              if (org.versaoSistema != organizacao.versaoSistema) this.getBase().subscribe(() => { })
              mensagem = `${organizacao.nome.toUpperCase()} → Sincronização completa!`
              console.log(mensagem)
              this.utils.sendMessage(mensagem, 5000)
              return org
            }
            return null
          }),
          catchError(this.utils.handleError<{}>(`Erro ao sincronizar  ${organizacao.nome.toUpperCase()}`))
        );
    } else {
      this.utils.sendMessage('A organização precisa ser salva para poder ser sincronizada!')
    }
  }

  getStatusSync(organizacao: Organizacao, completa: boolean)/* : Observable<any> */ {
    // if (organizacao.id) {
    // let url = '/organizacao/statussincronizacao';
    // if (completa) { url += '/todos' };
    // return this.http.post<Organizacao>(this.apiCurriculo + url, organizacao, httpOptions)
    //   .pipe(
    //     map(statusSync => {
    //       // this.utils.emitirMensagem(`statusSync → ${statusSync['totalASincronizar']}`)
    //       return statusSync
    //     }),
    //     catchError(this.utils.handleError<{}>(`Erro ao buscar status de sincronização  ${organizacao.nome.toUpperCase()}`))
    //   );
    // } else {
    //   this.utils.emitirMensagem('A organização precisa ser salva para poder ser sincronizada!')
    // }
  }

  getApiClarion(urlMiddleware): Observable<any> {
    return this.http.get<any>(urlMiddleware.trim() + '/health')
      .pipe(
        tap(health => {
          this.utils.log(`getApiClarion carregada`);
          return health
        }),
        catchError(this.utils.handleError('getApiClarion', []))
      );
  }


  public testarSenhaApiClarion(organizacao: Organizacao, zetaAPISenha: string): Observable<any> {

    const agregateFuncionario = {
      "name": "zw15efun:equipe",
      "on": {
        "codfuncionarios": 1
      },
      "single": true,
      "limit": 0
    };

    const options = {
      method: 'POST',
      uri: organizacao.zetaAPI + '/entities/aggregation',
      headers: {
        'Authorization': "Basic " + btoa('zeta:' + zetaAPISenha),
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/json'
      },
      body: agregateFuncionario,
      json: true
    };

    return this.http.post<any>(options.uri, options.body, options)
      .pipe(
        map(funcionario => {
          return funcionario;
        }),
        catchError(err => {
          this.utils.handleError<any>(err.message)
          return throwError(err)
        })
      );

  }

}
