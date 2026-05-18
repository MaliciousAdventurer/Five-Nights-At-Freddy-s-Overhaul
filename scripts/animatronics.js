//testing out scream animation

const freddyAImap = [0, 0, 2, 4, 4, 7, 20]
const freddyScreamInterval = [-1, -1, 35, 30, 15, 12, 5];

const bonnieAImap = [1, 3, 2, 7, 8, 14, 20]
const bonnieCambreakInterval = [-1, -1, 20, 18, 16, 14, 8]

const chicaAImap = [1, 0, 2, 4, 4, 7, 20]
const chicaEnragingLimit = [511000, 511000, 2500, 2200, 1750, 1500, 1050]
const chicaTimePull = [-1, -1, 10, 12, 15, 18, 21]

const foxyAImap = [1, 2, 3, 6, 8, 12, 20]
const foxyShowtimeInterval = [-1, -1, 20, 15, 12, 8, 6]

let map = new Map()
map.set("CAM1A", ["freddy", "chica", "bonnie"])
map.set("CAM1B", [])
map.set("CAM5", [])
map.set("CAM7", [])
map.set("CAM1C", ["foxy"])
map.set("CAM3", [])
map.set("CAM6", [])
map.set("CAM2A", [])
map.set("CAM2B", [])
map.set("CAM4A", [])
map.set("CAM4B", [])
map.set("leftDoor", [])
map.set("rightDoor", [])

const freddy = {
    moveenum      :0, //increases, when reaches interval, movement happens
    interval      :0,
    moveamt       :0,
    screaminterval:0, //per move
    ai            :0,
    roadmap: ["CAM1A", "CAM1B", "CAM7", "CAM6", "CAM4A", "CAM4B", "rightDoor"], //convert others to like this
    position      :0,
    moveFunction: () => {
        freddy.moveenum++
        
        //interval reached
        if(freddy.moveenum >= freddy.interval){
            freddy.moveenum = 0
            freddy.moveamt++;

            if(cameraUp == true && activeCamera == freddy.roadmap[freddy.position]){
                return;
            }

            if(freddy.ai >= random(20)){                
                if(cameraUp){
                    if(activeCamera == freddy.roadmap[freddy.position+1]){
                        animatronicProgress("freddy")
                        cameraAssetSwitch()
                    }
                    else{
                        animatronicProgress("freddy")
                    }
                }else{
                    animatronicProgress("freddy")
                }
            }
        }

        if(freddy.moveamt == freddy.screaminterval){
            freddy.moveamt = 0
            playSound("freddyflash", freddyLines.scream[0], 0.10, false)
                     
            setTimeout(() => {
                elem("freddyflash").style.backgroundColor = "rgb(255, 255, 255)"
                showElem("freddyflash")
                elem("game").style.filter = "blur(4px)"
                
                if(bonnie.pos != 6){animatronicProgress("bonnie"); bonnie.moveenum = 0; bonnie.moveamt++}
                if(chica.pos != 6){animatronicProgress("chica"); chica.moveenum = 0}
                if(foxy.stage < 3 && cameraUp == false){animatronicProgress("foxy"); foxy.moveenum = 0}

                setTimeout(() => {animPlayLine("freddy", freddyLines.screamline, 0.07, freddyLinesText[3], 0, random(2))}, 1400); 
                
                
                setTimeout(() => {
                    elem("game").style.filter = "blur(0px)"
                }, 3000);

                $("#freddyflash").animate({
                    opacity: 0
                }, 2000, function(){
                    hideElem("freddyflash")
                    elem("freddyflash").style.opacity = "1"
                });

            }, 1000);
        }
    }
}

const bonnie = {
    moveenum           :0,
    interval           :0,
    moveamt            :0,
    camerabreakinterval:0,
    ai                 :0,
    roadmap: ["CAM1A", "CAM1B", "CAM5", "CAM3", "CAM2A", "CAM2B", "leftDoor"],
    position           :0,
    moveFunction: () => {
        bonnie.moveenum++;

        if(bonnie.moveenum == bonnie.interval){
            bonnie.moveenum = 0
            bonnie.moveamt++;

            if(bonnie.ai >= random(20)){
                if(cameraUp){
                    if(activeCamera == bonnie.roadmap[bonnie.position] || activeCamera == bonnie.roadmap[bonnie.position+1]){
                        animatronicProgress("bonnie")
                        cameraAssetSwitch()
                    }
                    else{
                        animatronicProgress("bonnie")
                    }
                }else{
                    animatronicProgress("bonnie")
                }
            }
        }

        if(bonnie.moveamt == bonnie.camerabreakinterval){
            bonnie.moveamt = 0

            var tmpmap = Array.from(map.keys())
            removeItem(tmpmap, bonnie.roadmap[bonnie.position], "CAM2A", "rightDoor", "leftDoor", activeCamera)

            const scrcam = tmpmap[random(tmpmap.length - 1)]

            playSound("scrcam", bonnieLines.camerabreak, (cameraUp) ? 0.83 : 0.10, false, //function paarameters after this
            animPlayLine, "bonnie", bonnieLines.camerabreakline, 0.08, bonnieLinesText[0], 1, random(3))

            elem(scrcam).style.pointerEvents = "none"
            elem(scrcam).style.opacity = "0.5"
            setTimeout(() => {
                elem(scrcam).style.pointerEvents = "all"
                elem(scrcam).style.opacity = "1"
            }, parseInt(ls.getItem("FNAFREVAMPED_night")) * 1000);
        }
    }
}

const chica = {//chicky chicky time
    moveenum     :0,
    interval     :0,
    enraging     :0,//every milisecond you look at her camera this increases, if it reachees to enragingLimit decrease interval 2s and reset 
    enragingLimit:0,//the interval after she bonks the door
    up           :false,
    ai           :0,
    roadmap: ["CAM1A", "CAM1B", "CAM7", "CAM6", "CAM4A", "CAM4B", "rightDoor"],
    position     :0,
    moveFunction: () => {
        chica.moveenum++;

        if(chica.moveenum == chica.interval){
            chica.moveenum = 0

            if(chica.ai >= random(20)){
                if(cameraUp){
                    if(activeCamera == chica.roadmap[chica.position] || activeCamera == chica.roadmap[chica.position+1]){
                        animatronicProgress("chica")
                        cameraAssetSwitch()
                    }
                    else{
                        animatronicProgress("chica")
                    }
                }else{
                    animatronicProgress("chica")
                }
            }
        }
    }
}

const foxy = {
    moveenum         :0,
    interval         :0,
    moveamt          :0,
    stage            :0, //not checking showtime after 2 seconds decreases his interval by 1s
    showtimecheck    :0, //set to false every time its showtime and checking his camera sets to true (check on camera change and camera flip)
    showtimeinterval :0,
    stealamount      :1, //+1 on every door bonk/showtime fail
    doorcheck        :0, //basically a timer set to whenever he is going to bonk the door. it gets set to 10 and starts decreasing towards 0
    ai               :0, //if you check the camera he runs, the interval is SET to 2ish seconds
    moveFunction: () => {
        foxy.moveenum++;
        if(foxy.moveenum >= foxy.interval){
            foxy.moveenum = 0
            foxy.moveamt++

            if(cameraUp == true){
                return;
            }

            else if(foxy.ai >= random(20)){
                animatronicProgress("foxy")
            }
        }

        if(foxy.moveamt == foxy.showtimeinterval){
            foxy.moveenum = 0
            foxy.moveamt = 0

            if(activeCamera == "CAM1C" && cameraUp == true) return;

            foxy.showtimecheck = false
            animPlayLine("foxy", foxyLines.showreminder, 0.08, foxyLinesText[1], 3, 0)

            setTimeout(() => {
                endSound("foxy")

                if(foxy.showtimecheck == false){
                    foxy.interval-=1
                    if(foxy.interval<1)foxy.interval=1
                    animPlayLine("foxy", foxyLines.showfail, 0.08, foxyLinesText[2], 3, random(1))
                }
                else{
                    foxy.moveenum = 0
                }
            }, 2500);
        }
    }
}

function animatronicMove(anim, animName, lastPos){
    //change old camera
    //console.log(animName, anim.roadmap[anim.position])
    const tmp1 = map.get(anim.roadmap[anim.position]).filter(item => item !== animName)
    map.set(anim.roadmap[anim.position], tmp1)
    anim.position = lastPos
    
    //change new camera
    const tmp2 = [...map.get(anim.roadmap[anim.position]), animName]
    map.set(anim.roadmap[anim.position], tmp2)
    
    console.log(animName + " moved to pos" + anim.roadmap[anim.position])
    console.log(map)
}

function animatronicProgress(anim){
    switch(anim){
        case "freddy":
            if(freddy.position < 6){
                if(random(3) == 0)  animPlayLine("freddy", freddyLines.laugh, 0.07, freddyLinesText[4], 0, random(3)) 
                animatronicMove(freddy, "freddy", freddy.position+1)
            }

            else if(freddy.position == 6){ //he's at rightdoor
                if(energyUsages[3] == 0) animatronicKill("freddy")

                else{
                    animPlayLine("freddy", freddyLines.doorbonk, 0.06, freddyLinesText[1], 0, random(1))
                    animatronicMove(freddy, "freddy", 1)
                }           
            }
        break;

        case "bonnie":
            if(bonnie.position < 6){
                animatronicMove(bonnie, "bonnie", bonnie.position+1)
            }

            else if(bonnie.position == 6){ //he's at rightdoor
                (energyUsages[1] == 0)
                        ? animatronicKill("bonnie")
                        : animatronicMove(bonnie, "bonnie", 1)
            }
        break;

        case "chica":
            if(chica.position < 6){
                animatronicMove(chica, "chica", chica.position+1)
            }

            else if(chica.position == 6){ //he's at rightdoor
                (energyUsages[3] == 0)
                        ? animatronicKill("chica")
                        : animatronicMove(chica, "chica", 1)
            }
        break;
        
        case "foxy":
            foxy.stage++
            console.log("foxy stage "+foxy.stage)
            if(foxy.stage == 3){
                //start kill interval
                foxy.doorcheck = 8
                foxyInterval = setInterval(() => {
                    if(foxy.doorcheck == 0){
                        (energyUsages[1] == 0) ? animatronicKill("foxy") : (energy-= foxy.stealamount, foxy.stage = 0, foxy.stealamount++, playSound("doorPounding", doorPounding, 0.10, false, animPlayLine, "foxy", foxyLines.doorbonk, 0.08, foxyLinesText[0], 3, random(1)))
                        clearInterval(foxyInterval)
                    }
                    else{
                        foxy.doorcheck-=0.5
                    }
                }, 500);
            }
        break;
    }
}

function gameOver(anim){
    hideElem("game")
    showElem("gameover")
    
    elem("static_2").style.opacity = "1"
    animate("static_2", fullStaticAsset, true);
    
    setTimeout(() => {
        hideElem("static_2")
        elem("static_2").style.opacity = "0"
        $("#gameover_box").animate({
            height: "0vh",
            top: "50vh"
        }, 300)
    }, 750);

    setTimeout(() => {
        showElem("gameover_freddy")
        showElem("static_2")

        $("#gameover_freddy").animate({
            opacity: 1
        }, 1000)
        $("#static_2").animate({
            opacity: 0.25
        }, 1000)

        switch(anim){
            case "freddy": playSound("freddy", freddyLines.kill[random(1)], 0.08, false); break;
            case "bonnie": playSound("bonnie", bonnieLines.kill[random(2)], 0.08, false); break;
            case "chica": playSound("chica", chicaLines.kill[random(2)], 0.08, false); break;
            case "foxy": playSound("foxy", foxyLines.kill[random(2)], 0.08, false); break;
        }
    }, 2000);

    setTimeout(() => {
        $("#gameover_freddy").animate({
            opacity: 0
        }, 1000)
        $("#static_2").animate({
            opacity: 0
        }, 1000)
        setTimeout(() => {
            hideElem("gameover")
            returnMenu()
        }, 1500);
    }, 6500);
}

function animatronicKill(anim){
    if(kill == true){return;}
    kill = true

    if(cameraUp == true){
        elem("monitorpullup").style.opacity = 0
        showElem("monitoranim")
        animate("monitoranim", (cameraUp == false) ? monitorUpAsset : monitorUpAsset.toReversed(), false, hideElem, "monitoranim")
        if(cameraUp==true) {
            chica.up=false
            hideElem("cameraRoller")
            hideElem("static_3")
            hideElem("maplayout")
            hideElem("mapcameras")
            hideElem("cameralines")
            hideElem("cameraname")
            hideElem("energytext")
            hideElem("hour")
        }
    }

    clearInterval(timerInterval)
    clearInterval(gameInterval)
    clearInterval(energyInterval)
    clearInterval(chicaInterval)
    clearInterval(foxyInterval)

    rotateAmount = (anim == "foxy") ? 85.4 : 160

    elem("officeRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("leftDoorRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("rightDoorRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("goldenFreddyRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("leftButtonsRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("rightButtonsRoller").style.transform = "rotateY(" + rotateAmount + "deg)"
    elem("cameraRoller").style.transform = "rotateY(" + camRotateAmount + "deg)"


    playSound("animatronic", jumpscareSoundAsset, 0.20, false, ()=>{endSound("ambiance"); currentSounds.clear()})

    switch(anim){
        case "freddy":
            rollerAnimate("slice", freddyJumpscareAsset.first, false, gameOver, anim)
        break;
        case "bonnie":
            rollerAnimate("slice", bonnieJumpscareAsset.concat(bonnieJumpscareAsset, bonnieJumpscareAsset, bonnieJumpscareAsset), false, gameOver, anim  )
        break;
        case "chica":
            rollerAnimate("slice", chicaJumpscareAsset.concat(chicaJumpscareAsset,chicaJumpscareAsset), false, gameOver, anim)
        break;
        case "foxy":
            rollerAnimate("slice", foxyJumpscareAsset.concat('assets/Jumpscares/Foxy/412.png', 'assets/Jumpscares/Foxy/412.png', 'assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png','assets/Jumpscares/Foxy/412.png',), false, gameOver, anim)
        break;
    }
}


//lines go from below to above
function animPlayLine(el, sound, level, line, anim, rand){
    if(currentSounds.has(el)) return;
    
    const colors = ["rgb(138, 113, 59)", "rgb(172, 21, 248)", "rgb(252, 219, 3)", "rgb(252, 3, 65)"]

    playSound(el, sound[rand], level, false)

    const tmp = document.createElement("div")
    const tmpp = document.createElement("img")

    tmp.className="animline"
    tmp.innerHTML="<img src='"+lineicons[anim]+"'>"+line[rand]
    tmp.style.color = colors[anim]

    elem("animlines").prepend(tmp)
    $(tmp).fadeIn(500)

    setTimeout(() => {
        $(tmp).fadeOut(500, function(){tmp.remove()})
    }, 3500);
}

//bonnie rgb(172, 21, 248);