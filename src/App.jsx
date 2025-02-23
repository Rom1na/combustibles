import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './componentes/Card'
import './css/Card.css'
import DropDown from './componentes/DropDown'
import { localidads,Barrios } from './data/datos'


function App() {

  const [ select,setSelect]=useState({
     zona :"",
     mensaje:"",
     display : false,
     });

  
  const [data,setData]=useState();
  const [mensaje,setMensaje]=useState();
  const [estaciones,setEstaciones] = useState();
  const [localidades,setLocalidades] = useState();
  const caba = import.meta.env.VITE_CABA
  const ba = import.meta.env.VITE_BA













const nombresBarrios = Barrios.map(barrioObj => barrioObj.barrio);



function getLocalidades(){

  lecturaCsv(ba,1)
  


}









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
    console.log("Punto de referencia:", lt, ln);
    console.log("Datos recibidos:", objetoDatos);
    console.log("Estructura del objetoDatos:", JSON.stringify(objetoDatos, null, 2));


    const datOrdenado = objetoDatos.map(d => {
        const ConLat = parseFloat(d.latitud.replace(",", "."));
        const ConLon = parseFloat(d.longitud.replace(",", "."));
        // Debugging de cada punto
        console.log(`Comparando con ${d.barrio}:`, ConLat, ConLon);

        const rlon = ln - ConLon;
        const rlan = lt - ConLat;
        const rlon2 = rlon * rlon;
        const rlan2 = rlan * rlan;
        const total = rlon2 + rlan2;
        const resultado = Math.sqrt(total);
        d.orden = resultado;

        console.log(`Distancia a ${d.barrio}: ${resultado}`);

        return d;
    });

    datOrdenado.sort((o1, o2) => o1.orden - o2.orden);

    console.log('Objeto ordenado:', datOrdenado);

    setEstaciones(datOrdenado.slice(0, 16));
}
















  function ordenarNaftaSuper(estaciones) {
    const estacionesOrdenadas = [...estaciones].sort((a, b) => 
      a.NaftaSuper.localeCompare(b.NaftaSuper)
    );
  
    console.log('!2', estacionesOrdenadas);
    setEstaciones(estacionesOrdenadas);
  }


  function btnTraer (zona){


    console.log(zona)
    
    if(zona === 'ba'){
     
      filtrar(document.getElementById('sele').value)

    }


    if(zona === 'caba'){

      
       filtrar(document.getElementById('sele').value)

    }





  }


  function onClickZona (zona){
  
   

    if (zona ==='caba'){

      lecturaCsv(caba)
      setLocalidades(nombresBarrios);    
      
      setSelect ({
        zona : 'caba',
        mensaje: "Selecciona un barrio",
        display :true
      })
    }
       
    if (zona ==='ba'){
     
      lecturaCsv(ba)
      const loc = [...new Set(data?.map(est => est.localidad))].sort((a, b) => a.localeCompare(b));
      console.log(loc)
      setLocalidades(localidads);    
      
      setSelect ({
        zona: 'ba', 
        mensaje: "Selecciona una localidad",
        display :true
      })

    }

   //console.log('p',data,localidades)
   

  }





  

  return (
    <>


<header>
    <p className="tituloppal">Estaciones de Servicio</p>
    
    <nav>
        <ul>
            
               {/*  <li><div className="dropdown"><p>Catálogo</p>
                    <div className="contenido"> 
                        <a href="mujeres.html">Indumentaria Femenina</a>
                        <a href="hombres.html">Indumentaria Masculina</a>
                        <a href="electronics.html">Tecnologia</a>
                        <a href="joyeria.html">Joyería</a>
                       
                    </div> 
    
                    
    
                    </div></li>     */}
           
               <li><div className="dropdown"><p>Elegí una zona</p>
                <div className="contenido">
                    <p onClick={()=>onClickZona('caba')}>CABA</p>
                    <p onClick={()=>onClickZona('ba')}>Buenos Aires</p>
                   
                </div> 

                

                </div></li>
           </ul>     
           
    </nav>
        
 </header>




<div className="contenedor2">



    <div className="botones">
     {!select.display&&<p className="parrafo">En este sitio podrás encontrar la ubicación de las estaciones de servicio de la Ciudad de Buenos Aires y la Provincia de Buenos Aires con los precios de los diferentes combustibles ofrecidos.La información es proporcionada por el programa de datos abiertos de la República Argentina. Esto aún es un  proyecto en desarrollo, agradecemos su compresión!</p>}
      
    {/* <button onClick={()=>onClickZona('caba')}>CABA</button>
    <button onClick={()=>onClickZona('ba')}>Buenos Aires</button>
   */}
    </div> 
    
    {select.display&&
    <p className="titulo">
      {select.zona === "ba" ? "Elegiste Buenos Aires" : "Elegiste Ciudad de Buenos Aires"}</p>
    }




      { select.display&&
       <div className="porLocalidad">
         


       <DropDown
         categorias ={localidades}
         mensaje={select.mensaje}
       ></DropDown>
       
       <br />

     
       <button onClick={()=>btnTraer(select.zona)}>Consultar</button>
       <button onClick={()=>ordenarNaftaSuper(estaciones)}>Ordenar por precio</button>

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
       
       <footer> 2024 - Curiosibit</footer>
      </div>

     
 





     
    </>
  )
}

export default App
