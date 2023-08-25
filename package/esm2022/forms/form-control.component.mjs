import { Component, ChangeDetectionStrategy, HostBinding, ViewChild, ContentChild, ElementRef, } from '@angular/core';
import { MdbAbstractFormControl } from './form-control';
import { MdbLabelDirective } from './label.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/observers";
export class MdbFormControlComponent {
    _renderer;
    _contentObserver;
    _elementRef;
    _ngZone;
    _notchLeading;
    _notchMiddle;
    _formControl;
    _label;
    outline = true;
    display = true;
    get input() {
        return this._formControl.input;
    }
    constructor(_renderer, _contentObserver, _elementRef, _ngZone) {
        this._renderer = _renderer;
        this._contentObserver = _contentObserver;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
    }
    _destroy$ = new Subject();
    _notchLeadingLength = 9;
    _labelMarginLeft = 0;
    _labelGapPadding = 8;
    _labelScale = 0.8;
    _recalculateGapWhenVisible = false;
    ngAfterContentInit() {
        if (this._label) {
            setTimeout(() => {
                this._updateBorderGap();
            }, 0);
        }
        else {
            this._renderer.addClass(this.input, 'placeholder-active');
        }
        this._updateLabelActiveState();
        if (this._label) {
            this._contentObserver
                .observe(this._label.nativeElement)
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                this._updateBorderGap();
            });
        }
        this._formControl.stateChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._updateLabelActiveState();
            if (this._label) {
                this._updateBorderGap();
            }
        });
        this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.pipe(takeUntil(this._destroy$)).subscribe(() => {
                if (this._label && this._recalculateGapWhenVisible) {
                    this._updateBorderGap();
                }
            });
        });
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.unsubscribe();
    }
    _getLabelWidth() {
        return this._label.nativeElement.clientWidth * this._labelScale + this._labelGapPadding;
    }
    _updateBorderGap() {
        // Element is in DOM but is not visible, we need to recalculate the gap when element
        // is displayed. This problem may occur in components such as tabs where content of
        // inactive tabs has display:none styles
        if (this._isHidden()) {
            this._recalculateGapWhenVisible = true;
            return;
        }
        const notchLeadingWidth = `${this._labelMarginLeft + this._notchLeadingLength}px`;
        const notchMiddleWidth = `${this._getLabelWidth()}px`;
        this._notchLeading.nativeElement.style.width = notchLeadingWidth;
        this._notchMiddle.nativeElement.style.width = notchMiddleWidth;
        this._label.nativeElement.style.marginLeft = `${this._labelMarginLeft}px`;
        this._recalculateGapWhenVisible = false;
    }
    _updateLabelActiveState() {
        if (this._isLabelActive()) {
            this._renderer.addClass(this.input, 'active');
        }
        else {
            this._renderer.removeClass(this.input, 'active');
        }
    }
    _isLabelActive() {
        return this._formControl && this._formControl.labelActive;
    }
    _isHidden() {
        const el = this._elementRef.nativeElement;
        return !el.offsetHeight && !el.offsetWidth;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbFormControlComponent, deps: [{ token: i0.Renderer2 }, { token: i1.ContentObserver }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbFormControlComponent, selector: "mdb-form-control", host: { properties: { "class.form-outline": "this.outline", "class.d-block": "this.display" } }, queries: [{ propertyName: "_formControl", first: true, predicate: MdbAbstractFormControl, descendants: true, static: true }, { propertyName: "_label", first: true, predicate: MdbLabelDirective, descendants: true, read: ElementRef, static: true }], viewQueries: [{ propertyName: "_notchLeading", first: true, predicate: ["notchLeading"], descendants: true, static: true }, { propertyName: "_notchMiddle", first: true, predicate: ["notchMiddle"], descendants: true, static: true }], ngImport: i0, template: "<ng-content></ng-content>\n<div class=\"form-notch\">\n  <div #notchLeading class=\"form-notch-leading\"></div>\n  <div #notchMiddle class=\"form-notch-middle\"></div>\n  <div class=\"form-notch-trailing\"></div>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbFormControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-form-control', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n<div class=\"form-notch\">\n  <div #notchLeading class=\"form-notch-leading\"></div>\n  <div #notchMiddle class=\"form-notch-middle\"></div>\n  <div class=\"form-notch-trailing\"></div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.ContentObserver }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { _notchLeading: [{
                type: ViewChild,
                args: ['notchLeading', { static: true }]
            }], _notchMiddle: [{
                type: ViewChild,
                args: ['notchMiddle', { static: true }]
            }], _formControl: [{
                type: ContentChild,
                args: [MdbAbstractFormControl, { static: true }]
            }], _label: [{
                type: ContentChild,
                args: [MdbLabelDirective, { static: true, read: ElementRef }]
            }], outline: [{
                type: HostBinding,
                args: ['class.form-outline']
            }], display: [{
                type: HostBinding,
                args: ['class.d-block']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9mb3Jtcy9mb3JtLWNvbnRyb2wuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Zvcm1zL2Zvcm0tY29udHJvbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEdBS1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU8zQyxNQUFNLE9BQU8sdUJBQXVCO0lBY3hCO0lBQ0E7SUFDQTtJQUNBO0lBaEJtQyxhQUFhLENBQWE7SUFDM0IsWUFBWSxDQUFhO0lBQ2IsWUFBWSxDQUE4QjtJQUM3QixNQUFNLENBQWE7SUFFckQsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDO0lBRTdDLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVELFlBQ1UsU0FBb0IsRUFDcEIsZ0JBQWlDLEVBQ2pDLFdBQXVCLEVBQ3ZCLE9BQWU7UUFIZixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsWUFBTyxHQUFQLE9B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dUJBQUMsc0JBQXNCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUNlLE1BQU07c0JBQTFFLFlBQVk7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBRWhDLE9BQU87c0JBQXpDLFdBQVc7dUJBQUMsb0JBQW9CO2dCQUNILE9BQU87c0JBQXBDLFdBQVc7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEhvc3RCaW5kaW5nLFxuICBWaWV3Q2hpbGQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgUmVuZGVyZXIyLFxuICBPbkRlc3Ryb3ksXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJBYnN0cmFjdEZvcm1Db250cm9sIH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgTWRiTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL2xhYmVsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250ZW50T2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWZvcm0tY29udHJvbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWRiRm9ybUNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdub3RjaExlYWRpbmcnLCB7IHN0YXRpYzogdHJ1ZSB9KSBfbm90Y2hMZWFkaW5nOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdub3RjaE1pZGRsZScsIHsgc3RhdGljOiB0cnVlIH0pIF9ub3RjaE1pZGRsZTogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZChNZGJBYnN0cmFjdEZvcm1Db250cm9sLCB7IHN0YXRpYzogdHJ1ZSB9KSBfZm9ybUNvbnRyb2w6IE1kYkFic3RyYWN0Rm9ybUNvbnRyb2w8YW55PjtcbiAgQENvbnRlbnRDaGlsZChNZGJMYWJlbERpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUsIHJlYWQ6IEVsZW1lbnRSZWYgfSkgX2xhYmVsOiBFbGVtZW50UmVmO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZm9ybS1vdXRsaW5lJykgb3V0bGluZSA9IHRydWU7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZC1ibG9jaycpIGRpc3BsYXkgPSB0cnVlO1xuXG4gIGdldCBpbnB1dCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybUNvbnRyb2wuaW5wdXQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX2NvbnRlbnRPYnNlcnZlcjogQ29udGVudE9ic2VydmVyLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmVcbiAgKSB7fVxuXG4gIHJlYWRvbmx5IF9kZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfbm90Y2hMZWFkaW5nTGVuZ3RoID0gOTtcbiAgcHJpdmF0ZSBfbGFiZWxNYXJnaW5MZWZ0ID0gMDtcbiAgcHJpdmF0ZSBfbGFiZWxHYXBQYWRkaW5nID0gODtcbiAgcHJpdmF0ZSBfbGFiZWxTY2FsZSA9IDAuODtcbiAgcHJpdmF0ZSBfcmVjYWxjdWxhdGVHYXBXaGVuVmlzaWJsZSA9IGZhbHNlO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbGFiZWwpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl91cGRhdGVCb3JkZXJHYXAoKTtcbiAgICAgIH0sIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmlucHV0LCAncGxhY2Vob2xkZXItYWN0aXZlJyk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZUxhYmVsQWN0aXZlU3RhdGUoKTtcblxuICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgdGhpcy5fY29udGVudE9ic2VydmVyXG4gICAgICAgIC5vYnNlcnZlKHRoaXMuX2xhYmVsLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZUJvcmRlckdhcCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9mb3JtQ29udHJvbC5zdGF0ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fdXBkYXRlTGFiZWxBY3RpdmVTdGF0ZSgpO1xuICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUJvcmRlckdhcCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCAmJiB0aGlzLl9yZWNhbGN1bGF0ZUdhcFdoZW5WaXNpYmxlKSB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlQm9yZGVyR2FwKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMYWJlbFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xhYmVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGggKiB0aGlzLl9sYWJlbFNjYWxlICsgdGhpcy5fbGFiZWxHYXBQYWRkaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm9yZGVyR2FwKCk6IHZvaWQge1xuICAgIC8vIEVsZW1lbnQgaXMgaW4gRE9NIGJ1dCBpcyBub3QgdmlzaWJsZSwgd2UgbmVlZCB0byByZWNhbGN1bGF0ZSB0aGUgZ2FwIHdoZW4gZWxlbWVudFxuICAgIC8vIGlzIGRpc3BsYXllZC4gVGhpcyBwcm9ibGVtIG1heSBvY2N1ciBpbiBjb21wb25lbnRzIHN1Y2ggYXMgdGFicyB3aGVyZSBjb250ZW50IG9mXG4gICAgLy8gaW5hY3RpdmUgdGFicyBoYXMgZGlzcGxheTpub25lIHN0eWxlc1xuXG4gICAgaWYgKHRoaXMuX2lzSGlkZGVuKCkpIHtcbiAgICAgIHRoaXMuX3JlY2FsY3VsYXRlR2FwV2hlblZpc2libGUgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vdGNoTGVhZGluZ1dpZHRoID0gYCR7dGhpcy5fbGFiZWxNYXJnaW5MZWZ0ICsgdGhpcy5fbm90Y2hMZWFkaW5nTGVuZ3RofXB4YDtcbiAgICBjb25zdCBub3RjaE1pZGRsZVdpZHRoID0gYCR7dGhpcy5fZ2V0TGFiZWxXaWR0aCgpfXB4YDtcblxuICAgIHRoaXMuX25vdGNoTGVhZGluZy5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gbm90Y2hMZWFkaW5nV2lkdGg7XG4gICAgdGhpcy5fbm90Y2hNaWRkbGUubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IG5vdGNoTWlkZGxlV2lkdGg7XG4gICAgdGhpcy5fbGFiZWwubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7dGhpcy5fbGFiZWxNYXJnaW5MZWZ0fXB4YDtcblxuICAgIHRoaXMuX3JlY2FsY3VsYXRlR2FwV2hlblZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUxhYmVsQWN0aXZlU3RhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2lzTGFiZWxBY3RpdmUoKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5pbnB1dCwgJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmlucHV0LCAnYWN0aXZlJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNMYWJlbEFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybUNvbnRyb2wgJiYgdGhpcy5fZm9ybUNvbnRyb2wubGFiZWxBY3RpdmU7XG4gIH1cblxuICBwcml2YXRlIF9pc0hpZGRlbigpOiBib29sZWFuIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIHJldHVybiAhZWwub2Zmc2V0SGVpZ2h0ICYmICFlbC5vZmZzZXRXaWR0aDtcbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPGRpdiBjbGFzcz1cImZvcm0tbm90Y2hcIj5cbiAgPGRpdiAjbm90Y2hMZWFkaW5nIGNsYXNzPVwiZm9ybS1ub3RjaC1sZWFkaW5nXCI+PC9kaXY+XG4gIDxkaXYgI25vdGNoTWlkZGxlIGNsYXNzPVwiZm9ybS1ub3RjaC1taWRkbGVcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvcm0tbm90Y2gtdHJhaWxpbmdcIj48L2Rpdj5cbjwvZGl2PlxuIl19