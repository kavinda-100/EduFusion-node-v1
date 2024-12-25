import {useParams, useSearchParams} from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {zodHelpWantedReplySchema} from "@shared/zod/forum/helpWanted.ts";
import {Textarea} from "@/components/ui/textarea.tsx";


const LearnerSupportReply = () => {
    const { username } = useParams()
    let [searchParams] = useSearchParams();
    const subject = searchParams.get("subject");

    // 1. Define your form.
    const form = useForm<z.infer<typeof zodHelpWantedReplySchema>>({
        resolver: zodResolver(zodHelpWantedReplySchema),
        defaultValues: {
            instructor_id: undefined, //TODO: get the instructor id from the db
            title: undefined,
            description: undefined,
            username: username,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof zodHelpWantedReplySchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <>
            <Card className={"max-w-[700px] mb-6"}>
                <CardHeader>
                    <CardTitle className={"text-muted-foreground"}>Here is the content of the request</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={"text-pretty font-medium"}>{subject}</p>
                </CardContent>
            </Card>

        <Card className={"max-w-[700px]"}>
            <CardHeader>
                <CardTitle>Reply to <span className={"font-semibold text-muted-foreground"}>{username}</span></CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <Textarea placeholder="description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Reply</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </>
    );
};

export default LearnerSupportReply;