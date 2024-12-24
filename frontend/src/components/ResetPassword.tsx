import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResetPasswordSchema } from "@shared/zod/validation.zod.ts";
import { useEffect, useState } from "react";
import InputVerification from "@/components/motion/InputVerification.tsx";
import { cn } from "@/lib/utils.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { askPasswordReset, resetPassword } from "@/api/auth.ts";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "@/lib/localSorage.ts";
import { useToast } from "@/hooks/use-toast.ts";

const ResetPassword = () => {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [isResetBoxOpen, setIsResetBoxOpen] = useState(() => {
    return getDataFromLocalStorage("resetPasswordBoxOpen") ?? false;
  });

  const queryClient = useQueryClient();

  //* Implement the ask reset password mutation
  const { data, isLoading, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ["askResetPassword"],
    queryFn: askPasswordReset,
    enabled: false,
  });
  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "OTP sent successfully",
      });
      console.log(data);
    }
    if (isError) {
      toast({
        variant: "destructive",
        description: error?.message || "Failed to send OTP",
      });
    }
  }, [isSuccess, isError, error]);

  //ask reset password handler
  const handleAskResetPassword = async () => {
    await refetch();
    setIsResetBoxOpen(true);
    setDataToLocalStorage("resetPasswordBoxOpen", true);
  };

  //* Implement the reset password mutation
  const { mutate: resetMutate, isPending: isResetPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodResetPasswordSchema>) =>
      resetPassword(data),
    onSuccess: () => {
      toast({
        description: "Password Reset Successful",
      });
      queryClient.invalidateQueries({ queryKey: ["authUser", "me"] });
      // close the reset password box
      setIsResetBoxOpen(false);
      localStorage.removeItem("resetPasswordBoxOpen");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.message || "Failed to reset password",
      });
    },
  });
  const form = useForm<z.infer<typeof zodResetPasswordSchema>>({
    resolver: zodResolver(zodResetPasswordSchema),
    defaultValues: {
      password: undefined,
      otp: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof zodResetPasswordSchema>) {
    if (!newPassword || newPassword === "") {
      form.setError(
        "password",
        { message: "password required" },
        { shouldFocus: true },
      );
      return;
    }
    resetMutate(values);
  }

  useEffect(() => {
    form.setValue("password", newPassword);
    form.clearErrors("password");
  }, [form, newPassword]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"flex flex-col gap-2 space-y-2"}>
          <Button
            variant={"outline"}
            onClick={handleAskResetPassword}
            className={"max-w-[150px]"}
            disabled={isLoading}
          >
            {isLoading ? "Sending OTP..." : "Reset Password"}
          </Button>
          <p className={"text-sm text-pretty text-muted-foreground"}>
            Click the button to reset your password. A one-time OTP will be sent
            to your email.
          </p>
        </div>
        <Separator className={"w-full my-4"} />
        <div
          className={cn(
            "transition-all duration-300 w-full",
            isResetBoxOpen ? "flex" : "hidden",
          )}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div>
                <InputVerification setNewPassword={setNewPassword} />
              </div>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time OTP sent to your Email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isResetPending}>
                {isResetPending ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
