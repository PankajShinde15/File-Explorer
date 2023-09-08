import './FileComponent.css'
const File = (props) => {
    return (
        <div className="fileWrapper">
            <span>{props.fileData.name}</span>
            <span
                className="deleteBtn"
                onClick={() =>
                    props.deleteElem(props.store, props.fileData.id, props.fileData.parentNodeId)}
            >&#x2715;
            </span>
            <span
                className='renameBtn'
                onClick={() => props.renameItem(props.store, props.fileData)}>

                &#9998;
            </span>
        </div>
    );
}

export default File;