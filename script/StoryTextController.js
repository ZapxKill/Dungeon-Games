import TextTable from "../data/TextTable.json" with {type: "json"}

const description = document.getElementById("description")
let textRunning
export function showRoomText(room){
    addCharInText("", TextTable[room.roomContent][Math.floor(Math.random() * TextTable[room.roomContent].length)])
}

export function showText(text){
    addCharInText("", text)
}

export function showRandomText(table){
    addCharInText("", table[Math.floor(Math.random() * table.length)])
}

function addCharInText(currentText, text){
    clearTimeout(textRunning)
    currentText += text[currentText.length]
    
    description.textContent = currentText
    if(currentText == text){
        return
    }
    textRunning = setTimeout(() => {
        addCharInText(currentText, text)
    }, 50);
}   