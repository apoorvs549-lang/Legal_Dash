import { useAuth } from "@/context/AuthContext";
import AccessDenied from "./access-denied";

/**
 * Wraps a page component and checks if the user's role is allowed.
 *
 * Usage:
 *   <RoleGuard allowedRoles={['admin', 'lawyer']}>
 *       <AuditLogs />
 *   </RoleGuard>
 *
 * If the user's role is NOT in allowedRoles, the AccessDenied screen is shown.
 * If the user is not logged in at all, the children render normally
 * (the sidebar login-gate handles unauthenticated users separately).
 */
export default function RoleGuard({ allowedRoles, children }) {
    const { user, isLoggedIn } = useAuth();

    // If not logged in, let them through — the ProtectedMenuItem / LoginModal
    // already handles unauthenticated users.
    if (!isLoggedIn) return children;

    // If logged in but role is NOT in the allowed list → deny
    if (!allowedRoles.includes(user?.role)) {
        return <AccessDenied />;
    }

    return children;
}
