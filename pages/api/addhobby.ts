import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/db'
import * as Yup from 'yup'
import { ObjectID } from 'bson'

const addHobby = async (req: NextApiRequest, res: NextApiResponse) => {
    // const connect = await dbConnect()
    // const newUser = req?.body?.user
    // if(!newUser?.trim()) throw new Error() 
    // const users = await connect.db("arive-task").collection("users").insertOne({ _id: new ObjectID(), user: newUser, hobbies: [] })
    // res.status(200).json({ success: true, users })
}

export default addHobby