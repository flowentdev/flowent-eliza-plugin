import { searchAction } from "./actions/search";
import { listNotesAction } from "./actions/listNotes";
import { listAllFilesAction } from "./actions/vault";
import { listDirectoryAction } from "./actions/vaultDirectory";
import { createKnowledgeAction } from "./actions/createKnowledge";
import { noteTraversalAction } from "./actions/noteTraversal";
import {
    getActiveNoteAction,
    summarizeActiveNoteAction,
} from "./actions/activeNote";
import { getNoteAction } from "./actions/note";
import { readFileAction } from "./actions/file";
import { saveFileAction } from "./actions/saveFile";
import { openFileAction } from "./actions/openFile";
import { updateFileAction } from "./actions/updateFile";

export const obsidianPlugin = {
    name: "obsidian",
    description: "Integration with Obsidian vault using Omnisearch / Deep traversal search and memoryknowledge base",
    actions: [
        searchAction,
        listNotesAction,
        listAllFilesAction,
        listDirectoryAction,
        summarizeActiveNoteAction,
        getActiveNoteAction,
        getNoteAction,
        readFileAction,
        createKnowledgeAction,
        noteTraversalAction,
        saveFileAction,
        openFileAction,
        updateFileAction
    ],
    evaluators: [],
    services: [],
    providers: [],
};

export default obsidianPlugin;
