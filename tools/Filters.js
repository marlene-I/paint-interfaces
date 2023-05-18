import { Tool } from "./Tool.js";
import { FiltersSettings } from "./ToolSettings.js";

export class Filters extends Tool {
    constructor(ctx){
        super(ctx)

        this.settings = new FiltersSettings(ctx);
    }

    handleEvent(e){
        switch (e.type) {
            case 'click':
                break;
        
            default:
                break;
        }
    }



}