import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { OverlayConfig, } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ContentChild } from '@angular/core';
import { MdbDropdownToggleDirective } from './dropdown-toggle.directive';
import { MdbDropdownMenuDirective } from './dropdown-menu.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/layout";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbDropdownDirective {
    _overlay;
    _overlayPositionBuilder;
    _elementRef;
    _vcr;
    _breakpointObserver;
    _cdRef;
    _template;
    _dropdownToggle;
    _dropdownMenu;
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = coerceBooleanProperty(value);
    }
    _animation = true;
    offset = 0;
    closeOnOutsideClick = true;
    closeOnItemClick = true;
    closeOnEsc = true;
    withPush = false;
    dropdownShow = new EventEmitter();
    dropdownShown = new EventEmitter();
    dropdownHide = new EventEmitter();
    dropdownHidden = new EventEmitter();
    _overlayRef;
    _portal;
    _open = false;
    _isDropUp;
    _isDropStart;
    _isDropEnd;
    _isDropdownMenuEnd;
    _xPosition;
    _breakpoints;
    _destroy$ = new Subject();
    _breakpointSubscription;
    _animationState = 'hidden';
    constructor(_overlay, _overlayPositionBuilder, _elementRef, _vcr, _breakpointObserver, _cdRef) {
        this._overlay = _overlay;
        this._overlayPositionBuilder = _overlayPositionBuilder;
        this._elementRef = _elementRef;
        this._vcr = _vcr;
        this._breakpointObserver = _breakpointObserver;
        this._cdRef = _cdRef;
        this._breakpoints = {
            isSm: this._breakpointObserver.isMatched('(min-width: 576px)'),
            isMd: this._breakpointObserver.isMatched('(min-width: 768px)'),
            isLg: this._breakpointObserver.isMatched('(min-width: 992px)'),
            isXl: this._breakpointObserver.isMatched('(min-width: 1200px)'),
            isXxl: this._breakpointObserver.isMatched('(min-width: 1400px)'),
        };
    }
    ngAfterContentInit() {
        this._bindDropdownToggleClick();
    }
    ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._overlayRef.dispose();
        }
        this._destroy$.next();
        this._destroy$.complete();
    }
    _bindDropdownToggleClick() {
        fromEvent(this._dropdownToggle.nativeElement, 'click')
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this.toggle());
    }
    _createOverlayConfig() {
        return new OverlayConfig({
            hasBackdrop: false,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy: this._createPositionStrategy(),
        });
    }
    _createOverlay() {
        this._overlayRef = this._overlay.create(this._createOverlayConfig());
    }
    _createPositionStrategy() {
        const positionStrategy = this._overlayPositionBuilder
            .flexibleConnectedTo(this._dropdownToggle)
            .withPositions(this._getPosition())
            .withFlexibleDimensions(false)
            .withPush(this.withPush);
        return positionStrategy;
    }
    _getPosition() {
        this._isDropUp = this._elementRef.nativeElement.classList.contains('dropup');
        this._isDropStart = this._elementRef.nativeElement.classList.contains('dropstart');
        this._isDropEnd = this._elementRef.nativeElement.classList.contains('dropend');
        this._isDropdownMenuEnd =
            this._dropdownMenu.nativeElement.classList.contains('dropdown-menu-end');
        this._xPosition = this._isDropdownMenuEnd ? 'end' : 'start';
        const regex = new RegExp(/dropdown-menu-(sm|md|lg|xl|xxl)-(start|end)/, 'g');
        const responsiveClass = this._dropdownMenu.nativeElement.className.match(regex);
        if (responsiveClass) {
            this._subscribeBrakpoints();
            const positionRegex = new RegExp(/start|end/, 'g');
            const breakpointRegex = new RegExp(/(sm|md|lg|xl|xxl)/, 'g');
            const dropdownPosition = positionRegex.exec(responsiveClass)[0];
            const breakpoint = breakpointRegex.exec(responsiveClass)[0];
            switch (true) {
                case breakpoint === 'xxl' && this._breakpoints.isXxl:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'xl' && this._breakpoints.isXl:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'lg' && this._breakpoints.isLg:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'md' && this._breakpoints.isMd:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'sm' && this._breakpoints.isSm:
                    this._xPosition = dropdownPosition;
                    break;
                default:
                    break;
            }
        }
        let position;
        const positionDropup = {
            originX: this._xPosition,
            originY: 'top',
            overlayX: this._xPosition,
            overlayY: 'bottom',
            offsetY: -this.offset,
        };
        const positionDropdown = {
            originX: this._xPosition,
            originY: 'bottom',
            overlayX: this._xPosition,
            overlayY: 'top',
            offsetY: this.offset,
        };
        const positionDropstart = {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: this.offset,
        };
        const positionDropend = {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: -this.offset,
        };
        switch (true) {
            case this._isDropEnd:
                position = [positionDropend, positionDropstart];
                break;
            case this._isDropStart:
                position = [positionDropstart, positionDropend];
                break;
            case this._isDropUp:
                position = [positionDropup, positionDropdown];
                break;
            default:
                position = [positionDropdown, positionDropup];
                break;
        }
        return position;
    }
    _listenToEscKeyup(overlayRef) {
        return fromEvent(document, 'keyup').pipe(filter((event) => event.key === 'Escape'), takeUntil(overlayRef.detachments()));
    }
    _listenToClick(overlayRef, origin) {
        return fromEvent(document, 'click').pipe(filter((event) => {
            const target = event.target;
            const isInsideMenu = this._dropdownMenu.nativeElement.contains(target);
            const notTogglerIcon = !this._dropdownToggle.nativeElement.contains(target);
            const notCustomContent = !isInsideMenu || (target.classList && target.classList.contains('dropdown-item'));
            const notOrigin = target !== origin;
            return notOrigin && notTogglerIcon && notCustomContent;
        }), takeUntil(overlayRef.detachments()));
    }
    onAnimationEnd(event) {
        if (event.fromState === 'visible' && event.toState === 'hidden') {
            this._overlayRef.detach();
            this._open = false;
            this.dropdownHidden.emit(this);
        }
        if (event.fromState === 'hidden' && event.toState === 'visible') {
            this.dropdownShown.emit(this);
        }
    }
    _subscribeBrakpoints() {
        const brakpoints = [
            '(min-width: 576px)',
            '(min-width: 768px)',
            '(min-width: 992px)',
            '(min-width: 1200px)',
            '(min-width: 1400px)',
        ];
        this._breakpointSubscription = this._breakpointObserver
            .observe(brakpoints)
            .pipe(takeUntil(this._destroy$))
            .subscribe((result) => {
            Object.keys(this._breakpoints).forEach((key, index) => {
                const brakpointValue = brakpoints[index];
                const newBreakpoint = result.breakpoints[brakpointValue];
                const isBreakpointChanged = newBreakpoint !== this._breakpoints[key];
                if (!isBreakpointChanged) {
                    return;
                }
                this._breakpoints[key] = newBreakpoint;
                if (this._open) {
                    this._overlayRef.updatePositionStrategy(this._createPositionStrategy());
                }
            });
        });
    }
    show() {
        this._cdRef.markForCheck();
        if (this._open) {
            return;
        }
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._portal = new TemplatePortal(this._template, this._vcr);
        this.dropdownShow.emit(this);
        this._open = true;
        this._overlayRef.attach(this._portal);
        this._listenToEscKeyup(this._overlayRef).subscribe((isEsc) => {
            if (isEsc && this.closeOnEsc) {
                this.hide();
            }
        });
        this._overlayRef
            .keydownEvents()
            .pipe(takeUntil(this._overlayRef.detachments()))
            .subscribe((event) => {
            this._handleKeyboardNavigation(event);
        });
        this._listenToClick(this._overlayRef, this._dropdownToggle.nativeElement).subscribe((event) => {
            const target = event.target;
            const isDropdownItem = target.classList && target.classList.contains('dropdown-item');
            if (this.closeOnItemClick && isDropdownItem) {
                this.hide();
                return;
            }
            if (this.closeOnOutsideClick && !isDropdownItem) {
                this.hide();
                return;
            }
        });
        this._animationState = 'visible';
    }
    _handleKeyboardNavigation(event) {
        const items = Array.from(this._dropdownMenu.nativeElement.querySelectorAll('.dropdown-item'));
        const key = event.key;
        const activeElement = this._dropdownMenu.nativeElement.ownerDocument.activeElement;
        if (items.length === 0) {
            return;
        }
        let index = items.indexOf(activeElement);
        switch (key) {
            case 'ArrowDown':
                event.preventDefault();
                index = Math.min(index + 1, items.length - 1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (index === -1) {
                    index = items.length - 1;
                    break;
                }
                index = Math.max(index - 1, 0);
                break;
        }
        const nextActiveElement = items[index];
        if (nextActiveElement) {
            nextActiveElement.focus();
        }
    }
    hide() {
        this._cdRef.markForCheck();
        if (!this._open) {
            return;
        }
        this.dropdownHide.emit(this);
        this._animationState = 'hidden';
    }
    toggle() {
        this._cdRef.markForCheck();
        if (this._open) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    static ngAcceptInputType_animation;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbDropdownDirective, deps: [{ token: i1.Overlay }, { token: i1.OverlayPositionBuilder }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i2.BreakpointObserver }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbDropdownDirective, selector: "[mdbDropdown]", inputs: { animation: "animation", offset: "offset", closeOnOutsideClick: "closeOnOutsideClick", closeOnItemClick: "closeOnItemClick", closeOnEsc: "closeOnEsc", withPush: "withPush" }, outputs: { dropdownShow: "dropdownShow", dropdownShown: "dropdownShown", dropdownHide: "dropdownHide", dropdownHidden: "dropdownHidden" }, queries: [{ propertyName: "_dropdownToggle", first: true, predicate: MdbDropdownToggleDirective, descendants: true, read: ElementRef }, { propertyName: "_dropdownMenu", first: true, predicate: MdbDropdownMenuDirective, descendants: true, read: ElementRef }], viewQueries: [{ propertyName: "_template", first: true, predicate: ["dropdownTemplate"], descendants: true }], ngImport: i0, template: "<ng-content></ng-content>\n<ng-content select=\".dropdown-toggle\"></ng-content>\n<ng-template #dropdownTemplate>\n  <div [@fade]=\"_animationState\" (@fade.done)=\"onAnimationEnd($event)\" [@.disabled]=\"!animation\">\n    <ng-content select=\".dropdown-menu\"></ng-content>\n  </div>\n</ng-template>\n", animations: [
            trigger('fade', [
                state('visible', style({ opacity: 1 })),
                state('hidden', style({ opacity: 0 })),
                transition('visible => hidden', animate('150ms linear')),
                transition('hidden => visible', [style({ opacity: 0 }), animate('150ms linear')]),
            ]),
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbDropdownDirective, decorators: [{
            type: Component,
            args: [{ selector: '[mdbDropdown]', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fade', [
                            state('visible', style({ opacity: 1 })),
                            state('hidden', style({ opacity: 0 })),
                            transition('visible => hidden', animate('150ms linear')),
                            transition('hidden => visible', [style({ opacity: 0 }), animate('150ms linear')]),
                        ]),
                    ], template: "<ng-content></ng-content>\n<ng-content select=\".dropdown-toggle\"></ng-content>\n<ng-template #dropdownTemplate>\n  <div [@fade]=\"_animationState\" (@fade.done)=\"onAnimationEnd($event)\" [@.disabled]=\"!animation\">\n    <ng-content select=\".dropdown-menu\"></ng-content>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i1.OverlayPositionBuilder }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i2.BreakpointObserver }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _template: [{
                type: ViewChild,
                args: ['dropdownTemplate']
            }], _dropdownToggle: [{
                type: ContentChild,
                args: [MdbDropdownToggleDirective, { read: ElementRef }]
            }], _dropdownMenu: [{
                type: ContentChild,
                args: [MdbDropdownMenuDirective, { read: ElementRef }]
            }], animation: [{
                type: Input
            }], offset: [{
                type: Input
            }], closeOnOutsideClick: [{
                type: Input
            }], closeOnItemClick: [{
                type: Input
            }], closeOnEsc: [{
                type: Input
            }], withPush: [{
                type: Input
            }], dropdownShow: [{
                type: Output
            }], dropdownShown: [{
                type: Output
            }], dropdownHide: [{
                type: Output
            }], dropdownHidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Ryb3Bkb3duL2Ryb3Bkb3duLmRpcmVjdGl2ZS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4sU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFJTCxhQUFhLEdBR2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFrQixNQUFNLHFCQUFxQixDQUFDO0FBRWpHLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQWdCNUUsa0VBQWtFO0FBQ2xFLE1BQU0sT0FBTyxvQkFBb0I7SUF5Q3JCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQTdDcUIsU0FBUyxDQUFtQjtJQUNLLGVBQWUsQ0FB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QVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdEMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDeEQsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7eUJBQ2xGLENBQUM7cUJBQ0g7NFBBSThCLFNBQVM7c0JBQXZDLFNBQVM7dUJBQUMsa0JBQWtCO2dCQUNtQyxlQUFlO3NCQUE5RSxZQUFZO3VCQUFDLDBCQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFDQSxhQUFhO3NCQUExRSxZQUFZO3VCQUFDLHdCQUF3QixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFHeEQsU0FBUztzQkFEWixLQUFLO2dCQVNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbm5lY3RlZFBvc2l0aW9uLFxuICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gIE92ZXJsYXksXG4gIE92ZXJsYXlDb25maWcsXG4gIE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXG4gIE92ZXJsYXlSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJEcm9wZG93blRvZ2dsZURpcmVjdGl2ZSB9IGZyb20gJy4vZHJvcGRvd24tdG9nZ2xlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZGJEcm9wZG93bk1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL2Ryb3Bkb3duLW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEJyZWFrcG9pbnRPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiRHJvcGRvd25dJyxcbiAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmFkZScsIFtcbiAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcbiAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxuICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiBoaWRkZW4nLCBhbmltYXRlKCcxNTBtcyBsaW5lYXInKSksXG4gICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gdmlzaWJsZScsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzE1MG1zIGxpbmVhcicpXSksXG4gICAgXSksXG4gIF0sXG59KVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTWRiRHJvcGRvd25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuICBAVmlld0NoaWxkKCdkcm9wZG93blRlbXBsYXRlJykgX3RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKE1kYkRyb3Bkb3duVG9nZ2xlRGlyZWN0aXZlLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgX2Ryb3Bkb3duVG9nZ2xlOiBFbGVtZW50UmVmO1xuICBAQ29udGVudENoaWxkKE1kYkRyb3Bkb3duTWVudURpcmVjdGl2ZSwgeyByZWFkOiBFbGVtZW50UmVmIH0pIF9kcm9wZG93bk1lbnU6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KClcbiAgZ2V0IGFuaW1hdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW9uO1xuICB9XG4gIHNldCBhbmltYXRpb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hbmltYXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2FuaW1hdGlvbiA9IHRydWU7XG5cbiAgQElucHV0KCkgb2Zmc2V0ID0gMDtcbiAgQElucHV0KCkgY2xvc2VPbk91dHNpZGVDbGljayA9IHRydWU7XG4gIEBJbnB1dCgpIGNsb3NlT25JdGVtQ2xpY2sgPSB0cnVlO1xuICBASW5wdXQoKSBjbG9zZU9uRXNjID0gdHJ1ZTtcbiAgQElucHV0KCkgd2l0aFB1c2ggPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgZHJvcGRvd25TaG93OiBFdmVudEVtaXR0ZXI8TWRiRHJvcGRvd25EaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZHJvcGRvd25TaG93bjogRXZlbnRFbWl0dGVyPE1kYkRyb3Bkb3duRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRyb3Bkb3duSGlkZTogRXZlbnRFbWl0dGVyPE1kYkRyb3Bkb3duRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRyb3Bkb3duSGlkZGVuOiBFdmVudEVtaXR0ZXI8TWRiRHJvcGRvd25EaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG4gIHByaXZhdGUgX3BvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG4gIHByaXZhdGUgX29wZW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaXNEcm9wVXA6IGJvb2xlYW47XG4gIHByaXZhdGUgX2lzRHJvcFN0YXJ0OiBib29sZWFuO1xuICBwcml2YXRlIF9pc0Ryb3BFbmQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2lzRHJvcGRvd25NZW51RW5kOiBib29sZWFuO1xuICBwcml2YXRlIF94UG9zaXRpb246IHN0cmluZztcbiAgcHJpdmF0ZSBfYnJlYWtwb2ludHM6IGFueTtcblxuICByZWFkb25seSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIF9icmVha3BvaW50U3Vic2NyaXB0aW9uOiBhbnk7XG4gIF9hbmltYXRpb25TdGF0ZSA9ICdoaWRkZW4nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfb3ZlcmxheVBvc2l0aW9uQnVpbGRlcjogT3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3ZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIF9icmVha3BvaW50T2JzZXJ2ZXI6IEJyZWFrcG9pbnRPYnNlcnZlcixcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgIHRoaXMuX2JyZWFrcG9pbnRzID0ge1xuICAgICAgaXNTbTogdGhpcy5fYnJlYWtwb2ludE9ic2VydmVyLmlzTWF0Y2hlZCgnKG1pbi13aWR0aDogNTc2cHgpJyksXG4gICAgICBpc01kOiB0aGlzLl9icmVha3BvaW50T2JzZXJ2ZXIuaXNNYXRjaGVkKCcobWluLXdpZHRoOiA3NjhweCknKSxcbiAgICAgIGlzTGc6IHRoaXMuX2JyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoJyhtaW4td2lkdGg6IDk5MnB4KScpLFxuICAgICAgaXNYbDogdGhpcy5fYnJlYWtwb2ludE9ic2VydmVyLmlzTWF0Y2hlZCgnKG1pbi13aWR0aDogMTIwMHB4KScpLFxuICAgICAgaXNYeGw6IHRoaXMuX2JyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoJyhtaW4td2lkdGg6IDE0MDBweCknKSxcbiAgICB9O1xuICB9XG5cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fYmluZERyb3Bkb3duVG9nZ2xlQ2xpY2soKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9iaW5kRHJvcGRvd25Ub2dnbGVDbGljaygpOiB2b2lkIHtcbiAgICBmcm9tRXZlbnQodGhpcy5fZHJvcGRvd25Ub2dnbGUubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudG9nZ2xlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCksXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9jcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCksXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IHZvaWQge1xuICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZSh0aGlzLl9jcmVhdGVPdmVybGF5Q29uZmlnKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlUG9zaXRpb25TdHJhdGVneSgpOiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5UG9zaXRpb25CdWlsZGVyXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kcm9wZG93blRvZ2dsZSlcbiAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMuX2dldFBvc2l0aW9uKCkpXG4gICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgIC53aXRoUHVzaCh0aGlzLndpdGhQdXNoKTtcblxuICAgIHJldHVybiBwb3NpdGlvblN0cmF0ZWd5O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb24oKTogQ29ubmVjdGVkUG9zaXRpb25bXSB7XG4gICAgdGhpcy5faXNEcm9wVXAgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wdXAnKTtcbiAgICB0aGlzLl9pc0Ryb3BTdGFydCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3BzdGFydCcpO1xuICAgIHRoaXMuX2lzRHJvcEVuZCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3BlbmQnKTtcbiAgICB0aGlzLl9pc0Ryb3Bkb3duTWVudUVuZCA9XG4gICAgICB0aGlzLl9kcm9wZG93bk1lbnUubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLW1lbnUtZW5kJyk7XG4gICAgdGhpcy5feFBvc2l0aW9uID0gdGhpcy5faXNEcm9wZG93bk1lbnVFbmQgPyAnZW5kJyA6ICdzdGFydCc7XG5cbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoL2Ryb3Bkb3duLW1lbnUtKHNtfG1kfGxnfHhsfHh4bCktKHN0YXJ0fGVuZCkvLCAnZycpO1xuXG4gICAgY29uc3QgcmVzcG9uc2l2ZUNsYXNzID0gdGhpcy5fZHJvcGRvd25NZW51Lm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lLm1hdGNoKHJlZ2V4KTtcblxuICAgIGlmIChyZXNwb25zaXZlQ2xhc3MpIHtcbiAgICAgIHRoaXMuX3N1YnNjcmliZUJyYWtwb2ludHMoKTtcblxuICAgICAgY29uc3QgcG9zaXRpb25SZWdleCA9IG5ldyBSZWdFeHAoL3N0YXJ0fGVuZC8sICdnJyk7XG4gICAgICBjb25zdCBicmVha3BvaW50UmVnZXggPSBuZXcgUmVnRXhwKC8oc218bWR8bGd8eGx8eHhsKS8sICdnJyk7XG5cbiAgICAgIGNvbnN0IGRyb3Bkb3duUG9zaXRpb24gPSBwb3NpdGlvblJlZ2V4LmV4ZWMocmVzcG9uc2l2ZUNsYXNzKVswXTtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBicmVha3BvaW50UmVnZXguZXhlYyhyZXNwb25zaXZlQ2xhc3MpWzBdO1xuXG4gICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSBicmVha3BvaW50ID09PSAneHhsJyAmJiB0aGlzLl9icmVha3BvaW50cy5pc1h4bDpcbiAgICAgICAgICB0aGlzLl94UG9zaXRpb24gPSBkcm9wZG93blBvc2l0aW9uO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGJyZWFrcG9pbnQgPT09ICd4bCcgJiYgdGhpcy5fYnJlYWtwb2ludHMuaXNYbDpcbiAgICAgICAgICB0aGlzLl94UG9zaXRpb24gPSBkcm9wZG93blBvc2l0aW9uO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGJyZWFrcG9pbnQgPT09ICdsZycgJiYgdGhpcy5fYnJlYWtwb2ludHMuaXNMZzpcbiAgICAgICAgICB0aGlzLl94UG9zaXRpb24gPSBkcm9wZG93blBvc2l0aW9uO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGJyZWFrcG9pbnQgPT09ICdtZCcgJiYgdGhpcy5fYnJlYWtwb2ludHMuaXNNZDpcbiAgICAgICAgICB0aGlzLl94UG9zaXRpb24gPSBkcm9wZG93blBvc2l0aW9uO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGJyZWFrcG9pbnQgPT09ICdzbScgJiYgdGhpcy5fYnJlYWtwb2ludHMuaXNTbTpcbiAgICAgICAgICB0aGlzLl94UG9zaXRpb24gPSBkcm9wZG93blBvc2l0aW9uO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwb3NpdGlvbjtcblxuICAgIGNvbnN0IHBvc2l0aW9uRHJvcHVwID0ge1xuICAgICAgb3JpZ2luWDogdGhpcy5feFBvc2l0aW9uLFxuICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICBvdmVybGF5WDogdGhpcy5feFBvc2l0aW9uLFxuICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxuICAgICAgb2Zmc2V0WTogLXRoaXMub2Zmc2V0LFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkRyb3Bkb3duID0ge1xuICAgICAgb3JpZ2luWDogdGhpcy5feFBvc2l0aW9uLFxuICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICBvdmVybGF5WDogdGhpcy5feFBvc2l0aW9uLFxuICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgb2Zmc2V0WTogdGhpcy5vZmZzZXQsXG4gICAgfTtcblxuICAgIGNvbnN0IHBvc2l0aW9uRHJvcHN0YXJ0ID0ge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgb2Zmc2V0WDogdGhpcy5vZmZzZXQsXG4gICAgfTtcblxuICAgIGNvbnN0IHBvc2l0aW9uRHJvcGVuZCA9IHtcbiAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgIG9mZnNldFg6IC10aGlzLm9mZnNldCxcbiAgICB9O1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRoaXMuX2lzRHJvcEVuZDpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25Ecm9wZW5kLCBwb3NpdGlvbkRyb3BzdGFydF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLl9pc0Ryb3BTdGFydDpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25Ecm9wc3RhcnQsIHBvc2l0aW9uRHJvcGVuZF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLl9pc0Ryb3BVcDpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25Ecm9wdXAsIHBvc2l0aW9uRHJvcGRvd25dO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uRHJvcGRvd24sIHBvc2l0aW9uRHJvcHVwXTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9Fc2NLZXl1cChvdmVybGF5UmVmOiBPdmVybGF5UmVmKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XG4gICAgcmV0dXJuIGZyb21FdmVudChkb2N1bWVudCwgJ2tleXVwJykucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpLFxuICAgICAgdGFrZVVudGlsKG92ZXJsYXlSZWYuZGV0YWNobWVudHMoKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9DbGljayhvdmVybGF5UmVmOiBPdmVybGF5UmVmLCBvcmlnaW46IEhUTUxFbGVtZW50KTogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PiB7XG4gICAgcmV0dXJuIGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBpc0luc2lkZU1lbnUgPSB0aGlzLl9kcm9wZG93bk1lbnUubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICBjb25zdCBub3RUb2dnbGVySWNvbiA9ICF0aGlzLl9kcm9wZG93blRvZ2dsZS5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICAgIGNvbnN0IG5vdEN1c3RvbUNvbnRlbnQgPVxuICAgICAgICAgICFpc0luc2lkZU1lbnUgfHwgKHRhcmdldC5jbGFzc0xpc3QgJiYgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcGRvd24taXRlbScpKTtcbiAgICAgICAgY29uc3Qgbm90T3JpZ2luID0gdGFyZ2V0ICE9PSBvcmlnaW47XG4gICAgICAgIHJldHVybiBub3RPcmlnaW4gJiYgbm90VG9nZ2xlckljb24gJiYgbm90Q3VzdG9tQ29udGVudDtcbiAgICAgIH0pLFxuICAgICAgdGFrZVVudGlsKG92ZXJsYXlSZWYuZGV0YWNobWVudHMoKSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5mcm9tU3RhdGUgPT09ICd2aXNpYmxlJyAmJiBldmVudC50b1N0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuZHJvcGRvd25IaWRkZW4uZW1pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuZnJvbVN0YXRlID09PSAnaGlkZGVuJyAmJiBldmVudC50b1N0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgIHRoaXMuZHJvcGRvd25TaG93bi5lbWl0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZUJyYWtwb2ludHMoKTogdm9pZCB7XG4gICAgY29uc3QgYnJha3BvaW50cyA9IFtcbiAgICAgICcobWluLXdpZHRoOiA1NzZweCknLFxuICAgICAgJyhtaW4td2lkdGg6IDc2OHB4KScsXG4gICAgICAnKG1pbi13aWR0aDogOTkycHgpJyxcbiAgICAgICcobWluLXdpZHRoOiAxMjAwcHgpJyxcbiAgICAgICcobWluLXdpZHRoOiAxNDAwcHgpJyxcbiAgICBdO1xuXG4gICAgdGhpcy5fYnJlYWtwb2ludFN1YnNjcmlwdGlvbiA9IHRoaXMuX2JyZWFrcG9pbnRPYnNlcnZlclxuICAgICAgLm9ic2VydmUoYnJha3BvaW50cylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fYnJlYWtwb2ludHMpLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBicmFrcG9pbnRWYWx1ZSA9IGJyYWtwb2ludHNbaW5kZXhdO1xuICAgICAgICAgIGNvbnN0IG5ld0JyZWFrcG9pbnQgPSByZXN1bHQuYnJlYWtwb2ludHNbYnJha3BvaW50VmFsdWVdO1xuICAgICAgICAgIGNvbnN0IGlzQnJlYWtwb2ludENoYW5nZWQgPSBuZXdCcmVha3BvaW50ICE9PSB0aGlzLl9icmVha3BvaW50c1trZXldO1xuXG4gICAgICAgICAgaWYgKCFpc0JyZWFrcG9pbnRDaGFuZ2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fYnJlYWtwb2ludHNba2V5XSA9IG5ld0JyZWFrcG9pbnQ7XG5cbiAgICAgICAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvblN0cmF0ZWd5KHRoaXMuX2NyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGlmICh0aGlzLl9vcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9jcmVhdGVPdmVybGF5KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuX3RlbXBsYXRlLCB0aGlzLl92Y3IpO1xuXG4gICAgdGhpcy5kcm9wZG93blNob3cuZW1pdCh0aGlzKTtcblxuICAgIHRoaXMuX29wZW4gPSB0cnVlO1xuICAgIHRoaXMuX292ZXJsYXlSZWYuYXR0YWNoKHRoaXMuX3BvcnRhbCk7XG5cbiAgICB0aGlzLl9saXN0ZW5Ub0VzY0tleXVwKHRoaXMuX292ZXJsYXlSZWYpLnN1YnNjcmliZSgoaXNFc2MpID0+IHtcbiAgICAgIGlmIChpc0VzYyAmJiB0aGlzLmNsb3NlT25Fc2MpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9vdmVybGF5UmVmXG4gICAgICAua2V5ZG93bkV2ZW50cygpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb3ZlcmxheVJlZi5kZXRhY2htZW50cygpKSlcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUtleWJvYXJkTmF2aWdhdGlvbihldmVudCk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX2xpc3RlblRvQ2xpY2sodGhpcy5fb3ZlcmxheVJlZiwgdGhpcy5fZHJvcGRvd25Ub2dnbGUubmF0aXZlRWxlbWVudCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgY29uc3QgaXNEcm9wZG93bkl0ZW0gPSB0YXJnZXQuY2xhc3NMaXN0ICYmIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLWl0ZW0nKTtcblxuICAgICAgaWYgKHRoaXMuY2xvc2VPbkl0ZW1DbGljayAmJiBpc0Ryb3Bkb3duSXRlbSkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhaXNEcm9wZG93bkl0ZW0pIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlID0gJ3Zpc2libGUnO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlS2V5Ym9hcmROYXZpZ2F0aW9uKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgaXRlbXM6IEhUTUxFbGVtZW50W10gPSBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5fZHJvcGRvd25NZW51Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLWl0ZW0nKVxuICAgICk7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSB0aGlzLl9kcm9wZG93bk1lbnUubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGluZGV4ID0gaXRlbXMuaW5kZXhPZihhY3RpdmVFbGVtZW50KTtcblxuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGluZGV4ID0gTWF0aC5taW4oaW5kZXggKyAxLCBpdGVtcy5sZW5ndGggLSAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgaW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4ID0gTWF0aC5tYXgoaW5kZXggLSAxLCAwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dEFjdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gaXRlbXNbaW5kZXhdO1xuXG4gICAgaWYgKG5leHRBY3RpdmVFbGVtZW50KSB7XG4gICAgICBuZXh0QWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICBpZiAoIXRoaXMuX29wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRyb3Bkb3duSGlkZS5lbWl0KHRoaXMpO1xuXG4gICAgdGhpcy5fYW5pbWF0aW9uU3RhdGUgPSAnaGlkZGVuJztcbiAgfVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGlmICh0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2FuaW1hdGlvbjogQm9vbGVhbklucHV0O1xufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPG5nLWNvbnRlbnQgc2VsZWN0PVwiLmRyb3Bkb3duLXRvZ2dsZVwiPjwvbmctY29udGVudD5cbjxuZy10ZW1wbGF0ZSAjZHJvcGRvd25UZW1wbGF0ZT5cbiAgPGRpdiBbQGZhZGVdPVwiX2FuaW1hdGlvblN0YXRlXCIgKEBmYWRlLmRvbmUpPVwib25BbmltYXRpb25FbmQoJGV2ZW50KVwiIFtALmRpc2FibGVkXT1cIiFhbmltYXRpb25cIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCIuZHJvcGRvd24tbWVudVwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19