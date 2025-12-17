/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("minimap")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")
const cx = canvas.width / 2
const cy = canvas.height / 2
const gap = 60
const size = 40
const playerSize = 20
const hallWidth = 20
ctx.fillStyle = "white"

function drawCenterRect(x, y, w, h) {
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
}


export function drawMap(room, player){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawRoom(room, player)
    drawPlayer()
    
}
function drawRoom(room, player, drawed=new Set()){
    ctx.fillStyle = "white"
    drawCenterRect(cx + (room.position[0] - player.position[0]) * gap, cy + (room.position[1] - player.position[1]) * gap, size, size)
    drawed.add(`${room.position[0]},${room.position[1]}`)
    for(let i=0;i<room.connects.length;i++){
        if(room.connects[i] != null && !drawed.has(`${room.connects[i].position[0]},${room.connects[i].position[1]}`)){
            switch(i){
                case 0:
                    drawCenterRect(cx + (room.position[0] - player.position[0]) * gap, cy + (room.position[1] - 0.5 - player.position[1]) * gap, hallWidth, gap-size)
                    break
                case 1:
                    drawCenterRect(cx + (room.position[0] + 0.5 - player.position[0]) * gap, cy + (room.position[1] - player.position[1]) * gap, gap-size, hallWidth)
                    break
                case 2:
                    drawCenterRect(cx + (room.position[0] - player.position[0]) * gap, cy + (room.position[1] + 0.5 - player.position[1]) * gap, hallWidth, gap-size)
                    break
                case 3:
                    drawCenterRect(cx + (room.position[0] - 0.5 - player.position[0]) * gap, cy + (room.position[1] - player.position[1]) * gap, gap-size, hallWidth)
                    break
            }
            drawRoom(room.connects[i], player, drawed)
        }
    }
}
function drawPlayer(){
    ctx.fillStyle = "red"
    drawCenterRect(cx, cy, playerSize, playerSize)
}
