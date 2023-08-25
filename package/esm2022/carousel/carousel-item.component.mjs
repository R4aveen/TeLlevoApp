import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class MdbCarouselItemComponent {
    _elementRef;
    interval = null;
    carouselItem = true;
    active = false;
    next = false;
    prev = false;
    start = false;
    end = false;
    get host() {
        return this._elementRef.nativeElement;
    }
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCarouselItemComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbCarouselItemComponent, selector: "mdb-carousel-item", inputs: { interval: "interval" }, host: { properties: { "class.carousel-item": "this.carouselItem", "class.active": "this.active", "class.carousel-item-next": "this.next", "class.carousel-item-prev": "this.prev", "class.carousel-item-start": "this.start", "class.carousel-item-end": "this.end" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCarouselItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mdb-carousel-item',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { interval: [{
                type: Input
            }], carouselItem: [{
                type: HostBinding,
                args: ['class.carousel-item']
            }], active: [{
                type: HostBinding,
                args: ['class.active']
            }], next: [{
                type: HostBinding,
                args: ['class.carousel-item-next']
            }], prev: [{
                type: HostBinding,
                args: ['class.carousel-item-prev']
            }], start: [{
                type: HostBinding,
                args: ['class.carousel-item-start']
            }], end: [{
                type: HostBinding,
                args: ['class.carousel-item-end']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvY2Fyb3VzZWwvY2Fyb3VzZWwtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0xRSxNQUFNLE9BQU8sd0JBQXdCO0lBaUJmO0lBaEJYLFFBQVEsR0FBa0IsSUFBSSxDQUFDO0lBR3hDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFFUyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRUgsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNiLElBQUksR0FBRyxLQUFLLENBQUM7SUFDWixLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2hCLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFFcEQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUN4QyxDQUFDO0lBRUQsWUFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO3VHQWpCcEMsd0JBQXdCOzJGQUF4Qix3QkFBd0Isb1dBRnpCLDJCQUEyQjs7MkZBRTFCLHdCQUF3QjtrQkFKcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsMkJBQTJCO2lCQUN0QztpR0FFVSxRQUFRO3NCQUFoQixLQUFLO2dCQUdOLFlBQVk7c0JBRFgsV0FBVzt1QkFBQyxxQkFBcUI7Z0JBR0wsTUFBTTtzQkFBbEMsV0FBVzt1QkFBQyxjQUFjO2dCQUVjLElBQUk7c0JBQTVDLFdBQVc7dUJBQUMsMEJBQTBCO2dCQUNFLElBQUk7c0JBQTVDLFdBQVc7dUJBQUMsMEJBQTBCO2dCQUNHLEtBQUs7c0JBQTlDLFdBQVc7dUJBQUMsMkJBQTJCO2dCQUNBLEdBQUc7c0JBQTFDLFdBQVc7dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWNhcm91c2VsLWl0ZW0nLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJDYXJvdXNlbEl0ZW1Db21wb25lbnQge1xuICBASW5wdXQoKSBpbnRlcnZhbDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1pdGVtJylcbiAgY2Fyb3VzZWxJdGVtID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpIGFjdGl2ZSA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2Fyb3VzZWwtaXRlbS1uZXh0JykgbmV4dCA9IGZhbHNlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNhcm91c2VsLWl0ZW0tcHJldicpIHByZXYgPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1pdGVtLXN0YXJ0Jykgc3RhcnQgPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1pdGVtLWVuZCcpIGVuZCA9IGZhbHNlO1xuXG4gIGdldCBob3N0KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cbiJdfQ==