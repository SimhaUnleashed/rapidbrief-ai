"use server"

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdf } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PDFSummaryType {
    userId?:string,
    fileUrl:string,
    summary:string,
    title:string,
    fileName:string
}

export async function generatePdfSummary(uploadResponse: [{serverData:{
    userId:string,
    file:{
        url:string,
        name:string
    }
}}]) {
    if(!uploadResponse){
        return{
            success:false,
            message:"File Upload Failed",
            data:null,
        }
    }

    const{
        serverData:{
            userId,
            file:{url:pdfUrl,name:fileName}
        }
    } = uploadResponse[0];

    if(!pdfUrl){
        return{
            success:false,
            message:"File Upload Failed",
            data:null,
        }
    }

    try{
        const pdfText = await fetchAndExtractPdf(pdfUrl);
        //console.log(pdfText)
        let summary;
        try{
            summary = await generateSummaryFromGemini(pdfText);
            console.log(summary);
        }
        catch(error){
            console.log(error);
            //call gemini
            if(error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED"){
                try{
                    summary = await generateSummaryFromGemini(pdfText);
                }
                catch(error){
                    console.log(error);
                    return{
                        success:false,
                        message:"GEMINI API Failed",
                        data:null,
                    }
                }
            }
        }
        if(!summary){
            return{
                success:false,
                message:"Failed to generate summary",
                data:null,
            }
        }
        const formattedFileName = formatFileNameAsTitle(fileName);
        return{
            success:true,
            message:"Summary generated successfully",
            data:{
                title:formattedFileName,
                summary
            }
        }
    }catch(error){
        return{
            success:false,
            message:"File Upload Failed",
            data:null,
        }
    }
}

async function savePdfSummary({userId,fileUrl,summary,title,fileName}:PDFSummaryType){
//sql inserting pdf summary
try{
    const sql = await getDbConnection();
    const result = await sql`INSERT INTO pdf_summaries (user_id,original_file_url,summary_text,title,file_name) VALUES (${userId},${fileUrl},${summary},${title},${fileName}) RETURNING id,summary_text`;
    return result;
    // return{
    //     id,userId,fileUrl,summary,title,fileName}
    
}
catch(error){
    console.error("Error saving PDF Summary",error);
    throw error;
}
}

export async function storedPdfSummaryAction({
        userId,
        fileUrl,
        summary,
        title,
        fileName
    }:PDFSummaryType){
    let savedSummary;
try{
    const {userId} = await auth();
    if(!userId){
        return{
            success:false,
            message:"User not found",
            data:null
        }
    }
    savedSummary = await savePdfSummary({
        userId,
        fileUrl,
        summary,
        title,
        fileName
    });

    console.log("savedSummary is",savedSummary);
    if(!savedSummary){
        return{
            success:false,
            message:"Failed to save PDF Summary, please try again",
            data:null
        }
    }
    //Revalidate our cache
revalidatePath(`/summaries/${savedSummary.id}`);
return{
        success:true,
        message:"Summary saved successfully",
        data:savedSummary
    }
}
catch(error){
    return{
        success:false,
        message:error instanceof Error? error.message:"Error saving summary",
        data:null
    }
}


}