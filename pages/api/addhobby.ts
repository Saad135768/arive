import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/db'
import * as Yup from 'yup'
import { ObjectID } from 'bson'

const addHobby = async (req: NextApiRequest, res: NextApiResponse) => {
    const connect = await dbConnect()
    const { hobby, userId } = req?.body

    const newHobby = { _id: new ObjectID(), ...hobby } 
    await connect.db("arive-task").collection("users").updateOne({ _id: new ObjectID(userId) }, { $push: { hobbies: newHobby } })

    res.status(200).json({ success: true, newHobby })
}

export default addHobby