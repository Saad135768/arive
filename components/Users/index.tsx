import React, { useState, FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewUser } from '../../features/user/userSlice'
import { IUser } from '../../interface'
import classes from './Users.module.css'
import axios from 'axios'
import { getUsers } from './../../features/user/userSlice'

const Users: FC<{
  setSelectedUser: (value?: IUser) => void
  selectedUser: IUser
}> = ({ selectedUser, setSelectedUser }) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state?.user?.value)
useEffect(() => {
  dispatch(getUsers())
}, [])
  const [valueOfNewUserInput, setValueOfNewUserInput] = useState<string>('')

  const handleAddUser = async () => {
    
    if (!valueOfNewUserInput?.trim()?.length) return null
    dispatch(addNewUser(valueOfNewUserInput))
    setValueOfNewUserInput('')
  }
  return (
    <div className={classes.container}>
      <div className={classes.div_inputs_container}>
        <input
          placeholder="Create user name"
          className={classes.input}
          onChange={e => setValueOfNewUserInput(e.target.value)}
          value={valueOfNewUserInput}
        />

        <hr className={classes.hr} />
        <button className={classes.add_btn} onClick={handleAddUser}>
          Add
        </button>
      </div>

      <ul className={classes.ul}>
        {!!data?.length &&
          data?.map((d: any) => (
            <li
              key={d.id}
              className={`${classes.li} ${ selectedUser?.user === d?.user && 'active' }`}
              onClick={() => setSelectedUser(d)}
            >
              {d?.user}
            </li>
          ))}

        {!data?.length && (
          <li className={classes.li_no_users}>No Users found</li>
        )}
      </ul>
    </div>
  )
}

export default Users
