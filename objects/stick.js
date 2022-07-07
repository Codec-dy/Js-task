class Stick {
    constructor (position) {
        this.position = position;
        this.rotation = 0;
        this.origin = new Vector2(12.5,12.5)
    }

    // update method is called every frame (see detailed description in the dock) 
    update (delta) {
        
    }
    
    // draws sprite every frame
    draw () {
        
        Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
    }
}
