import { Address } from "../../shared/models/Address"
import { Contact } from "../../shared/models/Contact"
import { Role } from "../../shared/models/Role"
import { Vacancy } from "../vacancy/vacancy";

export interface User {
  id: number
  fullname: string
  secret?: string
  avatar?: string
  email: string
  cpf: string
  datebirth?: Date
  nickname: string
  preferencialname?: string
  active: boolean
  role: Role
  gender?: string
  // Address?: Address
  // Contact?: Contact
  // Curriculum?//: Curriculum
  // Profile?//: Profile
  // Vacancy?: Vacancy
}
