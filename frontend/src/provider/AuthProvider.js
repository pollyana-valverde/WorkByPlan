import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [tokenGL, setTokenGl_] = useState(localStorage.getItem("tokenGL"));

    const setToken = (newToken) => {
        setTokenGl_(newToken);
    };

    useEffect(() => {
        if (tokenGL) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + tokenGL;
            localStorage.setItem('tokenGL', tokenGL);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('tokenGL');
        }
    }, [tokenGL]);

    const contextValue = useMemo(
        () => ({
            tokenGL,
            setToken,
        }),
        [tokenGL]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
