import { Role } from 'src/app/shared/models/Role'

export class Agency {

  id: string
  name: string
  registrofederal: string
  role: Role
  site: string
  links: string[]
  labellinks: string[]
  active: true

}
