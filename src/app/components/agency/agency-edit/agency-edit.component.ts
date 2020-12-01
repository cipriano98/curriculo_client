import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agency } from '../model/agency';
import { AgencyService } from '../agency.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-agency-edit',
  templateUrl: './agency-edit.component.html',
  styleUrls: ['./agency-edit.component.scss']
})
export class AgencyEditComponent implements OnInit {

  agency: Agency;
  id: number;
  nomeAgency: string;
  agencyForm: FormGroup;
  statusCode: number;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AgencyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private agencyService: AgencyService,
    private fb: FormBuilder,
    private utils: UtilService
  ) { }

  ngOnInit() {
    this.id = this.data.idEdicao;
    this.agency = new Agency();

    this.resetFormulario();
    if (this.id !== 0) {
      this.agencyService.getBasePorId(this.id)
        .subscribe(
          dados => {
            this.atribuirDados(dados);
          },
          errorCode => this.statusCode = errorCode);
    }
  }

  atribuirDados(agency: Agency) {
    this.agency = agency;
    this.resetFormulario();
    this.agencyForm.patchValue(this.agency);
  };

  closeDialog(): void {
    this.dialogRef.close();
  }

  async SaveAgency(): Promise<Agency> {
    this.agency = Object.assign(this.agency, this.agencyForm.value);
    return this.agencyService.saveBase(this.agency).toPromise();
  }

  onSubmit() {
    if (this.agencyForm.valid) {
      this.SaveAgency().then(agency => {
        this.agencyForm.reset();
      })
      this.closeDialog();
    } else {
      this.utils.emitirErrosSubmit(this.agencyForm);
    }
  }

  resetFormulario() {
    this.agencyForm = this.fb.group({
      'id': [undefined],
      'name': [''],
      'registrofederal': [''],
      'active': [false],
    });
  }

}
