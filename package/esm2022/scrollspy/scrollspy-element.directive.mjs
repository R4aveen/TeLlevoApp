import { Directive, Input, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./scrollspy.service";
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MdbScrollspyElementDirective {
    _elementRef;
    renderer;
    ngZone;
    scrollSpyService;
    id;
    get host() {
        return this._elementRef.nativeElement;
    }
    container;
    get scrollSpyId() {
        return this._scrollSpyId;
    }
    set scrollSpyId(newId) {
        if (newId) {
            this._scrollSpyId = newId;
        }
    }
    _scrollSpyId;
    offset = 0;
    constructor(_elementRef, renderer, ngZone, scrollSpyService) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.scrollSpyService = scrollSpyService;
    }
    isElementInViewport() {
        const scrollTop = this.container.scrollTop;
        const elTop = this.host.offsetTop - this.offset;
        const elHeight = this.host.offsetHeight;
        return scrollTop >= elTop && scrollTop < elTop + elHeight;
    }
    updateActiveState(scrollSpyId, id) {
        if (this.isElementInViewport()) {
            this.scrollSpyService.removeActiveLinks(scrollSpyId);
            this.scrollSpyService.updateActiveState(scrollSpyId, id);
        }
    }
    onScroll() {
        this.updateActiveState(this.scrollSpyId, this.id);
    }
    listenToScroll() {
        this.renderer.listen(this.container, 'scroll', () => {
            this.onScroll();
        });
    }
    ngOnInit() {
        this.id = this.host.id;
        if (!this.container) {
            this.container = this._getClosestEl(this.host, '.scrollspy-container');
        }
        this.renderer.setStyle(this.container, 'position', 'relative');
        this.ngZone.runOutsideAngular(this.listenToScroll.bind(this));
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.updateActiveState(this.scrollSpyId, this.id);
        }, 0);
    }
    _getClosestEl(el, selector) {
        for (; el && el !== document; el = el.parentNode) {
            if (el.matches && el.matches(selector)) {
                return el;
            }
        }
        return null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbScrollspyElementDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i1.MdbScrollspyService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbScrollspyElementDirective, selector: "[mdbScrollspyElement]", inputs: { container: "container", scrollSpyId: ["mdbScrollspyElement", "scrollSpyId"], offset: "offset" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbScrollspyElementDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbScrollspyElement]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i1.MdbScrollspyService }]; }, propDecorators: { container: [{
                type: Input
            }], scrollSpyId: [{
                type: Input,
                args: ['mdbScrollspyElement']
            }], offset: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LWVsZW1lbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3Njcm9sbHNweS9zY3JvbGxzcHktZWxlbWVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFLVCxLQUFLLEdBRU4sTUFBTSxlQUFlLENBQUM7OztBQU92QixrRUFBa0U7QUFDbEUsTUFBTSxPQUFPLDRCQUE0QjtJQXVCN0I7SUFDQTtJQUNBO0lBQ0E7SUF6QkYsRUFBRSxDQUFTO0lBRW5CLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQztJQUVRLFNBQVMsQ0FBYztJQUVoQyxJQUNJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQUksV0FBVyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUMzQjtJQUNILENBQUM7SUFDTyxZQUFZLENBQVM7SUFFcEIsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUVwQixZQUNVLFdBQXVCLEVBQ3ZCLFFBQW1CLEVBQ25CLE1BQWMsRUFDZCxnQkFBcUM7UUFIckMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtJQUM1QyxDQUFDO0lBRUosbUJBQW1CO1FBQ2pCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFeEMsT0FBTyxTQUFTLElBQUksS0FBSyxJQUFJLFNBQVMsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO0lBQzVELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxXQUFtQixFQUFFLEVBQVU7UUFDL0MsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFL0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxlQUFlO1FBQ2IsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRU8sYUFBYSxDQUFDLEVBQU8sRUFBRSxRQUFnQjtRQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFO1lBQ2hELElBQUksRUFBRSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN0QyxPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7dUdBL0VVLDRCQUE0QjsyRkFBNUIsNEJBQTRCOzsyRkFBNUIsNEJBQTRCO2tCQUx4QyxTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLHVCQUF1QjtpQkFDbEM7Z0xBU1UsU0FBUztzQkFBakIsS0FBSztnQkFHRixXQUFXO3NCQURkLEtBQUs7dUJBQUMscUJBQXFCO2dCQVduQixNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBOZ1pvbmUsXG4gIElucHV0LFxuICBBZnRlclZpZXdJbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYlNjcm9sbHNweVNlcnZpY2UgfSBmcm9tICcuL3Njcm9sbHNweS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYlNjcm9sbHNweUVsZW1lbnRdJyxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBNZGJTY3JvbGxzcHlFbGVtZW50RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgcHJpdmF0ZSBpZDogc3RyaW5nO1xuXG4gIGdldCBob3N0KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgQElucHV0KCkgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICBASW5wdXQoJ21kYlNjcm9sbHNweUVsZW1lbnQnKVxuICBnZXQgc2Nyb2xsU3B5SWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsU3B5SWQ7XG4gIH1cbiAgc2V0IHNjcm9sbFNweUlkKG5ld0lkOiBzdHJpbmcpIHtcbiAgICBpZiAobmV3SWQpIHtcbiAgICAgIHRoaXMuX3Njcm9sbFNweUlkID0gbmV3SWQ7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3Njcm9sbFNweUlkOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgb2Zmc2V0ID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgc2Nyb2xsU3B5U2VydmljZTogTWRiU2Nyb2xsc3B5U2VydmljZVxuICApIHt9XG5cbiAgaXNFbGVtZW50SW5WaWV3cG9ydCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmNvbnRhaW5lci5zY3JvbGxUb3A7XG4gICAgY29uc3QgZWxUb3AgPSB0aGlzLmhvc3Qub2Zmc2V0VG9wIC0gdGhpcy5vZmZzZXQ7XG4gICAgY29uc3QgZWxIZWlnaHQgPSB0aGlzLmhvc3Qub2Zmc2V0SGVpZ2h0O1xuXG4gICAgcmV0dXJuIHNjcm9sbFRvcCA+PSBlbFRvcCAmJiBzY3JvbGxUb3AgPCBlbFRvcCArIGVsSGVpZ2h0O1xuICB9XG5cbiAgdXBkYXRlQWN0aXZlU3RhdGUoc2Nyb2xsU3B5SWQ6IHN0cmluZywgaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRWxlbWVudEluVmlld3BvcnQoKSkge1xuICAgICAgdGhpcy5zY3JvbGxTcHlTZXJ2aWNlLnJlbW92ZUFjdGl2ZUxpbmtzKHNjcm9sbFNweUlkKTtcbiAgICAgIHRoaXMuc2Nyb2xsU3B5U2VydmljZS51cGRhdGVBY3RpdmVTdGF0ZShzY3JvbGxTcHlJZCwgaWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2Nyb2xsKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlQWN0aXZlU3RhdGUodGhpcy5zY3JvbGxTcHlJZCwgdGhpcy5pZCk7XG4gIH1cblxuICBsaXN0ZW5Ub1Njcm9sbCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmNvbnRhaW5lciwgJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgIHRoaXMub25TY3JvbGwoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaWQgPSB0aGlzLmhvc3QuaWQ7XG5cbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuX2dldENsb3Nlc3RFbCh0aGlzLmhvc3QsICcuc2Nyb2xsc3B5LWNvbnRhaW5lcicpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXIsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIodGhpcy5saXN0ZW5Ub1Njcm9sbC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlQWN0aXZlU3RhdGUodGhpcy5zY3JvbGxTcHlJZCwgdGhpcy5pZCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDbG9zZXN0RWwoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgZm9yICg7IGVsICYmIGVsICE9PSBkb2N1bWVudDsgZWwgPSBlbC5wYXJlbnROb2RlKSB7XG4gICAgICBpZiAoZWwubWF0Y2hlcyAmJiBlbC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=