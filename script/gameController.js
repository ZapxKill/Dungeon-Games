import { generate, rooms } from "./mapGenerator.js"
import { Player } from "./playerController.js"
export let player = new Player(generate())
import { drawMap } from "./minimapDisplay.js"
import { CommandAreas } from "./CommandAreas.js"
import { createElement } from "./UIController.js"
/** @type {HTMLDivElement} */
const commandArea = document.getElementById("game-area")
drawMap(player.currentRoom, player)
commandArea.appendChild(createElement(CommandAreas.movement))



