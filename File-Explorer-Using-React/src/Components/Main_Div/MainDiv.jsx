import FolderComponent from '../FolderComponent/FolderComponent'
import FileComponent from '../FileComponent/FileComponent'

let uniqueId = -1;
const generateUniqueId = () => {
    uniqueId++;
    return uniqueId;
}

const MainDiv = ({ data, store, name, setName, setData }) => {
    const addFolder = (storeData, id) => {
        let newObj = {
            id: generateUniqueId(),
            parentNodeId: id,
            name: name,
            children: [],
            visible: true,
            type: "folder",
        };
        storeData.forEach((elem) => {
            let duplicateName = false;
            if (elem.id === id) {
                elem.children.forEach((elem) => {
                    if (elem.name === name) {
                        window.alert("Folder Already Exist With Given Name!");
                        duplicateName = true;
                    }
                });
                if (name === " " || name === "") {
                    window.alert("Please Enter Folder Name")
                }
                else if (!duplicateName) {
                    elem.children.push(newObj);
                }
                setName("");
            }

            else if (elem.children) {
                addFolder(elem.children, id);
            }
        });
    };

    const addFile = (storeData, id) => {
        let newObj = {
            id: generateUniqueId(),
            parentNodeId: id,
            name: name,
            children: null,
            visible: true,
            type: "file",
        };
        storeData.forEach((elem) => {
            let duplicateName = false;
            if (elem.id === id) {
                elem.children.forEach((elem) => {
                    if (elem.name === name) {
                        window.alert("File Already Exist With Given Name!");
                        duplicateName = true;
                    }
                });
                if (name === " " || name === "") {
                    window.alert("Please Enter File Name")
                }
                else if (!duplicateName) {
                    elem.children.push(newObj);
                }
                setName("");
            }

            else if (elem.children) {
                addFile(elem.children, id);
            }
        });
    };

    const deleteElem = (storeData, id, parentNodeId) => {
        let root = false;
        if (id === 'id1') {
            root = true;
            window.alert("Root cannot be Deleted!");
        }
        if (!root) {
            storeData.forEach((elem) => {
                if (elem.id === parentNodeId) {
                    let children = elem.children;
                    for (let i = 0; i < children.length; i++) {
                        if (children[i].id === id) {
                            children.splice(i, 1);
                        }
                    }
                    elem.children = children;
                    setData([...store]);
                }
                if (elem.children !== null) {
                    deleteElem(elem.children, id, parentNodeId);
                }
            });
        }
    };

    return (
        <div>
            {data.map((elem) =>
                elem.type === "folder" ? (
                    <div style={{ paddingLeft: "20px" }}>
                        {elem.visible && (
                            <FolderComponent
                                folderData={elem}
                                data={data}
                                name={name}
                                setData={setData}
                                addFolder={addFolder}
                                addFile={addFile}
                                store={store}
                                deleteElem={deleteElem}
                            />
                        )}
                        {elem.children && (
                            <MainDiv
                                data={elem.children}
                                store={store}
                                name={name}
                                setName={setName}
                                setData={setData}
                            />
                        )}
                    </div>
                ) : (
                    <div style={{ paddingLeft: "20px" }}>
                        {elem.visible && (
                            <FileComponent
                                fileData={elem}
                                store={store}
                                name={name}
                                data={data}
                                setData={setData}
                                deleteElem={deleteElem}
                            />
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default MainDiv;
