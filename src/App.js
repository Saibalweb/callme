import { Routes, Route } from "react-router-dom";
import "./App.css";
import { SocketProvider } from "./Providers/Socket";
import Home from "./Pages/Home";
import Room from "./Pages/Room";
import { PeerProvider } from "./Providers/Peer";
function App() {
  return (
    <div className="App">
      <SocketProvider>
        <PeerProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room/>} />
        </Routes>
        </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
