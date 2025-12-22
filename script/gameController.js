import { generate } from "./mapGenerator.js"
import { Player } from "./playerController.js"
import ItemTable from "../data/ItemTable.json" with {type: "json"}
import { preloadRoomImages } from "./minimapDisplay.js";
export let player = new Player(generate())

function preloadImage(url)
{
    let img = new Image().src = url;
}

preloadRoomImages()
for(let i=0;i< ItemTable.length;i++){
    preloadImage(ItemTable[i].image)
    preloadImage(ItemTable[i].hImage)
    preloadImage(ItemTable[i].cImage)
}


