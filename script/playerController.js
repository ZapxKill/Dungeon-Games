import ItemsTable from "./ItemsTable.json" with {type: "json"}
import { drawMap } from "./minimapDisplay.js"
import { showRoomText, showText } from "./StoryTextController.js"
import { Attribute } from "./attributeClass.js"
const HealthBar = document.getElementById("health")
const StaminaBar = document.getElementById("stamina")
const MpBar = document.getElementById("mp")
const HealthLabel = document.getElementById("health-label")
const StaminaLabel = document.getElementById("stamina-label")
const MpLabel = document.getElementById("mp-label")

export class Player{
    position = [0,0]
    attribute = new Attribute()
    inventory = []
    constructor(room){
        this.position[0] = room.position[0]
        this.position[1] = room.position[1]
        this.currentRoom = room
        showText("你醒了過來，發現自己在一座地下迷宮中。")
        this.UIupdate()
        this.getItem(ItemsTable.find(item => item.itemID == "stamina_posion_s"))
        this.getItem(ItemsTable.find(item => item.itemID == "heal_posion_s"))
        this.getItem(ItemsTable.find(item => item.itemID == "mp_posion_s"))
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
            this.UIupdate()
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
    UIupdate(){
        this.statsOverflowCheck()
        HealthBar.style.width = `${this.attribute.health/this.attribute.maxHealth*100}%`
        StaminaBar.style.width = `${this.attribute.stamina/this.attribute.MaxStamina*100}%`
        MpBar.style.widows = `${this.attribute.mp/this.attribute.MaxMp*100}%`
        HealthLabel.textContent = `Health: ${this.attribute.health}/${this.attribute.maxHealth}`
        StaminaLabel.textContent = `Stamina: ${this.attribute.stamina}/${this.attribute.MaxStamina}`
        MpLabel.textContent = `MP: ${this.attribute.mp}/${this.attribute.MaxMp}`

    }
    takeBreak(){
        this.attribute.stamina += 5
        showText("你決定在這裡休息一下")
        this.UIupdate()
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
        this.UIupdate()
        this.inventoryUpdate()
    }
    getItem(gItem){
        let item
        if(item = this.inventory.find(item => item.itemID == gItem.itemID)){
            item.amount += 1
        }
        else{
            gItem.amount = 1
            this.inventory.push(gItem)
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
            let itemAmount = document.createElement("span")
            itemAmount.textContent = `x${item.amount}`
            newItem.className = `backpack-item ${item.itemID}`
            itemAmount.className = "item-amount noselect"
            newItem.appendChild(itemAmount)
            newItem.addEventListener("click", this.useItem.bind(this, item))
            backpack.appendChild(newItem)
        })
    }
}