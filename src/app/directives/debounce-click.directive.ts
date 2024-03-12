import { Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Directive({
  selector: '[appDebounceClick]',
  standalone: true
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Output() debounceClick = new EventEmitter<Event>();

  event$ = new Subject<Event>();
  subscription!: Subscription;

  @HostListener('click', ['$event']) clickEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.event$.next(event);
  }

  ngOnInit(): void {
    this.subscription = this.event$.pipe(debounceTime(500)).subscribe(event => this.debounceClick.emit(event));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
