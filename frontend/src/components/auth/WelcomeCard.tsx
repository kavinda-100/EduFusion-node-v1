import {ArrowRight, User} from "lucide-react";
import * as React from "react"

// import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import SignInForm from "@/form/SignInForm.tsx";

type WelcomeCardProps = {
    text: string
    role: "student" | "teacher" | "admin"
}

const WelcomeCard = ({text, role} : WelcomeCardProps) => {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    const [open, setOpen] = React.useState(false)
    const isDesktop = windowWidth > 768

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        // cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [windowWidth])

    // if Desktop
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div
                        className="w-full min-h-[140px] flex flex-col justify-start items-start border hover:border-violet-400 shadow rounded-md gap-3 p-5 cursor-pointer">
                        <User/>
                        <div className={"flex gap-3 mt-3 justify-start items-center"}>
                            <h1 className="text-xl font-semibold">{text}</h1>
                            <ArrowRight/>
                        </div>

                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                        <DialogDescription>
                            {text}
                        </DialogDescription>
                    </DialogHeader>
                    <SignInForm role={role} />
                </DialogContent>
            </Dialog>
        )
    }

    // if Mobile
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <div
                    className="w-full min-h-[140px] flex flex-col justify-start items-start border hover:border-violet-400 shadow rounded-md gap-3 p-5 cursor-pointer">
                    <User/>
                    <div className={"flex gap-3 mt-3 justify-start items-center"}>
                        <h1 className="text-xl font-semibold">{text}</h1>
                        <ArrowRight/>
                    </div>

                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Sign In</DrawerTitle>
                    <DrawerDescription>
                        {text}
                    </DrawerDescription>
                </DrawerHeader>
                <SignInForm role={role} className={"p-3"}/>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
};

export default WelcomeCard;

// function ProfileForm({ className }: React.ComponentProps<"form">) {
//     return (
//         <form className={cn("grid items-start gap-4", className)}>
//             <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input type="email" id="email" defaultValue="shadcn@example.com" />
//             </div>
//             <div className="grid gap-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input id="username" defaultValue="@shadcn" />
//             </div>
//             <Button type="submit">Save changes</Button>
//         </form>
//     )
// }