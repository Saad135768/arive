import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/db'
import * as Yup from 'yup'
import { ObjectID } from 'bson'

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const connect = await dbConnect()
    const newUser = req?.body
    if(!newUser) return res.status(401).json({ success: false })
    await connect.db("arive-task").collection("users").insertOne({ _id: new ObjectID(), user: newUser, hobbies: [] })
    res.status(200).json({ success: true })
}

export default addUser