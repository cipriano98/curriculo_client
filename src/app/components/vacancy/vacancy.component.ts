import { Component, OnInit } from '@angular/core';

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


  sessaoId: number
  vacancyAuthor = false
  avatarDefault = 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png'
  vacancies: Vacancy[] = []

  ngOnInit(): void {
    this.sessaoId = this.utils.getSessao('id')
    this.getAllVacancies()
  }

  getAllVacancies() {
    this.vacancyService.getBase().subscribe(vacancies => {
      this.vacancies = vacancies
    })
  }


  iWant(vacancy: Vacancy) {
    return this.vacancyService.saveBase(vacancy, this.sessaoId).subscribe(vacancy => {
        console.dir('vacancy')
        console.dir(vacancy)
      })
  }

  shareVacancy(vacancy: Vacancy) {
    const { codeVacancy, office, name } = vacancy
    alert(`
Eu vi uma vaga na ${name} de ${office} e lembrei de você. Espero que consiga, boa sorte!
Acesse: https://unique-curriculum.web.app e pesquise pelo código de vaga ${codeVacancy}
`)
    console.dir(vacancy);
  }

  edit(vacancy) {
    // console.dir(vacancy)
    this.utils.openEditModal(VacancyEditComponent, vacancy)
  }

}
