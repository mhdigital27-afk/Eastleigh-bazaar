import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthError } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

// Precise typing for the application roles based on your schema
type AppRole = Database['public']['Enums']['app_role'];

interface AuthContextType {
  user: User | null;
  role: AppRole | 'customer' | null;
  businessId: string | null;
  loading: boolean;
  initialized: boolean;
  signOut: () => Promise<void>;
  refreshMetadata: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AUTH PROVIDER: Global wrapper to manage Supabase session and 
 * Eastleigh Bazaar V2 specific metadata (Roles & Business IDs).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AppRole | 'customer' | null>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);

  /**
   * Fetches metadata not stored in the core Auth object (Role and Stall ID).
   * This is critical for gatekeeping merchant routes.
   */
  const fetchUserMetadata = async (userId: string) => {
    try {
      // Parallel fetch to optimize B2B terminal performance
      const [roleResult, businessResult] = await Promise.all([
        supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .maybeSingle(),
        supabase
          .from('business_listings')
          .select('id')
          .eq('owner_id', userId)
          .maybeSingle()
      ]);

      if (roleResult.error) throw roleResult.error;
      if (businessResult.error) throw businessResult.error;

      setRole(roleResult.data?.role || 'customer');
      setBusinessId(businessResult.data?.id || null);
    } catch (error: any) {
      console.error("[Auth Metadata Error]:", error.message);
      // Fallback to customer status if role check fails
      setRole('customer');
      setBusinessId(null);
    }
  };

  /**
   * Primary side-effect for real-time auth synchronization.
   * Listens for login, logout, and token refresh events across all tabs.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        // 1. Check for existing session on initial load (hydration)
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserMetadata(session.user.id);
        }
      } catch (err) {
        console.error("[Auth Initialization Error]:", err);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();

    // 2. Setup Supabase Real-time Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setUser(currentUser);
          if (currentUser) await fetchUserMetadata(currentUser.id);
        } 
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setRole(null);
          setBusinessId(null);
        }

        setLoading(false);
      }
    );

    // Clean up subscription to prevent memory leaks and redundant listener calls
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Manual refresh of user data (useful after a new business registration)
   */
  const refreshMetadata = async () => {
    if (user) {
      await fetchUserMetadata(user.id);
    }
  };

  /**
   * Logs out the user and clears the session cookie/storage.
   */
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setRole(null);
      setBusinessId(null);
      
      toast.success("Disconnected successfully", {
        description: "Your session has been securely closed."
      });
    } catch (error: any) {
      toast.error("Logout Error", {
        description: error.message || "Failed to terminate session."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        role, 
        businessId, 
        loading, 
        initialized,
        signOut,
        refreshMetadata 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth: Custom hook to consume the auth state in any component.
 * Usage: const { user, role, businessId } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider. Ensure you have wrapped your route tree in the provider.');
  }
  return context;
};
