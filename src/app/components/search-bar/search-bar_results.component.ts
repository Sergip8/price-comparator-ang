import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";


@Component({
    selector: 'search-bar-result',
    template:`
    <div *ngIf="query.length>0" class="row justify-content-around align-items-center mt-3">
       <div class="options" *ngFor="let r of query" (click)="[selected(r), query = []]">
        {{r}}
       </div>

    </div>
    
    `,
    styles: [`
        .options{
            cursor: pointer;
        }
    `]
  })

export class SearchBarResultComponent implements OnInit{
   
    @Input() query: string[]
    @Output() resultSelected = new EventEmitter<string>()


    ngOnInit(): void {
        
        }

    getCategory(value: string){
       
    }
    selected(value: string){
        this.resultSelected.emit(value)
    }
    }