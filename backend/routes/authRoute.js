import express from 'express'
import {
    registerController,
    loginController,
    updateProfileController,
    getAllOrdersController,
    getOrdersController,
    orderStatusController,
    getAllUserController,
    getUserController,
    forgotPasswordController
} from '../controllers/authController.js';

import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';



//router object
const router = express.Router();



//register
router.post("/register", registerController)

//login
router.post("/login", loginController);
//forgotpassword
router.post("/forgot-password", forgotPasswordController);





//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});



//update profile
router.put('/profile', requireSignIn, updateProfileController);
//orders
router.get('/orders', requireSignIn, getOrdersController);


//admin routes

//allorders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

//order Stauts update

router.put("/order-staus/:orderId", requireSignIn, isAdmin, orderStatusController);

//allusers
router.get('/all-users', requireSignIn, isAdmin, getAllUserController)
//get single user
router.get('/user/:userEmail',requireSignIn,isAdmin,getUserController);



export default router;