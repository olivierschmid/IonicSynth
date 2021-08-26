import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  barCount = 0;
  tempoValue = 120;
  kickArray = [
    {id: 0, active: false, indicator: false},
    {id: 1, active: false, indicator: false},
    {id: 2, active: false, indicator: false},
    {id: 3, active: false, indicator: false},
    {id: 4, active: false, indicator: false},
    {id: 5, active: false, indicator: false},
    {id: 6, active: false, indicator: false},
    {id: 7, active: false, indicator: false},
    {id: 8, active: false, indicator: false}
  ];
  chatArray = [
    {id: 0, active: false, indicator: false},
    {id: 1, active: false, indicator: false},
    {id: 2, active: false, indicator: false},
    {id: 3, active: false, indicator: false},
    {id: 4, active: false, indicator: false},
    {id: 5, active: false, indicator: false},
    {id: 6, active: false, indicator: false},
    {id: 7, active: false, indicator: false},
    {id: 8, active: false, indicator: false}
  ];
  ohatArray = [
    {id: 0, active: false, indicator: false},
    {id: 1, active: false, indicator: false},
    {id: 2, active: false, indicator: false},
    {id: 3, active: false, indicator: false},
    {id: 4, active: false, indicator: false},
    {id: 5, active: false, indicator: false},
    {id: 6, active: false, indicator: false},
    {id: 7, active: false, indicator: false},
    {id: 8, active: false, indicator: false}
  ];
  clapArray = [
    {id: 0, active: false, indicator: false},
    {id: 1, active: false, indicator: false},
    {id: 2, active: false, indicator: false},
    {id: 3, active: false, indicator: false},
    {id: 4, active: false, indicator: false},
    {id: 5, active: false, indicator: false},
    {id: 6, active: false, indicator: false},
    {id: 7, active: false, indicator: false},
    {id: 8, active: false, indicator: false}
  ];
  tempoIndicator = false;

  constructor() {
  }

  public toggleActive(instrument: string, id: number) {
    if (instrument.toLowerCase() === 'kick') {
      this.kickArray[id].active = !this.kickArray[id].active;
    }
    if (instrument.toLowerCase() === 'ohat') {
      this.ohatArray[id].active = !this.ohatArray[id].active;
    }
    if (instrument.toLowerCase() === 'chat') {
      this.chatArray[id].active = !this.chatArray[id].active;
    }
    if (instrument.toLowerCase() === 'clap') {
      this.clapArray[id].active = !this.clapArray[id].active;
    }
  }

  public startBeat() {
    // Tone.setContext(new Tone.Context({ latencyHint : 'playback' , lookAhead: 1000}));

    Tone.start().then(() => {
      Tone.Transport.bpm.value = this.tempoValue;
      Tone.Transport.start();
    });
  }

  public stopBeat() {
    Tone.Transport.stop();
  }

  public ngOnInit() {
    Tone.start().then(() => {
      // Synths for beat
      let sampler1;
      let sampler2;
      let sampler3;
      let sampler4;
      fetch('assets/samples/kick.wav').then((a4) => {
        a4.blob().then((a4Blob) => {
          sampler1 = new Tone.Sampler({
            urls: {
              a1: URL.createObjectURL(a4Blob)
            },
            onload: () => {
              // sampler1.triggerAttackRelease(['C1'], 0.5);
            }
          }).toDestination();
        });
      });

      fetch('assets/samples/clap.wav').then((a4) => {
        a4.blob().then((a4Blob) => {
          sampler2 = new Tone.Sampler({
            urls: {
              a1: URL.createObjectURL(a4Blob)
            },
            onload: () => {
              // sampler1.triggerAttackRelease(['C1'], 0.5);
            }
          }).toDestination();
        });
      });

      fetch('assets/samples/ohat.wav').then((a4) => {
        a4.blob().then((a4Blob) => {
          sampler3 = new Tone.Sampler({
            urls: {
              a1: URL.createObjectURL(a4Blob)
            },
            onload: () => {
              // sampler1.triggerAttackRelease(['C1'], 0.5);
            }
          }).toDestination();
        });
      });

      fetch('assets/samples/chat.wav').then((a4) => {
        a4.blob().then((a4Blob) => {
          sampler4 = new Tone.Sampler({
            urls: {
              a1: URL.createObjectURL(a4Blob)
            },
            onload: () => {
              // sampler1.triggerAttackRelease(['C1'], 0.5);
            }
          }).toDestination();
        });
      });

      const loop = new Tone.Loop((time) => {
        if (this.kickArray[this.barCount].active) {
          sampler1.triggerAttackRelease('c2', '16n', time);
        }
        if (this.clapArray[this.barCount].active) {
          sampler2.triggerAttackRelease('e1', '16n', time);
        }
        if (this.ohatArray[this.barCount].active) {
          sampler3.triggerAttackRelease('e1', '16n', time);
        }
        if (this.chatArray[this.barCount].active) {
          sampler4.triggerAttackRelease('e1', '16n', time);
        }

        this.tempoIndicator = true;
        this.kickArray[this.barCount].indicator = true;
        this.ohatArray[this.barCount].indicator = true;
        this.chatArray[this.barCount].indicator = true;
        this.clapArray[this.barCount].indicator = true;

        setTimeout(() => {
          this.tempoIndicator = false;
          this.resetBarIndicators();
        }, 200);

        if (this.barCount < 7) {
          this.barCount++;
        } else {
          this.barCount = 0;
        }
      }, '8n').start(0);
    });
  }

  public changeTempoValue(event: any) {
    this.tempoValue = event.detail.value;
  }

  private resetBarIndicators() {
    for (let i = 0; i < 8; i++) {
      this.kickArray[i].indicator = false;
      this.ohatArray[i].indicator = false;
      this.chatArray[i].indicator = false;
      this.clapArray[i].indicator = false;
    }
  }
}
