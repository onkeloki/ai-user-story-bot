

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TRANSLATIONS } from '@angular/core';
import { ButtonFactoryService } from './button-factory.service';

import { USG } from './USG.types';

import { TranslationService } from 'src/app/shared/translation.service';
@Component({
  selector: 'app-user-story-generator',
  templateUrl: './user-story-generator.component.html',
  styleUrls: ['./user-story-generator.component.scss']
})
export class UserStoryGeneratorComponent implements AfterViewInit {
  title = '>yausg - yet another userstory generator - made with ❤️ and ChatGT';
  public timeoutId: any;
  public lastMessageSubFix: string = "";
  public lastInMessageButtonGroup: USG.InMessageButtonGroup = { buttons: [] };
  public loading = false;
  public viewInited = false;
  public lastButtonAction: USG.ButtonAction = "getstory";

  public dialog: USG.DialogItem[] = [];
  public placeholders: string[] = [];
  /**
   * 
   * @param http 
   * @param buttons 
   */
  constructor(public http: HttpClient, public buttons: ButtonFactoryService, public _: TranslationService) {



  }

  ngAfterViewInit(): void {
    this.resetUSGButtons()
  }

  resetUSGButtons() {
    setTimeout(() => {
      document.querySelectorAll(".btn-usg").forEach((e) => {
        console.log(e);
        if (e.id.endsWith("_0")) {
          console.log("da isser" + e.id)
          e.classList.add("active")
        }
      })
    }, 100);


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
  usgButtonClick(ta: number, i: number, option: string) {
    document.querySelectorAll(".btn-usg").forEach((e) => {
      if (e.id.startsWith("btn-usg_" + ta + "_")) {
        console.log(e.id)
        e.classList.remove("active")
      }
    })
    document.querySelector("#btn-usg_" + ta + "_" + i)?.classList.add("active")
    this.setTaValue(ta, i, option)
  }

  getFraseFromForm() {

    var coll = document.getElementsByTagName("textarea");
    var textareas = Array.prototype.slice.call(coll, 0);
    let frase = "";
    let taIndex = 0;
    textareas.forEach((t) => {
      let fallback = this._.get().STORY.keys[taIndex];
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
    return this._.get().STORY.prefix + " " + frase;
  }
  setTaValue(taId: number, btnId: number, value: string) {
    (document.getElementById("textarea_" + taId) as HTMLTextAreaElement).value = value;
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

    let msg = this._.get().PRE_FRASE_TXT + ":<br> " + " " + frase;
    this.appendMsg("me", msg, msg);
    this.lastButtonAction = "getstory"
  }

  request(msg: string) {
    this.appendMsg("bot", "")
    this.loading = true;
    let queryParams = new HttpParams().append("msg", msg);
    let send = new FormData();
    send.append("msg", msg)
    this.http.post<any>('https://api.denkanfall.de/usg.php', send).subscribe({
      next: x => {
        this.response(x);
      },
      error: error => {

        console.error('There was an error!', error);
      }
    })




    /* 
        this.http.get<USG.BotResponse>('https://api.denkanfall.de/USG/index.php', { params: queryParams }).subscribe((x: USG.BotResponse) => {
          this.response(x);
        })
     */

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
        this.appendMsg("me", btnName, this._.get().TXT_DONATE);
        this.lastInMessageButtonGroup = { buttons: this.buttons.donateButtons() }
        break;
      case "share":
        this.dialog.pop();
        this.appendMsg("me", btnName, this._.get().TXT_SHARE);
        this.lastInMessageButtonGroup = { buttons: this.buttons.shareButtons() }
        break;
      case "contact":
        this.dialog.pop();
        this.appendMsg("me", btnName, this._.get().TXT_CONTACT);
        this.lastInMessageButtonGroup = { layout: "full", buttons: this.buttons.contactButtons() }

        break;
      case "how":
        this.dialog.pop();
        let serverMsg = this._.get().TXT_HOW + "" + this.getLastDialogItem().message
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
        this.appendMsg("me", btnName, this._.get().TXT_LIKE);
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



