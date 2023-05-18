
export class Button {
    constructor(element, tool) {
        this.element = element;
        this.element.addEventListener('click', this);
        this.tool = tool;
        this.element.addEventListener('click', tool);
        // Both the button and the tool will probably have an action for the click event
    }

    handleEvent(e){
        switch (e.type) {
            case 'click':
                // set active class to button
                this.toggleActive();
                // this.tool.executeClick();
            break;

            default:
                break;
        }

    }

    removeActive(){
        this.element.classList.remove('active');
    }

    toggleActive(){
        this.element.classList.toggle('active');
    }
  
}