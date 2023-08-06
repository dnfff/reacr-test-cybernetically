import React from 'react'
import "./Pagination.css"

function Pagination({pageQty, totalInfo, paginate}) {

  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(totalInfo / pageQty); i++){
    pageNumbers.push(i)
  }
  
  return (
    <div className='pagination'>
        {
            pageNumbers.map(number => (
                <div className='pagination__item' key={number}>
                    <a href='!#' onClick={() => paginate(number)}>
                        {number}
                    </a>
                </div>
            ))
        }
    </div>
  )
}

export default Pagination