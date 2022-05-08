import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/db'
import * as Yup from 'yup'
import { ObjectID } from 'bson'

const deleteHobby = async (req: NextApiRequest, res: NextApiResponse) => {
    const connect = await dbConnect()
    const _id = req?.body
    if(!_id) return res.status(401).json({ success: false, MSG: 'An Id must be provided' })
    await connect.db("arive-task").collection("users").deleteOne({ _id })
    res.status(200).json({ success: true })
}

export default deleteHobby