import { Component, ElementRef, ViewChild } from '@angular/core';
import { DebounceClickDirective } from './debounce-click.directive';
import { ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';

@Component({
  selector: "test-component",
  template: `<button #button appDebounceClick (debounceClick)="onClickButton()">Click me!</button>`,
})

export class TestComponent {
  @ViewChild('button', { read: ElementRef, static: true}) button!: ElementRef<HTMLButtonElement>;
  onClickButton = jest.fn();
}


describe('DebounceClickDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [DebounceClickDirective],
    }).compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new DebounceClickDirective();
    expect(directive).toBeTruthy();
  });  

  it('should output event click', fakeAsync(() => {
    component.button.nativeElement.click();
    tick(550);
    expect(component.onClickButton).toHaveBeenCalled();
  }));

  it('should not output event click', fakeAsync(() => {
    component.button.nativeElement.click();
    tick(200);
    expect(component.onClickButton).not.toHaveBeenCalled();
    flushMicrotasks();
  }));
});
