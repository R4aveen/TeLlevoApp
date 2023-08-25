import { Directive, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export const MDB_ACCORDION_ITEM_BODY = new InjectionToken('MdbAccordionItemBodyDirective');
export class MdbAccordionItemBodyDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbAccordionItemBodyDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbAccordionItemBodyDirective, selector: "[mdbAccordionItemBody]", providers: [{ provide: MDB_ACCORDION_ITEM_BODY, useExisting: MdbAccordionItemBodyDirective }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbAccordionItemBodyDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbAccordionItemBody]',
                    providers: [{ provide: MDB_ACCORDION_ITEM_BODY, useExisting: MdbAccordionItemBodyDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWl0ZW0tY29udGVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvYWNjb3JkaW9uL2FjY29yZGlvbi1pdGVtLWNvbnRlbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFlLE1BQU0sZUFBZSxDQUFDOztBQUV2RSxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLGNBQWMsQ0FDdkQsK0JBQStCLENBQ2hDLENBQUM7QUFPRixNQUFNLE9BQU8sNkJBQTZCO0lBQ3JCO0lBQW5CLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQzt1R0FEdEMsNkJBQTZCOzJGQUE3Qiw2QkFBNkIsaURBRjdCLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLDZCQUE2QixFQUFFLENBQUM7OzJGQUVsRiw2QkFBNkI7a0JBTHpDLFNBQVM7bUJBQUM7b0JBQ1QsOERBQThEO29CQUM5RCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxXQUFXLCtCQUErQixFQUFFLENBQUM7aUJBQzlGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3Rpb25Ub2tlbiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IE1EQl9BQ0NPUkRJT05fSVRFTV9CT0RZID0gbmV3IEluamVjdGlvblRva2VuPE1kYkFjY29yZGlvbkl0ZW1Cb2R5RGlyZWN0aXZlPihcbiAgJ01kYkFjY29yZGlvbkl0ZW1Cb2R5RGlyZWN0aXZlJ1xuKTtcblxuQERpcmVjdGl2ZSh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYkFjY29yZGlvbkl0ZW1Cb2R5XScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTURCX0FDQ09SRElPTl9JVEVNX0JPRFksIHVzZUV4aXN0aW5nOiBNZGJBY2NvcmRpb25JdGVtQm9keURpcmVjdGl2ZSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQWNjb3JkaW9uSXRlbUJvZHlEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG4iXX0=