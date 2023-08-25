import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const RANGE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => MdbRangeComponent),
    multi: true,
};
export class MdbRangeComponent {
    _cdRef;
    input;
    thumb;
    thumbValue;
    id;
    required;
    name;
    value;
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    _disabled;
    label;
    min = 0;
    max = 100;
    step;
    get default() {
        return this._default;
    }
    set default(value) {
        this._default = value;
    }
    _default;
    defaultRangeCounterClass;
    rangeValueChange = new EventEmitter();
    visibility = false;
    thumbStyle;
    onchange(event) {
        this.onChange(event.target.value);
    }
    onInput() {
        this.rangeValueChange.emit({ value: this.value });
        this.focusRangeInput();
    }
    constructor(_cdRef) {
        this._cdRef = _cdRef;
    }
    ngAfterViewInit() {
        this.thumbPositionUpdate();
    }
    focusRangeInput() {
        this.input.nativeElement.focus();
        this.visibility = true;
    }
    blurRangeInput() {
        this.input.nativeElement.blur();
        this.visibility = false;
    }
    thumbPositionUpdate() {
        const rangeInput = this.input.nativeElement;
        const inputValue = rangeInput.value;
        const minValue = rangeInput.min ? rangeInput.min : 0;
        const maxValue = rangeInput.max ? rangeInput.max : 100;
        const newValue = Number(((inputValue - minValue) * 100) / (maxValue - minValue));
        this.value = inputValue;
        this.thumbStyle = { left: `calc(${newValue}% + (${8 - newValue * 0.15}px))` };
    }
    // Control Value Accessor Methods
    onChange = (_) => { };
    onTouched = () => { };
    writeValue(value) {
        this.value = value;
        this._cdRef.markForCheck();
        setTimeout(() => {
            this.thumbPositionUpdate();
        }, 0);
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
    static ngAcceptInputType_default;
    static ngAcceptInputType_disabled;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbRangeComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbRangeComponent, selector: "mdb-range", inputs: { id: "id", required: "required", name: "name", value: "value", disabled: "disabled", label: "label", min: "min", max: "max", step: "step", default: "default", defaultRangeCounterClass: "defaultRangeCounterClass" }, outputs: { rangeValueChange: "rangeValueChange" }, host: { listeners: { "change": "onchange($event)", "input": "onInput()" } }, providers: [RANGE_VALUE_ACCESOR], viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true }, { propertyName: "thumb", first: true, predicate: ["thumb"], descendants: true }, { propertyName: "thumbValue", first: true, predicate: ["thumbValue"], descendants: true }], ngImport: i0, template: "<label for=\"id\" class=\"form-label\">{{ label }}</label>\n<div class=\"range\">\n  <input\n    #input\n    [name]=\"name\"\n    type=\"range\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [value]=\"value\"\n    class=\"form-range\"\n    min=\"0\"\n    max=\"5\"\n    [id]=\"id\"\n    (input)=\"thumbPositionUpdate()\"\n    (blur)=\"blurRangeInput()\"\n    (mousedown)=\"focusRangeInput()\"\n    (mouseup)=\"blurRangeInput()\"\n    (touchstart)=\"focusRangeInput()\"\n    (touchend)=\"blurRangeInput()\"\n  />\n  <span #thumb class=\"thumb\" [ngStyle]=\"thumbStyle\" [ngClass]=\"{ 'thumb-active': this.visibility }\">\n    <span #thumbValue class=\"thumb-value\">{{ value }}</span>\n  </span>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbRangeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-range', changeDetection: ChangeDetectionStrategy.OnPush, providers: [RANGE_VALUE_ACCESOR], template: "<label for=\"id\" class=\"form-label\">{{ label }}</label>\n<div class=\"range\">\n  <input\n    #input\n    [name]=\"name\"\n    type=\"range\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [value]=\"value\"\n    class=\"form-range\"\n    min=\"0\"\n    max=\"5\"\n    [id]=\"id\"\n    (input)=\"thumbPositionUpdate()\"\n    (blur)=\"blurRangeInput()\"\n    (mousedown)=\"focusRangeInput()\"\n    (mouseup)=\"blurRangeInput()\"\n    (touchstart)=\"focusRangeInput()\"\n    (touchend)=\"blurRangeInput()\"\n  />\n  <span #thumb class=\"thumb\" [ngStyle]=\"thumbStyle\" [ngClass]=\"{ 'thumb-active': this.visibility }\">\n    <span #thumbValue class=\"thumb-value\">{{ value }}</span>\n  </span>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { input: [{
                type: ViewChild,
                args: ['input']
            }], thumb: [{
                type: ViewChild,
                args: ['thumb']
            }], thumbValue: [{
                type: ViewChild,
                args: ['thumbValue']
            }], id: [{
                type: Input
            }], required: [{
                type: Input
            }], name: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], label: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], step: [{
                type: Input
            }], default: [{
                type: Input
            }], defaultRangeCounterClass: [{
                type: Input
            }], rangeValueChange: [{
                type: Output
            }], onchange: [{
                type: HostListener,
                args: ['change', ['$event']]
            }], onInput: [{
                type: HostListener,
                args: ['input']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3JhbmdlL3JhbmdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9yYW5nZS9yYW5nZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFekUsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQix5RkFBeUY7SUFDekYsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFPRixNQUFNLE9BQU8saUJBQWlCO0lBaURSO0lBaERBLEtBQUssQ0FBYTtJQUNsQixLQUFLLENBQWE7SUFDYixVQUFVLENBQWE7SUFFdkMsRUFBRSxDQUFTO0lBQ1gsUUFBUSxDQUFVO0lBQ2xCLElBQUksQ0FBUztJQUNiLEtBQUssQ0FBUztJQUV2QixJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ08sU0FBUyxDQUFVO0lBRWxCLEtBQUssQ0FB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OUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNLENBQUMseUJBQXlCLENBQWU7SUFDL0MsTUFBTSxDQUFDLDBCQUEwQixDQUFlO3VHQXZHckMsaUJBQWlCOzJGQUFqQixpQkFBaUIsb1lBRmpCLENBQUMsbUJBQW1CLENBQUMsc1NDMUJsQyxrd0JBMkJBOzsyRkRDYSxpQkFBaUI7a0JBTjdCLFNBQVM7K0JBQ0UsV0FBVyxtQkFFSix1QkFBdUIsQ0FBQyxNQUFNLGFBQ3BDLENBQUMsbUJBQW1CLENBQUM7d0dBR1osS0FBSztzQkFBeEIsU0FBUzt1QkFBQyxPQUFPO2dCQUNFLEtBQUs7c0JBQXhCLFNBQVM7dUJBQUMsT0FBTztnQkFDTyxVQUFVO3NCQUFsQyxTQUFTO3VCQUFDLFlBQVk7Z0JBRWQsRUFBRTtzQkFBVixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFHRixRQUFRO3NCQURYLEtBQUs7Z0JBU0csS0FBSztzQkFBYixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUdGLE9BQU87c0JBRFYsS0FBSztnQkFTRyx3QkFBd0I7c0JBQWhDLEtBQUs7Z0JBRUksZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUs2QixRQUFRO3NCQUEzQyxZQUFZO3VCQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFJWCxPQUFPO3NCQUE3QixZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBSQU5HRV9WQUxVRV9BQ0NFU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIEB0eXBlc2NyaXB0LWVzbGludC9uby11c2UtYmVmb3JlLWRlZmluZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZGJSYW5nZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1yYW5nZScsXG4gIHRlbXBsYXRlVXJsOiAncmFuZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbUkFOR0VfVkFMVUVfQUNDRVNPUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlJhbmdlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd0aHVtYicpIHRodW1iOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd0aHVtYlZhbHVlJykgdGh1bWJWYWx1ZTogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1pbiA9IDA7XG4gIEBJbnB1dCgpIG1heCA9IDEwMDtcbiAgQElucHV0KCkgc3RlcDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkZWZhdWx0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0O1xuICB9XG4gIHNldCBkZWZhdWx0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGVmYXVsdCA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2RlZmF1bHQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgZGVmYXVsdFJhbmdlQ291bnRlckNsYXNzOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIHJhbmdlVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgdmlzaWJpbGl0eSA9IGZhbHNlO1xuICBwdWJsaWMgdGh1bWJTdHlsZTogYW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50J10pIG9uY2hhbmdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcpIG9uSW5wdXQoKTogdm9pZCB7XG4gICAgdGhpcy5yYW5nZVZhbHVlQ2hhbmdlLmVtaXQoeyB2YWx1ZTogdGhpcy52YWx1ZSB9KTtcbiAgICB0aGlzLmZvY3VzUmFuZ2VJbnB1dCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRodW1iUG9zaXRpb25VcGRhdGUoKTtcbiAgfVxuXG4gIGZvY3VzUmFuZ2VJbnB1dCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLnZpc2liaWxpdHkgPSB0cnVlO1xuICB9XG5cbiAgYmx1clJhbmdlSW5wdXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLnZpc2liaWxpdHkgPSBmYWxzZTtcbiAgfVxuXG4gIHRodW1iUG9zaXRpb25VcGRhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgcmFuZ2VJbnB1dCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gcmFuZ2VJbnB1dC52YWx1ZTtcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHJhbmdlSW5wdXQubWluID8gcmFuZ2VJbnB1dC5taW4gOiAwO1xuICAgIGNvbnN0IG1heFZhbHVlID0gcmFuZ2VJbnB1dC5tYXggPyByYW5nZUlucHV0Lm1heCA6IDEwMDtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IE51bWJlcigoKGlucHV0VmFsdWUgLSBtaW5WYWx1ZSkgKiAxMDApIC8gKG1heFZhbHVlIC0gbWluVmFsdWUpKTtcblxuICAgIHRoaXMudmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgIHRoaXMudGh1bWJTdHlsZSA9IHsgbGVmdDogYGNhbGMoJHtuZXdWYWx1ZX0lICsgKCR7OCAtIG5ld1ZhbHVlICogMC4xNX1weCkpYCB9O1xuICB9XG5cbiAgLy8gQ29udHJvbCBWYWx1ZSBBY2Nlc3NvciBNZXRob2RzXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRodW1iUG9zaXRpb25VcGRhdGUoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kZWZhdWx0OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIiwiPGxhYmVsIGZvcj1cImlkXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+e3sgbGFiZWwgfX08L2xhYmVsPlxuPGRpdiBjbGFzcz1cInJhbmdlXCI+XG4gIDxpbnB1dFxuICAgICNpbnB1dFxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICBbaWRdPVwiaWRcIlxuICAgIFttaW5dPVwibWluXCJcbiAgICBbbWF4XT1cIm1heFwiXG4gICAgW3N0ZXBdPVwic3RlcFwiXG4gICAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICBjbGFzcz1cImZvcm0tcmFuZ2VcIlxuICAgIG1pbj1cIjBcIlxuICAgIG1heD1cIjVcIlxuICAgIFtpZF09XCJpZFwiXG4gICAgKGlucHV0KT1cInRodW1iUG9zaXRpb25VcGRhdGUoKVwiXG4gICAgKGJsdXIpPVwiYmx1clJhbmdlSW5wdXQoKVwiXG4gICAgKG1vdXNlZG93bik9XCJmb2N1c1JhbmdlSW5wdXQoKVwiXG4gICAgKG1vdXNldXApPVwiYmx1clJhbmdlSW5wdXQoKVwiXG4gICAgKHRvdWNoc3RhcnQpPVwiZm9jdXNSYW5nZUlucHV0KClcIlxuICAgICh0b3VjaGVuZCk9XCJibHVyUmFuZ2VJbnB1dCgpXCJcbiAgLz5cbiAgPHNwYW4gI3RodW1iIGNsYXNzPVwidGh1bWJcIiBbbmdTdHlsZV09XCJ0aHVtYlN0eWxlXCIgW25nQ2xhc3NdPVwieyAndGh1bWItYWN0aXZlJzogdGhpcy52aXNpYmlsaXR5IH1cIj5cbiAgICA8c3BhbiAjdGh1bWJWYWx1ZSBjbGFzcz1cInRodW1iLXZhbHVlXCI+e3sgdmFsdWUgfX08L3NwYW4+XG4gIDwvc3Bhbj5cbjwvZGl2PlxuIl19