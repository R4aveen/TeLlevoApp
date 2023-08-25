import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbTooltipComponent {
    _cdRef;
    title;
    html;
    animation;
    tooltip = true;
    _hidden = new Subject();
    animationState = 'hidden';
    constructor(_cdRef) {
        this._cdRef = _cdRef;
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    onAnimationEnd(event) {
        if (event.toState === 'hidden') {
            this._hidden.next();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTooltipComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: MdbTooltipComponent, selector: "mdb-tooltip", inputs: { title: "title", html: "html", animation: "animation" }, host: { properties: { "class.tooltip": "this.tooltip" } }, ngImport: i0, template: "<div\n  *ngIf=\"html\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n  [innerHTML]=\"title\"\n  class=\"tooltip-inner\"\n></div>\n<div\n  *ngIf=\"!html\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n  class=\"tooltip-inner\"\n>\n  {{ title }}\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
            trigger('fade', [
                state('visible', style({ opacity: 1 })),
                state('hidden', style({ opacity: 0 })),
                transition('visible => hidden', animate('150ms linear')),
                transition(':enter', animate('150ms linear')),
            ]),
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbTooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-tooltip', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fade', [
                            state('visible', style({ opacity: 1 })),
                            state('hidden', style({ opacity: 0 })),
                            transition('visible => hidden', animate('150ms linear')),
                            transition(':enter', animate('150ms linear')),
                        ]),
                    ], template: "<div\n  *ngIf=\"html\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n  [innerHTML]=\"title\"\n  class=\"tooltip-inner\"\n></div>\n<div\n  *ngIf=\"!html\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n  class=\"tooltip-inner\"\n>\n  {{ title }}\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { title: [{
                type: Input
            }], html: [{
                type: Input
            }], animation: [{
                type: Input
            }], tooltip: [{
                type: HostBinding,
                args: ['class.tooltip']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFjL0IsTUFBTSxPQUFPLG1CQUFtQjtJQVdWO0lBVlgsS0FBSyxDQUFTO0lBQ2QsSUFBSSxDQUFVO0lBQ2QsU0FBUyxDQUFVO0lBRUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUVwQyxPQUFPLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7SUFFaEQsY0FBYyxHQUFHLFFBQVEsQ0FBQztJQUUxQixZQUFvQixNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtJQUFHLENBQUM7SUFFakQsWUFBWTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFxQjtRQUNsQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDO3VHQXJCVSxtQkFBbUI7MkZBQW5CLG1CQUFtQixnTEN0QmhDLHFYQWlCQSxrSURKYztZQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDeEQsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDOUMsQ0FBQztTQUNIOzsyRkFFVSxtQkFBbUI7a0JBYi9CLFNBQVM7K0JBQ0UsYUFBYSxtQkFFTix1QkFBdUIsQ0FBQyxNQUFNLGNBQ25DO3dCQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQUU7NEJBQ2QsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdEMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDeEQsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7eUJBQzlDLENBQUM7cUJBQ0g7d0dBR1EsS0FBSztzQkFBYixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUV3QixPQUFPO3NCQUFwQyxXQUFXO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uLCBzdGF0ZSwgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi10b29sdGlwJyxcbiAgdGVtcGxhdGVVcmw6ICd0b29sdGlwLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdmYWRlJywgW1xuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxuICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIGFuaW1hdGUoJzE1MG1zIGxpbmVhcicpKSxcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIGFuaW1hdGUoJzE1MG1zIGxpbmVhcicpKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVG9vbHRpcENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGh0bWw6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRvb2x0aXAnKSB0b29sdGlwID0gdHJ1ZTtcblxuICByZWFkb25seSBfaGlkZGVuOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBhbmltYXRpb25TdGF0ZSA9ICdoaWRkZW4nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgIHRoaXMuX2hpZGRlbi5uZXh0KCk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2XG4gICpuZ0lmPVwiaHRtbFwiXG4gIFtAZmFkZV09XCJhbmltYXRpb25TdGF0ZVwiXG4gIChAZmFkZS5kb25lKT1cIm9uQW5pbWF0aW9uRW5kKCRldmVudClcIlxuICBbQC5kaXNhYmxlZF09XCIhYW5pbWF0aW9uXCJcbiAgW2lubmVySFRNTF09XCJ0aXRsZVwiXG4gIGNsYXNzPVwidG9vbHRpcC1pbm5lclwiXG4+PC9kaXY+XG48ZGl2XG4gICpuZ0lmPVwiIWh0bWxcIlxuICBbQGZhZGVdPVwiYW5pbWF0aW9uU3RhdGVcIlxuICAoQGZhZGUuZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCJcbiAgW0AuZGlzYWJsZWRdPVwiIWFuaW1hdGlvblwiXG4gIGNsYXNzPVwidG9vbHRpcC1pbm5lclwiXG4+XG4gIHt7IHRpdGxlIH19XG48L2Rpdj5cbiJdfQ==