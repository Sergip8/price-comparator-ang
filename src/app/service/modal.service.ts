import { ApplicationRef, EmbeddedViewRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';

const identifierToComponentMap = {
  'loginComponent': LoginComponent
}
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private componentRef: any;
  private stage: any;
  private alertElement: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
    private injector: Injector) { }

  private createFormModal(component: any): Element {

    const componentType = identifierToComponentMap[component];
    this.componentRef = this.viewContainerRef.createComponent(componentType,{injector: this.injector});

    this.componentRef.instance.modal = this;

    this.appRef.attachView(this.componentRef.hostView);

    return (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

  }

  open(component: any): void {

    if(this.alertElement) 
      return;

    this.alertElement = this.createFormModal(component);

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.appendChild(this.alertElement);

    this.stage = document.createElement('div');
    this.stage.classList.add('stage');
    this.stage.appendChild(modal);

    document.body.appendChild(this.stage);

  }

  close(): void {

    this.appRef.detachView(this.componentRef.hostView);
    this.stage.parentNode.removeChild(this.stage);
    this.componentRef.destroy();
    this.alertElement = null;

  }

}