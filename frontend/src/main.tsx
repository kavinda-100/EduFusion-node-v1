import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { store } from "@/store/index.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster as SonnerToaster } from "@/components/ui/sonner.tsx";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                console.error("Global Error:", error.response.data.error);
            } else {
                console.error("Global Error:", error.message);
            }
        },
    }),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Provider store={store}>
                    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                        <App />
                        <SonnerToaster closeButton={true} richColors={true} />
                        <Toaster />
                    </ThemeProvider>
                </Provider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)
