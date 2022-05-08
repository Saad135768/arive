import React, { useState, useId, useEffect, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewHobby, removeHobby } from '../../features/user/userSlice'
import { IUser } from '../../interface'
import classes from './Hobbies.module.css'

const Hobbies: FC<{ setSelectedUser: (value?: IUser) => void, selectedUser: IUser }> = ({ setSelectedUser, selectedUser }) => {

  const id = useId()
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state?.user?.value)
  const [valueOfNewPassionInput, setValueOfNewPassionInput] = useState<string>('')
  const [valueOfNewHobbyInput, setValueOfNewHobbyInput] = useState<string>('')
  const [valueOfNewYearInput, setValueOfNewYearInput] = useState<string>('')

  const checkIfUserIsSelected = Object.values(selectedUser || {})

  const handleAddHobby = () => {
    if (!valueOfNewPassionInput?.trim()?.length) return alert('Please Enter a passion value')
    if (!valueOfNewHobbyInput?.trim()?.length) return alert('Please Enter a hobby name')
    if (!valueOfNewYearInput?.trim()?.length) return alert('Please Enter a year for the hobby')
    dispatch(addNewHobby({ selectedUserId: selectedUser?.id, newHobby: { passion: valueOfNewPassionInput, hobby: valueOfNewHobbyInput, year: valueOfNewYearInput, id } }))
    setValueOfNewPassionInput('')
    setValueOfNewHobbyInput('')
    setValueOfNewYearInput('')
  }

  const handleDeleteHobby = (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this hobby?')
    if(!confirm) return null
    dispatch(removeHobby({ selectedUserId: selectedUser?.id, hobbyId: id }))
  }

  useEffect(() => {
    setSelectedUser(data.find(({ id }) => id === selectedUser?.id))
  }, [data])

  return (
    <div className={classes.container}>

      {!checkIfUserIsSelected?.length && <div className={classes.overlay}></div>}

      <div className={classes.div_inputs_container}>

        <input
          placeholder='Create Passion'
          className={classes.input}
          onChange={(e) => setValueOfNewPassionInput(e.target.value)}
          value={valueOfNewPassionInput}
        />
        <hr className={classes.hr} />
        <input
          placeholder='Create Hobby'
          className={classes.input}
          onChange={(e) => setValueOfNewHobbyInput(e.target.value)}
          value={valueOfNewHobbyInput}
        />
        <hr className={classes.hr} />
        <input
          placeholder='Create Year'
          className={classes.input}
          onChange={(e) => setValueOfNewYearInput(e.target.value)}
          value={valueOfNewYearInput}
        />
        <hr className={classes.hr} />

        <button className={classes.add_btn} onClick={handleAddHobby}>
          Add
        </button>
      </div>

      <ul className={classes.ul}>

        {!!selectedUser &&
          selectedUser?.hobbies?.map(({ id, passion, hobby, year }: any) => (
            <li key={id} className={classes.li}>
              <span>Passion: {passion}</span>

              <span>{hobby}</span>

              <span>
                since year {year}
              </span>
                <button
                  className={classes.delete_btn}
                  onClick={() => handleDeleteHobby(id)}
                >
                  X
                </button>
            </li>
          ))}

          {/* Msg for No Hobbies */}
        {selectedUser && !selectedUser?.hobbies?.length && (
          <li className={classes.li_no_hobbies}>
            No hobbies found for this user
          </li>
        )}
      </ul>
    </div>
  )
}

export default Hobbies