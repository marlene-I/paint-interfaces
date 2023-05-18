
export class Sidebar {
    constructor(element, buttonList, ctx, canvas){
        this.buttonList = buttonList;
        this.element = element;
        this.ctx = ctx;
        this.canvas = canvas;
        
        // this.configureButtons();
        // Click handler is listening in the sidebar
        //  in order to catch events bubbled up by each button
        this.element.addEventListener('click', e => this.clickHandler(e));
    }

    configureButtons() {
         // instantiates corresponding tool for each button in sidebar
        this.buttonList.forEach((btn, index) => {
            if(this.toolOrder[index]){
                btn.tool = new this.toolOrder[index](this.ctx);
                btn.tool.offsets = this.offsets;
            }
        });
    }
    
    clickHandler(e) {
        this.buttonList.forEach(btn => {
            if(!btn.element.contains(e.target)){
                btn.removeActive();
            } else {
                this.clicked = btn;
                this.currentTool = this.clicked.tool;
            }
        });
    }

    getClickedButton(){
        return this.clicked;
    }
}