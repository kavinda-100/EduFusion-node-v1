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
import { zodAddUpdateUserToCourseSchema } from "@shared/zod/course";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator.tsx";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  deleteUsersFromCourse,
  searchUsersInCourse,
  updateUsersInCourse,
} from "@/api/course.ts";

const UpdateUserInCourse = () => {
  const [searchUserId, setSearchUserId] = useState("");
  const [searchCourseCode, setSearchCourseCode] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof zodAddUpdateUserToCourseSchema>>({
    resolver: zodResolver(zodAddUpdateUserToCourseSchema),
    defaultValues: {
      course_code: undefined,
      user_id: undefined,
      status: undefined,
      role: undefined,
    },
  });

  //* Implement onSubmit function
  const { mutate: updateMutate, isPending: updateIsPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodAddUpdateUserToCourseSchema>) =>
      updateUsersInCourse(data),
    onSuccess: (data) => {
      toast.success("User updated successfully");
      if (data?.data) {
        form.setValue("course_code", data.data.course_code);
        form.setValue("user_id", data.data.user_id);
        form.setValue("status", data.data.status);
        form.setValue(
          "role",
          data.data.user_id.startsWith("t") ? "teacher" : "student",
        );
      }
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred while updating user");
    },
  });
  function onSubmit(values: z.infer<typeof zodAddUpdateUserToCourseSchema>) {
    updateMutate(values);
  }

  //* Implement searchUserId user by user_id
  const { mutate: searchMutation, isPending: isSearchPending } = useMutation({
    mutationFn: async ({
      userId,
      courseCode,
    }: {
      userId: string;
      courseCode: string;
    }) => searchUsersInCourse({ userId, courseCode }),
    onSuccess: (data) => {
      if (data?.data) {
        form.setValue("course_code", data.data.course_code);
        form.setValue("user_id", data.data.user_id);
        form.setValue("status", data.data.status);
        form.setValue(
          "role",
          data.data.user_id.startsWith("t") ? "teacher" : "student",
        );
      }
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred while searching user");
    },
  });
  const handleSearch = () => {
    if (
      (!searchUserId || searchUserId.trim() === "") &&
      (!searchCourseCode || searchCourseCode.trim() === "")
    ) {
      toast.error("Please enter a user and course code to search");
      return;
    }
    searchMutation({
      userId: searchUserId,
      courseCode: searchCourseCode.toUpperCase(),
    });
  };

  //* Implement delete user by user_id
  const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
    mutationFn: async ({
      userId,
      courseCode,
    }: {
      userId: string;
      courseCode: string;
    }) => deleteUsersFromCourse({ userId, courseCode }),
    onSuccess: () => {
      toast.success("User deleted successfully");
      setOpenDialog(false);
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred while deleting user");
    },
  });
  const handleDelete = () => {
    if (
      (!searchUserId || searchUserId.trim() === "") &&
      (!searchCourseCode || searchCourseCode.trim() === "")
    ) {
      toast.error("Please enter a user and course code to delete");
      return;
    }
    deleteMutation({
      userId: searchUserId,
      courseCode: searchCourseCode.toUpperCase(),
    });
  };
  return (
    <Card className={"w-full m-3"}>
      <CardHeader>
        <CardTitle className="text-md lg:text-lg font-semibold text-muted-foreground">
          Update User In Course
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={
            "w-full my-3 flex-col lg:flex-row justify-center items-center gap-3"
          }
        >
          <div className={"w-full flex gap-2 justify-center items-center"}>
            <Input
              placeholder={"User id"}
              onChange={(e) => setSearchUserId(e.target.value)}
            />
            <Input
              placeholder={"Course code"}
              onChange={(e) => setSearchCourseCode(e.target.value)}
            />
          </div>
          <div className={"flex justify-end items-end gap-2 mt-3"}>
            <Button
              variant={"outline"}
              onClick={handleSearch}
              disabled={isSearchPending}
            >
              {isSearchPending ? "Searching..." : "Search"}
            </Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger>
                <Button variant={"destructive"}>Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    the user from the course.
                  </DialogDescription>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant={"outline"}
                      onClick={() => setOpenDialog(false)}
                    >
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
              name="course_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course code</FormLabel>
                  <FormControl>
                    <Input placeholder="MHZ4356" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Id</FormLabel>
                  <FormControl>
                    <Input placeholder="t1234567 or s1234567" {...field} />
                  </FormControl>
                  <FormDescription>
                    User id is (student or instructor)
                  </FormDescription>
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Student</SelectLabel>
                          <SelectItem value="enrolled">Enrolled</SelectItem>
                          <SelectItem value="dropped">Dropped</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="repeat">Repeat</SelectItem>
                        </SelectGroup>
                        <Separator />
                        <SelectGroup>
                          <SelectLabel>Instructor</SelectLabel>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={updateIsPending}>
              {updateIsPending ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateUserInCourse;
