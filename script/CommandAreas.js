import { player } from "./gameController.js";
import { showRandomText, showText } from "./StoryTextController.js";
import TextTable from "../data/TextTable.json" with {type: "json"}
export const CommandAreas = {
    movement: {
        elementType: "div",
        className: "command-area",
        id: "",
        text: "",
        onClickFunction: null,
        children: 
        [
            {
                elementType: "div",
                className: "movement-buttons",
                id: "",
                text: "",
                onClickFunction: null,
                children: [
                    {
                        elementType: "button",
                        className: "command-button",
                        id: "movement-up",
                        text: "↑",
                        onClickFunction: function(){
                            player.moveRoom(0)
                        },
                        children: []
                    },
                    {
                        elementType: "button",
                        className: "command-button",
                        id: "movement-left",
                        text: "←",
                        onClickFunction: function(){
                            player.moveRoom(3)
                        },
                        children: []
                    },
                    {
                        elementType: "button",
                        className: "command-button",
                        id: "movement-down",
                        text: "↓",
                        onClickFunction: function(){
                            player.moveRoom(2)
                        },
                        children: []
                    },
                    {
                        elementType: "button",
                        className: "command-button",
                        id: "movement-right",
                        text: "→",
                        onClickFunction: function(){
                            player.moveRoom(1)
                        },
                        children: []
                    }
                ]
            },
            {
                elementType: "button",
                className: "command-button",
                id: "movement-rest",
                text: "休息",
                onClickFunction: function(){
                    player.takeRest()
                },
                children: []
            }
        ]
    },
    crate: {
        elementType: "div",
        className: "command-area",
        id: "",
        text: "",
        onClickFunction: null,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: "crate-open",
                text: "打開箱子",
                onClickFunction: function(){
                    player.openCreate()
                },
                children: []
            },
            {
                elementType: "button",
                className: "command-button",
                id: "crate-leave",
                text: "離開",
                onClickFunction: function(){
                    showText("你離開了箱子")
                    player.playerState = "searching"
                    player.commandAreaUpdate()
                },
                children: []
            }
        ]
    },
    battle: {
        elementType: "div",
        className: "command-area",
        id: "",
        text: "",
        onClickFunction: null,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: "battle-attack",
                text: "攻擊",
                onClickFunction: function(){},
                children: []
            },
            {
                elementType: "button",
                className: "command-button",
                id: "battle-defend",
                text: "防禦",
                onClickFunction: function(){},
                children: []
            },
            {
                elementType: "button",
                className: "command-button",
                id: "battle-skill",
                text: "技能",
                onClickFunction: function(){},
                children: []
            },
            {
                elementType: "button",
                className: "command-button",
                id: "battle-flee",
                text: "逃跑",
                onClickFunction: function(){},
                children: []
            }
        ]
    },
    encounterEnemy: {
        elementType: "div",
        className: "command-area",
        id: "",
        text: "",
        onClickFunction: null,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: "event-battle-entry",
                text: "戰鬥",
                onClickFunction: function(){
                    showText("你消滅了敵人")
                    player.currentRoom.roomContent = "empty-room"
                    player.commandAreaUpdate()
                },
                children: []
            }
        ]
    },
    findCrate: {
        elementType: "div",
        className: "command-area",
        id: "",
        text: "",
        onClickFunction: null,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: "event-crate-observe",
                text: "靠近箱子",
                onClickFunction: function(){
                    player.playerState = "crate"
                    showRandomText(TextTable["crate-observe"])
                    player.commandAreaUpdate()
                },
                children: []
            }
        ]
    },
    findExit: {
        elementType: "div",
        className: "command-area",
        id: "",
        text: "",
        onClickFunction: null,
        children: [
            {
                elementType: "button",
                className: "command-button",
                id: "event-exit-entry",
                text: "走進大門",
                onClickFunction: function(){
                    player.enterNewLevel()
                    showText("你來到了下一層")
                },
                children: []
            }
        ]
    }
}



