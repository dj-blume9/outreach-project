import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {User, UserContextType} from "@/types/User"; // Import your Supabase client

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Step 1: Get the logged-in user from Supabase Auth
                const { data: authUser, error: authError } = await supabase.auth.getUser();
                if (authError || !authUser) {
                    console.error('Error fetching auth user:', authError);
                    setUser(null);
                    return;
                }

                // Step 2: Fetch the user's data from the database
                const { data: userData, error: userError } = await supabase
                    .from('users') // Replace with your actual table name
                    .select('*') // Select all user fields or specific fields
                    .eq('id', authUser.user.id)
                    .single();

                if (userError || !userData) {
                    console.error('Error fetching user details:', userError);
                    setUser(null);
                    return;
                }

                // Step 3: Set the user data in state
                setUser({
                    id: authUser.user.id,
                    email: authUser.user.id,
                    ...userData,
                });
            } catch (error) {
                console.error('Unexpected error fetching user data:', error);
                setUser(null);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};


export default UserProvider;