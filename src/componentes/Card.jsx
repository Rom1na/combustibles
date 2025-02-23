import React from 'react'
import '../css/Card.css'

const Card = ({dato1,dato2,dato3,dato4,url,urlOSM,nf,np,g2,g3,gas,fecha,band}) => {


    return (
        <div>
        <div className='card' >
    
        <div className='content2'>
    
          
          <p className='titulo'> {band} - {dato4} </p>
         {/*  <p className='titulo'> {dato1} </p> */}
          <p className='titulo'> {dato2} </p>
          <p className='titulo'> {dato3} </p>
          <p className='texto1'> Nafta  super  &nbsp;   ${nf} </p>
          <p className='texto1'> Nafta  premium&nbsp;   ${np} </p>
          <p className='texto1'> Gasoil grado 2&nbsp;   ${g2} </p>
          <p className='texto1'> Gasoil grado 3&nbsp;   ${g3} </p>
          <p className='texto1'> Gas&nbsp; ${gas} </p>
          <p className='texto2'> Precios informados el {fecha} </p>
         
      
          
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
    
        </div>
        
        </div>
      </div>
      )
    
  
   





}

export default Card