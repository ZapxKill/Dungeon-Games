import { generate, rooms } from "./mapGenerator.js"
import { Player } from "./playerController.js"
import { drawMap } from "./minimapDisplay.js"
import ItemsTable from "./ItemsTable.json" with {type: "json"}
const upBt = document.getElementById("up")
const rightBt = document.getElementById("right")
const downBt = document.getElementById("down")
const leftBt = document.getElementById("left")
const breakBt = document.getElementById("break")
let player = new Player(generate())

drawMap(player.currentRoom, player)

upBt.onclick = function (){
    player.moveRoom(0)
}
rightBt.onclick = function (){
    player.moveRoom(1)
}
downBt.onclick = function (){
    player.moveRoom(2)
}
leftBt.onclick = function (){
    player.moveRoom(3)
}
breakBt.onclick = function(){
    player.takeBreak()
}