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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodClassMemberSchema } from "@shared/zod/class/class.members.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addStudentToClass } from "@/api/class.ts";

const AddStudentToClass = () => {
  const form = useForm<z.infer<typeof zodClassMemberSchema>>({
    resolver: zodResolver(zodClassMemberSchema),
    defaultValues: {
      student_id: undefined,
      class_code: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodClassMemberSchema>) =>
      addStudentToClass(data),
    onSuccess: () => {
      toast.success("Student added to class successfully");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  function onSubmit(values: z.infer<typeof zodClassMemberSchema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <Card className={"w-full h-auto"}>
      <CardHeader>
        <CardTitle className="text-md lg:text-lg font-semibold text-muted-foreground">
          Add Student To Class
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="student_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="class_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddStudentToClass;
