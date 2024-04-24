'use client'

import { useEffect, useState } from "react";
import styles from '../styles/home.css'
// import Document from './document/page'

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [datas, setDatas] = useState([]);

  const fetchDatas = () => {
    fetch(`${baseUrl}`)
      .then((res) => res.json())
      .then(({ datas }) => {
        setDatas(datas);
      });
  };


  return (
    <>
      <div onClick={fetchDatas}>
        consultar
        </div>
      
      <div>
        {datas}
      </div>
    </>
  );
}


























// 'use client'

// import { useEffect, useState } from "react";


// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

// export default function Home() {

//   const [selectedProductId, setSelectedProductId] = useState()
//   const [datas, setDatas] = useState([])
//   console.log({setDatas})



  
//     const fetchDatas = () => {
//       fetch(`${baseUrl}/datas`)
//         .then((res) => res.json())
//         .then(({ datas }) => {
//           setDatas(datas)
//         })
//     }

//     useEffect(() => {
//       fetchDatas()
//     }, []);

//     console.log({ datas })

//   return (
//     <>
//       <div className="container df jcsb">
//         <div className="df fdc">
//         <h2 style={{ margin: "0.3rem"}}>
//                   <u>Crear nuevo producto</u>
//                 </h2>
//                   <form>
//                       <input 
//                         type="text"
//                         name="name"
//                         placeholder="ingrese algo"
//                         // className='onone'
//                         // value={product.name}
//                         // onChange={handleChange}
//                       />
//                   </form> 
//         </div>

//         <div className='products-container'>
//                 {datas.map(({ _id, megas}) =>(
//                   <div 
//                     onClick={() => setSelectedProductId(_id)}
//                     key={_id}
//                     className='shadow df aic jcsb p5 mb5 br5'
//                     style={{
//                       backgroundColor:
//                         selectedProductId === _id ? 'lightblue' : 'white',
//                         width: '100',

//                     }}
//                     >
//                     <span style={{color: "red", cursor: 'pointer'}}>{megas}</span>
//                     <div className=' df aic'>
//                       <div className=' df fdc mr5'>
//                         {/* <span style={{color: "red", cursor: 'pointer'}}>{eje}</span> */}
//                         {/* <span>Stock: {stock}</span> */}


//                       </div>
//                     <span
//                       style={{color: "red", cursor: 'pointer'}}
//                       onClick={() => {
//                         fetch(`${baseUrl}/datas/${_id}`, { method: 'DELETE' })
//                           .then((res) => res.json())
//                           .then((data) =>{
//                             console.log({ data })
//                           })
//                         }}
//                       >
//                       BORRAR</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//       </div>
//     </>
//   );
// }
