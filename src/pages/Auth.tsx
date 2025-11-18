import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import duckLogo from '@/assets/duck-logo.png';

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate('/admin');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Logged in successfully',
        });
        navigate('/admin');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Account created successfully',
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Authentication failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 noise-overlay">
      <Card className="w-full max-w-md collage-shadow rotate-chaos-1">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={duckLogo} 
              alt="onebyone studio" 
              className="w-24 h-24 animate-float"
            />
          </div>
          <CardTitle className="text-3xl font-bold">onebyone studio</CardTitle>
          <CardDescription className="font-mono">
            {isLogin ? 'Admin Login' : 'Create Admin Account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-accent transition-colors font-mono"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Back to Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
