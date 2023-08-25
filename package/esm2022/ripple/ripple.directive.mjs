import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { colorToRGB, durationToMsNumber, getDiameter } from './ripple-utils';
import * as i0 from "@angular/core";
const TRANSITION_BREAK_OPACITY = 0.5;
const GRADIENT = 'rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%';
const BOOTSTRAP_COLORS = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
];
export class MdbRippleDirective {
    _elementRef;
    _renderer;
    get rippleCentered() {
        return this._rippleCentered;
    }
    set rippleCentered(value) {
        this._rippleCentered = coerceBooleanProperty(value);
    }
    _rippleCentered = false;
    rippleColor = '';
    rippleDuration = '500ms';
    rippleRadius = 0;
    get rippleUnbound() {
        return this._rippleUnbound;
    }
    set rippleUnbound(value) {
        this._rippleUnbound = coerceBooleanProperty(value);
    }
    _rippleUnbound = false;
    _rippleInSpan = false;
    _rippleTimer = null;
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    ripple = true;
    _createRipple(event) {
        const { layerX, layerY } = event;
        const offsetX = layerX;
        const offsetY = layerY;
        const height = this.host.offsetHeight;
        const width = this.host.offsetWidth;
        const duration = durationToMsNumber(this.rippleDuration);
        const diameterOptions = {
            offsetX: this.rippleCentered ? height / 2 : offsetX,
            offsetY: this.rippleCentered ? width / 2 : offsetY,
            height,
            width,
        };
        const diameter = getDiameter(diameterOptions);
        const radiusValue = this.rippleRadius || diameter / 2;
        const opacity = {
            delay: duration * TRANSITION_BREAK_OPACITY,
            duration: duration - duration * TRANSITION_BREAK_OPACITY,
        };
        const styles = {
            left: this.rippleCentered ? `${width / 2 - radiusValue}px` : `${offsetX - radiusValue}px`,
            top: this.rippleCentered ? `${height / 2 - radiusValue}px` : `${offsetY - radiusValue}px`,
            height: `${this.rippleRadius * 2 || diameter}px`,
            width: `${this.rippleRadius * 2 || diameter}px`,
            transitionDelay: `0s, ${opacity.delay}ms`,
            transitionDuration: `${duration}ms, ${opacity.duration}ms`,
        };
        const rippleHTML = this._renderer.createElement('div');
        if (this.host.tagName.toLowerCase() === 'input') {
            this._createWrapperSpan();
        }
        this._createHTMLRipple(this.host, rippleHTML, styles);
        this._removeHTMLRipple(rippleHTML, duration);
    }
    _createWrapperSpan() {
        const parent = this._renderer.parentNode(this.host);
        this._rippleInSpan = true;
        if (parent.tagName.toLowerCase() === 'span' && parent.classList.contains('ripple-surface')) {
            this._elementRef.nativeElement = parent;
        }
        else {
            const wrapper = this._renderer.createElement('span');
            this._renderer.addClass(wrapper, 'ripple-surface');
            this._renderer.addClass(wrapper, 'input-wrapper');
            this._renderer.setStyle(wrapper, 'border', 0);
            const shadow = getComputedStyle(this.host).boxShadow;
            this._renderer.setStyle(wrapper, 'box-shadow', shadow);
            // Put element as child
            parent.replaceChild(wrapper, this.host);
            wrapper.appendChild(this.host);
            this._elementRef.nativeElement = wrapper;
        }
        this.host.focus();
    }
    _removeWrapperSpan() {
        const child = this.host.firstChild;
        this.host.replaceWith(child);
        this._elementRef.nativeElement = child;
        this.host.focus();
        this._rippleInSpan = false;
    }
    _createHTMLRipple(wrapper, ripple, styles) {
        Object.keys(styles).forEach((property) => (ripple.style[property] = styles[property]));
        this._renderer.addClass(ripple, 'ripple-wave');
        if (this.rippleColor !== '') {
            this._removeOldColorClasses(wrapper);
            this._addColor(ripple, wrapper);
        }
        this._toggleUnbound(wrapper);
        this._appendRipple(ripple, wrapper);
    }
    _removeHTMLRipple(ripple, duration) {
        if (this._rippleTimer) {
            clearTimeout(this._rippleTimer);
            this._rippleTimer = null;
        }
        this._rippleTimer = setTimeout(() => {
            if (ripple) {
                ripple.remove();
                this.host.querySelectorAll('.ripple-wave').forEach((rippleEl) => {
                    rippleEl.remove();
                });
                if (this._rippleInSpan && this.host.classList.contains('input-wrapper')) {
                    this._removeWrapperSpan();
                }
            }
        }, duration);
    }
    _appendRipple(target, parent) {
        const FIX_ADD_RIPPLE_EFFECT = 50; // delay for active animations
        this._renderer.appendChild(parent, target);
        setTimeout(() => {
            this._renderer.addClass(target, 'active');
        }, FIX_ADD_RIPPLE_EFFECT);
    }
    _toggleUnbound(target) {
        if (this.rippleUnbound) {
            this._renderer.addClass(target, 'ripple-surface-unbound');
        }
        else {
            this._renderer.removeClass(target, 'ripple-surface-unbound');
        }
    }
    _addColor(target, parent) {
        const isBootstrapColor = BOOTSTRAP_COLORS.find((color) => color === this.rippleColor.toLowerCase());
        if (isBootstrapColor) {
            this._renderer.addClass(parent, `${'ripple-surface'}-${this.rippleColor.toLowerCase()}`);
        }
        else {
            const rgbValue = colorToRGB(this.rippleColor).join(',');
            const gradientImage = GRADIENT.split('{{color}}').join(`${rgbValue}`);
            target.style.backgroundImage = `radial-gradient(circle, ${gradientImage})`;
        }
    }
    _removeOldColorClasses(target) {
        const REGEXP_CLASS_COLOR = new RegExp(`${'ripple-surface'}-[a-z]+`, 'gi');
        const PARENT_CLASSS_COLOR = target.classList.value.match(REGEXP_CLASS_COLOR) || [];
        PARENT_CLASSS_COLOR.forEach((className) => {
            this._renderer.removeClass(target, className);
        });
    }
    static ngAcceptInputType_rippleCentered;
    static ngAcceptInputType_rippleUnbound;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbRippleDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbRippleDirective, selector: "[mdbRipple]", inputs: { rippleCentered: "rippleCentered", rippleColor: "rippleColor", rippleDuration: "rippleDuration", rippleRadius: "rippleRadius", rippleUnbound: "rippleUnbound" }, host: { listeners: { "click": "_createRipple($event)" }, properties: { "class.ripple-surface": "this.ripple" } }, exportAs: ["mdbRipple"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbRippleDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbRipple]',
                    exportAs: 'mdbRipple',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { rippleCentered: [{
                type: Input
            }], rippleColor: [{
                type: Input
            }], rippleDuration: [{
                type: Input
            }], rippleRadius: [{
                type: Input
            }], rippleUnbound: [{
                type: Input
            }], ripple: [{
                type: HostBinding,
                args: ['class.ripple-surface']
            }], _createRipple: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9yaXBwbGUvcmlwcGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUU3RSxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQztBQUVyQyxNQUFNLFFBQVEsR0FDWiw4SEFBOEgsQ0FBQztBQUNqSSxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLFNBQVM7SUFDVCxXQUFXO0lBQ1gsU0FBUztJQUNULFFBQVE7SUFDUixTQUFTO0lBQ1QsTUFBTTtJQUNOLE9BQU87SUFDUCxNQUFNO0NBQ1AsQ0FBQztBQU9GLE1BQU0sT0FBTyxrQkFBa0I7SUEyQlQ7SUFBaUM7SUExQnJELElBQ0ksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQUksY0FBYyxDQUFDLEtBQWM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ08sZUFBZSxHQUFHLEtBQUssQ0FBQztJQUV2QixXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLGNBQWMsR0FBRyxPQUFPLENBQUM7SUFDekIsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUUxQixJQUNJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksYUFBYSxDQUFDLEtBQWM7UUFDOUIsSUFB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Q0FBZ0MsQ0FBZTtJQUN0RCxNQUFNLENBQUMsK0JBQStCLENBQWU7dUdBbEwxQyxrQkFBa0I7MkZBQWxCLGtCQUFrQjs7MkZBQWxCLGtCQUFrQjtrQkFMOUIsU0FBUzttQkFBQztvQkFDVCw4REFBOEQ7b0JBQzlELFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsV0FBVztpQkFDdEI7eUhBR0ssY0FBYztzQkFEakIsS0FBSztnQkFTRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFHRixhQUFhO3NCQURoQixLQUFLO2dCQW1CK0IsTUFBTTtzQkFBMUMsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBR25DLGFBQWE7c0JBRFosWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbG9yVG9SR0IsIGR1cmF0aW9uVG9Nc051bWJlciwgZ2V0RGlhbWV0ZXIgfSBmcm9tICcuL3JpcHBsZS11dGlscyc7XG5cbmNvbnN0IFRSQU5TSVRJT05fQlJFQUtfT1BBQ0lUWSA9IDAuNTtcblxuY29uc3QgR1JBRElFTlQgPVxuICAncmdiYSh7e2NvbG9yfX0sIDAuMikgMCwgcmdiYSh7e2NvbG9yfX0sIDAuMykgNDAlLCByZ2JhKHt7Y29sb3J9fSwgMC40KSA1MCUsIHJnYmEoe3tjb2xvcn19LCAwLjUpIDYwJSwgcmdiYSh7e2NvbG9yfX0sIDApIDcwJSc7XG5jb25zdCBCT09UU1RSQVBfQ09MT1JTID0gW1xuICAncHJpbWFyeScsXG4gICdzZWNvbmRhcnknLFxuICAnc3VjY2VzcycsXG4gICdkYW5nZXInLFxuICAnd2FybmluZycsXG4gICdpbmZvJyxcbiAgJ2xpZ2h0JyxcbiAgJ2RhcmsnLFxuXTtcblxuQERpcmVjdGl2ZSh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYlJpcHBsZV0nLFxuICBleHBvcnRBczogJ21kYlJpcHBsZScsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlJpcHBsZURpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpXG4gIGdldCByaXBwbGVDZW50ZXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmlwcGxlQ2VudGVyZWQ7XG4gIH1cbiAgc2V0IHJpcHBsZUNlbnRlcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmlwcGxlQ2VudGVyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3JpcHBsZUNlbnRlcmVkID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcmlwcGxlQ29sb3IgPSAnJztcbiAgQElucHV0KCkgcmlwcGxlRHVyYXRpb24gPSAnNTAwbXMnO1xuICBASW5wdXQoKSByaXBwbGVSYWRpdXMgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIGdldCByaXBwbGVVbmJvdW5kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yaXBwbGVVbmJvdW5kO1xuICB9XG4gIHNldCByaXBwbGVVbmJvdW5kKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmlwcGxlVW5ib3VuZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfcmlwcGxlVW5ib3VuZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3JpcHBsZUluU3BhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3JpcHBsZVRpbWVyID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIGdldCBob3N0KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5yaXBwbGUtc3VyZmFjZScpIHJpcHBsZSA9IHRydWU7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBfY3JlYXRlUmlwcGxlKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB7IGxheWVyWCwgbGF5ZXJZIH0gPSBldmVudDtcbiAgICBjb25zdCBvZmZzZXRYID0gbGF5ZXJYO1xuICAgIGNvbnN0IG9mZnNldFkgPSBsYXllclk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5ob3N0Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuaG9zdC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBkdXJhdGlvbiA9IGR1cmF0aW9uVG9Nc051bWJlcih0aGlzLnJpcHBsZUR1cmF0aW9uKTtcbiAgICBjb25zdCBkaWFtZXRlck9wdGlvbnMgPSB7XG4gICAgICBvZmZzZXRYOiB0aGlzLnJpcHBsZUNlbnRlcmVkID8gaGVpZ2h0IC8gMiA6IG9mZnNldFgsXG4gICAgICBvZmZzZXRZOiB0aGlzLnJpcHBsZUNlbnRlcmVkID8gd2lkdGggLyAyIDogb2Zmc2V0WSxcbiAgICAgIGhlaWdodCxcbiAgICAgIHdpZHRoLFxuICAgIH07XG4gICAgY29uc3QgZGlhbWV0ZXIgPSBnZXREaWFtZXRlcihkaWFtZXRlck9wdGlvbnMpO1xuICAgIGNvbnN0IHJhZGl1c1ZhbHVlID0gdGhpcy5yaXBwbGVSYWRpdXMgfHwgZGlhbWV0ZXIgLyAyO1xuXG4gICAgY29uc3Qgb3BhY2l0eSA9IHtcbiAgICAgIGRlbGF5OiBkdXJhdGlvbiAqIFRSQU5TSVRJT05fQlJFQUtfT1BBQ0lUWSxcbiAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbiAtIGR1cmF0aW9uICogVFJBTlNJVElPTl9CUkVBS19PUEFDSVRZLFxuICAgIH07XG5cbiAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICBsZWZ0OiB0aGlzLnJpcHBsZUNlbnRlcmVkID8gYCR7d2lkdGggLyAyIC0gcmFkaXVzVmFsdWV9cHhgIDogYCR7b2Zmc2V0WCAtIHJhZGl1c1ZhbHVlfXB4YCxcbiAgICAgIHRvcDogdGhpcy5yaXBwbGVDZW50ZXJlZCA/IGAke2hlaWdodCAvIDIgLSByYWRpdXNWYWx1ZX1weGAgOiBgJHtvZmZzZXRZIC0gcmFkaXVzVmFsdWV9cHhgLFxuICAgICAgaGVpZ2h0OiBgJHt0aGlzLnJpcHBsZVJhZGl1cyAqIDIgfHwgZGlhbWV0ZXJ9cHhgLFxuICAgICAgd2lkdGg6IGAke3RoaXMucmlwcGxlUmFkaXVzICogMiB8fCBkaWFtZXRlcn1weGAsXG4gICAgICB0cmFuc2l0aW9uRGVsYXk6IGAwcywgJHtvcGFjaXR5LmRlbGF5fW1zYCxcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogYCR7ZHVyYXRpb259bXMsICR7b3BhY2l0eS5kdXJhdGlvbn1tc2AsXG4gICAgfTtcblxuICAgIGNvbnN0IHJpcHBsZUhUTUwgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGlmICh0aGlzLmhvc3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICB0aGlzLl9jcmVhdGVXcmFwcGVyU3BhbigpO1xuICAgIH1cblxuICAgIHRoaXMuX2NyZWF0ZUhUTUxSaXBwbGUodGhpcy5ob3N0LCByaXBwbGVIVE1MLCBzdHlsZXMpO1xuICAgIHRoaXMuX3JlbW92ZUhUTUxSaXBwbGUocmlwcGxlSFRNTCwgZHVyYXRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlV3JhcHBlclNwYW4oKTogdm9pZCB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5fcmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmhvc3QpO1xuICAgIHRoaXMuX3JpcHBsZUluU3BhbiA9IHRydWU7XG4gICAgaWYgKHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzcGFuJyAmJiBwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyaXBwbGUtc3VyZmFjZScpKSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgPSBwYXJlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHdyYXBwZXIsICdyaXBwbGUtc3VyZmFjZScpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3Mod3JhcHBlciwgJ2lucHV0LXdyYXBwZXInKTtcblxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ2JvcmRlcicsIDApO1xuXG4gICAgICBjb25zdCBzaGFkb3cgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuaG9zdCkuYm94U2hhZG93O1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUod3JhcHBlciwgJ2JveC1zaGFkb3cnLCBzaGFkb3cpO1xuXG4gICAgICAvLyBQdXQgZWxlbWVudCBhcyBjaGlsZFxuICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh3cmFwcGVyLCB0aGlzLmhvc3QpO1xuICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmhvc3QpO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ID0gd3JhcHBlcjtcbiAgICB9XG4gICAgdGhpcy5ob3N0LmZvY3VzKCk7XG4gIH1cblxuICBfcmVtb3ZlV3JhcHBlclNwYW4oKSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLmhvc3QuZmlyc3RDaGlsZDtcbiAgICB0aGlzLmhvc3QucmVwbGFjZVdpdGgoY2hpbGQpO1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA9IGNoaWxkO1xuICAgIHRoaXMuaG9zdC5mb2N1cygpO1xuICAgIHRoaXMuX3JpcHBsZUluU3BhbiA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSFRNTFJpcHBsZSh3cmFwcGVyOiBIVE1MRWxlbWVudCwgcmlwcGxlOiBIVE1MRWxlbWVudCwgc3R5bGVzOiBhbnkpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goKHByb3BlcnR5KSA9PiAocmlwcGxlLnN0eWxlW3Byb3BlcnR5XSA9IHN0eWxlc1twcm9wZXJ0eV0pKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhyaXBwbGUsICdyaXBwbGUtd2F2ZScpO1xuXG4gICAgaWYgKHRoaXMucmlwcGxlQ29sb3IgIT09ICcnKSB7XG4gICAgICB0aGlzLl9yZW1vdmVPbGRDb2xvckNsYXNzZXMod3JhcHBlcik7XG4gICAgICB0aGlzLl9hZGRDb2xvcihyaXBwbGUsIHdyYXBwZXIpO1xuICAgIH1cblxuICAgIHRoaXMuX3RvZ2dsZVVuYm91bmQod3JhcHBlcik7XG4gICAgdGhpcy5fYXBwZW5kUmlwcGxlKHJpcHBsZSwgd3JhcHBlcik7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVIVE1MUmlwcGxlKHJpcHBsZTogSFRNTEVsZW1lbnQsIGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmlwcGxlVGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yaXBwbGVUaW1lcik7XG4gICAgICB0aGlzLl9yaXBwbGVUaW1lciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3JpcHBsZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAocmlwcGxlKSB7XG4gICAgICAgIHJpcHBsZS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5ob3N0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaXBwbGUtd2F2ZScpLmZvckVhY2goKHJpcHBsZUVsKSA9PiB7XG4gICAgICAgICAgcmlwcGxlRWwucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5fcmlwcGxlSW5TcGFuICYmIHRoaXMuaG9zdC5jbGFzc0xpc3QuY29udGFpbnMoJ2lucHV0LXdyYXBwZXInKSkge1xuICAgICAgICAgIHRoaXMuX3JlbW92ZVdyYXBwZXJTcGFuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBkdXJhdGlvbik7XG4gIH1cblxuICBfYXBwZW5kUmlwcGxlKHRhcmdldDogSFRNTEVsZW1lbnQsIHBhcmVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBGSVhfQUREX1JJUFBMRV9FRkZFQ1QgPSA1MDsgLy8gZGVsYXkgZm9yIGFjdGl2ZSBhbmltYXRpb25zXG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50LCB0YXJnZXQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGFyZ2V0LCAnYWN0aXZlJyk7XG4gICAgfSwgRklYX0FERF9SSVBQTEVfRUZGRUNUKTtcbiAgfVxuXG4gIF90b2dnbGVVbmJvdW5kKHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yaXBwbGVVbmJvdW5kKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0YXJnZXQsICdyaXBwbGUtc3VyZmFjZS11bmJvdW5kJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3JpcHBsZS1zdXJmYWNlLXVuYm91bmQnKTtcbiAgICB9XG4gIH1cblxuICBfYWRkQ29sb3IodGFyZ2V0OiBIVE1MRWxlbWVudCwgcGFyZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlzQm9vdHN0cmFwQ29sb3IgPSBCT09UU1RSQVBfQ09MT1JTLmZpbmQoXG4gICAgICAoY29sb3IpID0+IGNvbG9yID09PSB0aGlzLnJpcHBsZUNvbG9yLnRvTG93ZXJDYXNlKClcbiAgICApO1xuXG4gICAgaWYgKGlzQm9vdHN0cmFwQ29sb3IpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHBhcmVudCwgYCR7J3JpcHBsZS1zdXJmYWNlJ30tJHt0aGlzLnJpcHBsZUNvbG9yLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJnYlZhbHVlID0gY29sb3JUb1JHQih0aGlzLnJpcHBsZUNvbG9yKS5qb2luKCcsJyk7XG4gICAgICBjb25zdCBncmFkaWVudEltYWdlID0gR1JBRElFTlQuc3BsaXQoJ3t7Y29sb3J9fScpLmpvaW4oYCR7cmdiVmFsdWV9YCk7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHJhZGlhbC1ncmFkaWVudChjaXJjbGUsICR7Z3JhZGllbnRJbWFnZX0pYDtcbiAgICB9XG4gIH1cblxuICBfcmVtb3ZlT2xkQ29sb3JDbGFzc2VzKHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBSRUdFWFBfQ0xBU1NfQ09MT1IgPSBuZXcgUmVnRXhwKGAkeydyaXBwbGUtc3VyZmFjZSd9LVthLXpdK2AsICdnaScpO1xuICAgIGNvbnN0IFBBUkVOVF9DTEFTU1NfQ09MT1IgPSB0YXJnZXQuY2xhc3NMaXN0LnZhbHVlLm1hdGNoKFJFR0VYUF9DTEFTU19DT0xPUikgfHwgW107XG4gICAgUEFSRU5UX0NMQVNTU19DT0xPUi5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRhcmdldCwgY2xhc3NOYW1lKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yaXBwbGVDZW50ZXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmlwcGxlVW5ib3VuZDogQm9vbGVhbklucHV0O1xufVxuIl19