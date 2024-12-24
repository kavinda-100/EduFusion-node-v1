import "dotenv/config";
/**
 * @description create console.log function that will print the message with prefix "Server:" and current date and time
 * @description example: Server: 2021-09-01 12:00:00: Hello World
 * @description only for development environment and in production environment it should not print anything
 * */

type customLogType = {
  message: string;
  data?: any | null;
  error?: Error | string | null;
};
export const customLog = ({ message, data, error }: customLogType) => {
  if (process.env.DEV_MODE === "development") {
    console.log(
      `Server: ${new Date().toISOString().split("T")[0]}: ${message} ${data ? data : ""} ${error ? error : ""}`,
    );
  }
};
