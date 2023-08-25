import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewInit, DoCheck, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MdbAbstractFormControl } from './form-control';
import { AutofillMonitor } from '@angular/cdk/text-field';
import * as i0 from "@angular/core";
export declare class MdbInputDirective implements MdbAbstractFormControl<any>, DoCheck, AfterViewInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _ngControl;
    private _autofill;
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _ngControl: NgControl, _autofill: AutofillMonitor);
    readonly stateChanges: Subject<void>;
    private _focused;
    private _autofilled;
    private _color;
    ngAfterViewInit(): void;
    private _currentNativeValue;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    get readonly(): boolean;
    set readonly(value: boolean);
    private _readonly;
    get value(): string;
    set value(value: string);
    private _value;
    private _updateTextColorForDateType;
    _onFocus(): void;
    _onBlur(): void;
    ngDoCheck(): void;
    get hasValue(): boolean;
    get focused(): boolean;
    get autofilled(): boolean;
    get input(): HTMLInputElement;
    get labelActive(): boolean;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_readonly: BooleanInput;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbInputDirective, [null, null, { optional: true; self: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MdbInputDirective, "[mdbInput]", ["mdbInput"], { "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, never, false, never>;
}
