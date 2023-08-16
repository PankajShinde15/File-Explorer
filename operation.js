// impure function
const iterateChilderenToPrint = (main_div, children) => {
    for (let obj of children) {
        let addingdiv
        if (obj.type === "file") {
            addingdiv = createFile(obj.name, obj);
        }
        else {
            addingdiv = createFolder(obj.name, obj);
        }
        main_div.appendChild(addingdiv);
        if (obj.children != null) {
            iterateChilderenToPrint(addingdiv.lastElementChild, obj.children)
        }
    }
}

const iterateChildrenAndPush = (findId, children, newObject) => {

    for (let obj of children) {
        if (findId === obj.id) {
            obj.children.push(newObject)
            return;
        }

        if (obj.children != null) {
            iterateChildrenAndPush(findId, obj.children, newObject);
        }
    }
}

const iterateForParentObj = (findId, children) => {
    let ans;
    for (let obj of children) {
        if (findId == obj.id) {
            return obj;
        }

        if (obj.children != null) {
            ans = iterateForParentObj(findId, obj.children);
            if (ans) {
                // console.log(obj)
                return ans;
            }
        }
    }
    return null;
}


// Actions Function 
const onFolderClick = (event) => {
    let inputValue = document.getElementById("InputValueId");
    let parentObj = iterateForParentObj(event.parentNode.id, objStructure);

    let arrayOfChildren = parentObj.children;

    for (let obj of arrayOfChildren) {
        if (obj.name === inputValue.value) {
            alert("Folder with given name is already exist");
            return;
        }
    }
    let newobj = createFolderNode(parentObj, inputValue.value, "folder");

    iterateChildrenAndPush(parentObj.id, objStructure, newobj);

    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;

    iterateChilderenToPrint(main_div, objStructure[0].children)
}

const onFileClick = (event) => {
    let inputValue = document.getElementById("InputValueId");

    let parentObj = iterateForParentObj(event.parentNode.id, objStructure);
    let newobj = createFileNode(parentObj, inputValue.value, "file");

    iterateChildrenAndPush(parentObj.id, objStructure, newobj);

    // main section children delete
    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;
    iterateChilderenToPrint(main_div, objStructure[0].children)
}

const onDeleteClick = (event) => {
    let parentId = event.parentNode.parentNode.id;
    deleteNode(parentId, objStructure, event.parentNode.id)
    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;
    iterateChilderenToPrint(main_div, objStructure[0].children)
}