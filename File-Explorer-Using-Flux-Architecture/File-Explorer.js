// Dispatcher
const Dispatcher = {
    callbacks: [],

    register(callback) {
        this.callbacks.push(callback);
    },

    dispatch(action) {
        this.callbacks.forEach(callback => callback(action));
    }
}

// Store
const StateStore = {
    state: [{
        id: 'root',
        level: 0,
        parentNodeId: -1,
        name: "Root",
        type: "folder",
        children: []
    }],

    getState() {
        return this.state;
    },

    handleAction(action) {
        if (action.type == 'addFolder') {
            pushObj(StateStore.state, action.newObj.parentNodeId, action.newObj);
            document.getElementById('wrapper').lastElementChild.innerHTML = "";
            // document.getElementById('inputValue').value = "";
            StateView.render(document.getElementById('wrapper').lastElementChild, StateStore.state)
            console.log(StateStore.state)
        }
        else if (action.type == 'addFile') {
            pushObj(StateStore.state, action.newObj.parentNodeId, action.newObj);
            document.getElementById('wrapper').lastElementChild.innerHTML = "";
            // document.getElementById('inputValue').value = "";
            StateView.render(document.getElementById('wrapper').lastElementChild, StateStore.state)
            console.log(StateStore.state)
        }
        else if (action.type == "delete") {
            console.log("Hi delete")
            let elemId = action.id;
            let parentId = findObj(StateStore.state, elemId).parentNodeId;
            console.log(parentId)
            let siblings = findObj(StateStore.state, parentId).children;
            console.log(siblings)
            for (let i = 0; i < siblings.length; i++) {
                if (siblings[i].id == elemId) {
                    siblings.splice(i, 1);
                    console.log(siblings)
                    break;
                }
            }
            updateChildrenAfterDeletion(StateStore.state, parentId, siblings);
            document.getElementById('wrapper').lastElementChild.innerHTML = "";
            StateView.render(document.getElementById('wrapper').lastElementChild, StateStore.state)
        }
        else if (action.type == 'toggle') {
            console.log("Toggle");
            let lastchild = action.node.parentNode.lastElementChild;
            console.log(lastchild)

            if (lastchild.classList.length == 0) {
                lastchild.classList.add("collapse");
                action.node.classList.remove("rotate");
                action.node.classList.add("normal")
            }
            else {
                lastchild.classList.remove("collapse")
                action.node.classList.add("rotate");
                action.node.classList.remove("normal")
            }
        }

    },

    emitChange() {
        console.log("Changes Emitted");
    }
}


// View
const StateView = {
    init() {
        let mainEle = document.getElementById("wrapper").lastElementChild;
        console.log("mainEle", mainEle)
        mainEle.innerHTML = "";
        StateView.render(mainEle, StateStore.state)
    },

    render(mainDiv, store) {
        console.log("mainDiv", mainDiv)
        for (let obj of store) {
            let divToAdd;
            console.log(obj)
            if (obj.type == "file") {
                divToAdd = createFileEle(obj);
                console.log(divToAdd);
            }
            else if (obj.type == "folder") {
                divToAdd = createFolderEle(obj);
                console.log(divToAdd)
            }
            console.log("Div to ADD", divToAdd)
            mainDiv.appendChild(divToAdd);
            if (obj.children != null) {
                this.render(divToAdd.lastElementChild, obj.children)
            }
        }
    }
}



// Action Creators
function addFolder(elem) {
    inputValue = document.getElementById('inputValue');
    if (!checkFileName(inputValue.value)) {
        window.alert("File name should be between 1 and 10 characters and can only contain letters and numbers.");
        return;
    }

    let arrayOfChildren = findParentObj(StateStore.state, elem.parentNode.id, StateStore.state).children
    for (let obj of arrayOfChildren) {
        if (obj.name === inputValue.value) {
            alert("File/Folder with given name is already exist");
            return;
        }
    }

    let parentNodeID = elem.parentNode.id;
    let parentNode = findObj(StateStore.state, parentNodeID);
    console.log("ParentNode:", parentNode)

    newObj = {
        id: unique_id(),
        level: parentNode.level + 1,
        parentNodeId: parentNodeID,
        name: inputValue.value,
        type: "folder",
        children: []
    }
    console.log("NewObj", newObj)
    return {
        type: 'addFolder',
        newObj
    }
}

function addFile(elem) {
    inputValue = document.getElementById('inputValue');
    if (!checkFileName(inputValue.value)) {
        window.alert("File name should be between 1 and 10 characters and can only contain letters and numbers.");
        return;
    }

    let arrayOfChildren = findParentObj(StateStore.state, elem.parentNode.id, StateStore.state).children
    for (let obj of arrayOfChildren) {
        if (obj.name === inputValue.value) {
            alert("File/Folder with given name is already exist");
            return;
        }
    }

    let parentNodeID = elem.parentNode.id;
    let parentNode = findObj(StateStore.state, parentNodeID);
    console.log("ParentNode:", parentNode)

    newObj = {
        id: unique_id(),
        level: parentNode.level + 1,
        parentNodeId: parentNodeID,
        name: document.getElementById('inputValue').value,
        type: "file",
        children: null
    }
    console.log("NewObj", newObj)
    return {
        type: 'addFile',
        newObj
    }
}

function deleteNode(elem) {
    console.log("Inside deleteNode: ", elem.parentNode)
    return {
        type: 'delete',
        id: elem.parentNode.id
    }
}

function toggleFolder(elem) {
    console.log("Entering Toggle: ");
    return {
        type: 'toggle',
        node: elem
    }
}

// Connect Store to Dispatcher
Dispatcher.register(StateStore.handleAction.bind(StateStore));


// Initialize View
StateView.init();

// EventListeners
function createFolderEvent(elem) {
    Dispatcher.dispatch(addFolder(elem));
}


function createFileEvent(elem) {
    Dispatcher.dispatch(addFile(elem))
}

function deleteEvent(elem) {
    console.log("Delete")
    Dispatcher.dispatch(deleteNode(elem))
}

function toggleEvent(elem) {
    console.log(elem);
    Dispatcher.dispatch(toggleFolder(elem))
}