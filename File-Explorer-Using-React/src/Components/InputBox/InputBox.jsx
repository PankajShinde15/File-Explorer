import './InputBox.css'

const InputBox = (props) => {
    return (
        <div className="InputDiv">Enter File/Folder Name:
            <input type="text" placeholder="Enter File/Folder Name" id="InputBox" value={props.name} onChange={(event) => {
                props.setName(event.target.value);
            }}
            />

            <span id="error"></span>
        </div>

    );
};

export default InputBox