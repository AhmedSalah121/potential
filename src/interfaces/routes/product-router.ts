import express from "express";
import { ProductController } from '../controllers/product-controller';

class ProductRouter {
  private readonly productController: ProductController;

  constructor(productController: ProductController) {
    this.productController = productController;
  }

  getRouter(): express.Router {
    const router = express.Router();

  router.get('/', this.productController.getProducts);
  
  // GET /products/filter
  router.get('/filter', this.productController.fetchProducts);
    return router;
  }
}

export default ProductRouter;
