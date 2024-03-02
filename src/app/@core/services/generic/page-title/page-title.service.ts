import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  constructor(private __titleManager: Title) {}

  /**
   * Adds/modify document title
   * @param title title to be modified
   */
  setPageTitle(title: string): void {
    this.__titleManager.setTitle(title);
  }
  /**
   * get document title
   */
  getPageTitle(): string {
    return this.__titleManager.getTitle();
  }
}
