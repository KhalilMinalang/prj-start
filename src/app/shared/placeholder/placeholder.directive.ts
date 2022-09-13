import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appPLaceholder]",
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
