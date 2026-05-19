
function returnMenu(){
    showElem("menu")
    animate("static_1", fullStaticAsset, true);
    playSound("menuStatic", menuStatic, 0.08, true)
    elem("gamewontimer").classList.remove("flash")
    hideElem("gamewon")
}

//Animates white box going down
function menuWhiteBoxAnimation(){
    setInterval(() => {
        $("#menu_whitebox").animate({
            top: vhToPixel(100).toString()
        }, 4000, function(){
            elem("menu_whitebox").style.top = "-" + vhToPixel(10).toString() + "px"
        })
    }, 5000);
}


//Animates freddy randomly
function menuFreddyAnimation(){
    setInterval(() => {
        elem("menu_freddy").src = menuFreddyAsset[random(3)]
        setTimeout(() => {elem("menu_freddy").src = menuFreddyAsset[0]}, 150);
    }, 2500);
}

$("#menu_newgame").on("mouseover", function(){elem("menu_arrow").style.top = "42.5vh"; elem("menu_arrow").style.color = "white"})
$("#menu_continue").on("mouseover", function(){elem("menu_arrow").style.top = "52.5vh"; elem("menu_arrow").style.color = "white"})
$("#menu_night6").on("mouseover", function(){elem("menu_arrow").style.top = "62.5vh"; ; elem("menu_arrow").style.color = "white"})
$("#menu_night7").on("mouseover", function(){elem("menu_arrow").style.top = "72.5vh"; elem("menu_arrow").style.color = "red"})
