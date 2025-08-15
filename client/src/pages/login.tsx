import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { AnimatedCard, AnimatedText } from "@/components/ui/animated-card";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const { login, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  // إعادة توجيه تلقائية للداشبورد عند نجاح المصادقة
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Import authentication function
    const { authenticateUser } = await import("@/data/users");
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Authenticate user with real data
      const authenticatedUser = authenticateUser(formData.email, formData.password);
      
      if (!authenticatedUser) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
        return;
      }
      
      // Convert to AuthContext format
      const userData = {
        id: authenticatedUser.id,
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        phone: authenticatedUser.phone,
        role: authenticatedUser.role,
        token: `jwt-token-${authenticatedUser.id}-${Date.now()}` // رمز وهمي مع معرف المستخدم
      };
      
      // Use AuthContext to log in user
      login(userData);
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `أهلاً وسهلاً ${userData.name}`,
      });
      
      // لا حاجة لاستدعاء setLocation هنا - سيتم التوجيه تلقائياً عبر useEffect
    }, 1500);
  };

  const handleGoogleLogin = () => {
    console.log("Google OAuth login");
    
    // Mock Google login
    const userData = {
      id: "google123",
      name: "مستخدم Google",
      email: "user@gmail.com",
      token: "mock-jwt-token-google" // رمز وهمي - سيتم استبداله برمز JWT حقيقي من Google OAuth
    };
    
    login(userData);
    
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: `أهلاً وسهلاً ${userData.name}`,
    });
    
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gsc-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AnimatedText className="text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 bg-gradient-gsc rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">GSC</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">تسجيل الدخول</h2>
              <p className="text-gray-600">أهلاً بك في منصة GSC</p>
            </div>
          </div>
        </AnimatedText>

        <AnimatedCard delay={0.2}>
          <CardHeader>
            <CardTitle className="text-center">دخول إلى حسابك</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                    تذكرني
                  </label>
                </div>
                <Link href="/forgot-password">
                  <span className="text-sm text-primary hover:text-primary-dark cursor-pointer">
                    نسيت كلمة المرور؟
                  </span>
                </Link>
              </div>

              <InteractiveButton
                type="submit"
                className="w-full gradient-gsc text-white py-3"
                disabled={isLoading}
                icon={isLoading ? undefined : <LogIn size={20} />}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري تسجيل الدخول...
                  </div>
                ) : (
                  "تسجيل الدخول"
                )}
              </InteractiveButton>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">أو</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full py-3 border-gray-300 hover:bg-gray-50"
                  onClick={handleGoogleLogin}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    تسجيل الدخول بحساب Google
                  </div>
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">
                ليس لديك حساب؟{" "}
                <Link href="/register">
                  <span className="text-primary hover:text-primary-dark font-medium cursor-pointer">
                    إنشاء حساب جديد
                  </span>
                </Link>
              </span>
            </div>
          </CardContent>
        </AnimatedCard>

        <div className="text-center">
          <Link href="/">
            <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
              العودة للصفحة الرئيسية
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}