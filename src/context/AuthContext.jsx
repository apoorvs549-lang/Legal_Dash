import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);

    // On first load, ask the backend if we hve a valid cookie session
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_BASE}/me`, {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.data);
                    setIsLoggedIn(true);
                }
            } catch {
                // no valid session – stay logged out
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            await fetch(`${API_BASE}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch {
            // even if the request fails, clear local state
        }
        setUser(null);
        setIsLoggedIn(false);
    };

    const requireLogin = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return false;
        }
        return true;
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                loading,
                login,
                logout,
                requireLogin,
                showLoginModal,
                setShowLoginModal,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
