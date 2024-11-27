import {User} from "@/types/User";
import {supabase} from "@/api/supabase";

const usersApi = {
    fetchUserById: async (userId: string): Promise<User> => {
        try{
            const { data, error } = await supabase
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
        }
        catch (error) {
            console.error('Error fetching user:', error);
            return {} as User;
        }
    }
}

export default usersApi;