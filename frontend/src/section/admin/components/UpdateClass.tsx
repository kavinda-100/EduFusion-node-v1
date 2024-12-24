import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { zodClassSchema, zodClassSchemaType } from "@shared/zod/class/class";
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
import { CloudUpload } from "lucide-react";
import { IKUpload } from "imagekitio-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  deleteClass,
  getClassCourseDetails,
  updateClass,
} from "@/api/class.ts";
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

import { Separator } from "@/components/ui/separator.tsx";
import { validateClassName } from "@/lib/utils.ts";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const UpdateClass = () => {
  const UploadRef = useRef<any | null>(null);
  const [uploadFile, setUploadFile] = useState<string | null>(null);
  const [classCode, setClassCode] = useState<string>("");
  const [classData, setClassData] = useState<zodClassSchemaType | undefined>();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof zodClassSchema>>({
    resolver: zodResolver(zodClassSchema),
    defaultValues: {
      class_code: classData?.class_code || undefined,
      class_name: classData?.class_name || undefined,
      class_schedule: classData?.class_schedule || undefined,
      class_schedule_fileId: classData?.class_schedule_fileId || undefined,
      instructor_id: classData?.instructor_id || undefined,
      course_codes: classData?.course_codes || [{ course_code: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "course_codes",
  });

  // * Mutation for getting class data
  const { mutate, isPending: isSearchPending } = useMutation({
    mutationFn: async (class_code: string) => getClassCourseDetails(class_code),
    onSuccess: (data) => {
      console.log("Class data", data);
      setClassData(data?.data);
      form.reset(data?.data);
      setUploadFile(data?.data?.class_schedule);
    },
    onError: (error) => {
      console.log("Error getting class data", error);
      toast.error(error.message || "Error getting class data");
    },
  });
  // console.log("classData of state", classData);
  const handleSearch = (class_code: string) => {
    if (class_code) {
      mutate(class_code);
    }
  };

  // * Mutation for updating class data
  const { mutate: UpdateMutate, isPending: UpdateIsPending } = useMutation({
    mutationFn: async ({
      class_code,
      classData,
    }: {
      class_code: string;
      classData: z.infer<typeof zodClassSchema>;
    }) => updateClass({ class_code, classData }),
    onSuccess: (data) => {
      console.log("Class data updated", data);
      toast.success("Class data updated successfully");
    },
    onError: (error) => {
      console.log("Error updating class data", error);
      toast.error(error.message || "Error updating class data");
    },
  });

  function onSubmit(values: z.infer<typeof zodClassSchema>) {
    console.log("Form values of Update class", values);
    if (!classCode) {
      toast.error("Please search for a class to update");
      return;
    }
    UpdateMutate({ class_code: classCode, classData: values });
  }

  // * mutation for deleting a class
  const { mutate: DeleteMutate, isPending: DeleteIsPending } = useMutation({
    mutationFn: async (class_code: string) => deleteClass(class_code),
    onSuccess: (data) => {
      console.log("Class data deleted", data);
      toast.success("Class data deleted successfully");
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      console.log("Error deleting class data", error);
      toast.error(error.message || "Error deleting class data");
    },
  });

  // * handel class delete
  const handleDelete = () => {
    if (!classCode) {
      toast.error("Please search for a class to delete");
      return;
    }
    DeleteMutate(classCode);
  };

  // generate a class code
  const generateClassCodeForUpdate = () => {
    const className = form.getValues("class_name");
    if (validateClassName(className)) {
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      const classCode = `${className}${randomNumber}`;
      form.setValue("class_code", classCode);
    } else {
      toast.error("Invalid class name format");
    }
  };
  // Watch for changes in the class name field
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "class_name" && value.class_name) {
        if (!validateClassName(value.class_name)) {
          form.setError("class_name", {
            type: "manual",
            message: "Invalid class name format",
          });
        } else {
          form.clearErrors("class_name");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onError = (err: Error | any) => {
    console.log("Error", err);
    toast.error("Error uploading file to the Cloud");
    toast.dismiss();
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    // setUploadFile(res.url);
    form.setValue("class_schedule", res.url);
    form.setValue("class_schedule_fileId", res.fileId);
    toast.dismiss();
    toast.success("File uploaded successfully");
  };
  const onUploadProgress = (progress: ProgressEvent) => {
    console.log("Progress", progress);
    toast.loading("Uploading file to the Cloud");
  };
  return (
    <Card className={"w-full m-3 mt-5"}>
      <CardHeader>
        <CardTitle className="text-md lg:text-lg font-semibold text-muted-foreground">
          Update Class
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"flex justify-between items-center gap-3"}>
          <Input
            onChange={(e) => setClassCode(e.target.value)}
            placeholder="Search by class code"
          />
          <div className={"flex justify-center items-center gap-2"}>
            <Button
              variant={"outline"}
              onClick={() => handleSearch(classCode)}
              disabled={isSearchPending}
            >
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
                    the class.
                  </DialogDescription>
                </DialogHeader>
                <div className={"flex justify-end gap-2"}>
                  <Button variant={"outline"} onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant={"destructive"} onClick={handleDelete}>
                    {DeleteIsPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Separator className={"w-full my-2"} />
        <div className={"w-full mt-3"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="class_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={"w-full p-2"}>
                <p className={"text-sm text-muted-foreground"}>
                  Class Name Should be in the following format
                </p>
                <p className={"text-sm text-muted-foreground font-semibold"}>
                  G1AClass
                </p>
                <Separator className={"my-2"} />
                <div className={"text-sm text-muted-foreground"}>
                  <p>G: Grade</p>
                  <p>1: Section</p>
                  <p>A: Class</p>
                  <p>Class: prefix</p>
                </div>
              </div>
              <FormField
                control={form.control}
                name="class_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Code</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} disabled={true} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size={"sm"}
                variant={"secondary"}
                type={"button"}
                onClick={generateClassCodeForUpdate}
              >
                Generate
              </Button>
              <FormField
                control={form.control}
                name="instructor_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor Id</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`course_codes.${index}.course_code`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Code</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
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
              <div>
                <Button
                  type="button"
                  size={"sm"}
                  variant={"secondary"}
                  onClick={() => append({ course_code: "" })}
                >
                  Add Course Code
                </Button>
              </div>
              <div
                className={
                  "w-full h-auto border rounded p-2 shadow-sm flex justify-between items-center"
                }
              >
                <p className={"text-muted-foreground text-sm font-normal"}>
                  Class schedule (PDF or DOCX) only
                </p>
                <CloudUpload
                  className={"size-auto cursor-pointer"}
                  onClick={() => UploadRef?.current?.click()}
                />
              </div>
              {/* file preview */}
              {uploadFile && (
                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    overflow: "auto",
                  }}
                >
                  {uploadFile && uploadFile.endsWith(".pdf") && (
                    <Worker
                      workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
                    >
                      <Viewer fileUrl={uploadFile} />
                    </Worker>
                  )}
                  {uploadFile &&
                    (uploadFile.endsWith(".docx") ||
                      uploadFile.endsWith(".doc")) && (
                      <DocViewer
                        documents={[{ uri: uploadFile }]}
                        pluginRenderers={DocViewerRenderers}
                      />
                    )}
                </div>
              )}
              <Button type="submit" disabled={UpdateIsPending}>
                {UpdateIsPending ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>

      {/*  for image upload */}
      <IKUpload
        ref={UploadRef}
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        isPrivateFile={false}
        useUniqueFileName={true}
        validateFile={(file) => file.size < 5000000}
        folder={"/class/schedule"}
        className={"hidden"}
      />
    </Card>
  );
};

export default UpdateClass;
