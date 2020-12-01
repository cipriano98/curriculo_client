import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hidePassword = true
  form: FormGroup
  formSubmitAttempt: boolean

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      secret: ['', Validators.required],
      cpf: ['', Validators.required],
      nickname: ['', Validators.required]
    });
  }

  randomNickname() {
    const email = this.form.get('email').value.split('@')[0] || 'anonimo'
    const random = Math.random().toString(36).substring(8)
    this.form.get('nickname').setValue(`${email}.${random}`)
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    )
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value)
        .subscribe(
          () => { }
        )
    }
    this.formSubmitAttempt = true
  }

}
