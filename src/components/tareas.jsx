import React, { useState, useEffect } from 'react';
import '../app.css';

const Tareas = () => {
  const [listar, setListar] = useState(false);
  const [tareas, setTareas] = useState(() => {
    const storedTareas = localStorage.getItem('tareas');
    return storedTareas ? JSON.parse(storedTareas) : [];
  });
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('importante');
  const [tareaEnEdicion, setTareaEnEdicion] = useState(null);
  const [indexEnEdicion, setIndexEnEdicion] = useState(null);

  // Estados para la lista y filtros
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroCompletado, setFiltroCompletado] = useState('');

  useEffect(() => {
    const tareasGuardadasString = localStorage.getItem('tareas');
    const tareasGuardadas = JSON.parse(tareasGuardadasString);
    setTareas(tareasGuardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const listarTarea = () => {
    setListar(!listar);
    setTareaEnEdicion(null);
    setIndexEnEdicion(null);
  };

  const añadirTarea = () => {
    const nuevaTarea = { 
      titulo, 
      descripcion: descripcion || '-', // Para que la lista se vea bien
      categoria, 
      realizada: false 
    };
    if (titulo) {
      setTareas([...tareas, nuevaTarea]);
      setTitulo('');
      setDescripcion('');
      setCategoria('importante');
    }
    setListar(false);
  };

  const borrarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  const filtrarTareasPorCategoria = (categoria) => {
    return tareas.filter((tarea) => tarea.categoria === categoria);
  };

  const editarTarea = (index) => {
    setTareaEnEdicion(tareas[index]);
    setIndexEnEdicion(index);
    setListar(false);
  };

  const guardarEdicion = () => {
    const nuevasTareas = [...tareas];
    nuevasTareas[indexEnEdicion] = tareaEnEdicion;
    setTareas(nuevasTareas);
    setTareaEnEdicion(null);
    setIndexEnEdicion(null);
  };

  // Función para filtrar las tareas según los filtros seleccionados
  const filtrarTareas = () => {
    let tareasFiltradas = [...tareas];

    if (filtroCategoria) {
      tareasFiltradas = tareasFiltradas.filter(
        (tarea) => tarea.categoria === filtroCategoria
      );
    }

    if (filtroCompletado !== '') {
      const completado = filtroCompletado === 'true';
      tareasFiltradas = tareasFiltradas.filter(
        (tarea) => tarea.realizada === completado
      );
    }

    return tareasFiltradas;
  };

  const getColorByCategoria = (categoria) => {
    switch (categoria) {
      case 'importante':
        return 'rgba(255, 0, 0, 0.15)';
      case 'trabajo':
        return 'rgba(0, 0, 255, 0.15)';
      case 'recados':
        return 'rgba(0, 255, 0, 0.15)';
      case 'estudios':
        return 'rgba(255, 255, 0, 0.15)';
      default:
        return 'transparent';
    }
  };

  const getColorByCategoriaTd = (categoria) => {
    switch (categoria) {
      case 'importante':
        return 'rgba(255, 0, 0, 0.08)';
      case 'trabajo':
        return 'rgba(0, 0, 255, 0.08)';
      case 'recados':
        return 'rgba(0, 255, 0, 0.08)';
      case 'estudios':
        return 'rgba(255, 255, 0, 0.08)';
      default:
        return 'transparent';
    }
  }
  

  return (
    <div>
      <h1>ToDo A Pepe</h1>

      <button className={'nueva'} onClick={listarTarea}>Nueva tarea</button>

      {listar && (
        <div>
          <input
            type="text"
            placeholder="Nombre de la tarea"
            className="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción de la tarea"
            className="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="importante">Importantes</option>
            <option value="trabajo">Trabajo</option>
            <option value="recados">Recados</option>
            <option value="estudios">Estudios</option>
          </select>
          <button onClick={añadirTarea}>Guardar tarea</button>
        </div>
      )}

      {tareaEnEdicion && (
        <div>
          <input
            type="text"
            placeholder="Nombre de la tarea"
            className="titulo"
            value={tareaEnEdicion.titulo}
            onChange={(e) =>
              setTareaEnEdicion({ ...tareaEnEdicion, titulo: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Descripción de la tarea"
            className="descripcion"
            value={tareaEnEdicion.descripcion}
            onChange={(e) =>
              setTareaEnEdicion({
                ...tareaEnEdicion,
                descripcion: e.target.value,
              })
            }
          />
          <select
            value={tareaEnEdicion.categoria}
            onChange={(e) =>
              setTareaEnEdicion({ ...tareaEnEdicion, categoria: e.target.value })
            }
          >
            <option value="importante">Importantes</option>
            <option value="trabajo">Trabajo</option>
            <option value="recados">Recados</option>
            <option value="estudios">Estudios</option>
          </select>
          <button onClick={guardarEdicion}>Guardar edición</button>
        </div>
      )}

      <div className="contenedor">
        {/* Barra de búsqueda y filtros */}
          <div>
            <div className={'filtrosContenedor'}>
            <select
              value={filtroCompletado}
              onChange={(e) => setFiltroCompletado(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="true">Completados</option>
              <option value="false">No completados</option>
            </select>
            <select
              value={filtroCompletado}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <option value="">Categorias</option>
              <option value="">Todos</option>
              <option value="importante">Importantes</option>
              <option value="trabajo">Trabajo</option>
              <option value="recados">Recados</option>
              <option value="estudios">Estudios</option>
            </select>
          </div>

          {/* Lista de tareas */}
          <ul>
            {filtrarTareas().map((tarea, index) => (
              <li key={index} style={{ backgroundColor: getColorByCategoria(tarea.categoria) }}>
                <strong>{tarea.titulo.charAt(0).toUpperCase() + tarea.titulo.slice(1)}:</strong> {tarea.descripcion.charAt(0).toUpperCase() + tarea.descripcion.slice(1)}
                <input
                  type="checkbox"
                  checked={tarea.realizada}
                  onChange={() => {
                    const nuevasTareas = [...tareas];
                    nuevasTareas[index].realizada = !tarea.realizada;
                    setTareas(nuevasTareas);
                  }}
                />
                <button onClick={() => editarTarea(index)}>Editar</button>
                <button onClick={() => borrarTarea(index)}>Borrar</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tabla de tareas */}
        <table>
          <tbody>
            {['importante', 'trabajo', 'recados', 'estudios'].map((categoria) => (
              <React.Fragment key={categoria}>
                <tr>
                  <th colSpan="5" style={{ backgroundColor: getColorByCategoria(categoria) }}>{categoria.toUpperCase()}</th>
                </tr>
                {filtrarTareasPorCategoria(categoria).map((tarea, index) => (
                  <tr key={index} style={{ backgroundColor: getColorByCategoriaTd(categoria) }}>
                    <td><strong>{tarea.titulo.charAt(0).toUpperCase() + tarea.titulo.slice(1)}</strong></td>
                    <td>{tarea.descripcion.charAt(0).toUpperCase() + tarea.descripcion.slice(1)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Tareas;

