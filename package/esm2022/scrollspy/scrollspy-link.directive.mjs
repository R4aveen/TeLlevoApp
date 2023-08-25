import { Directive, Input, HostListener, HostBinding, Inject, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
export class MdbScrollspyLinkDirective {
    cdRef;
    document;
    get scrollIntoView() {
        return this._scrollIntoView;
    }
    set scrollIntoView(value) {
        this._scrollIntoView = value;
    }
    _scrollIntoView = true;
    get section() {
        return this._section;
    }
    set section(value) {
        if (value) {
            this._section = value;
        }
    }
    _section;
    _id;
    constructor(cdRef, document) {
        this.cdRef = cdRef;
        this.document = document;
    }
    get id() {
        return this._id;
    }
    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }
    scrollspyLink = true;
    active = false;
    onClick() {
        if (this.section && this.scrollIntoView === true) {
            this.section.scrollIntoView();
        }
    }
    detectChanges() {
        this.cdRef.detectChanges();
    }
    assignSectionToId() {
        this.section = this.document.documentElement.querySelector(`#${this.id}`);
    }
    ngOnInit() {
        this.assignSectionToId();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbScrollspyLinkDirective, deps: [{ token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbScrollspyLinkDirective, selector: "[mdbScrollspyLink]", inputs: { scrollIntoView: "scrollIntoView", id: ["mdbScrollspyLink", "id"] }, host: { listeners: { "click": "onClick()" }, properties: { "class.scrollspy-link": "this.scrollspyLink", "class.active": "this.active" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbScrollspyLinkDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbScrollspyLink]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { scrollIntoView: [{
                type: Input
            }], id: [{
                type: Input,
                args: ['mdbScrollspyLink']
            }], scrollspyLink: [{
                type: HostBinding,
                args: ['class.scrollspy-link']
            }], active: [{
                type: HostBinding,
                args: ['class.active']
            }], onClick: [{
                type: HostListener,
                args: ['click', []]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3Njcm9sbHNweS9zY3JvbGxzcHktbGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsWUFBWSxFQUNaLFdBQVcsRUFFWCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQU0zQyxNQUFNLE9BQU8seUJBQXlCO0lBcUJoQjtJQUFvRDtJQXBCeEUsSUFDSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxjQUFjLENBQUMsS0FBYztRQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBQ08sZUFBZSxHQUFHLElBQUksQ0FBQztJQUUvQixJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksT0FBTyxDQUFDLEtBQWtCO1FBQzVCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBQ08sUUFBUSxDQUFjO0lBQ3RCLEdBQUcsQ0FBUztJQUVwQixZQUFvQixLQUF3QixFQUE0QixRQUFhO1FBQWpFLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQTRCLGFBQVEsR0FBUixRQUFRLENBQUs7SUFBRyxDQUFDO0lBRXpGLElBQ0ksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsS0FBYTtRQUNsQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUdELGFBQWEsR0FBRyxJQUFJLENBQUM7SUFHckIsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUdmLE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7dUdBeERVLHlCQUF5QixtREFxQmtCLFFBQVE7MkZBckJuRCx5QkFBeUI7OzJGQUF6Qix5QkFBeUI7a0JBSnJDLFNBQVM7bUJBQUM7b0JBQ1QsOERBQThEO29CQUM5RCxRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjs7MEJBc0JnRCxNQUFNOzJCQUFDLFFBQVE7NENBbkIxRCxjQUFjO3NCQURqQixLQUFLO2dCQXVCRixFQUFFO3NCQURMLEtBQUs7dUJBQUMsa0JBQWtCO2dCQVd6QixhQUFhO3NCQURaLFdBQVc7dUJBQUMsc0JBQXNCO2dCQUluQyxNQUFNO3NCQURMLFdBQVc7dUJBQUMsY0FBYztnQkFJM0IsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8sRUFBRSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBPbkluaXQsXG4gIElucHV0LFxuICBIb3N0TGlzdGVuZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYlNjcm9sbHNweUxpbmtdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiU2Nyb2xsc3B5TGlua0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGdldCBzY3JvbGxJbnRvVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsSW50b1ZpZXc7XG4gIH1cbiAgc2V0IHNjcm9sbEludG9WaWV3KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2Nyb2xsSW50b1ZpZXcgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9zY3JvbGxJbnRvVmlldyA9IHRydWU7XG5cbiAgZ2V0IHNlY3Rpb24oKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9zZWN0aW9uO1xuICB9XG4gIHNldCBzZWN0aW9uKHZhbHVlOiBIVE1MRWxlbWVudCkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fc2VjdGlvbiA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9zZWN0aW9uOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7fVxuXG4gIEBJbnB1dCgnbWRiU2Nyb2xsc3B5TGluaycpXG4gIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuICBzZXQgaWQobmV3SWQ6IHN0cmluZykge1xuICAgIGlmIChuZXdJZCkge1xuICAgICAgdGhpcy5faWQgPSBuZXdJZDtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNjcm9sbHNweS1saW5rJylcbiAgc2Nyb2xsc3B5TGluayA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBhY3RpdmUgPSBmYWxzZTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFtdKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlY3Rpb24gJiYgdGhpcy5zY3JvbGxJbnRvVmlldyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5zZWN0aW9uLnNjcm9sbEludG9WaWV3KCk7XG4gICAgfVxuICB9XG5cbiAgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGFzc2lnblNlY3Rpb25Ub0lkKCk6IHZvaWQge1xuICAgIHRoaXMuc2VjdGlvbiA9IHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMuaWR9YCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFzc2lnblNlY3Rpb25Ub0lkKCk7XG4gIH1cbn1cbiJdfQ==