import express from 'express';
const router = express.Router();





import {
    product_all,
    product_create,
    product_details,
    product_update,
    product_delete,
    product_delete_all,
} from '../Controller/productController.js';

router.get('/', product_all);
router.get('/:id', product_details);


router.post('/', product_create);

router.put('/:id', product_update);

router.delete('/:id', product_delete);

router.delete('/all/delete', product_delete_all);

export default router;
