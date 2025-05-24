"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "./UploadFormInput";
import { set, z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast, Toaster } from "sonner";
import {
  generatePdfSummary,
  storedPdfSummaryAction,
} from "@/actions/upload-actions";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("Uploaded successfully", res);
    },
    onUploadError: (err) => {
      console.log("error occurred while uploading", err);
      toast.error("Error occurred while uploading", {
        description: "Please try again",
      });
    },
    onUploadBegin: (file) => {
      console.log("upload has begun");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log("submitted");
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      //validate the form fields
      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);
      if (!validatedFields.success) {
        setIsLoading(false);
        console.log(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid File"
        );
        <Toaster richColors />;
        toast.error("Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        return;
      }
      toast.info("Uploading PDF...");
      //schema validation using zod
      //upload to uploadthing
      const res = await startUpload([file]);

      if (!res) {
        setIsLoading(false);
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        return;
      }

      toast.info("Please wait, our AI is reading through your document");
      //parse the pdf using lang chain
      let summary;
      if (res && res.length > 0) {
        summary = await generatePdfSummary([{ serverData: res[0].serverData }]);
        console.log("summary", summary);
      } else {
        console.error("No files uploaded.");
        toast.error("File upload failed. Please try again.");
        setIsLoading(false);
        return;
      }

      const { data = null, message = null } = summary;
      if (!data || !message) {
        setIsLoading(false);
        toast.error("Something went wrong", {
          description: "Please try again",
        });
        return;
      }
      if (data) {
        let storeResult;
        toast.success("Summary generated successfully");
        if (data.summary) {
          //save summary to database
          storeResult = await storedPdfSummaryAction({
              fileUrl: res[0]?.serverData?.file?.url,
              summary: data.summary,
              title: data.title,
            fileName: file.name,
          });

          console.log("storeResult", storeResult);

          toast.success("Summary saved successfully");
          formRef.current?.reset();
          setIsLoading(false);
          router.push(`/summaries/${storeResult.data![0].id}`);
        } else {
          toast.error("Something went wrong", {
            description: "Please try again",
          });
          setIsLoading(false);
        }
      }

      //summarize the pdf using AI
      //save the summary to the database
      //redirect to the summary page
    } catch (error) {
      console.error("Error occurred", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
      <>
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-muted-foreground text-sm">
              Processing
            </span>
          </div>
        </div>
        <LoadingSkeleton/>
      </>
      )};
    </div>
  );
}

export default UploadForm;
