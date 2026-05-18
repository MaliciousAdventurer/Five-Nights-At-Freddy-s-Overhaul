//improve later
function changeEnergy(changeEnum, elem, asset, t){
    (energyUsages[changeEnum] == 0) ? energyUsages[changeEnum] = 1 : energyUsages[changeEnum] = 0
    
    if(t == false){rollerAssetChange(elem, asset)}
    else          {rollerAnimate(elem, asset, false)}

    if(changeEnum == 0 || changeEnum == 1){
        if(energyUsages[0] == 0 && energyUsages[1] == 0) {rollerAssetChange("slice5", leftButtonAsset[0]); endSound("flash")}
        else if(energyUsages[0] == 0 && energyUsages[1] == 1) {rollerAssetChange("slice5", leftButtonAsset[1]); endSound("flash")}
        else if(energyUsages[0] == 1 && energyUsages[1] == 0) {rollerAssetChange("slice5", leftButtonAsset[2]); playSound("flash", lightSound, 0.03, true)}
        else if(energyUsages[0] == 1 && energyUsages[1] == 1) {rollerAssetChange("slice5", leftButtonAsset[3]); playSound("flash", lightSound, 0.03, true)}

        if(changeEnum == 0){
            energyUsages[4] = 0;
            (energyUsages[3] == 1) ? rollerAssetChange("slice6", rightButtonAsset[1]) : rollerAssetChange("slice6", rightButtonAsset[0])
        }
    }
    else if(changeEnum == 3 || changeEnum == 4){
        if(energyUsages[4] == 0 && energyUsages[3] == 0) {rollerAssetChange("slice6", rightButtonAsset[0]); endSound("flash")}
        else if(energyUsages[4] == 0 && energyUsages[3] == 1) {rollerAssetChange("slice6", rightButtonAsset[1]); endSound("flash")}
        else if(energyUsages[4] == 1 && energyUsages[3] == 0) {rollerAssetChange("slice6", rightButtonAsset[2]); playSound("flash", lightSound, 0.03, true)}
        else if(energyUsages[4] == 1 && energyUsages[3] == 1) {rollerAssetChange("slice6", rightButtonAsset[3]); playSound("flash", lightSound, 0.03, true)}

        if(changeEnum == 4){
            energyUsages[0] = 0;
            (energyUsages[1] == 1) ? rollerAssetChange("slice5", leftButtonAsset[1]) : rollerAssetChange("slice5", leftButtonAsset[0])
        }
    }
}

document.onclick = function(e){
    if(cameraUp == true || energy <= 0) return

    if(rotateAmount < 92 && e.x < vwToPixel(14)){
        (e.y < vhToPixel(50)) 
        ? (changeEnergy(1, "slice2", (energyUsages[1] == 0) ? leftDoorAsset : leftDoorAsset.toReversed(), true), endSound("door"), playSound("door", doorSound, 0.07, false))
        : changeEnergy(0, "slice", energyUsages[0] == 0 ? (map.get("leftDoor").includes("bonnie") ? officeInsideAsset[3] : officeInsideAsset[1]) : officeInsideAsset[0], false)
    }
    else if (rotateAmount > 244 && e.x > vwToPixel(86)){
        (e.y < vhToPixel(50)) ? 
        (changeEnergy(3, "slice3", (energyUsages[3] == 0) ? rightDoorAsset : rightDoorAsset.toReversed(), true), endSound("door"), playSound("door", doorSound, 0.07, false))
        : changeEnergy(4, "slice", energyUsages[4] == 0 ? (map.get("rightDoor").includes("chica") ? officeInsideAsset[4] : officeInsideAsset[2]) : officeInsideAsset[0], false)
    }
}