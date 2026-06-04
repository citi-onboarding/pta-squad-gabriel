import { Router } from 'express';
import dashboardController from '../controllers/DashboardController';


const router = Router();

router.get('/', dashboardController.get);

export default router;