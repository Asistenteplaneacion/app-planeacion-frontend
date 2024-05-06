'use client'


import React, { useEffect, useState } from "react";
import styles from '../styles/home.css'

export default function Home() {
  const [objetivo, setObjetivo] = useState([]);
  const [politica, setPolitica] = useState([]);
  const [programa, setPrograma] = useState([]);
  const [proyecto, setProyecto] = useState([]);
  const [componente, setComponente] = useState([]);
  const [responsableComponente, setResponsableComponente] = useState([]);



  const [selectedObjetivo, setSelectedObjetivo] = useState(""); 
  const [selectedPolitica, setSelectedPolitica] = useState("");
  const [selectedPrograma, setselectedPrograma] = useState("");
  const [selectedProyecto, setselectedProyecto] = useState("");
  const [selectedComponente, setselectedComponente] = useState("");
  const [selectedResponsableComponente, setselectedResponsableComponente] = useState("");




  const [selectedData, setSelectedData] = useState([]);


  const baseUrl = 'http://localhost:5000/objetivo';
  const basePolitica = 'http://localhost:5000/politica';
  const basePrograma = 'http://localhost:5000/programa';
  const baseProyecto = 'http://localhost:5000/proyecto';
  const baseComponente = 'http://localhost:5000/componente';
  const baseResponsableComponente = 'http://localhost:5000/responsableComponente';



  const saveUrl = 'http://localhost:5000/saveData';


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

  const fetchPrograma = () => {
    fetch(basePrograma)
      .then((res) => res.json())
      .then((res) => {
        setPrograma(res);
      });
  };

  const fetchProyecto = () => {
    fetch(baseProyecto)
      .then((res) => res.json())
      .then((res) => {
        setProyecto(res);
      });
  };

  const fetchComponente = () => {
    fetch(baseComponente)
      .then((res) => res.json())
      .then((res) => {
        setComponente(res);
      });
  };

  const fetchResponsableComponente = () => {
    fetch(baseResponsableComponente)
      .then((res) => res.json())
      .then((res) => {
        setResponsableComponente(res);
      });
  };

  const fetchSavedData = () => {
    fetch(saveUrl)
      .then((res) => res.json())
      .then((res) => {
        setSelectedData(res);
      });
  };

  useEffect(() => {
    fetchObjetivos();
    fetchPolitica();
    fetchPrograma();
    fetchProyecto();
    fetchComponente();
    fetchResponsableComponente();
    
    fetchSavedData(); // Cargar los datos guardados al montar el componente
  }, []); 

  const handleObjetivoChange = (e) => {
    setSelectedObjetivo(e.target.value);
  };

  const handlePoliticaChange = (e) => {
    setSelectedPolitica(e.target.value);
  };

  const handleProgramaChange = (e) => {
    setselectedPrograma(e.target.value);
  };

  const handleProyectoChange = (e) => {
    setselectedProyecto(e.target.value);
  };

  const handleComponenteChange = (e) => {
    setselectedComponente(e.target.value);
  };

  const handleResponsableComponenteChange = (e) => {
    setselectedResponsableComponente(e.target.value);
  };

  const handleSave = () => {
    const newData = 
    { 
      objetivo: selectedObjetivo,
      politica: selectedPolitica,
      programa: selectedPrograma,
      proyecto: selectedProyecto,
      componente: selectedComponente,
      responsableComponente: selectedResponsableComponente,
    };
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
      setSelectedData([...selectedData, newData]);
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
    setSelectedObjetivo("");
    setSelectedPolitica("");
    setselectedPrograma("");
    setselectedProyecto("");
    setselectedComponente("");
    setselectedResponsableComponente("");
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
        <h3>Selecciona una política:</h3>
        <select value={selectedPolitica} onChange={handlePoliticaChange}>
          <option value="">Seleccionar política</option>
          {politica.map((pol, index) => (
            <option key={index} value={pol.nombre}>{pol.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <h3>Selecciona una programa:</h3>
        <select value={selectedPrograma} onChange={handleProgramaChange}>
          <option value="">Seleccionar programa</option>
          {programa.map((pro, index) => (
            <option key={index} value={pro.nombre}>{pro.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <h3>Selecciona una proyecto:</h3>
        <select value={selectedProyecto} onChange={handleProyectoChange}>
          <option value="">Seleccionar proyecto</option>
          {proyecto.map((proyec, index) => (
            <option key={index} value={proyec.nombre}>{proyec.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <h3>Selecciona un componente:</h3>
        <select value={selectedComponente} onChange={handleComponenteChange}>
          <option value="">Seleccionar componente</option>
          {componente.map((componen, index) => (
            <option key={index} value={componen.codigoComponente}>{componen.codigoComponente}</option>
          ))}
        </select>
      </div>

      <div>
        <h3>Selecciona un areá Responsable:</h3>
        <select value={selectedResponsableComponente} onChange={handleResponsableComponenteChange}>
          <option value="">Seleccionar Areá</option>
          {responsableComponente.map((ResComponen, index) => (
            <option key={index} value={ResComponen.area}>{ResComponen.area}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSave}>Guardar selección</button>

      <h3>Selecciones guardadas:</h3>
      <table>
        <thead>
          <tr>
            <th>Objetivo Estratégico</th>
            <th>Política</th>
            <th>Programa</th>
            <th>Proyecto</th>
            <th>Componente</th>
            <th>Responsable Componente</th>

            
          </tr>
        </thead>
        <tbody>
          {selectedData.map((data, index) => (
            <tr key={index}>
              <td>{data.objetivo}</td>
              <td>{data.politica}</td>
              <td>{data.programa}</td>
              <td>{data.proyecto}</td>
              <td>{data.componente}</td>
              <td>{data.responsableComponente}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
