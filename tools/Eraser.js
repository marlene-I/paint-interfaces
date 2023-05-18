import { Pencil } from "./Pencil.js";
import { EraserSettings } from "./ToolSettings.js";

export class Eraser extends Pencil{
    constructor(ctx, color = 'white', size = 40){
        super(ctx, color, size)
        this.cursorImgPath = "url('./images/eraser-cursor.png')";
        this.settings = new EraserSettings();
    }

    handleEvent(e) {
        switch (e.type) {
            case 'mousedown':
                    this.drawing = true;
                break;
            case 'mousemove':
                if(this.drawing){
                    const {x, y} = {x: e.clientX - this.ctx.canvas.offsetLeft, y: e.clientY - this.ctx.canvas.offsetTop}
                    this.draw(x, y)
                }
                break;
            case 'mouseup':
                this.drawing = false;
                break;
            default:
                break;
        }
    }

        
    draw(x, y){
        this.ctx.fillStyle = 'white';
        this.path = new Path2D();
        this.path.arc(x, y, this.settings.getSize(), 0, 360);
        this.ctx.fill(this.path);
    }


 }