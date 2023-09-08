import { useState } from 'react';
import './App.css';
import FileExplorer from './Components/FileExplorer/FileExplorer'
function App() {
  const [fileExplorer, setFileExplorer] = useState([
    {
      id: 'id1',
      parentNodeId: -1,
      name: "root",
      type: "folder",
      children: [],
      toggle:true
    }
  ]);
  return (
    <div className="App">
      <FileExplorer fileExplorer={fileExplorer} setFileExplorer={setFileExplorer} />
    </div>
  );
}

export default App;
