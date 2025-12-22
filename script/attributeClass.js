export class Attribute {
    level = 1
    strength = 10 //damage
    vitality = 10 //stamina health
    defense = 10 //defense
    agility = 5 //dodge
    luck = 5 //lootRNG critical
    knowledge = 5 //accurate
    maxHealth = 89 + Math.round(this.vitality * 1.1)
    MaxStamina = 38 + Math.round(this.vitality * 1.2)
    MaxMp = 19 + Math.round(this.knowledge * 1.2)
    health = this.maxHealth
    stamina = this.MaxStamina
    mp = this.MaxMp
    constructor(entityStats){
        if(entityStats == null){
            this.setup()
            return
        }

        this.setup()
    }

    setup(){
        this.health = this.maxHealth
        this.stamina = this.MaxStamina
        this.mp = this.MaxMp
    }
}
