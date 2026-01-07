import { drawMap } from "./minimapDisplay.js"
import { showRoomText, showRandomText, showText } from "./StoryTextController.js"
import { createElement } from "./UIController.js"
import { CommandAreas } from "./CommandAreas.js"
import TextTable from "../data/TextTable.json" with {type: "json"}
import EnemyTable from "../data/EnemyTable.json" with {type: "json"}
import { generate } from "./mapGenerator.js"

const HealthBar = document.getElementById("health")
const StaminaBar = document.getElementById("stamina")
const MpBar = document.getElementById("mp")
const HealthLabel = document.getElementById("health-label")
const StaminaLabel = document.getElementById("stamina-label")
const MpLabel = document.getElementById("mp-label")
const gameArea = document.getElementById("game-area")
const mazeLevelLabel = document.getElementById("maze-level")


export class Player{
    position = [0,0]
    attribute = new PlayerAttribute()
    inventory = []
    playerState = "searching"
    dungeonLayer = 1
    selectedItem = null
    constructor(room){
        this.position[0] = room.position[0]
        this.position[1] = room.position[1]
        this.currentRoom = room
        showRandomText(TextTable["new-game"])
        drawMap(this.currentRoom, this)
        this.commandAreaUpdate()
        this.playerStatsUpdate()
    }
    statsOverflowCheck(){
        if(this.attribute.health > this.attribute.maxHealth){
            this.attribute.health = this.attribute.maxHealth
        }  
        if(this.attribute.stamina > this.attribute.maxStamina){
            this.attribute.stamina = this.attribute.maxStamina
        }
        if(this.attribute.mp  > this.attribute.maxMp){
            this.attribute.mp = this.attribute.maxMp
        }
    }
    moveRoom(direction){
        console.log(direction)
        if(this.attribute.stamina >= 2.5 && this.currentRoom.connects[direction] != null){
            this.currentRoom = this.currentRoom.connects[direction]
            this.currentRoom.playerSeen = true
            this.position = this.currentRoom.position
            this.attribute.stamina-=2.5
            drawMap(this.currentRoom, this)
            showRoomText(this.currentRoom)
            this.playerStatsUpdate()
            this.commandAreaUpdate()
            return true
        } 
        else if(this.currentRoom.connects[direction] != null){
            showText("你沒體力了，在原地休息一下吧")
        }
        else{
            showText("此路不通")
        }
        return false   
    }
    playerStatsUpdate(){
        this.statsOverflowCheck()
        HealthBar.style.width = `${this.attribute.health/this.attribute.maxHealth*100}%`
        StaminaBar.style.width = `${this.attribute.stamina/this.attribute.maxStamina*100}%`
        MpBar.style.width = `${this.attribute.mp/this.attribute.maxMp*100}%`
        HealthLabel.textContent = `Health: ${this.attribute.health}/${this.attribute.maxHealth}`
        StaminaLabel.textContent = `Stamina: ${this.attribute.stamina}/${this.attribute.maxStamina}`
        MpLabel.textContent = `MP: ${this.attribute.mp}/${this.attribute.maxMp}`

    }
    takeRest(){
        this.attribute.stamina += 5
        let roomContentChance = Math.random()
        if(roomContentChance < 0.4){
            for(let i=0;i<Math.ceil(Math.random()*2);i++){
                this.currentRoom.roomEnemys.push(EnemyTable[Math.floor(Math.random() * EnemyTable.length)])
            }
            showRandomText(TextTable["rest-encounter-enemy"])
            this.commandAreaUpdate()
        }
        else{
            showText("你決定在這裡休息一下")
        }
        this.playerStatsUpdate()
    }
    useItem(item){
        if(item.usage == "player_stats_item"){
            this.attribute.health += item.stats.health
            this.attribute.stamina += item.stats.stamina
            this.attribute.mp += item.stats.mp
            item.amount-=1
            if(item.amount <= 0){
                this.inventory.splice(this.inventory.indexOf(item), 1)
            }
        }
        this.playerStatsUpdate()
        this.inventoryUpdate(this)
    }
    getItem(item){
        let bItem
        if(bItem = this.inventory.find(bItem => bItem.itemID == item.itemID)){
            bItem.amount += 1
        }
        else{
            item.amount = 1
            this.inventory.push(item)
        }
        this.inventoryUpdate(this)
    }
    inventoryUpdate(p){
        /** @type {HTMLDivElement} */
        const backpack = document.getElementById("backpack")
        /** @type {HTMLDivElement} */
        const commandBox = document.getElementById("item-command-box")
        document.getElementById("use-item")?.addEventListener("mousedown", function(){
            if(p.selectedItem){
                p.useItem(p.selectedItem)
            }
        })
        document.getElementById("view-item")?.addEventListener("mousedown", function(){
            if(p.selectedItem){
                showText(`${p.selectedItem.itemName}\n${p.selectedItem.description}`)
            }
        })
        while(backpack.firstChild){
            backpack.removeChild(backpack.firstChild)
        }
        this.inventory.forEach(item => {
            /** @type {HTMLSpanElement} */
            let newItem = document.createElement("div")
            let itemImage = document.createElement("img")
            let itemAmount = document.createElement("span")
            itemAmount.textContent = `x${item.amount}`
            itemImage.src = item.image
            itemImage.className = "item-img"
            newItem.className = `backpack-item ${item.itemID}`
            itemImage.tabIndex = -1
            itemAmount.className = "item-amount noselect"
            newItem.appendChild(itemAmount)
            newItem.appendChild(itemImage)
            itemImage.addEventListener("click", function(){
                itemImage.focus()
            })
            itemImage.addEventListener("focus", function(){
                itemImage.src = item.cImage
                p.selectedItem = item
                commandBox.style.top = `${itemImage.getBoundingClientRect().top + window.scrollY}px`
                commandBox.style.left = `${itemImage.getBoundingClientRect().right + window.scrollX}px`
                commandBox.classList.remove("hidden")
                
            })
            itemImage.addEventListener("blur", function(){
                itemImage.src = item.image
                commandBox.classList.add("hidden")
                p.selectedItem = null
            })
            itemImage.addEventListener("mouseover", function(){
                if(itemImage != document.activeElement){
                    itemImage.src = item.hImage
                }
            })
            itemImage.addEventListener("mouseout", function(){
                if(itemImage != document.activeElement){
                    itemImage.src = item.image
                }
            })
            backpack.appendChild(newItem)
        })
    }
    commandAreaUpdate(){
        while(gameArea.lastChild.id != "description-box"){
            gameArea.removeChild(gameArea.lastChild)
        }
        if(this.playerState == "searching"){
            if(this.currentRoom.roomEnemys.length > 0){
                gameArea.appendChild(createElement(CommandAreas.encounterEnemy))
            }
            else if(this.currentRoom.roomLoots.length > 0){
                gameArea.appendChild(createElement(CommandAreas.movement))
                gameArea.appendChild(createElement(CommandAreas.findCrate))
            }
            else if(this.currentRoom.isExit){
                gameArea.appendChild(createElement(CommandAreas.movement))
                gameArea.appendChild(createElement(CommandAreas.findExit))
            }
            else{
                gameArea.appendChild(createElement(CommandAreas.movement))
            }
        }
        else if(this.playerState == "crate"){
            gameArea.appendChild(createElement(CommandAreas.crate))
        }
        else if(this.playerState == "fleeing"){
            gameArea.appendChild(createElement(CommandAreas.fleeing))
        }
        else if(this.playerState == "end-battle"){
            gameArea.appendChild(createElement(CommandAreas.endBattle))
        }
        else if(this.playerState == "defeated"){
            gameArea.appendChild(createElement(CommandAreas.defeated))
        }
    }
    enterNewLevel(){
        this.position = [0,0]
        this.currentRoom = generate()
        this.dungeonLayer++
        mazeLevelLabel.textContent = this.dungeonLayer
        drawMap(this.currentRoom, this)
        this.commandAreaUpdate()
    }

    openCreate(){
        let itemList = this.currentRoom.roomLoots
        let itemString = ""
        for(let i=0;i< itemList.length;i++){
            let item = itemList[i]
            itemString += `${item.itemName} `
            this.getItem(item)
        }
        showText(`你打開箱子獲得了 ${itemString}`)
        this.playerState = "searching"
        this.currentRoom.roomContent = "empty-room"
        this.currentRoom.roomLoots = []
        this.commandAreaUpdate()
    }
    
}

class PlayerAttribute {
    level = 1
    strength = 10 //damage
    vitality = 10 //stamina health
    defense = 10 //defense
    agility = 5//dodge
    luck = 5 //lootRNG critical
    knowledge = 5 //accurate
    maxHealth = 50 + Math.round((this.vitality - 10) * 1.1)
    maxStamina = 25 + Math.round((this.vitality -  10) * 1.2)
    maxMp = 10 + Math.round((this.knowledge - 5) * 1.2)
    health = this.maxHealth
    stamina = this.maxStamina
    mp = this.maxMp
}