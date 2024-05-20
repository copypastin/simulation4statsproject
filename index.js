const testNum = 10000000

function generateBets (numBets) {
    let bets= []
    for (let i = 0; i < numBets; i++) {
        bets.push(Math.floor(Math.random()* 6 + 1))
    }

    return bets;

}

let result = 0;

for(let i = 0; i < testNum; i++) {
    let dices = [Math.floor(Math.random()* 6 + 1), Math.floor(Math.random()* 6 + 1), Math.floor(Math.random()* 6 + 1)];
    let bets = generateBets(2);
    for(let j = 0; j < bets.length; j++) {
        if(dices.includes(bets[j])) {
            result += 1;
        }
    }
}

console.log(`Winrate: ${result/testNum * 100}%`)