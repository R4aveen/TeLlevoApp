import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, HostBinding, Input, Output, TemplateRef, ViewChild, } from '@angular/core';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { Subject } from 'rxjs';
import { MDB_ACCORDION_ITEM_BODY } from './accordion-item-content.directive';
import { MDB_ACCORDION_ITEM_HEADER } from './accordion-item-header.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "mdb-angular-ui-kit/collapse";
let uniqueHeaderId = 0;
let uniqueId = 0;
export class MdbAccordionItemComponent {
    _cdRef;
    _headerTemplate;
    _bodyTemplate;
    collapse;
    header;
    set collapsed(value) {
        if (!this._isInitialized) {
            if (!value) {
                this._shouldOpenOnInit = true;
            }
            return;
        }
        if (value) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    id = `mdb-accordion-item-${uniqueId++}`;
    _headerId = `mdb-accordion-item-header-${uniqueHeaderId++}`;
    _isInitialized = false;
    _shouldOpenOnInit = false;
    itemShow = new EventEmitter();
    itemShown = new EventEmitter();
    itemHide = new EventEmitter();
    itemHidden = new EventEmitter();
    accordionItem = true;
    accordionItemDisplayBlock = true;
    ngOnInit() {
        this._isInitialized = true;
        if (this._shouldOpenOnInit) {
            this.show();
        }
    }
    show$ = new Subject();
    _collapsed = true;
    _addCollapsedClass = true;
    constructor(_cdRef) {
        this._cdRef = _cdRef;
    }
    toggle() {
        this.collapse.toggle();
    }
    show() {
        this.collapse.show();
        this._cdRef.markForCheck();
    }
    hide() {
        this.collapse.hide();
        this._cdRef.markForCheck();
    }
    onShow() {
        this._addCollapsedClass = false;
        this.itemShow.emit(this);
        this.show$.next(this);
    }
    onHide() {
        this._addCollapsedClass = true;
        this.itemHide.emit(this);
    }
    onShown() {
        this._collapsed = false;
        this.itemShown.emit(this);
    }
    onHidden() {
        this._collapsed = true;
        this.itemHidden.emit(this);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbAccordionItemComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbAccordionItemComponent, selector: "mdb-accordion-item", inputs: { header: "header", collapsed: "collapsed", id: "id" }, outputs: { itemShow: "itemShow", itemShown: "itemShown", itemHide: "itemHide", itemHidden: "itemHidden" }, host: { properties: { "class.accordion-item": "this.accordionItem", "class.d-block": "this.accordionItemDisplayBlock" } }, queries: [{ propertyName: "_headerTemplate", first: true, predicate: MDB_ACCORDION_ITEM_HEADER, descendants: true, read: TemplateRef, static: true }, { propertyName: "_bodyTemplate", first: true, predicate: MDB_ACCORDION_ITEM_BODY, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "collapse", first: true, predicate: MdbCollapseDirective, descendants: true, static: true }], ngImport: i0, template: "<h2 class=\"accordion-header\" [id]=\"_headerId\">\n  <button\n    class=\"accordion-button\"\n    type=\"button\"\n    [attr.aria-expanded]=\"!_collapsed\"\n    [attr.aria-controls]=\"id\"\n    [class.collapsed]=\"_addCollapsedClass\"\n    (click)=\"toggle()\"\n  >\n    {{ header }}\n    <ng-template *ngIf=\"_headerTemplate\" [ngTemplateOutlet]=\"_headerTemplate\"></ng-template>\n  </button>\n</h2>\n<div\n  mdbCollapse\n  (collapseShow)=\"onShow()\"\n  (collapseHide)=\"onHide()\"\n  (collapseShown)=\"onShown()\"\n  (collapseHidden)=\"onHidden()\"\n  [attr.id]=\"id\"\n  [attr.aria-labelledby]=\"_headerId\"\n>\n  <div class=\"accordion-body\">\n    <ng-template *ngIf=\"_bodyTemplate\" [ngTemplateOutlet]=\"_bodyTemplate\"></ng-template>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.MdbCollapseDirective, selector: "[mdbCollapse]", inputs: ["collapsed"], outputs: ["collapseShow", "collapseShown", "collapseHide", "collapseHidden"], exportAs: ["mdbCollapse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbAccordionItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-accordion-item', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"accordion-header\" [id]=\"_headerId\">\n  <button\n    class=\"accordion-button\"\n    type=\"button\"\n    [attr.aria-expanded]=\"!_collapsed\"\n    [attr.aria-controls]=\"id\"\n    [class.collapsed]=\"_addCollapsedClass\"\n    (click)=\"toggle()\"\n  >\n    {{ header }}\n    <ng-template *ngIf=\"_headerTemplate\" [ngTemplateOutlet]=\"_headerTemplate\"></ng-template>\n  </button>\n</h2>\n<div\n  mdbCollapse\n  (collapseShow)=\"onShow()\"\n  (collapseHide)=\"onHide()\"\n  (collapseShown)=\"onShown()\"\n  (collapseHidden)=\"onHidden()\"\n  [attr.id]=\"id\"\n  [attr.aria-labelledby]=\"_headerId\"\n>\n  <div class=\"accordion-body\">\n    <ng-template *ngIf=\"_bodyTemplate\" [ngTemplateOutlet]=\"_bodyTemplate\"></ng-template>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { _headerTemplate: [{
                type: ContentChild,
                args: [MDB_ACCORDION_ITEM_HEADER, { read: TemplateRef, static: true }]
            }], _bodyTemplate: [{
                type: ContentChild,
                args: [MDB_ACCORDION_ITEM_BODY, { read: TemplateRef, static: true }]
            }], collapse: [{
                type: ViewChild,
                args: [MdbCollapseDirective, { static: true }]
            }], header: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], id: [{
                type: Input
            }], itemShow: [{
                type: Output
            }], itemShown: [{
                type: Output
            }], itemHide: [{
                type: Output
            }], itemHidden: [{
                type: Output
            }], accordionItem: [{
                type: HostBinding,
                args: ['class.accordion-item']
            }], accordionItemDisplayBlock: [{
                type: HostBinding,
                args: ['class.d-block']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2FjY29yZGlvbi9hY2NvcmRpb24taXRlbS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvYWNjb3JkaW9uL2FjY29yZGlvbi1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBRTlFLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN2QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFPakIsTUFBTSxPQUFPLHlCQUF5QjtJQXNEaEI7SUFwRHBCLGVBQWUsQ0FBbUI7SUFHbEMsYUFBYSxDQUFtQjtJQUVtQixRQUFRLENBQXVCO0lBRXpFLE1BQU0sQ0FBUztJQUN4QixJQUNJLFNBQVMsQ0FBQyxLQUFjO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzthQUMvQjtZQUNELE9BQU87U0FDUjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFB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QVM7dUJBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUV4QyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUYsU0FBUztzQkFEWixLQUFLO2dCQWdCRyxFQUFFO3NCQUFWLEtBQUs7Z0JBT0ksUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFFOEIsYUFBYTtzQkFBakQsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBQ0wseUJBQXlCO3NCQUF0RCxXQUFXO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiQ29sbGFwc2VEaXJlY3RpdmUgfSBmcm9tICdtZGItYW5ndWxhci11aS1raXQvY29sbGFwc2UnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTURCX0FDQ09SRElPTl9JVEVNX0JPRFkgfSBmcm9tICcuL2FjY29yZGlvbi1pdGVtLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1EQl9BQ0NPUkRJT05fSVRFTV9IRUFERVIgfSBmcm9tICcuL2FjY29yZGlvbi1pdGVtLWhlYWRlci5kaXJlY3RpdmUnO1xuXG5sZXQgdW5pcXVlSGVhZGVySWQgPSAwO1xubGV0IHVuaXF1ZUlkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWFjY29yZGlvbi1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FjY29yZGlvbi1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAQ29udGVudENoaWxkKE1EQl9BQ0NPUkRJT05fSVRFTV9IRUFERVIsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBfaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZChNREJfQUNDT1JESU9OX0lURU1fQk9EWSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIF9ib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQFZpZXdDaGlsZChNZGJDb2xsYXBzZURpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgY29sbGFwc2U6IE1kYkNvbGxhcHNlRGlyZWN0aXZlO1xuXG4gIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzZXQgY29sbGFwc2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3Nob3VsZE9wZW5PbkluaXQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGlkID0gYG1kYi1hY2NvcmRpb24taXRlbS0ke3VuaXF1ZUlkKyt9YDtcblxuICBfaGVhZGVySWQgPSBgbWRiLWFjY29yZGlvbi1pdGVtLWhlYWRlci0ke3VuaXF1ZUhlYWRlcklkKyt9YDtcblxuICBwcml2YXRlIF9pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgX3Nob3VsZE9wZW5PbkluaXQgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgaXRlbVNob3c6IEV2ZW50RW1pdHRlcjxNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGl0ZW1TaG93bjogRXZlbnRFbWl0dGVyPE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaXRlbUhpZGU6IEV2ZW50RW1pdHRlcjxNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGl0ZW1IaWRkZW46IEV2ZW50RW1pdHRlcjxNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY29yZGlvbi1pdGVtJykgYWNjb3JkaW9uSXRlbSA9IHRydWU7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZC1ibG9jaycpIGFjY29yZGlvbkl0ZW1EaXNwbGF5QmxvY2sgPSB0cnVlO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuX3Nob3VsZE9wZW5PbkluaXQpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIHNob3ckID0gbmV3IFN1YmplY3Q8TWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudD4oKTtcblxuICBfY29sbGFwc2VkID0gdHJ1ZTtcbiAgX2FkZENvbGxhcHNlZENsYXNzID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuY29sbGFwc2UudG9nZ2xlKCk7XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuY29sbGFwc2Uuc2hvdygpO1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbGxhcHNlLmhpZGUoKTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uU2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb2xsYXBzZWRDbGFzcyA9IGZhbHNlO1xuICAgIHRoaXMuaXRlbVNob3cuZW1pdCh0aGlzKTtcblxuICAgIHRoaXMuc2hvdyQubmV4dCh0aGlzKTtcbiAgfVxuXG4gIG9uSGlkZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb2xsYXBzZWRDbGFzcyA9IHRydWU7XG4gICAgdGhpcy5pdGVtSGlkZS5lbWl0KHRoaXMpO1xuICB9XG5cbiAgb25TaG93bigpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB0aGlzLml0ZW1TaG93bi5lbWl0KHRoaXMpO1xuICB9XG5cbiAgb25IaWRkZW4oKTogdm9pZCB7XG4gICAgdGhpcy5fY29sbGFwc2VkID0gdHJ1ZTtcbiAgICB0aGlzLml0ZW1IaWRkZW4uZW1pdCh0aGlzKTtcbiAgfVxufVxuIiwiPGgyIGNsYXNzPVwiYWNjb3JkaW9uLWhlYWRlclwiIFtpZF09XCJfaGVhZGVySWRcIj5cbiAgPGJ1dHRvblxuICAgIGNsYXNzPVwiYWNjb3JkaW9uLWJ1dHRvblwiXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCIhX2NvbGxhcHNlZFwiXG4gICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJpZFwiXG4gICAgW2NsYXNzLmNvbGxhcHNlZF09XCJfYWRkQ29sbGFwc2VkQ2xhc3NcIlxuICAgIChjbGljayk9XCJ0b2dnbGUoKVwiXG4gID5cbiAgICB7eyBoZWFkZXIgfX1cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJfaGVhZGVyVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJfaGVhZGVyVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICA8L2J1dHRvbj5cbjwvaDI+XG48ZGl2XG4gIG1kYkNvbGxhcHNlXG4gIChjb2xsYXBzZVNob3cpPVwib25TaG93KClcIlxuICAoY29sbGFwc2VIaWRlKT1cIm9uSGlkZSgpXCJcbiAgKGNvbGxhcHNlU2hvd24pPVwib25TaG93bigpXCJcbiAgKGNvbGxhcHNlSGlkZGVuKT1cIm9uSGlkZGVuKClcIlxuICBbYXR0ci5pZF09XCJpZFwiXG4gIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJfaGVhZGVySWRcIlxuPlxuICA8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvZHlcIj5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJfYm9keVRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiX2JvZHlUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=