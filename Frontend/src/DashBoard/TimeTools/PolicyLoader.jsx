import api from "../../api";
import { redirect } from "react-router-dom";
import { clearAuthSession } from "../../authSession";


export default async function PolicyLoader() {
    try {
        const res = await api.get("/api/policies");
        return res.data;
    } catch (error) {
        console.error("Error fetching policies:", error);
        if (error.response?.status === 401) {
            clearAuthSession();
            throw redirect("/signin");
        }
        return [];
    }
}
