/**
 * Document Upload Server Actions
 * 
 * Server-side actions for handling document uploads using React 19 Server Actions.
 * Processes files, validates them, and stores them securely.
 * 
 * Like a secure filing cabinet that organizes all your important papers!
 */

"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import crypto from "crypto";

// Document categories for organization
export type DocumentCategory = 
  | "enrollment"
  | "medical"
  | "emergency"
  | "authorization"
  | "financial"
  | "other";

// Validation schema for file metadata
const FileMetadataSchema = z.object({
  // File information
  name: z.string().min(1, "File name is required"),
  size: z.number().max(10 * 1024 * 1024, "File size must be less than 10MB"),
  type: z.string(),
  
  // Document metadata
  category: z.enum([
    "enrollment",
    "medical", 
    "emergency",
    "authorization",
    "financial",
    "other"
  ]),
  
  // Child information
  childId: z.string().uuid().optional(),
  childName: z.string().min(1).optional(),
  
  // Additional notes
  notes: z.string().max(500).optional(),
  
  // Expiration date for time-sensitive documents
  expiresAt: z.string().datetime().optional(),
});

// Validation schema for document upload
const DocumentUploadSchema = z.object({
  files: z.array(FileMetadataSchema).min(1, "At least one file is required"),
  parentId: z.string().uuid(),
  uploadedBy: z.string().email(),
});

// Types for our document system
export type FileMetadata = z.infer<typeof FileMetadataSchema>;
export type DocumentUpload = z.infer<typeof DocumentUploadSchema>;

export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  category: DocumentCategory;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
  childId?: string;
  childName?: string;
  notes?: string;
  expiresAt?: string;
  status: "pending" | "approved" | "rejected";
}

export interface UploadResult {
  success: boolean;
  message: string;
  documents?: UploadedDocument[];
  errors?: Record<string, string[]>;
}

/**
 * Simulated database for documents (in production, use Supabase)
 */
const documentsDb = new Map<string, UploadedDocument>();

/**
 * Generate a unique document ID
 */
function generateDocumentId(): string {
  return crypto.randomUUID();
}

/**
 * Validate file type based on category
 */
function isValidFileType(type: string, category: DocumentCategory): boolean {
  const allowedTypes: Record<DocumentCategory, string[]> = {
    enrollment: ["application/pdf", "image/jpeg", "image/png"],
    medical: ["application/pdf", "image/jpeg", "image/png"],
    emergency: ["application/pdf", "image/jpeg", "image/png"],
    authorization: ["application/pdf"],
    financial: ["application/pdf", "image/jpeg", "image/png"],
    other: ["application/pdf", "image/jpeg", "image/png", "application/msword"],
  };
  
  return allowedTypes[category]?.includes(type) ?? false;
}

/**
 * Upload documents Server Action
 * Processes and stores documents securely
 */
export async function uploadDocuments(
  formData: FormData
): Promise<UploadResult> {
  try {
    // Simulate authentication check (in production, verify session)
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session");
    
    if (!sessionToken) {
      return {
        success: false,
        message: "You must be logged in to upload documents",
      };
    }
    
    // Extract files and metadata from FormData
    const files: FileMetadata[] = [];
    const parentId = formData.get("parentId") as string;
    const uploadedBy = formData.get("uploadedBy") as string;
    
    // Process each file
    for (let i = 0; ; i++) {
      const file = formData.get(`file-${i}`) as File | null;
      if (!file) break;
      
      const category = formData.get(`category-${i}`) as DocumentCategory;
      const childId = formData.get(`childId-${i}`) as string | null;
      const childName = formData.get(`childName-${i}`) as string | null;
      const notes = formData.get(`notes-${i}`) as string | null;
      const expiresAt = formData.get(`expiresAt-${i}`) as string | null;
      
      // Validate file type
      if (!isValidFileType(file.type, category)) {
        return {
          success: false,
          message: `Invalid file type for ${file.name}. Category ${category} does not accept ${file.type} files.`,
        };
      }
      
      files.push({
        name: file.name,
        size: file.size,
        type: file.type,
        category,
        childId: childId || undefined,
        childName: childName || undefined,
        notes: notes || undefined,
        expiresAt: expiresAt || undefined,
      });
    }
    
    // Validate the upload data
    const validationResult = DocumentUploadSchema.safeParse({
      files,
      parentId,
      uploadedBy,
    });
    
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }
    
    // Process and store documents
    const uploadedDocuments: UploadedDocument[] = [];
    
    for (const fileMetadata of files) {
      // In production, upload to Supabase Storage or S3
      // For now, we'll simulate the upload
      const documentId = generateDocumentId();
      const document: UploadedDocument = {
        id: documentId,
        name: fileMetadata.name,
        size: fileMetadata.size,
        type: fileMetadata.type,
        category: fileMetadata.category,
        uploadedAt: new Date().toISOString(),
        uploadedBy,
        url: `/documents/${documentId}/${fileMetadata.name}`,
        childId: fileMetadata.childId,
        childName: fileMetadata.childName,
        notes: fileMetadata.notes,
        expiresAt: fileMetadata.expiresAt,
        status: "pending",
      };
      
      // Store in our simulated database
      documentsDb.set(documentId, document);
      uploadedDocuments.push(document);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Revalidate the documents page
    revalidatePath("/portal/documents");
    
    return {
      success: true,
      message: `Successfully uploaded ${uploadedDocuments.length} document(s)`,
      documents: uploadedDocuments,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      message: "An error occurred while uploading documents",
    };
  }
}

/**
 * Get user's documents Server Action
 */
export async function getUserDocuments(
  parentId: string
): Promise<UploadedDocument[]> {
  // Simulate fetching from database
  const documents = Array.from(documentsDb.values()).filter(
    doc => doc.uploadedBy === parentId
  );
  
  // Sort by upload date (newest first)
  return documents.sort((a, b) => 
    new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
}

/**
 * Delete document Server Action
 */
export async function deleteDocument(
  documentId: string
): Promise<UploadResult> {
  try {
    // Check if document exists
    const document = documentsDb.get(documentId);
    
    if (!document) {
      return {
        success: false,
        message: "Document not found",
      };
    }
    
    // In production, verify user has permission to delete
    // Delete from storage and database
    documentsDb.delete(documentId);
    
    // Revalidate the documents page
    revalidatePath("/portal/documents");
    
    return {
      success: true,
      message: "Document deleted successfully",
    };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      success: false,
      message: "An error occurred while deleting the document",
    };
  }
}

/**
 * Update document status Server Action (for admin use)
 */
export async function updateDocumentStatus(
  documentId: string,
  status: "approved" | "rejected",
  adminNotes?: string
): Promise<UploadResult> {
  try {
    const document = documentsDb.get(documentId);
    
    if (!document) {
      return {
        success: false,
        message: "Document not found",
      };
    }
    
    // Update document status
    document.status = status;
    if (adminNotes) {
      document.notes = `${document.notes || ""}\n[Admin]: ${adminNotes}`;
    }
    
    documentsDb.set(documentId, document);
    
    // Revalidate the documents page
    revalidatePath("/portal/documents");
    
    return {
      success: true,
      message: `Document ${status} successfully`,
      documents: [document],
    };
  } catch (error) {
    console.error("Status update error:", error);
    return {
      success: false,
      message: "An error occurred while updating document status",
    };
  }
}