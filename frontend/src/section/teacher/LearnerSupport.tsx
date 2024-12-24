import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { zodAnnouncementSchema } from "@shared/zod/forum/announcements.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import AnnouncementTable from "@/section/teacher/components/AnnouncementTable.tsx";
import { generateFakeAnnouncement } from "@/lib/data.ts";

const LearnerSupport = () => {
  //* simulate the data
  const FakeAnnouncements = generateFakeAnnouncement(50);

  // 1. Define your form.
  const form = useForm<z.infer<typeof zodAnnouncementSchema>>({
    resolver: zodResolver(zodAnnouncementSchema),
    defaultValues: {
      instructor_id: undefined,
      course_code: undefined,
      title: undefined,
      description: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof zodAnnouncementSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className={"w-full h-full p-2"}>
      <Card className={"max-w-[700px]"}>
        <CardHeader>
          <CardTitle>Create Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="course_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Code</FormLabel>
                    <FormControl>
                      <Input placeholder="MHZ2354" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className={"mt-4"}>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <AnnouncementTable announcements={FakeAnnouncements} />
        </CardContent>
      </Card>
    </section>
  );
};

export default LearnerSupport;
