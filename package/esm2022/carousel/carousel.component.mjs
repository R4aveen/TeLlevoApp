import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MdbCarouselItemComponent } from './carousel-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export var Direction;
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(Direction || (Direction = {}));
export class MdbCarouselComponent {
    _elementRef;
    _cdRef;
    _items;
    get items() {
        return this._items && this._items.toArray();
    }
    animation = 'slide';
    get controls() {
        return this._controls;
    }
    set controls(value) {
        this._controls = coerceBooleanProperty(value);
    }
    _controls = false;
    get dark() {
        return this._dark;
    }
    set dark(value) {
        this._dark = coerceBooleanProperty(value);
    }
    _dark = false;
    get indicators() {
        return this._indicators;
    }
    set indicators(value) {
        this._indicators = coerceBooleanProperty(value);
    }
    _indicators = false;
    get ride() {
        return this._ride;
    }
    set ride(value) {
        this._ride = coerceBooleanProperty(value);
    }
    _ride = true;
    get interval() {
        return this._interval;
    }
    set interval(value) {
        this._interval = value;
        if (this.items) {
            this._restartInterval();
        }
    }
    _interval = 5000;
    keyboard = true;
    pause = true;
    wrap = true;
    slide = new EventEmitter();
    slideChange = new EventEmitter();
    get activeSlide() {
        return this._activeSlide;
    }
    set activeSlide(index) {
        if (this.items.length && this._activeSlide !== index) {
            this._activeSlide = index;
            this._restartInterval();
        }
    }
    _activeSlide = 0;
    _lastInterval;
    _isPlaying = false;
    _isSliding = false;
    _destroy$ = new Subject();
    onMouseEnter() {
        if (this.pause && this._isPlaying) {
            this.stop();
        }
    }
    onMouseLeave() {
        if (this.pause && !this._isPlaying) {
            this.play();
        }
    }
    display = true;
    constructor(_elementRef, _cdRef) {
        this._elementRef = _elementRef;
        this._cdRef = _cdRef;
    }
    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this._setActiveSlide(this._activeSlide);
            if (this.interval > 0 && this.ride) {
                this.play();
            }
            this._cdRef.markForCheck();
        });
        if (this.keyboard) {
            fromEvent(this._elementRef.nativeElement, 'keydown')
                .pipe(takeUntil(this._destroy$))
                .subscribe((event) => {
                if (event.key === 'ArrowRight') {
                    this.next();
                }
                else if (event.key === 'ArrowLeft') {
                    this.prev();
                }
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    _setActiveSlide(index) {
        const currentSlide = this.items[this._activeSlide];
        currentSlide.active = false;
        const newSlide = this.items[index];
        newSlide.active = true;
        this._activeSlide = index;
    }
    _restartInterval() {
        this._resetInterval();
        const activeElement = this.items[this.activeSlide];
        const interval = activeElement.interval ? activeElement.interval : this.interval;
        if (!isNaN(interval) && interval > 0) {
            this._lastInterval = setInterval(() => {
                const nInterval = +interval;
                if (this._isPlaying && !isNaN(nInterval) && nInterval > 0) {
                    this.next();
                    this._cdRef.markForCheck();
                }
                else {
                    this.stop();
                }
            }, interval);
        }
    }
    _resetInterval() {
        if (this._lastInterval) {
            clearInterval(this._lastInterval);
            this._lastInterval = null;
        }
    }
    play() {
        if (!this._isPlaying) {
            this._isPlaying = true;
            this._restartInterval();
        }
    }
    stop() {
        if (this._isPlaying) {
            this._isPlaying = false;
            this._resetInterval();
        }
    }
    to(index) {
        if (index > this.items.length - 1 || index < 0) {
            return;
        }
        if (this.activeSlide === index) {
            this.stop();
            this.play();
            return;
        }
        const direction = index > this.activeSlide ? Direction.NEXT : Direction.PREV;
        this._animateSlides(direction, this.activeSlide, index);
        this.activeSlide = index;
    }
    next() {
        if (!this._isSliding) {
            this._slide(Direction.NEXT);
        }
    }
    prev() {
        if (!this._isSliding) {
            this._slide(Direction.PREV);
        }
    }
    _slide(direction) {
        const isFirst = this._activeSlide === 0;
        const isLast = this._activeSlide === this.items.length - 1;
        if (!this.wrap) {
            if ((direction === Direction.NEXT && isLast) || (direction === Direction.PREV && isFirst)) {
                return;
            }
        }
        const newSlideIndex = this._getNewSlideIndex(direction);
        this._animateSlides(direction, this.activeSlide, newSlideIndex);
        this.activeSlide = newSlideIndex;
        this.slide.emit();
    }
    _animateSlides(direction, currentIndex, nextIndex) {
        const currentItem = this.items[currentIndex];
        const nextItem = this.items[nextIndex];
        const currentEl = currentItem.host;
        const nextEl = nextItem.host;
        this._isSliding = true;
        if (this._isPlaying) {
            this.stop();
        }
        if (direction === Direction.NEXT) {
            nextItem.next = true;
            setTimeout(() => {
                this._reflow(nextEl);
                currentItem.start = true;
                nextItem.start = true;
                this._cdRef.markForCheck();
            }, 0);
            const transitionDuration = 600;
            fromEvent(currentEl, 'transitionend')
                .pipe(take(1))
                .subscribe(() => {
                nextItem.next = false;
                nextItem.start = false;
                nextItem.active = true;
                currentItem.active = false;
                currentItem.start = false;
                currentItem.next = false;
                this.slideChange.emit();
                this._isSliding = false;
            });
            this._emulateTransitionEnd(currentEl, transitionDuration);
        }
        else if (direction === Direction.PREV) {
            nextItem.prev = true;
            setTimeout(() => {
                this._reflow(nextEl);
                currentItem.end = true;
                nextItem.end = true;
                this._cdRef.markForCheck();
            }, 0);
            const transitionDuration = 600;
            fromEvent(currentEl, 'transitionend')
                .pipe(take(1))
                .subscribe(() => {
                nextItem.prev = false;
                nextItem.end = false;
                nextItem.active = true;
                currentItem.active = false;
                currentItem.end = false;
                currentItem.prev = false;
                this.slideChange.emit();
                this._isSliding = false;
            });
            this._emulateTransitionEnd(currentEl, transitionDuration);
        }
        if (!this._isPlaying && this.interval > 0) {
            this.play();
        }
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
    _getNewSlideIndex(direction) {
        let newSlideIndex;
        if (direction === Direction.NEXT) {
            newSlideIndex = this._getNextSlideIndex();
        }
        if (direction === Direction.PREV) {
            newSlideIndex = this._getPrevSlideIndex();
        }
        return newSlideIndex;
    }
    _getNextSlideIndex() {
        const isLast = this._activeSlide === this.items.length - 1;
        if (!isLast) {
            return this._activeSlide + 1;
        }
        else if (this.wrap && isLast) {
            return 0;
        }
        else {
            return this._activeSlide;
        }
    }
    _getPrevSlideIndex() {
        const isFirst = this._activeSlide === 0;
        if (!isFirst) {
            return this._activeSlide - 1;
        }
        else if (this.wrap && isFirst) {
            return this.items.length - 1;
        }
        else {
            return this._activeSlide;
        }
    }
    static ngAcceptInputType_controls;
    static ngAcceptInputType_dark;
    static ngAcceptInputType_indicators;
    static ngAcceptInputType_ride;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCarouselComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbCarouselComponent, selector: "mdb-carousel", inputs: { animation: "animation", controls: "controls", dark: "dark", indicators: "indicators", ride: "ride", interval: "interval", keyboard: "keyboard", pause: "pause", wrap: "wrap" }, outputs: { slide: "slide", slideChange: "slideChange" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" }, properties: { "class.d-block": "this.display" } }, queries: [{ propertyName: "_items", predicate: MdbCarouselItemComponent }], ngImport: i0, template: "<div\n  class=\"carousel slide\"\n  [class.carousel-fade]=\"animation === 'fade'\"\n  [class.carousel-dark]=\"dark\"\n>\n  <div class=\"carousel-indicators\" *ngIf=\"indicators\">\n    <button\n      *ngFor=\"let item of items; let i = index\"\n      type=\"button\"\n      [class.active]=\"i === activeSlide\"\n      [attr.aria-current]=\"i === activeSlide\"\n      (click)=\"to(i)\"\n    ></button>\n  </div>\n\n  <div class=\"carousel-inner\">\n    <ng-content></ng-content>\n  </div>\n\n  <button *ngIf=\"controls\" class=\"carousel-control-prev\" type=\"button\" (click)=\"prev()\">\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Previous</span>\n  </button>\n  <button *ngIf=\"controls\" class=\"carousel-control-next\" type=\"button\" (click)=\"next()\">\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Next</span>\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCarouselComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-carousel', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"carousel slide\"\n  [class.carousel-fade]=\"animation === 'fade'\"\n  [class.carousel-dark]=\"dark\"\n>\n  <div class=\"carousel-indicators\" *ngIf=\"indicators\">\n    <button\n      *ngFor=\"let item of items; let i = index\"\n      type=\"button\"\n      [class.active]=\"i === activeSlide\"\n      [attr.aria-current]=\"i === activeSlide\"\n      (click)=\"to(i)\"\n    ></button>\n  </div>\n\n  <div class=\"carousel-inner\">\n    <ng-content></ng-content>\n  </div>\n\n  <button *ngIf=\"controls\" class=\"carousel-control-prev\" type=\"button\" (click)=\"prev()\">\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Previous</span>\n  </button>\n  <button *ngIf=\"controls\" class=\"carousel-control-next\" type=\"button\" (click)=\"next()\">\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Next</span>\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _items: [{
                type: ContentChildren,
                args: [MdbCarouselItemComponent]
            }], animation: [{
                type: Input
            }], controls: [{
                type: Input
            }], dark: [{
                type: Input
            }], indicators: [{
                type: Input
            }], ride: [{
                type: Input
            }], interval: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], pause: [{
                type: Input
            }], wrap: [{
                type: Input
            }], slide: [{
                type: Output
            }], slideChange: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], display: [{
                type: HostBinding,
                args: ['class.d-block']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBRXJFLE1BQU0sQ0FBTixJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDbkIsK0NBQU8sQ0FBQTtJQUNQLHlDQUFJLENBQUE7SUFDSix5Q0FBSSxDQUFBO0FBQ04sQ0FBQyxFQUpXLFNBQVMsS0FBVCxTQUFTLFFBSXBCO0FBT0QsTUFBTSxPQUFPLG9CQUFvQjtJQWtHWDtJQUFpQztJQWpHVixNQUFNLENBQXNDO0lBQ3ZGLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFUSxTQUFTLEdBQXFCLE9BQU8sQ0FBQztJQUUvQyxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIs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QUV4QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUM5QjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsMEJBQTBCLENBQWU7SUFDaEQsTUFBTSxDQUFDLHNCQUFzQixDQUFlO0lBQzVDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBZTtJQUNsRCxNQUFNLENBQUMsc0JBQXNCLENBQWU7dUdBeldqQyxvQkFBb0I7MkZBQXBCLG9CQUFvQix3Y0FDZCx3QkFBd0IsNkJDaEMzQyxtOUJBNEJBOzsyRkRHYSxvQkFBb0I7a0JBTGhDLFNBQVM7K0JBQ0UsY0FBYyxtQkFFUCx1QkFBdUIsQ0FBQyxNQUFNO2lJQUdKLE1BQU07c0JBQWhELGVBQWU7dUJBQUMsd0JBQXdCO2dCQUtoQyxTQUFTO3NCQUFqQixLQUFLO2dCQUdGLFFBQVE7c0JBRFgsS0FBSztnQkFVRixJQUFJO3NCQURQLEtBQUs7Z0JBVUYsVUFBVTtzQkFEYixLQUFLO2dCQVVGLElBQUk7c0JBRFAsS0FBSztnQkFVRixRQUFRO3NCQURYLEtBQUs7Z0JBYUcsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUVJLEtBQUs7c0JBQWQsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQXFCUCxZQUFZO3NCQURYLFlBQVk7dUJBQUMsWUFBWTtnQkFRMUIsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVk7Z0JBT0ksT0FBTztzQkFBcEMsV0FBVzt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1kYkNhcm91c2VsSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwtaXRlbS5jb21wb25lbnQnO1xuXG5leHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICBVTktOT1dOLFxuICBORVhULFxuICBQUkVWLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAQ29udGVudENoaWxkcmVuKE1kYkNhcm91c2VsSXRlbUNvbXBvbmVudCkgX2l0ZW1zOiBRdWVyeUxpc3Q8TWRiQ2Fyb3VzZWxJdGVtQ29tcG9uZW50PjtcbiAgZ2V0IGl0ZW1zKCk6IE1kYkNhcm91c2VsSXRlbUNvbXBvbmVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXMgJiYgdGhpcy5faXRlbXMudG9BcnJheSgpO1xuICB9XG5cbiAgQElucHV0KCkgYW5pbWF0aW9uOiAnc2xpZGUnIHwgJ2ZhZGUnID0gJ3NsaWRlJztcblxuICBASW5wdXQoKVxuICBnZXQgY29udHJvbHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xzO1xuICB9XG4gIHNldCBjb250cm9scyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NvbnRyb2xzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9jb250cm9scyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkYXJrKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kYXJrO1xuICB9XG4gIHNldCBkYXJrKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGFyayA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGFyayA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBpbmRpY2F0b3JzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbmRpY2F0b3JzO1xuICB9XG4gIHNldCBpbmRpY2F0b3JzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faW5kaWNhdG9ycyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaW5kaWNhdG9ycyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCByaWRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yaWRlO1xuICB9XG4gIHNldCByaWRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmlkZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfcmlkZSA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZ2V0IGludGVydmFsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVydmFsO1xuICB9XG4gIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICB0aGlzLl9yZXN0YXJ0SW50ZXJ2YWwoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfaW50ZXJ2YWwgPSA1MDAwO1xuXG4gIEBJbnB1dCgpIGtleWJvYXJkID0gdHJ1ZTtcbiAgQElucHV0KCkgcGF1c2UgPSB0cnVlO1xuICBASW5wdXQoKSB3cmFwID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2xpZGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNsaWRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ2V0IGFjdGl2ZVNsaWRlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNsaWRlO1xuICB9XG5cbiAgc2V0IGFjdGl2ZVNsaWRlKGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggJiYgdGhpcy5fYWN0aXZlU2xpZGUgIT09IGluZGV4KSB7XG4gICAgICB0aGlzLl9hY3RpdmVTbGlkZSA9IGluZGV4O1xuICAgICAgdGhpcy5fcmVzdGFydEludGVydmFsKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2FjdGl2ZVNsaWRlID0gMDtcblxuICBwcml2YXRlIF9sYXN0SW50ZXJ2YWw6IGFueTtcbiAgcHJpdmF0ZSBfaXNQbGF5aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzU2xpZGluZyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhdXNlICYmIHRoaXMuX2lzUGxheWluZykge1xuICAgICAgdGhpcy5zdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYXVzZSAmJiAhdGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmQtYmxvY2snKSBkaXNwbGF5ID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5fc2V0QWN0aXZlU2xpZGUodGhpcy5fYWN0aXZlU2xpZGUpO1xuXG4gICAgICBpZiAodGhpcy5pbnRlcnZhbCA+IDAgJiYgdGhpcy5yaWRlKSB7XG4gICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5rZXlib2FyZCkge1xuICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2tleWRvd24nKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLnByZXYoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0QWN0aXZlU2xpZGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IHRoaXMuaXRlbXNbdGhpcy5fYWN0aXZlU2xpZGVdO1xuICAgIGN1cnJlbnRTbGlkZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgIGNvbnN0IG5ld1NsaWRlID0gdGhpcy5pdGVtc1tpbmRleF07XG4gICAgbmV3U2xpZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLl9hY3RpdmVTbGlkZSA9IGluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzdGFydEludGVydmFsKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0SW50ZXJ2YWwoKTtcbiAgICBjb25zdCBhY3RpdmVFbGVtZW50ID0gdGhpcy5pdGVtc1t0aGlzLmFjdGl2ZVNsaWRlXTtcbiAgICBjb25zdCBpbnRlcnZhbCA9IGFjdGl2ZUVsZW1lbnQuaW50ZXJ2YWwgPyBhY3RpdmVFbGVtZW50LmludGVydmFsIDogdGhpcy5pbnRlcnZhbDtcblxuICAgIGlmICghaXNOYU4oaW50ZXJ2YWwpICYmIGludGVydmFsID4gMCkge1xuICAgICAgdGhpcy5fbGFzdEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBuSW50ZXJ2YWwgPSAraW50ZXJ2YWw7XG4gICAgICAgIGlmICh0aGlzLl9pc1BsYXlpbmcgJiYgIWlzTmFOKG5JbnRlcnZhbCkgJiYgbkludGVydmFsID4gMCkge1xuICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9LCBpbnRlcnZhbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRJbnRlcnZhbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbGFzdEludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuX2xhc3RJbnRlcnZhbCk7XG4gICAgICB0aGlzLl9sYXN0SW50ZXJ2YWwgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHBsYXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG4gICAgICB0aGlzLl9yZXN0YXJ0SW50ZXJ2YWwoKTtcbiAgICB9XG4gIH1cblxuICBzdG9wKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fcmVzZXRJbnRlcnZhbCgpO1xuICAgIH1cbiAgfVxuXG4gIHRvKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaW5kZXggPiB0aGlzLml0ZW1zLmxlbmd0aCAtIDEgfHwgaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZlU2xpZGUgPT09IGluZGV4KSB7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGluZGV4ID4gdGhpcy5hY3RpdmVTbGlkZSA/IERpcmVjdGlvbi5ORVhUIDogRGlyZWN0aW9uLlBSRVY7XG5cbiAgICB0aGlzLl9hbmltYXRlU2xpZGVzKGRpcmVjdGlvbiwgdGhpcy5hY3RpdmVTbGlkZSwgaW5kZXgpO1xuICAgIHRoaXMuYWN0aXZlU2xpZGUgPSBpbmRleDtcbiAgfVxuXG4gIG5leHQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgIHRoaXMuX3NsaWRlKERpcmVjdGlvbi5ORVhUKTtcbiAgICB9XG4gIH1cblxuICBwcmV2KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICB0aGlzLl9zbGlkZShEaXJlY3Rpb24uUFJFVik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGUoZGlyZWN0aW9uOiBEaXJlY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCBpc0ZpcnN0ID0gdGhpcy5fYWN0aXZlU2xpZGUgPT09IDA7XG4gICAgY29uc3QgaXNMYXN0ID0gdGhpcy5fYWN0aXZlU2xpZGUgPT09IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcblxuICAgIGlmICghdGhpcy53cmFwKSB7XG4gICAgICBpZiAoKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQgJiYgaXNMYXN0KSB8fCAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFViAmJiBpc0ZpcnN0KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbmV3U2xpZGVJbmRleCA9IHRoaXMuX2dldE5ld1NsaWRlSW5kZXgoZGlyZWN0aW9uKTtcblxuICAgIHRoaXMuX2FuaW1hdGVTbGlkZXMoZGlyZWN0aW9uLCB0aGlzLmFjdGl2ZVNsaWRlLCBuZXdTbGlkZUluZGV4KTtcbiAgICB0aGlzLmFjdGl2ZVNsaWRlID0gbmV3U2xpZGVJbmRleDtcblxuICAgIHRoaXMuc2xpZGUuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW5pbWF0ZVNsaWRlcyhkaXJlY3Rpb246IERpcmVjdGlvbiwgY3VycmVudEluZGV4OiBudW1iZXIsIG5leHRJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudEl0ZW0gPSB0aGlzLml0ZW1zW2N1cnJlbnRJbmRleF07XG4gICAgY29uc3QgbmV4dEl0ZW0gPSB0aGlzLml0ZW1zW25leHRJbmRleF07XG4gICAgY29uc3QgY3VycmVudEVsID0gY3VycmVudEl0ZW0uaG9zdDtcbiAgICBjb25zdCBuZXh0RWwgPSBuZXh0SXRlbS5ob3N0O1xuXG4gICAgdGhpcy5faXNTbGlkaW5nID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUKSB7XG4gICAgICBuZXh0SXRlbS5uZXh0ID0gdHJ1ZTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlZmxvdyhuZXh0RWwpO1xuICAgICAgICBjdXJyZW50SXRlbS5zdGFydCA9IHRydWU7XG4gICAgICAgIG5leHRJdGVtLnN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9LCAwKTtcblxuICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gNjAwO1xuXG4gICAgICBmcm9tRXZlbnQoY3VycmVudEVsLCAndHJhbnNpdGlvbmVuZCcpXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIG5leHRJdGVtLm5leHQgPSBmYWxzZTtcbiAgICAgICAgICBuZXh0SXRlbS5zdGFydCA9IGZhbHNlO1xuICAgICAgICAgIG5leHRJdGVtLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICBjdXJyZW50SXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBjdXJyZW50SXRlbS5zdGFydCA9IGZhbHNlO1xuICAgICAgICAgIGN1cnJlbnRJdGVtLm5leHQgPSBmYWxzZTtcblxuICAgICAgICAgIHRoaXMuc2xpZGVDaGFuZ2UuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgdGhpcy5fZW11bGF0ZVRyYW5zaXRpb25FbmQoY3VycmVudEVsLCB0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFVikge1xuICAgICAgbmV4dEl0ZW0ucHJldiA9IHRydWU7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZWZsb3cobmV4dEVsKTtcbiAgICAgICAgY3VycmVudEl0ZW0uZW5kID0gdHJ1ZTtcbiAgICAgICAgbmV4dEl0ZW0uZW5kID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9LCAwKTtcblxuICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gNjAwO1xuXG4gICAgICBmcm9tRXZlbnQoY3VycmVudEVsLCAndHJhbnNpdGlvbmVuZCcpXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIG5leHRJdGVtLnByZXYgPSBmYWxzZTtcbiAgICAgICAgICBuZXh0SXRlbS5lbmQgPSBmYWxzZTtcbiAgICAgICAgICBuZXh0SXRlbS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgY3VycmVudEl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgY3VycmVudEl0ZW0uZW5kID0gZmFsc2U7XG4gICAgICAgICAgY3VycmVudEl0ZW0ucHJldiA9IGZhbHNlO1xuXG4gICAgICAgICAgdGhpcy5zbGlkZUNoYW5nZS5lbWl0KCk7XG4gICAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9lbXVsYXRlVHJhbnNpdGlvbkVuZChjdXJyZW50RWwsIHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9pc1BsYXlpbmcgJiYgdGhpcy5pbnRlcnZhbCA+IDApIHtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlZmxvdyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBfZW11bGF0ZVRyYW5zaXRpb25FbmQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnRFbWl0dGVkID0gZmFsc2U7XG4gICAgY29uc3QgZHVyYXRpb25QYWRkaW5nID0gNTtcbiAgICBjb25zdCBlbXVsYXRlZER1cmF0aW9uID0gZHVyYXRpb24gKyBkdXJhdGlvblBhZGRpbmc7XG5cbiAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBldmVudEVtaXR0ZWQgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghZXZlbnRFbWl0dGVkKSB7XG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3RyYW5zaXRpb25lbmQnKSk7XG4gICAgICB9XG4gICAgfSwgZW11bGF0ZWREdXJhdGlvbik7XG4gIH1cblxuICBwcml2YXRlIF9nZXROZXdTbGlkZUluZGV4KGRpcmVjdGlvbjogRGlyZWN0aW9uKTogbnVtYmVyIHtcbiAgICBsZXQgbmV3U2xpZGVJbmRleDogbnVtYmVyO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQpIHtcbiAgICAgIG5ld1NsaWRlSW5kZXggPSB0aGlzLl9nZXROZXh0U2xpZGVJbmRleCgpO1xuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWKSB7XG4gICAgICBuZXdTbGlkZUluZGV4ID0gdGhpcy5fZ2V0UHJldlNsaWRlSW5kZXgoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3U2xpZGVJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE5leHRTbGlkZUluZGV4KCk6IG51bWJlciB7XG4gICAgY29uc3QgaXNMYXN0ID0gdGhpcy5fYWN0aXZlU2xpZGUgPT09IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcblxuICAgIGlmICghaXNMYXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWN0aXZlU2xpZGUgKyAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy53cmFwICYmIGlzTGFzdCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRQcmV2U2xpZGVJbmRleCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGlzRmlyc3QgPSB0aGlzLl9hY3RpdmVTbGlkZSA9PT0gMDtcblxuICAgIGlmICghaXNGaXJzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNsaWRlIC0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMud3JhcCAmJiBpc0ZpcnN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWN0aXZlU2xpZGU7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NvbnRyb2xzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kYXJrOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmRpY2F0b3JzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yaWRlOiBCb29sZWFuSW5wdXQ7XG59XG4iLCI8ZGl2XG4gIGNsYXNzPVwiY2Fyb3VzZWwgc2xpZGVcIlxuICBbY2xhc3MuY2Fyb3VzZWwtZmFkZV09XCJhbmltYXRpb24gPT09ICdmYWRlJ1wiXG4gIFtjbGFzcy5jYXJvdXNlbC1kYXJrXT1cImRhcmtcIlxuPlxuICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWwtaW5kaWNhdG9yc1wiICpuZ0lmPVwiaW5kaWNhdG9yc1wiPlxuICAgIDxidXR0b25cbiAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBhY3RpdmVTbGlkZVwiXG4gICAgICBbYXR0ci5hcmlhLWN1cnJlbnRdPVwiaSA9PT0gYWN0aXZlU2xpZGVcIlxuICAgICAgKGNsaWNrKT1cInRvKGkpXCJcbiAgICA+PC9idXR0b24+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9kaXY+XG5cbiAgPGJ1dHRvbiAqbmdJZj1cImNvbnRyb2xzXCIgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXZcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInByZXYoKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1wcmV2LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj5QcmV2aW91czwvc3Bhbj5cbiAgPC9idXR0b24+XG4gIDxidXR0b24gKm5nSWY9XCJjb250cm9sc1wiIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1uZXh0XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJuZXh0KClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+TmV4dDwvc3Bhbj5cbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==