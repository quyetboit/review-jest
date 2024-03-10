import { Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Directive({
  selector: '[appDebounceClick]',
  standalone: true
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Output() debounceClick = new EventEmitter<Event>();

  event$ = new Subject<Event>();

  @HostListener('change', ['$event']) onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.event$.next(event);
  }

  ngOnInit(): void {
    this.event$.pipe(debounceTime(300)).subscribe(event => this.debounceClick.emit(event));
  }

  ngOnDestroy(): void {
    this.event$.complete();
    this.event$.unsubscribe();
  }
}
