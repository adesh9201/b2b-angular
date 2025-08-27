import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class TestHelpers {
  static setupTestBed(declarations: any[] = [], imports: any[] = [], providers: any[] = []): void {
    TestBed.configureTestingModule({
      declarations,
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        ...imports
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl'),
            url: '/test'
          }
        },
        ...providers
      ]
    });
  }

  static createMockService<T>(serviceClass: new (...args: any[]) => T): jasmine.SpyObj<T> {
    const methods = Object.getOwnPropertyNames(serviceClass.prototype)
      .filter(name => name !== 'constructor' && typeof serviceClass.prototype[name] === 'function');
    
    return jasmine.createSpyObj(serviceClass.name, methods);
  }

  static triggerEvent(element: HTMLElement, eventType: string): void {
    const event = new Event(eventType, { bubbles: true, cancelable: true });
    element.dispatchEvent(event);
  }

  static setInputValue(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  static waitForAsync(fn: () => void): void {
    setTimeout(fn, 0);
  }

  static mockLocalStorage(): void {
    const store: { [key: string]: string } = {};
    
    spyOn(localStorage, 'getItem').and.callFake((key: string) => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      Object.keys(store).forEach(key => delete store[key]);
    });
  }

  static mockSessionStorage(): void {
    const store: { [key: string]: string } = {};
    
    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => store[key] || null);
    spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });
    spyOn(sessionStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
    });
    spyOn(sessionStorage, 'clear').and.callFake(() => {
      Object.keys(store).forEach(key => delete store[key]);
    });
  }

  static createMockObservable<T>(data: T): jasmine.SpyObj<any> {
    return jasmine.createSpyObj('Observable', ['subscribe'], {
      pipe: jasmine.createSpy('pipe').and.returnValue({
        subscribe: jasmine.createSpy('subscribe').and.callFake((callback: (data: T) => void) => {
          callback(data);
        })
      })
    });
  }

  static createMockPromise<T>(data: T): Promise<T> {
    return Promise.resolve(data);
  }

  static createMockRejectedPromise(error: any): Promise<never> {
    return Promise.reject(error);
  }

  static getElementByTestId(fixture: ComponentFixture<any>, testId: string): HTMLElement {
    return fixture.debugElement.nativeElement.querySelector(`[data-testid="${testId}"]`);
  }

  static getAllElementsByTestId(fixture: ComponentFixture<any>, testId: string): NodeListOf<HTMLElement> {
    return fixture.debugElement.nativeElement.querySelectorAll(`[data-testid="${testId}"]`);
  }

  static expectElementToExist(fixture: ComponentFixture<any>, testId: string): void {
    const element = this.getElementByTestId(fixture, testId);
    expect(element).toBeTruthy();
  }

  static expectElementNotToExist(fixture: ComponentFixture<any>, testId: string): void {
    const element = this.getElementByTestId(fixture, testId);
    expect(element).toBeFalsy();
  }

  static expectElementToHaveText(fixture: ComponentFixture<any>, testId: string, expectedText: string): void {
    const element = this.getElementByTestId(fixture, testId);
    expect(element?.textContent?.trim()).toBe(expectedText);
  }

  static expectElementToHaveClass(fixture: ComponentFixture<any>, testId: string, className: string): void {
    const element = this.getElementByTestId(fixture, testId);
    expect(element?.classList.contains(className)).toBe(true);
  }

  static expectElementNotToHaveClass(fixture: ComponentFixture<any>, testId: string, className: string): void {
    const element = this.getElementByTestId(fixture, testId);
    expect(element?.classList.contains(className)).toBe(false);
  }
}