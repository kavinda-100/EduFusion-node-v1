import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { zodClassSchema } from "@shared/zod/class/class";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CloudUpload } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { IKUpload } from "imagekitio-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createClass } from "@/api/class.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { validateClassName } from "@/lib/utils.ts";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const CreateClass = () => {
  const UploadRef = useRef<any | null>(null);
  const [uploadFile, setUploadFile] = React.useState<string | null>(null);

  // * server request for creating a class
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof zodClassSchema>) =>
      createClass(data),
    onError: (error) => {
      console.log("Error", error);
      toast.error(error.message || "Error creating class");
    },
    onSuccess: (data) => {
      console.log("Class created successfully", data);
      toast.success("Class created successfully");
    },
  });

  const form = useForm<z.infer<typeof zodClassSchema>>({
    resolver: zodResolver(zodClassSchema),
    defaultValues: {
      class_code: undefined,
      class_name: undefined,
      class_schedule: undefined,
      class_schedule_fileId: undefined,
      instructor_id: undefined,
      course_codes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "course_codes",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof zodClassSchema>) {
    console.log(values);
    mutate(values);
  }

  // generate a class code
  const generateClassCode = () => {
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
    setUploadFile(res.url);
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
    <Card className={"w-full m-3"}>
      <CardHeader>
        <CardTitle className="text-md lg:text-lg font-semibold text-muted-foreground">
          Create Class
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                  <FormDescription>
                    <p className={"text-sm text-muted-foreground"}>
                      Class Name Should be in the following format
                    </p>
                    <p
                      className={"text-sm text-muted-foreground font-semibold"}
                    >
                      G1AClass
                    </p>
                    <Separator className={"my-2"} />
                    <div className={"text-sm text-muted-foreground"}>
                      <p>G: Grade</p>
                      <p>1: Section</p>
                      <p>A: Class</p>
                      <p>Class: prefix</p>
                    </div>
                  </FormDescription>
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
              onClick={generateClassCode}
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
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
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

export default CreateClass;
