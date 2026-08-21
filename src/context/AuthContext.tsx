// src/context/AuthContext.tsx

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import axios from 'axios';

const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000/api';

type User = {
    id: string;
    username: string;
    email: string;
    address?: string;
    createdAt?: string;
};

type UpdateUserData = {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    updateUser: (
        data: UpdateUserData
    ) => Promise<User>;
    logout: () => Promise<void>;
};

const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    const refreshUser =
        async () => {
            try {
                const token = localStorage.getItem('token');
                const response =
                    await axios.get(
                        `${API_URL}/me`,
                        {
                            headers: token ? { Authorization: `Bearer ${token}` } : {},
                            withCredentials: true,
                        }
                    );

                setUser(
                    response.data.user
                );
            } catch {
                setUser(null);
            }
        };

    const updateUser =
        async (
            data: UpdateUserData
        ) => {
            const token = localStorage.getItem('token');
            const response =
                await axios.put(
                    `${API_URL}/me`,
                    data,
                    {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                        withCredentials:
                            true,
                    }
                );

            const updatedUser =
                response.data.user;

            setUser(
                updatedUser
            );

            return updatedUser;
        };

    const logout =
        async () => {
            try {
                const token = localStorage.getItem('token');
                await axios.post(
                    `${API_URL}/logout`,
                    {},
                    {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                        withCredentials:
                            true,
                    }
                );
            } finally {
                localStorage.removeItem('token');
                setUser(null);
            }
        };

    useEffect(() => {
        const loadUser =
            async () => {
                await refreshUser();
                setLoading(false);
            };

        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                refreshUser,
                updateUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used inside AuthProvider'
        );
    }

    return context;
}