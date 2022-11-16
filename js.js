const cardsdata=[
    {
        cardName:'img/6C.png',
        cardScore:6
    },
    {
        cardName:'img/6D.png',
        cardScore:6
    },
    {
        cardName:'img/6H.png',
        cardScore:6
    },
    {
        cardName:'img/6S.png',
        cardScore:6
    },
    {
        cardName:'img/7C.png',
        cardScore:7
    },
    {
        cardName:'img/7D.png',
        cardScore:7
    },
    {
        cardName:'img/7H.png',
        cardScore:7
    },
    {
        cardName:'img/7S.png',
        cardScore:7
    },
    {
        cardName:'img/8C.png',
        cardScore:8
    },
    {
        cardName:'img/8D.png',
        cardScore:8
    },
    {
        cardName:'img/8H.png',
        cardScore:8
    },
    {
        cardName:'img/8S.png',
        cardScore:8
    },
    {
        cardName:'img/9C.png',
        cardScore:9
    },
    {
        cardName:'img/9D.png',
        cardScore:9
    },
    {
        cardName:'img/9H.png',
        cardScore:9
    },
    {
        cardName:'img/9S.png',
        cardScore:9
    },
    {
        cardName:'img/10C.png',
        cardScore:10
    },
    {
        cardName:'img/10D.png',
        cardScore:10
    },
    {
        cardName:'img/10H.png',
        cardScore:10
    },
    {
        cardName:'img/10S.png',
        cardScore:10
    },
    {
        cardName:'img/JC.png',
        cardScore:2
    },
    {
        cardName:'img/JD.png',
        cardScore:2
    },
    {
        cardName:'img/JH.png',
        cardScore:2
    },
    {
        cardName:'img/JS.png',
        cardScore:2
    },
    {
        cardName:'img/QC.png',
        cardScore:3
    },
    {
        cardName:'img/QD.png',
        cardScore:3
    },
    {
        cardName:'img/QH.png',
        cardScore:3
    },
    {
        cardName:'img/QS.png',
        cardScore:3
    },
    {
        cardName:'img/KC.png',
        cardScore:4
    },
    {
        cardName:'img/KD.png',
        cardScore:4
    },
    {
        cardName:'img/KH.png',
        cardScore:4
    },
    {
        cardName:'img/KS.png',
        cardScore:4
    },
    {
        cardName:'img/AC.png',
        cardScore:11
    },
    {
        cardName:'img/AD.png',
        cardScore:11
    },
    {
        cardName:'img/AH.png',
        cardScore:11
    },
    {
        cardName:'img/AS.png',
        cardScore:11
    },
]


let deck = [];
let playerArray = [];
let compArray = []

let playerScore = 0;
let computerScore =0; 


//формування початкових масивів
deck = cardsdata.sort((a, b) => 0.5 - Math.random());
console.log(deck)
playerArray[0]=deck[0];
playerArray[1]=deck[1];
compArray[0] = deck[2];
compArray[1] = deck[3];

deck = deck.slice(4)



// заміна мастей в початковому масиві гравця та компа
let pArray=document.querySelectorAll('.player_cards .card_2sided .front');
 
for (let i=0;i<pArray.length;i++){
    pArray[i].setAttribute('src',`${playerArray[i].cardName}`)
}

let cArray=document.querySelectorAll('.computer_cards .card_2sided .front');

for (let i=0;i<cArray.length;i++){
    cArray[i].setAttribute('src',`${compArray[i].cardName}`)
}


// Хендлер для конопки "старт" : повертаємо карти, відображаємо колоду
document.querySelector('.start').addEventListener('click', function(){

    startTurningCards() 
    document.querySelector('.koloda_wrapper').classList.remove('hide')
    
})

// функція повороту карт гравця при старті
function startTurningCards(){
    let firstSide=document.querySelectorAll('.player_cards .back');
    let secondSide=document.querySelectorAll('.player_cards .front');
    for(let i=0;i<firstSide.length;i++){
        firstSide[i].classList.add('move1');
    }
    for(let i=0;i<secondSide.length;i++){
        secondSide[i].classList.add('move2')
    }
    document.querySelector('.enough').classList.remove('hide')
    document.querySelector('.start').classList.add('hide')
    document.querySelector('.score_block').classList.remove('unvisible')
}


//підрахунок початкових балів компа
for(const item of compArray){
    computerScore+=item.cardScore;
}
console.log(computerScore)



// функція підрахунку балів гравця і виведення на екран
calculatePlayerScore()
function calculatePlayerScore(){
    
    for(const item of playerArray){
        playerScore+=item.cardScore;
        document.getElementById('sc2').innerText = `${playerScore}`;
    }
    console.log('playerScorefirst '+ playerScore)
    
}

//функція додовання карт і повторного підрахунку очок гравця
addCarts(deck)
function addCarts(card){

    document.querySelector('.koloda_wrapper').addEventListener('click', function (){
        playerArray.push(card[0])
       
        playerScore=0
        var url = `${card[0].cardName}`;
        var image = new Image();
        image.src = url;
        document.querySelector('.player_cards').appendChild(image);
    
        card.shift(card[0])
        
        calculatePlayerScore(playerArray,playerScore)
        console.log('playerScore'+playerScore)
    }) 
}


/* гравець закінчив набирати карти, трігерим кнопку 'enough', черга компа,
комп набирає карти, поки поточні очки менше або = 16,
і під час цього показує рубашки доданих карт
*/

compTurn(compArray)
function compTurn(compArray){
document.querySelector('.enough').addEventListener('click',function(){

        for(let i=0;computerScore<=16;i++){
            
                compArray.push(deck[0]);
                
                computerScore+=deck[0].cardScore;
                deck.shift(deck[0]);

                var url2 = 'img/back.png';
                var image2 = new Image();
                image2.src = url2;
                image2.classList.add('newAdded')
                
                document.querySelector('.computer_cards').appendChild(image2);
                console.log('computerScorefirst'+computerScore)
                
                }
    
    document.querySelector('.enough').classList.add('hide')
    document.querySelector('.finish').classList.remove('hide')

    })   

} 


//трігерим кнопку 'check results' і показуємо бали компа, відкриваємо карти
finishgame()
function finishgame(){
    document.querySelector('.finish').addEventListener('click',function(){
        document.getElementById('sc1').innerText = `${computerScore}`;

        //відкриваємо карти
        let firstSide2=document.querySelectorAll('.computer_cards .back');
            let secondSide2=document.querySelectorAll('.computer_cards .front');
            for(let i=0;i<firstSide2.length;i++){
                firstSide2[i].classList.add('move1');
            }
            for(let i=0;i<secondSide2.length;i++){
                secondSide2[i].classList.add('move2')
            }
        
           let allimg = document.querySelectorAll('.newAdded')
           let j=0;
            for(let i=2; i<compArray.length;i++){
                allimg[j].setAttribute('src',`${compArray[i].cardName}`)
                j++
            }
            checkingResults()
    })
    
}

console.log('playerScore'+playerScore)

//функція перевірки і виведення фінального результату

function checkingResults(){
   console.log('computerScore'+computerScore)
   console.log('playerScore'+playerScore)
    if(computerScore<=21 && computerScore>playerScore ){
        document.querySelector('.finish').classList.add('hide')
        document.querySelector('.help').innerHTML = '<p class="loose">Computer wins</p>'
    
    } if(playerScore>21 && computerScore<=21){
        document.querySelector('.finish').classList.add('hide')
        document.querySelector('.help').innerHTML = '<p class="loose">Computer wins</p>'
    }
    if((playerScore>computerScore && playerScore<=21) || (computerScore>21 && playerScore<=21)){
        document.querySelector('.finish').classList.add('hide')
        document.querySelector('.help').innerHTML = '<p class="win">Player wins!</p>'
    }
     if((playerScore>21 && computerScore>21) || (playerScore==computerScore)){
        document.querySelector('.finish').classList.add('hide')
        document.querySelector('.help').innerHTML = '<p class="finish-res">Draw</p>'}
    
    document.querySelector('.koloda_wrapper').classList.add('hide')
    const node = document.createElement("p");
    node.className = "start-again";
    const textnode = document.createTextNode("Restart");
    node.appendChild(textnode);
    document.querySelector('.help').appendChild(node)

    document.querySelector('.start-again').addEventListener('click',function(){location.reload()})
}
