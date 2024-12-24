import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useQuery } from "@tanstack/react-query";
import { askEmailVerification } from "@/api/auth.ts";
import { useEffect } from "react";
import { toast } from "sonner";

const VerifyEmail = () => {
  const { isLoading, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ["askEmailVerification"],
    queryFn: askEmailVerification,
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Email verification link sent to your email");
    }
    if (isError) {
      toast.error(error?.message || "Error in sending email verification link");
    }
  }, [isSuccess, isError, error]);

  const handleVerify = async () => {
    await refetch();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"space-y-3"}>
          <p className={"text-muted-foreground text-sm"}>
            Click to verify your email.
          </p>
          <Button onClick={handleVerify} disabled={isLoading}>
            {isLoading ? "Sending..." : "Verify Email"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyEmail;
