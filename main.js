var boyElm = document.getElementById('boy-charactor');
var bgImgElm = document.getElementById('bg-image');
var idleImageNumber = 0;
var runImageNumber = 0;
var idleAnimationNumber = 0;
var runAnimationNumber = 0;
var moveBgAnimId = 0;

function idleAnimation() {
    idleImageNumber = idleImageNumber + 1;

    if (idleImageNumber == 11) {
        idleImageNumber = 1;
    }

    boyElm.src = "resources/charactor/Idle ("+ idleImageNumber +").png";
}

function idleAnimationStart() {
    idleAnimationNumber = setInterval(idleAnimation, 100);
}

function runAnimation() {
    runImageNumber = runImageNumber + 1;

    if (runImageNumber == 9) {
        runImageNumber = 1;
    }

    boyElm.src = "resources/charactor/Run ("+ runImageNumber +").png";
}

function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 50);
    clearInterval(idleAnimationNumber);
}

function keyCheck(event) {
    var keyCode = event.which;

    if (keyCode == 13) {
        if (runAnimationNumber == 0) {
            runAnimationStart();
        }
    }

    if(moveBgAnimId == 0) {
        moveBgAnimId = setInterval(moveBackground, 30);
    }
}

var backgroundPosition = 0;

function moveBackground() {
    backgroundPosition = backgroundPosition - 10
    bgImgElm.style.backgroundPositionX = backgroundPosition + "px"
}