import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Directive, Input, Output, HostBinding, HostListener, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const MDB_CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => MdbCheckboxDirective),
    multi: true,
};
class MdbCheckboxChange {
    element;
    checked;
}
class MdbCheckboxDirective {
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

class MdbCheckboxModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: MdbCheckboxModule, declarations: [MdbCheckboxDirective], imports: [CommonModule, FormsModule], exports: [MdbCheckboxDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCheckboxModule, imports: [CommonModule, FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbCheckboxDirective],
                    exports: [MdbCheckboxDirective],
                    imports: [CommonModule, FormsModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MDB_CHECKBOX_VALUE_ACCESSOR, MdbCheckboxChange, MdbCheckboxDirective, MdbCheckboxModule };
//# sourceMappingURL=mdb-angular-ui-kit-checkbox.mjs.map
