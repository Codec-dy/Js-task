class Canvas2D {
    constructor () {
        this.cavas = document.getElementById('screen');
        this.cavasContext = this.cavas.getContext('2d');
    }

    clear () {
        this.cavasContext.clearRect(0, 0, this.cavas.width, this.cavas.height);
    }

    drawDashLines(start, end){
        if(start && end){
            this.cavasContext.beginPath();
            this.cavasContext.setLineDash([25,10]);
            this.cavasContext.moveTo(start.x+3,start.y+7);
            this.cavasContext.lineTo(start.x-(end.x*7),start.y-(end.y*7));
            this.cavasContext.stroke();
        }
    }

    drawImage (image, position, origin, rotation = 0) {
        if (!position) {
            position = new Vector2();
        }

        if (!origin) {
            origin = new Vector2();
        }

        this.cavasContext.save();
        this.cavasContext.translate(position.x, position.y);
        this.cavasContext.rotate(rotation);
        this.cavasContext.drawImage(image, -origin.x, -origin.y);
        this.cavasContext.restore();
    }
}

const Canvas = new Canvas2D();
