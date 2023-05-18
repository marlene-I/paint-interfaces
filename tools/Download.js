import { Tool } from "./Tool.js";
import { ToolSettings } from "./ToolSettings.js";


export class Download extends Tool {
    constructor(ctx){
        super(ctx)
        this.setting = new ToolSettings;
    }

    handleEvent(e){
        switch (e.type) {
            case 'click':
                console.log("folders clicked u know bitch")
                const link = document.createElement('a');
                link.download = 'filename.png';
                link.href = this.ctx.canvas.toDataURL()
                link.click();
                break;
        
            default:
                break;
        }
    }
}