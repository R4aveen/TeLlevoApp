import { Directive, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
const TRANSITION_TIME = 350;
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbCollapseDirective {
    _elementRef;
    _renderer;
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    collapseClass = true;
    collapseShow = new EventEmitter();
    collapseShown = new EventEmitter();
    collapseHide = new EventEmitter();
    collapseHidden = new EventEmitter();
    set collapsed(collapsed) {
        if (collapsed !== this._collapsed) {
            collapsed ? this.hide() : this.show();
            this._collapsed = collapsed;
        }
    }
    get collapsed() {
        return this._collapsed;
    }
    _collapsed = true;
    get host() {
        return this._elementRef.nativeElement;
    }
    _isTransitioning = false;
    show() {
        if (this._isTransitioning || !this.collapsed) {
            return;
        }
        this.collapseShow.emit(this);
        this._renderer.removeClass(this.host, 'collapse');
        this._renderer.addClass(this.host, 'collapsing');
        this._renderer.setStyle(this.host, 'height', '0px');
        this._isTransitioning = true;
        const scrollHeight = this.host.scrollHeight;
        fromEvent(this.host, 'transitionend')
            .pipe(take(1))
            .subscribe(() => {
            this._isTransitioning = false;
            this.collapsed = false;
            this._renderer.removeClass(this.host, 'collapsing');
            this._renderer.addClass(this.host, 'collapse');
            this._renderer.addClass(this.host, 'show');
            this._renderer.removeStyle(this.host, 'height');
            this.collapseShown.emit(this);
        });
        this._emulateTransitionEnd(this.host, TRANSITION_TIME);
        this._renderer.setStyle(this.host, 'height', `${scrollHeight}px`);
    }
    hide() {
        if (this._isTransitioning || this.collapsed) {
            return;
        }
        this.collapseHide.emit(this);
        const hostHeight = this.host.getBoundingClientRect().height;
        this._renderer.setStyle(this.host, 'height', `${hostHeight}px`);
        this._reflow(this.host);
        this._renderer.addClass(this.host, 'collapsing');
        this._renderer.removeClass(this.host, 'collapse');
        this._renderer.removeClass(this.host, 'show');
        this._isTransitioning = true;
        fromEvent(this.host, 'transitionend')
            .pipe(take(1))
            .subscribe(() => {
            this._renderer.removeClass(this.host, 'collapsing');
            this._renderer.addClass(this.host, 'collapse');
            this._isTransitioning = false;
            this.collapsed = true;
            this.collapseHidden.emit(this);
        });
        this._renderer.removeStyle(this.host, 'height');
        this._emulateTransitionEnd(this.host, TRANSITION_TIME);
    }
    toggle() {
        if (this._isTransitioning) {
            return;
        }
        this.collapsed = !this.collapsed;
        this.collapsed ? this.hide() : this.show();
    }
    _reflow(element) {
        return element.offsetHeight;
    }
    _emulateTransitionEnd(element, duration) {
        let eventEmitted = false;
        const durationPadding = 5;
        const emulatedDuration = duration + durationPadding;
        fromEvent(element, 'transitionend')
            .pipe(take(1))
            .subscribe(() => {
            eventEmitted = true;
        });
        setTimeout(() => {
            if (!eventEmitted) {
                element.dispatchEvent(new Event('transitionend'));
            }
        }, emulatedDuration);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCollapseDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbCollapseDirective, selector: "[mdbCollapse]", inputs: { collapsed: "collapsed" }, outputs: { collapseShow: "collapseShow", collapseShown: "collapseShown", collapseHide: "collapseHide", collapseHidden: "collapseHidden" }, host: { properties: { "class.collapse": "this.collapseClass" } }, exportAs: ["mdbCollapse"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCollapseDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbCollapse]',
                    exportAs: 'mdbCollapse',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { collapseClass: [{
                type: HostBinding,
                args: ['class.collapse']
            }], collapseShow: [{
                type: Output
            }], collapseShown: [{
                type: Output
            }], collapseHide: [{
                type: Output
            }], collapseHidden: [{
                type: Output
            }], collapsed: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2NvbGxhcHNlL2NvbGxhcHNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFdEMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDO0FBTzVCLGtFQUFrRTtBQUNsRSxNQUFNLE9BQU8sb0JBQW9CO0lBQ1g7SUFBaUM7SUFBckQsWUFBb0IsV0FBdUIsRUFBVSxTQUFvQjtRQUFyRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFBRyxDQUFDO0lBRTlDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFFMUMsWUFBWSxHQUF1QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3RFLGFBQWEsR0FBdUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN2RSxZQUFZLEdBQXVDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdEUsY0FBYyxHQUF1QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWxGLElBQ0ksU0FBUyxDQUFDLFNBQWtCO1FBQzlCLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFDRCxJQUFJLFNBQVM7UUFD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WSxDQUFDO0lBQzlCLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxPQUFvQixFQUFFLFFBQWdCO1FBQ2xFLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDMUIsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsZUFBZSxDQUFDO1FBRXBELFNBQVMsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDO2FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVMLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNqQixPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN2QixDQUFDO3VHQTlIVSxvQkFBb0I7MkZBQXBCLG9CQUFvQjs7MkZBQXBCLG9CQUFvQjtrQkFOaEMsU0FBUzttQkFBQztvQkFDVCw4REFBOEQ7b0JBQzlELFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsYUFBYTtpQkFDeEI7eUhBS2dDLGFBQWE7c0JBQTNDLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQUVuQixZQUFZO3NCQUFyQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNO2dCQUdILFNBQVM7c0JBRFosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgVFJBTlNJVElPTl9USU1FID0gMzUwO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiQ29sbGFwc2VdJyxcbiAgZXhwb3J0QXM6ICdtZGJDb2xsYXBzZScsXG59KVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTWRiQ29sbGFwc2VEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29sbGFwc2UnKSBjb2xsYXBzZUNsYXNzID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgY29sbGFwc2VTaG93OiBFdmVudEVtaXR0ZXI8TWRiQ29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29sbGFwc2VTaG93bjogRXZlbnRFbWl0dGVyPE1kYkNvbGxhcHNlRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbGxhcHNlSGlkZTogRXZlbnRFbWl0dGVyPE1kYkNvbGxhcHNlRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbGxhcHNlSGlkZGVuOiBFdmVudEVtaXR0ZXI8TWRiQ29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgaWYgKGNvbGxhcHNlZCAhPT0gdGhpcy5fY29sbGFwc2VkKSB7XG4gICAgICBjb2xsYXBzZWQgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xuICAgICAgdGhpcy5fY29sbGFwc2VkID0gY29sbGFwc2VkO1xuICAgIH1cbiAgfVxuICBnZXQgY29sbGFwc2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWQ7XG4gIH1cbiAgcHJpdmF0ZSBfY29sbGFwc2VkID0gdHJ1ZTtcblxuICBnZXQgaG9zdCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuXG4gIHNob3coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCAhdGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbGxhcHNlU2hvdy5lbWl0KHRoaXMpO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0LCAnY29sbGFwc2UnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QsICdjb2xsYXBzaW5nJyk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdoZWlnaHQnLCAnMHB4Jyk7XG5cbiAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5ob3N0LnNjcm9sbEhlaWdodDtcblxuICAgIGZyb21FdmVudCh0aGlzLmhvc3QsICd0cmFuc2l0aW9uZW5kJylcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaG9zdCwgJ2NvbGxhcHNpbmcnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0LCAnY29sbGFwc2UnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0LCAnc2hvdycpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuaG9zdCwgJ2hlaWdodCcpO1xuXG4gICAgICAgIHRoaXMuY29sbGFwc2VTaG93bi5lbWl0KHRoaXMpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9lbXVsYXRlVHJhbnNpdGlvbkVuZCh0aGlzLmhvc3QsIFRSQU5TSVRJT05fVElNRSk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdoZWlnaHQnLCBgJHtzY3JvbGxIZWlnaHR9cHhgKTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCB0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29sbGFwc2VIaWRlLmVtaXQodGhpcyk7XG5cbiAgICBjb25zdCBob3N0SGVpZ2h0ID0gdGhpcy5ob3N0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2hlaWdodCcsIGAke2hvc3RIZWlnaHR9cHhgKTtcblxuICAgIHRoaXMuX3JlZmxvdyh0aGlzLmhvc3QpO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0LCAnY29sbGFwc2luZycpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaG9zdCwgJ2NvbGxhcHNlJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0LCAnc2hvdycpO1xuXG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZTtcblxuICAgIGZyb21FdmVudCh0aGlzLmhvc3QsICd0cmFuc2l0aW9uZW5kJylcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0LCAnY29sbGFwc2luZycpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QsICdjb2xsYXBzZScpO1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY29sbGFwc2VIaWRkZW4uZW1pdCh0aGlzKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5ob3N0LCAnaGVpZ2h0Jyk7XG4gICAgdGhpcy5fZW11bGF0ZVRyYW5zaXRpb25FbmQodGhpcy5ob3N0LCBUUkFOU0lUSU9OX1RJTUUpO1xuICB9XG5cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcbiAgICB0aGlzLmNvbGxhcHNlZCA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWZsb3coZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgX2VtdWxhdGVUcmFuc2l0aW9uRW5kKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IGV2ZW50RW1pdHRlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGR1cmF0aW9uUGFkZGluZyA9IDU7XG4gICAgY29uc3QgZW11bGF0ZWREdXJhdGlvbiA9IGR1cmF0aW9uICsgZHVyYXRpb25QYWRkaW5nO1xuXG4gICAgZnJvbUV2ZW50KGVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJylcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgZXZlbnRFbWl0dGVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIWV2ZW50RW1pdHRlZCkge1xuICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCd0cmFuc2l0aW9uZW5kJykpO1xuICAgICAgfVxuICAgIH0sIGVtdWxhdGVkRHVyYXRpb24pO1xuICB9XG59XG4iXX0=