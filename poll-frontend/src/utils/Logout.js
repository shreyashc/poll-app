import Axios from "axios";
import axiosInstnce from "../client/apiClient";

export default async function Logout() {
    try {
        const response = await axiosInstnce.get("auth/logout");
        return response;
    } catch (error) {
        console.log(error);
    }
}
