import { Component, ContentChildren, EventEmitter, Input, Output, } from '@angular/core';
import { MdbScrollspyLinkDirective } from './scrollspy-link.directive';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "./scrollspy.service";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbScrollspyDirective {
    scrollSpyService;
    _elementRef;
    _renderer;
    links;
    _destroy$ = new Subject();
    get id() {
        return this._id;
    }
    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }
    _id;
    get collapsible() {
        return this._collapsible;
    }
    set collapsible(value) {
        this._collapsible = coerceBooleanProperty(value);
    }
    _collapsible = false;
    activeLinkChange = new EventEmitter();
    activeSub;
    constructor(scrollSpyService, _elementRef, _renderer) {
        this.scrollSpyService = scrollSpyService;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    collapsibleElementHeight = 0;
    ngOnInit() {
        this.collapsibleElementHeight = this.host.getBoundingClientRect().height;
        this.activeSub = this.scrollSpyService.active$
            .pipe(takeUntil(this._destroy$), distinctUntilChanged())
            .subscribe((activeLink) => {
            this.activeLinkChange.emit(activeLink);
            if (this.collapsible) {
                this.styleCollapsibleElement();
            }
        });
    }
    ngAfterContentInit() {
        this.scrollSpyService.addScrollspy({ id: this.id, links: this.links });
    }
    ngOnDestroy() {
        this.scrollSpyService.removeScrollspy(this.id);
        this._destroy$.next();
        this._destroy$.complete();
    }
    styleCollapsibleElement() {
        this._renderer.setStyle(this.host, 'overflow', 'hidden');
        this._renderer.setStyle(this.host, 'transition', 'height 0.2s ease-in-out');
        this._renderer.setStyle(this.host, 'flex-wrap', 'nowrap');
        const hostSiblings = this.getAllSiblings(this.host);
        const isAnySiblingActive = hostSiblings.some((element) => {
            return element.classList.contains('active');
        });
        if (this.collapsible && isAnySiblingActive) {
            this._renderer.setStyle(this.host, 'height', `${this.collapsibleElementHeight}px`);
        }
        else if (this.collapsible && !isAnySiblingActive) {
            this._renderer.setStyle(this.host, 'height', '0px');
        }
    }
    getAllSiblings(element) {
        let siblings = [];
        if (!element.parentNode) {
            return siblings;
        }
        let sibling = element.parentNode.firstElementChild;
        do {
            if (sibling != element) {
                siblings.push(sibling);
            }
        } while ((sibling = sibling.nextElementSibling));
        return siblings;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbScrollspyDirective, deps: [{ token: i1.MdbScrollspyService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbScrollspyDirective, selector: "[mdbScrollspy]", inputs: { id: ["mdbScrollspy", "id"], collapsible: "collapsible" }, outputs: { activeLinkChange: "activeLinkChange" }, queries: [{ propertyName: "links", predicate: MdbScrollspyLinkDirective, descendants: true }], ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbScrollspyDirective, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: '[mdbScrollspy]',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i1.MdbScrollspyService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { links: [{
                type: ContentChildren,
                args: [MdbScrollspyLinkDirective, { descendants: true }]
            }], id: [{
                type: Input,
                args: ['mdbScrollspy']
            }], collapsible: [{
                type: Input
            }], activeLinkChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zY3JvbGxzcHkvc2Nyb2xsc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FHUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQU85RCxrRUFBa0U7QUFDbEUsTUFBTSxPQUFPLHFCQUFxQjtJQWtDdEI7SUFDQTtJQUNBO0lBbENWLEtBQUssQ0FBdUM7SUFFbkMsU0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO0lBRXhELElBQ0ksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxFQUFFLENBQUMsS0FBYTtRQUNsQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVPLEdBQUcsQ0FBUztJQUVwQixJQUNJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQUksV0FBVyxDQUFDLEtBQWM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU8sWUFBWSxHQUFHLEtBQUssQ0FBQztJQUVuQixnQkFBZ0Is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LENBQUMsVUFBVSxFQUFFO1lBQ3ZCLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztRQUNuRCxHQUFHO1lBQ0QsSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFO2dCQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hCO1NBQ0YsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUNqRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO3VHQWhHVSxxQkFBcUI7MkZBQXJCLHFCQUFxQixtTUFDZix5QkFBeUIsZ0RBSmhDLDJCQUEyQjs7MkZBRzFCLHFCQUFxQjtrQkFOakMsU0FBUzttQkFBQztvQkFDVCw4REFBOEQ7b0JBQzlELFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3RDOzJKQUlDLEtBQUs7c0JBREosZUFBZTt1QkFBQyx5QkFBeUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBTTdELEVBQUU7c0JBREwsS0FBSzt1QkFBQyxjQUFjO2dCQWNqQixXQUFXO3NCQURkLEtBQUs7Z0JBVUksZ0JBQWdCO3NCQUF6QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYlNjcm9sbHNweUxpbmtEaXJlY3RpdmUgfSBmcm9tICcuL3Njcm9sbHNweS1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZGJTY3JvbGxzcHlTZXJ2aWNlIH0gZnJvbSAnLi9zY3JvbGxzcHkuc2VydmljZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiU2Nyb2xsc3B5XScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTWRiU2Nyb2xsc3B5RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAQ29udGVudENoaWxkcmVuKE1kYlNjcm9sbHNweUxpbmtEaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgbGlua3M6IFF1ZXJ5TGlzdDxNZGJTY3JvbGxzcHlMaW5rRGlyZWN0aXZlPjtcblxuICByZWFkb25seSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIEBJbnB1dCgnbWRiU2Nyb2xsc3B5JylcbiAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgc2V0IGlkKG5ld0lkOiBzdHJpbmcpIHtcbiAgICBpZiAobmV3SWQpIHtcbiAgICAgIHRoaXMuX2lkID0gbmV3SWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBnZXQgY29sbGFwc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNpYmxlO1xuICB9XG4gIHNldCBjb2xsYXBzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NvbGxhcHNpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbGxhcHNpYmxlID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGFjdGl2ZUxpbmtDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgYWN0aXZlU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzY3JvbGxTcHlTZXJ2aWNlOiBNZGJTY3JvbGxzcHlTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgZ2V0IGhvc3QoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBjb2xsYXBzaWJsZUVsZW1lbnRIZWlnaHQgPSAwO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29sbGFwc2libGVFbGVtZW50SGVpZ2h0ID0gdGhpcy5ob3N0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICB0aGlzLmFjdGl2ZVN1YiA9IHRoaXMuc2Nyb2xsU3B5U2VydmljZS5hY3RpdmUkXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgLnN1YnNjcmliZSgoYWN0aXZlTGluaykgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2ZUxpbmtDaGFuZ2UuZW1pdChhY3RpdmVMaW5rKTtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2libGUpIHtcbiAgICAgICAgICB0aGlzLnN0eWxlQ29sbGFwc2libGVFbGVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2Nyb2xsU3B5U2VydmljZS5hZGRTY3JvbGxzcHkoeyBpZDogdGhpcy5pZCwgbGlua3M6IHRoaXMubGlua3MgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbFNweVNlcnZpY2UucmVtb3ZlU2Nyb2xsc3B5KHRoaXMuaWQpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdHlsZUNvbGxhcHNpYmxlRWxlbWVudCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICd0cmFuc2l0aW9uJywgJ2hlaWdodCAwLjJzIGVhc2UtaW4tb3V0Jyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAnZmxleC13cmFwJywgJ25vd3JhcCcpO1xuXG4gICAgY29uc3QgaG9zdFNpYmxpbmdzID0gdGhpcy5nZXRBbGxTaWJsaW5ncyh0aGlzLmhvc3QpO1xuICAgIGNvbnN0IGlzQW55U2libGluZ0FjdGl2ZSA9IGhvc3RTaWJsaW5ncy5zb21lKChlbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY29sbGFwc2libGUgJiYgaXNBbnlTaWJsaW5nQWN0aXZlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdoZWlnaHQnLCBgJHt0aGlzLmNvbGxhcHNpYmxlRWxlbWVudEhlaWdodH1weGApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb2xsYXBzaWJsZSAmJiAhaXNBbnlTaWJsaW5nQWN0aXZlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdoZWlnaHQnLCAnMHB4Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRBbGxTaWJsaW5ncyhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBzaWJsaW5ncyA9IFtdO1xuICAgIGlmICghZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICByZXR1cm4gc2libGluZ3M7XG4gICAgfVxuICAgIGxldCBzaWJsaW5nID0gZWxlbWVudC5wYXJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGRvIHtcbiAgICAgIGlmIChzaWJsaW5nICE9IGVsZW1lbnQpIHtcbiAgICAgICAgc2libGluZ3MucHVzaChzaWJsaW5nKTtcbiAgICAgIH1cbiAgICB9IHdoaWxlICgoc2libGluZyA9IHNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nKSk7XG4gICAgcmV0dXJuIHNpYmxpbmdzO1xuICB9XG59XG4iXX0=