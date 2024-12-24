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
import { Separator } from "@/components/ui/separator.tsx";
import { useMutation } from "@tanstack/react-query";
import { addUsersToCourse } from "@/api/course.ts";
import { toast } from "sonner";

const AddUserToCourse = () => {
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
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodAddUpdateUserToCourseSchema>) =>
      addUsersToCourse(data),
    onSuccess: () => {
      toast.success("User added to course");
      form.reset();
    },
    onError: (error) => {
      console.error("Error adding user to course", error);
      toast.error(error?.message || "Error adding user to course");
    },
  });
  function onSubmit(values: z.infer<typeof zodAddUpdateUserToCourseSchema>) {
    mutate(values);
  }
  return (
    <Card className={"w-full m-3"}>
      <CardHeader>
        <CardTitle className="text-md lg:text-lg font-semibold text-muted-foreground">
          Add User to Course
        </CardTitle>
      </CardHeader>
      <CardContent>
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add User"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddUserToCourse;
