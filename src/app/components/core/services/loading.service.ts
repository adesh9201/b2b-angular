import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingMessageSubject = new BehaviorSubject<string>('Loading...');

  get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  get loadingMessage$(): Observable<string> {
    return this.loadingMessageSubject.asObservable();
  }

  setLoading(loading: boolean, message: string = 'Loading...'): void {
    this.loadingSubject.next(loading);
    this.loadingMessageSubject.next(message);
  }

  show(message: string = 'Loading...'): void {
    this.setLoading(true, message);
  }

  hide(): void {
    this.setLoading(false);
  }

  get isLoading(): boolean {
    return this.loadingSubject.value;
  }

  get loadingMessage(): string {
    return this.loadingMessageSubject.value;
  }
}