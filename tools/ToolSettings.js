import { BinarizationFilter, BlurFilter, BrightFilter, NegativeFilter, SaturationFilter, SepiaFilter } from "./ImageFiltering.js";

export class ToolSettings {
    // this clase purpose is to serve as interface for the different tools settings
    // each tool setting will populate the left toolbar with 
    // configuration for the tool it's intended.
    // the required html elements will be created at instantiation
    // and appended/removed as required
    constructor() {}

    populateToolbar(element) {}

    depopulateToolbar() {}
}

export class PencilSettings {
    constructor() {
        this.createElements();
    }

    createElements() {
        this.labelColor = document.createElement('label')
        this.labelColor.innerHTML = 'Color';
        this.inputColor = document.createElement("input");
        this.inputColor.classList.add('setting-input');
        this.labelColor.classList.add('setting-label');
        this.inputColor.type = "color";
        this.inputColor.value = "#5739e3"; // default pencil color
        this.labelSize = document.createElement('label')
        this.labelSize.innerHTML = 'Trazo';
        this.inputSize = document.createElement("input");
        this.inputSize.type = "range";

        this.inputColor.classList.add('setting-input');
        this.labelColor.classList.add('setting-label');
        this.inputSize.classList.add('setting-input');
        this.labelSize.classList.add('setting-label');
        
        this.inputSize.value = 3;
        this.inputSize.min = 0.5;
        this.inputSize.max = 100;
    }

    populateToolbar(toolbar) {
        this.toolbar = toolbar;
        this.toolbar.appendChild(this.labelColor);
        this.toolbar.appendChild(this.inputColor);
        this.toolbar.appendChild(this.labelSize);
        this.toolbar.appendChild(this.inputSize);
    }

    depopulateToolbar() {
        this.toolbar.removeChild(this.inputColor);
        this.toolbar.removeChild(this.labelColor);
        this.toolbar.removeChild(this.labelSize);
        this.toolbar.removeChild(this.inputSize);
        this.toolbar = null;
    }

    getColor() {
        return this.inputColor.value;
    }

    getSize() {
        return this.inputSize.value;
    }
}


export class EraserSettings {
    constructor() {
        this.createElements();
    }

    createElements() {
        this.inputSize = document.createElement("input");
        this.inputSize.type = "range";
        this.labelSize = document.createElement('label')
        this.labelSize.innerHTML = 'Trazo';

        this.inputSize.classList.add('setting-input');
        this.labelSize.classList.add('setting-label');

        this.inputSize.value = 40;
        this.inputSize.min = 20;
        this.inputSize.max = 300;
    }

    populateToolbar(toolbar) {
        this.toolbar = toolbar;
        this.toolbar.appendChild(this.labelSize);
        this.toolbar.appendChild(this.inputSize);
    }

    depopulateToolbar() {
        this.toolbar.removeChild(this.inputSize);
        this.toolbar.removeChild(this.labelSize);
        this.toolbar = null;
    }

    getSize() {
        return this.inputSize.value;
    }
}

export class AttachSettings extends ToolSettings {
    constructor() {
        super();
    }
}

export class FiltersSettings extends ToolSettings {
    constructor(ctx) {
        super();
        this.createElements();
        this.ctx = ctx;
    }

    createElements() {
        //blur button
        this.blurButton = this.createFilterButton('Blur');

        this.sepiaButton = this.createFilterButton('Sepia');

        this.saturationButton = this.createFilterButton('Saturación');

        this.binarizationButton = this.createFilterButton('Binarización');

        this.brightButton = this.createFilterButton('Brillo');

        this.negativeButton = this.createFilterButton('Negativo');
    }

    populateToolbar(toolbar) {
        this.toolbar = toolbar;
        console.log(this.toolbar)
        this.toolbar.appendChild(this.blurButton);
        this.toolbar.appendChild(this.sepiaButton);
        this.toolbar.appendChild(this.binarizationButton);
        this.toolbar.appendChild(this.negativeButton);
        this.toolbar.appendChild(this.brightButton);
        this.toolbar.appendChild(this.saturationButton);
    }

    depopulateToolbar() {
        console.log(this.toolbar)
        this.toolbar.removeChild(this.blurButton);
        this.toolbar.removeChild(this.sepiaButton);
        this.toolbar.removeChild(this.binarizationButton);
        this.toolbar.removeChild(this.negativeButton);
        this.toolbar.removeChild(this.brightButton);
        this.toolbar.removeChild(this.saturationButton);
        this.toolbar = null;
    }

    createFilterButton(innerText) {
        const button = document.createElement("button");
        button.innerHTML = innerText;
        button.classList.add("filter-button");
        button.addEventListener("click", this);
        return button
    }

    handleEvent(e) {
        switch (e.type) {
            case "click":
                // this will be triggered by clicking on any filter button
                const width = this.ctx.canvas.width
                const height = this.ctx.canvas.height
                const imageData = this.ctx.getImageData(0, 0, width, height); 
                const newImageData = new Uint8ClampedArray(imageData.data);

                switch (e.target.innerHTML) {
                    case 'Saturación':
                        const saturationFilter = new SaturationFilter(30); // saturation step
                        this.applyFilter(0, newImageData.length, 4, newImageData, saturationFilter)
                        break;
                    case 'Sepia':
                        const sepiaFilter = new SepiaFilter(); 
                        this.applyFilter(0, newImageData.length, 4, newImageData, sepiaFilter)
                        break;
                    case 'Blur':
                        const blurFilter = new BlurFilter(); 
                        this.applyFilter(0, newImageData.length, 4, newImageData, blurFilter)
                        break;
                    case 'Binarización':
                        const binarizationFilter = new BinarizationFilter(180); //darkness threshold
                        this.applyFilter(0, newImageData.length, 4, newImageData, binarizationFilter)
                        break;
                    case 'Brillo':
                        const brightfilter = new BrightFilter(50); // bright denominator
                        this.applyFilter(0, newImageData.length, 4, newImageData, brightfilter)
                        break;
                    case 'Negativo':
                        const negativeFilter = new NegativeFilter();
                        this.applyFilter(0, newImageData.length, 4, newImageData, negativeFilter)
                        break;
                
                    default:
                        break;
                }

                const newImage = new ImageData(newImageData, imageData.width);
                this.ctx.putImageData(newImage, 0, 0);
                break;
            default:
                break;
        }
    }

    applyFilter(start, end, step, pixelsArray, filter){
        for (let i = start; i < end; i += step) {
            [pixelsArray[i], pixelsArray[i+1], pixelsArray[i+2]] = filter.changePixel({r: pixelsArray[i], g: pixelsArray[i+1], b: pixelsArray[i+2], i, pixelsArray, width: this.ctx.canvas.width})
        }
    }
}
