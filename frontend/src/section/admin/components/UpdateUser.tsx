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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodUserUpdateSchema } from "@shared/zod/user/user.zod.ts";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";
import { Separator } from "@/components/ui/separator.tsx";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { deleteUser, getUserByEmail, updateUser } from "@/api/user.ts";

const UpdateUser = () => {
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof zodUserUpdateSchema>>({
    resolver: zodResolver(zodUserUpdateSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      gender: undefined,
      dateOfBirth: undefined,
      role: undefined,
      phoneNumber: undefined,
      address: {
        street: undefined,
        city: undefined,
        country: undefined,
        zipCode: undefined,
      },
    },
  });

  //* Implement Mutation for updating user
  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: z.infer<typeof zodUserUpdateSchema>;
    }) => updateUser({ id, data }),
    onSuccess: () => {
      toast.success("User updated successfully");
      form.reset();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "An error occurred while updating user");
    },
  });
  function onSubmit(values: z.infer<typeof zodUserUpdateSchema>) {
    console.log(values);
    if (!userId) {
      toast.error("Please search for a user to update");
      return;
    }
    updateMutate({ id: userId, data: values });
  }

  //* Implement search user by email
  const { mutate: searchMutate, isPending: isSearchPending } = useMutation({
    mutationFn: async (email: string) => getUserByEmail(email),
    onSuccess: (data) => {
      console.log(data?.data);
      if (data?.data) {
        setUserId(data.data._id);
        form.setValue("firstName", data.data.firstName);
        form.setValue("lastName", data.data.lastName);
        form.setValue("email", data.data.email);
        form.setValue("gender", data.data.gender);
        form.setValue("role", data.data.role);
        form.setValue("phoneNumber", data.data.phoneNumber);
        form.setValue("address.street", data.data.address.street);
        form.setValue("address.city", data.data.address.city);
        form.setValue("address.country", data.data.address.country);
        form.setValue("address.zipCode", data.data.address.zipCode);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "An error occurred while searching user");
    },
  });
  const handleSearch = () => {
    if (!search || search.trim() === "") {
      toast.error("Please enter a valid email to search");
      return;
    }
    searchMutate(search);
  };

  //* Implement delete user
  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: async (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully");
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "An error occurred while deleting user");
    },
  });
  const handleDelete = () => {
    if (!search || search.trim() === "") {
      toast.error("Please enter a valid email to delete");
      return;
    }
    if (!userId) {
      toast.error("Please search for a user to delete");
      return;
    }
    deleteMutate(userId);
  };

  return (
    <Card className={"w-full m-3"}>
      <CardHeader>
        <CardTitle className="text-md lg:text-lg font-semibold text-muted-foreground">
          Update User
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"w-full my-3 flex justify-between items-center gap-2"}>
          <Input
            placeholder={"Search User by email"}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={"flex justify-center items-center gap-2"}>
            <Button
              variant={"outline"}
              onClick={handleSearch}
              disabled={isSearchPending}
            >
              {isSearchPending ? "Searching..." : "Search"}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button variant={"destructive"}>Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    the user.
                  </DialogDescription>
                  <div className={"flex justify-end gap-2"}>
                    <Button variant={"outline"} onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={handleDelete}
                      disabled={isDeletePending}
                    >
                      {isDeletePending ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Separator className={"w-full my-2"} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
                          {field.value ? (
                            format(field.value, "PPP")
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
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => field.onChange(date?.toISOString())}
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
            <Button type="submit" disabled={isUpdatePending}>
              {isUpdatePending ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateUser;
