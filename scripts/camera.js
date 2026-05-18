//fix some of the camera triangle rotations
//add in a radar mechanic? idk

let activeCamera = "CAM1A"
let cameraUp = false

$("#monitorpullup").mouseenter(function(){
    elem("monitorpullup").style.opacity = 0
    showElem("monitoranim")
    playSound("camonoff", "assets/sounds/put down.wav", 0.07, false)
    animate("monitoranim", (cameraUp == false) ? monitorUpAsset : monitorUpAsset.toReversed(), false, cameraOpen)
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
        showElem("moveLeft")
        showElem("moveLeftSmall")
        showElem("moveright")
        showElem("moverightSmall")
        endSound("dvtape")
    }
})

function cameraOpen(){
    cameraUp = !cameraUp
    elem("monitorpullup").style.opacity = 0.4
    hideElem("monitoranim")

    if(cameraUp == true){
        hideElem("moveLeft")
        hideElem("moveLeftSmall")
        hideElem("moveright")
        hideElem("moverightSmall")
        showElem("cameraRoller")
        showElem("static_3")
        showElem("maplayout")
        showElem("mapcameras")
        showElem("cameralines")
        showElem("cameraname")
        showElem("energytext")
        showElem("hour")
        cameraAssetSwitch()

        playSound("dvtape", "assets/sounds/dvtape.wav", 0.1, false)
    }
}

function cameraAssetSwitch(){
    elem("static_3").style.opacity = "1"
    $("#static_3").animate({
        opacity: 0.45
    }, 500)


    var tmp; //asset to apply to camera

    removeItem(currentAnims, "slice7")
    switch(activeCamera){
        case "CAM1A":
            elem("cameraname").innerText = "ShowStage"

            if(map.get(activeCamera).includes("freddy") && map.get(activeCamera).includes("chica") && map.get(activeCamera).includes("bonnie")) tmp=CAM1AASSET[0]
            else if(map.get(activeCamera).includes("freddy") && map.get(activeCamera).includes("chica")) tmp=CAM1AASSET[1]
            else if(map.get(activeCamera).includes("freddy") && map.get(activeCamera).includes("bonnie")) tmp=CAM1AASSET[2]
            else if(map.get(activeCamera).includes("freddy")) tmp=CAM1AASSET[4]
            else tmp=CAM1AASSET[5]
        break;
        case "CAM1B":
            elem("cameraname").innerText = "Dinner Hall"

            if(map.get(activeCamera).includes("freddy") && map.get(activeCamera).includes("chica") && map.get(activeCamera).includes("bonnie")) tmp=CAM1BASSET[4]
            else if(map.get(activeCamera).includes("bonnie") && map.get(activeCamera).includes("chica")) tmp=CAM1BASSET[5]
            else if(map.get(activeCamera).includes("bonnie")) tmp=CAM1BASSET[1]
            else if(map.get(activeCamera).includes("chica")) tmp=CAM1BASSET[2]
            else if(map.get(activeCamera).includes("freddy")) tmp=CAM1BASSET[3]
            else tmp=CAM1BASSET[0]
        break;
        case "CAM5":
            elem("cameraname").innerText = "BackStage"

            if(map.get(activeCamera).includes("bonnie")) tmp=CAM5ASSET[1]
            else tmp=CAM5ASSET[0]
        break;
        case "CAM7":
            elem("cameraname").innerText = "Toilets"

            if(map.get(activeCamera).includes("chica")) tmp=CAM7ASSET[1]
            else if(map.get(activeCamera).includes("freddy")) tmp=CAM7ASSET[2]
            else tmp=CAM7ASSET[0]
        break;
        case "CAM1C":
            foxy.showtimecheck = true
            tmp=CAM1CASSET[foxy.stage]

            if(random(999) == 1){
                elem("cameraname").innerText = "Embodiment of Hell"
                tmp="assets/h.jpg"
            }
            else
                elem("cameraname").innerText = "Pirate Cove"
        break;
        case "CAM3":
            elem("cameraname").innerText = "???"

            if(map.get(activeCamera).includes("bonnie")) tmp=CAM3ASSET[1]
            else tmp=CAM3ASSET[0]
        break;
        case "CAM6":
            elem("cameraname").innerText = "Kitchen"

            tmp="assets/5112.png"
        break;
        case "CAM2A":
            elem("cameraname").innerText = "West Hall"

            if(foxy.doorcheck > 1){
                playSound("foxyrun", charMoveSoundAsset, 0.10, false)
                foxy.doorcheck = 1
                rollerAnimate("slice7", CAM2AFOXYRUNASSET, false)
            }

            if(map.get(activeCamera).includes("bonnie")) tmp=CAM2AASSET[1]
            else tmp=CAM2AASSET[0]
        break;
        case "CAM4A":
            elem("cameraname").innerText = "East Hall"

            if(map.get(activeCamera).includes("chica")) tmp=CAM4AASSET[2]
            else if(map.get(activeCamera).includes("freddy")) tmp=CAM4AASSET[1]
            else tmp=CAM4AASSET[0]
        break;
        case "CAM2B":
            elem("cameraname").innerText = "West Corner"
            if(map.get(activeCamera).includes("bonnie")) tmp=CAM2BASSET[parseInt(ls.getItem("FNAFREVAMPED_night")) - 1 < 5 ? 1 : random(1) + 2]
            else tmp=CAM2BASSET[0]
        break;
        case "CAM4B":
            elem("cameraname").innerText = "East Corner"

            if(map.get(activeCamera).includes("chica")) tmp=CAM4BASSET[parseInt(ls.getItem("FNAFREVAMPED_night")) - 1 < 5 ? 2 : random(1) + 3]
            else if(map.get(activeCamera).includes("freddy")) tmp=CAM4BASSET[1]
            else tmp=CAM4BASSET[0]
        break;
    }

    
    rollerAssetChange("slice7", tmp)

    if(activeCamera == chica.roadmap[chica.position] && activeCamera != "CAM6"){
        chica.up=true
    }
    else{
        chica.up=false
    }
}

function cameraSwitch(camera){
    playSound("camswitch", "assets/sounds/blip3.wav", 0.06, false)

    elem(activeCamera).style.backgroundColor = "gray"
    elem(activeCamera).querySelector(".fade-triangle").style.background = "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))"

    activeCamera = camera
    n6 = camlist.indexOf(activeCamera)

    elem(activeCamera).style.backgroundColor = "red"
    elem(activeCamera).querySelector(".fade-triangle").style.background = "linear-gradient(to bottom, rgba(255, 0, 0, 1), rgba(255, 255, 255, 0))"

    cameraAssetSwitch()
}
