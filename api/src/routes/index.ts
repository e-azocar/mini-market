import { Router } from 'express'
import productsRoutes from './product'

const router = Router()

router.use('/product', productsRoutes)

export default router
