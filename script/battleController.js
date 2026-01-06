import { player } from "./gameController.js";
import { createElement } from "./UIController.js";
import { CommandAreas } from "./CommandAreas.js";
import { enterBattleUI, leaveBattleUI, showText} from "./StoryTextController.js";
import ItemTable from "../data/ItemTable.json" with {type: "json"};
const gameArea = document.getElementById("game-area");
const descriptionBox = document.getElementById("description-box");
let battleDescriptionString = ""
let nextAttackEnemyIndex = 0
let lootItems = []
export let enemyList = []
let enemyNameSeen = []
export const BattleArea = {
    elementType: "div",
    className: undefined,
    id: "battle-area",
    text: undefined,
    onClickFunction: undefined,
    children: [
        {
            elementType: "div",
            className: undefined,
            id: "battle-enemys",
            text: undefined,
            onClickFunction: undefined,
            children: []
        },
        {
            elementType: "div",
            className: "battle-description-box",
            id: undefined,
            text: undefined,
            onClickFunction: undefined,
            children: [
                {
                    elementType: "p",
                    className: "text",
                    id: "battle-description",
                    text: undefined,
                    onClickFunction: undefined,
                    children: []
                }
            ]
        }
    ]
}
export const enemyBox = {
    elementType: "div",
    className: "enemy-box",
    id: undefined,
    text: undefined,
    onClickFunction: undefined,
    children: [
        {
            elementType: "p",
            className: "text",
            id: undefined,
            text: undefined,
            onClickFunction: undefined,
            children: []
        },
        {
            elementType: "p",
            className: "text",
            id: undefined,
            text: undefined,
            onClickFunction: undefined,
            children: []
        }
    ]
}
export function startBattle(enemys){
    player.playerState = "in-battle"
    enemyList = []
    enemyNameSeen = []
    nextAttackEnemyIndex = 0
    battleDescriptionString = ""
    descriptionBox.classList.add("hidden")
    while(gameArea.lastChild.id != "description-box"){
        gameArea.removeChild(gameArea.lastChild)
    } 
    gameArea.appendChild(createElement(BattleArea))
    const enemyToSpawn = JSON.parse(JSON.stringify(enemys))
    enemyToSpawn.forEach(enemyData => {
        const enemy = enemyData
        spawnEnemy(enemy)
    })
    gameArea.appendChild(createElement(CommandAreas.battle))
    enterBattleUI()
    showText("一場戰鬥開始了！")
}

function spawnEnemy(enemy){
    let displayName = enemy.enemyName
    let i = 1
    while(enemyNameSeen.includes(displayName)){
        displayName = `${enemy.enemyName}${i}`
        i++
    }
    const battleEnemys = document.getElementById("battle-enemys")
    enemy.maxHp = enemy.attribute.health + enemy.attributeLevelUp.health * player.dungeonLayer
    enemy.hp = enemy.maxHp
    const enemyBoxElement = createElement(enemyBox)
    enemyBoxElement.children[0].textContent = displayName
    enemyBoxElement.children[1].textContent = `${enemy.hp}/${enemy.maxHp} HP`
    enemyNameSeen.push(displayName)
    enemy.displayName = displayName
    battleEnemys.appendChild(enemyBoxElement)
    enemyList.push(enemy)
}

function enemyInfoUpdate(enemyIndex){
    const battleEnemys = document.getElementById("battle-enemys")
    const enemyBox = battleEnemys.children[enemyIndex]
    enemyBox.children[1].textContent = `${enemyList[enemyIndex].hp}/${enemyList[enemyIndex].maxHp} HP`
}

function enemyAttack(enemyIndex){
    if(enemyIndex >= enemyList.length){
        enemyIndex = 0
        nextAttackEnemyIndex = 0
    }
    const defense = player.attribute.defense * 0.5
    const enemy = enemyList[enemyIndex]
    const damage = Math.max(0, enemyList[enemyIndex].attribute.damage + enemyList[enemyIndex].attributeLevelUp.damage * player.dungeonLayer - defense)
    player.attribute.health -= damage
    if(player.attribute.health <= 0){
        player.playerStatsUpdate()
        battleDescriptionString = ""
        leaveBattleUI()
        showText("你被攻擊後倒在了地上，眼前陷入一片黑暗！\n")
        player.playerState = "defeated"
        enemyNameSeen = []
        enemyList = []
        descriptionBox.classList.remove("hidden")
        gameArea.removeChild(document.getElementById("battle-area"))
        player.commandAreaUpdate()
        return false
    }
    battleDescriptionString += `${enemy.displayName} 攻擊了你，造成 ${damage} 點傷害！\n`
    showText(battleDescriptionString)
    nextAttackEnemyIndex++
    player.playerStatsUpdate()
    return true
}

export function playerDefend(){
    battleDescriptionString = ""
    battleDescriptionString = "你採取了防禦姿態，減少了下一次受到的傷害！\n"
    player.attribute.defense *= 1.5
    enemyAttack(nextAttackEnemyIndex)
    player.attribute.defense /= 1.5
}

export function playerAttack(enemyIndex){
    const damage = Math.max(0, player.attribute.strength * 1.5 - (enemyList[enemyIndex].attribute.defense + enemyList[enemyIndex].attributeLevelUp.defense * player.dungeonLayer) * 0.5)
    const enemy = enemyList[enemyIndex]
    enemy.hp -= damage
    battleDescriptionString = ""
    battleDescriptionString += `你攻擊了 ${enemy.displayName}，造成 ${damage} 點傷害！\n`
    enemyInfoUpdate(enemyIndex)
    if(enemy.hp <= 0){
        battleDescriptionString += `${enemy.displayName} 被擊敗了！\n`
        enemyList.splice(enemyIndex, 1)
        enemy.lootTable.forEach(loot => {
            if(Math.random() < loot.dropRate){
                const item = ItemTable.find(item => item.itemID == loot.itemID)
                lootItems.push(item)
            }
        })
        const battleEnemys = document.getElementById("battle-enemys")
        battleEnemys.removeChild(battleEnemys.children[enemyIndex])
        if(enemyList.length == 0){
            endBattle()
            return false
        }
    }
    return enemyAttack(nextAttackEnemyIndex)
}
function endBattle(){
    let battleResultText = "你贏得了戰鬥！"
    player.playerState = "end-battle"
    if(player.currentRoom.roomLoots.length > 0){
        player.currentRoom.roomContent = "crate-room"
    }
    player.currentRoom.roomEnemys = []
    if(lootItems.length > 0){
        battleResultText += "\n你獲得了以下物品：\n"
        lootItems.forEach(item => {
            battleResultText += `- ${item.itemName}\n`
            player.getItem(item)
        })
        lootItems = []
    }
    descriptionBox.classList.remove("hidden")
    gameArea.removeChild(document.getElementById("battle-area"))
    enemyList = []
    enemyNameSeen = []
    leaveBattleUI()
    player.commandAreaUpdate()
    showText(battleResultText)
}
export function fleeBattle(){
    if(Math.random() < 0.5){
        leaveBattleUI()
        player.playerState = "fleeing"
        player.currentRoom.roomContent = "enemy-room"
        enemyNameSeen = []
        enemyList = []
        descriptionBox.classList.remove("hidden")
        gameArea.removeChild(document.getElementById("battle-area"))
        player.commandAreaUpdate()
        showText("你成功逃離了戰鬥")
        return
    }
    battleDescriptionString = ""
    battleDescriptionString += "逃跑失敗！"
    enemyAttack(nextAttackEnemyIndex)
}




