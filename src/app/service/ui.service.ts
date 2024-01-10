import { Injectable } from '@angular/core';
import {fromEvent} from 'rxjs'
import {map,debounceTime,distinctUntilChanged,startWith,tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class UIService {
  resize$=fromEvent(window,'resize').pipe(
      startWith(null),
      debounceTime(100),
      map(_=>{
       if ((window.innerWidth)<576)
        return 'xs'
       if ((window.innerWidth)<768)
        return 'sm'
       if ((window.innerWidth)<992)
        return 'md'
       if ((window.innerWidth)<1200)
        return 'lg'
       if ((window.innerWidth)<1400)
        return 'xl'
       return 'xxl'
    }),
    distinctUntilChanged(),
    map(x=>({size:x,width:window.innerWidth})),
    tap(res=>console.log(res))
    )
  constructor() { }
}