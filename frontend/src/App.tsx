import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
    Home,
    Dashboard,
    LoadingPage,
    NotFound,
    Reports,
    Profile,
    ForgotPassword,
    Assignment,
} from "./pages";
import { MangeClass, MangeUser, ManageCourse } from "@/section/admin";
import { Announcements, LearnerSupport, LearnerSupportReply, ViewSingleAnnouncement } from "@/section/teacher";
import ProtectLayout from "@/layouts/ProtectLayout.tsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { setUser, logout } from "@/store/features/userSlice.ts";
import { getMe } from "@/api/auth.ts";
import EmailVerificationPage from "@/components/EmailVerificationPage.tsx";

const App = () => {
    const dispatch = useAppDispatch();
    const { user, isLoggedIn } = useAppSelector((state) => state.user);

    // get user data
    const { isLoading, data, isSuccess, isError, error } = useQuery({
        queryKey: ["authUser", "me"],
        queryFn: getMe,
    });
    //if loading, show loading
    if (isLoading) return <LoadingPage />;
    //if error, logout and redirect to login page
    if (isError) {
        console.log("error in fetching user data in App.tsx", error);
        dispatch(logout());
    }
    //if success, set user data in redux store
    if (isSuccess) {
        console.log("user data in App.tsx", data?.data);
        dispatch(setUser(data?.data?.data));
    }

    return (
        <Routes>
            {/* public routes */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verifying-email" element={<EmailVerificationPage />} />
            <Route path="*" element={<NotFound />} />
            <Route
                path="/"
                element={user && isLoggedIn ? <Navigate to={"/dashboard"} /> : <Home />}
            />
            {/*protected routes*/}
            <Route element={<ProtectLayout />}>
                {/*  common route ["admin", "teacher", "student"]*/}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/reports" element={<Reports />} />
                <Route path="/dashboard/profile" element={<Profile />} />
                <Route path="/dashboard/assignments" element={<Assignment />} />
                {/* route for admin */}
                <Route path="/dashboard/admin/manage-class" element={<MangeClass />} />
                <Route path="/dashboard/admin/manage-user" element={<MangeUser />} />
                <Route
                    path="/dashboard/admin/manage-course"
                    element={<ManageCourse />}
                />
                {/* route for teacher */}
                <Route path="/dashboard/announcements" element={<Announcements />} />
                <Route path="/dashboard/announcements/view/:coursecode" element={<ViewSingleAnnouncement />} />
                <Route path="/dashboard/learner-support" element={<LearnerSupport />} />
                <Route path="/dashboard/learner-support/reply/:username" element={<LearnerSupportReply />} />
            </Route>
        </Routes>
    );
};

export default App;

