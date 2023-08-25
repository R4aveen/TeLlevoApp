import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { OverlayConfig, } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MdbTooltipComponent } from './tooltip.component';
import { fromEvent, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbTooltipDirective {
    _overlay;
    _overlayPositionBuilder;
    _elementRef;
    mdbTooltip = '';
    tooltipDisabled = false;
    placement = 'top';
    html = false;
    animation = true;
    trigger = 'hover focus';
    delayShow = 0;
    delayHide = 0;
    offset = 0;
    tooltipShow = new EventEmitter();
    tooltipShown = new EventEmitter();
    tooltipHide = new EventEmitter();
    tooltipHidden = new EventEmitter();
    _overlayRef;
    _tooltipRef;
    _open = false;
    _showTimeout = 0;
    _hideTimeout = 0;
    _destroy$ = new Subject();
    constructor(_overlay, _overlayPositionBuilder, _elementRef) {
        this._overlay = _overlay;
        this._overlayPositionBuilder = _overlayPositionBuilder;
        this._elementRef = _elementRef;
    }
    ngOnInit() {
        if (this.tooltipDisabled || this.mdbTooltip === '') {
            return;
        }
        this._bindTriggerEvents();
    }
    ngOnDestroy() {
        if (this._open || this._showTimeout) {
            this.hide();
        }
        this._destroy$.next();
        this._destroy$.complete();
    }
    _bindTriggerEvents() {
        const triggers = this.trigger.split(' ');
        triggers.forEach((trigger) => {
            if (trigger === 'click') {
                fromEvent(this._elementRef.nativeElement, trigger)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe(() => this.toggle());
            }
            else if (trigger !== 'manual') {
                const evIn = trigger === 'hover' ? 'mouseenter' : 'focusin';
                const evOut = trigger === 'hover' ? 'mouseleave' : 'focusout';
                fromEvent(this._elementRef.nativeElement, evIn)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe(() => this.show());
                fromEvent(this._elementRef.nativeElement, evOut)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe(() => this.hide());
            }
        });
    }
    _createOverlayConfig() {
        const positionStrategy = this._overlayPositionBuilder
            .flexibleConnectedTo(this._elementRef)
            .withPositions(this._getPosition());
        const overlayConfig = new OverlayConfig({
            hasBackdrop: false,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy,
        });
        return overlayConfig;
    }
    _createOverlay() {
        this._overlayRef = this._overlay.create(this._createOverlayConfig());
    }
    _getPosition() {
        let position;
        const positionTop = {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: -this.offset,
        };
        const positionBottom = {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: this.offset,
        };
        const positionRight = {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            offsetX: this.offset,
        };
        const positionLeft = {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: -this.offset,
        };
        switch (this.placement) {
            case 'top':
                position = [positionTop, positionBottom];
                break;
            case 'bottom':
                position = [positionBottom, positionTop];
                break;
            case 'left':
                position = [positionLeft, positionRight];
                break;
            case 'right':
                position = [positionRight, positionLeft];
                break;
            default:
                break;
        }
        return position;
    }
    show() {
        if (this._hideTimeout || this._open) {
            this._overlayRef.detach();
            clearTimeout(this._hideTimeout);
            this._hideTimeout = null;
        }
        this._createOverlay();
        this._showTimeout = setTimeout(() => {
            const tooltipPortal = new ComponentPortal(MdbTooltipComponent);
            this.tooltipShow.emit(this);
            this._open = true;
            this._tooltipRef = this._overlayRef.attach(tooltipPortal);
            this._tooltipRef.instance.title = this.mdbTooltip;
            this._tooltipRef.instance.html = this.html;
            this._tooltipRef.instance.animation = this.animation;
            this._tooltipRef.instance.animationState = 'visible';
            this._tooltipRef.instance.markForCheck();
            this.tooltipShown.emit(this);
        }, this.delayShow);
    }
    hide() {
        if (this._showTimeout) {
            clearTimeout(this._showTimeout);
            this._showTimeout = null;
        }
        else {
            return;
        }
        this._hideTimeout = setTimeout(() => {
            this.tooltipHide.emit(this);
            if (!this._tooltipRef) {
                this._overlayRef.detach();
                this._open = false;
                this.tooltipHidden.emit(this);
            }
            else {
                this._tooltipRef.instance._hidden.pipe(first()).subscribe(() => {
                    this._overlayRef.detach();
                    this._open = false;
                    this.tooltipHidden.emit(this);
                });
                this._tooltipRef.instance.animationState = 'hidden';
                this._tooltipRef.instance.markForCheck();
            }
        }, this.delayHide);
    }
    toggle() {
        if (this._open) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTooltipDirective, deps: [{ token: i1.Overlay }, { token: i1.OverlayPositionBuilder }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbTooltipDirective, selector: "[mdbTooltip]", inputs: { mdbTooltip: "mdbTooltip", tooltipDisabled: "tooltipDisabled", placement: "placement", html: "html", animation: "animation", trigger: "trigger", delayShow: "delayShow", delayHide: "delayHide", offset: "offset" }, outputs: { tooltipShow: "tooltipShow", tooltipShown: "tooltipShown", tooltipHide: "tooltipHide", tooltipHidden: "tooltipHidden" }, exportAs: ["mdbTooltip"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTooltip]',
                    exportAs: 'mdbTooltip',
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i1.OverlayPositionBuilder }, { type: i0.ElementRef }]; }, propDecorators: { mdbTooltip: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], placement: [{
                type: Input
            }], html: [{
                type: Input
            }], animation: [{
                type: Input
            }], trigger: [{
                type: Input
            }], delayShow: [{
                type: Input
            }], delayHide: [{
                type: Input
            }], offset: [{
                type: Input
            }], tooltipShow: [{
                type: Output
            }], tooltipShown: [{
                type: Output
            }], tooltipHide: [{
                type: Output
            }], tooltipHidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxhQUFhLEdBR2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBT2xELGtFQUFrRTtBQUNsRSxNQUFNLE9BQU8sbUJBQW1CO0lBeUJwQjtJQUNBO0lBQ0E7SUExQkQsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNoQixlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLFNBQVMsR0FBdUIsS0FBSyxDQUFDO0lBQ3RDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDYixTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLE9BQU8sR0FBRyxhQUFhLENBQUM7SUFDeEIsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNkLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRVYsV0FBVyxHQUFzQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3BFLFlBQVksR0FBc0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNyRSxXQUFXLEdBQXNDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDcEUsYUFBYSxHQUFzQyxJQUFJLFlBQVksRUFBRSxD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QUFRLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDMUM7UUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQzt1R0F6TVUsbUJBQW1COzJGQUFuQixtQkFBbUI7OzJGQUFuQixtQkFBbUI7a0JBTi9CLFNBQVM7bUJBQUM7b0JBQ1QsOERBQThEO29CQUM5RCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCOzRKQUdVLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUVJLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb25uZWN0ZWRQb3NpdGlvbixcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgT3ZlcmxheVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBNZGJUb29sdGlwQ29tcG9uZW50IH0gZnJvbSAnLi90b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJUb29sdGlwUG9zaXRpb24gfSBmcm9tICcuL3Rvb2x0aXAudHlwZXMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiVG9vbHRpcF0nLFxuICBleHBvcnRBczogJ21kYlRvb2x0aXAnLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYlRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG1kYlRvb2x0aXAgPSAnJztcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBsYWNlbWVudDogTWRiVG9vbHRpcFBvc2l0aW9uID0gJ3RvcCc7XG4gIEBJbnB1dCgpIGh0bWwgPSBmYWxzZTtcbiAgQElucHV0KCkgYW5pbWF0aW9uID0gdHJ1ZTtcbiAgQElucHV0KCkgdHJpZ2dlciA9ICdob3ZlciBmb2N1cyc7XG4gIEBJbnB1dCgpIGRlbGF5U2hvdyA9IDA7XG4gIEBJbnB1dCgpIGRlbGF5SGlkZSA9IDA7XG4gIEBJbnB1dCgpIG9mZnNldCA9IDA7XG5cbiAgQE91dHB1dCgpIHRvb2x0aXBTaG93OiBFdmVudEVtaXR0ZXI8TWRiVG9vbHRpcERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSB0b29sdGlwU2hvd246IEV2ZW50RW1pdHRlcjxNZGJUb29sdGlwRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHRvb2x0aXBIaWRlOiBFdmVudEVtaXR0ZXI8TWRiVG9vbHRpcERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSB0b29sdGlwSGlkZGVuOiBFdmVudEVtaXR0ZXI8TWRiVG9vbHRpcERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgcHJpdmF0ZSBfdG9vbHRpcFJlZjogQ29tcG9uZW50UmVmPE1kYlRvb2x0aXBDb21wb25lbnQ+O1xuICBwcml2YXRlIF9vcGVuID0gZmFsc2U7XG4gIHByaXZhdGUgX3Nob3dUaW1lb3V0OiBhbnkgPSAwO1xuICBwcml2YXRlIF9oaWRlVGltZW91dDogYW55ID0gMDtcblxuICByZWFkb25seSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfb3ZlcmxheVBvc2l0aW9uQnVpbGRlcjogT3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sdGlwRGlzYWJsZWQgfHwgdGhpcy5tZGJUb29sdGlwID09PSAnJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2JpbmRUcmlnZ2VyRXZlbnRzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3BlbiB8fCB0aGlzLl9zaG93VGltZW91dCkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9iaW5kVHJpZ2dlckV2ZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMudHJpZ2dlci5zcGxpdCgnICcpO1xuXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgaWYgKHRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJpZ2dlcilcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy50b2dnbGUoKSk7XG4gICAgICB9IGVsc2UgaWYgKHRyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgIGNvbnN0IGV2SW4gPSB0cmlnZ2VyID09PSAnaG92ZXInID8gJ21vdXNlZW50ZXInIDogJ2ZvY3VzaW4nO1xuICAgICAgICBjb25zdCBldk91dCA9IHRyaWdnZXIgPT09ICdob3ZlcicgPyAnbW91c2VsZWF2ZScgOiAnZm9jdXNvdXQnO1xuXG4gICAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGV2SW4pXG4gICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2hvdygpKTtcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZXZPdXQpXG4gICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXJcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuX2VsZW1lbnRSZWYpXG4gICAgICAud2l0aFBvc2l0aW9ucyh0aGlzLl9nZXRQb3NpdGlvbigpKTtcbiAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCksXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG92ZXJsYXlDb25maWc7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IHZvaWQge1xuICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZSh0aGlzLl9jcmVhdGVPdmVybGF5Q29uZmlnKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb24oKTogQ29ubmVjdGVkUG9zaXRpb25bXSB7XG4gICAgbGV0IHBvc2l0aW9uO1xuXG4gICAgY29uc3QgcG9zaXRpb25Ub3AgPSB7XG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6ICdjZW50ZXInLFxuICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxuICAgICAgb2Zmc2V0WTogLXRoaXMub2Zmc2V0LFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkJvdHRvbSA9IHtcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxuICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICBvdmVybGF5WDogJ2NlbnRlcicsXG4gICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICBvZmZzZXRZOiB0aGlzLm9mZnNldCxcbiAgICB9O1xuXG4gICAgY29uc3QgcG9zaXRpb25SaWdodCA9IHtcbiAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXG4gICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgIG92ZXJsYXlZOiAnY2VudGVyJyxcbiAgICAgIG9mZnNldFg6IHRoaXMub2Zmc2V0LFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkxlZnQgPSB7XG4gICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXG4gICAgICBvdmVybGF5WDogJ2VuZCcsXG4gICAgICBvdmVybGF5WTogJ2NlbnRlcicsXG4gICAgICBvZmZzZXRYOiAtdGhpcy5vZmZzZXQsXG4gICAgfTtcblxuICAgIHN3aXRjaCAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uVG9wLCBwb3NpdGlvbkJvdHRvbV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25Cb3R0b20sIHBvc2l0aW9uVG9wXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25MZWZ0LCBwb3NpdGlvblJpZ2h0XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uUmlnaHQsIHBvc2l0aW9uTGVmdF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGlkZVRpbWVvdXQgfHwgdGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9oaWRlVGltZW91dCk7XG4gICAgICB0aGlzLl9oaWRlVGltZW91dCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xuXG4gICAgdGhpcy5fc2hvd1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHRvb2x0aXBQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKE1kYlRvb2x0aXBDb21wb25lbnQpO1xuXG4gICAgICB0aGlzLnRvb2x0aXBTaG93LmVtaXQodGhpcyk7XG4gICAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcblxuICAgICAgdGhpcy5fdG9vbHRpcFJlZiA9IHRoaXMuX292ZXJsYXlSZWYuYXR0YWNoKHRvb2x0aXBQb3J0YWwpO1xuICAgICAgdGhpcy5fdG9vbHRpcFJlZi5pbnN0YW5jZS50aXRsZSA9IHRoaXMubWRiVG9vbHRpcDtcbiAgICAgIHRoaXMuX3Rvb2x0aXBSZWYuaW5zdGFuY2UuaHRtbCA9IHRoaXMuaHRtbDtcbiAgICAgIHRoaXMuX3Rvb2x0aXBSZWYuaW5zdGFuY2UuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb247XG4gICAgICB0aGlzLl90b29sdGlwUmVmLmluc3RhbmNlLmFuaW1hdGlvblN0YXRlID0gJ3Zpc2libGUnO1xuXG4gICAgICB0aGlzLl90b29sdGlwUmVmLmluc3RhbmNlLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICB0aGlzLnRvb2x0aXBTaG93bi5lbWl0KHRoaXMpO1xuICAgIH0sIHRoaXMuZGVsYXlTaG93KTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Nob3dUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2hvd1RpbWVvdXQpO1xuICAgICAgdGhpcy5fc2hvd1RpbWVvdXQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5faGlkZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudG9vbHRpcEhpZGUuZW1pdCh0aGlzKTtcblxuICAgICAgaWYgKCF0aGlzLl90b29sdGlwUmVmKSB7XG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy50b29sdGlwSGlkZGVuLmVtaXQodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl90b29sdGlwUmVmLmluc3RhbmNlLl9oaWRkZW4ucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMudG9vbHRpcEhpZGRlbi5lbWl0KHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fdG9vbHRpcFJlZi5pbnN0YW5jZS5hbmltYXRpb25TdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLl90b29sdGlwUmVmLmluc3RhbmNlLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH0sIHRoaXMuZGVsYXlIaWRlKTtcbiAgfVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxufVxuIl19