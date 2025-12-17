import { getRoomByPos, seen, rooms } from "./mapGenerator.js"
import ItemsTable from "./ItemsTable.json" with {type: "json"}
const HealthBar = document.getElementById("health")
const StaminaBar = document.getElementById("stamina")
const MpBar = document.getElementById("mp")
const HealthLabel = document.getElementById("health-label")
const StaminaLabel = document.getElementById("stamina-label")
const MpLabel = document.getElementById("mp-label")

export class Player{
    position = [0,0]
    maxHealth = 100
    MaxStamina = 50
    MaxMp = 20
    health = 100
    stamina = 50
    mp = 20
    inventory = []

    constructor(room){
        this.position[0] = room.position[0]
        this.position[1] = room.position[1]
        this.currentRoom = room
        this.UIupdate()
        this.getItem(ItemsTable.find(item => item.itemID == "stamina_posion"))
        this.getItem(ItemsTable.find(item => item.itemID == "heal_posion"))
        this.getItem(ItemsTable.find(item => item.itemID == "mp_posion"))
    }
    statsOverflowCheck(){
        if(this.health > this.maxHealth){
            this.health = this.maxHealth
        }  
        if(this.stamina > this.MaxStamina){
            this.stamina = this.MaxStamina
        }
        if(this.mp> this.MaxMp){
            this.mp = this.MaxMp
        }
    }
    moveRoom(direction){
        if(this.stamina >= 5 && this.currentRoom.connects[direction] != null){
            this.currentRoom = this.currentRoom.connects[direction]
            this.position = this.currentRoom.position
            this.stamina-=5
            this.UIupdate()
            return true
        } 
        return false   
    }
    UIupdate(){
        this.statsOverflowCheck()
        HealthBar.style.width = `${this.health/this.maxHealth*100}%`
        StaminaBar.style.width = `${this.stamina/this.MaxStamina*100}%`
        MpBar.style.widows = `${this.mp/this.MaxMp*100}%`
        HealthLabel.textContent = `Health: ${this.health}/${this.maxHealth}`
        StaminaLabel.textContent = `Stamina: ${this.stamina}/${this.MaxStamina}`
        MpLabel.textContent = `MP: ${this.mp}/${this.MaxMp}`

    }
    takeBreak(){
        this.stamina += 5
        this.UIupdate()
    }
    useItem(item){
        console.log(`use ${JSON.stringify(item)}`)
        if(item.usage == "player_stats_item"){
            this.health += item.stats.health
            this.stamina += item.stats.stamina
            this.mp += item.stats.mp
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