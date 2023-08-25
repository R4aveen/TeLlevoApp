import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare const RANGE_VALUE_ACCESOR: any;
export declare class MdbRangeComponent implements ControlValueAccessor, AfterViewInit {
    private _cdRef;
    input: ElementRef;
    thumb: ElementRef;
    thumbValue: ElementRef;
    id: string;
    required: boolean;
    name: string;
    value: string;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    label: string;
    min: number;
    max: number;
    step: number;
    get default(): boolean;
    set default(value: boolean);
    private _default;
    defaultRangeCounterClass: string;
    rangeValueChange: EventEmitter<any>;
    visibility: boolean;
    thumbStyle: any;
    onchange(event: any): void;
    onInput(): void;
    constructor(_cdRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    focusRangeInput(): void;
    blurRangeInput(): void;
    thumbPositionUpdate(): void;
    onChange: (_: any) => void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ngAcceptInputType_default: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbRangeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbRangeComponent, "mdb-range", never, { "id": { "alias": "id"; "required": false; }; "required": { "alias": "required"; "required": false; }; "name": { "alias": "name"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "label": { "alias": "label"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "step": { "alias": "step"; "required": false; }; "default": { "alias": "default"; "required": false; }; "defaultRangeCounterClass": { "alias": "defaultRangeCounterClass"; "required": false; }; }, { "rangeValueChange": "rangeValueChange"; }, never, never, false, never>;
}
