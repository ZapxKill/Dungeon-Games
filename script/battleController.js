import { player } from "./gameController";
import enemyTable from "../data/EnemyTable.json" with {type: "json"}

export function startBattle(enemy){
    player.playerState = "in-battle"
    player.commandAreaUpdate()
}


