

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { ButtonFactoryService } from './button-factory.service';
import { USG } from './USG.types';
@Component({
  selector: 'app-user-story-generator',
  templateUrl: './user-story-generator.component.html',
  styleUrls: ['./user-story-generator.component.scss']
})
export class UserStoryGeneratorComponent implements AfterViewInit {
  title = 'yausg';
  public timeoutId: any;
  public lastMessageSubFix: string = "";
  public lastInMessageButtonGroup: USG.InMessageButtonGroup = { buttons: [] };
  public loading = false;
  public viewInited = false;
  public lastButtonAction: USG.ButtonAction = "getstory";
  public demoStory: USG.DemoStory = {
    prefix: "Als",
    keys: ["Nutzer", "will ich|brauche ich|wünsche ich mir", "folgendes tun", "damit|so dass|weil", "ich das erreiche"]
  }
  public dialog: USG.DialogItem[] = [];
  public placeholders: string[] = [];
  /**
   * 
   * @param http 
   * @param buttons 
   */
  constructor(public http: HttpClient, public buttons: ButtonFactoryService) {
  }
  ngAfterViewInit(): void {

    this.viewInited = true;
    //this.send();
    //this.appendButtons();
    // this.buttonAction("test", "donate")
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

  getFraseFromForm() {
    var coll = document.getElementsByTagName("textarea");
    var textareas = Array.prototype.slice.call(coll, 0);
    let frase = "";
    let taIndex = 0;
    textareas.forEach((t) => {
      let fallback = this.demoStory.keys[taIndex];
      let userInput = t.value.trim()
      let finalValue = "";
      if (userInput == "") {
        finalValue = fallback;
      } else {
        finalValue = userInput
      }
      frase += finalValue + " ";
      taIndex++;
    })
    return this.demoStory.prefix + " " + frase;
  }
  setTaValue(i: number, value: string) {
    (document.getElementById("textarea_" + i) as HTMLTextAreaElement).value = value;
  }
  getTaValue(i: number): string {
    let ta = (document.getElementById("textarea_" + i) as HTMLTextAreaElement);
    if (ta) {
      return ta.value;
    }
    return "";

  }
  requestAStoryBtn() {


    let frase = this.getFraseFromForm();
    console.log(frase);
    let msg = "Formuliere eine Userstory:<br> " + " " + frase;
    this.appendMsg("me", msg, msg);
    this.lastButtonAction = "getstory"
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

  appendButtonsByAnswerType() {
    this.dialog.push({
      who: "me",
      message: "",
      buttons: this.buttons.buttonsByType(this.lastButtonAction)
    })
    setTimeout(() => { this.scrollDown() }, 30)

  }

  buttonAction(btnName: string, action: USG.ButtonAction) {
    this.lastButtonAction = action;
    switch (action) {
      case "donate":
        this.dialog.pop();
        this.appendMsg("me", btnName, "formuliere um: 'wenn du den Entwickler untersützen magst, geht das ganz einfach z.b. via paypal' in der Du form");
        this.lastInMessageButtonGroup = { buttons: this.buttons.donateButtons() }
        break;
      case "share":
        this.dialog.pop();
        this.appendMsg("me", btnName, "formuliere um: 'Teile dieses Tool mit der Welt, nutze einfach einen der buttons ' in der DU form");
        this.lastInMessageButtonGroup = { buttons: this.buttons.shareButtons() }
        break;
      case "contact":
        this.dialog.pop();
        this.appendMsg("me", btnName, "formuliere um: 'hast du anregungen, oder ideen oder willst einfach nur danke sagen dann erreichst du meinen ersteller auf folgende arten' in der DU form");
        this.lastInMessageButtonGroup = { layout: "full", buttons: this.buttons.contactButtons() }

        break;
      case "how":
        this.dialog.pop();
        let serverMsg = "wie kann ich das erreichen?: " + this.getLastDialogItem().message
        this.appendMsg("me", btnName, serverMsg);
        break;
      case "repeat-last":
        this.dialog.pop();
        this.requestAStoryBtn();
        break;
      case "restart":
        this.dialog = [];
        break;
      case "like":
        this.dialog.pop();
        this.appendMsg("me", btnName, "schreibe eine chat nachricht, die darran erinnern soll, dass man den entwickler dieser seite unterstützen kann z.b. mit einer kleinen spende um die kosten des services zu decken. Du kannst aber auch über den bot berichten oder einfach dem entwickler deine danksagung mailen");
        break;
    }
  }

  typeWrite(msg: string, target: USG.DialogItem) {
    msg = msg.trim();
    let letters = msg.split("");
    letters.reverse();
    let appendNext = (letters: string[], target: USG.DialogItem) => {
      target.message += letters.pop();
      if (letters.length > 0) {
        setTimeout(() => {
          appendNext(letters, target);
        }, 10);
        this.scrollDown();
      } else {
        this.appendButtonsByAnswerType();
        target.messageSubFix = this.lastMessageSubFix;
        target.buttonGroup = this.lastInMessageButtonGroup;
        this.lastInMessageButtonGroup = { buttons: [] }
        this.lastMessageSubFix = "";
      }
    }
    appendNext(letters, target);
  }




}



