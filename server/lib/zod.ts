import {type ZodIssue} from "zod"

//return single string of an error message from zodIssue
export const zodIssueError = (issues: ZodIssue[]): string => {
    return issues.map((issue) => issue.message).join(", ");
}