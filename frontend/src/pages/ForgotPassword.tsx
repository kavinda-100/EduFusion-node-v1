import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useEffect, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { zodResetPasswordSchema } from "@shared/zod/validation.zod.ts";
import { cn } from "@/lib/utils.ts";
import InputVerification from "@/components/motion/InputVerification.tsx";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp.tsx";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  //TODO: Implement the ask reset password mutation

  //ask reset password handler
  const handleAskResetPassword = () => {
    // this will should be passed to the mutation success callback
    setIsOpen(true);
    // call the mutation here
  };

  const form = useForm<z.infer<typeof zodResetPasswordSchema>>({
    resolver: zodResolver(zodResetPasswordSchema),
    defaultValues: {
      password: undefined,
      otp: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof zodResetPasswordSchema>) {
    if (!newPassword || newPassword === "") {
      form.setError(
        "password",
        { message: "password required" },
        { shouldFocus: true },
      );
      return;
    }
    console.log(values);
  }

  useEffect(() => {
    form.setValue("password", newPassword);
    form.clearErrors("password");
  }, [form, newPassword]);

  return (
    <div className={"w-full h-screen flex justify-center items-center"}>
      <Card>
        <CardHeader>
          <CardTitle className={"flex gap-2"}>
            {" "}
            <ArrowLeft
              className={"size-5 cursor-pointer"}
              onClick={() => {
                navigate("/");
              }}
            />{" "}
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={"flex flex-col gap-2 space-y-2"}>
            <Button
              variant={"outline"}
              onClick={handleAskResetPassword}
              className={"max-w-[150px]"}
            >
              Send OTP
            </Button>
            <p className={"text-sm text-pretty text-muted-foreground"}>
              Click the button to reset your password. A one-time Password will
              be sent to your email.
            </p>
          </div>
          <Separator className={"w-full my-4"} />
          <div
            className={cn(
              "transition-all duration-300 w-full",
              isOpen ? "flex" : "hidden",
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
                <Button type="submit">Reset Password</Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
