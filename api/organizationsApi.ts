import {supabase} from "@/api/supabase";

const organizationsApi = {
    fetchOrganizationIdsByUserId: async (userId: string): Promise<number[]> => {
        try {
            const { data, error } = await supabase
                .from('users_organizations')
                .select('organization_id')
                .eq('user_id', userId);

            if (error) {
                throw new Error(`Error fetching organization IDs: ${error.message}`);
            }

            if (!data || data.length === 0) {
                console.log('No organizations found for this user.');
                return [];
            }

            // Extract organization IDs as a number array
            const organizationIds = data.map((row) => Number(row.organization_id));
            return organizationIds;
        } catch (error) {
            console.error('Error fetching organization IDs:', error);
            return [];
        }
    }
}

export default organizationsApi;