/**
 * Document Portal Page
 * 
 * Parent portal for uploading and managing enrollment documents.
 * Uses React 19 Server Actions for secure file handling.
 * 
 * Like a digital office where parents can submit all their paperwork!
 */

import { Suspense } from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentUpload } from "@/components/portal/document-upload";
import { DocumentList } from "@/components/portal/document-list";
import { getUserDocuments } from "@/app/actions/documents";
import { 
  FileText, 
  Upload, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Page metadata
export const metadata: Metadata = {
  title: "Document Portal | Great Beginnings Day Care",
  description: "Upload and manage enrollment documents securely",
};

/**
 * Loading skeleton for documents
 */
function DocumentsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-lg border p-4 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Document List Server Component
 */
async function DocumentListServer({ parentId }: { parentId: string }) {
  const documents = await getUserDocuments(parentId);
  
  return <DocumentList documents={documents} />;
}

/**
 * Main Document Portal Page
 */
export default function DocumentPortalPage() {
  // In production, get this from authentication
  const parentId = "550e8400-e29b-41d4-a716-446655440000"; // Mock UUID
  const parentEmail = "parent@example.com";
  
  // Mock children data (in production, fetch from database)
  const children = [
    { id: "child-1", name: "Emma Johnson" },
    { id: "child-2", name: "Liam Johnson" },
  ];
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Document Portal
              </h1>
              <p className="text-gray-600 mt-1">
                Upload and manage your enrollment documents
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Secure & Encrypted</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">
                  Required Documents
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Please upload all required enrollment documents before your start date
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900">
                  Quick Review
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Documents are typically reviewed within 24-48 hours
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-900">
                  Expiration Alerts
                </h3>
                <p className="text-sm text-purple-700 mt-1">
                  We'll notify you when documents need updating
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for Upload and Documents */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Documents
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              My Documents
            </TabsTrigger>
          </TabsList>
          
          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Upload New Documents
              </h2>
              <DocumentUpload
                parentId={parentId}
                parentEmail={parentEmail}
                children={children}
                onUploadComplete={() => {
                  // Could trigger a refresh or show a success message
                  console.log("Upload complete!");
                }}
              />
            </div>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Your Documents
                </h2>
                <button className="text-sm text-primary hover:underline">
                  Refresh
                </button>
              </div>
              
              <Suspense fallback={<DocumentsLoading />}>
                <DocumentListServer parentId={parentId} />
              </Suspense>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Help Section */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-1">
                Acceptable File Types
              </h4>
              <p className="text-gray-600">
                PDF, JPG, PNG files up to 10MB each
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-1">
                Document Categories
              </h4>
              <p className="text-gray-600">
                Enrollment, Medical, Emergency, Authorization, Financial
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-1">
                Review Process
              </h4>
              <p className="text-gray-600">
                Documents are reviewed by our admin team within 24-48 hours
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-1">
                Contact Support
              </h4>
              <p className="text-gray-600">
                Email us at documents@greatbeginningsdaycare.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}