export namespace USG {
  export type ButtonAction = "like" | "how" | "repeat-last" | "restart";
  export type Button = {
    name: string,
    action: USG.ButtonAction
  }
  export type DemoStory = {
    prefix: string,
    keys: string[]
  }
  export type BotResponse = {
    message: string,
    type?: any
  }
  export type DialogItem = {
    who: "me" | "bot",
    message: string;
    buttons?: USG.Button[]
    selectedButtonAction?: USG.ButtonAction
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
@Component({
  selector: 'app-user-story-generator',
  templateUrl: './user-story-generator.component.html',
  styleUrls: ['./user-story-generator.component.scss']
})
export class UserStoryGeneratorComponent implements AfterViewInit {
  title = 'denkanfall';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public timeoutId: any;
  public loading = false;
  public demoStory: USG.DemoStory = {
    prefix: "Als",
    keys: ["Nutzer", "will ich", "folgendes tun", "dammit ich", "das erreiche"]
  }
  public dialog: USG.DialogItem[] = [];
  public placeholders: string[] = [];
  constructor(public http: HttpClient) {
  }
  ngAfterViewInit(): void {
    //this.send();
    //this.appendButtons();
  }

  scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  appendMsg(who: "me" | "bot", displayMsg: string, serverMsg?: string) {
    this.dialog.push({
      who: who,
      message: displayMsg
    })
    if (who == "me" && serverMsg) {
      setTimeout(() => {
        this.request(serverMsg);
      }, 1000);
    }
    this.scrollDown();
  }

  send() {
    var coll = document.getElementsByTagName("textarea");
    var textareas = Array.prototype.slice.call(coll, 0);
    let frase = "";
    textareas.forEach((t) => {
      frase += t.value + " ";
    })
    let msg = "Formuliere eine Userstory:<br> " + this.demoStory.prefix + " " + frase;
    this.appendMsg("me", msg, msg);
  }

  request(msg: string) {
    this.appendMsg("bot", "")
    this.loading = true;
    let queryParams = new HttpParams().append("msg", msg);
    this.http.get<USG.BotResponse>('https://api.denkanfall.de/USG/index.php', { params: queryParams }).subscribe((x: USG.BotResponse) => {
      this.response(x);
    })
  }
  response(botResponse: USG.BotResponse) {
    this.loading = false;
    this.typeWrite(botResponse.message, this.dialog[this.dialog.length - 1])
  }

  getLastDialogItem(): USG.DialogItem {
    return this.dialog[this.dialog.length - 1]
  }
  appendButtons() {
    this.dialog.push({
      who: "me",
      message: "super cool danke",
      buttons: [
        { name: "Probiere es nochmal", action: "repeat-last" },
        { name: "🧐 wie können wir das erreichen", action: "how" },
        { name: "Ganz von vorne", action: "restart" },
        { name: "👍 Mag Ich", action: "like" }
      ]
    })
  }
  buttonAction(btnName: string, action: USG.ButtonAction) {
    switch (action) {
      case "how":
        this.dialog.pop();
        let serverMsg = "wie kann ich das erreichen?: " + this.getLastDialogItem().message
        this.appendMsg("me", "erzähle mir mehr", serverMsg);
        break;
      case "repeat-last":
        this.dialog.pop();
        this.send();
        break;
      case "restart":
        this.dialog = [];
        break;
      case "like":
        this.dialog.pop();
        this.appendMsg("me", btnName, "schreibe eine chat nachricht, die darran erinnern soll, dass man den entwickler dieser seite unterstützen kann z.b. mit einer kleinen spende um die kosten des services zu decken");
        break;
    }



  }

  typeWrite(msg: string, target: USG.DialogItem) {
    msg = msg.trim();
    let letters = msg.split("");
    letters.reverse();
    let appendNext = (letters: string[], target: USG.DialogItem) => {
      target.message += letters.pop();
      console.log("x");
      console.log
      if (letters.length > 0) {
        setTimeout(() => {
          appendNext(letters, target)
        }, 50);
      } else {
        this.appendButtons();
      }

    }
    appendNext(letters, target);
  }





}



