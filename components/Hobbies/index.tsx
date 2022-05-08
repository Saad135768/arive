import React, { useState, useEffect, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { addNewHobby, removeHobby } from '../../redux/features/user/userSlice'
import { IHobby, IUser, Passion } from '../../interface'
import classes from './Hobbies.module.css'
import { pathOr } from 'ramda'

const Hobbies: FC<{ setSelectedUser: (value?: IUser) => void, selectedUser: IUser }> = ({ setSelectedUser, selectedUser }) => {

  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => pathOr([], ['user', 'value'], state))
  const loading = useAppSelector((state) => pathOr(false, ['user', 'loading'], state))

  const [valueOfNewPassionInput, setValueOfNewPassionInput] = useState<Passion | '' | undefined>('')
  const [valueOfNewHobbyInput, setValueOfNewHobbyInput] = useState<string>('')
  const [valueOfNewYearInput, setValueOfNewYearInput] = useState<string>('')

  const checkIfUserIsSelected = Object.values(selectedUser || {})

  const validateOnPassionValue = () : boolean => (
    (valueOfNewPassionInput?.toLowerCase() !== Passion.LOW && valueOfNewPassionInput?.toLowerCase() !== Passion.MEDIUM && valueOfNewPassionInput?.toLowerCase() !== Passion.HIGH &&valueOfNewPassionInput?.toLowerCase() !== Passion.VERY_HIGH) 
  )

  const handleAddHobby = () => {
    if (!valueOfNewPassionInput?.trim()?.length) return alert('Please Enter a passion value')
    if (!valueOfNewHobbyInput?.trim()?.length) return alert('Please Enter a hobby name')
    if (!valueOfNewYearInput?.trim()?.length) return alert('Please Enter a year for the hobby')
    if(validateOnPassionValue()) return alert('Invalid Passion Value! Please select either "low" - "medium" - "high" - "very-high"')

    dispatch(addNewHobby({ userId: selectedUser?._id, hobby: { passion: valueOfNewPassionInput, hobby: valueOfNewHobbyInput, year: valueOfNewYearInput } }))
    setValueOfNewPassionInput('')
    setValueOfNewHobbyInput('')
    setValueOfNewYearInput('')
  }

  const handleDeleteHobby = (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this hobby?')
    if(!confirm) return null
    dispatch(removeHobby({ selectedUserId: selectedUser?._id, hobbyId: id }))
  }

  useEffect(() => {
    setSelectedUser(data?.find(({ _id }: IUser) => _id?.toString() === selectedUser?._id?.toString()))
  }, [data])

  return (
    <div className={classes.container}>

      {!checkIfUserIsSelected?.length && <div className={classes.overlay}></div>}

      <div className={classes.div_inputs_container}>

        <input
          placeholder='Create Passion'
          className={classes.input}
          onChange={(e: any) => setValueOfNewPassionInput(e.target.value)}
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

        {!loading &&
          pathOr([], ['hobbies'], selectedUser).map(({ _id, passion, hobby, year }: IHobby) => (
            <li key={_id} className={classes.li}>
              <span>Passion: {passion}</span>

              <span>{hobby}</span>

              <span>
                since year {year}
              </span>
                <button
                  className={classes.delete_btn}
                  onClick={() => handleDeleteHobby(_id)}
                >
                  &#128465;
                </button>
            </li>
          ))}

          {/* Msg for No Hobbies */}
        {(selectedUser && !selectedUser?.hobbies?.length && !loading) && (
          <li className={classes.li_no_hobbies}>
            No hobbies found for this user
          </li>
        )}

      {loading && <li className={classes.li_no_hobbies}>Loading...</li>}
      </ul>
    </div>
  )
}

export default Hobbies