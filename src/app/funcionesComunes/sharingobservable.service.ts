import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharingobservableService<T> {

  private sharingObservableProvide:BehaviorSubject<T>=new BehaviorSubject<T>({} as T)

  get sharingObservable(){
    return this.sharingObservableProvide.asObservable()
  }
  set sharingObservableData(data:T){
    this.sharingObservableProvide.next(data)
  }
}
