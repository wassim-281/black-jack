const front=document.querySelector('.front')
const dealerCards=document.getElementById('dealers-cards')
let deck=[]

let dealerCount=0

creatTHCards()
shufelTheCards()
dealingForTheDealer()

function creatTHCards(){
    let value=['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    let type=['D','H','S','C']
    for(let i=0;i<value.length;i++){
        for(let j=0;j<type.length;j++){
            let card=`${value[i]}-${type[j]}`
            deck.push(card)
        }
    }
}

function shufelTheCards(){
    
    
    for(let i=0;i<deck.length;i++){
        let random=Math.floor(Math.random()*deck.length)
        let place=deck[i]
        deck[i]=deck[random]
        deck[random]=place
    }
}


function getValue(card){
    
    let split=card.split('-')
    let value=split[0]
    
    if(isNaN(value)){
        let  notNum=['J','Q','K']
        let getting10=notNum.some((el)=>{
            return value===el
        })
        if(getting10){
           return 10
        }else if(value==='A'){
            return 11
        }
    }
    return parseInt(value)
    
}


function dealingForTheDealer(){
    let card=deck.pop()
    let value=getValue(card)
    front.style.background=`url('./image/${card}.png')`
    front.style.backgroundSize='cover'
    dealerCount+=value
    while(dealerCount<17){
        card=deck.pop()
        value=getValue(card)
        dealerCount+=value
        let newCard=document.createElement('img')
        newCard.src=`./image/${card}.png`
        dealerCards.appendChild(newCard)

    }
}

