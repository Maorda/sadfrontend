import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { restendpoint } from 'src/app/endpoint/restendpoint';
import { ValorizacionService } from '../services/valorizacion.service';
export interface IPeriodo{
  mesSeleccionado?:string;
  panelFotografico:Photo[]
}
export interface Photo {
  _id?: string | undefined;
  partida: string;
  descripcionTrabajos: string;
  urlFoto: string;
}

@Injectable({
  providedIn: 'root'
})
export class PanelfotograficoService {

  constructor(
    private http: HttpClient,
    
    ) { }


  createPhoto(config:{partida: string, descripcion: string, photo: File,idvalorizacion:string}) {
    
    
    const fd = new FormData();
    fd.append('partida', config.partida);
    fd.append('descripcion', config.descripcion);
    fd.append('file', config.photo);//file es el nombre con el que será interceptado en el servidor
    fd.append('idvalorizacion',config.idvalorizacion)
    

    
    return this.http.post(`${restendpoint.base+restendpoint.panelfotografico.creafoto}`, fd);
  }

  getPhotos():Observable<any> {
    
    return this.http.get<Photo[]>(`${restendpoint.base+restendpoint.panelfotografico.listafotos}`);
  }
  getPhotosByValorizacionId(idvalorizacion:any):Observable<any> {
    
    return this.http.get<Photo[]>(`${restendpoint.base+restendpoint.panelfotografico.listafotosbyidvalorizacion}/${idvalorizacion}`);
  }

  getPhoto(id: string):Observable<any> {
   
    
    return this.http.get<Photo>(`${restendpoint.base+ restendpoint.panelfotografico.listabyid}/${id}`);
  }

  deletePhoto(id: string) {
    return this.http.delete(`${restendpoint.base + restendpoint.panelfotografico.deletebyid}/${id}`);
  }

  updatePhoto(
    //id: any, title: string, description: string,photo:File
    {id, partida, descripcion,photo}:{id: any, partida: string, descripcion: string,photo:any}
    ):Observable<any>
     {
     
      console.log(photo)
    const fd = new FormData();
    fd.append('partida', partida);
    fd.append('descripcion', descripcion);
    
    //script que permite hacer la actualizacion segun se seleccione 
      
      fd.append('file1',photo)

      
    

    return this.http.put(`${restendpoint.base + restendpoint.panelfotografico.actualizabyid}/${id}`, fd);

    

    
  }
}
