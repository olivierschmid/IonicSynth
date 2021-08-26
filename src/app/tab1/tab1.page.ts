import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as Tone from 'tone';
import {GestureController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('myCanvas') canvas: any;
  @ViewChild('gestureBox') gestureBox: ElementRef;

  canvasElement: any;

  public attackValue = 0.2;
  public releaseValue = 1;
  public portamento = 0;

  private synth = new Tone.PolySynth(Tone.Synth).toDestination();
  private notes = ['C4','D4','E4','F4','G4', 'A4', 'B4', 'C5', 'D5','E5','F5','G5', 'A5', 'B5' ,'C6' ,'D6'];
  private notesChrom = ['C4','C#4','D4','D#4','E4', 'F4', 'F#4', 'G4', 'G#4','A4','A#4','B4', 'C5', 'C#5' ,'D5' ,'D#5'];
  private activeNotes;

  constructor(private platform: Platform, private renderer: Renderer2, private gestureCtrl: GestureController) {
  }

  ngOnInit() {
    this.activeNotes = this.notes;
  }

  ionViewDidEnter() {
    this.canvasElement = this.canvas.nativeElement;
    this.renderer.setAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setAttribute(this.canvasElement, 'height', this.platform.height() + '');

    this.updateAdsrGraph();

    const moveGesture = this.gestureCtrl.create({
      el: this.gestureBox.nativeElement,
      threshold: 0,
      gestureName: 'move',
      onStart: ev => {
      },
      onMove: ev => {
        const currentX = ev.currentX;
        Tone.start().then(() => {
          this.synth.set({detune: ev.currentX});
        });
      },
      onEnd: ev => {
      }
    });

    moveGesture.enable(true);
  }


  public playNote(note: number) {
    Tone.start().then(() => {
      this.synth.set({envelope: {attack: this.attackValue, release: this.releaseValue}, portamento: this.portamento});
      this.synth.triggerAttackRelease(this.activeNotes[note], '18n', Tone.immediate());
    });
  }

  public scaleChanged(event: any) {
    console.log(event.detail.value);
  }

  public changeAttackValue(event: any) {
    this.attackValue = event.detail.value;
    this.updateAdsrGraph();
  }

  public changeReleaseValue(event: any) {
    this.releaseValue = event.detail.value;
    this.updateAdsrGraph();
  }

  public changeBeatActive(event: any) {
    this.toggleBeat(event.detail.checked);
  }

  public toggleChromatic(event: any) {
    if (event.detail.checked) {
      this.activeNotes = this.notesChrom;
    } else {
      this.activeNotes = this.notes;
    }
  }

  private toggleBeat(activate: boolean) {
    if (activate) {
      Tone.Transport.start();
    }  else {
      Tone.Transport.stop();
    }
  }

  private updateAdsrGraph() {
    const drawFactorAttack = 200;
    const drawFactorRelease = 50;
    const ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0,0,500,200);

    // Grid
    ctx.beginPath();
    ctx.strokeStyle = '#d9d9d9';
    ctx.lineWidth = 4;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 200);
    ctx.lineTo(500, 200);
    ctx.stroke();

    // Attack
    ctx.beginPath();
    ctx.strokeStyle = '#ff3333';
    ctx.moveTo(0, 200);
    ctx.lineTo(this.attackValue * drawFactorAttack, 0);
    ctx.stroke();

    // Decay
    ctx.beginPath();
    ctx.strokeStyle = '#ff9933';
    ctx.moveTo(this.attackValue * drawFactorAttack, 0);
    ctx.lineTo(this.attackValue * drawFactorAttack + 30, 50);
    ctx.stroke();

    // Sustain
    ctx.beginPath();
    ctx.strokeStyle = '#00cc00';
    ctx.moveTo(this.attackValue * drawFactorAttack + 30, 50);
    ctx.lineTo(this.attackValue * drawFactorAttack + 100, 50);
    ctx.stroke();

    // Release
    ctx.beginPath();
    ctx.strokeStyle = '#66b3ff';
    ctx.moveTo(this.attackValue * drawFactorAttack + 100, 50);
    ctx.lineTo(this.attackValue * drawFactorAttack + 100 + (this.releaseValue * drawFactorRelease), 200);
    ctx.stroke();
  }
}
