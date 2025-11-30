/* VARIABLES */
let maze;
let score = 0;
let craneAni;
let x1, x2, x3, x4, x5, x6, x7, x8, x9, x10;
let y1, y2, y3, y4, y5, y6, y7, y8, y9, y10;
let light;
let player;
let crane;
let isPlaying = false;
let bgSongNum;
let bgSong;
let cranes = [];

function preload() {
  gif = loadImage('assets/happybirb.gif');
  song = loadSound('assets/tada-fanfare-a-6313.mp3');
  song1 = loadSound('assets/path.mp3');
  song2 = loadSound('assets/chihiro.mp3');
  song3 = loadSound('assets/carryingyou.mp3');
  song4 = loadSound('assets/fragilefantasy.mp3');
  song5 = loadSound('assets/presence.mp3');
  collect = loadSound('assets/collect.mp3');
}

/* SETUP RUNS ONCE */
function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(500, 500);
  /*var s = 50;
  var rows = floor(height/s);
  var cols = floor(width/s);
	
  maze = new Maze(rows, cols, s);
  maze.initialize();
  maze.construct(0, 0, rows, cols);
  frameRate(100);*/

  //Randomly generates 10 coordinates for 10 cranes
  x1 = random(1, 8333);
  x2 = random(1, 8333);
  x3 = random(1, 8333);
  x4 = random(1, 8333);
  x5 = random(1, 8333);
  x6 = random(1, 8333);
  x7 = random(1, 8333);
  x8 = random(1, 8333);
  x9 = random(1, 8333);
  x10 = random(1, 8333);
  y1 = random(1, 8333);
  y2 = random(1, 8333);
  y3 = random(1, 8333);
  y4 = random(1, 8333);
  y5 = random(1, 8333);
  y6 = random(1, 8333);
  y7 = random(1, 8333);
  y8 = random(1, 8333);
  y9 = random(1, 8333);
  y10 = random(1, 8333);

  craneAni = loadAnimation(
    'assets/crane1.PNG',
    'assets/crane2.PNG',
    'assets/crane3.PNG',
    'assets/crane4.PNG',
    'assets/crane5.PNG',
    'assets/crane6.PNG',
    'assets/crane7.PNG',
    'assets/crane8.PNG',
    'assets/crane9.PNG',
    'assets/crane10.PNG',
    'assets/crane11.PNG',
    'assets/crane12.PNG',
    'assets/crane13.PNG',
    'assets/crane14.PNG',
    'assets/crane15.PNG',
    'assets/crane16.PNG',
    'assets/crane17.PNG',
    'assets/crane18.PNG',
    'assets/crane19.PNG',
    'assets/crane20.PNG'
  );
  craneAni.frameDelay = 3;
  craneAni.depth = 10;

  bgSongNum = Math.floor(random(1, 5));
  if (bgSongNum == 0) {
    bgSong = song1;
  } else if (bgSongNum == 1) {
    bgSong = song2;
  } else if (bgSongNum == 2) {
    bgSong = song3;
  } else if (bgSongNum == 3) {
    bgSong = song4;
  } else {
    bgSong = song5;
  }

  /*background("#404357");
  textSize(20);
  textAlign(CENTER);
  noStroke();
  text("People say that if you manage to fold 1000 \norigami cranes, you are granted a singular \nwish. The objective of this game is to collect \n1000 cranes from this dark maze. Each crane will \nadd to the amount of light you have, and is \nequivalent to 100 paper cranes :)", width/2, height/2-70);
  setTimeout(draw, 1000);*/

  light = createSprite(20, 20, 60);
  light.shape = "circle";
  light.color = "#dfe4ed";
  light.depth = 0;
  player = createSprite(10, 20, 20, 20);
  player.overlaps(light);
  player.depth = 1;
  player.addAni('side', 'assets/side1.png',
    'assets/side2.png',
    'assets/side3.png',
    'assets/side4.png');
  player.addAni('forward', 'assets/forward1.png',
    'assets/forward2.png',
    'assets/forward3.png',
    'assets/forward4.png');
  player.addAni('backward', 'assets/back1.png',
    'assets/back2.png',
    'assets/back3.png',
    'assets/back4.png');
  player.addAni('idle', 'assets/idle.png');
  //player.height = 10;

  for (let i = 0; i < 10; i++) {
    let crane = createSprite(0, 0);
    crane.addAni('fly', craneAni);
    crane.ani = 'fly';
    crane.rotation = 0;
    crane.rotationSpeed = 0;
    crane.depth = 10;
    crane.scale = 0.06;
    crane.visible = false;
    cranes.push(crane);
  }
}

function draw() {
  clear();
  //background("#404357");
  background("#1d1e26");

  if (kb.presses("space")) {
    if (bgSong.isPlaying()) {
      bgSong.stop();
    } else {
      let newSongNum = Math.floor(random(1, 5));
      if (newSongNum == 0) {
        bgSong = song1;
      } else if (newSongNum == 1) {
        bgSong = song2;
      } else if (newSongNum == 2) {
        bgSong = song3;
      } else if (newSongNum == 3) {
        bgSong = song4;
      } else {
        bgSong = song5;
      }
      bgSong.play();
    }
  }

  strokeWeight(1);

  //maze.display();
  textSize(12);
  text("Use your arrow keys to move \naround. It's pitch black right now, \nbut as you collect more cranes, \nthe amount of light you have will \nincrease :) Collect ten cranes!", width - 100, 60);
  text("Press space to play/stop bg music", width - 320, 30);
  text("People say, if you fold 1000 origami \ncranes, you will be granted one singular wish...", 150, height - 45);

  //Display Score
  fill("#ffffff");
  textAlign(CENTER);
  textSize(20);
  text(score + " Origami Cranes", 395, 35);

  //Makes it so the light moves dynamically with the player
  if (kb.pressing("left")) {
    if (light.x == player.x) {
      light.x -= light.d / 6;
    }
    if (light.y != player.y) {
      light.y = player.y;
    }
    player.ani = 'side';
    player.vel.x = -2;
    player.vel.y = 0;
    player.mirror.x = false;
    light.vel.x = -2;
    light.vel.y = 0;
  } else if (kb.pressing("right")) {
    if (light.x == player.x) {
      light.x += light.d / 6;
    }
    if (light.y != player.y) {
      light.y = player.y;
    }
    player.ani = 'side';
    player.vel.x = 2;
    player.vel.y = 0;
    player.mirror.x = true;
    light.vel.x = 2;
    light.vel.y = 0;
  } else if (kb.pressing("up")) {
    if (light.x != player.x) {
      light.x = player.x;
    }
    if (light.y == player.y) {
      light.y -= light.d / 6;
    }
    player.mirror.x = false;
    player.ani = 'backward';
    player.vel.y = -2;
    player.vel.x = 0;
    light.vel.x = 0;
    light.vel.y = -2;
  } else if (kb.pressing("down")) {
    if (light.x != player.x) {
      light.x = player.x;
    }
    if (light.y == player.y) {
      light.y += light.d / 6;
    }
    player.ani = 'forward';
    player.vel.y = 2;
    player.vel.x = 0;
    light.vel.x = 0;
    light.vel.y = 2;
  } else {
    if (light.x != player.x) {
      light.x = player.x;
    }
    if (light.y != player.y) {
      light.y = player.y;
    }
    player.ani = 'idle';
    player.vel.x = 0;
    player.vel.y = 0;
    light.vel.x = 0;
    light.vel.y = 0;
  }

  //Checks if there's a crane in the player's line of sight
  if (Math.abs(light.x - x1 * 0.06) <= light.d / 2 && Math.abs(light.y - y1 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x1, y1);
    pop();

    if (Math.abs(light.x - x1 * 0.06) <= 10 && Math.abs(light.y - y1 * 0.06) <= 10) {
      collect.play();
      score += 100;
      light.d += 10;
      x1 = -1000;
      y1 = -1000;
    }
  }

  if (Math.abs(light.x - x2 * 0.06) <= light.d / 2 && Math.abs(light.y - y2 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x2, y2);
    pop();

    if (Math.abs(light.x - x2 * 0.06) <= 10 && Math.abs(light.y - y2 * 0.06) <= 10) {
      //if (!collect.isPlaying()) {
      collect.play();
      //}
      //collect.stop(2);
      score += 100;
      light.d += 10;
      x2 = -2000;
      y2 = -2000;
    }
  }

  if (Math.abs(light.x - x3 * 0.06) <= light.d / 2 && Math.abs(light.y - y3 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x3, y3);
    pop();

    if (Math.abs(light.x - x3 * 0.06) <= 10 && Math.abs(light.y - y3 * 0.06) <= 10) {
      collect.play();
      score += 100;
      light.d += 10;
      x3 = -3000;
      y3 = -3000;
    }
  }

  if (Math.abs(light.x - x4 * 0.06) <= light.d / 2 && Math.abs(light.y - y4 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x4, y4);
    pop();

    if (Math.abs(light.x - x4 * 0.06) <= 10 && Math.abs(light.y - y4 * 0.06) <= 10) {
      collect.play();
      score += 100;
      light.d += 10;
      x4 = -300;
      y4 = -300;
    }
  }

  if (Math.abs(light.x - x5 * 0.06) <= light.d / 2 && Math.abs(light.y - y5 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x5, y5);
    pop();

    if (Math.abs(light.x - x5 * 0.06) <= 10 && Math.abs(light.y - y5 * 0.06) <= 10) {
      collect.play();
      score += 100;
      light.d += 10;
      x5 = -400;
      y5 = -400;
    }
  }

  if (Math.abs(light.x - x6 * 0.06) <= light.d / 2 && Math.abs(light.y - y6 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x6, y6);
    pop();
    
    if (Math.abs(light.x - x6 * 0.06) <= 10 && Math.abs(light.y - y6 * 0.06) <= 10) {
      collect.play();
      score += 100;
      light.d += 10;
      x6 = -500;
      y6 = -500;
    }
  }

  if (Math.abs(light.x - x7 * 0.06) <= light.d / 2 && Math.abs(light.y - y7 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x7, y7);
    pop();

    if (Math.abs(light.x - x7 * 0.06) <= 10 && Math.abs(light.y - y7 * 0.06) <= 10) {
      collect.play();
      score += 100;
      light.d += 10;
      x7 = -600;
      y7 = -600;
    }
  }

  if (Math.abs(light.x - x8 * 0.06) <= light.d / 2 && Math.abs(light.y - y8 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x8, y8);
    pop();

    if (Math.abs(light.x - x8 * 0.06) <= 10 && Math.abs(light.y - y8 * 0.06) <= 10) {
      collect.play();
      score += 100;
      light.d += 10;
      x8 = -600;
      y8 = -600;
    }
  }

  if (Math.abs(light.x - x9 * 0.06) <= light.d / 2 && Math.abs(light.y - y9 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x9, y9);
    pop();

    if (Math.abs(light.x - x9 * 0.06) <= 10 && Math.abs(light.y - y9 * 0.06) <= 10) {
      collect.play();
      score += 100;
      light.d += 10;
      x9 = -600;
      y9 = -600;
    }
  }

  if (Math.abs(light.x - x10 * 0.06) <= light.d / 2 && Math.abs(light.y - y10 * 0.06) <= light.d / 2) {
    push();
    scale(0.06);
    animation(craneAni, x10, y10);
    pop();
    
    if (Math.abs(light.x - x10 * 0.06) <= 10 && Math.abs(light.y - y10 * 0.06) <= 10) {
      collect.play();
      score += 100;
      light.d += 10;
      x10 = -600;
      y10 = -600;
    }
  }

  if (score == 1000) {
    endScreen();
  }
}

/*
function introScreen() {
  
}*/

function endScreen() {
  light.visible = false;
  player.visible = false;
  for (let crane of cranes) {
    crane.visible = false;
  }
  background("#6e8fc4");
  //background("#dfe4ed");
  if (!isPlaying) {
    song.play();
    isPlaying = true;
  }
  song.stop(2);
  textAlign(CENTER);
  //textColor("#1d1e26")
  text("You winnnnn!!!!! \nGo ahead and make a wish. \nWho knows, maybe it will \ncome true someday :)", width / 2, height / 2 - 135);
  
  push();
  scale(0.908);
  image(gif, 27, height / 2 + 10);
  pop();

  push();
  scale(0.06);
  animation(craneAni, 8100, 700);
  //scale(-1, 1);
  animation(craneAni, 850, 700);
  pop();
  //animation(craneAni, 4475, 700);
  //setTimeout(endScreen, 1000);
}

