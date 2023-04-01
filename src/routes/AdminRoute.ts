import express, {Request, Response, NextFunction} from "express"
import {CreateVendor, GetVendorById, GetVendors } from '../controllers'

const router = express.Router() 


router.post('/createvendor', CreateVendor)
router.get('/getvendors', GetVendors)
router.get('/getvendor/:id', GetVendorById)

router.get('/', (req: Request, res: Response, next: NextFunction)=>{
    res.json('Hello Admin')
})

export {router as AdminRoute}