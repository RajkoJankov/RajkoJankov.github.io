<template>
   <section style="text-align: center">
      <div>
         <canvas ref="myCanvas" id="snake" width="608" height="608"></canvas>
      </div>
      <v-btn large flat class="blue--text" @click="newGame">New Game</v-btn>
      <v-btn large flat class="blue--text" router to="/" >back to main menu</v-btn>
   </section>
</template>

<script>
import { setInterval, clearInterval } from 'timers';

// treba da se nabudzi gameover opcije na game screen, 
// mozda foodspawn bolji, i mozda sounds

export default {
   data() {
      return {
         box: 32,
         ground: null,
         apple: null,
         cvs: null,
         ctx: null,
         snake: null,
         score: 0,
         highscore: this.$store.getters.firstScore,
         food: null,
         game: null,
         d: ""
      }
   },
   methods: {
      gameover: function(value){
         this.$store.dispatch('gameover', value)
      },
      newGame: function() {
         this.snake = [
            {x: 9 * this.box, y: 10 * this.box},
            {x: 9 * this.box, y: 11 * this.box},
            {x: 9 * this.box, y: 12 * this.box}
         ];
         this.score = 0;
         this.food = {
            x: Math.floor(Math.random() * 17 + 1) * this.box,
            y: Math.floor(Math.random() * 14 + 4) * this.box
         }
         this.d = "";
         clearInterval(this.game);
         this.game = setInterval(this.draw, 100);
      },
      draw: function() {
         this.ctx.drawImage(this.ground, 0, 0);

         for(let i = 0; i < this.snake.length; i++) {
            this.ctx.fillStyle = (i === 0)? "green" : "hsl(120,100%,35%)";
            this.ctx.fillRect(this.snake[i].x , this.snake[i].y, this.box, this.box);

            this.ctx.strokeStyle = "black";
            this.ctx.strokeRect(this.snake[i].x , this.snake[i].y, this.box, this.box);
         }

         this.ctx.drawImage(this.apple, this.food.x, this.food.y);

         this.ctx.fillStyle="white";
         this.ctx.font="30px Comic Sans";
         this.ctx.fillText("score: " + this.score, 1.5 * this.box, 1.6 * this.box);
         this.ctx.fillText("highscore: " + this.highscore, 12 * this.box, 1.6 * this.box);

         if(this.d !== "") {
            let snakeX = this.snake[0].x;
            let snakeY = this.snake[0].y;

            if(this.d === "LEFT") snakeX -= this.box;
            if(this.d === "UP") snakeY -= this.box;
            if(this.d === "RIGHT") snakeX += this.box;
            if(this.d === "DOWN") snakeY += this.box;

            if(snakeX === this.food.x && snakeY === this.food.y) {
               this.score++;
               if(this.score > this.highscore) {this.highscore = this.score}
               this.food = {
                  x: Math.floor(Math.random() * 17 + 1) * this.box,
                  y: Math.floor(Math.random() * 14 + 4) * this.box
               }
               this.snake.forEach( part => {
                  if(part.x === this.food.x && part.y === this.food.y) {
                     this.food = {
                        x: Math.floor(Math.random() * 17 + 1) * this.box,
                        y: Math.floor(Math.random() * 14 + 4) * this.box
                     }
                  }
               });
            } else {
               this.snake.pop();
            }

            let newHead = {x: snakeX, y: snakeY}

            if(snakeX < this.box || snakeX > 17 * this.box || snakeY < 4 * this.box || 
            snakeY > 17 * this.box || this.collision(newHead, this.snake)) {
               clearInterval(this.game);
               this.gameover(this.score);
            }

            this.snake.unshift(newHead);
         }
      },
      direction: function(event) {
         if(event.keyCode === 37 && this.d !== "RIGHT") {
            this.d = "LEFT";
         } else if(event.keyCode === 38 && this.d !== "DOWN") {
            this.d = "UP";
         } else if(event.keyCode === 39 && this.d !== "LEFT") {
            this.d = "RIGHT";
         } else if(event.keyCode === 40 && this.d !== "UP" && this.d !== "") {
            this.d = "DOWN";
         }
      },
      collision: function(head, array) {
         for(let i = 0; i < array.length; i++) {
            if(head.x === array[i].x && head.y === array[i].y) {
               return true;
            }
         } return false;
      }
   },   
   mounted: function(){
      //creating image files
      this.ground = new Image();
      this.ground.src = "../images/snake_background.png";

      this.apple = new Image();
      this.apple.src = "../images/apple.png";

      this.food = {
         x: Math.floor(Math.random() * 17 + 1) * this.box,
         y: Math.floor(Math.random() * 14 + 4) * this.box
      };

      this.snake = [
            {x: 9 * this.box, y: 10 * this.box},
            {x: 9 * this.box, y: 11 * this.box},
            {x: 9 * this.box, y: 12 * this.box}
      ];

      this.cvs = this.$refs.myCanvas;
      this.ctx = this.cvs.getContext("2d");

      document.addEventListener("keydown", this.direction);

      this.game = setInterval(this.draw, 100);
   }
}
</script>

