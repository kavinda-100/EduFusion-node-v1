import {Loader} from "lucide-react";


const LoadingPage = () => {
    return (
        <main className={"w-full h-screen flex justify-center items-center"}>
            <Loader className={"w-5 h-5 animate-spin text-violet-600"}/>
        </main>
    );
};

export default LoadingPage;