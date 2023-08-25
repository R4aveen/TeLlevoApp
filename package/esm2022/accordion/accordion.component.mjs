import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MdbAccordionItemComponent } from './accordion-item.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
export class MdbAccordionComponent {
    items;
    get borderless() {
        return this._borderless;
    }
    set borderless(value) {
        this._borderless = coerceBooleanProperty(value);
    }
    _borderless = false;
    get flush() {
        return this._flush;
    }
    set flush(value) {
        this._flush = coerceBooleanProperty(value);
    }
    _flush = false;
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    _multiple = false;
    accordion = true;
    get addBorderlessClass() {
        return this.borderless;
    }
    get addFlushClass() {
        return this.flush;
    }
    constructor() { }
    ngAfterContentInit() {
        this.items.changes
            .pipe(startWith(this.items), switchMap((items) => {
            return merge(...items.map((item) => item.show$));
        }))
            .subscribe((clickedItem) => this._handleMultipleItems(clickedItem));
    }
    _handleMultipleItems(clickedItem) {
        if (!this.multiple) {
            const itemsToClose = this.items.filter((item) => item !== clickedItem && !item._collapsed);
            itemsToClose.forEach((item) => item.hide());
        }
    }
    static ngAcceptInputType_borderless;
    static ngAcceptInputType_flush;
    static ngAcceptInputType_multiple;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbAccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbAccordionComponent, selector: "mdb-accordion", inputs: { borderless: "borderless", flush: "flush", multiple: "multiple" }, host: { properties: { "class.accordion": "this.accordion", "class.accordion-borderless": "this.addBorderlessClass", "class.accordion-flush": "this.addFlushClass" } }, queries: [{ propertyName: "items", predicate: MdbAccordionItemComponent }], ngImport: i0, template: "<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-accordion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { items: [{
                type: ContentChildren,
                args: [MdbAccordionItemComponent]
            }], borderless: [{
                type: Input
            }], flush: [{
                type: Input
            }], multiple: [{
                type: Input
            }], accordion: [{
                type: HostBinding,
                args: ['class.accordion']
            }], addBorderlessClass: [{
                type: HostBinding,
                args: ['class.accordion-borderless']
            }], addFlushClass: [{
                type: HostBinding,
                args: ['class.accordion-flush']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hY2NvcmRpb24vYWNjb3JkaW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hY2NvcmRpb24vYWNjb3JkaW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixXQUFXLEVBQ1gsS0FBSyxHQUVOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBTzVFLE1BQU0sT0FBTyxxQkFBcUI7SUFDWSxLQUFLLENBQXVDO0lBRXhGLElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDTyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBRTVCLElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDTyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRXZCLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDTyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBRU0sU0FBUyxHQUFHLElBQUksQ0FBQztJQUVqRCxJQUNJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsZ0JBQWUsQ0FBQztJQUVoQixrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2FBQ2YsSUFBSSxDQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQ3JCLFNBQVMsQ0FBQyxDQUFDLEtBQTJDLEVBQUUsRUFBRTtZQUN4RCxPQUFPLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUErQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUMsQ0FDSDthQUNBLFNBQVMsQ0FBQyxDQUFDLFdBQXNDLEVBQUUsRUFBRSxDQUNwRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQ3ZDLENBQUM7SUFDTixDQUFDO0lBRU8sb0JBQW9CLENBQUMsV0FBc0M7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ3BDLENBQUMsSUFBK0IsRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQzlFLENBQUM7WUFFRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBK0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLDRCQUE0QixDQUFlO0lBQ2xELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBZTtJQUM3QyxNQUFNLENBQUMsMEJBQTBCLENBQWU7dUdBckVyQyxxQkFBcUI7MkZBQXJCLHFCQUFxQiw4VEFDZix5QkFBeUIsNkJDcEI1Qyw2QkFDQTs7MkZEa0JhLHFCQUFxQjtrQkFMakMsU0FBUzsrQkFDRSxlQUFlLG1CQUVSLHVCQUF1QixDQUFDLE1BQU07MEVBR0gsS0FBSztzQkFBaEQsZUFBZTt1QkFBQyx5QkFBeUI7Z0JBR3RDLFVBQVU7c0JBRGIsS0FBSztnQkFVRixLQUFLO3NCQURSLEtBQUs7Z0JBVUYsUUFBUTtzQkFEWCxLQUFLO2dCQVMwQixTQUFTO3NCQUF4QyxXQUFXO3VCQUFDLGlCQUFpQjtnQkFHMUIsa0JBQWtCO3NCQURyQixXQUFXO3VCQUFDLDRCQUE0QjtnQkFNckMsYUFBYTtzQkFEaEIsV0FBVzt1QkFBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2FjY29yZGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1hY2NvcmRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYWNjb3JkaW9uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkFjY29yZGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQpIGl0ZW1zOiBRdWVyeUxpc3Q8TWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudD47XG5cbiAgQElucHV0KClcbiAgZ2V0IGJvcmRlcmxlc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2JvcmRlcmxlc3M7XG4gIH1cbiAgc2V0IGJvcmRlcmxlc3ModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9ib3JkZXJsZXNzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9ib3JkZXJsZXNzID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZ2V0IGZsdXNoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mbHVzaDtcbiAgfVxuICBzZXQgZmx1c2godmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9mbHVzaCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZmx1c2ggPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tdWx0aXBsZSA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWNjb3JkaW9uJykgYWNjb3JkaW9uID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY29yZGlvbi1ib3JkZXJsZXNzJylcbiAgZ2V0IGFkZEJvcmRlcmxlc3NDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ib3JkZXJsZXNzO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY2NvcmRpb24tZmx1c2gnKVxuICBnZXQgYWRkRmx1c2hDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mbHVzaDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtcy5jaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHRoaXMuaXRlbXMpLFxuICAgICAgICBzd2l0Y2hNYXAoKGl0ZW1zOiBRdWVyeUxpc3Q8TWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudD4pID0+IHtcbiAgICAgICAgICByZXR1cm4gbWVyZ2UoLi4uaXRlbXMubWFwKChpdGVtOiBNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50KSA9PiBpdGVtLnNob3ckKSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChjbGlja2VkSXRlbTogTWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudCkgPT5cbiAgICAgICAgdGhpcy5faGFuZGxlTXVsdGlwbGVJdGVtcyhjbGlja2VkSXRlbSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNdWx0aXBsZUl0ZW1zKGNsaWNrZWRJdGVtOiBNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICBjb25zdCBpdGVtc1RvQ2xvc2UgPSB0aGlzLml0ZW1zLmZpbHRlcihcbiAgICAgICAgKGl0ZW06IE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQpID0+IGl0ZW0gIT09IGNsaWNrZWRJdGVtICYmICFpdGVtLl9jb2xsYXBzZWRcbiAgICAgICk7XG5cbiAgICAgIGl0ZW1zVG9DbG9zZS5mb3JFYWNoKChpdGVtOiBNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50KSA9PiBpdGVtLmhpZGUoKSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2JvcmRlcmxlc3M6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZsdXNoOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aXBsZTogQm9vbGVhbklucHV0O1xufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIl19