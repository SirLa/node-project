import { Router } from "express";
import * as productController from '../controllers/product';
const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.get('/:id/reviews', productController.getProductsReviews);
router.post('/', productController.createNewProduct);

export default router;