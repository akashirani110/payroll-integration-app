import express from 'express';
const router = express.Router();

import userRouter from './user'
import employeeRouter from './employee'
import organisationRouter from './organisation'

router.use('/user', userRouter);
router.use('/employee', employeeRouter);
router.use('/organisation', organisationRouter)

export default router;