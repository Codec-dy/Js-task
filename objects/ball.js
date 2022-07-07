const BALL_ORIGIN = new Vector2(20, 20);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;
const HOLE_RADIUS = 46;
//Holes for scoring
//Holes for scoring
hole1 = new Vector2(63,772);
hole2 = new Vector2(756,772);
hole3 = new Vector2(1443,772);
hole4 = new Vector2(63,61);
hole5 = new Vector2(756,61);
hole6 = new Vector2(1443,61);
class Ball {
    constructor (position, color) {
        this.position = position;
        this.atRedge=false; this.atLedge=false; this.atDedge=false; this.atUedge = false;
        this.x =0; this.y=0; this.xs=0; this.ys=0; this.divide = 0 ;

        // get ball sprite by its color
        this.sprite = getBallSpriteByColor(color);

        
    }

    // update method is called every frame (see detailed description in the dock) 
    update (delta) {

        //Logic to keep reducing the speed of the ball when the ball is moving
       if(this.x>=0){
            this.x -= this.xs;
       }if(this.y>=0){
            this.y -= this.ys;
       }

       //logic to stop the ball after it is done moving
       if(this.x<0||this.y<0){
            this.x=0; this.y=0;
            
       }
        
       //This is to check if a ball has been hit by giving it a direction so it can start moving
        if(this.direction!=undefined){
            let dir = this.direction;
            let vec = new Vector2(dir.x,dir.y)
            this.x = Math.abs(vec.x) * (this.magn*0.25);        //Computing x value of the ball
            this.y = Math.abs(vec.y) * (this.magn*0.25);        //computing y value of the ball
            
            this.xs = this.x / 80;                       //this is to reduce the duration of the ball
            this.ys = this.y / 80;                       //this is to reduce the duration of the ball    
            
            //Logic to check if the ball is at the edges of the table
            if(dir.y > 0){
                this.atDedge = true;
                this.atUedge = false;
            }else if(dir.y < 0){
                this.atUedge = true;
                this.atDedge = false;
            }
            if(dir.x > 0){
                this.atRedge = false;
                this.atLedge = true;
            }else if(dir.x < 0){
                this.atRedge = true;
                this.atLedge = false;
            }
            this.direction = undefined;
        }
        
        //Logic to change the direction of the ball after hitting an edge of the table
        if(this.position.y<=70 && this.Scored!=true){
            this.atDedge = false;
            this.atUedge = true;
        }else if(this.position.y >= 760 && this.Scored!=true){
            this.atUedge = false;
            this.atDedge = true
        }
        
        if(parseInt(this.position.x)<=70 && this.Scored!=true){
            this.atLedge = false;
            this.atRedge = true;
        }else if(parseInt(this.position.x) >= 1430 && this.Scored!=true){
            this.atRedge = false;
            this.atLedge = true            
        }


        //Logic to keep ball moving after hitting the edge
        if(this.atRedge){
            this.position.x += this.x
        }else if(this.atLedge){
            this.position.x -= this.x
        }
        if(this.atDedge){
            this.position.y -= this.y
        }else if(this.atUedge){
            this.position.y += this.y
        }
        
       
    
        
    }

    // draws sprite every frame
    draw () {
        Canvas.drawImage(this.sprite, this.position,BALL_ORIGIN);
    }
    
}


