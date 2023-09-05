import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements AfterViewInit {
  @ViewChild('hola') hola!: ElementRef;

  constructor(
    private router: Router,
    private aniCtrl: AnimationController
  ) { }
  
  ngAfterViewInit(): void {
    const mi_animacion=this.aniCtrl.create()
    .addElement(this.hola.nativeElement)
    .duration(7000)
    .iterations(Infinity)
    .keyframes([
      { offset: 0, width: '80px' },
      { offset: 0.72, width: 'var(--width)' },
      { offset: 1, width: '240px' },
    ]);
    mi_animacion.play();
  }

  ngOnInit() {
    setTimeout(()=>{
      this.router.navigate(['pag1']);
    }, 7000);
  }

}
