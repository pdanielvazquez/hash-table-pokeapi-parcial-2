import { useEffect, useState } from "react";
import { HashTable } from "./HashTable";

function Pokemon() {

  // Definición de estilos para la imagen del pokemon
  const imgStyle = {
    width: "200px",
    margin: "20px 0 20px 0"
  }

  // Objetos de estado
  // Estan asociados a elementos que se van a renderizar 
  const [idpokemon, setIdpokemon] = useState(1);
  const [pokedata, setPokedata] = useState({});
  const [table, setTable] = useState(new HashTable(5));
  // Estados para la búsqueda
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  // Función para incrememtar el id del pokemon
  const handleAddIdPokemon = async () => {
    setIdpokemon(idpokemon + 1);
    await fetchPokemonData(idpokemon);
    
  }

  // Función para decrementar el id del pokemon
  const handleSubtractIdPokemon = async () => {
    if (idpokemon > 1) {
      setIdpokemon(idpokemon - 1);
      await fetchPokemonData(idpokemon);
    }
  }

  // Función para reiniciar el id del pokemon
  const handleResetIdPokemon = async () => {
    setIdpokemon(1);
    await fetchPokemonData(idpokemon);
  }

  // Función que recupera los datos de un pokemon a partir de su id usando la API de pokeapi.co
  const fetchPokemonData = async (pokemonId) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await response.json();
      setPokedata(data);
      table.insert(data.id, { name: data.name, abilities: data.abilities, sprites: data.sprites });
      console.log(table);
    }
    catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }

  // Función para leer el valor del input de búsqueda y actualizar el estado de búsqueda
  const handleSearch = () => {
    if (searchId) {
      alert(`Buscando pokemon con ID: ${searchId}`);
    }
    else if (searchName) {
      alert(`Buscando pokemon con nombre: ${searchName}`);
    }
    else {
      alert("Por favor ingresa un ID o un nombre para buscar.");
    }
  }

  // useEffect para cargar los datos del pokemon al renderizar el componente Pokemon por primera vez

  useEffect( () => {
    // invocar función para cargar los datos del pokemon
    fetchPokemonData(idpokemon);
  }, [])
  
  
  return (
    <div>
        <div>Pokemon</div>
        

        <div className="row">
          {/* Primer columna */}
          <div className="col-6">
            <h1>({ pokedata ? pokedata.id : null }) { pokedata ? pokedata.name : "Cargando..." }</h1>
            <div>
              {
                pokedata && pokedata.abilities ? (
                  <>
                    {pokedata.abilities.map((ability, index) => (
                      <span className="btn btn-success btn-sm btn-disabled m-1" key={index}>{ability.ability.name} </span>
                    ))
                    }
                  </>
                ) : null
              }
            </div>

            <div>
              
              {
                pokedata && pokedata.sprites ? (
                  <>
                  <img style={imgStyle} src={ pokedata.sprites.front_default ? pokedata.sprites.front_default : null } alt="Pokemon" />
                  <img style={imgStyle} src={ pokedata.sprites.back_default ? pokedata.sprites.back_default : null } alt="Pokemon" />
                  </>
                ) : (<p>Cargando imagen...</p>)
              }
              
            </div>
            
            <button className="btn btn-warning m-1" onClick={() => handleSubtractIdPokemon()  }>
              <i className="fas fa-arrow-left"></i>
              Atras
            </button>
            <button className="btn btn-primary m-1" onClick={() => handleAddIdPokemon() }>
              <i className="fas fa-arrow-right"></i>
              Adelante
            </button>
            <button className="btn btn-danger m-1" onClick={() => handleResetIdPokemon() }>
              <i className="fas fa-redo"></i>
              Reinciar
            </button>

          </div>
          {/* Segunda columna */}
          <div className="col-5">
            <h3 className="mt-3">Busqueda</h3>
            <div className="form-group">
              <input type="number" className="form-control m-2" placeholder="Buscar por ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
              <input type="text" className="form-control m-2" placeholder="Buscar por nombre" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
              <button className="btn btn-primary m-1" onClick={handleSearch}>
                <i className="fas fa-search"></i>
                Buscar
              </button>
              <button className="btn btn-warning m-1" onClick={() => { setSearchId(""); setSearchName(""); }}>
                <i className="fas fa-eraser"></i>
                Limpiar
              </button>
            </div>
          </div>
        </div>

        <hr />

        <div className="mt-3">
          <h2>Memoria caché (Tabla-Hash)</h2>
          <div className="row">
            <div className="col-6">
              <h5>Tamaño de memoria: { table.table.length } </h5>
            </div>
            <div className="col-6">
              <h5>Carga: { (table.load_ptc * 100).toFixed(0) }% </h5>
            </div>
          </div>
          <div className="row">
            {
              table.table.map((bucket, index) => (
                <div className="col-2" key={index}>
                  
                  <span key={index} className="btn btn-info btn-disabled w-100 mb-2">
                    <strong>Bucket {index}:</strong>
                    {bucket.map((entry, entryIndex) => (
                      <span key={entryIndex} className="btn btn-secondary btn-disabled m-1 p-1 w-100">
                        ({entry.key}) {entry.value.name}
                      </span>
                    ))}
                  </span>
                </div>
              ))
            }
            
          </div>
        </div>
    </div>
  )
}

export default Pokemon