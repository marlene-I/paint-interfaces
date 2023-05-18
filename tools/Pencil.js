import { Tool } from "./Tool.js";
import { PencilSettings } from "./ToolSettings.js";
export class Pencil extends Tool{
    constructor (ctx) {
        super(ctx);
        this.drawing = false;
        this.cursorImgPath = "url('./images/pencilla-cursor.png')"
        this.settings = new PencilSettings()
    }

    

    handleEvent(e) {
        switch (e.type) {
            case 'mousedown':
                // TODO draw when clicked down (no need to move the mouse)

                this.ctx.moveTo(e.clientX - this.ctx.canvas.offsetLeft, e.clientY - this.ctx.canvas.offsetTop /2);
                this.ctx.beginPath();
                this.drawing = true;
                break;
            case 'mousemove':
                if(this.drawing){
                    const {x, y} = {x: e.clientX -this.ctx.canvas.offsetLeft, y: e.clientY - this.ctx.canvas.offsetTop /2}
                    this.moveTo(x, y )
                    this.draw(x, y)
                }
                break;
            case 'mouseup':
                this.stopDrawing();
                break;
            default:
                break;
        }
    }

    moveTo(posX, posY){
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }
    
    draw(x, y){
        this.ctx.lineWidth = this.settings.getSize();
        this.ctx.strokeStyle = this.settings.getColor();
        this.ctx.arcTo(this.posX, this.posY, x, y, this.settings.getSize());
        this.ctx.stroke();
    }

    unplug({canvas}){
        canvas.removeEventListener('mousedown', this);
        canvas.removeEventListener('mouseup', this);
        canvas.removeEventListener('mousemove', this);
    }

    plug({canvas}){
        canvas.addEventListener('mousedown', this);
        canvas.addEventListener('mouseup', this);
        canvas.addEventListener('mousemove', this);
    }

    stopDrawing(){
        this.drawing = false;
        this.ctx.closePath();
    }
}