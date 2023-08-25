import { Directive, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export const MDB_TAB_TITLE = new InjectionToken('MdbTabTitleDirective');
export class MdbTabTitleDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTabTitleDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbTabTitleDirective, selector: "[mdbTabTitle]", providers: [{ provide: MDB_TAB_TITLE, useExisting: MdbTabTitleDirective }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTabTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTabTitle]',
                    providers: [{ provide: MDB_TAB_TITLE, useExisting: MdbTabTitleDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXRpdGxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC90YWJzL3RhYi10aXRsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQWUsTUFBTSxlQUFlLENBQUM7O0FBRXZFLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBdUIsc0JBQXNCLENBQUMsQ0FBQztBQU85RixNQUFNLE9BQU8sb0JBQW9CO0lBQ1o7SUFBbkIsWUFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO3VHQUR0QyxvQkFBb0I7MkZBQXBCLG9CQUFvQix3Q0FGcEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLENBQUM7OzJGQUUvRCxvQkFBb0I7a0JBTGhDLFNBQVM7bUJBQUM7b0JBQ1QsOERBQThEO29CQUM5RCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsc0JBQXNCLEVBQUUsQ0FBQztpQkFDM0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdGlvblRva2VuLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgTURCX1RBQl9USVRMRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNZGJUYWJUaXRsZURpcmVjdGl2ZT4oJ01kYlRhYlRpdGxlRGlyZWN0aXZlJyk7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJUYWJUaXRsZV0nLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1EQl9UQUJfVElUTEUsIHVzZUV4aXN0aW5nOiBNZGJUYWJUaXRsZURpcmVjdGl2ZSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGFiVGl0bGVEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG4iXX0=