const DELTA = 1/177;
let finalP = 0;                                //Initial position of ball
let initialP = 0;                             //Final position of ball
let BallClicked = false;
let BallDirection = {x:0,y:0}
let magn = 0;                               //Magnitude or speed determintor in the direction of the ball


class GameWorld {
    constructor () {
        // create the balls needed
        this.ball = new Ball(new Vector2(413, 413), Color.white);
        this.ball2 = new Ball(new Vector2(1300, 413), Color.black);
        this.ball3 = new Ball(new Vector2(1300, 450), Color.red);
        this.ball4 = new Ball(new Vector2(1300, 376), Color.yellow);
        this.ball5 = new Ball(new Vector2(1300, 487), Color.yellow);
        this.ball6 = new Ball(new Vector2(1267, 395), Color.yellow);
        this.ball7 = new Ball(new Vector2(1267, 432), Color.red);
        this.ball8 = new Ball(new Vector2(1267, 469), Color.yellow);
        this.ball9 = new Ball(new Vector2(1235, 415), Color.red);
        this.ball10 = new Ball(new Vector2(1235, 452), Color.yellow);


        //keeping the balls in an array to simplify logical codes
        this.arry = [this.ball2,this.ball3,this.ball4,this.ball5,this.ball6,this.ball7,this.ball8,this.ball9,this.ball10];

        // create the stick 20 850
        this.stick = new Stick(new Vector2(20,850));         

        // create the table
        this.table = new Table();

        //aim
        this.aim = new Aim();
    }

    

    // update method is called every frame (see detailed description in the dock) 
    update () {
        // example code for mouse inputs usage (can be removed)
        
        //Logic for collision detection between our primary ball(white) with a secondary ball
        this.arry.forEach(element => {
            if(this.ball.x!=0 ||this.ball.y!=0){ 
                if(this.ball.position.distanceFrom(element.position)<=38){
                    let direction = this.ball.position.substract(element.position)
                    element.magn = magn;
                    element.direction = direction.mult(1/direction.length());
                    this.ball.magn = direction.length();
                    
                }


            //Logic for collision detection between secondary balls
            if(element.x!=0 || element.y!=0){
                    this.arry.forEach(ele => {
                        if(element.position.distanceFrom(ele.position)<=38 && element.position.distanceFrom(ele.position) != 0 ){
                            let direction = element.position.substract(ele.position)
                            ele.magn = magn;
                            ele.direction = direction.mult(1/direction.length());
                            element.magn = direction.length();
                        }
                    });
                }
            }
            
            //Logic to detect if a secondary ball is in any of the six holes in order to score
            if(element.position.distanceFrom(hole1)<=35 || element.position.distanceFrom(hole2)<=35 || element.position.distanceFrom(hole3)<=35 || element.position.distanceFrom(hole4)<=35 || element.position.distanceFrom(hole5)<=35 || element.position.distanceFrom(hole6)<=35){
                element.Scored = true;
                element.position = new Vector2(1936,76);
            
        }
            });
        

        
        //Logic to detect mouse down on the white ball in order to activate the stick
        if (Mouse.left.down) {
            if(this.ball.position.distanceFrom(Mouse.position)<=38){
                        BallClicked = true;
                        this.stick.position = Mouse.position;
                        this.stick.rotation = Math.atan2(Mouse.position.y - this.ball.position.y, (Mouse.position.x - this.ball.position.x));   //rotates the stick in mouse's direction

                        //sets the initial mouse direction
                        if(Mouse.left.pressed){
                            initialP = Mouse.position;
                        }
                     }
            
        } 
        //this gives the final ball direction on mouse release
        else if(Mouse.left.down==false) {   
                if(BallClicked){
                    BallClicked = false;
                    finalP = Mouse.position;
                    BallDirection = finalP.substract(initialP);
                    magn = BallDirection.length();
                    this.ball.direction = BallDirection.mult(1/magn);
                    this.ball.magn = magn;
                    this.stick.position = new Vector2(20,850);
                    this.stick.rotation = 0;
                    this.aim.position = undefined;
                    this.aim.direction = undefined;
                }
        
        }

        //this allows the stick to be dragged outside the range of the ball's diameter(different from the one above)
       
            if(BallClicked){
                this.stick.position = Mouse.position;
                let direction = Mouse.position.substract(initialP);
                this.stick.rotation = Math.atan2(Mouse.position.y - this.ball.position.y, (Mouse.position.x - this.ball.position.x));
                this.aim.position = this.ball.position;
                this.aim.direction = direction;
            }
            
       

        // updating objects created in the constructor
        this.table.update(DELTA);
        this.ball.update(DELTA);
        this.ball2.update(DELTA);
        this.ball3.update(DELTA);
        this.ball4.update(DELTA);
        this.ball5.update(DELTA);
        this.ball6.update(DELTA);
        this.ball7.update(DELTA);
        this.ball8.update(DELTA);
        this.ball9.update(DELTA);
        this.ball10.update(DELTA);
        this.stick.update(DELTA);
        this.aim.update(DELTA);
    }

    // draws sprite every frame
    draw () {
        // updating objects created in the constructor
        this.table.draw();
        this.aim.draw();
        this.ball.draw();
        this.ball2.draw();
        this.ball3.draw();
        this.ball4.draw();
        this.ball5.draw();
        this.ball6.draw();
        this.ball7.draw();
        this.ball8.draw();
        this.ball9.draw();
        this.ball10.draw();
        this.stick.draw();
    }
}
