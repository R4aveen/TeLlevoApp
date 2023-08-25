import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class MdbValidateDirective {
    renderer;
    _elementRef;
    _validate = true;
    _validateSuccess = true;
    _validateError = true;
    get mdbValidate() {
        return this._mdbValidate;
    }
    set mdbValidate(value) {
        this._mdbValidate = coerceBooleanProperty(value);
    }
    _mdbValidate;
    get validate() {
        return this._validate;
    }
    set validate(value) {
        this._validate = coerceBooleanProperty(value);
        this.updateErrorClass();
        this.updateSuccessClass();
    }
    get validateSuccess() {
        return this._validateSuccess;
    }
    set validateSuccess(value) {
        this._validateSuccess = coerceBooleanProperty(value);
        this.updateSuccessClass();
    }
    get validateError() {
        return this._validateError;
    }
    set validateError(value) {
        this._validateError = coerceBooleanProperty(value);
        this.updateErrorClass();
        this.updateSuccessClass();
    }
    constructor(renderer, _elementRef) {
        this.renderer = renderer;
        this._elementRef = _elementRef;
    }
    updateSuccessClass() {
        if (this.validate && this.validateSuccess) {
            this.renderer.addClass(this._elementRef.nativeElement, 'validate-success');
        }
        else {
            this.renderer.removeClass(this._elementRef.nativeElement, 'validate-success');
        }
    }
    updateErrorClass() {
        if (this.validate && this.validateError) {
            this.renderer.addClass(this._elementRef.nativeElement, 'validate-error');
        }
        else {
            this.renderer.removeClass(this._elementRef.nativeElement, 'validate-error');
        }
    }
    ngOnInit() {
        this.updateSuccessClass();
        this.updateErrorClass();
    }
    static ngAcceptInputType_mdbValidate;
    static ngAcceptInputType_validate;
    static ngAcceptInputType_validateSuccess;
    static ngAcceptInputType_validateError;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbValidateDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbValidateDirective, selector: "[mdbValidate]", inputs: { mdbValidate: "mdbValidate", validate: "validate", validateSuccess: "validateSuccess", validateError: "validateError" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbValidateDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbValidate]',
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { mdbValidate: [{
                type: Input
            }], validate: [{
                type: Input
            }], validateSuccess: [{
                type: Input
            }], validateError: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3ZhbGlkYXRpb24vdmFsaWRhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsU0FBUyxFQUFjLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7O0FBTWhGLE1BQU0sT0FBTyxvQkFBb0I7SUEyQ1g7SUFBNkI7SUExQ3pDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDakIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFFOUIsSUFDSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUFjO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNPLFlBQVksQ0FBVTtJQUU5QixJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFDSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLGVBQWUsQ0FBQyxLQUFjO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFDSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLGFBQWEsQ0FBQyxLQUFjO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFlBQW9CLFFBQW1CLEVBQVUsV0FBdUI7UUFBcEQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUU1RSxrQkFBa0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUM1RTthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUMvRTtJQUNILENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzFFO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzdFO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLDZCQUE2QixDQUFlO0lBQ25ELE1BQU0sQ0FBQywwQkFBMEIsQ0FBZTtJQUNoRCxNQUFNLENBQUMsaUNBQWlDLENBQWU7SUFDdkQsTUFBTSxDQUFDLCtCQUErQixDQUFlO3VHQXJFMUMsb0JBQW9COzJGQUFwQixvQkFBb0I7OzJGQUFwQixvQkFBb0I7a0JBSmhDLFNBQVM7bUJBQUM7b0JBQ1QsOERBQThEO29CQUM5RCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7eUhBT0ssV0FBVztzQkFEZCxLQUFLO2dCQVVGLFFBQVE7c0JBRFgsS0FBSztnQkFXRixlQUFlO3NCQURsQixLQUFLO2dCQVVGLGFBQWE7c0JBRGhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiVmFsaWRhdGVdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVmFsaWRhdGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIF92YWxpZGF0ZSA9IHRydWU7XG4gIHByaXZhdGUgX3ZhbGlkYXRlU3VjY2VzcyA9IHRydWU7XG4gIHByaXZhdGUgX3ZhbGlkYXRlRXJyb3IgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBtZGJWYWxpZGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbWRiVmFsaWRhdGU7XG4gIH1cbiAgc2V0IG1kYlZhbGlkYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbWRiVmFsaWRhdGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX21kYlZhbGlkYXRlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWxpZGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGU7XG4gIH1cbiAgc2V0IHZhbGlkYXRlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmFsaWRhdGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMudXBkYXRlRXJyb3JDbGFzcygpO1xuICAgIHRoaXMudXBkYXRlU3VjY2Vzc0NsYXNzKCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgdmFsaWRhdGVTdWNjZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZVN1Y2Nlc3M7XG4gIH1cbiAgc2V0IHZhbGlkYXRlU3VjY2Vzcyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3ZhbGlkYXRlU3VjY2VzcyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVTdWNjZXNzQ2xhc3MoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWxpZGF0ZUVycm9yKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUVycm9yO1xuICB9XG4gIHNldCB2YWxpZGF0ZUVycm9yKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmFsaWRhdGVFcnJvciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVFcnJvckNsYXNzKCk7XG4gICAgdGhpcy51cGRhdGVTdWNjZXNzQ2xhc3MoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICB1cGRhdGVTdWNjZXNzQ2xhc3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGUgJiYgdGhpcy52YWxpZGF0ZVN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsaWRhdGUtc3VjY2VzcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbGlkYXRlLXN1Y2Nlc3MnKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVFcnJvckNsYXNzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZhbGlkYXRlICYmIHRoaXMudmFsaWRhdGVFcnJvcikge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWxpZGF0ZS1lcnJvcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbGlkYXRlLWVycm9yJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTdWNjZXNzQ2xhc3MoKTtcbiAgICB0aGlzLnVwZGF0ZUVycm9yQ2xhc3MoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tZGJWYWxpZGF0ZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmFsaWRhdGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZhbGlkYXRlU3VjY2VzczogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmFsaWRhdGVFcnJvcjogQm9vbGVhbklucHV0O1xufVxuIl19