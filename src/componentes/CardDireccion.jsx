import React from 'react'
import '../css/CardDireccion.css'

const Card = ({direccion,url,urlOSM,lat,lon,ordenarObjetoPorCercania,estaciones}) => {


    return (
        <div>
        <div className='card' >
    
        <div className='content2Dir'>
    
          
          <p className='titulo'> {direccion} </p>
         
          
          
          <iframe 
           src={urlOSM}
           style={{
           width:'90%',
           height:'200px',
           frameBorder:"0",
           scrolling:"no",
           marginHeight:"0",
           marginWidth:"0" ,
           border: '1px solid black'}}>
         </iframe>
        <br />
        <br />
        <br />
        
    <div>
    
    
        <a style={{
            margin:'20px'}}
        href={url} target="_blank" className="card-link">Abrir en GoogleMaps</a>
        
        
    
     </div>
     
     <button className='BtnCard' onClick={()=>ordenarObjetoPorCercania(estaciones,lat,lon)}>Elegir esta Dirección</button>
        </div>
        
        </div>
      </div>
      )
    
  
   





}

export default Card