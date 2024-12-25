import mongoose from "mongoose";
import {zodHelpWantedReplySchemaType} from "../../shared/zod/forum/helpWanted";

const helpWantedReplySchema = new mongoose.Schema<zodHelpWantedReplySchemaType>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    instructor_id: {type: String, required: true},
    username: {type: String, required: true},
});

const HelpWantedReplyModel = mongoose.model("Helpwantedreply", helpWantedReplySchema);

export default HelpWantedReplyModel;