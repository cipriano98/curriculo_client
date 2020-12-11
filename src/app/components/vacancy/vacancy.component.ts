import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/shared/utils.service';

export interface User {
  avatar: string
}

export interface Vacancy {
  codeVacancy: number
  user?: User
  name: string
  logo: string
  office: string
  description: string
}

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit {
 
  constructor(
    private readonly utils: UtilService
  ) { }

  
  avatarDefault = 'http'
  vacancies: Vacancy[] = [
    {
      codeVacancy: 1,
      user: { avatar: this.utils.getSessao('avatar') },
      logo: 'http://zeta.com.br/wp-content/uploads/2020/10/Design-sem-nome-39.png',
      office: 'Desenvolvedor(a)',
      description: 'In a purus sollicitudin, ultrices ligula vitae, tempor turpis. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Zeta Informática',
    },
    {
      codeVacancy: 2,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://res.cloudinary.com/programathor/image/upload/c_fit,h_200,w_200/v1601806876/ub9t4tjfsfzqe4yamhuu.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Aurea Tecnologia',
    },
    {
      codeVacancy: 3,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit.',
      name: 'Dell',
    },
    {
      codeVacancy: 1,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'http://zeta.com.br/wp-content/uploads/2020/10/Design-sem-nome-39.png',
      office: 'Desenvolvedor(a)',
      description: 'In a purus sollicitudin, ultrices ligula vitae, tempor turpis. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Zeta Informática',
    },
    {
      codeVacancy: 2,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://res.cloudinary.com/programathor/image/upload/c_fit,h_200,w_200/v1601806876/ub9t4tjfsfzqe4yamhuu.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Aurea Tecnologia',
    },
    {
      codeVacancy: 3,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit.',
      name: 'Dell',
    },
    {
      codeVacancy: 1,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'http://zeta.com.br/wp-content/uploads/2020/10/Design-sem-nome-39.png',
      office: 'Desenvolvedor(a)',
      description: 'In a purus sollicitudin, ultrices ligula vitae, tempor turpis. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Zeta Informática',
    },
    {
      codeVacancy: 2,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://res.cloudinary.com/programathor/image/upload/c_fit,h_200,w_200/v1601806876/ub9t4tjfsfzqe4yamhuu.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Aurea Tecnologia',
    },
    {
      codeVacancy: 3,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit.',
      name: 'Dell',
    },
    {
      codeVacancy: 1,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'http://zeta.com.br/wp-content/uploads/2020/10/Design-sem-nome-39.png',
      office: 'Desenvolvedor(a)',
      description: 'In a purus sollicitudin, ultrices ligula vitae, tempor turpis. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Zeta Informática',
    },
    {
      codeVacancy: 2,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://res.cloudinary.com/programathor/image/upload/c_fit,h_200,w_200/v1601806876/ub9t4tjfsfzqe4yamhuu.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Aurea Tecnologia',
    },
    {
      codeVacancy: 3,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit.',
      name: 'Dell',
    },
    {
      codeVacancy: 1,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'http://zeta.com.br/wp-content/uploads/2020/10/Design-sem-nome-39.png',
      office: 'Desenvolvedor(a)',
      description: 'In a purus sollicitudin, ultrices ligula vitae, tempor turpis. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Zeta Informática',
    },
    {
      codeVacancy: 2,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://res.cloudinary.com/programathor/image/upload/c_fit,h_200,w_200/v1601806876/ub9t4tjfsfzqe4yamhuu.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Nunc vehicula nibh eget sapien ornare ornare a vel mi.',
      name: 'Aurea Tecnologia',
    },
    {
      codeVacancy: 3,
      user: { avatar: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png' },
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',
      office: 'Desenvolvedor(a)',
      description: 'Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit. Phasellus congue odio vitae scelerisque fringilla. Maecenas consequat leo eu quam maximus, non finibus magna congue. Aenean commodo ligula et elit rhoncus, quis porttitor nisi blandit.',
      name: 'Dell',
    },
  ]

  ngOnInit(): void {
  }

  shareVacancy(vacancy: Vacancy) {
    const { codeVacancy, user, logo, office, description, name } = vacancy
    alert(`
Eu vi uma vaga na ${name} de ${office} e lembrei de você. Espero que consiga, boa sorte!
Acesse: https://unique-curriculum.web.app e pesquise pelo código de vaga ${codeVacancy}
`)
    console.dir(vacancy);
  }

}
