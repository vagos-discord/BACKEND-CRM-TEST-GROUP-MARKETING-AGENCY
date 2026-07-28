import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'El nombre, correo electrónico y la contraseña son obligatorios.',
      });
    }

    const userCheck = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'El correo electrónico ya está en uso.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const assignedRol = rol || 'vendedor';

    const newUser = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, nombre, email, rol, creado_en`,
      [nombre, email, passwordHash, assignedRol]
    );

    return res.status(201).json({
      status: 'success',
      data: {
        user: newUser.rows[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Correo y contraseña requeridos.',
      });
    }

    const result = await pool.query(
      `SELECT id, nombre, email, password, rol 
       FROM usuarios 
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas.',
      });
    }

    const user = result.rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas.',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.rol,
      },
      process.env.JWT_SECRET || 'secret_key_por_defecto',
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role: user.rol,
      },
    });
  } catch (error) {
    next(error);
  }
};