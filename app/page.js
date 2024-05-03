'use client'
import { useEffect, useState } from "react";
import styles from '../styles/home.css'

export default function Home() {
  const [objetivo, setObjetivo] = useState([]);
  const [politica, setPolitica] = useState([]);
  const [selectedObjetivo, setSelectedObjetivo] = useState(""); // Estado para almacenar el objetivo seleccionado
  const [selectedPolitica, setSelectedPolitica] = useState(""); // Estado para almacenar la política seleccionada
  const [selectedData, setSelectedData] = useState([]); // Estado para almacenar los datos seleccionados de la tabla

  const baseUrl = 'http://localhost:5000/objetivo'
  const basePolitica = 'http://localhost:5000/politica'
  const saveUrl = 'http://localhost:5000/saveData'; // URL de la API para guardar datos

  const fetchObjetivos = () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((res) => {
        setObjetivo(res);
      });
  };

  const fetchPolitica = () => {
    fetch(basePolitica)
      .then((res) => res.json())
      .then((res) => {
        setPolitica(res);
      });
  };

  useEffect(() => {
    fetchObjetivos();
    fetchPolitica();
  }, []); // Llamada inicial al cargar el componente

  const handleObjetivoChange = (e) => {
    setSelectedObjetivo(e.target.value);
  };

  const handlePoliticaChange = (e) => {
    setSelectedPolitica(e.target.value);
  };

  const handleSave = () => {
    const newData = { objetivo: selectedObjetivo, politica: selectedPolitica };
    // Enviar newData a la API para guardar en la base de datos
    fetch(saveUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data saved:', data);
      // Actualizar el estado selectedData con los nuevos datos guardados
      setSelectedData([...selectedData, newData]);
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
    // Limpiar los campos de selección después de guardar
    setSelectedObjetivo("");
    setSelectedPolitica("");
  };

  return (
    <>
      <div>
        <h3>Selecciona un objetivo estratégico:</h3>
        <select value={selectedObjetivo} onChange={handleObjetivoChange}>
          <option value="">Seleccionar objetivo</option>
          {objetivo.map((obj, index) => (
            <option key={index} value={obj.nombre}>{obj.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <h3>Selecciona una política asociada:</h3>
        <select value={selectedPolitica} onChange={handlePoliticaChange}>
          <option value="">Seleccionar política</option>
          {politica.map((pol, index) => (
            <option key={index} value={pol.nombre}>{pol.nombre}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSave}>Guardar selección</button>

      <h3>Selecciones guardadas:</h3>
      <table>
        <thead>
          <tr>
            <th>Objetivo Estratégico</th>
            <th>Política Asociada</th>
          </tr>
        </thead>
        <tbody>
          {selectedData.map((data, index) => (
            <tr key={index}>
              <td>{data.objetivo}</td>
              <td>{data.politica}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
