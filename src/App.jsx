import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './componentes/Card'
import CardDireccion from './componentes/CardDireccion'
import './css/Card.css'
import DropDown from './componentes/DropDown'
import { localidads,Barrios } from './data/datos'


function App() {

  const [ select,setSelect]=useState({
     zona :"",
     mensaje:"",
     });

  const [display,setDisplay] =useState({
     porArea: false,
     porDir: false,
     orden: false,
     drop: true,
     texto : true,
     
  });




  const [direcciones,setDirecciones]=useState([]);
  const [data,setData]=useState();
  const [form,setForm] = useState({
    calle:"",
    altura:"",
    zon:""
    });
  const [estaciones,setEstaciones] = useState();
  const [localidades,setLocalidades] = useState();
  const caba = import.meta.env.VITE_CABA
  const ba = import.meta.env.VITE_BA


const nombresBarrios = Barrios.map(barrioObj => barrioObj.barrio);

const crearDirecciones = (data) => {

  const direcciones = data.direcciones.map((direccion)=>({
    nomenclatura : direccion.nomenclatura,
    lat: direccion.ubicacion.lat,
    lon: direccion.ubicacion.lon,
    url : `https://maps.google.com?q=${direccion.ubicacion.lat},${direccion.ubicacion.lon}`,
    urlOSM:`https://www.openstreetmap.org/export/embed.html?bbox=${direccion.ubicacion.lon}%2C${direccion.ubicacion.lat}%2C${direccion.ubicacion.lon}%2C${direccion.ubicacion.lat}&amp;layer=mapnik&amp&marker=${direccion.ubicacion.lat}%2C${direccion.ubicacion.lon}`,
  }));

  
  return direcciones; 


};









  async function lecturaCsv(url) {
   
    try {
      const response = await fetch(url); // Usa await directamente en fetch
      const csv = await response.text(); // Convierte la respuesta a texto
      const data = csv
        .split("\n")
        .slice(1) // Omite el encabezado
        .map((row) => {
          const [idempresa,empresa,cuit,empresabandera,direccion,localidad,latitud,longitud,fecha_vigencia,orden,url,urlOSM,GasOil2,GasOil3,GNC,NaftaPremium,NaftaSuper] = row.split("\t");
          return {idempresa,empresa,cuit,empresabandera,direccion,localidad,latitud,longitud,fecha_vigencia,orden,url,urlOSM,GasOil2,GasOil3,GNC,NaftaPremium,NaftaSuper};
        });

      setData(data);
      


      
     
      





      // return data;  Devuelve los datos en formato JSON
    } catch (error) {
      console.error("Error al leer el CSV:", error);
      throw new Error("No se pudo procesar el archivo CSV");
    }
 
 
  }

  function fecha(fe){

        // Fecha original
      let fechaOriginal = fe;

      // Crear un objeto Date a partir de la fecha original
      let fecha = new Date(fechaOriginal);

      // Obtener el día, mes y año
      let dia = String(fecha.getDate()).padStart(2, '0');
      let mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0-11
      let año = fecha.getFullYear();

      // Formatear la fecha como 'dd-mm-yyyy'
      let fechaFormateada = `${dia}-${mes}-${año}`;

      return fechaFormateada;

  }


  function filtrar (localidad){

    const estacios = data.filter(loc => loc.localidad === localidad);  
    if (estacios.length === 0){
      alert(`Lo sentimos.No encontramos estaciones de Servicio en ${localidad}`)
    }       
    setEstaciones(estacios) 
    

  }


  function filtrarCaba (barrio){


    /*
    const br = Barrios.find(bar => bar.barrio === barrio);   
    ordenarObjetoPorCercania(data,br.latitud,br.longitud)      
    
    
    setEstaciones(estacios) 
    */

  }

  function ordenarObjetoPorCercania(objetoDatos, lt, ln) {

       setDirecciones([]);
   /*  console.log("Punto de referencia:", lt, ln);
    console.log("Datos recibidos:", objetoDatos);
    console.log("Estructura del objetoDatos:", JSON.stringify(objetoDatos, null, 2)); */

    const datOrdenado = objetoDatos
    .map(d => {
        const ConLat = parseFloat(d.latitud.replace(",", "."));
        const ConLon = parseFloat(d.longitud.replace(",", "."));

        if (isNaN(ConLat) || isNaN(ConLon)) return null;

        const resultado = Math.sqrt(Math.pow(ln - ConLon, 2) + Math.pow(lt - ConLat, 2));
        return { ...d, orden: resultado };
    })
    .filter(d => d !== null);  // Elimina elementos inválidos

    datOrdenado.sort((o1, o2) => o1.orden - o2.orden);
   







    //datOrdenado.sort((o1, o2) => o1.orden - o2.orden);

   /*  console.log('Objeto ordenado:', datOrdenado);
    console.log("Valores de 'orden' antes de ordenar:", datOrdenado.map(d => d.orden));
 */
    setEstaciones(datOrdenado.slice(0, 8));
}





  function ordenarNaftaSuper(estaciones) {
    const estacionesOrdenadas = [...estaciones].sort((a, b) => 
      a.NaftaSuper.localeCompare(b.NaftaSuper)
    );
  
   /*  console.log('!2', estacionesOrdenadas); */
    setEstaciones(estacionesOrdenadas);
  }


  function btnTraer (zona){


    setDisplay({
      ...display,
     orden: true,

   
      });


    console.log(zona)
    
    if(zona === 'ba'){
     
      filtrar(document.getElementById('sele').value)

    }


    if(zona === 'caba'){

      
       filtrar(document.getElementById('sele').value)

    }





  }


  function onClickZona (zona){
  
      setEstaciones([]);

    if (zona ==='caba'){

      lecturaCsv(caba)
      setLocalidades(nombresBarrios);    
      
      setSelect ({
        zona : 'caba',
        mensaje: "Selecciona un barrio",
       
      })

      setDisplay({
        ...display,
       porArea: true,
       porDir: false,
       drop:false,
       texto: false,
     
        });
    

    }

    if (zona ==='ba'){
          
      lecturaCsv(ba)
      const loc = [...new Set(data?.map(est => est.localidad))].sort((a, b) => a.localeCompare(b));
      console.log(loc)
      setLocalidades(localidads);    
      
      setSelect ({
        zona: 'ba', 
        mensaje: "Selecciona una localidad",
      

      })

      setDisplay({
        ...display,
      porArea: true,
      porDir: false,
      drop: false,
      texto: false
     
    
        });


  } 
  }



    function clickDireccion(zona){
  
      setEstaciones([]);
      setForm([])

            if (zona ==='caba'){
        
              lecturaCsv(caba)
              setLocalidades(nombresBarrios);    
              
              setSelect ({
                zona : 'caba',
                mensaje: "Selecciona un barrio",
              
              })
        
              setDisplay({
                ...display,
              porArea: false,
              porDir: true,
              drop: false,
              texto: false
            
                });
          
        
            }


            
          if (zona ==='ba'){
          
            lecturaCsv(ba)
            const loc = [...new Set(data?.map(est => est.localidad))].sort((a, b) => a.localeCompare(b));
            console.log(loc)
            setLocalidades(localidads);    
            
            setSelect ({
              zona: 'ba', 
              mensaje: "Selecciona una localidad",
            

            })

            setDisplay({
              ...display,
            porArea: false,
            porDir: true,
            drop:true,
            texto: false
          
              });


    }

   //console.log('p',data,localidades)
   

  }


  const traerResultado = async (calle, altura, localidad,provincia) => {
    const url = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${calle}%20${altura}&provincia="Buenos Aires"&localidad=${localidad}`;
    

     !calle&& alert("Debe ingresar un nombre de calle");
     !altura&& alert("Debe ingresar una altura");
     

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
            
        }
        const data = await response.json();
        if(data.cantidad ==0){
            alert('Lo siento, no pudimos identificar esa dirección, vuelva a intentarlo.')
           /*  setDirecciones([]);
            setEstaciones([]);
            setDireccionSelect('Ubicaicón'); */
        }

        console.log('check',data.cantidad);
        const dires = crearDirecciones(data)
      //  console.log('Resultado:', data);
        console.log ('Direcciones',dires)
        setDirecciones(dires);
        
      // console.log(data)
        
        return data; // Devuelve los datos obtenidos
    } catch (error) {
        console.error('Error:', error.message);
        throw error; // Propaga el error para que pueda ser manejado externamente
    }
};


 
function clickDire(){
      
    

     if(!form.calle ){
      alert ("Ingrese la calle por favor")
     }
     if(!form.altura ){
      alert ("Ingrese la altura por favor")  
      }
   

     if (form.calle && form.altura){

     // alert(`${form.calle} al ${form.altura},${select.zona}` )

       
     
      if(display.drop){

         if(!document.getElementById('sele').value){
          alert('Elegir Localidad, por favor')

         }else{
    /*      alert(`${form.calle} al ${form.altura},${select.zona} ${document.getElementById('sele').value}` ) */
         traerResultado(form.calle,form.altura,document.getElementById('sele').value)
         }

      }

      if(!display.drop){
    /*     alert(`${form.calle} al ${form.altura},${select.zona}` ) */
        traerResultado(form.calle,form.altura,'CABA')

     }




      
      
     
    }
     
     
 }

 const handleChange=(e)=>{
  const name = e.target.name;
  const value = e.target.value;

   setForm({
   ...form,
  [name]: value,

   });

 }

 const handleChangeS=()=>{
  const v = document.getElementsByName('sel')
  
   setForm({
   ...form,
  zon: v[0].value,

   });

 }





  

  return (
    <>


<header>
    <p className="tituloppal">Estaciones de Servicio</p>
    
    <nav>
        <ul>
            
               
           
               <li><div className="dropdown"><p>Elegí una zona</p>
                <div className="contenido">
                    <p onClick={()=>onClickZona('caba')}>CABA</p>
                    <p onClick={()=>onClickZona('ba')}>Buenos Aires</p>
                   
                </div> 

                

                </div></li>

                <li><div className="dropdown"><p>Busca por dirección</p>
                <div className="contenido">
                    <p onClick={()=>clickDireccion('caba')}>CABA</p>
                    <p onClick={()=>clickDireccion('ba')}>Buenos Aires</p>
                   
                </div> 

                

                </div></li>


           </ul>     
           
    </nav>
        
 </header>




<div className="contenedor2">



    <div className="botones">
     {display.texto&&<p className="parrafo">En este sitio podrás encontrar la ubicación de las estaciones de servicio de la Ciudad de Buenos Aires y la Provincia de Buenos Aires con los precios de los diferentes combustibles ofrecidos.La información es proporcionada por el programa de datos abiertos de la República Argentina. Esto aún es un  proyecto en desarrollo, agradecemos su compresión!</p>}
      
    {/* <button onClick={()=>onClickZona('caba')}>CABA</button>
    <button onClick={()=>onClickZona('ba')}>Buenos Aires</button>
   */}
    </div> 

 
    

     



    
    {display.porArea&&
    <p className="titulo">
      {select.zona === "ba" ? "Buenos Aires" : "Ciudad de Buenos Aires"}</p>
    }




         
       {display.porArea&&<div className="porLocalidad">
          

         <DropDown
         categorias ={localidades}
         mensaje={select.mensaje}
         ></DropDown>




         <br />
      
         <button onClick={()=>btnTraer(select.zona)}>Consultar</button>
        {display.orden&&<button onClick={()=>ordenarNaftaSuper(estaciones)}>Ordenar por precio</button>}      
      
      </div> }

       
       <br />

        
      { display.porDir&&
       

       <div className="porDireccion">
 
         <p className="titulo">
         {select.zona === "ba" ? "Buenos Aires" : "Ciudad de Buenos Aires"}</p>
 
          
          <input
          name="calle"
          value={form.calle}
          onChange={handleChange}
          placeholder="Calle" 
          className="tex" 
          type="text"/>
          
         <input 
         name="altura"
         value={form.altura}
         onChange={handleChange}
         placeholder="Altura" 
         className="tex"
          type="text"/>
 
        {display.drop&& 
        <DropDown
          categorias ={localidades}
          mensaje={select.mensaje}
        ></DropDown>  
        }
       <button onClick={()=> clickDire()}>Buscar</button>

        

         {direcciones?.map((dir)=>
         <CardDireccion
           direccion={dir.nomenclatura}
           url ={dir.url} 
           urlOSM={dir.urlOSM}
           lat={dir.lat}
           lon={dir.lon}
           ordenarObjetoPorCercania={ordenarObjetoPorCercania}
           estaciones={data}
           >
          
          </CardDireccion>)}
 

          



 
        </div>

        
 
       }

      
       

       </div>

      
  
 

      <div className='contenedor'>
        
      
  

      

      {estaciones?.map((dep)=>                      //{data?.slice(0,32).map((dep)=>
        <Card
          key={dep.idempresabandera}
          dato1 = {dep.cuit}
          dato2 = {dep.direccion}
          dato3 = {dep.localidad}
          dato4={dep.empresa}
          url = {dep.url}
          urlOSM={dep.urlOSM}  
          nf={dep.NaftaSuper}
          np={dep.NaftaPremium}
          g2={dep.GasOil2}
          g3={dep.GasOil3}
          gas={dep.GNC}
          fecha={fecha(dep.fecha_vigencia)}
          band={dep.empresabandera}  
          
        
       >


       </Card>
       )}
       
       <footer> 2025 - Curiosibit - https://curiosibit.blogspot.com/</footer>
      </div>

     
 





     
    </>
  )
}

export default App
