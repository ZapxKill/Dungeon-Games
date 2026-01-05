import { player } from "./gameController.js";
import { showRandomText, showText, showRoomText } from "./StoryTextController.js";
import TextTable from "../data/TextTable.json" with {type: "json"}
import { enemyList, fleeBattle, startBattle } from "./battleController.js";
import { createElement } from "./UIController.js";
import { playerAttack, playerDefend } from "./battleController.js";
import { generate } from "./mapGenerator.js";
import { drawMap } from "./minimapDisplay.js";

const gameArea = document.getElementById("game-area");
export const CommandAreas = {
    movement: {
        elementType: "div",
        className: "command-area",
        id: undefined,
        text: undefined,
        onClickFunction: undefined,
        children: 
        [
            {
                elementType: "div",
                className: "movement-buttons",
                id: undefined,
                text: undefined,
                onClickFunction: undefined,
                children: [
                    {
                        elementType: "button",
                        className: "command-button",
                        id: "movement-up",
                        text: "↑",
                        onClickFunction: function(){
                            player.moveRoom(0)
                        },
                        children: []
                    },
                    {
                        elementType: "button",
                        className: "command-button",
                        id: "movement-left",
                        text: "←",
                        onClickFunction: function(){
                            player.moveRoom(3)
                        },
                        children: []
                    },
                    {
                        elementType: "button",
                        className: "command-button",
                        id: "movement-down",
                        text: "↓",
                        onClickFunction: function(){
                            player.moveRoom(2)
                        },
                        children: []
                    },
                    {
                        elementType: "button",
                        className: "command-button",
                        id: "movement-right",
                        text: "→",
                        onClickFunction: function(){
                            player.moveRoom(1)
                        },
                        children: []
                    }
                ]
            },
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "休息",
                onClickFunction: function(){
                    player.takeRest()
                },
                children: []
            }
        ]
    },
    crate: {
        elementType: "div",
        className: "command-area",
        id: undefined,
        text: undefined,
        onClickFunction: undefined,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "打開箱子",
                onClickFunction: function(){
                    player.openCreate()
                },
                children: []
            },
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "離開",
                onClickFunction: function(){
                    showText("你離開了箱子")
                    player.playerState = "searching"
                    player.commandAreaUpdate()
                },
                children: []
            }
        ]
    },
    battle: {
        elementType: "div",
        className: "command-area",
        id: "battle-command",
        text: undefined,
        onClickFunction: undefined,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "攻擊",
                onClickFunction: function(){
                    document.getElementById("battle-command").classList.remove("hidden")
                    const battleEnemys = document.getElementById("battle-enemys")
                    gameArea.removeChild(document.getElementById("battle-command"))
                    gameArea.appendChild(createElement(CommandAreas.attackingEnemy))
                    for(let i=0;i<enemyList.length;i++){
                        battleEnemys.children[i].addEventListener("click", attackEnemy)
                        battleEnemys.children[i].enemyIndex = i
                        battleEnemys.children[i].className = "selectable-enemy-box"  
                    }
                },
                children: []
            },
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "防禦",
                onClickFunction: function(){
                    playerDefend()
                },
                children: []
            },
            {
                elementType: "button",
                className: "command-button hidden",
                id: undefined,
                text: "技能",
                onClickFunction: function(){},
                children: []
            },
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "逃跑",
                onClickFunction: function(){
                    fleeBattle()
                },
                children: []
            }
        ]
    },
    encounterEnemy: {
        elementType: "div",
        className: "command-area",
        id: undefined,
        text: undefined,
        onClickFunction: undefined,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "戰鬥",
                onClickFunction: function(){
                    startBattle(player.currentRoom.roomEnemys)
                },
                children: []
            }
        ]
    },
    findCrate: {
        elementType: "div",
        className: "command-area",
        id: undefined,
        text: undefined,
        onClickFunction: undefined,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "靠近箱子",
                onClickFunction: function(){
                    player.playerState = "crate"
                    showRandomText(TextTable["crate-observe"])
                    player.commandAreaUpdate()
                },
                children: []
            }
        ]
    },
    findExit: {
        elementType: "div",
        className: "command-area",
        id: undefined,
        text: undefined,
        onClickFunction: undefined,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "走進大門",
                onClickFunction: function(){
                    player.enterNewLevel()
                    showText("你來到了下一層")
                },
                children: []
            }
        ]
    },
    fleeing: {
        elementType: "div",
        className: "command-area",
        id: undefined,
        text: undefined,
        onClickFunction: undefined,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "繼續",
                onClickFunction: function(){
                    player.playerState = "searching"
                    let direction = 0
                    do{
                        direction = Math.floor(Math.random() * 4)

                    }
                    while(!player.moveRoom(direction))
                },
                children: []
            }
        ]
    },
    endBattle:{
        elementType: "div",
        className: "command-area",
        id: undefined,
        text: undefined,
        onClickFunction: undefined,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "繼續",
                onClickFunction: function(){
                    player.playerState = "searching"
                    showRoomText(player.currentRoom)
                    player.commandAreaUpdate()
                },
                children: []
            }
        ]
    },
    attackingEnemy:{
        elementType: "div",
        className: "command-area",
        id: "attacking-enemy-command",
        text: undefined,
        onClickFunction: undefined,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "取消",
                onClickFunction: function(){
                    const battleEnemys = document.getElementById("battle-enemys")
                    for(let i=0;i<enemyList.length;i++){
                        battleEnemys.children[i].removeEventListener("click", attackEnemy)
                        battleEnemys.children[i].className = "enemy-box"
                    }
                    gameArea.removeChild(document.getElementById("attacking-enemy-command"))
                    gameArea.appendChild(createElement(CommandAreas.battle))
                    
                },
                children: []
            }
        ]
    },
    defeated: {
        elementType: "div",
        className: "command-area",
        id: undefined,
        text: undefined,
        onClickFunction: undefined,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: undefined,
                text: "繼續",
                onClickFunction: function(){
                    player.playerState = "searching"
                    player.position = [0,0]
                    player.currentRoom = generate()
                    player.dungeonLayer = 1
                    player.inventory = []
                    player.inventoryUpdate(player)
                    const mazeLevelLabel = document.getElementById("maze-level")
                    mazeLevelLabel.textContent = player.dungeonLayer
                    drawMap(player.currentRoom, player)
                    player.commandAreaUpdate()
                    player.attribute.health = player.attribute.maxHealth
                    player.attribute.stamina = player.attribute.maxStamina
                    player.attribute.mp = player.attribute.maxMp
                    player.playerStatsUpdate()
                    showRandomText(TextTable["new-game"])
                },
                children: []
            }
        ]
    },
}

function attackEnemy(event){
    const battleEnemys = document.getElementById("battle-enemys")
    if(playerAttack(event.currentTarget.enemyIndex)){
        gameArea.removeChild(document.getElementById("attacking-enemy-command"))
        gameArea.appendChild(createElement(CommandAreas.battle))
        for(let j=0;j<enemyList.length;j++){
            battleEnemys.children[j].removeEventListener("click", attackEnemy)
            battleEnemys.children[j].className = "enemy-box"
        }
        return
    }
    return
    
}

