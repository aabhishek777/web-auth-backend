

import {Router} from "express";
import {registerChallangeOfUser, registerUser} from "../controllers/user.js";

const router = Router();



router.post('/register',registerUser)

router.post('/register-challange', registerChallangeOfUser)



export default router;
