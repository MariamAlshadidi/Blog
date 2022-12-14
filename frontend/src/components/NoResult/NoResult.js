import React from 'react'
import './NoResult.css'
export default function (props) {
  return (
    <div className='notFound'>
        <h1 className='msg'>No results found for <b>{props.categories}</b> </h1>
    </div>
  )
}
