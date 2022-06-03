import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// services
import { browserClient } from '../services/api';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User | undefined;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

// create broadCastChannel
let authChannel: BroadcastChannel;

// create context
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// create provider
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (!token) {
      return;
    }

    async function getUser() {
      try {
        const userProfile = await browserClient.get<User>('/me');
        setUser(userProfile.data);
      } catch {
        signOut();
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel('signOut');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          router.push('/');
          break;
        default:
          break;
      }
    };
  }, []);

  function signOut() {
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.refreshToken');

    // post signOut broadcast message
    authChannel.postMessage('signOut');

    router.push('/');
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await browserClient.post('/sessions', {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      // update state
      setUser({
        email,
        permissions,
        roles,
      });

      // set cookies
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      // @ts-ignore
      browserClient.defaults.headers['Authorization'] = `Bearer ${token}`;

      // redirect
      router.push('/dashboard');
    } catch (error) {
      toast.error('Erro ao realizar login');
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an Auth provider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
