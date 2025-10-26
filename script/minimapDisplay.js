import { generate, rooms } from "./mapGenerator.js"
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("minimap")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")
const genBt = document.getElementById("gen")
const showBt = document.getElementById("show")
const cx = canvas.width / 2
const cy = canvas.height / 2
const gap = 60
const size = 40
const hallWidth = 20
ctx.fillStyle = "white"

function drawCenterRect(x, y, w, h) {
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
}

genBt.onclick = function () {
    generate()
}

showBt.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    rooms.forEach(function(room){
        drawCenterRect(cx + room.position[0] * gap, cy + room.position[1] * gap, size, size);
        drawHalls(room)
    })
};

function drawHalls(room){
    for(let i=0;i<room.connects.length;i++){
            if(room.connects[i] == true){
                switch(i){
                    case 0:
                        drawCenterRect(cx + room.position[0] * gap, cy + (room.position[1] + 0.5) * gap, hallWidth, gap-size)
                        break
                    case 1:
                        drawCenterRect(cx + (room.position[0] + 0.5) * gap, cy + room.position[1] * gap, gap-size, hallWidth)
                        break
                    case 2:
                        drawCenterRect(cx + room.position[0] * gap, cy + (room.position[1] - 0.5) * gap, hallWidth, gap-size)
                        break
                    case 3:
                        drawCenterRect(cx + (room.position[0] - 0.5) * gap, cy + room.position[1]* gap, gap-size, hallWidth)
                        break
                }
            }
        }
}
