import { create } from 'zustand';
import { initialState } from '../constant';
import axiosClient from '../config-API';

export const useOfficeStore = create((set, get) => ({
    ...initialState,
    data: [],

    getOfficeData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('/api/offices');
            console.log("api-data", response);
            set({
                ...initialState,
                success: true,
                data: response.status === 200 ? response.data : []
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },

    getOfficeByOfficeId: async (OfficeId) => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('/Office/byOffice/' + OfficeId);
            set({
                ...initialState,
                success: true,
                data: response.status === 200 ? response.data : []
            });
        } catch (error) {
            console.error('Error fetching data by office ID:', error);
            set({ ...initialState, error: true });
        }
    },

    getOfficeById: async (OfficeId) => {
        try {
            const response = await axiosClient.get(`/Office/byId/${OfficeId}`);
            if (response.status === 200) {
                return response.data.data;
            } else {
                console.error('Failed to fetch office details. Status:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching office details:', error);
            return null;
        }
    },

    addOffice: async (newBranch) => {
        try {
            const response = await axiosClient.post('/Office/add', newBranch);
            if (response.status === 200) {
                set((state) => ({ data: [...state.data, response.data] }));
            } else {
                console.error('Failed to add office. Status:', response.status);
            }
        } catch (error) {
            console.error('Error adding office:', error);
        }
    },

    updateOffice: async (updatedBranch) => {
        try {
            const response = await axiosClient.put('/Office/update', updatedBranch);
            if (response.status === 200) {
                set((state) => ({
                    data: state.data.map((office) =>
                        office.id === updatedBranch.id ? updatedBranch : office
                    ),
                }));
            } else {
                console.error('Failed to update office. Status:', response.status);
            }
        } catch (error) {
            console.error('Error updating office:', error);
        }
    },

    deleteOffice: async (OfficeId) => {
        try {
            const response = await axiosClient.delete(`/Office/del/${OfficeId}`);
            if (response.status === 200) {
                set((state) => ({
                    data: state.data.filter((office) => office.id !== OfficeId),
                }));
            } else {
                console.error('Failed to delete office. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting office:', error);
        }
    }
}));
