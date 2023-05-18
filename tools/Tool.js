import { ToolSettings } from "./ToolSettings.js";

export class Tool {
    constructor(ctx){
        this.ctx = ctx;
        this.settings = new ToolSettings();
    }

    handleEvent(e){}

    plug(){}

    unplug(){}

    executeClick(){}
}