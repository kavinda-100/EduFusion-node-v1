import {useNavigate, useParams} from "react-router-dom";
import {generateSingleFakeAnnouncement} from "@/lib/data.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, Trash} from "lucide-react";
import {useState} from "react";


const ViewSingleAnnouncement = () => {
    const { coursecode } = useParams()
    console.log(coursecode)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    //* simulating getting the data from the server
    const FakeAnnouncement = generateSingleFakeAnnouncement();

    const cancelDelete = () => {
        setOpen(false)
    }

    //* mutation to delete the announcement
    // const handleDelete = () => {}

    return (
        <Card className={"max-w-[800px]"}>
            <CardHeader>
                <CardTitle>
                    Announcement for <span className={"text-muted-foreground"}>{FakeAnnouncement.courseCode}</span>
                </CardTitle>
                <CardDescription>
                    Posted by <span className={"text-muted-foreground"}>{FakeAnnouncement.userName}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className={"text-pretty"}>
                    {FakeAnnouncement.subject}
                </p>
            </CardContent>
            <CardFooter className={"flex gap-3 justify-start items-center"}>
                <Button variant={"secondary"} onClick={() => navigate(-1)}><ArrowLeft /> Go Back</Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                <Button variant={"destructive"}><Trash className={"size-4"}/> Delete</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Announcement</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this announcement?
                            </DialogDescription>
                        </DialogHeader>
                        <div className={"flex gap-3 justify-end"}>
                            <Button variant={"secondary"} onClick={cancelDelete}>Cancel</Button>
                            <Button variant={"destructive"}>Delete</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};

export default ViewSingleAnnouncement;