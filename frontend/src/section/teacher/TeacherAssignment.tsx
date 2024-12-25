import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {zodAssignmentSchema} from "@shared/zod/courseActivities/assignment.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {CalendarIcon, UploadCloud} from "lucide-react";
import {cn, generateIDs} from "@/lib/utils.ts";
import {IKUpload} from "imagekitio-react";
import React, {useEffect} from "react";
import {useUploadFileToCloud} from "@/hooks/useUplaodFileToCloud.ts";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import ReservedAssignments from "@/section/teacher/ReservedAssignments.tsx";


const TeacherAssignment = () => {
    const {fileId, file, onFileUploadSuccess, onFileUploadError, onFileUploadProgress} = useUploadFileToCloud()
    const fileRef = React.useRef<any | null>(null)
    const [courseCodes, setCourseCodes] = React.useState<string[]>(["EEI4366", "EEY4189", "EEI4369"])//TODO: get course code from db and set it here

    const form = useForm<z.infer<typeof zodAssignmentSchema>>({
        resolver: zodResolver(zodAssignmentSchema),
        defaultValues: {
            assignment_id: undefined,
            course_code: undefined,
            instructor_id: undefined, //TODO: get instructor id from db and set it here
            assignment_title: undefined,
            assignment_description: undefined,
            due_date: undefined,
            assigment_url: undefined,
            assignment_url_fileId: undefined,
        },
    })

    const courseCode = form.watch("course_code")
    useEffect(() => {
        if(courseCode){
            const id = generateIDs(10, courseCode)
            form.setValue("assignment_id", id)
        }
    }, [form, courseCodes, courseCode]);
    

    useEffect(() => {
        if(file){
            form.setValue("assigment_url", file)
        }
        if(fileId){
            form.setValue("assignment_url_fileId", fileId)
        }
    }, [file, fileId, form]);

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof zodAssignmentSchema>) {
        console.log(values)
    }
    return (
        <>
        <Card className={"max-w-[800px]"}>
            <CardHeader>
                <CardTitle>Create Assignments</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="assignment_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Assignment ID
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Auto Genrate" {...field} disabled={true}/>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a course code" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                courseCodes.map((courseCode, index) => (
                                                    <SelectItem key={index} value={courseCode.toLowerCase()}>{courseCode}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instructor_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Instructor ID
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="t123456" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="assignment_title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Assignment Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="assignment_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Assignment Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="due_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>
                                        Due Date
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
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
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Select the Due Date for the Assignment
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className={"w-full p-2 border rounded-md flex justify-between items-center cursor-pointer"} onClick={() => fileRef?.current?.click()}>
                            <p className={"text-muted-foreground text-sm"}>
                                upload assignment file (PDF or DOCX)
                            </p>
                            <UploadCloud className={"size-5"} />
                        </div>
                        {/* file preview */}
                        {file && (
                            <div
                                style={{
                                    width: "100%",
                                    height: "250px",
                                    overflow: "auto",
                                }}
                            >
                                {file && file.endsWith(".pdf") && (
                                    <Worker
                                        workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
                                    >
                                        <Viewer fileUrl={file} />
                                    </Worker>
                                )}
                                {file &&
                                    (file.endsWith(".docx") ||
                                        file.endsWith(".doc")) && (
                                        <DocViewer
                                            documents={[{ uri: file }]}
                                            pluginRenderers={DocViewerRenderers}
                                        />
                                    )}
                            </div>
                        )}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
            <IKUpload
                ref={fileRef}
                onError={onFileUploadError}
                onSuccess={onFileUploadSuccess}
                onUploadProgress={onFileUploadProgress}
                isPrivateFile={false}
                useUniqueFileName={true}
                validateFile={(file) => file.size < 5000000}
                folder={"/course/assignments"}
                className={"hidden"}
            />
        </Card>
        {/* reserved assignments*/}
        <ReservedAssignments />
        </>
    );
};

export default TeacherAssignment;