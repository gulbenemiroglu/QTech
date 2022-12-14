import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import {useToast} from "contexts/Toast";
import {ICredentials, ISessionContext, TUser} from "contexts/Session/types";
import Navbar from "components/Navbar";
import data from "data/users.json";

export const SessionContext = createContext<ISessionContext>({} as ISessionContext);

export const useSession = () => useContext(SessionContext);

export const SessionContextProvider: FC<PropsWithChildren<{}>> = ({children}) => {
    const {toast} = useToast();
    const {pathname, push} = useRouter();

    const [user, setUser] = useState<TUser>(null);

    const protectedAuthRoutes = ["/dashboard"];
    const protectedUnauthRoutes = ["/login"];

    const isAuthRoute = useMemo(() => protectedAuthRoutes.includes(pathname), [pathname]);
    const isUnauthRoute = useMemo(() => protectedUnauthRoutes.includes(pathname), [pathname]);

    const login = async ({username, password}: ICredentials) => {
        const foundUser = data.find(user => user.username === username && user.password === password);
        if (foundUser) {
            localStorage.setItem("sessionToken", foundUser.id.toString());
            setUser(foundUser);
            return toast({text: `Welcome, ${username}`, type: "success"});
        }

        toast({text: "Username or password is invalid.", type: "danger"});
    }

    const logout = () => {
        localStorage.clear();
        setUser(null);
    }

    const getMe = () => {
        const sessionToken = localStorage.getItem("sessionToken");

        if (sessionToken) {
            const foundUser = data.find(user => user.id === Number(sessionToken));
            
            if(!foundUser) return;

            setUser(foundUser);
        }
    }

    useEffect(() => {
        getMe();
    }, []);

    useEffect(() => {
        if (isAuthRoute && !user) {
            push("/login");
        }
        if (isUnauthRoute && user) {
            push("/dashboard");
        }
    }, [user, isAuthRoute, isUnauthRoute]);

    useEffect(() => {
        if(!isUnauthRoute && !isAuthRoute){
            push("/login");
        }
    }, [pathname]);

    return (
        <SessionContext.Provider value={{user, setUser, login, logout}}>
            {user && <Navbar/>}
            {children}
        </SessionContext.Provider>
    )

}