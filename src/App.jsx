import { useEffect, useState } from "react"
import './App.css'
const App = () => {

  const [products,setProducts]=useState([]);
  const [pages,setPages]=useState(1);
  const[totalPages,setTotalPages]=useState(0);

  const getProducts=async()=>{

    const response=await fetch(`https://dummyjson.com/products?limit=10&skip=${pages*10-10}`);
    const data=await response.json();
    if(data && data.products)

      console.log(data)
      setProducts(data.products)
    setTotalPages(Math.round(data.total/10))
  }
useEffect(()=>{

  getProducts();

},[pages])



const pageHanlder=(selectedpage)=>{
  if(selectedpage>=1 && selectedpage<=totalPages && selectedpage !==pages)
  setPages(selectedpage)
}

  return (
    <div>

    <div className="heading">
      <h1>PAGINATION</h1>
    </div>
      {
        products.length >0 && <div className="products">
          {
            products.map((prod)=>{

              return(
                  <span key={prod.id} className="products__single">
                      <img src={prod.thumbnail} alt={prod.title}/>
                      <span>{prod.title}</span>
                  </span>
                
              )
            })
          }
        </div>
      }
      {
        products.length >0 && <div className="pagination">
          <span  onClick={()=>pageHanlder(pages-1)} className={pages>1 ? "":"pagination__disable"} >◀️
          </span>
         {
          [...Array(totalPages)].map((_,i)=>{
            return   <span className={pages===i+1  ? "pagination__selected":""} onClick={()=>pageHanlder(i+1)} key={i}>{i+1}</span>
          })
         }
        
          <span onClick={()=>pageHanlder(pages+1)} className={pages<totalPages ? "":"pagination__disable"}>▶️</span>
        </div>
      }
    </div>
  )
}

export default App