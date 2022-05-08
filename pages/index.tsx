import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import classes from './Home.module.css'
import Hobbies from '../components/Hobbies'
import Users from '../components/Users'

const Home: NextPage = () => {
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

export default Home
