import { z } from "zod";

export interface SearchMatchApi {
    match: {
        start: number;
        end: number;
    };
    context: string;
}

export const noteSchema = z.object({
    tags: z.array(z.string()).optional(),
    frontmatter: z.record(z.unknown()).optional(),
    stat: z.object({
        ctime: z.number(),
        mtime: z.number(),
        size: z.number(),
    }).nullable().optional(),
    path: z.string(),
    content: z.string().nullable().optional(),
});

export type NoteContent = z.infer<typeof noteSchema>;

export const isValidNote = (note: unknown): note is NoteContent => {
    return noteSchema.safeParse(note).success;
};

export const fileSchema = z.object({
    path: z.string(),
    content: z.string().nullable().optional(),
    stat: z.object({
        ctime: z.number(),
        mtime: z.number(),
        size: z.number(),
    }).nullable().optional()
});

export type FileContent = z.infer<typeof fileSchema>;

export const isValidFile = (file: unknown): file is FileContent => {
    return fileSchema.safeParse(file).success;
};

export interface ResultNoteApi {
    filename: string;
    matches: SearchMatchApi[];
    score: number;
}

export interface ResultNoteSearchApi {
    filename: string;
    result: boolean;
}

export interface ServerInfo {
    authenticated: boolean;
    ok: boolean;
    service: string;
    versions: {
        obsidian: string;
        self: string;
    };
}

export interface Command {
    id: string;
    name: string;
}

export interface PatchContent {
    content: string;
    line: number;
}

/*
export interface NoteHierarchy {
    path: string;
    content: string;
    links: NoteHierarchy[];
}
*/

export const noteHierarchySchema = z.object({
    path: z.string(),
    content: z.string().nullable().optional(),
    links: z.lazy(() => z.array(noteHierarchySchema)).nullable().optional()
});

export type NoteHierarchy = z.infer<typeof noteHierarchySchema>;

export const isValidNoteHierarchy = (hierarchy: unknown): hierarchy is NoteHierarchy => {
    return noteHierarchySchema.safeParse(hierarchy).success;
};

export const searchKeywordSchema = z.object({
    query: z.string().min(1).describe("The keywords to search for"),
    options: z
        .object({
            vault: z.string().optional(),
            includeExcerpt: z.boolean().optional(),
            limit: z.number().optional(),
        })
        .optional(),
});

export type SearchKeyword = z.infer<typeof searchKeywordSchema>;

export function isSearchKeyword(obj: any): obj is SearchKeyword {
    return searchKeywordSchema.safeParse(obj).success;
}

export type QueryFormat = 'plaintext' | 'dataview' | 'jsonlogic';

export interface SearchOptions {
    contextLength?: number;
    ignoreCase?: boolean;
    searchIn?: string[] | null;
}

export interface SearchQuery {
    query?: string;
    queryFormat?: QueryFormat;
    options?: SearchOptions;
}

export const searchOptionsSchema = z.object({
    contextLength: z.number().optional(),
    ignoreCase: z.boolean().nullable().optional().default(true),
    searchIn: z.array(z.string()).nullable().optional().default([]),
});

export const searchQuerySchema = z.object({
    query: z.union([z.string(), z.record(z.unknown())]).describe("The query to search for"),
    queryFormat: z.enum(['plaintext', 'dataview', 'jsonlogic']).describe("The format of the query"),
    options: searchOptionsSchema.optional().describe("Search options"),
});

export const isSearchQuery = (obj: unknown): obj is SearchQuery => {
    return searchQuerySchema.safeParse(obj).success;
};
