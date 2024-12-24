import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppSelector } from "@/store/hooks.ts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodUserUpdateSchema } from "@shared/zod/user/user.zod.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import { format } from "date-fns";
import { CalendarIcon, CloudUpload } from "lucide-react";
import { Calendar } from "@/components/ui/calendar.tsx";
import ResetPassword from "@/components/ResetPassword.tsx";
import VerifyEmail from "@/components/VerifyEmail.tsx";
import ResetEmail from "@/components/ResetEmail.tsx";
import React from "react";
import { IKUpload } from "imagekitio-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/api/user.ts";

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  const [profilePicture, setProfilePicture] = React.useState<string>();
  const imageRef = React.useRef<any | null>(null);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof zodUserUpdateSchema>>({
    resolver: zodResolver(zodUserUpdateSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      gender: user?.gender,
      dateOfBirth: user?.dateOfBirth,
      role: user?.role,
      profilePicture: profilePicture || user?.profilePicture, //! need further optimization
      profilePictureFileId: user?.profilePictureFileId,
      phoneNumber: user?.phoneNumber,
      address: {
        street: user?.address?.street,
        city: user?.address?.city,
        country: user?.address?.country,
        zipCode: user?.address?.zipCode,
      },
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodUserUpdateSchema>) =>
      updateMe(data),
    onSuccess: (data) => {
      console.log("Updated user", data);
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser", "me"] });
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error(error?.message || "Error updating user");
    },
  });

  function onSubmit(values: z.infer<typeof zodUserUpdateSchema>) {
    mutate(values);
  }

  const onError = (err: any) => {
    console.log("Error", err);
    toast.error("Error uploading image");
    toast.dismiss();
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    toast.success("Image uploaded successfully");
    form.setValue("profilePicture", res.url);
    form.setValue("profilePictureFileId", res.fileId);
    setProfilePicture(res.url);
    toast.dismiss();
  };

  const onUploadProgress = (progress: ProgressEvent) => {
    console.log("Progress", progress);
    toast.loading(`Uploading image to cloud...`);
  };

  return (
    <div className={"w-full max-w-5xl mx-auto h-auto p-2 space-y-2"}>
      <div className={"w-full"}>
        <Card className={"w-full"}>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {/*  avatar */}
            <div
              className={"space-y-2 flex flex-col justify-center items-center"}
            >
              <div className="relative group">
                <Avatar className="size-24">
                  <AvatarImage
                    src={user?.profilePicture || profilePicture}
                    alt={user?.firstName}
                  />
                  <AvatarFallback>
                    {user?.firstName[0].toUpperCase() || ""}
                  </AvatarFallback>
                  <IKUpload
                    ref={imageRef}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    isPrivateFile={false}
                    useUniqueFileName={true}
                    responseFields={["tags"]}
                    validateFile={(file) => file.size < 3000000}
                    folder={"/users/profile-pictures"}
                    className="hidden"
                  />
                </Avatar>
                <Button
                  className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 flex justify-center items-center"
                  variant="ghost"
                  size="icon"
                  onClick={() => imageRef?.current?.click()}
                >
                  <CloudUpload />
                </Button>
              </div>
              <div className={"flex flex-col justify-center items-center"}>
                <h1 className={"text-md font-bold"}>
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className={"text-gray-500"}>{user?.email}</p>
              </div>
            </div>
            {/*  user details */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="jhon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="eample@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*<InputVerification setNewPassword={setNewPassword} />*/}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">male</SelectItem>
                            <SelectItem value="female">female</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={
                            user?.role.includes("student") ||
                            user?.role.includes("teacher")
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value &&
                              !isNaN(new Date(field.value).getTime()) ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value &&
                              !isNaN(new Date(field.value).getTime())
                                ? new Date(field.value)
                                : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date ? date.toISOString() : "")
                            }
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="070 123 4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="2000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className={"w-full space-y-2"}>
        <ResetPassword />
        <VerifyEmail />
        <ResetEmail />
      </div>
    </div>
  );
};

export default Profile;
