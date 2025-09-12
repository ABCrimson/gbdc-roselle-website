/**
 * Document Upload Component
 * 
 * Beautiful drag-and-drop document upload interface using react-dropzone.
 * Features file validation, preview, and progress tracking.
 * 
 * Like a magical inbox where you can drop your important papers!
 */

"use client";

import { useState, useCallback } from "react";
import { useFormStatus } from "react-dom";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Image,
  Loader2,
  Plus,
  Trash2,
  Eye
} from "lucide-react";
import { uploadDocuments, type DocumentCategory } from "@/app/actions/documents";
import { cn } from "@/lib/utils";

// File type configurations
const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Document categories with colors and icons
const DOCUMENT_CATEGORIES: {
  value: DocumentCategory;
  label: string;
  description: string;
  color: string;
  required?: boolean;
}[] = [
  {
    value: "enrollment",
    label: "Enrollment Forms",
    description: "Application and registration documents",
    color: "text-blue-600 bg-blue-100",
    required: true,
  },
  {
    value: "medical",
    label: "Medical Records",
    description: "Immunizations, health forms, allergies",
    color: "text-green-600 bg-green-100",
    required: true,
  },
  {
    value: "emergency",
    label: "Emergency Contacts",
    description: "Emergency contact information",
    color: "text-red-600 bg-red-100",
    required: true,
  },
  {
    value: "authorization",
    label: "Authorization Forms",
    description: "Pick-up authorization, photo release",
    color: "text-purple-600 bg-purple-100",
  },
  {
    value: "financial",
    label: "Financial Documents",
    description: "Payment information, receipts",
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    value: "other",
    label: "Other Documents",
    description: "Any other relevant documents",
    color: "text-gray-600 bg-gray-100",
  },
];

// File upload item interface
interface FileUploadItem {
  file: File;
  category: DocumentCategory;
  childName?: string;
  notes?: string;
  preview?: string;
  id: string;
}

// Props for the component
interface DocumentUploadProps {
  parentId: string;
  parentEmail: string;
  children?: Array<{ id: string; name: string }>;
  onUploadComplete?: () => void;
}

/**
 * Submit Button Component with loading state
 */
function SubmitButton({ fileCount }: { fileCount: number }) {
  const { pending } = useFormStatus();
  
  return (
    <motion.button
      type="submit"
      disabled={pending || fileCount === 0}
      className={cn(
        "px-6 py-3 rounded-lg font-semibold transition-all",
        "flex items-center gap-2",
        pending || fileCount === 0
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
      whileHover={!pending && fileCount > 0 ? { scale: 1.02 } : {}}
      whileTap={!pending && fileCount > 0 ? { scale: 0.98 } : {}}
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Uploading...
        </>
      ) : (
        <>
          <Upload className="w-5 h-5" />
          Upload {fileCount} {fileCount === 1 ? "Document" : "Documents"}
        </>
      )}
    </motion.button>
  );
}

/**
 * Main Document Upload Component
 */
export function DocumentUpload({
  parentId,
  parentEmail,
  children = [],
  onUploadComplete,
}: DocumentUploadProps) {
  // State for managing files
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [uploadResult, setUploadResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  
  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileUploadItem[] = acceptedFiles.map(file => ({
      file,
      category: "other" as DocumentCategory,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith("image/") 
        ? URL.createObjectURL(file) 
        : undefined,
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    setUploadResult(null);
  }, []);
  
  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });
  
  // Remove file from list
  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };
  
  // Update file metadata
  const updateFile = (
    id: string, 
    updates: Partial<FileUploadItem>
  ) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, ...updates } : f
    ));
  };
  
  // Handle form submission
  async function handleSubmit(formData: FormData) {
    try {
      // Add parent information
      formData.append("parentId", parentId);
      formData.append("uploadedBy", parentEmail);
      
      // Add each file with metadata
      files.forEach((item, index) => {
        formData.append(`file-${index}`, item.file);
        formData.append(`category-${index}`, item.category);
        if (item.childName) {
          formData.append(`childName-${index}`, item.childName);
        }
        if (item.notes) {
          formData.append(`notes-${index}`, item.notes);
        }
      });
      
      // Call the Server Action
      const result = await uploadDocuments(formData);
      
      if (result.success) {
        setUploadResult({
          type: "success",
          message: result.message,
        });
        setFiles([]); // Clear files on success
        onUploadComplete?.();
      } else {
        setUploadResult({
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      setUploadResult({
        type: "error",
        message: "An unexpected error occurred",
      });
    }
  }
  
  // Get icon for file type
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    return FileText;
  };
  
  return (
    <div className="space-y-6">
      {/* Upload Result Alert */}
      <AnimatePresence>
        {uploadResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "p-4 rounded-lg flex items-center gap-3",
              uploadResult.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            )}
          >
            {uploadResult.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="flex-1">{uploadResult.message}</span>
            <button
              onClick={() => setUploadResult(null)}
              className="p-1 hover:bg-white/50 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
          isDragActive && !isDragReject && "border-primary bg-primary/5",
          isDragReject && "border-red-500 bg-red-50",
          !isDragActive && "border-gray-300 hover:border-gray-400 bg-gray-50/50"
        )}
      >
        <input {...getInputProps()} />
        
        <motion.div
          animate={{
            scale: isDragActive ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          
          {isDragActive && !isDragReject ? (
            <p className="text-lg font-semibold text-primary">
              Drop your files here...
            </p>
          ) : isDragReject ? (
            <p className="text-lg font-semibold text-red-500">
              Some files are not accepted
            </p>
          ) : (
            <>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Drag & drop documents here
              </p>
              <p className="text-sm text-gray-500">
                or click to browse from your computer
              </p>
            </>
          )}
          
          <p className="text-xs text-gray-400 mt-4">
            Accepted: PDF, JPG, PNG • Max size: 10MB per file
          </p>
        </motion.div>
      </div>
      
      {/* Files List */}
      {files.length > 0 && (
        <form action={handleSubmit} className="space-y-4">
          <h3 className="font-semibold text-lg">
            Documents to Upload ({files.length})
          </h3>
          
          <div className="space-y-3">
            <AnimatePresence>
              {files.map((item) => {
                const Icon = getFileIcon(item.file.type);
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-lg border p-4 space-y-3"
                  >
                    {/* File Info Row */}
                    <div className="flex items-start gap-3">
                      {/* File Preview or Icon */}
                      {item.preview ? (
                        <img
                          src={item.preview}
                          alt={item.file.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <Icon className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                      
                      {/* File Details */}
                      <div className="flex-1">
                        <p className="font-medium text-sm truncate">
                          {item.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(item.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFile(item.id)}
                        className="p-1 hover:bg-red-50 rounded text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Metadata Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Category Selection */}
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-1 block">
                          Document Category *
                        </label>
                        <select
                          value={item.category}
                          onChange={(e) => updateFile(item.id, {
                            category: e.target.value as DocumentCategory
                          })}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          {DOCUMENT_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Child Selection (if applicable) */}
                      {children.length > 0 && (
                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1 block">
                            Child (Optional)
                          </label>
                          <select
                            value={item.childName || ""}
                            onChange={(e) => updateFile(item.id, {
                              childName: e.target.value
                            })}
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select a child</option>
                            {children.map(child => (
                              <option key={child.id} value={child.name}>
                                {child.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    
                    {/* Notes Field */}
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">
                        Notes (Optional)
                      </label>
                      <input
                        type="text"
                        value={item.notes || ""}
                        onChange={(e) => updateFile(item.id, {
                          notes: e.target.value
                        })}
                        placeholder="Add any relevant notes..."
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setFiles([])}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear All
            </button>
            <SubmitButton fileCount={files.length} />
          </div>
        </form>
      )}
      
      {/* Required Documents Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">
          Required Documents for Enrollment
        </h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Completed enrollment application
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Child's immunization records
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Emergency contact information
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Medical history and allergy information
          </li>
        </ul>
      </div>
    </div>
  );
}