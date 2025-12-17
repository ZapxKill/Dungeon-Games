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
    drawMap(player.currentRoom, player)
}
rightBt.onclick = function (){
    player.moveRoom(1)
    drawMap(player.currentRoom, player)
}
downBt.onclick = function (){
    player.moveRoom(2)
    drawMap(player.currentRoom, player)
}
leftBt.onclick = function (){
    player.moveRoom(3)
    drawMap(player.currentRoom, player)
}
breakBt.onclick = function(){
    player.takeBreak()
    player.getItem(ItemsTable.find(item => item.itemID == "stamina_posion"))
}