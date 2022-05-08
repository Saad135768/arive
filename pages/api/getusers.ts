import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/db'

const fetchUsers = async (_: NextApiRequest, res: NextApiResponse) => {
    const connect =  await dbConnect()
    const users = await connect.db("arive-task").collection("users").find({}).toArray()
    res.status(200).json({ success: true, users })
}

export default fetchUsers