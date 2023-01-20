import { Injectable } from '@angular/core';
import { DE, EN, Translation } from './TRANSLATE';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private current: Translation;

  constructor() {
    this.current = DE;

  }
  public setEN() {
    this.current = EN;
  }
  public setDE() {
    this.current = DE;
  }
  public get(): Translation {
    return this.current;
  }
}
