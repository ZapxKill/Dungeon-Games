export function createElement(object){
    /** @type {HTMLElement} */
    let element = document.createElement(object.elementType)
    if(object.className !== undefined){
        element.className = object.className
    }
    
    if(object.id !== undefined){
        element.id = object.id
    }
    if(object.text !== undefined){
        element.textContent = object.text
    }
    if (object.onClickFunction !== undefined) {
        element.onclick = object.onClickFunction
    }
    if(object.children.length > 0){
        element = createChildren(element, object.children)
    }
    return element
}

function createChildren(element, array){
    array.forEach(childObject => {
        let child = document.createElement(childObject.elementType)
        if(childObject.className !== undefined){
            child.className = childObject.className
        }
        if(childObject.id !== undefined){
            child.id = childObject.id
        }
        if(childObject.text !== undefined){
            child.textContent = childObject.text
        }
        if (childObject.onClickFunction !== undefined) {
            child.onclick = childObject.onClickFunction
        }
        if(childObject.children.length > 0){
            createChildren(child, childObject.children)
        }
        element.appendChild(child)
    });
    return element
}
