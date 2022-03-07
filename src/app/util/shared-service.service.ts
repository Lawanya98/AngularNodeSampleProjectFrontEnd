import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

  private isLoading: boolean = false

  public setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }
}
