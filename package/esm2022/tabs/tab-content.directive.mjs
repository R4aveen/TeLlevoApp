import { Directive, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export const MDB_TAB_CONTENT = new InjectionToken('MdbTabContentDirective');
export class MdbTabContentDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTabContentDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbTabContentDirective, selector: "[mdbTabContent]", providers: [{ provide: MDB_TAB_CONTENT, useExisting: MdbTabContentDirective }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTabContentDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTabContent]',
                    providers: [{ provide: MDB_TAB_CONTENT, useExisting: MdbTabContentDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3RhYnMvdGFiLWNvbnRlbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFlLE1BQU0sZUFBZSxDQUFDOztBQUV2RSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQXlCLHdCQUF3QixDQUFDLENBQUM7QUFPcEcsTUFBTSxPQUFPLHNCQUFzQjtJQUNkO0lBQW5CLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQzt1R0FEdEMsc0JBQXNCOzJGQUF0QixzQkFBc0IsMENBRnRCLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxDQUFDOzsyRkFFbkUsc0JBQXNCO2tCQUxsQyxTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsd0JBQXdCLEVBQUUsQ0FBQztpQkFDL0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdGlvblRva2VuLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgTURCX1RBQl9DT05URU5UID0gbmV3IEluamVjdGlvblRva2VuPE1kYlRhYkNvbnRlbnREaXJlY3RpdmU+KCdNZGJUYWJDb250ZW50RGlyZWN0aXZlJyk7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJUYWJDb250ZW50XScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTURCX1RBQl9DT05URU5ULCB1c2VFeGlzdGluZzogTWRiVGFiQ29udGVudERpcmVjdGl2ZSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGFiQ29udGVudERpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiJdfQ==