import { LocationStrategy } from '@angular/common';
import { ComponentRef, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

  export class ReuseRouteStrategyService implements RouteReuseStrategy {
    
    private handlers: { [key: string]: DetachedRouteHandle } = {};
    componentRef?: ComponentRef<any>
    // Detect Backbutton-navigation
    back = false;


    constructor(location: LocationStrategy) {
      location.onPopState(() => {
        this.back = true;
      });
    }
  
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
      if (!route.routeConfig || route.routeConfig.loadChildren) {
        return false;
      }
  
      // Check route.data.reuse whether this route should be re used or not
  
      let shouldReuse = false;
      if (
        route.routeConfig.data &&
        route.routeConfig.data['reuseRoute'] &&
        typeof route.routeConfig.data['reuseRoute'] === 'boolean'
      ) {
        shouldReuse = route.routeConfig.data['reuseRoute'];
      }
      return shouldReuse;
    }
  
   
    store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
      if (handler) {
        this.handlers[this.getUrl(route)] = handler;
      }
    }
  
    
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
      if (!this.back) {
        return false;
      }
      return !!this.handlers[this.getUrl(route)];
    }
  
    
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
      if (!this.back || !route.routeConfig || route.routeConfig.loadChildren) {
        return null;
      }
  
      //this.back = false; -> does not work fires to often
  
      return this.handlers[this.getUrl(route)];
    }
  
    
    shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
      /** We only want to reuse the route if the data of the route config contains a reuse true boolean */
  
      let reUseUrl = false;
      if (future.routeConfig && future.routeConfig.data && typeof future.routeConfig.data['reuseRoute'] === 'boolean') {
        reUseUrl = future.routeConfig.data['reuseRoute'];
      }
  
      //const defaultReuse = future.routeConfig === current.routeConfig; -> used for navigating to same component but routeConfigs are empty therefore always match?
      return reUseUrl;
    }
  
    private getUrl(route: ActivatedRouteSnapshot): string{
      if (route.routeConfig) {
        const url = route.routeConfig.path;
        return url? url: "";
      }
      return '';
    }
  
    clearHandles() {
      for (const key in this.handlers) {
        if (this.handlers[key]) {
          this.destroyHandle(this.handlers[key]);
        }
      }
      this.handlers = {};
    }
  
    private destroyHandle(handle: DetachedRouteHandle): void {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
    }
  }