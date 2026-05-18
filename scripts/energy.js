let energy = 100
let energyUsages = [0, 0, 0, 0, 0] //LL LD CM RD RL

function startEnergy(){
    energyInterval = setInterval(() => {
        var energyMultiplier = 1.0;
        for(var i = 0; i<energyUsages.length; i++){
            energyMultiplier+=energyUsages[i]/3;
        }

        energy-=0.0018*energyMultiplier
    }, 10);
}