import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private countdownSource = new BehaviorSubject<number>(0);
  countdown$ = this.countdownSource.asObservable();

  startCountdown(duration: number): void {
    timer(0, 1000).subscribe((elapsedTime) => {
      const remainingTime = duration - elapsedTime;
      this.countdownSource.next(remainingTime);

      if (remainingTime === 0) {
        this.countdownSource.complete();
      }
    });
  }
}
