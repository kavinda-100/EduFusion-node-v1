import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodCourseSchema } from "@shared/zod/course/course.ts";
import { Label } from "@/components/ui/label.tsx";
import { CloudUpload } from "lucide-react";
import React from "react";
import { IKUpload, IKImage } from "imagekitio-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator.tsx";
import { useMutation } from "@tanstack/react-query";
import { deleteCourse, searchCourse, updateCourse } from "@/api/course.ts";

const UpdateCourse = () => {
  const thumbnailRef = React.useRef<any | null>(null);
  const fileRef = React.useRef<any | null>(null);
  const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);
  const [searchClassCode, setSearchClassCode] = React.useState<string | null>(
    null,
  );
  const [open, setOpen] = React.useState(false);
  const [courseThumbnail, setCourseThumbnail] = React.useState<string | null>();

  const form = useForm<z.infer<typeof zodCourseSchema>>({
    resolver: zodResolver(zodCourseSchema),
    defaultValues: {
      course_code: undefined,
      course_name: undefined,
      course_description: undefined,
      course_thumbnail: undefined,
      course_thumbnail_fileId: undefined,
      file_urls: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "file_urls",
  });

  //* Implement onSubmit function
  const { mutate: updateMutation, isPending: isUpdatePending } = useMutation({
    mutationFn: async ({
      courseCode,
      courseData,
    }: {
      courseCode: string;
      courseData: z.infer<typeof zodCourseSchema>;
    }) => updateCourse({ courseCode, courseData }),
    onSuccess: () => {
      toast.success("Course updated successfully");
      form.reset();
    },
    onError: (error) => {
      toast.error(error?.message || "Error updating course");
    },
  });
  function onSubmit(values: z.infer<typeof zodCourseSchema>) {
    console.log(values);
    console.log("Uploaded files", uploadedFiles);
    if (!searchClassCode || searchClassCode === "") {
      toast.error("Please enter class code");
      return;
    }
    updateMutation({ courseCode: searchClassCode, courseData: values });
  }

  //* Implement handleSearch function
  const { mutate: searchMutation, isPending: isSearchPending } = useMutation({
    mutationFn: async (courseCode: string) => searchCourse(courseCode),
    onSuccess: (data) => {
      if (data?.data) {
        form.setValue("course_code", data.data.course_code);
        form.setValue("course_name", data.data.course_name);
        form.setValue("course_description", data.data.course_description);
        form.setValue("course_thumbnail", data.data.course_thumbnail);
        setCourseThumbnail(data.data.course_thumbnail);
        form.setValue(
          "course_thumbnail_fileId",
          data.data.course_thumbnail_fileId,
        );
        data.data.file_urls.forEach((file: any) => {
          setUploadedFiles((prev) => [...prev, file.file_url]);
          append({ file_url: file.file_url, file_fileId: file.file_fileId });
        });
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Error searching course");
    },
  });
  const handleSearch = () => {
    if (!searchClassCode || searchClassCode === "") {
      toast.error("Please enter class code");
      return;
    }
    searchMutation(searchClassCode);
  };

  //* Implement handleDelete function
  const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
    mutationFn: async (courseCode: string) => deleteCourse(courseCode),
    onSuccess: () => {
      toast.success("Course deleted successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error?.message || "Error deleting course");
    },
  });
  const handleDelete = () => {
    if (!searchClassCode || searchClassCode === "") {
      toast.error("Please enter class code");
      return;
    }
    deleteMutation(searchClassCode);
  };

  // generate course code
  const generateCourseCode = () => {
    const courseName = form.getValues("course_name");
    if (!courseName) {
      toast.error("Please enter course name first");
      return;
    }
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const courseCode = `${courseName.substring(0, 3).toUpperCase()}${randomCode}`;
    form.setValue("course_code", courseCode);
  };

  // for thumbnail upload
  const onError = (error: any) => {
    console.log("Error", error);
    toast.error(error?.message || "Error uploading thumbnail");
    toast.dismiss();
  };
  const onSuccess = (success: any) => {
    console.log("Success", success);
    const thumbnailUrl = success.url;
    form.setValue("course_thumbnail", thumbnailUrl);
    form.setValue("course_thumbnail_fileId", success.fileId);
    setCourseThumbnail(thumbnailUrl);
    toast.success("Thumbnail uploaded successfully");
    toast.dismiss();
  };
  const onUploadProgress = (progress: ProgressEvent) => {
    console.log("Progress", progress);
    toast.loading("Uploading thumbnail...");
  };

  // for file upload
  const onFileError = (error: any) => {
    console.log("Error", error);
    toast.error(error?.message || "Error uploading file");
    toast.dismiss();
  };
  const onFileSuccess = (success: any) => {
    console.log("Success", success);
    const fileUrl = success.url;
    setUploadedFiles((prev) => [...prev, fileUrl]);
    append({ file_url: fileUrl, file_fileId: success.fileId });
    toast.success("File uploaded successfully");
    toast.dismiss();
  };
  const onFileUploadProgress = (progress: ProgressEvent) => {
    console.log("Progress", progress);
    toast.loading("Uploading file...");
  };

  return (
    <Card className={"w-full m-3"}>
      <CardHeader>
        <CardTitle className="text-md lg:text-lg font-semibold text-muted-foreground">
          Update a course
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"flex justify-between items-center gap-3"}>
          <Input
            onChange={(e) => setSearchClassCode(e.target.value)}
            placeholder="Search by course code"
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
                    the course.
                  </DialogDescription>
                  <div className={"flex justify-end gap-2"}>
                    <Button
                      variant={"secondary"}
                      onClick={() => setOpen(false)}
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
              name="course_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Maths" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="MHZ3459" {...field} disabled={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"secondary"}
              size={"sm"}
              type={"button"}
              onClick={generateCourseCode}
              disabled={true}
            >
              Generate
            </Button>
            <FormField
              control={form.control}
              name="course_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Course description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={"w-full"}>
              <Label>Course Thumbnail</Label>
              <div
                className={
                  "w-full h-auto border rounded p-2 shadow-sm flex justify-between items-center mt-2"
                }
              >
                <p className={"text-muted-foreground text-sm font-normal"}>
                  (PNG or JPEG) only
                </p>
                <CloudUpload
                  className={"size-auto cursor-pointer"}
                  onClick={() => thumbnailRef?.current?.click()}
                />
              </div>
            </div>
            {courseThumbnail && (
              <div className={"w-full h-auto p-2"}>
                <IKImage
                  src={courseThumbnail}
                  alt={"Course thumbnail"}
                  lqip={{ active: true }}
                  loading={"lazy"}
                  className={"w-full h-[200px] object-cover rounded-md"}
                />
              </div>
            )}

            <div className={"w-full"}>
              <Label>Course Materials</Label>
              <div
                className={
                  "w-full h-auto border rounded p-2 shadow-sm flex justify-between items-center mt-2"
                }
              >
                <p className={"text-muted-foreground text-sm font-normal"}>
                  (PDF or DOCX) only
                </p>
                <CloudUpload
                  className={"size-auto cursor-pointer"}
                  onClick={() => fileRef?.current?.click()}
                />
              </div>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`file_urls.${index}.file_url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"text-muted-foreground text-sm"}>
                        Course Material {index + 1}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} disabled={true} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  size={"sm"}
                  variant={"secondary"}
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="submit">
              {isUpdatePending ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>

      {/*  for image upload */}
      <IKUpload
        ref={thumbnailRef}
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        isPrivateFile={false}
        useUniqueFileName={true}
        validateFile={(file) => file.size < 1000000}
        folder={"/course/content/thumbnail"}
        className={"hidden"}
      />

      <IKUpload
        ref={fileRef}
        onError={onFileError}
        onSuccess={onFileSuccess}
        onUploadProgress={onFileUploadProgress}
        isPrivateFile={false}
        useUniqueFileName={true}
        validateFile={(file) => file.size < 5000000}
        folder={"/course/content/file"}
        className={"hidden"}
      />
    </Card>
  );
};

export default UpdateCourse;
