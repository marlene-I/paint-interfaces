// Classes for each filter
// All filter classes implement the method
// changePixel that modifies a given pixel
// and receives an object with required props

export class BrightFilter{
    constructor(brightChange){
        this.brightChange = brightChange;
    }

    changePixel({r, g, b, a}){
        //bright filter
        r = r + this.brightChange;
        g = g + this.brightChange;
        b = b + this.brightChange;
        return [r, g, b, a]
    }
}

export class BinarizationFilter{
    constructor(brightChange){
        this.brightChange = brightChange;
    }

    changePixel({r, g, b, a}){
        const grey = ( r + g + b ) / 3;
        let newValue = 0;
        if(grey > 120){
            newValue = 255;
        }
        return [newValue, newValue, newValue];
    }
}


export class NegativeFilter{
    constructor(){
    }
    
    // applies negative filter
    changePixel({r, g, b, a}){
        return [255 - r, 255 - g, 255 - b];
    }
}


export class SepiaFilter{
    constructor(){
        this.mask = [[0.393, 0.769, 0.189], [0.349, 0.686, 0.168], [0.272, 0.534, 0.131]]
    }

    // appplies sepia filter
    changePixel({r, g, b, a}){

        const newR = r * this.mask[0][0] + g * this.mask[0][1] + b * this.mask[0][2];
        const newG = r * this.mask[1][0] + g * this.mask[1][1] + b * this.mask[1][2];
        const newB = r * this.mask[2][0] + g * this.mask[2][1] + b * this.mask[2][2];

        return [newR, newG, newB];
    }
}


export class BlurFilter{
    constructor(){
        this.kernel = [
            [1 / 256, 4 / 256, 6 / 256, 4 / 256, 1 / 256],
            [4 / 256, 16 / 256, 24 / 256, 16 / 256, 4 / 256],
            [6 / 256, 24 / 256, 36 / 256, 24 / 256, 6 / 256],
            [4 / 256, 16 / 256, 24 / 256, 16 / 256, 4 / 256],
            [1 / 256, 4 / 256, 6 / 256, 4 / 256, 1 / 256],
        ];
        this.offset = Math.floor(this.kernel.length / 2);
    }


    // applies blur filter
    changePixel({i, pixelsArray, width}){
        // To avoid blur filter drawing a black box around image
        // I should start applying the filter i + offset and finish
        // applying it i - offset

        const accumulator = [0, 0, 0];
        for (let x = 0; x < this.kernel.length; x++) {
            for (let y = 0; y < this.kernel.length; y++) {
                const currentIndex =
                    i + (y - this.offset) * width * 4+ (x - this.offset) * 4;
                accumulator[0] +=
                    pixelsArray[currentIndex] * this.kernel[x][y];
                accumulator[1] +=
                    pixelsArray[currentIndex + 1] * this.kernel[x][y];
                accumulator[2] +=
                    pixelsArray[currentIndex + 2] * this.kernel[x][y];
            }
        }
        return accumulator;
    }
}

export class SaturationFilter{
    constructor(saturationStep){
        this.saturationStep = saturationStep;
    }

    changePixel({r, g, b}){
        // saturation filter
        const rgb = { r: {value: r, index: 0}, g: {value: g, index: 1}, b: {value: b, index: 2} }
        const rgbArr = [r,g,b];
        let max = {value: 0};
        let min = {value: 255};
        for (const component in rgb){
            if (rgb[component].value > max.value) {
                max.index = rgb[component].index;
                max.value = rgb[component].value;
            }
            if (rgb[component].value < min.value) {
                min.index = rgb[component].index;
                min.value = rgb[component].value;
            }
        }
        if(max.value != min.value && "index" in max && "index" in min){
            rgbArr[min.index] = rgbArr[min.index] - this.saturationStep;
            rgbArr[max.index] = rgbArr[max.index] + this.saturationStep;
        }

        return rgbArr;
    }
}