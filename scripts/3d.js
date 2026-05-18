let rotateAmount = 170
let camRotateAmount = 85.4
let rotateSide = 0 //0 means right, 1 means left, -1 means stand still this won't hurt
const minturn = [-100, 20, -190, -40, -40, 10, 50, -60, 20, 30, -110]
let n6 = 0

// office rotate
setInterval(() => {
    if(getComputedStyle(document.getElementById("moveLeft")).getPropertyValue('--hovered') == 1 && rotateAmount >= 85.4){
        rotateAmount = rotateAmount - 2.0
    }
    if(getComputedStyle(document.getElementById("moveLeftSmall")).getPropertyValue('--hovered') == 1 && rotateAmount >= 85.4){
        rotateAmount = rotateAmount - 0.6
    }
    if(getComputedStyle(document.getElementById("moveLeft")).getPropertyValue('--hovered') == 1 && rotateAmount < 85.4){
        rotateAmount = 85.4
    }
    if(getComputedStyle(document.getElementById("moveLeftSmall")).getPropertyValue('--hovered') == 1 && rotateAmount < 85.4){
        rotateAmount = 85.4
    }
    if(getComputedStyle(document.getElementById("moveright")).getPropertyValue('--hovered') == 1 && rotateAmount <= 251){
        rotateAmount = rotateAmount + 2.0
    }
    if(getComputedStyle(document.getElementById("moverightSmall")).getPropertyValue('--hovered') == 1 && rotateAmount <= 251){
        rotateAmount = rotateAmount + 0.6
    }
    if(getComputedStyle(document.getElementById("moveright")).getPropertyValue('--hovered') == 1 && rotateAmount > 251){
        rotateAmount = 251
    }
    if(getComputedStyle(document.getElementById("moverightSmall")).getPropertyValue('--hovered') == 1 && rotateAmount > 251){
        rotateAmount = 251
    }

    if(camRotateAmount <= 85.4){
        rotateSide = -1
        setTimeout(() => {
            rotateSide = 0
            camRotateAmount += 0.3
        }, 2000);
    }
    else if(camRotateAmount >= 251){
        rotateSide = -1
        setTimeout(() => {
            rotateSide = 1
            camRotateAmount -= 0.3
        }, 2000);
    }

    switch(rotateSide){
        case 0:
            camRotateAmount += 0.3
        break;
        
        case 1: 
            camRotateAmount -= 0.3
        break;
    }

    elem("officeRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("leftDoorRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("rightDoorRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("goldenFreddyRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("leftButtonsRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("rightButtonsRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("cameraRoller").style.transform = "rotateY(" + camRotateAmount + "deg)"

    elem(activeCamera).querySelector(".fade-triangle").style.transform = "rotate(" + (minturn[n6] + (camRotateAmount/4)) + "deg) translateZ(-1px)"
}, 10);

function rollerAssetChange(elem, asset, func, ...parameters){
    var t = document.getElementsByClassName(elem)
    for (var j = 0; j < t.length; j++) {
        t[j].style.backgroundImage = "url('"+asset+"')"
    }
    if(func != undefined) func(parameters)
}

function rollerAnimate(elem, asset, loop, func, ...parameters){
    if(currentAnims.includes(elem))
        return false;

    const frame = 24
    var anim = setInterval;
    currentAnims.push(elem)
    
    switch(loop){
        case false:
            var i=0;
            anim = setInterval(() => {
                rollerAssetChange(elem, asset[i])
                
                if(i >= asset.length - 1){
                    removeItem(currentAnims, elem)
                    clearInterval(anim);
                    if(func != undefined) func(parameters)
                }
                else
                    i++
            }, frame);
            break;

        case true:
            var i=0;
            anim = setInterval(() => {
                var t = document.getElementsByClassName(elem)
                for (var j = 0; j < t.length; j++) {
                    t[j].style.backgroundImage = "url('"+asset[i]+"')"
                }
                if(func != undefined) func(parameters)
                if(i >= asset.length - 1){
                    if(!currentAnims.includes(elem)) clearInterval(anim)
                    i=0
                }
                else
                    i++
            }, frame);
    }
    return true;
}