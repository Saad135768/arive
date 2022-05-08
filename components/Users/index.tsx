import React, { useState, FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { addNewUser } from '../../redux/features/user/userSlice'
import { IUser } from '../../interface'
import classes from './Users.module.css'
import { getUsers } from './../../redux/features/user/userSlice'
import { pathOr } from 'ramda'

const Users: FC<{
  setSelectedUser: (value?: IUser) => void
  selectedUser: IUser
}> = ({ selectedUser, setSelectedUser }) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => pathOr([], ['user', 'value'], state))
  const loading = useAppSelector((state) => pathOr(false, ['user', 'loading'], state))

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
          data?.map(({ _id, user, ...u }: IUser) => (
            <li
              key={_id}
              className={`${classes.li} ${ selectedUser?.user === user && 'active' }`}
              onClick={() => setSelectedUser({ _id, user, ...u })}
            >
              {user}
            </li>
          ))}

        {(!data?.length && !loading) && (
          <li className={classes.li_no_users}>No Users found</li>
        )}

        {loading && <li className={classes.li_no_users}>Loading...</li>}
      </ul>
    </div>
  )
}

export default Users
