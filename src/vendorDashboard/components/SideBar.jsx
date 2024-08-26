
import React from 'react'

const SideBar = ({showFirmHandler, showProductHandler, showAllProductsHandler, showFirmTitle}) => {
  return (
    <div className="sideBarSection">
        <ul>
            {showFirmTitle? <button onClick={showFirmHandler}>Add Firm</button> : ""}
            
            <button onClick={showProductHandler}>Add Product</button>
            <button onClick={showAllProductsHandler}>All Products</button>
            
        </ul>
    </div>
  )
}

export default SideBar















