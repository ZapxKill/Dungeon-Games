export let rooms = []
let seen = new Set()
export class Room {
    connects = [false,false,false,false]
    position = [0,0]
    constructor(connectedDirection, connectedPosition){
        if(connectedDirection == null || connectedPosition == null){
            seen.add(`${this.position[0]},${this.position[1]}`)
            for(let i=0;i<4;i++){
                if(Math.random() < 0.5){
                    rooms.push(new Room(i, this.position))
                    this.connects[i] = true
                }
            }
            return
        }
        switch(connectedDirection){
            case 0:
                this.connects[2] = true
                this.position = [connectedPosition[0], connectedPosition[1]+1]
                break
            case 1:
                this.connects[3] = true
                this.position = [connectedPosition[0]+1, connectedPosition[1]]
                break
            case 2:
                this.connects[0] = true
                this.position = [connectedPosition[0], connectedPosition[1]-1]
                break
            case 3:
                this.connects[1] = true
                this.position = [connectedPosition[0]-1, connectedPosition[1]]
                break
        }
        seen.add(`${this.position[0]},${this.position[1]}`)
    }

    
}

function spawnRooms(times) {
    for(let t=0;t<times;t++){
        rooms.forEach(function(room){
            for(let i=0;i<room.connects.length;i++){
            if(room.connects[i] != true){
                switch(i){
                    case 0:
                        if(!seen.has(`${room.position[0]},${room.position[1]-1}`) && Math.random() < 0.4){
                            rooms.push(new Room(0, room.position))
                            room.connects[i] = true
                        }
                        break
                    case 1:
                        if(!seen.has(`${room.position[0]+1},${room.position[1]}`) && Math.random() < 0.4){
                            rooms.push(new Room(1, room.position))
                            room.connects[i] = true
                        }
                        break
                    case 2:
                        if(!seen.has(`${room.position[0]},${room.position[1]+1}`) && Math.random() < 0.4){
                            rooms.push(new Room(2, room.position))
                            room.connects[i] = true
                        }
                        break
                    case 3:
                        if(!seen.has(`${room.position[0]-1},${room.position[1]}`) && Math.random() < 0.5){
                            rooms.push(new Room(3, room.position))
                            room.connects[i] = true
                        }
                        break
                }
            }
        }
        })  
    }
}
function getRoomByPos(x, y){
    for(let i=0;i<rooms.length;i++){
        if(rooms[i].position[0] == x && rooms[i].position[1] == y){
           return rooms[i]
        }
    }
    return null
}

export function generate(){
    rooms.length = 0
    seen.clear()
    rooms.push(new Room())
    spawnRooms(3)
}