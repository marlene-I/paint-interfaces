export class SettingsToolbar{
    constructor(container){
        this.container = container;
        this.buttonsContainer = document.createElement('div');
        this.container.appendChild(this.buttonsContainer);
        this.buttonsContainer.classList.add("filter-buttons-container")
        this.closeButton = this.container.querySelector('button');
        this.closeButton.addEventListener('click', this);
        this.open = true;
    }

    handleEvent(e){
        switch (e.type) {
            case 'click':
                if(!this.open){
                    this.container.style.width = '15vw';
                    this.closeButton.innerHTML = '>'
                    this.buttonsContainer.style.display = 'block'
                } else {
                    this.container.style.width = '3vw';
                    this.closeButton.innerHTML = '<'
                    this.buttonsContainer.style.display = 'none'
                }
                this.open = !this.open;
                break;
        
            default:
                break;
        }
    }

    setCurrentTool(tool){
        this.currentTool = tool;
        this.currentTool.settings.populateToolbar(this.buttonsContainer);
    }

    removeCurrentTool(){
        this.currentTool?.settings.depopulateToolbar();
        this.currentTool = null;
    }


}