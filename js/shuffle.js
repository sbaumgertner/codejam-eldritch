import {cardsData as brownCards} from '../data/mythicCards/brown/index.js';
import {cardsData as blueCards} from '../data/mythicCards/blue/index.js';
import {cardsData as greenCards} from '../data/mythicCards/green/index.js';

function getDeck(level, scheme){
    let brownCnt = 0;
    let greenCnt = 0;
    let blueCnt = 0;
    scheme.forEach(stage => {
        brownCnt += stage.brownCards;
        greenCnt += stage.greenCards;
        blueCnt += stage.blueCards;
    });
    let cardsSet = {
        brown: getCardsByLevel(level, brownCnt, brownCards),
        blue: getCardsByLevel(level, blueCnt, blueCards),
        green: getCardsByLevel(level, greenCnt, greenCards)
    }
    let deck = new Array();
    scheme.forEach(stage => {
        deck.push(getStageCards(stage, cardsSet));
    });
    return deck;
}

function getStageCards(stageScheme, cardsSet){
    let stageCards = new Array();
    (stageScheme.greenCards === cardsSet.green.length) ?
        stageCards = stageCards.concat(cardsSet.green) :
        stageCards = stageCards.concat(
            getRandomCards(stageScheme.greenCards, cardsSet.green));
    (stageScheme.blueCards === cardsSet.blue.length) ?
        stageCards = stageCards.concat(cardsSet.blue) :
        stageCards = stageCards.concat(
            getRandomCards(stageScheme.blueCards, cardsSet.blue));
    (stageScheme.brownCards === cardsSet.brown.length) ?
        stageCards = stageCards.concat(cardsSet.brown) :
        stageCards = stageCards.concat(
            getRandomCards(stageScheme.brownCards, cardsSet.brown));
    return getRandomCards(stageCards.length, stageCards);
}

function getCardsByLevel(level, cnt, cardsSet){
    let cards;
    if (level === 1){
        let easyCards = cardsSet.filter(card => 
            card.difficulty == 'easy'
        );
        if (easyCards.length > cnt){
            cards = getRandomCards(cnt, easyCards);
        }
        else if (easyCards.length < cnt){
            let normalCards = cardsSet.filter(card => 
                card.difficulty == 'normal'
            );
            normalCards = getRandomCards(cnt - easyCards.length, normalCards);
            cards = easyCards.concat(normalCards);
        }
        else cards = easyCards;
    }
    else if (level === 2){
        cards = cardsSet.filter(card => 
            card.difficulty == 'easy' || card.difficulty == 'normal'
        );
        cards = getRandomCards(cnt, cards);
    }
    else if (level === 3){
        cards = getRandomCards(cnt, cardsSet.slice());
    }
    else if (level === 4){
        cards = cardsSet.filter(card => 
            card.difficulty == 'hard' || card.difficulty == 'normal'
        );
        cards = getRandomCards(cnt, cards);
    }
    else if (level === 5){
        let hardCards = cardsSet.filter(card => 
            card.difficulty == 'hard'
        );
        if (hardCards.length > cnt){
            cards = getRandomCards(cnt, hardCards);
        }
        else if (hardCards.length < cnt){
            let normalCards = cardsSet.filter(card => 
                card.difficulty == 'normal'
            );
            normalCards = getRandomCards(cnt - hardCards.length, normalCards);
            cards = hardCards.concat(normalCards);
        }
        else cards = hardCards;
    }
    return cards;
}

function getRandomCards(cnt, cardsSet){
    let cards = new Array();
    for (let i = 0; i < cnt; i++){
        const num = getRandomNum(cardsSet.length);
        const card = cardsSet.splice(num, 1)[0];
        cards.push(card);
    }
    return cards;
}

function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

export {getDeck}