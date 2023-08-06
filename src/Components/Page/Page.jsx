import React, { useEffect, useState } from 'react'
import "./Page.css"
import axios from 'axios';
import Table from '../Page/Table/Table.jsx';
import Pagination from '../Page/Pagination/Pagination.jsx';
import Load from './Table/Load';


const TOKEN = "pk_23ef671a506c42ed8e52ab7a5ec2884c" //Enter your token
const API = `https://cloud.iexapis.com/stable/tops?token=${TOKEN}`

function Page() {
  const [state, setState] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageQty] = useState(10)

 useEffect(() => {
  setLoading(true)
  axios 
    .get(API)
    .then((e) => {
        setState(e.data)
        setLoading(false)
    })
    .catch((err) => {
        console.error(err);
    })
 }, [])

  const lastIndex = page * pageQty
  const firstIndex = lastIndex - pageQty
  const currentPage = state.slice(firstIndex, lastIndex)

  const paginate = (pageNumber) => {
     setPage(pageNumber)
  }
  const nextPage = () => {
     setPage(prev => prev + 1)
  }
  const prevPage = () => {
     setPage(prev => prev - 1)
  }

  if (page < 1) {
    return setPage(prev => prev + 1)
  }

  return (
    <div className='page'>
        <Table 
          state={currentPage} 
          state2={currentPage} 
          loading={loading} 
          prevPage={prevPage}
          nextPage={nextPage}
          page={page}
        />
        {/* <Pagination 
          pageQty={pageQty} 
          totalInfo={state.length} 
          paginate={paginate}
        /> */}
    </div>
  )
}

export default Page