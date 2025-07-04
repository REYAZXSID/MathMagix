
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { useUser } from '@/contexts/user-context';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.712,34.464,44,28.756,44,20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useUser();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If we're not loading and the user exists, redirect to dashboard.
    if (!loading && user) {
      router.push('/app');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    // Prevent multiple sign-in attempts
    if (isSigningIn) return;
    
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      // On success, the `onAuthStateChanged` listener in the UserContext will update the user state,
      // and the useEffect hook in this component will handle the redirection.
      // We leave `isSigningIn` as true to keep the button in a loading state until redirection occurs.
    } catch (error: any) {
      // This will catch errors, including when the user closes the popup.
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        if (error.code === 'auth/unauthorized-domain') {
          console.error(
            'Firebase Auth Error: This domain is not authorized for OAuth operations. ' +
            "Please go to your Firebase project's Authentication settings, " +
            "click on the 'Settings' tab, and add your domain to the 'Authorized domains' list."
          );
        } else {
          console.error("Error signing in with Google", error);
        }
      }
      // Reset the button state ONLY on error or cancellation.
      setIsSigningIn(false);
    }
  };

  // While loading authentication state, or if user is logged in (and we're about to redirect), show loading indicator.
  if (loading || user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          >
            <BrainCircuit className="h-20 w-20 text-primary" />
          </motion.div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Redirecting...</h2>
            <p className="text-muted-foreground">Getting your math challenges ready!</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="max-w-md w-full shadow-2xl border-2 border-primary/10">
          <CardHeader className="text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-primary/10 rounded-full inline-block ring-8 ring-primary/5">
                 <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                 >
                    <BrainCircuit className="h-16 w-16 text-primary" />
                 </motion.div>
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-2">
              Sign in with your Google account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="lg"
                className="w-full text-lg shadow-lg hover:shadow-primary/30 transition-shadow"
                onClick={handleSignIn}
                disabled={isSigningIn || loading}
              >
                {isSigningIn ? (
                    <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Signing In...
                    </>
                ) : (
                    <>
                        <GoogleIcon className="mr-3 h-6 w-6" />
                        Continue with Google
                    </>
                )}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
