var ls = localStorage
let gameInterval;
let timerInterval;
let energyInterval;
let chicaInterval;
let foxyInterval;
let kill = false
let n;

//add in local data if nonexistent
if(ls.getItem("FNAFREVAMPED_night") == null){
    ls.setItem("FNAFREVAMPED_night", "1")
    ls.setItem("FNAFREVAMPED_night6victory", "false")
    ls.setItem("FNAFREVAMPED_night7victory", "false")
}

//todo add in animatronics
function startNight(night){
    n=night+1
    removeItem(currentAnims, "static_1")
    endSound("menuStatic")
    elem("menu_nightbegin").innerHTML = "Night " + (night+1) + "<br>12:00 AM"
    if(night == 0){
        ls.setItem("FNAFREVAMPED_night", "1")
        ls.setItem("FNAFREVAMPED_night6victory", "false")
        ls.setItem("FNAFREVAMPED_night7victory", "false")
    }
    if(night == 6) {
        elem("menu_nightbegin").innerHTML = "<span style='color: red'>The True Deprivation</span>"
    }
    showElem("menu_nightbegin")
    showElem("menu_warningbackground")
    
    setTimeout(() => {
        hideElem("menu")
        hideElem("menu_nightbegin")
        hideElem("menu_warningbackground")
        hideElem("cameraRoller")
        showElem("game")
        
        startTimer()
        startEnergy()

        rollerAssetChange("slice", officeInsideAsset[0])
        rollerAssetChange("slice5", leftButtonAsset[0]) 
        rollerAssetChange("slice6", rightButtonAsset[0])
        rollerAssetChange("slice7", CAM1AASSET[0])

        animate("static_3", fullStaticAsset, true)

        playSound("ambiance", (n==7) ? deprivationambiance : ambiance, 0.02, true)

        //set game ticks
        gameInterval = setInterval(() => {
            freddy.moveFunction()
            bonnie.moveFunction()
            chica.moveFunction()
            foxy.moveFunction()
        }, 1000);

        chicaInterval = setInterval(() => {
            (chica.up == true) ? chica.enraging+= 100 : chica.enraging -= 100   
            if (chica.enraging < 0) chica.enraging = 0;
            else if(chica.enraging >= chica.enragingLimit){
                chica.enraging = 0
                chica.enragingLimit += 250
                chica.up = false
                time-=chicaTimePull[night]
                if(time < 0) time = 0

                elem("freddyflash").style.backgroundColor = "rgb(255, 0, 0)"
                showElem("freddyflash")
                playSound("chicaerror", chicaLines.error, 0.10, false)

                setTimeout(() => {animPlayLine("chica", chicaLines.speedup, 0.07, chicaLinesText[1], 2, random(1))}, 1000); 

                $("#freddyflash").animate({
                    opacity: 0
                }, 1500, function(){
                    hideElem("freddyflash")
                    elem("freddyflash").style.opacity = "1"
                });
            }
        }, 100);
    }, 3000);

    //set everything back to their defaults
    kill = false;

    freddy.ai = freddyAImap[night]
    freddy.interval = 3
    freddy.screaminterval = freddyScreamInterval[night]
    freddy.moveenum = 0
    freddy.moveamt = 0
    freddy.position = 0
    
    bonnie.ai = bonnieAImap[night]
    bonnie.interval = 5
    bonnie.camerabreakinterval = bonnieCambreakInterval[night]
    bonnie.moveenum = 0
    bonnie.moveamt = 0
    bonnie.position = 0
    
    chica.ai = chicaAImap[night]
    chica.interval = 5
    chica.enragingLimit = chicaEnragingLimit[night]
    chica.enraging = 0
    chica.moveenum = 0
    chica.position = 0
    chica.up = false
    
    foxy.ai = foxyAImap[night]
    foxy.interval = 5
    foxy.showtimeinterval = foxyShowtimeInterval[night]
    foxy.moveenum = 0
    foxy.moveamt = 0
    foxy.stage = 0
    foxy.stealamount = 1
    foxy.showtimecheck = false

    energy = 100
    energyUsages = [0, 0, 0, 0, 0]
    time = 0
    cameraUp = false
    radarAvaible = true
    activeCamera = "CAM1A"
    rollerAssetChange("slice7", CAM1AASSET[0])
    elem("cameraname").innerText = "ShowStage"
    elem("energytext").innerText = "%100"

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

    showElem("static_2")
    hideElem("gameover_freddy")
    elem("gameover_box").style.height = "75vh"
    elem("gameover_box").style.top = "25vh"
    hideElem("cameraRoller")
    hideElem("static_3")
    hideElem("maplayout")
    hideElem("cameralines")
    hideElem("cameraname")
    hideElem("energytext")
    hideElem("mapcameras")
    hideElem("hour")
    showElem("moveLeft")
    showElem("moveLeftSmall")
    showElem("moveright")
    showElem("moverightSmall")
    showElem("monitorpullup")
    showElem("rightButtonsRoller")
    showElem("leftButtonsRoller")
    showElem("gamewontimer")
    hideElem("gamewoncard")
    hideElem("gamewon")
    
    document.getElementsByClassName("radaricon")[0].style.opacity = 0
    document.getElementsByClassName("radaricon")[1].style.opacity = 0
    document.getElementsByClassName("radaricon")[2].style.opacity = 0
    document.getElementsByClassName("radaricon")[3].style.opacity = 0

    rollerAssetChange("slice2", leftDoorAsset[0])
    rollerAssetChange("slice3", rightDoorAsset[0])

    elem("gamewontimer").innerHTML = "<p>5AM</p>"

    for(var i=1;i<11;i++){
        document.getElementsByClassName("mapcamera")[i].style.backgroundColor = "gray"
        document.getElementsByClassName("fade-triangle")[i].style.backgroundColor = "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))"
    }

    elem("CAM1A").style.backgroundColor = "red"
    elem("CAM1A").getElementsByClassName("fade-triangle")[0].style.background = "linear-gradient(to bottom, rgb(255, 0, 0), rgba(255, 255, 255, 0))"

    elem("redcircle").style.backgroundColor = "rgb(64, 210, 1)" //rgb(169, 5, 5)
}