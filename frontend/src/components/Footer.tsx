import { useTheme } from "@/components/ThemeProvider.tsx";

const Footer = () => {
  const theme = useTheme();
  return (
    <footer className={"w-full h-auto bg-gray-100 dark:bg-gray-900  p-2"}>
      <div className={"w-full flex justify-between items-center"}>
        <img
          src={theme.theme === "dark" ? "/dark_logo.svg" : "/light_logo.svg"}
          alt={"footer-logo"}
          className={"w-auto h-10 object-cover"}
        />
        <p className={"font-medium capitalize"}>
          contact{" "}
          <span className={"font-semibold underline hover:cursor-pointer"}>
            edufusion.info.org
          </span>
        </p>
      </div>
      <div className={"w-full flex flex-col justify-center items-center"}>
        <p>EduFusion &copy; {new Date().getFullYear()}</p>
        <p className={"text-sm"}>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
