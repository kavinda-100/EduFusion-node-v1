import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import ThreeDotSimpleLoader from "@/components/ThreeDotSimpleLoader.tsx";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/api/auth.ts";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const magicLink = searchParams.get("magicLink");

  //for scrolling to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (token: string) => verifyEmail(token),
    onSuccess: () => {
      toast.success("Email verified successfully");
      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error?.message || "Error in verifying email");
    },
  });

  useEffect(() => {
    if (magicLink) {
      mutate(magicLink);
    }
  }, [magicLink, mutate]);

  return (
    <>
      {magicLink !== null && magicLink.length !== 0 && (
        <section className={"w-full h-screen flex justify-center items-center"}>
          <Card className={"min-w-[300px]"}>
            <CardHeader>
              <CardTitle>
                {isPending ? "Verifying Email" : "Email Verified"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={"space-y-5"}>
                <p className={"text-muted-foreground text-sm font-semibold"}>
                  {isPending
                    ? "Verifying your email..."
                    : "Email verified successfully"}
                </p>
                {isPending ? (
                  <div
                    className={"flex justify-center items-center w-full mt-3"}
                  >
                    <ThreeDotSimpleLoader />
                  </div>
                ) : (
                  <div className={"flex justify-center items-center w-full"}>
                    <BadgeCheck
                      className={"size-10 text-center text-green-400"}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}
      {magicLink === null && (
        <section className={"w-full h-screen flex justify-center items-center"}>
          <Card className={"min-w-[300px]"}>
            <CardHeader>
              <CardTitle>Invalid Link</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={"space-y-5"}>
                <p className={"text-muted-foreground text-sm font-semibold"}>
                  Invalid email verification link
                </p>
              </div>
              <div className={"mt-4"}>
                <Button
                  onClick={() => navigate("/dashboard/profile")}
                  variant={"outline"}
                >
                  Go to Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
};

export default EmailVerificationPage;
