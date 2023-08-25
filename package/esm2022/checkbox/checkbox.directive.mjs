import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { EventEmitter, forwardRef, Input, Output, Directive, HostBinding, HostListener, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
export const MDB_CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => MdbCheckboxDirective),
    multi: true,
};
export class MdbCheckboxChange {
    element;
    checked;
}
export class MdbCheckboxDirective {
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._checked = coerceBooleanProperty(value);
    }
    _checked = false;
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    _value = null;
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    _disabled = false;
    checkboxChange = new EventEmitter();
    get isDisabled() {
        return this._disabled;
    }
    get isChecked() {
        return this._checked;
    }
    onCheckboxClick() {
        this.toggle();
    }
    onBlur() {
        this.onTouched();
    }
    constructor() { }
    get changeEvent() {
        const newChangeEvent = new MdbCheckboxChange();
        newChangeEvent.element = this;
        newChangeEvent.checked = this.checked;
        return newChangeEvent;
    }
    toggle() {
        if (this.disabled) {
            return;
        }
        this._checked = !this._checked;
        this.onChange(this.checked);
        this.onCheckboxChange();
    }
    onCheckboxChange() {
        this.checkboxChange.emit(this.changeEvent);
    }
    // Control Value Accessor Methods
    onChange = (_) => { };
    onTouched = () => { };
    writeValue(value) {
        this.value = value;
        this.checked = !!value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    static ngAcceptInputType_checked;
    static ngAcceptInputType_disabled;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCheckboxDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: MdbCheckboxDirective, selector: "[mdbCheckbox]", inputs: { checked: "checked", value: "value", disabled: "disabled" }, outputs: { checkboxChange: "checkboxChange" }, host: { listeners: { "click": "onCheckboxClick()", "blur": "onBlur()" }, properties: { "disabled": "this.isDisabled", "checked": "this.isChecked" } }, providers: [MDB_CHECKBOX_VALUE_ACCESSOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCheckboxDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbCheckbox]',
                    providers: [MDB_CHECKBOX_VALUE_ACCESSOR],
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { checked: [{
                type: Input,
                args: ['checked']
            }], value: [{
                type: Input,
                args: ['value']
            }], disabled: [{
                type: Input,
                args: ['disabled']
            }], checkboxChange: [{
                type: Output
            }], isDisabled: [{
                type: HostBinding,
                args: ['disabled']
            }], isChecked: [{
                type: HostBinding,
                args: ['checked']
            }], onCheckboxClick: [{
                type: HostListener,
                args: ['click']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2NoZWNrYm94L2NoZWNrYm94LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUNMLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFbkQsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQVE7SUFDOUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQix5RkFBeUY7SUFDekYsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixNQUFNLE9BQU8saUJBQWlCO0lBQzVCLE9BQU8sQ0FBdUI7SUFDOUIsT0FBTyxDQUFVO0NBQ2xCO0FBT0QsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ08sUUFBUSxHQUFHLEtBQUssQ0FBQztJQUV6QixJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNP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TCxZQUFZO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIERpcmVjdGl2ZSxcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IE1EQl9DSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWRiQ2hlY2tib3hEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjbGFzcyBNZGJDaGVja2JveENoYW5nZSB7XG4gIGVsZW1lbnQ6IE1kYkNoZWNrYm94RGlyZWN0aXZlO1xuICBjaGVja2VkOiBib29sZWFuO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiQ2hlY2tib3hdJyxcbiAgcHJvdmlkZXJzOiBbTURCX0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQ2hlY2tib3hEaXJlY3RpdmUge1xuICBASW5wdXQoJ2NoZWNrZWQnKVxuICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgfVxuICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NoZWNrZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2NoZWNrZWQgPSBmYWxzZTtcblxuICBASW5wdXQoJ3ZhbHVlJylcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcblxuICBASW5wdXQoJ2Rpc2FibGVkJylcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgY2hlY2tib3hDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNZGJDaGVja2JveENoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1kYkNoZWNrYm94Q2hhbmdlPigpO1xuXG4gIEBIb3N0QmluZGluZygnZGlzYWJsZWQnKVxuICBnZXQgaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NoZWNrZWQnKVxuICBnZXQgaXNDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNoZWNrYm94Q2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXQgY2hhbmdlRXZlbnQoKTogTWRiQ2hlY2tib3hDaGFuZ2Uge1xuICAgIGNvbnN0IG5ld0NoYW5nZUV2ZW50ID0gbmV3IE1kYkNoZWNrYm94Q2hhbmdlKCk7XG4gICAgbmV3Q2hhbmdlRXZlbnQuZWxlbWVudCA9IHRoaXM7XG4gICAgbmV3Q2hhbmdlRXZlbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICByZXR1cm4gbmV3Q2hhbmdlRXZlbnQ7XG4gIH1cblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY2hlY2tlZCA9ICF0aGlzLl9jaGVja2VkO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICB0aGlzLm9uQ2hlY2tib3hDaGFuZ2UoKTtcbiAgfVxuXG4gIG9uQ2hlY2tib3hDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2JveENoYW5nZS5lbWl0KHRoaXMuY2hhbmdlRXZlbnQpO1xuICB9XG5cbiAgLy8gQ29udHJvbCBWYWx1ZSBBY2Nlc3NvciBNZXRob2RzXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmNoZWNrZWQgPSAhIXZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NoZWNrZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=