import { Injectable } from '@angular/core';
import { USG } from './USG.types';


@Injectable({
  providedIn: 'root'
})
export class ButtonFactoryService {
  constructor() { }
  public how(): USG.Button {
    let txts = ["🧐 wie können wir das erreichen", "⁉️ erzähle mir mehr"];
    return { name: this.getRandomItem(txts), action: "how" }
  }
  public repeatLlast(): USG.Button {
    let txts = ["👎 probiere es nochmal", "👎 das passt noch nicht ganz"];
    return { name: this.getRandomItem(txts), action: "repeat-last" }
  }
  public restart(): USG.Button {
    let txts = ["🔁 von vorne starten", "🔁 Nonch einmal neu", "🔁 neu starten"];
    return { name: this.getRandomItem(txts), action: "restart" }
  }
  public donate(): USG.Button {
    return { name: "☕️ Donate ", action: "donate" }
  }


  public like(): USG.Button {
    let txts = ["❤️ Mag Ich", "👍 Gefällt mir", "😎 sehr cool", "🤘 rock on"];
    return { name: this.getRandomItem(txts), action: "like" }
  }
  public share(): USG.Button {
    return { name: "📣 Teilen", action: "share" }
  }
  public contact(): USG.Button {
    return { name: "💭 Kontakt", action: "contact" }
  }


  public getRandomItem(arr: string[]) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  public buttonsByType(type: USG.ButtonAction): USG.Button[] {
    let btns: USG.Button[] = [];
    switch (type) {
      case "getstory":
      case "repeat-last":
        btns = [
          this.repeatLlast(),
          this.how(),
          this.restart(),
          this.like()
        ];
        break;
      case "donate":
        btns = [this.share(), this.contact(), this.restart()]
        break;

      case "like":
        btns = [


          this.donate(),
          this.share(),
          this.contact(),
          this.restart(),
        ];
        break;
      case "how":
        btns = [
          this.like(),
          this.restart(),

        ]


        break;
      case "restart":
        break;
      default:
        break;


    }
    return btns;
  }

}
