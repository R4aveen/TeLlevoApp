import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, ViewChild, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/portal";
// width below which, according to css rules, modal position changes - modal gets position relative instead of absolute.
const MODAL_CSS_BREAKPOINT = 992;
const MODAL_OPEN_CLASS = 'modal-open';
const NON_INVASIVE_CLASS = 'modal-non-invasive-open';
const NON_INVASIVE_SHOW_CLASS = 'modal-non-invasive-show';
export class MdbModalContainerComponent {
    _document;
    _elementRef;
    _renderer;
    _focusTrapFactory;
    _ngZone;
    _portalOutlet;
    modalDialog;
    modalContent;
    _destroy$ = new Subject();
    backdropClick$ = new Subject();
    _config;
    BACKDROP_TRANSITION = 150;
    MODAL_TRANSITION = 200;
    NON_INVASIVE_TRANSITION = 450;
    _previouslyFocusedElement;
    _focusTrap;
    modal = true;
    get hasAnimation() {
        return this._config.animation;
    }
    onWindowResize() {
        this._ngZone.runOutsideAngular(() => {
            if (this._config.nonInvasive) {
                this._handleWindowResize();
            }
        });
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    _isScrollable = false;
    _isBottomRight = false;
    _isBottomLeft = false;
    _isTopRight = false;
    _isTopLeft = false;
    _isSideTopModal = false;
    _isSideBottomModal = false;
    _isSideModal = false;
    _isModalBottom = false;
    _modalContentRect;
    _modalContentComputedStyles;
    _modalDialogComputedStyles;
    _topOffset = 0;
    _leftOffset = 0;
    _rightOffset = 0;
    _bottomOffset = 0;
    constructor(_document, _elementRef, _renderer, _focusTrapFactory, _ngZone) {
        this._document = _document;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._focusTrapFactory = _focusTrapFactory;
        this._ngZone = _ngZone;
    }
    ngOnInit() {
        this._updateContainerClass();
        this._renderer.setStyle(this.host, 'display', 'block');
        if (!this._config.nonInvasive) {
            this._focusTrap = this._focusTrapFactory.create(this.host);
            this._previouslyFocusedElement = this._document.activeElement;
        }
        if (this._config.animation) {
            setTimeout(() => {
                this._renderer.addClass(this.host, 'show');
                setTimeout(() => {
                    this._focusTrap?.focusInitialElementWhenReady();
                }, this.MODAL_TRANSITION);
            }, this.BACKDROP_TRANSITION);
        }
        else {
            this._focusTrap?.focusInitialElementWhenReady();
        }
    }
    ngAfterViewInit() {
        const widthWithVerticalScroll = this._document.body.offsetWidth;
        this._renderer.addClass(this._document.body, MODAL_OPEN_CLASS);
        if (this._config.nonInvasive) {
            this._renderer.addClass(this._document.body, NON_INVASIVE_CLASS);
            setTimeout(() => {
                this._onNonInvasiveModalShown();
            }, this.NON_INVASIVE_TRANSITION);
        }
        if (!this._config.nonInvasive) {
            this._renderer.setStyle(this._document.body, 'overflow', 'hidden');
        }
        const widthWithoutVerticalScroll = this._document.body.offsetWidth;
        if (!this._config.nonInvasive) {
            this._renderer.setStyle(this._document.body, 'padding-right', `${widthWithoutVerticalScroll - widthWithVerticalScroll}px`);
        }
        if (!this._config.ignoreBackdropClick && !this._config.nonInvasive) {
            fromEvent(this.host, 'mousedown')
                .pipe(filter((event) => {
                const target = event.target;
                const dialog = this.modalDialog.nativeElement;
                const notDialog = target !== dialog;
                const notDialogContent = !dialog.contains(target);
                return notDialog && notDialogContent;
            }), takeUntil(this._destroy$))
                .subscribe((event) => {
                this.backdropClick$.next(event);
            });
        }
    }
    ngOnDestroy() {
        this._previouslyFocusedElement?.focus();
        this._focusTrap?.destroy();
        this._destroy$.next();
        this._destroy$.complete();
    }
    _updateContainerClass() {
        if (this._config.containerClass === '' ||
            (this._config.containerClass.length && this._config.containerClass.length === 0)) {
            return;
        }
        const containerClasses = this._config.containerClass.split(' ');
        containerClasses.forEach((containerClass) => {
            this._renderer.addClass(this.host, containerClass);
        });
    }
    _onNonInvasiveModalShown() {
        this._isScrollable = this._config.modalClass.includes('modal-dialog-scrollable');
        this._isBottomRight = this._config.modalClass.includes('modal-bottom-right');
        this._isBottomLeft = this._config.modalClass.includes('modal-bottom-left');
        this._isTopRight = this._config.modalClass.includes('modal-top-right');
        this._isTopLeft = this._config.modalClass.includes('modal-top-left');
        this._isModalBottom = this._config.modalClass.includes('modal-bottom');
        this._isSideTopModal = this._isTopLeft || this._isTopRight;
        this._isSideBottomModal = this._isBottomLeft || this._isBottomRight;
        this._isSideModal = this._isSideTopModal || this._isSideBottomModal;
        this._modalContentRect = this.modalContent.nativeElement.getBoundingClientRect();
        this._modalContentComputedStyles = window.getComputedStyle(this.modalContent.nativeElement);
        this._modalDialogComputedStyles = window.getComputedStyle(this.modalDialog.nativeElement);
        this._topOffset = parseInt(this._modalDialogComputedStyles.top, 0);
        this._leftOffset = parseInt(this._modalDialogComputedStyles.left, 0);
        this._rightOffset = parseInt(this._modalDialogComputedStyles.right, 0);
        this._bottomOffset = parseInt(this._modalDialogComputedStyles.bottom, 0);
        this._renderer.addClass(this.host, NON_INVASIVE_SHOW_CLASS);
        this._setNonInvasiveStyles();
    }
    _setNonInvasiveStyles(leftOffset = 0, topOffset = 0) {
        const isAboveBreakpoint = window.innerWidth >= MODAL_CSS_BREAKPOINT;
        this._renderer.setStyle(this.host, 'left', `${this._modalContentRect.left + leftOffset}px`);
        this._renderer.setStyle(this.host, 'width', this._modalContentComputedStyles.width);
        if (!this._isScrollable) {
            // If the modal content is not long enough to require scroll shrink the modal wrapper to
            // the height of modal content so other elements on site are clickable outside modal
            this._renderer.setStyle(this.host, 'height', this._modalContentComputedStyles.height);
            this._renderer.setStyle(this.host, 'display', '');
        }
        if (isAboveBreakpoint) {
            if (this._isSideBottomModal || this._isModalBottom) {
                // Force modal to correct bottom placement. It's needed because modal host has position
                // fixed and fixed height.
                this._renderer.setStyle(this.host, 'top', `${this._modalContentRect.top + topOffset}px`);
            }
            if (this._isSideModal) {
                // Enable horizontal scrolling when the content is wider than the modal's fixed width
                this._renderer.setStyle(this.host, 'overflowX', 'auto');
            }
        }
    }
    _onNonInvasiveModalHidden() {
        this._renderer.removeClass(this.host, NON_INVASIVE_SHOW_CLASS);
        this._resetNonInvasiveStyles();
        this._removeNonInvasiveClass();
    }
    _resetNonInvasiveStyles() {
        this._renderer.setStyle(this.host, 'left', '');
        this._renderer.setStyle(this.host, 'top', '');
        this._renderer.setStyle(this.host, 'height', '');
        this._renderer.setStyle(this.host, 'width', '');
        if (!this._isScrollable) {
            this._renderer.setStyle(this.host, 'display', '');
        }
        if (this._isSideModal) {
            this._renderer.setStyle(this.host, 'overflowX', '');
        }
    }
    _removeNonInvasiveClass() {
        const isOtherModalOpen = this._document.body.querySelector('.modal.show.modal-non-invasive-show');
        if (!isOtherModalOpen) {
            this._renderer.removeClass(this._document.body, NON_INVASIVE_CLASS);
        }
        else {
            this._renderer.addClass(this._document.body, MODAL_OPEN_CLASS);
        }
    }
    _handleWindowResize() {
        const modalContent = this.host.querySelector('.modal-content');
        this._resetNonInvasiveStyles();
        this._modalContentRect = modalContent.getBoundingClientRect();
        this._modalContentComputedStyles = window.getComputedStyle(modalContent);
        if (this._isSideTopModal || this._isSideBottomModal) {
            let sideOffset = 0;
            let topOffset = 0;
            if (this._isBottomRight || this._isBottomLeft) {
                topOffset = -this._bottomOffset;
            }
            if (this._isBottomRight || this._isTopRight) {
                sideOffset = -this._rightOffset;
            }
            if (this._isBottomLeft || this._isTopLeft) {
                sideOffset = this._leftOffset;
            }
            this._setNonInvasiveStyles(sideOffset, topOffset);
        }
        else {
            this._setNonInvasiveStyles();
        }
    }
    _close() {
        if (this._config.animation) {
            this._renderer.removeClass(this.host, 'show');
        }
        // Pause iframe/video when closing modal
        const iframeElements = Array.from(this.host.querySelectorAll('iframe'));
        const videoElements = Array.from(this.host.querySelectorAll('video'));
        iframeElements.forEach((iframe) => {
            const srcAttribute = iframe.getAttribute('src');
            this._renderer.setAttribute(iframe, 'src', srcAttribute);
        });
        videoElements.forEach((video) => {
            video.pause();
        });
    }
    _restoreScrollbar() {
        this._renderer.removeClass(this._document.body, MODAL_OPEN_CLASS);
        this._renderer.removeStyle(this._document.body, 'overflow');
        this._renderer.removeStyle(this._document.body, 'padding-right');
    }
    attachComponentPortal(portal) {
        return this._portalOutlet.attachComponentPortal(portal);
    }
    attachTemplatePortal(portal) {
        return this._portalOutlet.attachTemplatePortal(portal);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbModalContainerComponent, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.ConfigurableFocusTrapFactory }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbModalContainerComponent, selector: "mdb-modal-container", host: { listeners: { "window:resize": "onWindowResize($event)" }, properties: { "class.modal": "this.modal", "class.fade": "this.hasAnimation" } }, viewQueries: [{ propertyName: "_portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }, { propertyName: "modalDialog", first: true, predicate: ["dialog"], descendants: true, static: true }, { propertyName: "modalContent", first: true, predicate: ["content"], descendants: true, static: true }], ngImport: i0, template: "<div #dialog [class]=\"'modal-dialog' + (_config.modalClass ? ' ' + _config.modalClass : '')\">\n  <div\n    #content\n    class=\"modal-content\"\n    [ngClass]=\"{ 'rounded-0': _config.modalClass.includes('modal-frame') }\"\n  >\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.Default });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbModalContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-modal-container', changeDetection: ChangeDetectionStrategy.Default, template: "<div #dialog [class]=\"'modal-dialog' + (_config.modalClass ? ' ' + _config.modalClass : '')\">\n  <div\n    #content\n    class=\"modal-content\"\n    [ngClass]=\"{ 'rounded-0': _config.modalClass.includes('modal-frame') }\"\n  >\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.ConfigurableFocusTrapFactory }, { type: i0.NgZone }]; }, propDecorators: { _portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }], modalDialog: [{
                type: ViewChild,
                args: ['dialog', { static: true }]
            }], modalContent: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }], modal: [{
                type: HostBinding,
                args: ['class.modal']
            }], hasAnimation: [{
                type: HostBinding,
                args: ['class.fade']
            }], onWindowResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9tb2RhbC9tb2RhbC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L21vZGFsL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFtQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZGLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUlULFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUtOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFFM0Msd0hBQXdIO0FBQ3hILE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDO0FBQ2pDLE1BQU0sZ0JBQWdCLEdBQUcsWUFBWSxDQUFDO0FBQ3RDLE1BQU0sa0JBQWtCLEdBQUcseUJBQXlCLENBQUM7QUFDckQsTUFBTSx1QkFBdUIsR0FBRyx5QkFBeUIsQ0FBQztBQU8xRCxNQUFNLE9BQU8sMEJBQTBCO0lBc0RUO0lBQ25CO0lBQ0M7SUFDQTtJQUNBO0lBekRvQyxhQUFhLENBQWtCO0lBQ3RDLFdBQVcsQ0FBYTtJQUN2QixZQUFZLENBQWE7SUFFeEQsU0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO0lBQy9DLGNBQWMsR0FBd0IsSUFBSSxPQUFPLEVBQWMsQ0FBQztJQUV6RSxPQUFPLENBQWlCO0lBRXhCLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztJQUMxQixnQkFBZ0IsR0FBRyxHQUFHLENBQUM7SUFDdkIsdUJBQXVCLEdBQUcsR0FBRyxDQUFDO0lBRXRCLHlCQUF5QixDQUFjO0lBQ3ZDLFVBQVUsQ0FBd0I7SUFFZCxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3pDLElBQ0ksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUdELGNBQWM7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUM1QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQztJQUVPLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDdEIsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUN2QixhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDcEIsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUNuQixlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUMzQixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDdkIsaUJBQWlCLENBQXlCO0lBQzFDLDJCQUEyQixDQUE2QjtJQUN4RCwwQkFBMEIsQ0FBNkI7SUFDdkQsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNmLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDaEIsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUNqQixhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBRTFCLFlBQzRCLFNBQVMsRUFDNUIsV0FBdUIsRUFDdEIsU0FBb0IsRUFDcEIsaUJBQStDLEVBQy9DLE9BQWU7UUFKRyxjQUFTLEdBQVQsU0FBUyxDQUFBO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE4QjtRQUMvQyxZQUFPLEdBQVAsT0FBTyxDQUFRO0lBQ3RCLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBNEIsQ0FBQztTQUM5RTtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDMUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUUzQyxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxVQUFVLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQztnQkFDbEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzVCLENBQUMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsRUFBRSw0QkFBNEIsRUFBRSxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztJQUVELGVBQWU7UUFDYixNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRS9ELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUNqRSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQ2xDLENBQUMsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUNsQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEU7UUFFRCxNQUFNLDBCQUEwQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVuRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUNuQixlQUFlLEVBQ2YsR0FBRywwQkFBMEIsR0FBRyx1QkFBdUIsSUFBSSxDQUM1RCxDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ2xFLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQztpQkFDOUIsSUFBSSxDQUNILE1BQU0sQ0FBQyxDQUFDLEtBQWlCLEVBQUUsRUFBRTtnQkFDM0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQXFCLENBQUM7Z0JBQzNDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO2dCQUM5QyxNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO2dCQUNwQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxTQUFTLElBQUksZ0JBQWdCLENBQUM7WUFDdkMsQ0FBQyxDQUFDLEVBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FDMUI7aUJBQ0EsU0FBUyxDQUFDLENBQUMsS0FBaUIsRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMseUJBQXlCLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixJQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxLQUFLLEVBQUU7WUFDbEMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUNoRjtZQUNBLE9BQU87U0FDUjtRQUVELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWhFLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sd0JBQXdCO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMzRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDcEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDakYsSUFBSSxDQUFDLDJCQUEyQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQywwQkFBMEIsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8scUJBQXFCLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsQ0FBQztRQUN6RCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksb0JBQW9CLENBQUM7UUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLFVBQVUsSUFBSSxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBGLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLHdGQUF3RjtZQUN4RixvRkFBb0Y7WUFDcEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNsRCx1RkFBdUY7Z0JBQ3ZGLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxHQUFHLFNBQVMsSUFBSSxDQUFDLENBQUM7YUFDMUY7WUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLHFGQUFxRjtnQkFDckYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDekQ7U0FDRjtJQUNILENBQUM7SUFFRCx5QkFBeUI7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTyx1QkFBdUI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBRU8sdUJBQXVCO1FBQzdCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUN4RCxxQ0FBcUMsQ0FDdEMsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3JFO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBRS9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM5RCxJQUFJLENBQUMsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXpFLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDbkQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDN0MsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUNqQztZQUNELElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUMzQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ2pDO1lBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQy9CO1lBRUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNuRDthQUFNO1lBQ0wsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvQztRQUVELHdDQUF3QztRQUN4QyxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN4RSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUV0RSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBeUIsRUFBRSxFQUFFO1lBQ25ELE1BQU0sWUFBWSxHQUFRLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUVILGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUF1QixFQUFFLEVBQUU7WUFDaEQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELHFCQUFxQixDQUFJLE1BQTBCO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsb0JBQW9CLENBQUksTUFBeUI7UUFDL0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7dUdBOVJVLDBCQUEwQixrQkFzRDNCLFFBQVE7MkZBdERQLDBCQUEwQiw4UEFDMUIsZUFBZSw0UUNuQzVCLDZTQVNBOzsyRkR5QmEsMEJBQTBCO2tCQUx0QyxTQUFTOytCQUNFLHFCQUFxQixtQkFFZCx1QkFBdUIsQ0FBQyxPQUFPOzswQkF3RDdDLE1BQU07MkJBQUMsUUFBUTs2SkFyRDRCLGFBQWE7c0JBQTFELFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDTCxXQUFXO3NCQUFqRCxTQUFTO3VCQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ0csWUFBWTtzQkFBbkQsU0FBUzt1QkFBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQWNWLEtBQUs7c0JBQWhDLFdBQVc7dUJBQUMsYUFBYTtnQkFFdEIsWUFBWTtzQkFEZixXQUFXO3VCQUFDLFlBQVk7Z0JBTXpCLGNBQWM7c0JBRGIsWUFBWTt1QkFBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtQb3J0YWxPdXRsZXQsIENvbXBvbmVudFBvcnRhbCwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYk1vZGFsQ29uZmlnIH0gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xuaW1wb3J0IHsgQ29uZmlndXJhYmxlRm9jdXNUcmFwRmFjdG9yeSwgQ29uZmlndXJhYmxlRm9jdXNUcmFwIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLy8gd2lkdGggYmVsb3cgd2hpY2gsIGFjY29yZGluZyB0byBjc3MgcnVsZXMsIG1vZGFsIHBvc2l0aW9uIGNoYW5nZXMgLSBtb2RhbCBnZXRzIHBvc2l0aW9uIHJlbGF0aXZlIGluc3RlYWQgb2YgYWJzb2x1dGUuXG5jb25zdCBNT0RBTF9DU1NfQlJFQUtQT0lOVCA9IDk5MjtcbmNvbnN0IE1PREFMX09QRU5fQ0xBU1MgPSAnbW9kYWwtb3Blbic7XG5jb25zdCBOT05fSU5WQVNJVkVfQ0xBU1MgPSAnbW9kYWwtbm9uLWludmFzaXZlLW9wZW4nO1xuY29uc3QgTk9OX0lOVkFTSVZFX1NIT1dfQ0xBU1MgPSAnbW9kYWwtbm9uLWludmFzaXZlLXNob3cnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItbW9kYWwtY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICdtb2RhbC1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIE1kYk1vZGFsQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwgeyBzdGF0aWM6IHRydWUgfSkgX3BvcnRhbE91dGxldDogQ2RrUG9ydGFsT3V0bGV0O1xuICBAVmlld0NoaWxkKCdkaWFsb2cnLCB7IHN0YXRpYzogdHJ1ZSB9KSBtb2RhbERpYWxvZzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIG1vZGFsQ29udGVudDogRWxlbWVudFJlZjtcblxuICByZWFkb25seSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICByZWFkb25seSBiYWNrZHJvcENsaWNrJDogU3ViamVjdDxNb3VzZUV2ZW50PiA9IG5ldyBTdWJqZWN0PE1vdXNlRXZlbnQ+KCk7XG5cbiAgX2NvbmZpZzogTWRiTW9kYWxDb25maWc7XG5cbiAgQkFDS0RST1BfVFJBTlNJVElPTiA9IDE1MDtcbiAgTU9EQUxfVFJBTlNJVElPTiA9IDIwMDtcbiAgTk9OX0lOVkFTSVZFX1RSQU5TSVRJT04gPSA0NTA7XG5cbiAgcHJpdmF0ZSBfcHJldmlvdXNseUZvY3VzZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfZm9jdXNUcmFwOiBDb25maWd1cmFibGVGb2N1c1RyYXA7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tb2RhbCcpIG1vZGFsID0gdHJ1ZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mYWRlJylcbiAgZ2V0IGhhc0FuaW1hdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmFuaW1hdGlvbjtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5ub25JbnZhc2l2ZSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBob3N0KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNTY3JvbGxhYmxlID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzQm90dG9tUmlnaHQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaXNCb3R0b21MZWZ0ID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzVG9wUmlnaHQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaXNUb3BMZWZ0ID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzU2lkZVRvcE1vZGFsID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzU2lkZUJvdHRvbU1vZGFsID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzU2lkZU1vZGFsID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzTW9kYWxCb3R0b20gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbW9kYWxDb250ZW50UmVjdDogbnVsbCB8IERPTVJlY3RSZWFkT25seTtcbiAgcHJpdmF0ZSBfbW9kYWxDb250ZW50Q29tcHV0ZWRTdHlsZXM6IG51bGwgfCBDU1NTdHlsZURlY2xhcmF0aW9uO1xuICBwcml2YXRlIF9tb2RhbERpYWxvZ0NvbXB1dGVkU3R5bGVzOiBudWxsIHwgQ1NTU3R5bGVEZWNsYXJhdGlvbjtcbiAgcHJpdmF0ZSBfdG9wT2Zmc2V0ID0gMDtcbiAgcHJpdmF0ZSBfbGVmdE9mZnNldCA9IDA7XG4gIHByaXZhdGUgX3JpZ2h0T2Zmc2V0ID0gMDtcbiAgcHJpdmF0ZSBfYm90dG9tT2Zmc2V0ID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudCxcbiAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9mb2N1c1RyYXBGYWN0b3J5OiBDb25maWd1cmFibGVGb2N1c1RyYXBGYWN0b3J5LFxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVDb250YWluZXJDbGFzcygpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgIGlmICghdGhpcy5fY29uZmlnLm5vbkludmFzaXZlKSB7XG4gICAgICB0aGlzLl9mb2N1c1RyYXAgPSB0aGlzLl9mb2N1c1RyYXBGYWN0b3J5LmNyZWF0ZSh0aGlzLmhvc3QpO1xuICAgICAgdGhpcy5fcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdCwgJ3Nob3cnKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9mb2N1c1RyYXA/LmZvY3VzSW5pdGlhbEVsZW1lbnRXaGVuUmVhZHkoKTtcbiAgICAgICAgfSwgdGhpcy5NT0RBTF9UUkFOU0lUSU9OKTtcbiAgICAgIH0sIHRoaXMuQkFDS0RST1BfVFJBTlNJVElPTik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZvY3VzVHJhcD8uZm9jdXNJbml0aWFsRWxlbWVudFdoZW5SZWFkeSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCB3aWR0aFdpdGhWZXJ0aWNhbFNjcm9sbCA9IHRoaXMuX2RvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgTU9EQUxfT1BFTl9DTEFTUyk7XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLm5vbkludmFzaXZlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCBOT05fSU5WQVNJVkVfQ0xBU1MpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX29uTm9uSW52YXNpdmVNb2RhbFNob3duKCk7XG4gICAgICB9LCB0aGlzLk5PTl9JTlZBU0lWRV9UUkFOU0lUSU9OKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5ub25JbnZhc2l2ZSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIGNvbnN0IHdpZHRoV2l0aG91dFZlcnRpY2FsU2Nyb2xsID0gdGhpcy5fZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aDtcblxuICAgIGlmICghdGhpcy5fY29uZmlnLm5vbkludmFzaXZlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuYm9keSxcbiAgICAgICAgJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgICBgJHt3aWR0aFdpdGhvdXRWZXJ0aWNhbFNjcm9sbCAtIHdpZHRoV2l0aFZlcnRpY2FsU2Nyb2xsfXB4YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5pZ25vcmVCYWNrZHJvcENsaWNrICYmICF0aGlzLl9jb25maWcubm9uSW52YXNpdmUpIHtcbiAgICAgIGZyb21FdmVudCh0aGlzLmhvc3QsICdtb3VzZWRvd24nKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBkaWFsb2cgPSB0aGlzLm1vZGFsRGlhbG9nLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBub3REaWFsb2cgPSB0YXJnZXQgIT09IGRpYWxvZztcbiAgICAgICAgICAgIGNvbnN0IG5vdERpYWxvZ0NvbnRlbnQgPSAhZGlhbG9nLmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICAgICAgICByZXR1cm4gbm90RGlhbG9nICYmIG5vdERpYWxvZ0NvbnRlbnQ7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5iYWNrZHJvcENsaWNrJC5uZXh0KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcHJldmlvdXNseUZvY3VzZWRFbGVtZW50Py5mb2N1cygpO1xuICAgIHRoaXMuX2ZvY3VzVHJhcD8uZGVzdHJveSgpO1xuXG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDb250YWluZXJDbGFzcygpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLl9jb25maWcuY29udGFpbmVyQ2xhc3MgPT09ICcnIHx8XG4gICAgICAodGhpcy5fY29uZmlnLmNvbnRhaW5lckNsYXNzLmxlbmd0aCAmJiB0aGlzLl9jb25maWcuY29udGFpbmVyQ2xhc3MubGVuZ3RoID09PSAwKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzZXMgPSB0aGlzLl9jb25maWcuY29udGFpbmVyQ2xhc3Muc3BsaXQoJyAnKTtcblxuICAgIGNvbnRhaW5lckNsYXNzZXMuZm9yRWFjaCgoY29udGFpbmVyQ2xhc3MpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdCwgY29udGFpbmVyQ2xhc3MpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25Ob25JbnZhc2l2ZU1vZGFsU2hvd24oKSB7XG4gICAgdGhpcy5faXNTY3JvbGxhYmxlID0gdGhpcy5fY29uZmlnLm1vZGFsQ2xhc3MuaW5jbHVkZXMoJ21vZGFsLWRpYWxvZy1zY3JvbGxhYmxlJyk7XG4gICAgdGhpcy5faXNCb3R0b21SaWdodCA9IHRoaXMuX2NvbmZpZy5tb2RhbENsYXNzLmluY2x1ZGVzKCdtb2RhbC1ib3R0b20tcmlnaHQnKTtcbiAgICB0aGlzLl9pc0JvdHRvbUxlZnQgPSB0aGlzLl9jb25maWcubW9kYWxDbGFzcy5pbmNsdWRlcygnbW9kYWwtYm90dG9tLWxlZnQnKTtcbiAgICB0aGlzLl9pc1RvcFJpZ2h0ID0gdGhpcy5fY29uZmlnLm1vZGFsQ2xhc3MuaW5jbHVkZXMoJ21vZGFsLXRvcC1yaWdodCcpO1xuICAgIHRoaXMuX2lzVG9wTGVmdCA9IHRoaXMuX2NvbmZpZy5tb2RhbENsYXNzLmluY2x1ZGVzKCdtb2RhbC10b3AtbGVmdCcpO1xuICAgIHRoaXMuX2lzTW9kYWxCb3R0b20gPSB0aGlzLl9jb25maWcubW9kYWxDbGFzcy5pbmNsdWRlcygnbW9kYWwtYm90dG9tJyk7XG4gICAgdGhpcy5faXNTaWRlVG9wTW9kYWwgPSB0aGlzLl9pc1RvcExlZnQgfHwgdGhpcy5faXNUb3BSaWdodDtcbiAgICB0aGlzLl9pc1NpZGVCb3R0b21Nb2RhbCA9IHRoaXMuX2lzQm90dG9tTGVmdCB8fCB0aGlzLl9pc0JvdHRvbVJpZ2h0O1xuICAgIHRoaXMuX2lzU2lkZU1vZGFsID0gdGhpcy5faXNTaWRlVG9wTW9kYWwgfHwgdGhpcy5faXNTaWRlQm90dG9tTW9kYWw7XG4gICAgdGhpcy5fbW9kYWxDb250ZW50UmVjdCA9IHRoaXMubW9kYWxDb250ZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5fbW9kYWxDb250ZW50Q29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm1vZGFsQ29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLl9tb2RhbERpYWxvZ0NvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5tb2RhbERpYWxvZy5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLl90b3BPZmZzZXQgPSBwYXJzZUludCh0aGlzLl9tb2RhbERpYWxvZ0NvbXB1dGVkU3R5bGVzLnRvcCwgMCk7XG4gICAgdGhpcy5fbGVmdE9mZnNldCA9IHBhcnNlSW50KHRoaXMuX21vZGFsRGlhbG9nQ29tcHV0ZWRTdHlsZXMubGVmdCwgMCk7XG4gICAgdGhpcy5fcmlnaHRPZmZzZXQgPSBwYXJzZUludCh0aGlzLl9tb2RhbERpYWxvZ0NvbXB1dGVkU3R5bGVzLnJpZ2h0LCAwKTtcbiAgICB0aGlzLl9ib3R0b21PZmZzZXQgPSBwYXJzZUludCh0aGlzLl9tb2RhbERpYWxvZ0NvbXB1dGVkU3R5bGVzLmJvdHRvbSwgMCk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QsIE5PTl9JTlZBU0lWRV9TSE9XX0NMQVNTKTtcbiAgICB0aGlzLl9zZXROb25JbnZhc2l2ZVN0eWxlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Tm9uSW52YXNpdmVTdHlsZXMobGVmdE9mZnNldCA9IDAsIHRvcE9mZnNldCA9IDApIHtcbiAgICBjb25zdCBpc0Fib3ZlQnJlYWtwb2ludCA9IHdpbmRvdy5pbm5lcldpZHRoID49IE1PREFMX0NTU19CUkVBS1BPSU5UO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2xlZnQnLCBgJHt0aGlzLl9tb2RhbENvbnRlbnRSZWN0LmxlZnQgKyBsZWZ0T2Zmc2V0fXB4YCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAnd2lkdGgnLCB0aGlzLl9tb2RhbENvbnRlbnRDb21wdXRlZFN0eWxlcy53aWR0aCk7XG5cbiAgICBpZiAoIXRoaXMuX2lzU2Nyb2xsYWJsZSkge1xuICAgICAgLy8gSWYgdGhlIG1vZGFsIGNvbnRlbnQgaXMgbm90IGxvbmcgZW5vdWdoIHRvIHJlcXVpcmUgc2Nyb2xsIHNocmluayB0aGUgbW9kYWwgd3JhcHBlciB0b1xuICAgICAgLy8gdGhlIGhlaWdodCBvZiBtb2RhbCBjb250ZW50IHNvIG90aGVyIGVsZW1lbnRzIG9uIHNpdGUgYXJlIGNsaWNrYWJsZSBvdXRzaWRlIG1vZGFsXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdoZWlnaHQnLCB0aGlzLl9tb2RhbENvbnRlbnRDb21wdXRlZFN0eWxlcy5oZWlnaHQpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAnZGlzcGxheScsICcnKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBYm92ZUJyZWFrcG9pbnQpIHtcbiAgICAgIGlmICh0aGlzLl9pc1NpZGVCb3R0b21Nb2RhbCB8fCB0aGlzLl9pc01vZGFsQm90dG9tKSB7XG4gICAgICAgIC8vIEZvcmNlIG1vZGFsIHRvIGNvcnJlY3QgYm90dG9tIHBsYWNlbWVudC4gSXQncyBuZWVkZWQgYmVjYXVzZSBtb2RhbCBob3N0IGhhcyBwb3NpdGlvblxuICAgICAgICAvLyBmaXhlZCBhbmQgZml4ZWQgaGVpZ2h0LlxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICd0b3AnLCBgJHt0aGlzLl9tb2RhbENvbnRlbnRSZWN0LnRvcCArIHRvcE9mZnNldH1weGApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faXNTaWRlTW9kYWwpIHtcbiAgICAgICAgLy8gRW5hYmxlIGhvcml6b250YWwgc2Nyb2xsaW5nIHdoZW4gdGhlIGNvbnRlbnQgaXMgd2lkZXIgdGhhbiB0aGUgbW9kYWwncyBmaXhlZCB3aWR0aFxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdvdmVyZmxvd1gnLCAnYXV0bycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vbk5vbkludmFzaXZlTW9kYWxIaWRkZW4oKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0LCBOT05fSU5WQVNJVkVfU0hPV19DTEFTUyk7XG4gICAgdGhpcy5fcmVzZXROb25JbnZhc2l2ZVN0eWxlcygpO1xuICAgIHRoaXMuX3JlbW92ZU5vbkludmFzaXZlQ2xhc3MoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Tm9uSW52YXNpdmVTdHlsZXMoKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAnbGVmdCcsICcnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICd0b3AnLCAnJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAnaGVpZ2h0JywgJycpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ3dpZHRoJywgJycpO1xuXG4gICAgaWYgKCF0aGlzLl9pc1Njcm9sbGFibGUpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2Rpc3BsYXknLCAnJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2lzU2lkZU1vZGFsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdvdmVyZmxvd1gnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9uSW52YXNpdmVDbGFzcygpIHtcbiAgICBjb25zdCBpc090aGVyTW9kYWxPcGVuID0gdGhpcy5fZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5tb2RhbC5zaG93Lm1vZGFsLW5vbi1pbnZhc2l2ZS1zaG93J1xuICAgICk7XG4gICAgaWYgKCFpc090aGVyTW9kYWxPcGVuKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCBOT05fSU5WQVNJVkVfQ0xBU1MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCBNT0RBTF9PUEVOX0NMQVNTKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVXaW5kb3dSZXNpemUoKSB7XG4gICAgY29uc3QgbW9kYWxDb250ZW50ID0gdGhpcy5ob3N0LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb250ZW50Jyk7XG4gICAgdGhpcy5fcmVzZXROb25JbnZhc2l2ZVN0eWxlcygpO1xuXG4gICAgdGhpcy5fbW9kYWxDb250ZW50UmVjdCA9IG1vZGFsQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLl9tb2RhbENvbnRlbnRDb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1vZGFsQ29udGVudCk7XG5cbiAgICBpZiAodGhpcy5faXNTaWRlVG9wTW9kYWwgfHwgdGhpcy5faXNTaWRlQm90dG9tTW9kYWwpIHtcbiAgICAgIGxldCBzaWRlT2Zmc2V0ID0gMDtcbiAgICAgIGxldCB0b3BPZmZzZXQgPSAwO1xuICAgICAgaWYgKHRoaXMuX2lzQm90dG9tUmlnaHQgfHwgdGhpcy5faXNCb3R0b21MZWZ0KSB7XG4gICAgICAgIHRvcE9mZnNldCA9IC10aGlzLl9ib3R0b21PZmZzZXQ7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5faXNCb3R0b21SaWdodCB8fCB0aGlzLl9pc1RvcFJpZ2h0KSB7XG4gICAgICAgIHNpZGVPZmZzZXQgPSAtdGhpcy5fcmlnaHRPZmZzZXQ7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5faXNCb3R0b21MZWZ0IHx8IHRoaXMuX2lzVG9wTGVmdCkge1xuICAgICAgICBzaWRlT2Zmc2V0ID0gdGhpcy5fbGVmdE9mZnNldDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc2V0Tm9uSW52YXNpdmVTdHlsZXMoc2lkZU9mZnNldCwgdG9wT2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0Tm9uSW52YXNpdmVTdHlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBfY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaG9zdCwgJ3Nob3cnKTtcbiAgICB9XG5cbiAgICAvLyBQYXVzZSBpZnJhbWUvdmlkZW8gd2hlbiBjbG9zaW5nIG1vZGFsXG4gICAgY29uc3QgaWZyYW1lRWxlbWVudHMgPSBBcnJheS5mcm9tKHRoaXMuaG9zdC5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWUnKSk7XG4gICAgY29uc3QgdmlkZW9FbGVtZW50cyA9IEFycmF5LmZyb20odGhpcy5ob3N0LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJykpO1xuXG4gICAgaWZyYW1lRWxlbWVudHMuZm9yRWFjaCgoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCkgPT4ge1xuICAgICAgY29uc3Qgc3JjQXR0cmlidXRlOiBhbnkgPSBpZnJhbWUuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShpZnJhbWUsICdzcmMnLCBzcmNBdHRyaWJ1dGUpO1xuICAgIH0pO1xuXG4gICAgdmlkZW9FbGVtZW50cy5mb3JFYWNoKCh2aWRlbzogSFRNTFZpZGVvRWxlbWVudCkgPT4ge1xuICAgICAgdmlkZW8ucGF1c2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9yZXN0b3JlU2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksIE1PREFMX09QRU5fQ0xBU1MpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2RvY3VtZW50LmJvZHksICdvdmVyZmxvdycpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2RvY3VtZW50LmJvZHksICdwYWRkaW5nLXJpZ2h0Jyk7XG4gIH1cblxuICBhdHRhY2hDb21wb25lbnRQb3J0YWw8VD4ocG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD4pOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIHJldHVybiB0aGlzLl9wb3J0YWxPdXRsZXQuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG4gIH1cblxuICBhdHRhY2hUZW1wbGF0ZVBvcnRhbDxDPihwb3J0YWw6IFRlbXBsYXRlUG9ydGFsPEM+KTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsT3V0bGV0LmF0dGFjaFRlbXBsYXRlUG9ydGFsKHBvcnRhbCk7XG4gIH1cbn1cbiIsIjxkaXYgI2RpYWxvZyBbY2xhc3NdPVwiJ21vZGFsLWRpYWxvZycgKyAoX2NvbmZpZy5tb2RhbENsYXNzID8gJyAnICsgX2NvbmZpZy5tb2RhbENsYXNzIDogJycpXCI+XG4gIDxkaXZcbiAgICAjY29udGVudFxuICAgIGNsYXNzPVwibW9kYWwtY29udGVudFwiXG4gICAgW25nQ2xhc3NdPVwieyAncm91bmRlZC0wJzogX2NvbmZpZy5tb2RhbENsYXNzLmluY2x1ZGVzKCdtb2RhbC1mcmFtZScpIH1cIlxuICA+XG4gICAgPG5nLXRlbXBsYXRlIGNka1BvcnRhbE91dGxldD48L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19