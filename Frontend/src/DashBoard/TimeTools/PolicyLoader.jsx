import api from "../../api";


export default async function PolicyLoader() {
    try {
        const res = await api.get("/api/policies");
        return res.data;
    } catch (error) {
        console.error("Error fetching policies:", error);
        throw error;
    }
}
