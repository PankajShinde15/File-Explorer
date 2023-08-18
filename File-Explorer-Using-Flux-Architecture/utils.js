let parentid = 0;
function unique_id() {
    parentid++;
    return parentid;
}

function checkFileName(fileName) {
    const regex = /^[a-zA-Z0-9]{1,10}$/;
    if (!fileName.match(regex)) {
        return false;
    }
    return true;
}

function creating_arrow() {
    let arrow = document.createElement("span");
    arrow.classList.add("rotate")
    arrow.setAttribute("onclick", "toggleEvent(this)")
    arrow.innerHTML = "&#9205;"
    return arrow;
}

function creating_buttons() {
    let folder_button = document.createElement("button");
    folder_button.innerHTML = "&#128193;";
    folder_button.classList.add("icons")
    folder_button.setAttribute("onclick", "createFolderEvent(this)")

    let file_button = document.createElement("button")
    file_button.innerHTML = "&#128196;"
    file_button.classList.add("icons")
    file_button.setAttribute("onclick", "createFileEvent(this)")

    let delete_button = document.createElement("button")
    delete_button.innerHTML = "&#9587;"
    delete_button.classList.add("icons")
    delete_button.setAttribute("onclick", "deleteEvent(this)")

    return { folder_button, file_button, delete_button };
}

const createFolderEle = (obj) => {
    let main_div = document.createElement("div");
    main_div.id = obj.id;
    main_div.style.paddingLeft = ((obj.level) * 20) + "px";

    let arrow_button = creating_arrow();
    let { folder_button, file_button, delete_button } = creating_buttons();

    let folder_name = document.createElement("span");
    folder_name.innerText = obj.name;

    main_div.appendChild(arrow_button)
    main_div.appendChild(folder_name)
    main_div.appendChild(folder_button);
    main_div.appendChild(file_button);
    main_div.appendChild(delete_button);

    let children_div = document.createElement("div");
    children_div.id = unique_id();

    main_div.appendChild(children_div)
    return main_div;
}

const createFileEle = (obj) => {
    let main_div = document.createElement("div");
    main_div.id = obj.id;
    main_div.style.paddingLeft = ((obj.level) * 20) + "px";

    let { folder_button, file_button, delete_button } = creating_buttons();

    let file_name = document.createElement("span");
    file_name.innerText = obj.name;

    main_div.appendChild(file_name)
    main_div.appendChild(delete_button);

    let children_div = document.createElement("div");
    children_div.id = unique_id();

    main_div.appendChild(children_div)
    return main_div;
}

const findObj = (state, Id) => {
    let ans;
    for (let obj of state) {
        if (Id == obj.id) {
            return obj;
        }

        if (obj.children != null) {
            ans = findParentObj(state, Id, obj.children);
            if (ans) {
                return ans;
            }
        }
    }
    return null;
}


const pushObj = (state, parentId, newObject) => {
    for (let obj of state) {
        console.log(parentId, ' ', obj.id);
        if (parentId == obj.id) {
            obj.children.push(newObject)
            return;
        }

        if (obj.children != null) {
            pushObj(obj.children, parentId, newObject);
        }
    }
}

const findParentObj = (state, Id, children) => {
    let ans;
    for (let obj of children) {
        if (Id == obj.id) {
            return obj;
        }

        if (obj.children != null) {
            ans = findParentObj(state, Id, obj.children);
            if (ans) {
                return ans;
            }
        }
    }
    return null;
}

const updateChildrenAfterDeletion = (state, parentId, siblings) => {
    for (let obj of state) {
        if (obj.id == parentId) {
            obj.children = siblings;
            break;
        }
        if (obj.type == "folder") {
            updateChildrenAfterDeletion(obj.children, parentId, siblings)
        }
    }
}