// utils.js
function createElement(tag, attrs, content) {
    var element = document.createElement(tag);
    if (attrs) {
        Object.keys(attrs).forEach(function(key) {
            if (key === 'className') {
                element.className = attrs[key];
            } else if (key === 'html') {
                element.innerHTML = attrs[key];
            } else {
                element.setAttribute(key, attrs[key]);
            }
        });
    }
    if (content !== undefined && content !== null) {
        element.textContent = content;
    }
    return element;
}

function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
