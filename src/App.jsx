import React, { useState } from 'react';
import './App.css';

function App() {
  const [miBlob, setMiBlob] = useState(null);
  const [resultado, setResultado] = useState('Haz clic en "Crear Blob de texto" para comenzar...');

  // 1. Crear Blob de texto
  const crearBlob = () => {
    const contenido = "Este es el contenido original del archivo creado mediante un Blob en React.\nUniversidad Católica de Salta - Lenguaje IV.";
    const blob = new Blob([contenido], { type: 'text/plain' });
    setMiBlob(blob);
    setResultado(`¡Blob creado con éxito!\n- Tamaño: ${blob.size} bytes\n- Tipo: ${blob.type}\n- Contenido: "${contenido}"`);
  };

  // 2. Descargar el Blob localmente
  const descargarBlob = () => {
    if (!miBlob) {
      alert('Primero debes crear el Blob.');
      return;
    }
    const url = URL.createObjectURL(miBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archivo_react.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 3. Usar Slice para recortar parte del Blob
  const usarSlice = () => {
    if (!miBlob) {
      alert('Primero debes crear el Blob.');
      return;
    }
    const blobCortado = miBlob.slice(0, 45, 'text/plain');
    const reader = new FileReader();
    reader.onload = function(e) {
      setResultado(`[Resultado de aplicar slice(0, 45)]\n- Tamaño recortado: ${blobCortado.size} bytes\n- Contenido parcial: "${e.target.result}"`);
    };
    reader.readAsText(blobCortado);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Ejemplo de uso de Blobs en React</h2>
        
        <div className="controls">
          <button onClick={crearBlob} className="btn-verde">Crear Blob de texto</button>
          <button onClick={descargarBlob} className="btn-verde">Descargar Blob</button>
          <button onClick={usarSlice} className="btn-verde">Usar slice()</button>
        </div>

        <div className="resultado">
          <pre>{resultado}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;