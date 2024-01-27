import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createForm, FormType, subformComponentProviders } from 'ngx-sub-form';
import { photoForm } from '../formulariofotografia/formulariofotografia.component';
import { Photo, PanelfotograficoService } from '../../panelfotografico.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-vistapreviafotografias',
  templateUrl: './vistapreviafotografias.component.html',
  styleUrls: ['./vistapreviafotografias.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:subformComponentProviders(VistapreviafotografiasComponent)
})
export class VistapreviafotografiasComponent {
  urlupdate = 'url(assets/update.png)'
  urldelete = 'url(assets/borrar.png)'
  urlback ='url(assets/atras.png)'
  id: string;
  photo: Photo = {
    _id: "",
    partida: "",
    descripcionTrabajos: "",
    urlFoto: ""
  } ;
  photoSelected: string | ArrayBuffer | null;
  file: File;
  title:string = "";
  descripiton:string="";

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PanelfotograficoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { 

  }

  public form = createForm<photoForm>(this,{
    formType:FormType.SUB,
    formControls:{
      partida:new UntypedFormControl(this.photo.partida),
      descripcion:new UntypedFormControl(this.photo.descripcionTrabajos)
    }

  })

  ngOnInit() {
    this.form.controlValue$
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.photoService.getPhoto(this.id)
        .subscribe(
          res => {
            this.photo = res;
            this.form.formGroup.value.partida = this.photo.partida
    this.form.formGroup.value.descripcion = this.photo.descripcionTrabajos

            this.cdr.detectChanges();
          }
        )
    });
  }

  deletePhoto(photo: any) {
    console.log(photo._id)
    this.photoService.deletePhoto(photo._id)
      .subscribe(res => {
      
        
        this.router.navigate(['/fotografias']);
      })
  }

  updatePhoto(
    //title: HTMLInputElement, description: HTMLInputElement
    ): boolean {
    //console.log(this.photo._id, title.value, description.value,this.file)
    /**si no se modifica la imagen el archivo es undefined*/
    

    this.photoService.getPhoto(this.id).subscribe(async (val)=>{
      console.log(this.photo)
      console.log(this.form.formGroup.value.descripcion)
      const url = val.path
      var imgExt = url
      .split(/[#?]/)[0]
      .split(".")
      .pop()
      .trim();
      const response = await fetch(val.path);
      const blob = await response.blob();
      const file = new File([blob], "profileImage." + imgExt, {type: blob.type});
      

        this.photoService.updatePhoto({"partida":this.form.formGroup.value.partida,"descripcion":this.form.formGroup.value.descripcion,"photo":file,"id":this.photo._id})
       .subscribe(res => {
        console.log(res);
        this.router.navigate(['/fotografias']);
      ;

      } )

      

    })

    
    return false;
  }
  onPhotoSelected(event: HtmlInputEvent): void {
    
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      
      // image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoSelected = reader.result
        this.cdr.detectChanges();
        
    
      };
      reader.readAsDataURL(this.file);

    }
  }
  


}
