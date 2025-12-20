import ItemsTable from "./ItemsTable.json" with {type: "json"}

export let TargetRoomAmount = 20
export let rooms = []
export let seen = new Set()
let roomAmount = 0
export class Room {
    connects = [null,null,null,null]
    position = [0,0]
    playerSeen = false
    roomContent = 0 //0: empty, 1: enemy, 2: loot 3: exit
    constructor(connectedDirection, connectedRoom){
        if(connectedDirection == null || connectedRoom == null){
            seen.add(`${this.position[0]},${this.position[1]}`)
            this.playerSeen = true
            this.roomContent = 0
            roomAmount += 1
            return
        }
        let roomContentChance = Math.random()
        if(roomContentChance < 0.6){
            this.roomContent = 0
        }
        else if(roomContentChance < 0.8){
            this.roomContent = 1
        }
        else{
            this.roomContent = 2
        }
        switch(connectedDirection){
            case 0:
                this.connects[2] = connectedRoom
                this.position = [connectedRoom.position[0], connectedRoom.position[1]-1]
                break
            case 1:
                this.connects[3] = connectedRoom
                this.position = [connectedRoom.position[0]+1, connectedRoom.position[1]]
                break
            case 2:
                this.connects[0] = connectedRoom
                this.position = [connectedRoom.position[0], connectedRoom.position[1]+1]
                break
            case 3:
                this.connects[1] = connectedRoom
                this.position = [connectedRoom.position[0]-1, connectedRoom.position[1]]
                break
        }
        seen.add(`${this.position[0]},${this.position[1]}`)
    }

    
}

function spawnRooms(room, ExpectLength){
    let spawnChance = Math.random()
    let num = 0
    if(ExpectLength > 0){
        spawnChance += 0.5
    }
    if(spawnChance > 0.8){
        num = 3
    }
    else if(spawnChance > 0.7){
        num = 2
    }
    else if(spawnChance > 0.5){
        num = 1
    }
    for(let i=0;i<num;i++){
        let d = Math.round(Math.random()*3)
        if(room.connects[d] != true){
            switch(d){
                case 0:
                    if(!seen.has(`${room.position[0]},${room.position[1]-1}`)){
                        room.connects[d] = new Room(0, room)
                        rooms.push(room.connects[d])
                        spawnRooms(room.connects[d], --ExpectLength)
                        
                    }
                    break
                case 1:
                    if(!seen.has(`${room.position[0]+1},${room.position[1]}`)){
                        room.connects[d] = new Room(1, room)
                        rooms.push(room.connects[d])
                        spawnRooms(room.connects[d], --ExpectLength)
                        
                    }
                    break
                case 2:
                    if(!seen.has(`${room.position[0]},${room.position[1]+1}`)){
                        room.connects[d] = new Room(2, room)
                        rooms.push(room.connects[d])
                        spawnRooms(room.connects[d], --ExpectLength)
                        
                    }
                    break
                case 3:
                    if(!seen.has(`${room.position[0]-1},${room.position[1]}`)){
                        room.connects[d] = new Room(3, room)
                        rooms.push(room.connects[d])
                        roomAmount += 1
                        spawnRooms(room.connects[d], --ExpectLength)
                        
                    }
                    break
            }
        }
    }
} 
export function getRoomByPos(x, y){
    for(let i=0;i<rooms.length;i++){
        if(rooms[i].position[0] == x && rooms[i].position[1] == y){
           return rooms[i]
        }
    }
    return null
}

export function generate(){
    seen.clear()
    rooms = []
    roomAmount = 0
    let root = new Room()
    rooms.push(root)
    spawnRooms(root, 5)
    let tmp = 0
    while(tmp == 0){
        tmp = Math.floor(Math.random() * rooms.length)
    }
    rooms[tmp].roomContent = 3
    return root
}