import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Mail, CheckCircle } from 'lucide-react';

export function LoginMagic() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      await login(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send magic link');
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-xl">تم إرسال الرابط السحري</CardTitle>
          <CardDescription>
            تم إرسال رابط تسجيل الدخول إلى بريدك الإلكتروني
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              تحقق من بريدك الإلكتروني وانقر على الرابط لتسجيل الدخول. الرابط صالح لمدة 15 دقيقة.
            </AlertDescription>
          </Alert>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => { setSent(false); setEmail(''); }}
            data-testid="button-back-to-login"
          >
            العودة إلى تسجيل الدخول
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
        <CardDescription>
          أدخل بريدك الإلكتروني وسنرسل لك رابطاً سحرياً للدخول
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              data-testid="input-email"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !email}
            data-testid="button-send-magic-link"
          >
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            إرسال الرابط السحري
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            بالمتابعة، أنت توافق على{' '}
            <a href="/terms" className="underline hover:text-primary">
              شروط الخدمة
            </a>{' '}
            و{' '}
            <a href="/privacy" className="underline hover:text-primary">
              سياسة الخصوصية
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}