

function generateBets (numBets) {
    let bets = []
    for (let i = 0; i < numBets; i++)  bets.push(Math.floor(Math.random()* 6 + 1));
    return bets;
}

const simulate = (numBets, testNum) => {
    // const testNum = 1000000
    // const numBets = 1; 
    const startingMoney = 1000;
    const betAmount = 10;
    let economy = 0;

    let winrate = {
        '0.5x': 0,
        '2x': 0,
        '4x': 0,
        'no win': 0,
        'total': 0
    }
    

    for(let i = 0; i < testNum; i++) {
        let money = startingMoney;
        let dices = [Math.floor(Math.random()* 6 + 1), Math.floor(Math.random()* 6 + 1), Math.floor(Math.random()* 6 + 1)];
        let bets = generateBets(numBets);
        money -= betAmount*bets.length;
    
        for(let j = 0; j < bets.length; j++) {
    
            if(dices[0] == dices[1] && dices[0] == dices[2]) {
                if(dices.includes(bets[j])) {
                    money += betAmount*4;
                    winrate["4x"]++;
                }
                else {
                    money -= betAmount;
                    winrate["no win"]++;
                }
            }
            else if(dices[0] == dices[1] || dices[0] == dices[2] || dices[1] == dices[2]) {
                if((dices[0] == bets[j] && dices[1] == bets[j]) || (dices[0] == bets[j] && dices[2] == bets[j]) || (dices[1] == bets[j] && dices[2] == bets[j])) {
                    money += betAmount*2;
                    winrate["2x"]++;
                }
                else if(dices.includes(bets[j])) {
                    money -= betAmount*0.5;
                    winrate["0.5x"]++;
                }
                else {
                    money -= betAmount;
                    winrate["no win"]++;
                }
            }
            else if(dices[0] != bets[1] && dices[1] != bets[2] && dices[2] != bets[0]) {
                if(dices.includes(bets[j])) {
                    money -= betAmount*0.5;
                    winrate["0.5x"]++;
                } 
                else {
                    money -= betAmount;
                    winrate["no win"]++;
                }
            }
            else {
                money -= betAmount;
                winrate["no win"]++;
            }
        }
    
        winrate["total"] = winrate["0.5x"] + winrate["2x"] + winrate["4x"] + winrate["no win"]
        economy += money;
    }

    console.log(`------STATISTICS of ${numBets}bet-----`)
    console.log(`0.5 Wins: ${winrate["0.5x"]} (${(winrate["0.5x"]/winrate["total"]*100).toFixed(2)}%)`);
    console.log(`2x Wins: ${winrate["2x"]} (${(winrate["2x"]/winrate["total"]*100).toFixed(2)}%)`);
    console.log(`4x Wins: ${winrate["4x"]} (${(winrate["4x"]/winrate["total"]*100).toFixed(2)}%)`);
    console.log(`No Wins: ${winrate["no win"]} (${(winrate["no win"]/winrate["total"]*100).toFixed(2)}%)`);
    console.log(`AVERAGE AMOUNT WON : ${(economy - startingMoney*testNum) /testNum}`);
    console.log(`Total Bets Placed: ${winrate["total"]}`);
        
}

simulate(1, 10000000)
simulate(2, 10000000)
simulate(3, 10000000)
simulate(4, 10000000)
simulate(5, 10000000)
simulate(6, 10000000)