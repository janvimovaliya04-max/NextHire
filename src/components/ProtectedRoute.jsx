import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Role-Based Protected Route Guard Component
 * @param {Object} props
 * @param {Array<string>} [props.allowedRoles] - Roles allowed to access the nested routes
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, role, loading } = useAuth();

    // 1. Show simple loader while auth state is restoring from localStorage/context
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-semibold text-gray-600">
                    Loading Session...
                </div>
            </div>
        );
    }

    // 2. User is not logged in -> Redirect to Login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Convert Role into lowercase 
    const normalizedRole = role ? role.toLowerCase() : '';

    // 3. User role is not allowed -> Redirect to their respective correct portal
    if (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(normalizedRole)) {
        const roleRedirects = {
            candidate: '/candidate',
            hr: '/hr',
            interviewer: '/interviewer',
        };

        const targetPath = roleRedirects[normalizedRole] || '/login';
        return <Navigate to={targetPath} replace />;
    }

    // 4. Access Granted -> Render nested routes dynamically
    return <Outlet />;
};

export default ProtectedRoute;