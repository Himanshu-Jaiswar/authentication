import { createContext, useContext, useEffect, useState } from "react"
import api from "../apiIntercepter";
import { toast } from "react-toastify";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    async function fetchUser() {
        setLoading(true);
        try {
            const { data } = await api.get(`/api/v1/profile`, { withCredentials: true });

            setUser(data);
            setIsAuth(true);
        } catch (error) {
            console.log("Error :", error);
        } finally {
            setLoading(false);
        }
    }

    async function logout(navigate){
        try {
            const {data} = await api.post("/api/v1/logout");
            toast.success(data.message);

            setIsAuth(false);
            setUser(null);
            navigate("/login");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    return (<AppContext.Provider value={{ setIsAuth, isAuth, setUser, user, loading, logout}}>
        {children}
    </AppContext.Provider>)
}

export const AppData = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("App data must be used within app provider");
    }

    return context
}