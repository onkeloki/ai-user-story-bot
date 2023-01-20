import { USG } from "../tools/story-generator/user-story-generator/USG.types"

export type Translation = {
    LANG_KEY: string,
    SEND_BTN: string,
    STORY: USG.DemoStory,
    TXT_DONATE: string,
    TXT_SHARE: string,
    TXT_CONTACT: string,
    TXT_HOW: string,
    TXT_LIKE: string
    BTNS_HOW: string[],
    BTNS_REPEAT_LAST: string[],
    BTNS_DONATE: string[],
    BTNS_LIKE: string[],
    BTNS_RESTART: string[],
    BTNS_SHARE: string[],
    BTNS_CONTACT: string[],
    BTN_TXT_MAIL: string,
    BTN_TXT_LINKEDIN: string,
    PRE_FRASE_TXT: string
}



export const DE: Translation = {
    LANG_KEY: "de",
    PRE_FRASE_TXT: "Formuliere eine Userstory",
    TXT_DONATE: "formuliere um: 'wenn du den Entwickler untersützen magst, geht das ganz einfach z.b. via paypal' in der Du form",
    TXT_SHARE: "formuliere um: 'Teile dieses Tool mit der Welt, nutze einfach einen der buttons ' in der Du form",
    TXT_CONTACT: "formuliere um: 'hast du anregungen, oder ideen oder willst einfach nur danke sagen dann erreichst du meinen ersteller auf folgende arten' in der DU form",
    TXT_HOW: "wie kann ich das erreichen?: ",
    SEND_BTN: "Formuliere eine story",
    TXT_LIKE: "schreibe eine chat nachricht, die darran erinnern soll, dass man den entwickler dieser seite unterstützen kann z.b. mit einer kleinen spende um die kosten des services zu decken. Du kannst aber auch über den bot berichten oder einfach dem entwickler deine danksagung mailen",
    BTNS_HOW: ["🧐 wie können wir das erreichen", "⁉️ erzähle mir mehr"],
    BTNS_REPEAT_LAST: ["👎 probiere es nochmal", "👎 das passt noch nicht ganz"],
    BTNS_RESTART: ["🔁 von vorne starten", "🔁 Nonch einmal neu", "🔁 neu starten"],
    BTNS_DONATE: ["☕️ Donate"],
    BTNS_LIKE: ["❤️ Mag Ich", "👍 Gefällt mir", "😎 sehr cool", "🤘 rock on"],
    BTNS_SHARE: ["📣 Teilen"],
    BTNS_CONTACT: ["💭 Kontakt"],
    BTN_TXT_MAIL: 'Mail Schreiben',
    BTN_TXT_LINKEDIN: 'LinkedIn Profil',
    STORY: {
        prefix: "Als",
        keys: ["Nutzer", "will ich|brauche ich|wünsche ich mir", "folgendes tun", "damit|so dass|weil", "ich das erreiche"]
    }
}





export const EN: Translation = {
    LANG_KEY: "en",
    PRE_FRASE_TXT: "Write a userstory",
    TXT_DONATE: "formuliere um: 'wenn du den Entwickler untersützen magst, geht das ganz einfach z.b. via paypal' in englisch",
    TXT_SHARE: "formuliere um: 'Teile dieses Tool mit der Welt, nutze einfach einen der buttons ' in englisch ",
    TXT_CONTACT: "formuliere um: 'hast du anregungen, oder ideen oder willst einfach nur danke sagen dann erreichst du meinen ersteller auf folgende arten' in englisch",
    TXT_HOW: "how to?: ",
    SEND_BTN: "Generate a Userstory",
    TXT_LIKE: "schreibe eine chat nachricht, die darran erinnern soll, dass man den entwickler dieser seite unterstützen kann z.b. mit einer kleinen spende um die kosten des services zu decken. Du kannst aber auch über den bot berichten oder einfach dem entwickler deine danksagung mailen, in englisch",
    BTNS_HOW: ["🧐 how to?", "⁉️ tell me more"],
    BTNS_REPEAT_LAST: ["👎 try again", "👎 that does not quite fit yet"],
    BTNS_RESTART: ["🔁 start from beginning", "🔁 restart"],
    BTNS_DONATE: ["☕️ Donate"],
    BTNS_LIKE: ["❤️ Love it", "👍 Like it", "😎 cool", "🤘 rock on"],
    BTNS_SHARE: ["📣 Share"],
    BTNS_CONTACT: ["💭 Contact"],
    BTN_TXT_MAIL: 'Write Mail',
    BTN_TXT_LINKEDIN: 'LinkedIn Profile',
    STORY: {
        prefix: "as A",
        keys: ["User", "i want to|i need|should be able to", "do a thing", "so that|because|in order to", "reach my target"]
    }
}
/* export const EN: Translation = {
    SEND_BTN: "generate Story",
    STORY: {
        prefix: "as A",
        keys: ["folgendes tun", "damit|so dass|weil", "ich das erreiche"]
    }
} */