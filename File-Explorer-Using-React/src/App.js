import { useState } from 'react';
import './App.css';
import FileExplorer from './Components/FileExplorer/FileExplorer'
function App() {
  const [fileExplorer, setFileExplorer] = useState([
    {
      id: 'id1',
      // key: 0,
      level: 0,
      parentNodeId: -1,
      name: "root",
      type: "folder",
      children: [],
      visible: true
    }
  ]);
  return (
    <div className="App">
      <FileExplorer fileExplorer={fileExplorer} setFileExplorer={setFileExplorer} />
    </div>
  );
}

export default App;
