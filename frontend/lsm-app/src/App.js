import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your component files
import Landing from "./components/Landing";
import TransLogs from "./components/TransLogs";
import Components from './components/Components';
import Simulation from './components/Simulation';
import Memtable from './components/Memtable';
import SSTable from './components/SSTable';
import Compaction from './components/Compaction';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div style={{ backgroundColor: '#262626', minHeight: '100vh', color: 'white'}}>
      <BrowserRouter>
        <NavigationBar /> {/* Navigation Bar */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/trans-logs" element={<TransLogs />} />
          <Route path="/components" element={<Components />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/components/memtable" element={<Memtable />} />
          <Route path="components/sstable" element={<SSTable />} />
          <Route path="/components/compaction" element={<Compaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
