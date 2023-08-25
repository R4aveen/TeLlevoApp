import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MdbTabComponent } from './tab.component';
import { fadeInAnimation } from './tabs.animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/portal";
import * as i3 from "./tab-outlet.directive";
export class MdbTabChange {
    index;
    tab;
}
export class MdbTabsComponent {
    tabs;
    _destroy$ = new Subject();
    get fill() {
        return this._fill;
    }
    set fill(value) {
        this._fill = coerceBooleanProperty(value);
    }
    _fill = false;
    get justified() {
        return this._justified;
    }
    set justified(value) {
        this._justified = coerceBooleanProperty(value);
    }
    _justified = false;
    get pills() {
        return this._pills;
    }
    set pills(value) {
        this._pills = coerceBooleanProperty(value);
    }
    _pills = false;
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    _vertical = false;
    navColumnClass = 'col-3';
    contentColumnClass = 'col-9';
    get navColClass() {
        return this.vertical ? this.navColumnClass : '';
    }
    get contentColClass() {
        return this.vertical ? this.contentColumnClass : '';
    }
    _selectedIndex;
    animationState = false;
    activeTabChange = new EventEmitter();
    constructor() { }
    onAnimationDone() {
        this.animationState = false;
    }
    ngAfterContentInit() {
        const firstActiveTabIndex = this.tabs.toArray().findIndex((tab) => !tab.disabled);
        this.setActiveTab(firstActiveTabIndex);
        this.tabs.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
            const hasActiveTab = this.tabs.find((tab) => tab.active);
            if (!hasActiveTab) {
                const closestTabIndex = this._getClosestTabIndex(this._selectedIndex);
                if (closestTabIndex !== -1) {
                    this.setActiveTab(closestTabIndex);
                }
            }
        });
    }
    _runAnimation() {
        this.animationState = false;
        setTimeout(() => {
            this.animationState = true;
        }, 0);
    }
    setActiveTab(index) {
        const activeTab = this.tabs.toArray()[index];
        if (!activeTab || (activeTab && activeTab.disabled)) {
            return;
        }
        this.tabs.forEach((tab) => (tab.active = tab === activeTab));
        if (activeTab.fade && this._selectedIndex !== index) {
            this._runAnimation();
        }
        this._selectedIndex = index;
        const tabChangeEvent = this._getTabChangeEvent(index, activeTab);
        this.activeTabChange.emit(tabChangeEvent);
    }
    _getTabChangeEvent(index, tab) {
        const event = new MdbTabChange();
        event.index = index;
        event.tab = tab;
        return event;
    }
    _getClosestTabIndex(index) {
        const tabs = this.tabs.toArray();
        const tabsLength = tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (let i = 1; i <= tabsLength; i += 1) {
            const prevIndex = index - i;
            const nextIndex = index + i;
            if (tabs[prevIndex] && !tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (tabs[nextIndex] && !tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    static ngAcceptInputType_fill;
    static ngAcceptInputType_justified;
    static ngAcceptInputType_pills;
    static ngAcceptInputType_vertical;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbTabsComponent, selector: "mdb-tabs", inputs: { fill: "fill", justified: "justified", pills: "pills", vertical: "vertical", navColumnClass: "navColumnClass", contentColumnClass: "contentColumnClass" }, outputs: { activeTabChange: "activeTabChange" }, host: { properties: { "class.row": "this.vertical" } }, queries: [{ propertyName: "tabs", predicate: MdbTabComponent }], ngImport: i0, template: "<ul\n  class=\"nav mb-3 flex-column {{ navColClass }}\"\n  [ngClass]=\"{\n    'nav-pills': pills,\n    'nav-tabs': !pills,\n    'nav-fill': fill,\n    'nav-justified': justified,\n    'flex-column': vertical,\n    'text-center': vertical\n  }\"\n  role=\"tablist\"\n>\n  <li\n    *ngFor=\"let tab of tabs; let i = index\"\n    (click)=\"setActiveTab(i)\"\n    class=\"nav-item\"\n    role=\"presentation\"\n  >\n    <a\n      href=\"javascript:void(0)\"\n      class=\"nav-link\"\n      [class.active]=\"tab.active\"\n      [class.disabled]=\"tab.disabled\"\n      role=\"tab\"\n    >\n      <ng-template [ngIf]=\"tab.titleContent\">\n        <ng-template [cdkPortalOutlet]=\"tab.titleContent\"></ng-template>\n      </ng-template>\n\n      <ng-template [ngIf]=\"!tab.titleContent\">{{ tab.title }}</ng-template>\n    </a>\n  </li>\n</ul>\n\n<div\n  class=\"tab-content {{ contentColClass }}\"\n>\n  <!-- <ng-content select=\"mdb-tab\"></ng-content> -->\n  <ng-container *ngFor=\"let tab of tabs\">\n    <div\n      [@fadeIn]=\"animationState\"\n      (@fadeIn.done)=\"onAnimationDone()\"\n      class=\"tab-pane\"\n      [ngClass]=\"{\n        show: tab.active,\n        active: tab.active\n      }\"\n    >\n      <ng-template mdbTabPortalOutlet [tab]=\"tab\"></ng-template>\n    </div>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { kind: "directive", type: i3.MdbTabPortalOutlet, selector: "[mdbTabPortalOutlet]", inputs: ["tab"] }], animations: [fadeInAnimation()] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-tabs', animations: [fadeInAnimation()], template: "<ul\n  class=\"nav mb-3 flex-column {{ navColClass }}\"\n  [ngClass]=\"{\n    'nav-pills': pills,\n    'nav-tabs': !pills,\n    'nav-fill': fill,\n    'nav-justified': justified,\n    'flex-column': vertical,\n    'text-center': vertical\n  }\"\n  role=\"tablist\"\n>\n  <li\n    *ngFor=\"let tab of tabs; let i = index\"\n    (click)=\"setActiveTab(i)\"\n    class=\"nav-item\"\n    role=\"presentation\"\n  >\n    <a\n      href=\"javascript:void(0)\"\n      class=\"nav-link\"\n      [class.active]=\"tab.active\"\n      [class.disabled]=\"tab.disabled\"\n      role=\"tab\"\n    >\n      <ng-template [ngIf]=\"tab.titleContent\">\n        <ng-template [cdkPortalOutlet]=\"tab.titleContent\"></ng-template>\n      </ng-template>\n\n      <ng-template [ngIf]=\"!tab.titleContent\">{{ tab.title }}</ng-template>\n    </a>\n  </li>\n</ul>\n\n<div\n  class=\"tab-content {{ contentColClass }}\"\n>\n  <!-- <ng-content select=\"mdb-tab\"></ng-content> -->\n  <ng-container *ngFor=\"let tab of tabs\">\n    <div\n      [@fadeIn]=\"animationState\"\n      (@fadeIn.done)=\"onAnimationDone()\"\n      class=\"tab-pane\"\n      [ngClass]=\"{\n        show: tab.active,\n        active: tab.active\n      }\"\n    >\n      <ng-template mdbTabPortalOutlet [tab]=\"tab\"></ng-template>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { tabs: [{
                type: ContentChildren,
                args: [MdbTabComponent]
            }], fill: [{
                type: Input
            }], justified: [{
                type: Input
            }], pills: [{
                type: Input
            }], vertical: [{
                type: HostBinding,
                args: ['class.row']
            }, {
                type: Input
            }], navColumnClass: [{
                type: Input
            }], contentColumnClass: [{
                type: Input
            }], activeTabChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGFicy90YWJzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUVMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQUVwRCxNQUFNLE9BQU8sWUFBWTtJQUN2QixLQUFLLENBQVM7SUFDZCxHQUFHLENBQWtCO0NBQ3RCO0FBT0QsTUFBTSxPQUFPLGdCQUFnQjtJQUNPLElBQUksQ0FBNkI7SUFFMUQsU0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO0lBRXhELElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBYztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRXRCLElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBQ0Qs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QUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUNoRCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtZQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDaEQsT0FBTyxTQUFTLENBQUM7YUFDbEI7U0FDRjtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsTUFBTSxDQUFDLHNCQUFzQixDQUFlO0lBQzVDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBZTtJQUNqRCxNQUFNLENBQUMsdUJBQXVCLENBQWU7SUFDN0MsTUFBTSxDQUFDLDBCQUEwQixDQUFlO3VHQWpKckMsZ0JBQWdCOzJGQUFoQixnQkFBZ0Isa1ZBQ1YsZUFBZSw2QkM1QmxDLHV5Q0FvREEsdW1CRDNCYyxDQUFDLGVBQWUsRUFBRSxDQUFDOzsyRkFFcEIsZ0JBQWdCO2tCQUw1QixTQUFTOytCQUNFLFVBQVUsY0FFUixDQUFDLGVBQWUsRUFBRSxDQUFDOzBFQUdHLElBQUk7c0JBQXJDLGVBQWU7dUJBQUMsZUFBZTtnQkFLNUIsSUFBSTtzQkFEUCxLQUFLO2dCQVVGLFNBQVM7c0JBRFosS0FBSztnQkFVRixLQUFLO3NCQURSLEtBQUs7Z0JBV0YsUUFBUTtzQkFGWCxXQUFXO3VCQUFDLFdBQVc7O3NCQUN2QixLQUFLO2dCQVNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQWNJLGVBQWU7c0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWRiVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IGZhZGVJbkFuaW1hdGlvbiB9IGZyb20gJy4vdGFicy5hbmltYXRpb25zJztcblxuZXhwb3J0IGNsYXNzIE1kYlRhYkNoYW5nZSB7XG4gIGluZGV4OiBudW1iZXI7XG4gIHRhYjogTWRiVGFiQ29tcG9uZW50O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItdGFicycsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJzLmNvbXBvbmVudC5odG1sJyxcbiAgYW5pbWF0aW9uczogW2ZhZGVJbkFuaW1hdGlvbigpXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWRiVGFiQ29tcG9uZW50KSB0YWJzOiBRdWVyeUxpc3Q8TWRiVGFiQ29tcG9uZW50PjtcblxuICByZWFkb25seSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBmaWxsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maWxsO1xuICB9XG4gIHNldCBmaWxsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZmlsbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZmlsbCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBqdXN0aWZpZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2p1c3RpZmllZDtcbiAgfVxuICBzZXQganVzdGlmaWVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fanVzdGlmaWVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9qdXN0aWZpZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgcGlsbHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3BpbGxzO1xuICB9XG4gIHNldCBwaWxscyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3BpbGxzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9waWxscyA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Mucm93JylcbiAgQElucHV0KClcbiAgZ2V0IHZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcbiAgfVxuICBzZXQgdmVydGljYWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92ZXJ0aWNhbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdmVydGljYWwgPSBmYWxzZTtcblxuICBASW5wdXQoKSBuYXZDb2x1bW5DbGFzcyA9ICdjb2wtMyc7XG4gIEBJbnB1dCgpIGNvbnRlbnRDb2x1bW5DbGFzcyA9ICdjb2wtOSc7XG5cbiAgZ2V0IG5hdkNvbENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudmVydGljYWwgPyB0aGlzLm5hdkNvbHVtbkNsYXNzIDogJyc7XG4gIH1cblxuICBnZXQgY29udGVudENvbENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudmVydGljYWwgPyB0aGlzLmNvbnRlbnRDb2x1bW5DbGFzcyA6ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuXG4gIGFuaW1hdGlvblN0YXRlID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGFjdGl2ZVRhYkNoYW5nZTogRXZlbnRFbWl0dGVyPE1kYlRhYkNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1kYlRhYkNoYW5nZT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgb25BbmltYXRpb25Eb25lKCk6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBmYWxzZTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBmaXJzdEFjdGl2ZVRhYkluZGV4ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5maW5kSW5kZXgoKHRhYikgPT4gIXRhYi5kaXNhYmxlZCk7XG5cbiAgICB0aGlzLnNldEFjdGl2ZVRhYihmaXJzdEFjdGl2ZVRhYkluZGV4KTtcbiAgICB0aGlzLnRhYnMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBoYXNBY3RpdmVUYWIgPSB0aGlzLnRhYnMuZmluZCgodGFiKSA9PiB0YWIuYWN0aXZlKTtcblxuICAgICAgaWYgKCFoYXNBY3RpdmVUYWIpIHtcbiAgICAgICAgY29uc3QgY2xvc2VzdFRhYkluZGV4ID0gdGhpcy5fZ2V0Q2xvc2VzdFRhYkluZGV4KHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuXG4gICAgICAgIGlmIChjbG9zZXN0VGFiSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZXRBY3RpdmVUYWIoY2xvc2VzdFRhYkluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcnVuQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBmYWxzZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IHRydWU7XG4gICAgfSwgMCk7XG4gIH1cblxuICBzZXRBY3RpdmVUYWIoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRoaXMudGFicy50b0FycmF5KClbaW5kZXhdO1xuXG4gICAgaWYgKCFhY3RpdmVUYWIgfHwgKGFjdGl2ZVRhYiAmJiBhY3RpdmVUYWIuZGlzYWJsZWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSB0YWIgPT09IGFjdGl2ZVRhYikpO1xuXG4gICAgaWYgKGFjdGl2ZVRhYi5mYWRlICYmIHRoaXMuX3NlbGVjdGVkSW5kZXggIT09IGluZGV4KSB7XG4gICAgICB0aGlzLl9ydW5BbmltYXRpb24oKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG5cbiAgICBjb25zdCB0YWJDaGFuZ2VFdmVudCA9IHRoaXMuX2dldFRhYkNoYW5nZUV2ZW50KGluZGV4LCBhY3RpdmVUYWIpO1xuICAgIHRoaXMuYWN0aXZlVGFiQ2hhbmdlLmVtaXQodGFiQ2hhbmdlRXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VGFiQ2hhbmdlRXZlbnQoaW5kZXg6IG51bWJlciwgdGFiOiBNZGJUYWJDb21wb25lbnQpOiBNZGJUYWJDaGFuZ2Uge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1kYlRhYkNoYW5nZSgpO1xuICAgIGV2ZW50LmluZGV4ID0gaW5kZXg7XG4gICAgZXZlbnQudGFiID0gdGFiO1xuXG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q2xvc2VzdFRhYkluZGV4KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnMudG9BcnJheSgpO1xuICAgIGNvbnN0IHRhYnNMZW5ndGggPSB0YWJzLmxlbmd0aDtcbiAgICBpZiAoIXRhYnNMZW5ndGgpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0YWJzTGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByZXZJbmRleCA9IGluZGV4IC0gaTtcbiAgICAgIGNvbnN0IG5leHRJbmRleCA9IGluZGV4ICsgaTtcbiAgICAgIGlmICh0YWJzW3ByZXZJbmRleF0gJiYgIXRhYnNbcHJldkluZGV4XS5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gcHJldkluZGV4O1xuICAgICAgfVxuICAgICAgaWYgKHRhYnNbbmV4dEluZGV4XSAmJiAhdGFic1tuZXh0SW5kZXhdLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBuZXh0SW5kZXg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpbGw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2p1c3RpZmllZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcGlsbHM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZlcnRpY2FsOiBCb29sZWFuSW5wdXQ7XG59XG4iLCI8dWxcbiAgY2xhc3M9XCJuYXYgbWItMyBmbGV4LWNvbHVtbiB7eyBuYXZDb2xDbGFzcyB9fVwiXG4gIFtuZ0NsYXNzXT1cIntcbiAgICAnbmF2LXBpbGxzJzogcGlsbHMsXG4gICAgJ25hdi10YWJzJzogIXBpbGxzLFxuICAgICduYXYtZmlsbCc6IGZpbGwsXG4gICAgJ25hdi1qdXN0aWZpZWQnOiBqdXN0aWZpZWQsXG4gICAgJ2ZsZXgtY29sdW1uJzogdmVydGljYWwsXG4gICAgJ3RleHQtY2VudGVyJzogdmVydGljYWxcbiAgfVwiXG4gIHJvbGU9XCJ0YWJsaXN0XCJcbj5cbiAgPGxpXG4gICAgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAoY2xpY2spPVwic2V0QWN0aXZlVGFiKGkpXCJcbiAgICBjbGFzcz1cIm5hdi1pdGVtXCJcbiAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgPlxuICAgIDxhXG4gICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgICAgIGNsYXNzPVwibmF2LWxpbmtcIlxuICAgICAgW2NsYXNzLmFjdGl2ZV09XCJ0YWIuYWN0aXZlXCJcbiAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgcm9sZT1cInRhYlwiXG4gICAgPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cInRhYi50aXRsZUNvbnRlbnRcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtjZGtQb3J0YWxPdXRsZXRdPVwidGFiLnRpdGxlQ29udGVudFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIXRhYi50aXRsZUNvbnRlbnRcIj57eyB0YWIudGl0bGUgfX08L25nLXRlbXBsYXRlPlxuICAgIDwvYT5cbiAgPC9saT5cbjwvdWw+XG5cbjxkaXZcbiAgY2xhc3M9XCJ0YWItY29udGVudCB7eyBjb250ZW50Q29sQ2xhc3MgfX1cIlxuPlxuICA8IS0tIDxuZy1jb250ZW50IHNlbGVjdD1cIm1kYi10YWJcIj48L25nLWNvbnRlbnQ+IC0tPlxuICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFic1wiPlxuICAgIDxkaXZcbiAgICAgIFtAZmFkZUluXT1cImFuaW1hdGlvblN0YXRlXCJcbiAgICAgIChAZmFkZUluLmRvbmUpPVwib25BbmltYXRpb25Eb25lKClcIlxuICAgICAgY2xhc3M9XCJ0YWItcGFuZVwiXG4gICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgIHNob3c6IHRhYi5hY3RpdmUsXG4gICAgICAgIGFjdGl2ZTogdGFiLmFjdGl2ZVxuICAgICAgfVwiXG4gICAgPlxuICAgICAgPG5nLXRlbXBsYXRlIG1kYlRhYlBvcnRhbE91dGxldCBbdGFiXT1cInRhYlwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG4iXX0=