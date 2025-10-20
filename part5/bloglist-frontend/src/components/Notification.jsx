import React from 'react'

const Notification = ({ message, isError }) => {
  const styles = !isError? {
    border: '3px solid green',
    paddingLeft: 5,
    backgroundColor: 'grey',
    color: 'green'
  } : {
    border: '3px solid red',
    paddingLeft: 5,
    backgroundColor: 'grey',
    color: 'red'
  }
  return (
    <div style={styles}>
      <p>{ message }</p>
    </div>
  )
}

export default Notification
