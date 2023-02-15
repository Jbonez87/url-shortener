import { Router } from 'express'
import { shortUrl } from './shorturl';

const router = Router();

router.post('/shorturl', shortUrl);

export default router;
