import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector, TemplateRef, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { MdbModalConfig } from './modal-config';
import { MdbModalContainerComponent } from './modal-container.component';
import { MdbModalRef } from './modal-ref';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class MdbModalService {
    _document;
    _overlay;
    _injector;
    _cfr;
    constructor(_document, _overlay, _injector, _cfr) {
        this._document = _document;
        this._overlay = _overlay;
        this._injector = _injector;
        this._cfr = _cfr;
    }
    open(componentOrTemplateRef, config) {
        const defaultConfig = new MdbModalConfig();
        config = config ? Object.assign(defaultConfig, config) : defaultConfig;
        const overlayRef = this._createOverlay(config);
        const container = this._createContainer(overlayRef, config);
        const modalRef = this._createContent(componentOrTemplateRef, container, overlayRef, config);
        this._registerListeners(modalRef, config, container);
        return modalRef;
    }
    _createOverlay(config) {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }
    _getOverlayConfig(modalConfig) {
        const config = new OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            scrollStrategy: this._overlay.scrollStrategies.noop(),
            hasBackdrop: modalConfig.nonInvasive ? false : modalConfig.backdrop,
            backdropClass: 'mdb-backdrop',
        });
        return config;
    }
    _createContainer(overlayRef, config) {
        const portal = new ComponentPortal(MdbModalContainerComponent, null, this._injector, this._cfr);
        const containerRef = overlayRef.attach(portal);
        containerRef.instance._config = config;
        return containerRef.instance;
    }
    _createContent(componentOrTemplate, container, overlayRef, config) {
        const modalRef = new MdbModalRef(overlayRef, container);
        if (componentOrTemplate instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplate, null, {
                $implicit: config.data,
                modalRef,
            }));
        }
        else {
            const injector = this._createInjector(config, modalRef, container);
            const contentRef = container.attachComponentPortal(new ComponentPortal(componentOrTemplate, config.viewContainerRef, injector));
            if (config.data) {
                Object.assign(contentRef.instance, { ...config.data });
            }
            modalRef.component = contentRef.instance;
        }
        return modalRef;
    }
    _createInjector(config, modalRef, container) {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        // The dialog container should be provided as the dialog container and the dialog's
        // content are created out of the same `ViewContainerRef` and as such, are siblings
        // for injector purposes. To allow the hierarchy that is expected, the dialog
        // container is explicitly provided in the injector.
        const providers = [
            { provide: MdbModalContainerComponent, useValue: container },
            { provide: MdbModalRef, useValue: modalRef },
        ];
        return Injector.create({ parent: userInjector || this._injector, providers });
    }
    _registerListeners(modalRef, config, container) {
        container.backdropClick$.pipe(take(1)).subscribe(() => {
            modalRef.close();
        });
        if (config.keyboard) {
            fromEvent(container._elementRef.nativeElement, 'keydown')
                .pipe(filter((event) => {
                return event.key === 'Escape';
            }), take(1))
                .subscribe(() => {
                modalRef.close();
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbModalService, deps: [{ token: DOCUMENT }, { token: i1.Overlay }, { token: i0.Injector }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbModalService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbModalService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.Overlay }, { type: i0.Injector }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9tb2RhbC9tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBVyxhQUFhLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFpQixjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUVMLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUVSLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQUcxQyxNQUFNLE9BQU8sZUFBZTtJQUVFO0lBQ2xCO0lBQ0E7SUFDQTtJQUpWLFlBQzRCLFNBQVMsRUFDM0IsUUFBaUIsRUFDakIsU0FBbUIsRUFDbkIsSUFBOEI7UUFIWixjQUFTLEdBQVQsU0FBUyxDQUFBO1FBQzNCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixTQUFJLEdBQUosSUFBSSxDQUEwQjtJQUNyQyxDQUFDO0lBRUosSUFBSSxDQUNGLHNCQUF5RCxFQUN6RCxNQUEwQjtRQUUxQixNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQzNDLE1BQU0sR0FBRyxNQUFNLENBQUMs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QUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7dUdBekhVLGVBQWUsa0JBRWhCLFFBQVE7MkdBRlAsZUFBZTs7MkZBQWYsZUFBZTtrQkFEM0IsVUFBVTs7MEJBR04sTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgQ29tcG9uZW50VHlwZSwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgU3RhdGljUHJvdmlkZXIsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWRiTW9kYWxDb25maWcgfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XG5pbXBvcnQgeyBNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1kYk1vZGFsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50LFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgX2NmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICkge31cblxuICBvcGVuPFQsIEQgPSBhbnk+KFxuICAgIGNvbXBvbmVudE9yVGVtcGxhdGVSZWY6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcbiAgICBjb25maWc/OiBNZGJNb2RhbENvbmZpZzxEPlxuICApOiBNZGJNb2RhbFJlZjxUPiB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IG5ldyBNZGJNb2RhbENvbmZpZygpO1xuICAgIGNvbmZpZyA9IGNvbmZpZyA/IE9iamVjdC5hc3NpZ24oZGVmYXVsdENvbmZpZywgY29uZmlnKSA6IGRlZmF1bHRDb25maWc7XG5cbiAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5fY3JlYXRlT3ZlcmxheShjb25maWcpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2NyZWF0ZUNvbnRhaW5lcihvdmVybGF5UmVmLCBjb25maWcpO1xuICAgIGNvbnN0IG1vZGFsUmVmID0gdGhpcy5fY3JlYXRlQ29udGVudChjb21wb25lbnRPclRlbXBsYXRlUmVmLCBjb250YWluZXIsIG92ZXJsYXlSZWYsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl9yZWdpc3Rlckxpc3RlbmVyczxUPihtb2RhbFJlZiwgY29uZmlnLCBjb250YWluZXIpO1xuXG4gICAgcmV0dXJuIG1vZGFsUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheShjb25maWc6IE1kYk1vZGFsQ29uZmlnKTogT3ZlcmxheVJlZiB7XG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IHRoaXMuX2dldE92ZXJsYXlDb25maWcoY29uZmlnKTtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPdmVybGF5Q29uZmlnKG1vZGFsQ29uZmlnOiBNZGJNb2RhbENvbmZpZyk6IE92ZXJsYXlDb25maWcge1xuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMubm9vcCgpLFxuICAgICAgaGFzQmFja2Ryb3A6IG1vZGFsQ29uZmlnLm5vbkludmFzaXZlID8gZmFsc2UgOiBtb2RhbENvbmZpZy5iYWNrZHJvcCxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6ICdtZGItYmFja2Ryb3AnLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUNvbnRhaW5lcihcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxuICAgIGNvbmZpZzogTWRiTW9kYWxDb25maWdcbiAgKTogTWRiTW9kYWxDb250YWluZXJDb21wb25lbnQge1xuICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoTWRiTW9kYWxDb250YWluZXJDb21wb25lbnQsIG51bGwsIHRoaXMuX2luamVjdG9yLCB0aGlzLl9jZnIpO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlZiA9IG92ZXJsYXlSZWYuYXR0YWNoKHBvcnRhbCk7XG4gICAgY29udGFpbmVyUmVmLmluc3RhbmNlLl9jb25maWcgPSBjb25maWc7XG4gICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUNvbnRlbnQ8VD4oXG4gICAgY29tcG9uZW50T3JUZW1wbGF0ZTogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgIGNvbnRhaW5lcjogTWRiTW9kYWxDb250YWluZXJDb21wb25lbnQsXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICBjb25maWc6IE1kYk1vZGFsQ29uZmlnXG4gICk6IE1kYk1vZGFsUmVmPFQ+IHtcbiAgICBjb25zdCBtb2RhbFJlZjogTWRiTW9kYWxSZWY8VD4gPSBuZXcgTWRiTW9kYWxSZWYob3ZlcmxheVJlZiwgY29udGFpbmVyKTtcblxuICAgIGlmIChjb21wb25lbnRPclRlbXBsYXRlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnRhaW5lci5hdHRhY2hUZW1wbGF0ZVBvcnRhbChcbiAgICAgICAgbmV3IFRlbXBsYXRlUG9ydGFsPFQ+KGNvbXBvbmVudE9yVGVtcGxhdGUsIG51bGwsIHtcbiAgICAgICAgICAkaW1wbGljaXQ6IGNvbmZpZy5kYXRhLFxuICAgICAgICAgIG1vZGFsUmVmLFxuICAgICAgICB9IGFzIGFueSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluamVjdG9yID0gdGhpcy5fY3JlYXRlSW5qZWN0b3I8VD4oY29uZmlnLCBtb2RhbFJlZiwgY29udGFpbmVyKTtcbiAgICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBjb250YWluZXIuYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KFxuICAgICAgICBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudE9yVGVtcGxhdGUsIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmLCBpbmplY3RvcilcbiAgICAgICk7XG5cbiAgICAgIGlmIChjb25maWcuZGF0YSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNvbnRlbnRSZWYuaW5zdGFuY2UsIHsgLi4uY29uZmlnLmRhdGEgfSk7XG4gICAgICB9XG5cbiAgICAgIG1vZGFsUmVmLmNvbXBvbmVudCA9IGNvbnRlbnRSZWYuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGFsUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSW5qZWN0b3I8VD4oXG4gICAgY29uZmlnOiBNZGJNb2RhbENvbmZpZyxcbiAgICBtb2RhbFJlZjogTWRiTW9kYWxSZWY8VD4sXG4gICAgY29udGFpbmVyOiBNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudFxuICApOiBJbmplY3RvciB7XG4gICAgY29uc3QgdXNlckluamVjdG9yID0gY29uZmlnICYmIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmICYmIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmLmluamVjdG9yO1xuXG4gICAgLy8gVGhlIGRpYWxvZyBjb250YWluZXIgc2hvdWxkIGJlIHByb3ZpZGVkIGFzIHRoZSBkaWFsb2cgY29udGFpbmVyIGFuZCB0aGUgZGlhbG9nJ3NcbiAgICAvLyBjb250ZW50IGFyZSBjcmVhdGVkIG91dCBvZiB0aGUgc2FtZSBgVmlld0NvbnRhaW5lclJlZmAgYW5kIGFzIHN1Y2gsIGFyZSBzaWJsaW5nc1xuICAgIC8vIGZvciBpbmplY3RvciBwdXJwb3Nlcy4gVG8gYWxsb3cgdGhlIGhpZXJhcmNoeSB0aGF0IGlzIGV4cGVjdGVkLCB0aGUgZGlhbG9nXG4gICAgLy8gY29udGFpbmVyIGlzIGV4cGxpY2l0bHkgcHJvdmlkZWQgaW4gdGhlIGluamVjdG9yLlxuICAgIGNvbnN0IHByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAgICAgIHsgcHJvdmlkZTogTWRiTW9kYWxDb250YWluZXJDb21wb25lbnQsIHVzZVZhbHVlOiBjb250YWluZXIgfSxcbiAgICAgIHsgcHJvdmlkZTogTWRiTW9kYWxSZWYsIHVzZVZhbHVlOiBtb2RhbFJlZiB9LFxuICAgIF07XG5cbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKHsgcGFyZW50OiB1c2VySW5qZWN0b3IgfHwgdGhpcy5faW5qZWN0b3IsIHByb3ZpZGVycyB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyTGlzdGVuZXJzPFQ+KFxuICAgIG1vZGFsUmVmOiBNZGJNb2RhbFJlZjxUPixcbiAgICBjb25maWc6IE1kYk1vZGFsQ29uZmlnLFxuICAgIGNvbnRhaW5lcjogTWRiTW9kYWxDb250YWluZXJDb21wb25lbnRcbiAgKTogdm9pZCB7XG4gICAgY29udGFpbmVyLmJhY2tkcm9wQ2xpY2skLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIG1vZGFsUmVmLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICBmcm9tRXZlbnQoY29udGFpbmVyLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmtleSA9PT0gJ0VzY2FwZSc7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGFrZSgxKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIG1vZGFsUmVmLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19