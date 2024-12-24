import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section
      className={
        "w-full h-screen flex flex-col gap-2 justify-center items-center"
      }
    >
      <div className={"mt-[-50px] flex flex-col justify-center items-center"}>
        <div className={"text-center"}>
          <h1 className={"text-4xl font-bold"}>404</h1>
          <p className={"text-xl"}>Page not found</p>
        </div>
        <Button onClick={() => navigate(-1)} className={"mt-5"}>
          Go Back
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
