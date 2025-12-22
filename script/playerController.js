import ItemTable from "../data/ItemTable.json" with {type: "json"}
import { drawMap } from "./minimapDisplay.js"
import { showRoomText, showRandomText, showText } from "./StoryTextController.js"
import { Attribute } from "./attributeClass.js"
import { createElement } from "./UIController.js"
import { CommandAreas } from "./CommandAreas.js"
import TextTable from "../data/TextTable.json" with {type: "json"}
import { generate } from "./mapGenerator.js"
const HealthBar = document.getElementById("health")
const StaminaBar = document.getElementById("stamina")
const MpBar = document.getElementById("mp")
const HealthLabel = document.getElementById("health-label")
const StaminaLabel = document.getElementById("stamina-label")
const MpLabel = document.getElementById("mp-label")
const commandArea = document.getElementById("game-area")

export class Player{
    position = [0,0]
    attribute = new Attribute()
    inventory = []
    playerState = "searching"
    dungeonLayer = 1
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
        if(this.attribute.stamina > this.attribute.MaxStamina){
            this.attribute.stamina = this.attribute.MaxStamina
        }
        if(this.attribute.mp> this.attribute.MaxMp){
            this.attribute.mp = this.attribute.MaxMp
        }
    }
    moveRoom(direction){
        if(this.attribute.stamina >= 5 && this.currentRoom.connects[direction] != null){
            this.currentRoom = this.currentRoom.connects[direction]
            this.currentRoom.playerSeen = true
            this.position = this.currentRoom.position
            this.attribute.stamina-=5
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
        StaminaBar.style.width = `${this.attribute.stamina/this.attribute.MaxStamina*100}%`
        MpBar.style.widows = `${this.attribute.mp/this.attribute.MaxMp*100}%`
        HealthLabel.textContent = `Health: ${this.attribute.health}/${this.attribute.maxHealth}`
        StaminaLabel.textContent = `Stamina: ${this.attribute.stamina}/${this.attribute.MaxStamina}`
        MpLabel.textContent = `MP: ${this.attribute.mp}/${this.attribute.MaxMp}`

    }
    takeRest(){
        this.attribute.stamina += 5
        let roomContentChance = Math.random()
        if(roomContentChance < 0.4){
            this.currentRoom.roomContent = "enemy-room"
            showRandomText(TextTable["rest-encounter-enemy"])
            this.commandAreaUpdate()
        }
        else{
            showText("你決定在這裡休息一下")
        }
        this.playerStatsUpdate()
    }
    useItem(item){
        console.log(`use ${JSON.stringify(item)}`)
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
        this.inventoryUpdate()
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
        this.inventoryUpdate()
    }
    inventoryUpdate(){
        /** @type {HTMLDivElement} */
        const backpack = document.getElementById("backpack")
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
            itemAmount.className = "item-amount noselect"
            newItem.appendChild(itemAmount)
            newItem.appendChild(itemImage)
            itemImage.addEventListener("click", this.useItem.bind(this, item))
            itemImage.addEventListener("mouseover", function(){
                itemImage.src = item.hImage
            })
            itemImage.addEventListener("mouseout", function(){
                itemImage.src = item.image
            })

            backpack.appendChild(newItem)
        })
    }
    commandAreaUpdate(){
        while(commandArea.lastChild.id != "description-box"){
            commandArea.removeChild(commandArea.lastChild)
        }
        if(this.playerState == "searching"){
            switch(this.currentRoom.roomContent){
            case "empty-room":
                commandArea.appendChild(createElement(CommandAreas.movement))
                break
            case "enemy-room":
                commandArea.appendChild(createElement(CommandAreas.encounterEnemy))
                break
            case "crate-room":
                commandArea.appendChild(createElement(CommandAreas.movement))
                commandArea.appendChild(createElement(CommandAreas.findCrate))
                break
            case "exit-room":
                commandArea.appendChild(createElement(CommandAreas.movement))
                commandArea.appendChild(createElement(CommandAreas.findExit))
                break
            default:
                commandArea.appendChild(createElement(CommandAreas.movement))
                break
            }
        }
        else if(this.playerState == "battle"){
            commandArea.appendChild(createElement(CommandAreas.battle))
        }
        else if(this.playerState == "crate"){
            commandArea.appendChild(createElement(CommandAreas.crate))
        }
        
    }
    enterNewLevel(){
        this.position = [0,0]
        this.currentRoom = generate()
        this.dungeonLayer++
        drawMap(this.currentRoom, this)
        this.commandAreaUpdate()
    }

    openCreate(){
        let item = ItemTable[Math.floor(Math.random() * ItemTable.length)]
        showText(`你打開箱子獲得了 ${item.itemName}`)
        this.getItem(item)
        this.playerState = "searching"
        this.currentRoom.roomContent = "empty-room"
        this.commandAreaUpdate()
    }
    
}