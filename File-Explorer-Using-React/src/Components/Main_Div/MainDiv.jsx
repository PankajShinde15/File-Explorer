import FolderComponent from '../FolderComponent/FolderComponent'
import FileComponent from '../FileComponent/FileComponent'
let uniqueId = -1;
const generateUniqueId = () => {
    uniqueId++;
    return uniqueId;
}

const MainDiv = (props) => {
    const addFolder = (stateStore, id) => {
        let newObj = {
            id: generateUniqueId(),
            parentNodeId: id,
            name: props.name,
            children: [],
            type: "folder",
            toggle: true
        };
        stateStore.forEach((elem) => {
            let nameExist = false;
            if (elem.id === id) {
                elem.children.forEach((elem) => {
                    if (elem.name === props.name) {
                        window.alert("Folder Already Exist With Given Name!");
                        nameExist = true;
                    }
                });
                if (props.name === " " || props.name === "") {
                    window.alert("Please Enter Folder Name")
                }
                else if (!nameExist) {
                    elem.children.push(newObj);
                }
                props.setName("");
            }

            else if (elem.children) {
                addFolder(elem.children, id);
            }
        });
    };

    const addFile = (stateStore, id) => {
        let newObj = {
            id: generateUniqueId(),
            parentNodeId: id,
            name: props.name,
            children: null,
            type: "file",
            toggle: true
        };
        stateStore.forEach((elem) => {
            let nameExist = false;
            if (elem.id === id) {
                elem.children.forEach((elem) => {
                    if (elem.name === props.name) {
                        window.alert("File Already Exist With Given Name!");
                        nameExist = true;
                    }
                });
                if (props.name === " " || props.name === "") {
                    window.alert("Please Enter File Name")
                }
                else if (!nameExist) {
                    elem.children.push(newObj);
                }
                props.setName("");
            }

            else if (elem.children) {
                addFile(elem.children, id);
            }
        });
    };

    const deleteElem = (stateStore, id, parentNodeId) => {
        if (id === 'id1') {
            window.alert("Root cannot be Deleted!");
        }
        else {
            stateStore.forEach((elem) => {
                if (elem.id === parentNodeId) {
                    let children = elem.children;
                    for (let i = 0; i < children.length; i++) {
                        if (children[i].id === id) {
                            children.splice(i, 1);
                        }
                    }
                    elem.children = children;
                    props.setData([...props.store]);
                }
                if (elem.children !== null) {
                    deleteElem(elem.children, id, parentNodeId);
                }
            });
        }
    };

    const toggleFolder = (folderData, id) => {
        let mainEle, lastchild;
        folderData.children.forEach((elem) => {
            elem.toggle = !elem.toggle;
        })
        folderData.children.forEach((elem) => {
            if (elem.type === 'folder' && elem.children.length !== 0) {
                toggleFolder(elem, id)
            }
        });
        props.setData([...props.store])

    }


    const renameItem = (stateStore, ItemData) => {
        if (ItemData.id = 'id1') {
            let newInput = prompt("Enter New Name: ")
            if (newInput === " " || newInput === "") {
                window.alert("Name cannot be empty")
            }
            else {
                ItemData.name = newInput
            }
        }
        else {
            stateStore.forEach((elem) => {
                let nameExist = false;
                console.log("ParentId", ItemData.parentNodeId)
                if (elem.id === ItemData.parentNodeId) {
                    let newInput = prompt("Enter New Name: ")
                    elem.children.forEach((elem) => {
                        if (elem.name === newInput) {
                            window.alert("File Already Exist With Given Name!");
                            nameExist = true;
                        }
                    });
                    if (newInput === " " || newInput === "") {
                        window.alert("Name cannot be empty")
                    }
                    else if (!nameExist) {
                        ItemData.name = newInput
                    }
                }
                else if (elem.children != [] && elem.type === 'folder') {
                    renameItem(elem.children, ItemData)
                }

            });
        }

        props.setData([...props.store])
    }

    return (
        <div>
            {props.data.map((elem) =>
                elem.type === "folder" ? (
                    <div style={{ paddingLeft: "20px" }}>
                        {
                            elem.toggle && <FolderComponent folderData={elem} data={props.data} name={props.name} setData={props.setData} addFolder={addFolder} addFile={addFile} store={props.store} deleteElem={deleteElem} toggleFolder={toggleFolder} renameItem={renameItem} />
                        }
                        {elem.children && (
                            <MainDiv data={elem.children} store={props.store} name={props.name} setName={props.setName} setData={props.setData} />
                        )}
                    </div>
                ) : (
                    <div style={{ paddingLeft: "20px" }}>
                        {
                            elem.toggle && <FileComponent fileData={elem} store={props.store} name={props.name} data={props.data} setData={props.setData} deleteElem={deleteElem} renameItem={renameItem} />
                        }
                    </div>
                )
            )}
        </div>
    );
};

export default MainDiv;
