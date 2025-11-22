import React, { useState , Navbar} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';


const Assignments = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/upload">Upload Materials</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/curriculum">Curriculum Guides</Link></li>
      </ul>
    </nav>
  );
};

const UploadMaterials = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload Learning Materials</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

const Resources = () => {
  return (
    <div>
      <h2>Student Resources</h2>
      <p>List of resources will be displayed here.</p>
    </div>
  );
};

const CurriculumGuides = () => {
  return (
    <div>
      <h2>Curriculum Guides & Inferences</h2>
      <p>Curriculum guides and inferences will be displayed here.</p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/upload" element={<UploadMaterials />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/curriculum" element={<CurriculumGuides />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Assignments ;