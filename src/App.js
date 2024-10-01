import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import NaveCenter from './NaveBareCenter/NaveCenter';






function App() {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState('');


  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('certificateNumber', certificateNumber);
    formData.append('studentName', studentName);
    formData.append('pdf', pdfFile);

    try {
      await axios.post(`http://localhost:3001/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setError('');
      alert('Certificat uploadé avec succès');
    } catch (err) {
      setError('Erreur lors d\'enregistrement du certificat.');
    }
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };
  return (
    <>
    <div>
    <NaveCenter/>
    </div>
    <form onSubmit={handleUpload} className="serveur">
        <input
          type="text"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          placeholder="Numéro de certificat"
          className="w-full px-3 py-2 border rounded-md mb-2"
          required
        />
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Nom de l'étudiant"
          className="w-full px-3 py-2 border rounded-md mb-2"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          className="w-full mb-2"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Enregistrer le certificat
        </button>
      </form>
      <div className='error'>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>

    </>
  );
}

export default App;
