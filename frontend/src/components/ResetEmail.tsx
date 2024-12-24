import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { zodResetEmailSchema } from "@shared/zod/validation.zod.ts";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { askResetEmail, resetEmail, signOut } from "@/api/auth.ts";
import { toast } from "sonner";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "@/lib/localSorage.ts";
import { logout } from "@/store/features/userSlice.ts";

const ResetEmail = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const magicLink = searchParams.get("magicLink");

  const [isOpenResetEmailBox, setIsOpenResetEmailBox] = useState<boolean>(
    () => getDataFromLocalStorage("openResetEmailBox") ?? false,
  );

  //* sign out user
  const { mutate: signOutMutate } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success("Signed out successfully");
      dispatch(logout());
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.message || "Error in signing out");
    },
  });

  //* implement ask reset email functionality
  const { isLoading, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ["askEmailVerification"],
    queryFn: askResetEmail,
    enabled: false,
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Reset Email link sent to your email");
      setDataToLocalStorage("openResetEmailBox", true);
      setIsOpenResetEmailBox(true);
    }
    if (isError) {
      toast.error(error?.message || "Error in sending reset email link");
    }
  }, [isSuccess, isError, error]);

  //* ask reset email function
  const handleAskResetEmail = async () => {
    await refetch();
  };

  //* implement reset email functionality
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodResetEmailSchema>) =>
      resetEmail(data),
    onSuccess: () => {
      toast.success("Email reset successfully");
      localStorage.removeItem("openResetEmailBox");
      setIsOpenResetEmailBox(false);
      signOutMutate();
    },
    onError: (error) => {
      toast.error(error?.message || "Error in reset email");
    },
  });
  const form = useForm<z.infer<typeof zodResetEmailSchema>>({
    resolver: zodResolver(zodResetEmailSchema),
    defaultValues: {
      email: user?.email,
      token: undefined,
    },
  });

  useEffect(() => {
    if (magicLink) {
      form.setValue("token", magicLink);
    }
    if (!magicLink) {
      localStorage.removeItem("openResetEmailBox");
      setIsOpenResetEmailBox(false);
    }
  }, [magicLink]);

  function onSubmit(values: z.infer<typeof zodResetEmailSchema>) {
    mutate(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Email</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"flex flex-col gap-2 space-y-2"}>
          <Button
            variant={"outline"}
            onClick={handleAskResetEmail}
            className={"max-w-[100px]"}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Reset Email"}
          </Button>
          <p className={"text-sm text-pretty text-muted-foreground"}>
            to reset your email. You will receive an email with a token to reset
            your email after clicking the button.
          </p>
        </div>
        <Separator className={"w-full my-4"} />
        {/*  form */}
        <div
          className={cn(
            "transition-all duration-300 w-full",
            isOpenResetEmailBox ? "flex" : "hidden",
          )}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token</FormLabel>
                    <FormControl>
                      <Input placeholder="your token" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please check your email for the token.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Resetting..." : "Reset Email"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetEmail;
