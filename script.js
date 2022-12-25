let deck=[]


creatTHCards()
shufelTheCards()

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
    console.log(value)
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


