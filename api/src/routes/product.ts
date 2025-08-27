import { Router } from 'express'
import {
  getProductById,
  getProducts,
  getTopCheapestAvailableProducts,
} from '../controllers/product'

const router = Router()

router.get('/', getProducts)
router.get('/cheapest', getTopCheapestAvailableProducts)
router.get('/:id', getProductById)

export default router
