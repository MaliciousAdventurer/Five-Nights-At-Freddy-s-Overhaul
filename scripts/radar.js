let radarAvaible = true

const camlist = ["CAM1A", "CAM1B", "CAM5", "CAM7", "CAM1C", "CAM3", "CAM6", "CAM2A", "CAM4A", "CAM2B", "CAM4B", "leftDoor", "rightDoor"]
const camlistTop = ["-2%", "12%", "30%", "8%", "40%", "58%", "52%", "52%", "52%", "78%", "78%", "82%", "82%"]
const camlistLeft = ["31.8%", "60%", "0.5%", "90%", "49%", "24%", "93.5%", "30%", "70%", "38%", "61%", "44%", "54%"]


document.addEventListener("keydown", (e) => {
    if(e.key==" " && radarAvaible == true && cameraUp == true){
        radarAvaible = false

        elem("redcircle").style.backgroundColor = "rgb(169, 5, 5)"
        playSound("radar", radarSound, 0.06, false)

        setTimeout(() => {
            document.getElementsByClassName("radaricon")[0].classList.add("flash")
            document.getElementsByClassName("radaricon")[1].classList.add("flash")
            document.getElementsByClassName("radaricon")[2].classList.add("flash")
            document.getElementsByClassName("radaricon")[3].classList.add("flash")
        }, 1000);

        var tmp = setInterval(() => {
            var x = [0, 0, 0, 0]
            x[0] = camlist.indexOf(freddy.roadmap[freddy.position])
            x[1] = camlist.indexOf(bonnie.roadmap[bonnie.position])
            x[2] = camlist.indexOf(chica.roadmap[chica.position])
            x[3] = (foxy.stage < 3) ? 4 : 7

            elem("radariconfreddy").style.left = camlistLeft[x[0]]
            elem("radariconfreddy").style.top = camlistTop[x[0]]
            elem("radariconbonnie").style.left = camlistLeft[x[1]]
            elem("radariconbonnie").style.top = camlistTop[x[1]]
            elem("radariconchica").style.left = camlistLeft[x[2]]
            elem("radariconchica").style.top = camlistTop[x[2]]
            elem("radariconfoxy").style.left = camlistLeft[x[3]]
            elem("radariconfoxy").style.top = camlistTop[x[3]]
        }, 1000);

        setTimeout(() => {
            clearInterval(tmp)

            document.getElementsByClassName("radaricon")[0].classList.remove("flash")
            document.getElementsByClassName("radaricon")[1].classList.remove("flash")
            document.getElementsByClassName("radaricon")[2].classList.remove("flash")
            document.getElementsByClassName("radaricon")[3].classList.remove("flash")

            document.getElementsByClassName("radaricon")[0].style.opacity = 0
            document.getElementsByClassName("radaricon")[1].style.opacity = 0
            document.getElementsByClassName("radaricon")[2].style.opacity = 0
            document.getElementsByClassName("radaricon")[3].style.opacity = 0
        }, 4000);
    }
})