import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodUserSignInSchema } from "@shared/zod/user/user.zod.ts";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils.ts";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks.ts";
import { setUser } from "@/store/features/userSlice.ts";
import { signIn } from "@/api/auth.ts";

type SignInFormProps = {
  role: "admin" | "student" | "teacher";
  className?: string;
};

const SignInForm = ({ role, className }: SignInFormProps) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = React.useState(false);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodUserSignInSchema>) =>
      signIn(data),
    onSuccess: (data) => {
      console.log("after success ", data);
      toast.success("Signed in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser", "me"] });
      dispatch(setUser(data?.data?.data));
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("after error ", error);
      toast.error(error.message || "An error occurred");
    },
  });

  const form = useForm<z.infer<typeof zodUserSignInSchema>>({
    resolver: zodResolver(zodUserSignInSchema),
    defaultValues: {
      email: "",
      password: "",
      role,
    },
  });

  function onSubmit(values: z.infer<typeof zodUserSignInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("from onSubmit", values);
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  type={"email"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className={"flex justify-start items-center"}>
                  <Input
                    className={"relative w-full"}
                    placeholder="********"
                    type={toggle ? "text" : "password"}
                    {...field}
                    onClick={() => setToggle(!toggle)}
                  />
                  <div className={"absolute z-10 right-8"}>
                    {toggle ? (
                      <Eye
                        className={"w-4 h-4 cursor-pointer"}
                        onClick={() => setToggle(!toggle)}
                      />
                    ) : (
                      <EyeOff
                        className={"w-4 h-4 cursor-pointer"}
                        onClick={() => setToggle(!toggle)}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={"flex justify-end space-y-2"}>
          <Link
            to={"/forgot-password"}
            className={"text-sm text-muted-foreground hover:underline"}
          >
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
