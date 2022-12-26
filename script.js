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
let deck=[]

let dealerCount=0
let yourCout=0

let yourAceCount=0
let  dealerAceCount=0

let  canHit=true

creatTHCards()
shufelTheCards()
dealingForTheDealer()
dealForYou()

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
    messageContainer.style.display='block'
    result.forEach((res)=>{
        res.style.color='white'
    })

    dealerSum.innerHTML=dealerCount
    yourSum.innerHTML=yourCout
    if(yourCout===21){
        blackjack.style.display='block'
    }
    if(yourCout>21){
        message.innerHTML='you loose'
    }else if(dealerCount>21){
        message.innerHTML='you win'
    }else if(dealerCount>yourCout){ 
        message.innerHTML='you loose'
    }else if(yourCout>dealerCount){
        message.innerHTML='you win'
    }else if(dealerCount===yourCout){
        message.innerHTML='tie'
    }
})

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