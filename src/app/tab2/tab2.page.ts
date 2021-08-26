import {Component, ElementRef, ViewChild} from '@angular/core';
import {Animation, AnimationController} from '@ionic/angular';
import * as Tone from 'tone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('leftMeter', {read: ElementRef, static: true}) leftMeter: ElementRef;
  @ViewChild('rightMeter', {read: ElementRef, static: true}) rightMeter: ElementRef;
  actualMeterLevel = 0;
  actualMeterLevelDisplay = 0;
  intervalVar;

  constructor(private animationCtrl: AnimationController) {
  }

  public ionViewDidEnter(): void {
    let randomNumber;
    this.intervalVar = setInterval(() => {
      randomNumber = (Math.random() * (1.0 - 0.5) + 0.5);
      this.actualMeterLevel = randomNumber * 400;

      if (this.actualMeterLevel <= 300) {
          this.rightMeter.nativeElement.children[1].setAttribute('height', this.actualMeterLevel);
          this.rightMeter.nativeElement.children[1].setAttribute('y', 400 - this.actualMeterLevel);
          this.rightMeter.nativeElement.children[2].setAttribute('height', 0);
          this.rightMeter.nativeElement.children[2].setAttribute('y', 400);
          this.rightMeter.nativeElement.children[3].setAttribute('height', 0);
          this.rightMeter.nativeElement.children[3].setAttribute('y', 400);
      }
      if (this.actualMeterLevel > 300 && this.actualMeterLevel <= 360) {
        this.rightMeter.nativeElement.children[1].setAttribute('height', 300);
        this.rightMeter.nativeElement.children[1].setAttribute('y', 400 - 300);
        this.rightMeter.nativeElement.children[2].setAttribute('height', this.actualMeterLevel - 300);
        this.rightMeter.nativeElement.children[2].setAttribute('y', 400 - 300);
        this.rightMeter.nativeElement.children[3].setAttribute('height', 0);
        this.rightMeter.nativeElement.children[3].setAttribute('y', 400);
      }
      if (this.actualMeterLevel > 360) {
        this.rightMeter.nativeElement.children[1].setAttribute('height', 300);
        this.rightMeter.nativeElement.children[1].setAttribute('y', 400 - 300);
        this.rightMeter.nativeElement.children[2].setAttribute('height', 60);
        this.rightMeter.nativeElement.children[2].setAttribute('y', 400 - 360);
        this.rightMeter.nativeElement.children[3].setAttribute('height', this.actualMeterLevel - 360);
        this.rightMeter.nativeElement.children[3].setAttribute('y', 400 - 360);
      }

      this.animateMeter();
    }, 500);
  }

   public animateMeter() {
    const animation1 = this.animationCtrl
      .create()
      .addElement(this.rightMeter.nativeElement.children[1])
      .addElement(this.rightMeter.nativeElement.children[2])
      .addElement(this.rightMeter.nativeElement.children[3])
      .duration(300)
      .iterations(1)
      .fromTo('transform', 'translateY(50px)', 'translateY(0px)');
     // .fromTo('opacity', '0.5', '1');

    animation1.play();

     const animation2 = this.animationCtrl
       .create()
       .delay(150)
       .addElement(this.rightMeter.nativeElement.children[1])
       .addElement(this.rightMeter.nativeElement.children[2])
       .addElement(this.rightMeter.nativeElement.children[3])
       .duration(300)
       .iterations(1)
       .fromTo('transform', 'translateY(0px)', 'translateY(50px)')
       .fromTo('opacity', '1', '0.8');

     animation2.play();
  }

  public ionViewWillLeave() {
    console.log('clearing interval');
    clearInterval(this.intervalVar);
  }
}
