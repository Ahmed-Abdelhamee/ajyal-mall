import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDir]'
})
export class DirDirective {

  constructor(private eleRef:ElementRef) { }

}
