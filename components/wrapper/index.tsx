import React, { useState } from 'react'
import classes from './Home.module.css'
import Hobbies from '../Hobbies'
import Users from '../Users'

const Wrapper = () => {
  const [selectedUser, setSelectedUser] = useState<any>()
  return (
    <section className={classes.root}>
      <h1 className={classes.heading}>
        User Hobbies
      </h1>

      <div className={classes.wrapper}>
        <Users
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <Hobbies
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
    </section>
  )
}

export default Wrapper
