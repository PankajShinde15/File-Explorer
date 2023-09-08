import { useState } from 'react';
import './FolderComponent.css'
const Folder = (props) => {
    const [toggle1, setToggle] = useState(true);
    return (
        <div className="folderWrapper">
            <span
                className='toggleBtn'
                onClick={() => {
                    props.toggleFolder(props.folderData, props.folderData.id);
                    setToggle(!toggle1)
                }}
            >
                {toggle1 ? <span className='normal'>&#9205;</span> : <span className='rotate'>&#9205;</span>}
            </span>
            <span>{props.folderData.name}</span>
            <span>
                <span
                    className="createFolderBtn"
                    onClick={() => props.addFolder(props.store, props.folderData.id)}
                >
                    &#128193;
                </span>
                <span
                    className="createFileBtn"
                    onClick={() => props.addFile(props.store, props.folderData.id)}
                >
                    &#128196;
                </span>
                <span
                    className="deleteBtn"
                    onClick={() =>
                        props.deleteElem(
                            props.store,
                            props.folderData.id,
                            props.folderData.parentNodeId
                        )
                    }
                >
                    &#x2715;
                </span>

                <span
                    className='renameBtn'
                    onClick={() => props.renameItem(props.store, props.folderData)}>

                    &#9998;
                </span>
            </span>

        </div >
    );
}

export default Folder;