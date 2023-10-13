const front=document.querySelector('.front')
const  content=document.querySelector('.content')
const dealerCards=document.getElementById('dealers-cards')
const yourCards=document.getElementById('your-cards')
const hitBtn=document.getElementById('hit')
const stayBtn=document.getElementById('stay')
const dealerSum=document.getElementById('dealer-sum')
const yourSum=document.getElementById('your-sum')
const result=document.querySelectorAll('.result')
const messageContainer=document.getElementById('message-container')
const blackjack=document.getElementById('blackjack')
const message=document.getElementById('message')
const reset=document.getElementById('reset')
const balenceValue=document.getElementById('balence-value')
const  betValue=document.getElementById('bet-value')
const valueContainer=document.querySelector('.value-container')
const  test=document.getElementById('test')



let deck=[]

let dealerCount=0
let yourCout=0

let yourAceCount=0
let  dealerAceCount=0

let  canHit=true

let  balence=1000
let  bet=0

creatTHCards()
shufelTheCards()
dealingForTheDealer()
dealForYou()

balenceValue.innerHTML=`${balence}$`


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
    calculateAceForDealer(card)
    front.style.background=`url('./image/${card}.png')`
    front.style.backgroundSize='cover'
    dealerCount+=value
    while(dealerCount<17){
        card=deck.pop()
        value=getValue(card)
        calculateAceForDealer(card)
        dealerCount+=value
        let newCard=document.createElement('img')
        newCard.src=`./image/${card}.png`
        dealerCards.appendChild(newCard)

        if(dealerCount>21){

            reduceDealerAce()

        }

    }

    let childrenNumber=dealerCards.childElementCount
    let lastIndex=childrenNumber-1
    for(let i=2;i<childrenNumber;i++){
        let lastChild=dealerCards.children[lastIndex]
        lastChild.style.display='none'
        
        lastIndex-=1
    }

    
}


function dealForYou(){
    for(let i=0;i<2;i++){
        let card=deck.pop()

        calculateAce(card)
        reduceAce()
        let value=getValue(card)
        yourCout+=value
        let newCard=document.createElement('img')
        newCard.src=`./image/${card}.png`
        yourCards.appendChild(newCard)


    }

}


hitBtn.addEventListener('click',()=>{
   if(canHit){
        valueContainer.style.display='none'
        if(yourCout<21){
            let card=deck.pop()
            calculateAce(card)

            let value=getValue(card)
            yourCout+=value
            let newCard=document.createElement('img')
            newCard.src=`./image/${card}.png`
            yourCards.appendChild(newCard)

        }
        if(yourCout>21){
            reduceAce()
        }


    }


})


stayBtn.addEventListener('click',()=>{
    canHit=false
    content.style.transform='rotateY(-.5turn)'
    content.style.transition='.5s'

    let childrenNumber=dealerCards.childElementCount
    for(let i=2;i<childrenNumber;i++){
        let child=dealerCards.children[i]
        child.style.display='block'
    }

   
    result.forEach((res)=>{
        res.style.color='white'
    })

    dealerSum.innerHTML=dealerCount
    yourSum.innerHTML=yourCout

    setTimeout(()=>{
        messageContainer.style.display='block'
        if(yourCout===21){
            blackjack.style.display='block'
        }
        if(yourCout>21){
            message.innerHTML='you loose'
            looseBet()
        }else if(dealerCount>21){
            message.innerHTML='you win'
            winBet()
        }else if(dealerCount>yourCout){
            message.innerHTML='you loose'
            looseBet()
        }else if(yourCout>dealerCount){
            message.innerHTML='you win'
            winBet()
        }else if(dealerCount===yourCout){
            message.innerHTML='tie'
            tieBet()
        }
    },2000)

   
    
})


function winBet(){
    let win=bet*2
    balence+=win
    balenceValue.innerHTML=`${balence}$`
    bet=0
    betValue.innerHTML=''
}

function looseBet(){
    bet=0
    betValue.innerHTML=''
}

function tieBet(){
    balence+=bet
    balenceValue.innerHTML=`${balence}$`
    bet=0
    betValue.innerHTML=''
}

function calculateAce(card){

    let  split=card.split('-')
    let value=split[0]

   if(value==='A'){
    yourAceCount+=1

   }
}


function reduceAce(){
    while(yourAceCount>0 && yourCout>21){
        yourCout-=10
        yourAceCount-=1
    }
}


function calculateAceForDealer(card){
    let  split=card.split('-')
    let value=split[0]

   if(value==='A'){
    dealerAceCount+=1

   }

}


function reduceDealerAce(){
    while(dealerAceCount>0 && dealerCount>21){

        dealerCount-=10
        dealerAceCount-=1
    }
}

reset.addEventListener('click',()=>{
    dealerCount=0
    yourCout=0

    yourAceCount=0
    dealerAceCount=0

    canHit=true
    valueContainer.style.display='flex'
    content.style.transform='rotateY(0)'
    content.style.transition='none'
    messageContainer.style.display='none'
    blackjack.style.display='none'

    result.forEach((res)=>{
        res.style.color='transparent'
    })
    deleatDealerCards()
    deleatYourCards()

    dealingForTheDealer()
    dealForYou()

    if(deck.length<=15){
        creatTHCards()
        shufelTheCards()
    }
})




function deleatDealerCards(){
    let childrenNumber=dealerCards.childElementCount
    for (let i=1;i<childrenNumber;i++){
        let lastChild=dealerCards.lastElementChild
        dealerCards.removeChild(lastChild)
    }
}


function deleatYourCards(){
    let childrenNumber=yourCards.childElementCount
    for(let i=0;i<childrenNumber;i++){
        let lastChild=yourCards.lastElementChild
        yourCards.removeChild(lastChild)
    }
}

//50$
document.getElementById('small').addEventListener('click',()=>{
    bet=50
    betValue.innerHTML=`${bet}$`
    valueContainer.style.display='none'
    balence-=bet
    balenceValue.innerHTML=`${balence}$`

})

//100$

document.getElementById('midium').addEventListener('click',()=>{
    bet=100
    betValue.innerHTML=`${bet}$`
    valueContainer.style.display='none'
    balence-=bet
    balenceValue.innerHTML=`${balence}$`
})

//500

document.getElementById('heigh').addEventListener('click',()=>{
    bet=500
    betValue.innerHTML=`${bet}$`
    valueContainer.style.display='none'
    balence-=bet
    balenceValue.innerHTML=`${balence}$`
})

