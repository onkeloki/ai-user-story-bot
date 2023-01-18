export namespace USG {
    export type ButtonAction = "getstory"
        | "like"
        | "how"
        | "repeat-last"
        | "restart"
        | "donate"
        | "contact"
        | "share"
        | "other-likes";
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
        message: string,
        messageSubFix?: string,
        buttons?: USG.Button[]
        selectedButtonAction?: USG.ButtonAction
    }
}