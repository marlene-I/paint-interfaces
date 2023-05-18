import { Tool } from "./Tool.js";
import { AttachSettings } from "./ToolSettings.js";

export class Attach extends Tool{
    constructor(ctx) {
        super(ctx)
        // I dont think adding a cursor to attach tool is necesary but who knows
        // this.cursorImgPath = "url('./images/eraser-cursor.png')" 
        this.input = document.getElementById('upload-image-input');
        this.input.addEventListener('change', this);
        this.settings = new AttachSettings();
        this.images = [];
    }

    handleEvent(e){
        switch (e.type) {
            case 'click':
                    this.executeClick()
                break;
            case 'change':
                // extract loaded element src
                const url = URL.createObjectURL(e.target.files[0])
                const img = new Image();
                img.src = url;
                this.image = new Image();
                this.image.src = url;
                img.addEventListener('load', (e) => {
                    if(img.width < this.ctx.canvas.width){
                        this.ctx.drawImage(img, 0,0, img.width, img.height);
                    } else { 
                        this.ctx.drawImage(img, 0,0, this.ctx.canvas.width, this.ctx.canvas.height);

                    }
                });
                this.images.push(img);
                console.log(img)
                console.log('e', e);
            break;
        
            default:
                break;
        }
    }

    executeClick(){
        this.input.click()
    }

    getImages(){
        console.log('this.images', this.images)
        return this.images;
    }
}