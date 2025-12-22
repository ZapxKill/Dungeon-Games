export function createElement(object){
    /** @type {HTMLElement} */
    let element = document.createElement(object.elementType)
    element.className = object.className
    element.id = object.id
    element.textContent = object.text
    if (object.onClickFunction) {
        element.onclick = object.onClickFunction
    }
    element = createChildren(element, object.children)
    return element
}

function createChildren(element, array){
    array.forEach(childObject => {
        let child = document.createElement(childObject.elementType)
        child.className = childObject.className
        child.id = childObject.id
        child.textContent = childObject.text
        if (childObject.onClickFunction) {
            child.onclick = childObject.onClickFunction
        }
        createChildren(child, childObject.children)
        element.appendChild(child)
    });
    return element
}
