import { ClientRequest, InsertClientRequest, Notification } from "@shared/schema";

// Response interface for admin replies
export interface AdminResponse {
  id: string;
  requestId: string;
  adminId: string;
  adminName: string;
  message: string;
  attachments?: string[];
  createdAt: Date;
}

// Helper interface for client requests
export interface ClientRequestWithService extends ClientRequest {
  serviceTitle?: string;
  userName?: string;
  responses?: AdminResponse[];
}

// In-memory storage for admin responses
let adminResponses: AdminResponse[] = [];

// Load client requests from localStorage
const loadRequestsFromStorage = (): ClientRequest[] => {
  try {
    const stored = localStorage.getItem("gsc_client_requests");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((req: any) => ({
        ...req,
        createdAt: new Date(req.createdAt),
        updatedAt: new Date(req.updatedAt)
      }));
    }
  } catch (error) {
    console.error("Error loading requests from storage:", error);
  }
  return defaultRequests;
};

// Save client requests to localStorage
const saveRequestsToStorage = (requests: ClientRequest[]): void => {
  try {
    localStorage.setItem("gsc_client_requests", JSON.stringify(requests));
  } catch (error) {
    console.error("Error saving requests to storage:", error);
  }
};

// Load admin responses from localStorage
const loadResponsesFromStorage = (): AdminResponse[] => {
  try {
    const stored = localStorage.getItem("gsc_admin_responses");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((res: any) => ({
        ...res,
        createdAt: new Date(res.createdAt)
      }));
    }
  } catch (error) {
    console.error("Error loading responses from storage:", error);
  }
  return [];
};

// Save admin responses to localStorage
const saveResponsesToStorage = (responses: AdminResponse[]): void => {
  try {
    localStorage.setItem("gsc_admin_responses", JSON.stringify(responses));
  } catch (error) {
    console.error("Error saving responses to storage:", error);
  }
};

// Default client requests data
const defaultRequests: ClientRequest[] = [
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

// Initialize data from storage
export let clientRequests = loadRequestsFromStorage();
adminResponses = loadResponsesFromStorage();

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
  saveRequestsToStorage(clientRequests);
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
  
  saveRequestsToStorage(clientRequests);
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
  saveRequestsToStorage(clientRequests);
  return clientRequests.length < initialLength;
};

// Admin response functions
export const addResponseToRequest = (
  requestId: string, 
  adminId: string, 
  adminName: string, 
  message: string, 
  attachments?: string[]
): AdminResponse => {
  const newResponse: AdminResponse = {
    id: `resp-${Date.now()}`,
    requestId,
    adminId,
    adminName,
    message,
    attachments: attachments || [],
    createdAt: new Date()
  };
  
  adminResponses.push(newResponse);
  saveResponsesToStorage(adminResponses);
  
  // Update request status to answered
  updateRequestStatus(requestId, "answered");
  
  return newResponse;
};

export const getResponsesForRequest = (requestId: string): AdminResponse[] => {
  return adminResponses.filter(response => response.requestId === requestId);
};

export const getAllResponses = (): AdminResponse[] => {
  return [...adminResponses];
};

// Get requests with their responses
export const getRequestsWithResponses = (): ClientRequestWithService[] => {
  return clientRequests.map(request => ({
    ...request,
    responses: getResponsesForRequest(request.id)
  }));
};

// Analytics functions
export const getAnalytics = () => {
  const totalRequests = clientRequests.length;
  const newRequests = clientRequests.filter(req => req.status === "new").length;
  const inProgressRequests = clientRequests.filter(req => req.status === "in-progress").length;
  const answeredRequests = clientRequests.filter(req => req.status === "answered").length;
  
  const requestsByType = {
    request: clientRequests.filter(req => req.type === "request").length,
    suggestion: clientRequests.filter(req => req.type === "suggestion").length,
    comment: clientRequests.filter(req => req.type === "comment").length
  };
  
  const totalResponses = adminResponses.length;
  const averageResponseTime = totalResponses > 0 ? 
    Math.round(adminResponses.reduce((sum, response) => {
      const request = clientRequests.find(req => req.id === response.requestId);
      if (request && request.createdAt) {
        const responseTime = response.createdAt.getTime() - request.createdAt.getTime();
        return sum + responseTime;
      }
      return sum;
    }, 0) / totalResponses / (1000 * 60 * 60)) : 0; // Convert to hours
  
  return {
    totalRequests,
    newRequests,
    inProgressRequests,
    answeredRequests,
    requestsByType,
    totalResponses,
    averageResponseTime
  };
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