import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createForm, FormType, subformComponentProviders } from 'ngx-sub-form';
import { IPeriodoValorizacion } from 'src/app/helpers/helpervalorizacion/periodoValorizaciones';
import { IDynamicDialogConfig } from 'src/app/managerdialog/interfaces/Isino';
import { ValorizacionService } from '../../services/valorizacion.service';


interface valoSelect{
  valo:any
}

export interface IDynamicDialogConfigCalculoValo extends IDynamicDialogConfig{
  periodoDeValorizacionSeleccionado:any
  avances:any[]
}
@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
  providers: subformComponentProviders(PeriodoComponent)
})
export class PeriodoComponent  {
  selectValorizacion:any
  valorizaciones$:Promise<IPeriodoValorizacion[]>
  constructor(
    public dialogRef: MatDialogRef<PeriodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDynamicDialogConfigCalculoValo,
    public valorizacionService:ValorizacionService
    ) {
    data.acceptButtonTitle ?? 'Yes';
    data.title ?? 'Unnamed Dialog';
    this.valorizaciones$ = this.valorizacionService.getRangeAndMesValorizacion()
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async bien(){
    
    this.data.avances = await this.valorizaciones$
    this.data.periodoDeValorizacionSeleccionado = this.form.formGroup.value.valo
    
    localStorage.setItem('rangoSeleccionado',this.data.periodoDeValorizacionSeleccionado['rangoValorizacion'])
    localStorage.setItem("mesSeleccionado",this.form.formGroup.value.valo.mesValorizacion)
   
  }

  public form = createForm<valoSelect>(this,{
    formType:FormType.SUB,
    formControls:{
      valo:new UntypedFormControl()
    }
  })


}
