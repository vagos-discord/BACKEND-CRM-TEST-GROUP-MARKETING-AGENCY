// src/routes/auth.routes.ts
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const router = Router();

// Rutas Públicas
router.post('/register', register);
router.post('/login', login);

// Ruta Privada de prueba para verificar autenticación
router.get('/me', authenticate, (req, res) => {
  res.json({
    status: 'success',
    user: req.user,
  });
});

export default router;