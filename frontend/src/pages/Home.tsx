import WelcomeCard from "@/components/auth/WelcomeCard.tsx";
import { ModeToggle } from "@/components/ModeToggle.tsx";
import { useTheme } from "@/components/ThemeProvider.tsx";

const Home = () => {
  const theme = useTheme();
  return (
    <main className="flex flex-col w-full max-w-[1500px] mx-auto">
      <div className={"h-[80px] p-2 flex justify-between items-center"}>
        <img
          src={theme.theme === "dark" ? "/dark_logo.svg" : "/light_logo.svg"}
          alt={"logo"}
          className={"w-auto h-12 object-cover"}
        />
        <ModeToggle />
      </div>

      <section
        className={
          "flex justify-center items-center h-[cal(100% - 80px)] mt-10 p-2"
        }
      >
        <div className={"flex flex-col gap-3 h-full w-full text-center"}>
          <h1
            className={
              "text-2xl lg:text-5xl text-pretty font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-800 to-violet-600/40 dark:bg-gradient-to-r dark:from-violet-600 dark:to-violet-300"
            }
          >
            Welcome!
          </h1>
          <h2
            className={
              "text-xl lg:text-3xl text-pretty font-semibold text-gray-700 dark:text-gray-300"
            }
          >
            Manage your classes, grades,and resources all in one place.
          </h2>
          <h3
            className={
              "text-lg lg:text-2xl text-pretty font-medium text-gray-600 dark:text-gray-400"
            }
          >
            Streamline your academic life! Access your schedule, assignments,
            and announcements with ease.
          </h3>
        </div>
      </section>
      {/*welcome cards*/}
      <section
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7 gap-3 p-2"
        }
      >
        <WelcomeCard text={"Sign In as Student"} role={"student"} />
        <WelcomeCard text={"Sign In as Teacher"} role={"teacher"} />
        <WelcomeCard text={"Sign In as Admin"} role={"admin"} />
      </section>
    </main>
  );
};

export default Home;
