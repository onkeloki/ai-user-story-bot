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

  public donateButton(p: number): USG.InMessageButton {
    return { text: p + "€", url: "https://www.paypal.com/paypalme/markoluft/" + p }
  }
  public donateButtons(): USG.InMessageButton[] {
    return [
      this.donateButton(1),
      this.donateButton(5),
      this.donateButton(10)
    ]
  }

  public shareButtons(): USG.InMessageButton[] {
    return [
      { text: 'LinkedIn', url: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.denkanfall.de" },
      { text: 'twitter', url: "https://twitter.com/intent/tweet?text=Denkanfall%20-%20ChatGPT%20based%20UserStory%20generator&url=https%3A%2F%2FDenkanfall.de" }

    ]
  }

  /*   public likeButtons(): USG.InMessageButton[] {
      return [
        { text: 'LinkedIn', url: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.denkanfall.de" },
        { text: 'twitter', url: "https://twitter.com/intent/tweet?text=Denkanfall%20-%20ChatGPT%20based%20UserStory%20generator&url=https%3A%2F%2FDenkanfall.de" }
  
      ]
    } */

  public contactButtons(): USG.InMessageButton[] {
    return [
      { text: 'Mail Schreiben', url: "mailto:denkanfall@markoluft.de" },
      { text: 'LinkedIn Profil', url: "https://www.linkedin.com/in/marko-luft-9b4915226/" },
      { text: '@onkeloki', url: "https://twitter.com/onkeloki" },
      { text: 'markoluft.de', url: "https://markoluft.de" }
    ]
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
      case "share":
        btns = [this.donate(), this.contact(), this.restart()]
        break;
      case "contact":
        btns = [this.donate(), this.share(), this.restart()]
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
