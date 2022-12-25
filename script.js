let deck=[]


creatTHCards()
shufelTheCards()
console.log(deck)
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


