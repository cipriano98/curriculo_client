import { Component, Input, OnInit } from '@angular/core';

import { UtilService } from '../../shared/utils.service';
import { UserService } from '../user/user.service';
import { Vacancy } from './vacancy';
import { VacancyEditComponent } from './vacancy-edit/vacancy-edit.component';
import { VacancyService } from './vacancy.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit {

  constructor(
    private readonly vacancyService: VacancyService,
    private readonly userService: UserService,
    private readonly utils: UtilService
  ) { }

  @Input() userId: string
  @Input() candidacy: boolean = false

  sessaoId: number
  vacancyAuthor = false
  avatarDefault = 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png'
  vacancies: Vacancy[] = []
  userEmployer: boolean = false

  ngOnInit(): void {
    this.userEmployer = this.utils.getSessao('role') === 'EMPLOYER'
    this.sessaoId = this.utils.getSessao('id')
    this.getAllVacancies()
  }

  getAllVacancies() {
    const userid = this.userId && !this.candidacy ? this.userId : null
    this.vacancyService.getBase(userid).subscribe(vacancies => {

      if (this.candidacy) {
        const interessados = vacancies.map(vacancy => {
          return [{
            codeVacancy: vacancy.codeVacancy,
            user: vacancy.Interested.filter(user => {
              return user.id === this.utils.getSessao('id')
            })
          }]
        })
        interessados.forEach(vacancy => {
          if (vacancy[0].user.length > 0) {
            this.vacancyService.getBaseById(vacancy[0].codeVacancy).subscribe(vacancy => {
              this.vacancies.push(vacancy)
            })
          }
        })
        console.dir('Minhas candidaturas')
        console.dir(this.vacancies)
      } else {
        this.vacancies = vacancies
      }
    })
  }


  iWant(vacancy: Vacancy) {
    if (vacancy.userid == this.sessaoId)
      return this.utils.sendMessage('Você não pode se candidatar em uma vaga que você publicou')

    const candidacyAlreadyMade = vacancy.Interested.filter(user => {
      return user.id == this.sessaoId
    })
    if (candidacyAlreadyMade.length !== 0)
      return this.utils.sendMessage('Você já se candidatou à essa vaga')

    return this.vacancyService.alterBase(vacancy, this.sessaoId).subscribe(connect => {
      if (connect) {
        vacancy.Interested.push({ id: this.sessaoId })
        this.utils.sendMessage('Candidatura realizada com sucesso!')
      }
    })
  }

  shareVacancy(vacancy: Vacancy) {
    const { codeVacancy, office, name } = vacancy
    const message = `Eu vi uma vaga na ${name} de ${office} e lembrei de você. ` +
      `Espero que consiga, boa sorte! Acesse: https://unique-curriculum.web.app ` +
      `e pesquise pelo código de vaga ${codeVacancy}`
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=1000,height=700,left=-1000,top=-1000`;
    window.open(`https://api.whatsapp.com/send?text=${message}`, 'Test', params)
  }

  edit(vacancy) {
    // console.dir(vacancy)
    this.utils.openEditModal(VacancyEditComponent, vacancy)
  }

}
