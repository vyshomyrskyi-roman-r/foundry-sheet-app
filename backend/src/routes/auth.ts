import { Router } from 'express';
import type { Request, Response } from 'express'; // Explicitly import types from 'express'
import { Op } from 'sequelize';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, authMiddleware } from '../middleware/auth';


const router: Router = Router();
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Registration failed
 */
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    console.log('User created:', user.toJSON());
    res.status(201).json({ message: 'User created', user: { username, email } });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: 'Registration failed', details: err });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usernameOrEmail
 *               - password
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
router.post('/login', async (req: Request, res: any) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.getDataValue('password'));
    if (!match) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    const token = jwt.sign({ id: user.getDataValue('id') }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
});



/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/profile',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const user = await User.findByPk(req.userId, {
      attributes: ['username', 'email'],
    });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // use getDataValue (or .get())
    const username = user.getDataValue('username');
    const email    = user.getDataValue('email');

    res.json({ username, email });
  }
);

export default router;
