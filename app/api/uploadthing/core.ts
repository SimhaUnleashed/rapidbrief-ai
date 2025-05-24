import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter, UploadThingError } from "uploadthing/server";

const f = createUploadthing();
export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "32MB" } }).middleware(async ({ req }) => {
        const user = await currentUser();
        if (!user) {
            throw new UploadThingError("Unauthorized");
        }
        return { userId: user.id };
    }).onUploadComplete(async ({ metadata, file }:any) => {
        console.log("Upload complete for userId:", metadata.userId);
        console.log("File URL:", file.url);
        return {userId:metadata.userId,file}
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter;