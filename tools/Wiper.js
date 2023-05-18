import { Tool } from "./Tool.js";

export class Wiper extends Tool {
    constructor(ctx){
        super(ctx);
    }

    handleEvent(e) {
        switch (e.type) {
            case 'click':
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                break;
        
            default:
                break;
        }
    }
}