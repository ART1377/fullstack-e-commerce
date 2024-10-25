// session-context.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

// Define the types for the context
interface SessionContextType {
  session: Session | null;
  status: string;
  retrieveSession: () => Promise<void>;
}

// Create the context with default values
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// SessionProvider component that will wrap the app
export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<string>("loading");
  const pathName = usePathname();

  const retrieveSession = useCallback(async () => {
    try {
      const sessionData = await getSession();
      if (sessionData) {
        setSession(sessionData);
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    } catch (error) {
      setStatus("unauthenticated");
      setSession(null);
    }
  }, []);

  useEffect(() => {
    if (!session) {
      retrieveSession();
    }
  }, [retrieveSession, session, pathName]);

  return (
    <SessionContext.Provider value={{ session, status, retrieveSession }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use session context
export const useSessionContext = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};
