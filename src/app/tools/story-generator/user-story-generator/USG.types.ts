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
    export type InMessageButton = {
        text: string,
        url: string
    }

    export type InMessageButtonGroup = {
        layout?: string,
        buttons: USG.InMessageButton[]
    }

    export type DialogItem = {
        who: "me" | "bot",
        message: string,
        messageSubFix?: string,
        buttonGroup?: InMessageButtonGroup,
        buttons?: USG.Button[]
        selectedButtonAction?: USG.ButtonAction
    }
}