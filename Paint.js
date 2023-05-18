import { Sidebar } from "./Sidebar.js";
import { Button } from "./tools/Button.js";
import { Pencil } from "./tools/Pencil.js";
import { Eraser } from "./tools/Eraser.js";
import { Attach } from "./tools/Attach.js";
import { Download } from "./tools/Download.js";
import { Wiper } from "./tools/Wiper.js";
import { Filters } from "./tools/Filters.js";
import { SettingsToolbar } from "./SettingsToolbar.js";

export class Paint {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.configureSidebar();
        document.addEventListener('click', this);
        this.settingsContainer = document.querySelector('.tool-settings-bar');
        this.toolbarSettings = new SettingsToolbar(this.settingsContainer);
        this.imageInput = document.getElementById('upload-image-input');
        this.imageInput.addEventListener('change', this);
    }

    configureSidebar(){
        // get and instantiate all buttons
        let buttons = document.querySelectorAll('.button');

        this.toolOrder = [Pencil, Eraser, Attach, Wiper, Filters, Download];

        this.buttons = [...buttons].map((buttonElement, index) => new Button(buttonElement, new this.toolOrder[index](this.ctx)));
        
        // get and instantiate new sidebar
        const sidebarElement = document.querySelector('.sidebar');
        this.sidebar = new Sidebar(sidebarElement, this.buttons, this.ctx, this.canvas);
    }

    configureTool(clickedButton){
        
        if(clickedButton){
            if(this.currentTool != clickedButton.tool){ // a new tool was selected
                // remove the event/s the previous tool 
                // (not removed from currentTool var yet)
                // requires to work
                this.currentTool?.unplug({canvas: this.canvas})
                this.canvas.style.cursor = 'auto';
                
                this.toolbarSettings.removeCurrentTool();
            }
            
            
            this.currentTool = clickedButton.tool;
            this.canvas.style.cursor = this.currentTool.cursorImgPath + ', auto';
            
            this.toolbarSettings.setCurrentTool(this.currentTool);
            
            // let current tool configure the events it requires to work
            this.currentTool.plug({canvas: this.canvas})
           
        }
    };

    handleEvent(e){
        switch (e.type) {
            case 'click':
                if(this.currentTool?.stopDrawing){
                    this.currentTool.stopDrawing();
                }
                if(e.currentTarget.contains(this.sidebar.element)){
                    const clickedButton = this.sidebar.getClickedButton()
                    // as paint is the outer element the event will bubble to it last
                    // and the button will be already selected
                    this.configureTool(clickedButton);
                }

                break;
            case 'change':

                break;
            default:
                break;
        }
    }

}