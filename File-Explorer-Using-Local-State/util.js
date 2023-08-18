// pure function
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

const createNode = (parentObj, itemName, itemType) => {
    if (itemType == "folder") {
        let newObj = {
            type: itemType,
            name: itemName,
            id: "FolderId" + unique_id(),
            children: [],
            level: (parentObj.level) + 1
        }
        return newObj;
    }
    else if (itemType == "file") {
        let newObj = {
            type: itemType,
            name: itemName,
            id: "FileId" + unique_id(),
            children: null,
            level: parentObj.level + 1
        }
        return newObj;
    }
}

function creating_arrow() {
    let arrow = document.createElement("span");
    arrow.classList.add("rotate")
    arrow.setAttribute("onclick", "checkClassCollapse(this)")
    arrow.innerHTML = "&#9205;"
    return arrow;
}

function creating_buttons() {
    let folder_button = document.createElement("button");
    folder_button.innerHTML = "&#128193;";
    folder_button.classList.add("folderIcon")
    folder_button.setAttribute("onclick", "onFolderClick(this)")

    let file_button = document.createElement("button")
    file_button.innerHTML = "&#128196;"
    file_button.classList.add("fileIcon")
    file_button.setAttribute("onclick", "onFileClick(this)")

    let delete_button = document.createElement("button")
    delete_button.innerHTML = "&#9587;"
    delete_button.classList.add("deleteIcon")
    delete_button.setAttribute("onclick", "onDeleteClick(this)")

    return { folder_button, file_button, delete_button };
}


const deleteNode = (id, childrenArray, deleteId) => {
    if (id === "main") {
        id = "main_section"
    }

    for (let i = 0; i < childrenArray.length; i++) {
        if (id === childrenArray[i].id) {
            let childArray = childrenArray[i].children;

            let index = childArray.findIndex((obj) => obj.id === deleteId);
            childrenArray[i].children.splice(index, 1);
            return;
        }
        if (childrenArray[i].children != null) {
            deleteNode(id, childrenArray[i].children, deleteId);  // Recursively search nested children
        }
    }
}

// functions for performing operation on DOM
function createFile(name, obj) {
    let main_div = document.createElement("div");
    main_div.id = unique_id();
    main_div.style.paddingLeft = ((obj.level) * 10) + "px";

    let file_name = document.createElement("span");
    file_name.innerHTML = name;
    let { delete_button } = creating_buttons();

    main_div.append(file_name)
    main_div.appendChild(delete_button)
    return main_div
}

function createFolder(name, obj) {
    let main_div = document.createElement("div");
    main_div.id = obj.id;
    main_div.style.paddingLeft = ((obj.level) * 10) + "px";

    let arrow_button = creating_arrow();
    let { folder_button, file_button, delete_button } = creating_buttons();

    let folder_name = document.createElement("span");
    folder_name.innerText = name;

    main_div.appendChild(arrow_button);
    main_div.appendChild(folder_name)
    main_div.appendChild(folder_button);
    main_div.appendChild(file_button);
    main_div.appendChild(delete_button);

    let children_div = document.createElement("div");
    children_div.id = unique_id();

    main_div.appendChild(children_div)
    return main_div;
}

const checkClassCollapse = (event) => {
    let lastchild = event.parentNode.lastElementChild;
    console.log(lastchild)

    if (lastchild.classList.length == 0) {
        lastchild.classList.add("collapse");
        event.classList.remove("rotate");
        event.classList.add("normal")
    }
    else {
        lastchild.classList.remove("collapse")
        event.classList.add("rotate");
        event.classList.remove("normal")
    }
}
