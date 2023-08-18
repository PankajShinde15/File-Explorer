// impure function
const iterateChilderenToPrint = (main_div, children) => {
    for (let obj of children) {
        let tempDiv;
        if (obj.type === "file") {
            tempDiv = createFile(obj.name, obj);
        }
        else {
            tempDiv = createFolder(obj.name, obj);
        }
        main_div.appendChild(tempDiv);
        if (obj.children != null) {
            iterateChilderenToPrint(tempDiv.lastElementChild, obj.children)
        }
    }
}

const iterateChildrenAndPush = (Id, children, newObject) => {
    for (let obj of children) {
        if (Id === obj.id) {
            obj.children.push(newObject)
            return;
        }

        if (obj.children != null) {
            iterateChildrenAndPush(Id, obj.children, newObject);
        }
    }
}

const iterateForParentObj = (Id, children) => {
    let ans;
    for (let obj of children) {
        if (Id == obj.id) {
            return obj;
        }

        if (obj.children != null) {
            ans = iterateForParentObj(Id, obj.children);
            if (ans) {
                return ans;
            }
        }
    }
    return null;
}


// Actions Function 
const onFolderClick = (event) => {
    let inputValue = document.getElementById("InputValueId");
    if (!checkFileName(inputValue.value)) {
        window.alert("File name should be between 1 and 10 characters and can only contain letters and numbers.");
        return;
    }
    let parentObj = iterateForParentObj(event.parentNode.id, objStructure);

    let arrayOfChildren = parentObj.children;

    for (let obj of arrayOfChildren) {
        if (obj.name === inputValue.value) {
            alert("File/Folder with given name is already exist");
            return;
        }
    }

    let newobj = createNode(parentObj, inputValue.value, "folder");

    iterateChildrenAndPush(parentObj.id, objStructure, newobj);

    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;

    iterateChilderenToPrint(main_div, objStructure[0].children)
}

const onFileClick = (event) => {
    let inputValue = document.getElementById("InputValueId");
    if (!checkFileName(inputValue.value)) {
        window.alert("File name should be between 1 and 10 characters and can only contain letters and numbers.");
        return;
    }
    let parentObj = iterateForParentObj(event.parentNode.id, objStructure);

    let childrenArray = parentObj.children;

    for (let child of childrenArray) {
        if (child.name === inputValue.value) {
            alert("File/Folder with given name is already exist");
            return;
        }
    }

    let newobj = createNode(parentObj, inputValue.value, "file");

    iterateChildrenAndPush(parentObj.id, objStructure, newobj);

    // main section children delete
    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;
    iterateChilderenToPrint(main_div, objStructure[0].children)
}

const onDeleteClick = (event) => {
    console.log(event.parentNode)
    let parentId = event.parentNode.parentNode.id;
    deleteNode(parentId, objStructure, event.parentNode.id)
    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;
    iterateChilderenToPrint(main_div, objStructure[0].children)
}
