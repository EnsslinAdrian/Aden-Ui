import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
  // ✅ INDEXIEREN (Wichtige Einstiegspunkte)
  {
    path: 'login',
    loadComponent: () => import('../auth/login/login').then(m => m.Login),
    data: {
      title: 'Login - Aden UI Library',
      description: 'Log in to access your saved components, settings, and premium content.',
      breadcrumb: 'Login'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('../auth/register/register').then(m => m.Register),
    data: {
      title: 'Register - Create Account',
      description: 'Join the Aden UI Library community. Create a free account and start your project.',
      breadcrumb: 'Register'
    }
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('../auth/forgot-password/forgot-password').then(m => m.ForgotPassword),
    data: {
      title: 'Forgot Password?',
      description: 'No problem. Enter your email address, and we will send you a reset link.',
      breadcrumb: 'Recovery'
    }
  },

  // ⛔ NOINDEX (Technische Prozess-Schritte)

  // Reset Password mit Token: Ohne gültigen Token nutzlos -> Weg damit.
  {
    path: 'reset-password/:token',
    loadComponent: () => import('../auth/new-password/new-password').then(m => m.NewPassword),
    data: {
      title: 'Set New Password',
      description: 'Create a new, secure password for your account.',
      breadcrumb: 'New Password',
      robots: 'noindex, nofollow' // ⛔
    }
  },
  // Reset Password ohne Token: Wahrscheinlich ein Fehlerzustand -> Weg damit.
  {
    path: 'reset-password',
    loadComponent: () => import('../auth/new-password/new-password').then(m => m.NewPassword),
    data: {
      title: 'Set New Password',
      description: 'Create a new, secure password for your account.',
      breadcrumb: 'New Password',
      robots: 'noindex, nofollow' // ⛔
    }
  },

  // Verifizierung: Ein rein technischer Schritt -> Weg damit.
  {
    path: 'verify-email',
    loadComponent: () => import('../auth/verify-email/verify-email').then(m => m.VerifyEmail),
    data: {
      title: 'Email Verification',
      description: 'We are currently verifying your confirmation link. Please wait a moment.',
      breadcrumb: 'Verify',
      robots: 'noindex, nofollow' // ⛔
    }
  },
  // Success Page: Nur für User, die gerade fertig sind. Für Google uninteressant.
  {
    path: 'register-success',
    loadComponent: () => import('../auth/register-success/register-success').then(m => m.RegisterSuccess),
    data: {
      title: 'Welcome Aboard! 🎉',
      description: 'Your registration was successful. You can now log in and get started.',
      breadcrumb: 'Success',
      robots: 'noindex, nofollow' // ⛔
    }
  },
];
