import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Directive, Inject, Input, } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MdbTabPortalOutlet extends CdkPortalOutlet {
    _destroy$ = new Subject();
    tab;
    constructor(_cfr, _vcr, _document) {
        super(_cfr, _vcr, _document);
    }
    ngOnInit() {
        super.ngOnInit();
        if ((this.tab.shouldAttach || this.tab.active) && !this.hasAttached()) {
            this.attach(this.tab.content);
        }
        else {
            this.tab.activeStateChange$.pipe(takeUntil(this._destroy$)).subscribe((isActive) => {
                if (isActive && !this.hasAttached()) {
                    this.attach(this.tab.content);
                }
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        super.ngOnDestroy();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTabPortalOutlet, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ViewContainerRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbTabPortalOutlet, selector: "[mdbTabPortalOutlet]", inputs: { tab: "tab" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTabPortalOutlet, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTabPortalOutlet]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { tab: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW91dGxldC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGFicy90YWItb3V0bGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssR0FJTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFPM0Msa0VBQWtFO0FBQ2xFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxlQUFlO0lBQzVDLFNBQVMsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUUvQyxHQUFHLENBQWtCO0lBRTlCLFlBQ0UsSUFBOEIsRUFDOUIsSUFBc0IsRUFDSixTQUFjO1FBRWhDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRO1FBQ04sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNqRixJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMvQjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEIsQ0FBQzt1R0EvQlUsa0JBQWtCLDBGQVFuQixRQUFROzJGQVJQLGtCQUFrQjs7MkZBQWxCLGtCQUFrQjtrQkFMOUIsU0FBUzttQkFBQztvQkFDVCw4REFBOEQ7b0JBQzlELFFBQVEsRUFBRSxzQkFBc0I7aUJBQ2pDOzswQkFVSSxNQUFNOzJCQUFDLFFBQVE7NENBTFQsR0FBRztzQkFBWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrUG9ydGFsT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWRiVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYlRhYlBvcnRhbE91dGxldF0nLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYlRhYlBvcnRhbE91dGxldCBleHRlbmRzIENka1BvcnRhbE91dGxldCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBASW5wdXQoKSB0YWI6IE1kYlRhYkNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgX3ZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueVxuICApIHtcbiAgICBzdXBlcihfY2ZyLCBfdmNyLCBfZG9jdW1lbnQpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIGlmICgodGhpcy50YWIuc2hvdWxkQXR0YWNoIHx8IHRoaXMudGFiLmFjdGl2ZSkgJiYgIXRoaXMuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5hdHRhY2godGhpcy50YWIuY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGFiLmFjdGl2ZVN0YXRlQ2hhbmdlJC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoaXNBY3RpdmUpID0+IHtcbiAgICAgICAgaWYgKGlzQWN0aXZlICYmICF0aGlzLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICB0aGlzLmF0dGFjaCh0aGlzLnRhYi5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxufVxuIl19