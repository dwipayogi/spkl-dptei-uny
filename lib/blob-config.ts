// This file contains the configuration for Vercel Blob
import { PutBlobResult } from "@vercel/blob";

// Define interface for document metadata
export interface DocumentMetadata {
  id?: number;
  title: string;
  description: string;
  category: string;
  url: string;
  filename: string;
  fileType: string;
  fileSize: number;
  uploadedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define interface for parsed document
export interface ParsedDocument extends DocumentMetadata {
  id: number;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
  categoryColor: string;
  formattedSize: string;
  formattedDate: string;
}

// Define interface for document upload response
export interface DocumentUploadResponse {
  success: boolean;
  document?: DocumentMetadata;
  error?: string;
}

// Define interface for document with blob information
export interface DocumentWithBlob extends DocumentMetadata {
  blob: PutBlobResult;
}

// Function to get category color based on category
export function getCategoryColor(category: string): string {
  const categories: Record<string, string> = {
    Panduan: "bg-blue-100 text-blue-800",
    Template: "bg-green-100 text-green-800",
    Checklist: "bg-yellow-100 text-yellow-800",
    SOP: "bg-purple-100 text-purple-800",
    Laporan: "bg-red-100 text-red-800",
    Manual: "bg-indigo-100 text-indigo-800",
    Form: "bg-pink-100 text-pink-800",
  };

  return categories[category] || "bg-gray-100 text-gray-800";
}

// Function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
}

// Function to format date
export function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const d = new Date(date);
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
}

// Function to parse document from database
export function parseDocument(doc: any): ParsedDocument {
  return {
    ...doc,
    id: doc.id,
    categoryColor: getCategoryColor(doc.category),
    formattedSize: formatFileSize(doc.fileSize),
    formattedDate: formatDate(doc.createdAt),
  };
}
