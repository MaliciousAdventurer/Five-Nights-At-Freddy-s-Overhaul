let time = 0
let p=true

//every 84 seconds is a new hour
//chica pulls time back depending on night

//improve later
function startTimer(){
    timerInterval = setInterval(() => {
        time++
        elem("energytext").innerText = "%" + Math.ceil(energy)

        if(energy<=0 && p==true){
            p=false
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

            clearInterval(gameInterval)
            clearInterval(energyInterval)
            clearInterval(chicaInterval)
            clearInterval(foxyInterval)

            endSound("ambiance"); 
            endSound("flash")
            currentSounds.clear()

            rollerAnimate("slice2", leftDoorAsset.toReversed(), false)
            rollerAnimate("slice3", rightDoorAsset.toReversed(), false)
            hideElem("leftButtonsRoller")
            hideElem("rightButtonsRoller")
            hideElem("monitorpullup")
            showElem("moveLeft")   
            showElem("moveLeftSmall")
            showElem("moveright")
            showElem("moverightSmall")


            rollerAssetChange("slice", officeInsideAsset[5])
            playSound("energy", powerDown, 0.1, false)
            setTimeout(() => {
                playSound("freddyrun", charMoveSoundAsset, 0.08, false, () => {
                    rollerAnimate("slice", [officeInsideAsset[5], officeInsideAsset[6]], true)
                    endSound("energy")
                    if(time >= 500) return;
                    playSound("toreador", toreadorMarch, 0.08, false)
                    setTimeout(() => {
                        endSound("toreador")
                        removeItem(currentAnims, "slice")
                        setTimeout(() => {rollerAssetChange("slice", "assets/5112.png")}, 500);
                        if(time >= 500) return;
                        playSound("freddyrun", charMoveSoundAsset, 0.08, false, () => {
                            if(time >= 500) return;
                            playSound("animatronic", jumpscareSoundAsset, 0.20, false)
                            rollerAnimate("slice", freddyJumpscareAsset.second, false,  ()=>{
                                setTimeout(() => {
                                    clearInterval(timerInterval)
                                    hideElem("game")
                                    returnMenu()
                                }, 500);
                            })
                        })
                    }, 12000);
                })
            }, 3500);
        }

        if(time % 84 == 0){
            radarAvaible = true
            elem("redcircle").style.backgroundColor = "rgb(64, 210, 1)"
            $("#prevhour").animate({
                top: "-5vh"
            }, 750, () => {
                elem("prevhour").innerText = Math.round(time/84)
                elem("prevhour").style.top = "5vh"
                $("#prevhour").animate({
                    top: "0vh"
                }, 750)
            })
        }

        if(time >= 500){
            clearInterval(timerInterval)
            clearInterval(gameInterval)
            clearInterval(energyInterval)
            clearInterval(chicaInterval)
            clearInterval(foxyInterval)

            hideElem("game")
            showElem("gamewon")
            elem("gamewontimer").classList.add("flash")

            endSound("ambiance")
            endSound("toreador")

            playSound("osdfk71023", nightEndSound1, 0.14, false, () => {
                $("#gamewontimer").fadeOut(500)
                
                if(n == 5 || n==6 || n==7){
                    elem("gamewoncard").src = allPaperAsset[n-4]
                    $("#gamewoncard").fadeIn(1000)
                    playSound("toreador", toreadorMarch, 0.12, false, () => {
                        $("#gamewoncard").fadeOut(1000, ()=>{hideElem('gamewon')})
                        returnMenu()
                    })
                }
                else{
                    returnMenu()
                }
            }) //go back to menu after this ends

            setTimeout(() => {
                playSound("osdfk71024", nightEndSound2, 0.10, false)
                elem("gamewontimer").innerHTML = "<p>6AM</p>"        
            }, 6000);
        }
    }, 1000);
}