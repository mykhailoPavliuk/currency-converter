import { Injectable, OnDestroy } from '@angular/core';
import {ReplaySubject} from "rxjs";

@Injectable()
export class UnsubscribeSubjectService extends ReplaySubject<void> implements OnDestroy {

  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
