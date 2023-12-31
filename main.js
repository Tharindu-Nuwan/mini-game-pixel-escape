var boyElm = document.getElementById("boy-charactor");
var bgImgElm = document.getElementById("bg-image");
var idleImageNumber = 1;
var runImageNumber = 1;
var jumpImageNumber = 1;
var deadImageNumber = 1;
var idleAnimationNumber = 0;
var runAnimationNumber = 0;
var jumpAnimationNumber = 0;
var deadAnimationNumber = 0;
var barrierAnimationId = 0;

var moveBgAnimId = 0;

function idleAnimation() {
  idleImageNumber = idleImageNumber + 1;

  if (idleImageNumber == 11) {
    idleImageNumber = 1;
  }

  boyElm.src = "resources/charactor/Idle (" + idleImageNumber + ").png";
}

function idleAnimationStart() {
  idleAnimationNumber = setInterval(idleAnimation, 100);
}

function runAnimation() {
  runImageNumber = runImageNumber + 1;

  if (runImageNumber == 9) {
    runImageNumber = 1;
  }

  boyElm.src = "resources/charactor/Run (" + runImageNumber + ").png";
}

function runAnimationStart() {
  runAnimationNumber = setInterval(runAnimation, 50);
  clearInterval(idleAnimationNumber);
}

var backgroundPosition = 0;

function moveBackground() {
  backgroundPosition = backgroundPosition - 10;
  bgImgElm.style.backgroundPositionX = backgroundPosition + "px";
}

var boyMarginTop = 330;

function jumpAnimation() {
  jumpImageNumber = jumpImageNumber + 1;

  if (jumpImageNumber <= 7) {
    boyMarginTop = boyMarginTop - 20;
    boyElm.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber >= 8) {
    boyMarginTop = boyMarginTop + 20;
    boyElm.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber == 13) {
    jumpImageNumber = 1;
    clearInterval(jumpAnimationNumber);
    jumpAnimationNumber = 0;
    runImageNumber = 1;
    runAnimationStart();
  }

  boyElm.src = "resources/charactor/Jump (" + jumpImageNumber + ").png";
}

function jumpAnimationStart() {
  clearInterval(idleAnimationNumber);
  runImageNumber = 0;
  clearInterval(runAnimationNumber);
  jumpAnimationNumber = setInterval(jumpAnimation, 100);
}

barrierMarginLeft = 2000;

function createBariers() {
  for (let i = 0; i < 20; i++) {
    var barrierElm = document.createElement("div");
    barrierElm.className = "barrier";
    bgImgElm.appendChild(barrierElm);
    barrierElm.style.marginLeft = barrierMarginLeft + "px";
    barrierElm.id = "barrier" + i;

    if (i < 10) {
      barrierMarginLeft = barrierMarginLeft + 1000;
    }

    if (i >= 11) {
      barrierMarginLeft = barrierMarginLeft + 500;
    }
  }
}

function boydeadAnimation() {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;
    }

    boyElm.src = "resources/charactor/Dead (" + deadImageNumber + ").png";
}

function barrierAnimation() {
  for (let i = 0; i < 20; i++) {
    var barrier = document.getElementById("barrier" + i);
    var currentMarginLeft = getComputedStyle(barrier).marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 20;
    barrier.style.marginLeft = newMarginLeft + "px";

    if (newMarginLeft >= -50 && newMarginLeft <= 100) {
        if (boyMarginTop > 300) {
            clearInterval(barrierAnimationId);

            clearInterval(runAnimationNumber);
            runAnimationNumber = -1;
            
            clearInterval(jumpAnimationNumber);
            jumpAnimationNumber = -1;
            
            clearInterval(moveBgAnimId);
            moveBgAnimId = -1;

            deadAnimationNumber = setInterval(boydeadAnimation, 100)
        }
    }
  }
}


function keyCheck(event) {
  var keyCode = event.which;

  if (keyCode == 13) {
    if (runAnimationNumber == 0) {
      runAnimationStart();
    }
    if (moveBgAnimId == 0) {
      moveBgAnimId = setInterval(moveBackground, 60);
    }
    if (barrierAnimationId == 0) {
      barrierAnimationId = setInterval(barrierAnimation, 60);
    }
  }

  if (keyCode == 32) {
    if (jumpAnimationNumber == 0) {
      jumpAnimationStart();
    }
    if (moveBgAnimId == 0) {
      moveBgAnimId = setInterval(moveBackground, 60);
    }
    if (barrierAnimationId == 0) {
      barrierAnimationId = setInterval(barrierAnimation, 60);
    }
  }
}
