import { Router } from 'express';
import { AuthService } from '../services/authService';
import { requireAuth, AuthenticatedRequest } from '../middleware/requireAuth';
import { MagicLinkRequest, MagicLinkVerification, TotpVerification } from '../../shared/types/auth';

const router = Router();
const authService = new AuthService();

// POST /api/auth/login-magic
router.post('/login-magic', async (req, res) => {
  try {
    const { email, redirectUrl } = req.body as MagicLinkRequest;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    await authService.sendMagicLink(email, redirectUrl);
    
    res.json({ 
      message: 'Magic link sent to your email',
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2') // Partially hide email
    });
  } catch (error) {
    console.error('Magic link error:', error);
    res.status(500).json({ message: 'Failed to send magic link' });
  }
});

// POST /api/auth/login-magic/verify
router.post('/login-magic/verify', async (req, res) => {
  try {
    const { token } = req.body as MagicLinkVerification;
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    const loginResponse = await authService.verifyMagicLink(token);
    
    res.json(loginResponse);
  } catch (error) {
    console.error('Magic link verification error:', error);
    res.status(400).json({ message: 'Invalid or expired magic link' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Check if trial has expired and update user accordingly
    if (authService.isTrialExpired(req.user)) {
      const updatedUser = await authService.updateUser(req.user.id, {
        subscription: {
          ...req.user.subscription!,
          plan: 'free',
          status: 'canceled',
        }
      });
      return res.json({ user: updatedUser });
    }

    res.json({ user: req.user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to get user information' });
  }
});

// POST /api/auth/totp/setup
router.post('/totp/setup', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const totpSetup = await authService.setupTotp(req.user.id);
    
    res.json(totpSetup);
  } catch (error) {
    console.error('TOTP setup error:', error);
    res.status(500).json({ message: 'Failed to setup TOTP' });
  }
});

// POST /api/auth/totp/verify
router.post('/totp/verify', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { code } = req.body as TotpVerification;
    
    if (!code) {
      return res.status(400).json({ message: 'TOTP code is required' });
    }

    const verified = await authService.verifyTotp(req.user.id, code);
    
    if (verified) {
      res.json({ message: 'TOTP verified successfully', verified: true });
    } else {
      res.status(400).json({ message: 'Invalid TOTP code', verified: false });
    }
  } catch (error) {
    console.error('TOTP verification error:', error);
    res.status(500).json({ message: 'Failed to verify TOTP' });
  }
});

// POST /api/auth/logout
router.post('/logout', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    // In a real app, you might want to blacklist the JWT token
    // For now, we'll just return success since JWTs are stateless
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Failed to logout' });
  }
});

export default router;