import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "@/store/hooks.ts";
import Header from "@/components/Header.tsx";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar.tsx"
import Footer from "@/components/Footer.tsx";
import { IKContext } from 'imagekitio-react';

const ProtectLayout = () => {
    const {user, isLoggedIn} = useAppSelector(state => state.user)

    const urlEndpoint = import.meta.env.VITE_IMAGEKITIO_PUBLIC_URL as string;
    const publicKey = import.meta.env.VITE_IMAGEKITIO_PUBLIC_KEY as string;
    const serverUrl = import.meta.env.MODE === "development" ? "http://localhost:5000/auth" : "/auth";
    const authenticator =  async () => {
        try {
            const response = await fetch(serverUrl);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error: Error | any) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className={"w-full h-auto max-w-[1500px] mx-auto"}>
                {
                    user && isLoggedIn ? (
                        <>
                            <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
                            <Header/>
                            <section className={"w-full h-full min-h-[calc(100vh - 80px)] p-2"}>
                                <Outlet/>
                            </section>
                            <Footer/>
                            </IKContext>
                        </>

                    ) : <Navigate to={"/"}/>
                }
            </main>
        </SidebarProvider>
    );
};

export default ProtectLayout;