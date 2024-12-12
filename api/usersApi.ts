import {User} from "@/types/User";
import {supabase} from "@/api/supabase";

const usersApi = {
    fetchUserById: async (userId: string): Promise<User> => {
        try {
            const {data, error} = await supabase
                .from('users')
                .select('*')
                .eq('id', userId);

            if (error) {
                throw new Error(`Error fetching user: ${error.message}`);
            }

            if (!data || data.length === 0) {
                throw new Error('No user found with this ID.');
            }

            return data[0];
        } catch (error) {
            console.error('Error fetching user:', error);
            return {} as User;
        }
    },

    fetchUsersByOrganization: async (organizationId: number): Promise<User[]> => {
        try {
            // Step 1: Get all user IDs for the organization
            const { data: userIdsData, error: userIdsError } = await supabase
                .from('users_organizations')
                .select('user_id')
                .eq('organization_id', organizationId);

            if (userIdsError) {
                throw new Error(`Error fetching user IDs: ${userIdsError.message}`);
            }

            if (!userIdsData || userIdsData.length === 0) {
                throw new Error('No users found for this organization.');
            }

            const userIds = userIdsData.map((record: { user_id: string }) => record.user_id);

            // Step 2: Get all users using the retrieved user IDs
            const { data: usersData, error: usersError } = await supabase
                .from('users')
                .select('*')
                .in('id', userIds);

            if (usersError) {
                throw new Error(`Error fetching users: ${usersError.message}`);
            }

            if (!usersData || usersData.length === 0) {
                throw new Error('No users found with the provided user IDs.');
            }

            console.log('Users:', usersData);
            return usersData;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }
}

export default usersApi;