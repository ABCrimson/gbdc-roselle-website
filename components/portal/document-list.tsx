/**
 * Document List Component
 * 
 * Displays uploaded documents with status indicators and management options.
 * Uses React 19 features for optimal performance.
 * 
 * Like a organized filing cabinet where you can see all your documents!
 */

"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Image, 
  Download, 
  Trash2, 
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Calendar,
  ChevronDown
} from "lucide-react";
import { deleteDocument, type UploadedDocument, type DocumentCategory } from "@/app/actions/documents";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Document status colors and icons
const STATUS_CONFIG = {
  pending: {
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    icon: Clock,
    label: "Pending Review"
  },
  approved: {
    color: "text-green-600 bg-green-50 border-green-200",
    icon: CheckCircle,
    label: "Approved"
  },
  rejected: {
    color: "text-red-600 bg-red-50 border-red-200",
    icon: XCircle,
    label: "Rejected"
  }
};

// Category colors
const CATEGORY_COLORS: Record<DocumentCategory, string> = {
  enrollment: "bg-blue-100 text-blue-700",
  medical: "bg-green-100 text-green-700",
  emergency: "bg-red-100 text-red-700",
  authorization: "bg-purple-100 text-purple-700",
  financial: "bg-yellow-100 text-yellow-700",
  other: "bg-gray-100 text-gray-700"
};

interface DocumentListProps {
  documents: UploadedDocument[];
  onRefresh?: () => void;
}

/**
 * Document Card Component
 */
function DocumentCard({ 
  document, 
  onDelete 
}: { 
  document: UploadedDocument;
  onDelete: () => void;
}) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [showDetails, setShowDetails] = useState(false);
  
  const statusConfig = STATUS_CONFIG[document.status];
  const StatusIcon = statusConfig.icon;
  
  // Get file icon based on type
  const FileIcon = document.type.startsWith("image/") ? Image : FileText;
  
  // Handle delete with transition
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this document?")) {
      startDeleteTransition(async () => {
        await deleteDocument(document.id);
        onDelete();
      });
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow",
        isDeleting && "opacity-50 pointer-events-none"
      )}
    >
      {/* Main Content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* File Icon */}
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
            <FileIcon className="w-5 h-5 text-gray-600" />
          </div>
          
          {/* Document Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">
              {document.name}
            </h4>
            
            {/* Metadata Row */}
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span>{formatFileSize(document.size)}</span>
              <span>•</span>
              <span>{format(new Date(document.uploadedAt), "MMM d, yyyy")}</span>
              {document.childName && (
                <>
                  <span>•</span>
                  <span className="font-medium">{document.childName}</span>
                </>
              )}
            </div>
            
            {/* Category and Status */}
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                CATEGORY_COLORS[document.category]
              )}>
                {document.category}
              </span>
              
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                statusConfig.color
              )}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
            </div>
            
            {/* Notes (if any) */}
            {document.notes && (
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                {document.notes}
              </p>
            )}
            
            {/* Expiration Warning */}
            {document.expiresAt && (
              <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                <AlertCircle className="w-3 h-3" />
                Expires {format(new Date(document.expiresAt), "MMM d, yyyy")}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="View details"
            >
              <ChevronDown className={cn(
                "w-4 h-4 text-gray-500 transition-transform",
                showDetails && "rotate-180"
              )} />
            </button>
            
            <a
              href={document.url}
              download
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4 text-gray-500" />
            </a>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Expanded Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t overflow-hidden"
          >
            <div className="p-4 bg-gray-50 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500">Document ID:</span>
                  <p className="font-mono text-xs mt-1">{document.id}</p>
                </div>
                <div>
                  <span className="text-gray-500">Uploaded by:</span>
                  <p className="mt-1">{document.uploadedBy}</p>
                </div>
                <div>
                  <span className="text-gray-500">Upload time:</span>
                  <p className="mt-1">
                    {format(new Date(document.uploadedAt), "h:mm a")}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">File type:</span>
                  <p className="mt-1">{document.type}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Main Document List Component
 */
export function DocumentList({ documents, onRefresh }: DocumentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  
  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.childName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Group documents by status
  const groupedDocuments = {
    pending: filteredDocuments.filter(d => d.status === "pending"),
    approved: filteredDocuments.filter(d => d.status === "approved"),
    rejected: filteredDocuments.filter(d => d.status === "rejected"),
  };
  
  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory | "all")}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            <option value="enrollment">Enrollment</option>
            <option value="medical">Medical</option>
            <option value="emergency">Emergency</option>
            <option value="authorization">Authorization</option>
            <option value="financial">Financial</option>
            <option value="other">Other</option>
          </select>
          
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-700">
                {groupedDocuments.pending.length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Approved</p>
              <p className="text-2xl font-bold text-green-700">
                {groupedDocuments.approved.length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Rejected</p>
              <p className="text-2xl font-bold text-red-700">
                {groupedDocuments.rejected.length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>
      
      {/* Documents List */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No documents found</p>
          <p className="text-sm text-gray-500 mt-1">
            {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
              ? "Try adjusting your filters"
              : "Upload your first document to get started"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredDocuments.map(document => (
              <DocumentCard
                key={document.id}
                document={document}
                onDelete={onRefresh || (() => {})}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}