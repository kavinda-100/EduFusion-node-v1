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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { zodClassMemberSchemaForUpdate } from "@shared/zod/class/class.members.ts";
import { useMutation } from "@tanstack/react-query";
import {
  deleteStudentFromClass,
  searchStudentInClass,
  updateStudentInClass,
} from "@/api/class.ts";

const UpdateStudentToClass = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof zodClassMemberSchemaForUpdate>>({
    resolver: zodResolver(zodClassMemberSchemaForUpdate),
    defaultValues: {
      old_student_id: undefined,
      new_student_id: undefined,
      class_code: undefined,
    },
  });

  // * Update a student in class
  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodClassMemberSchemaForUpdate>) =>
      updateStudentInClass(data),
    onSuccess: () => {
      toast.success("Student updated in class successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "An error occurred");
    },
  });

  function onSubmit(values: z.infer<typeof zodClassMemberSchemaForUpdate>) {
    console.log(values);
    updateMutate(values);
  }

  // * search the student in the class
  const { mutate, isPending: isSearchPending } = useMutation({
    mutationFn: async (student_id: string) => searchStudentInClass(student_id),
    onSuccess: (data) => {
      console.log(data);
      form.setValue("old_student_id", data?.data?.student_id);
      form.setValue("class_code", data?.data?.class_code);
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });
  // Function to handle search
  const handleSearch = () => {
    if (!search || search.length === 0) {
      toast.error("Enter a student id");
      return;
    }
    mutate(search);
  };

  // * mutate to handle delete
  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: async (student_id: string) =>
      deleteStudentFromClass(student_id),
    onSuccess: () => {
      toast.success("Student deleted from class successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  // Function to handle delete
  const handleDelete = () => {
    if (!search || search.length === 0) {
      toast.error("Enter a student id");
      return;
    }
    deleteMutate(search);
  };

  return (
    <Card className={"w-full h-auto"}>
      <CardHeader>
        <CardTitle className="text-md lg:text-lg font-semibold text-muted-foreground">
          Update Student In Class
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"flex justify-between items-center gap-3 mb-2"}>
          <Input
            placeholder="Search by student Id"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={"flex gap-2"}>
            <Button onClick={handleSearch} disabled={isSearchPending}>
              Search
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
                    Student from the class.
                  </DialogDescription>
                </DialogHeader>
                <div className={"flex justify-end items-center gap-3"}>
                  <Button variant={"secondary"} onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant={"destructive"}
                    disabled={isDeletePending}
                  >
                    {isDeletePending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="old_student_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Student ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_student_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Student ID</FormLabel>
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
            <Button type="submit" disabled={isUpdatePending}>
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateStudentToClass;
