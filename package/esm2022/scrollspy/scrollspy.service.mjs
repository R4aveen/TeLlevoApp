import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class MdbScrollspyService {
    scrollSpys = [];
    activeSubject = new Subject();
    active$ = this.activeSubject;
    addScrollspy(scrollSpy) {
        this.scrollSpys.push(scrollSpy);
    }
    removeScrollspy(scrollSpyId) {
        const scrollSpyIndex = this.scrollSpys.findIndex((spy) => {
            return spy.id === scrollSpyId;
        });
        this.scrollSpys.splice(scrollSpyIndex, 1);
    }
    updateActiveState(scrollSpyId, activeLinkId) {
        const scrollSpy = this.scrollSpys.find((spy) => {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        const activeLink = scrollSpy.links.find((link) => {
            return link.id === activeLinkId;
        });
        this.setActiveLink(activeLink);
    }
    removeActiveState(scrollSpyId, activeLinkId) {
        const scrollSpy = this.scrollSpys.find((spy) => {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        const activeLink = scrollSpy.links.find((link) => {
            return link.id === activeLinkId;
        });
        if (!activeLink) {
            return;
        }
        activeLink.active = false;
        activeLink.detectChanges();
    }
    setActiveLink(activeLink) {
        if (activeLink) {
            activeLink.active = true;
            activeLink.detectChanges();
            this.activeSubject.next(activeLink);
        }
    }
    removeActiveLinks(scrollSpyId) {
        const scrollSpy = this.scrollSpys.find((spy) => {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        scrollSpy.links.forEach((link) => {
            link.active = false;
            link.detectChanges();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbScrollspyService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbScrollspyService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: MdbScrollspyService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvc2Nyb2xsc3B5L3Njcm9sbHNweS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQzs7QUFRM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixVQUFVLEdBQW1CLEVBQUUsQ0FBQztJQUV4QixhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQTZCLENBQUM7SUFDakUsT0FBTyxHQUFvQixJQUFJLENBQUMsYUFBYSxDQUFDO0lBRTlDLFlBQVksQ0FBQyxTQUF1QjtRQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsZUFBZSxDQUFDLFdBQW1CO1FBQ2pDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdkQsT0FBTyxHQUFHLENBQUMsRUFBRSxLQUFLLFdBQVcsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsV0FBbUIsRUFBRSxZQUFvQjtRQUN6RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzdDLE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBRUQsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQyxPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssWUFBWSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsV0FBbUIsRUFBRSxZQUFvQjtRQUN6RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzdDLE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBRUQsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQyxPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssWUFBWSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE9BQU87U0FDUjtRQUVELFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzFCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQTJDO1FBQ3ZELElBQUksVUFBVSxFQUFFO1lBQ2QsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDekIsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELGlCQUFpQixDQUFDLFdBQW1CO1FBQ25DLE1BQU0sU0FBUyxHQUE2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3ZFLE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBRUQsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3VHQTNFVSxtQkFBbUI7MkdBQW5CLG1CQUFtQjs7MkZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiU2Nyb2xsc3B5TGlua0RpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsc3B5LWxpbmsuZGlyZWN0aXZlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBNZGJTY3JvbGxzcHkge1xuICBpZDogc3RyaW5nO1xuICBsaW5rczogUXVlcnlMaXN0PE1kYlNjcm9sbHNweUxpbmtEaXJlY3RpdmU+O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWRiU2Nyb2xsc3B5U2VydmljZSB7XG4gIHNjcm9sbFNweXM6IE1kYlNjcm9sbHNweVtdID0gW107XG5cbiAgcHJpdmF0ZSBhY3RpdmVTdWJqZWN0ID0gbmV3IFN1YmplY3Q8TWRiU2Nyb2xsc3B5TGlua0RpcmVjdGl2ZT4oKTtcbiAgYWN0aXZlJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5hY3RpdmVTdWJqZWN0O1xuXG4gIGFkZFNjcm9sbHNweShzY3JvbGxTcHk6IE1kYlNjcm9sbHNweSk6IHZvaWQge1xuICAgIHRoaXMuc2Nyb2xsU3B5cy5wdXNoKHNjcm9sbFNweSk7XG4gIH1cblxuICByZW1vdmVTY3JvbGxzcHkoc2Nyb2xsU3B5SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbFNweUluZGV4ID0gdGhpcy5zY3JvbGxTcHlzLmZpbmRJbmRleCgoc3B5KSA9PiB7XG4gICAgICByZXR1cm4gc3B5LmlkID09PSBzY3JvbGxTcHlJZDtcbiAgICB9KTtcbiAgICB0aGlzLnNjcm9sbFNweXMuc3BsaWNlKHNjcm9sbFNweUluZGV4LCAxKTtcbiAgfVxuXG4gIHVwZGF0ZUFjdGl2ZVN0YXRlKHNjcm9sbFNweUlkOiBzdHJpbmcsIGFjdGl2ZUxpbmtJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc2Nyb2xsU3B5ID0gdGhpcy5zY3JvbGxTcHlzLmZpbmQoKHNweSkgPT4ge1xuICAgICAgcmV0dXJuIHNweS5pZCA9PT0gc2Nyb2xsU3B5SWQ7XG4gICAgfSk7XG5cbiAgICBpZiAoIXNjcm9sbFNweSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSBzY3JvbGxTcHkubGlua3MuZmluZCgobGluaykgPT4ge1xuICAgICAgcmV0dXJuIGxpbmsuaWQgPT09IGFjdGl2ZUxpbmtJZDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0QWN0aXZlTGluayhhY3RpdmVMaW5rKTtcbiAgfVxuXG4gIHJlbW92ZUFjdGl2ZVN0YXRlKHNjcm9sbFNweUlkOiBzdHJpbmcsIGFjdGl2ZUxpbmtJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc2Nyb2xsU3B5ID0gdGhpcy5zY3JvbGxTcHlzLmZpbmQoKHNweSkgPT4ge1xuICAgICAgcmV0dXJuIHNweS5pZCA9PT0gc2Nyb2xsU3B5SWQ7XG4gICAgfSk7XG5cbiAgICBpZiAoIXNjcm9sbFNweSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSBzY3JvbGxTcHkubGlua3MuZmluZCgobGluaykgPT4ge1xuICAgICAgcmV0dXJuIGxpbmsuaWQgPT09IGFjdGl2ZUxpbmtJZDtcbiAgICB9KTtcblxuICAgIGlmICghYWN0aXZlTGluaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2ZUxpbmsuYWN0aXZlID0gZmFsc2U7XG4gICAgYWN0aXZlTGluay5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBzZXRBY3RpdmVMaW5rKGFjdGl2ZUxpbms6IE1kYlNjcm9sbHNweUxpbmtEaXJlY3RpdmUgfCBhbnkpOiB2b2lkIHtcbiAgICBpZiAoYWN0aXZlTGluaykge1xuICAgICAgYWN0aXZlTGluay5hY3RpdmUgPSB0cnVlO1xuICAgICAgYWN0aXZlTGluay5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLmFjdGl2ZVN1YmplY3QubmV4dChhY3RpdmVMaW5rKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBY3RpdmVMaW5rcyhzY3JvbGxTcHlJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc2Nyb2xsU3B5OiBNZGJTY3JvbGxzcHkgfCB1bmRlZmluZWQgPSB0aGlzLnNjcm9sbFNweXMuZmluZCgoc3B5KSA9PiB7XG4gICAgICByZXR1cm4gc3B5LmlkID09PSBzY3JvbGxTcHlJZDtcbiAgICB9KTtcblxuICAgIGlmICghc2Nyb2xsU3B5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2Nyb2xsU3B5LmxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgIGxpbmsuYWN0aXZlID0gZmFsc2U7XG4gICAgICBsaW5rLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19