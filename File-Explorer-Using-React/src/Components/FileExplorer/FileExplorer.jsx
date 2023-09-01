import { useState } from 'react'
import './FileExplorer.css'
import InputBox from '../InputBox/InputBox';
import MainDiv from '../Main_Div/MainDiv';

const FileExplorer = (props) => {
    console.log(props.fileExplorer);
    const [name, setName] = useState("");

    return (
        <div className="Main">
            <h1 className='heading'>File Explorer</h1>
            <InputBox name={name} setName={setName} />

            <div>
                <MainDiv data={props.fileExplorer} store={props.fileExplorer} name={name} setName={setName} setData={props.setFileExplorer} />
            </div>
        </div>
    );
}

export default FileExplorer