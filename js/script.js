import {ancientsData} from '../data/ancients.js';
import { getDeck } from './shuffle.js';

const ancients = document.querySelector('.ancients').childNodes;
const levelsContainer = document.querySelector('.levels');
const levels = levelsContainer.childNodes;
const shuffle = document.querySelector('.shuffle');
const stateElement = document.querySelector('.state');
const nextCard = document.querySelector('.next-card');
const lastCard = document.querySelector('.last-card');
const stages = stateElement.querySelectorAll('.stage-text');
const dotContainers = stateElement.querySelectorAll('.dots-container');

let ancientNode;
let levelNode;
let ancient;
let level;
let deck;
let stage;

addEventListeners();

function addEventListeners(){
    shuffle.addEventListener('click', shuffleDeck);
    ancients.forEach(item => {
        item.addEventListener('click', onAncientClick);
    });
    levels.forEach(item => {
        item.addEventListener('click', onLevelClick);
    });
    nextCard.addEventListener('click', getNextCard);
}

function shuffleDeck(e){
    const ancientData = ancientsData.find(item => item.id == ancient);
    let scheme = [
        ancientData.firstStage,
        ancientData.secondStage,
        ancientData.thirdStage
    ];
    deck = getDeck(level, scheme);
    initState();
    stateElement.classList.remove('hidden');
    nextCard.classList.remove('card_hidden');
    shuffle.classList.add('hidden');
}

function initState(){
    for (let i = 0; i < 3; i++){
        const dots = dotContainers[i];
        const deckStage = deck[i];
        initStageState(dots, deckStage, 'blue');
        initStageState(dots, deckStage, 'green');
        initStageState(dots, deckStage, 'brown');
    }
    stage = 0;
}

function initStageState(dots, deckStage, color){
    const colorCnt = deckStage.filter(item => item.color == color).length;
    dots.querySelector('.' + color).textContent = colorCnt;
}

function toggleShuffle(){
    stateElement.classList.add('hidden');
    nextCard.classList.add('card_hidden');
    lastCard.classList.add('card_hidden');
    lastCard.style.backgroundImage = 'none';
    shuffle.classList.remove('hidden');
    stages.forEach(item => item.classList.remove('text-disabled'));
}

function onAncientClick(e){
    if (ancientNode != e.target){
        if (ancientNode){
            ancientNode.classList.remove('active');
        }
        ancientNode = e.target;
        ancientNode.classList.add('active');
        if (!levelNode){
            levelsContainer.classList.remove('hidden');
        }
        ancient = ancientNode.classList[1];
        toggleShuffle();
    }
}

function onLevelClick(e){
    if (levelNode != e.target){
        if (levelNode){
            levelNode.classList.remove('active');
        }
        levelNode = e.target;
        levelNode.classList.add('active');
        shuffle.classList.remove('hidden');
        level = parseInt(levelNode.id);
        toggleShuffle();
    }
}

function getNextCard(){
    if (lastCard.classList.contains('card_hidden')){
        lastCard.classList.remove('card_hidden');
    }
    const next = deck[stage].pop();
    const color = next.color;

    lastCard.style.backgroundImage = `url('./assets/loader.svg')`;
    lastCard.style.backgroundSize = '32px';
    const img = new Image();
    const urlImg = `./assets/MythicCards/${color}/${next.id}.png`;
    img.src = urlImg;
    img.onload = () => {      
        lastCard.style.backgroundImage = `url('${urlImg}')`;
        lastCard.style.backgroundSize = 'cover';
    };

    let dot = dotContainers[stage].querySelector('.' + color);
    dot.textContent = parseInt(dot.textContent) - 1;
    if (deck[stage].length == 0){
        stages[stage].classList.add('text-disabled');
        stage++;
    }
    if (stage > 2){
        nextCard.classList.add('card_hidden');
    }
}
