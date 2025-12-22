/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("minimap")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")
const cx = canvas.width / 2
const cy = canvas.height / 2
const gap = 48
const size = 40
const playerSize = 16
const hallWidth = 24
const roomImageFolderPath = "image/minimap/"
const roomImages = ["roomU.png", "roomR.png", "roomUR.png", "roomD.png", "roomUD.png", "roomRD.png", "roomURD.png", "roomL.png", "roomUL.png", "roomRL.png", "roomURL.png", "roomDL.png", "roomUDL.png", "roomRDL.png", "roomURDL.png"]
ctx.fillStyle = "white"

function drawCenterRect(x, y, w, h) {
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
}

function drawImage(imageSrc, x, y) {
    let image = new Image()
    image.onload = function(){
        ctx.drawImage(image, x - image.naturalHeight / 2, y - image.naturalHeight / 2);
        if(x == cx && y == cy){
            drawPlayer()
        }
    }
    image.src = imageSrc
    
}

export function drawMap(room, player){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawRoom(room, player)
}
function drawRectRoom(room, player, drawed=new Set()){
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
            drawRectRoom(room.connects[i], player, drawed)
        }
    }
}
function drawRoom(room, player, drawed=new Set()){
    if(room.playerSeen){
        drawed.add(`${room.position[0]},${room.position[1]}`) 
    let index = -1
    for(let i=0;i<room.connects.length;i++){  
        if(room.connects[i] != null){
            if(!drawed.has(`${room.connects[i].position[0]},${room.connects[i].position[1]}`)){
                switch(i){
                    case 0:
                        drawImage(`${roomImageFolderPath}hallwayV.png`, cx + (room.position[0] - player.position[0]) * gap, cy + (room.position[1] - 0.5 - player.position[1]) * gap)
                        break
                    case 1:
                        drawImage(`${roomImageFolderPath}hallwayH.png`, cx + (room.position[0] + 0.5 - player.position[0]) * gap, cy + (room.position[1] - player.position[1]) * gap)
                        break
                    case 2:
                        drawImage(`${roomImageFolderPath}hallwayV.png`, cx + (room.position[0] - player.position[0]) * gap, cy + (room.position[1] + 0.5 - player.position[1]) * gap)
                        break
                    case 3:
                        drawImage(`${roomImageFolderPath}hallwayH.png`, cx + (room.position[0] - 0.5 - player.position[0]) * gap, cy + (room.position[1] - player.position[1]) * gap)
                        break
                }
                drawRoom(room.connects[i], player, drawed)
            }
            index += 2 ** i
        }
    }
    drawImage(roomImageFolderPath + roomImages[index], cx + (room.position[0] - player.position[0]) * gap, cy + (room.position[1] - player.position[1]) * gap)    
    }
    
}


function drawPlayer(){
    ctx.fillStyle = "red"
    drawCenterRect(cx, cy, playerSize, playerSize)
}
