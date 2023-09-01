import './FileComponent.css'
const File = (props) => {
    return (
        <div className="fileWrapper">
            <span>{props.fileData.name}</span>
            <span
                className="deleteBtn"
                onClick={() =>
                    props.deleteElem(
                        props.store,
                        props.fileData.id,
                        props.fileData.parentNodeId
                    )
                }
            >
                &#x2715;
            </span>
        </div>
    );
}

export default File;