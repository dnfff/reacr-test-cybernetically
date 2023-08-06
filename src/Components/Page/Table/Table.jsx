import React, { useEffect, useState } from 'react'
import "../Page.css"
import Load from "./Load.jsx"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';



function Table({state, loading, prevPage, nextPage, page}) {
  let stat = state; 

  if(loading) {
    return <Load />
  }

  function makeid(length) {
    for(let i = 0; i < state.length; i++){
        var result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        state[i].id = result
    }
    return state;
  }

  makeid(5);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const arr = Array.from(stat);
    const b = result.source.index;
    const c = result.destination.index

    function arraymove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
    arraymove(arr, b, c)

    stat = arr;
  }
 
  return (
    <div className="table">
        <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className='tableButtons'>
                    <Droppable droppableId="characters">
                    {(provided) => (
                        <table {...provided.droppableProps} ref={provided.innerRef}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Symbol</th>
                                    <th>Sector</th>
                                    <th>SecurityType</th>
                                </tr>
                                {stat.map((val, key) => {
                                    return (
                                        <Draggable key={val.id} draggableId={val.id} index={key}>
                                        {(provided) => (
                                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <td>{key + 1}</td>
                                                <td>{val.symbol}</td>
                                                <td>{val.sector}</td>
                                                <td>{val.securityType}</td>
                                            </tr>
                                        )}
                                        </Draggable>
                                    )}
                                )}
                                {provided.placeholder}
                            </thead>
                        </table>
                    )}
                    </Droppable>
                        <div className='currentPage'>
                            <p>Page: {page}</p>
                        </div>
                        <div className='btn__page'>
                            <button className="nextPrev" onClick={prevPage}>Prev</button>
                            <button className="nextPrev" onClick={nextPage}>Next</button>
                        </div>
                    </div>
        </DragDropContext>
        <div id="overlay"></div>
    </div>
  )
}

export default Table