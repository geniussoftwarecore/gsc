import { ClientRequest, InsertClientRequest } from "@shared/schema";

// Helper interface for client requests
export interface ClientRequestWithService extends ClientRequest {
  serviceTitle?: string;
  userName?: string;
}

// In-memory storage for client requests (can be replaced with API calls later)
export let clientRequests: ClientRequest[] = [
  {
    id: "req-1",
    userId: "user-1",
    serviceId: "service-1",
    type: "request",
    title: "تطوير تطبيق جوال للتجارة الإلكترونية",
    description: "نحتاج إلى تطوير تطبيق جوال شامل للتجارة الإلكترونية يدعم الدفع الإلكتروني والإشعارات",
    attachments: [],
    status: "new",
    budget: "50000",
    timeline: "3 أشهر",
    serviceType: "mobile_app",
    createdAt: new Date("2024-08-10T10:00:00Z"),
    updatedAt: new Date("2024-08-10T10:00:00Z"),
  },
  {
    id: "req-2",
    userId: "user-2",
    serviceId: "service-2",
    type: "suggestion",
    title: "اقتراح تحسين واجهة المستخدم",
    description: "أقترح إضافة ميزة البحث المتقدم وتحسين تجربة المستخدم في الصفحة الرئيسية",
    attachments: [],
    status: "in-progress",
    budget: "15000",
    timeline: "شهر واحد",
    serviceType: "ui_ux",
    createdAt: new Date("2024-08-12T14:30:00Z"),
    updatedAt: new Date("2024-08-13T09:15:00Z"),
  }
];

// Helper functions for managing client requests
export const addClientRequest = (request: InsertClientRequest): ClientRequest => {
  const newRequest: ClientRequest = {
    id: `req-${Date.now()}`,
    userId: request.userId || null,
    serviceId: request.serviceId || null,
    type: request.type,
    title: request.title,
    description: request.description,
    attachments: request.attachments || null,
    status: request.status || "new",
    budget: request.budget || null,
    timeline: request.timeline || null,
    serviceType: request.serviceType || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  clientRequests.push(newRequest);
  return newRequest;
};

export const updateRequestStatus = (
  requestId: string, 
  status: "new" | "in-progress" | "answered"
): ClientRequest | null => {
  const requestIndex = clientRequests.findIndex(req => req.id === requestId);
  
  if (requestIndex === -1) {
    return null;
  }
  
  clientRequests[requestIndex] = {
    ...clientRequests[requestIndex],
    status,
    updatedAt: new Date(),
  };
  
  return clientRequests[requestIndex];
};

export const getRequestsByUserId = (userId: string): ClientRequest[] => {
  return clientRequests.filter(req => req.userId === userId);
};

export const getRequestsByStatus = (status: string): ClientRequest[] => {
  return clientRequests.filter(req => req.status === status);
};

export const getAllRequests = (): ClientRequest[] => {
  return [...clientRequests];
};

export const getRequestById = (requestId: string): ClientRequest | null => {
  return clientRequests.find(req => req.id === requestId) || null;
};

export const deleteRequest = (requestId: string): boolean => {
  const initialLength = clientRequests.length;
  clientRequests = clientRequests.filter(req => req.id !== requestId);
  return clientRequests.length < initialLength;
};

// Statistics helpers
export const getRequestStats = () => {
  const total = clientRequests.length;
  const newRequests = clientRequests.filter(req => req.status === "new").length;
  const inProgress = clientRequests.filter(req => req.status === "in-progress").length;
  const answered = clientRequests.filter(req => req.status === "answered").length;
  
  return {
    total,
    new: newRequests,
    inProgress,
    answered,
  };
};

// Get requests by type
export const getRequestsByType = (type: "request" | "suggestion" | "comment"): ClientRequest[] => {
  return clientRequests.filter(req => req.type === type);
};