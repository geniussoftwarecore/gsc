import { useState, useMemo } from "react";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Reply, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  AlertCircle,
  CheckCircle,
  MessageCircle,
  FileText,
  Download,
  Bell,
  BarChart3,
  TrendingUp,
  Users
} from "lucide-react";
import { 
  getAllRequests, 
  getRequestsWithResponses, 
  addResponseToRequest,
  updateRequestStatus,
  getAnalytics,
  type AdminResponse,
  type ClientRequestWithService
} from "@/data/clientRequests";
import { useNotifications } from "@/contexts/NotificationContext";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function AdminCRM() {
  const { user } = useAuth();
  const { notifications, addNotification, markAsRead } = useNotifications();
  const { toast } = useToast();

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<ClientRequestWithService | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);

  // Get requests with responses and analytics
  const requestsWithResponses = getRequestsWithResponses();
  const analytics = getAnalytics();

  // Filter and search requests
  const filteredRequests = useMemo(() => {
    return requestsWithResponses.filter(request => {
      const matchesSearch = 
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.userName && request.userName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || request.status === statusFilter;
      const matchesType = typeFilter === "all" || request.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [requestsWithResponses, searchTerm, statusFilter, typeFilter]);

  // Handle reply submission
  const handleReplySubmit = () => {
    if (!selectedRequest || !replyMessage.trim() || !user) {
      toast({
        title: "خطأ في الإرسال",
        description: "يرجى التأكد من كتابة الرد",
        variant: "destructive",
      });
      return;
    }

    try {
      // Add admin response
      addResponseToRequest(
        selectedRequest.id,
        user.id,
        user.name,
        replyMessage.trim()
      );

      // Add notification for the client
      addNotification({
        title: "رد جديد على طلبك",
        message: `تم الرد على طلبك: ${selectedRequest.title}`,
        type: "reply",
        category: "general",
        actionUrl: `/dashboard?tab=requests&request=${selectedRequest.id}`
      });

      toast({
        title: "تم إرسال الرد بنجاح",
        description: `تم الرد على طلب: ${selectedRequest.title}`,
      });

      // Reset form and close dialog
      setReplyMessage("");
      setIsReplyDialogOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الرد",
        variant: "destructive",
      });
    }
  };

  // Handle status update
  const handleStatusUpdate = (requestId: string, newStatus: "new" | "in-progress" | "answered") => {
    updateRequestStatus(requestId, newStatus);
    toast({
      title: "تم تحديث الحالة",
      description: "تم تحديث حالة الطلب بنجاح",
    });
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusMap = {
      "new": { label: "جديد", variant: "destructive" as const, icon: AlertCircle },
      "in-progress": { label: "قيد المعالجة", variant: "default" as const, icon: Clock },
      "answered": { label: "تم الرد", variant: "secondary" as const, icon: CheckCircle }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap["new"];
    const IconComponent = statusInfo.icon;
    
    return (
      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
        <IconComponent className="w-3 h-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  // Type badge component
  const TypeBadge = ({ type }: { type: string }) => {
    const typeMap = {
      "request": { label: "طلب", className: "bg-blue-100 text-blue-800" },
      "suggestion": { label: "اقتراح", className: "bg-green-100 text-green-800" },
      "comment": { label: "تعليق", className: "bg-purple-100 text-purple-800" }
    };
    
    const typeInfo = typeMap[type as keyof typeof typeMap] || typeMap["request"];
    
    return (
      <Badge className={typeInfo.className}>
        {typeInfo.label}
      </Badge>
    );
  };

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gsc-light py-8">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                نظام إدارة علاقات العملاء (CRM)
              </h1>
              <p className="text-gray-600">
                إدارة طلبات العملاء والردود والإشعارات
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="text-sm text-gray-600">
                {notifications.filter(n => !n.read).length} إشعار جديد
              </span>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">إجمالي الطلبات</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalRequests}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">طلبات جديدة</p>
                    <p className="text-2xl font-bold text-red-600">{analytics.newRequests}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">تم الرد عليها</p>
                    <p className="text-2xl font-bold text-green-600">{analytics.answeredRequests}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">متوسط وقت الرد</p>
                    <p className="text-2xl font-bold text-blue-600">{analytics.averageResponseTime}س</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main CRM Interface */}
          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList>
              <TabsTrigger value="requests">الطلبات</TabsTrigger>
              <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            </TabsList>

            {/* Requests Tab */}
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة طلبات العملاء</CardTitle>
                  
                  {/* Search and Filters */}
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="البحث في الطلبات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        data-testid="input-search-requests"
                      />
                    </div>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40" data-testid="select-status-filter">
                        <SelectValue placeholder="فلترة بالحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="new">جديد</SelectItem>
                        <SelectItem value="in-progress">قيد المعالجة</SelectItem>
                        <SelectItem value="answered">تم الرد</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-40" data-testid="select-type-filter">
                        <SelectValue placeholder="فلترة بالنوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأنواع</SelectItem>
                        <SelectItem value="request">طلبات</SelectItem>
                        <SelectItem value="suggestion">اقتراحات</SelectItem>
                        <SelectItem value="comment">تعليقات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Requests List */}
                  <div className="space-y-4">
                    {filteredRequests.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">لا توجد طلبات تطابق معايير البحث</p>
                      </div>
                    ) : (
                      filteredRequests.map((request) => (
                        <Card key={request.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-gray-900">{request.title}</h3>
                                  <TypeBadge type={request.type} />
                                  <StatusBadge status={request.status || "new"} />
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                  {request.description}
                                </p>
                                
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    <span>{request.userName || "غير محدد"}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>
                                      {request.createdAt ? format(new Date(request.createdAt), "dd/MM/yyyy", { locale: ar }) : "غير محدد"}
                                    </span>
                                  </div>
                                  {request.budget && (
                                    <div className="flex items-center gap-1">
                                      <span>الميزانية: {request.budget} ريال</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 ml-4">
                                <Select
                                  value={request.status || "new"}
                                  onValueChange={(value) => handleStatusUpdate(request.id, value as any)}
                                >
                                  <SelectTrigger className="w-32" data-testid={`select-status-${request.id}`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">جديد</SelectItem>
                                    <SelectItem value="in-progress">قيد المعالجة</SelectItem>
                                    <SelectItem value="answered">تم الرد</SelectItem>
                                  </SelectContent>
                                </Select>
                                
                                <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedRequest(request)}
                                      data-testid={`button-reply-${request.id}`}
                                    >
                                      <Reply className="w-4 h-4 ml-1" />
                                      رد
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>الرد على الطلب</DialogTitle>
                                    </DialogHeader>
                                    
                                    {selectedRequest && (
                                      <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                          <h4 className="font-medium text-gray-900 mb-2">
                                            {selectedRequest.title}
                                          </h4>
                                          <p className="text-gray-600 text-sm">
                                            {selectedRequest.description}
                                          </p>
                                        </div>
                                        
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                            رسالة الرد
                                          </label>
                                          <Textarea
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                            placeholder="اكتب ردك هنا..."
                                            rows={6}
                                            data-testid="textarea-reply-message"
                                          />
                                        </div>
                                        
                                        <div className="flex gap-3 justify-end">
                                          <Button
                                            variant="outline"
                                            onClick={() => {
                                              setIsReplyDialogOpen(false);
                                              setReplyMessage("");
                                              setSelectedRequest(null);
                                            }}
                                          >
                                            إلغاء
                                          </Button>
                                          <Button
                                            onClick={handleReplySubmit}
                                            disabled={!replyMessage.trim()}
                                            data-testid="button-send-reply"
                                          >
                                            إرسال الرد
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                            
                            {/* Show responses if any */}
                            {request.responses && request.responses.length > 0 && (
                              <div className="border-t pt-4 mt-4">
                                <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                  <MessageCircle className="w-4 h-4" />
                                  الردود ({request.responses.length})
                                </h5>
                                <div className="space-y-3">
                                  {request.responses.map((response) => (
                                    <div key={response.id} className="bg-blue-50 p-3 rounded-lg">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-blue-900">
                                          {response.adminName}
                                        </span>
                                        <span className="text-xs text-blue-600">
                                          {format(new Date(response.createdAt), "dd/MM/yyyy HH:mm", { locale: ar })}
                                        </span>
                                      </div>
                                      <p className="text-sm text-blue-800">
                                        {response.message}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    إدارة الإشعارات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8">
                        <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">لا توجد إشعارات</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <Card key={notification.id} className={`${notification.read === "false" ? "border-blue-200 bg-blue-50" : ""}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-1">
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span>{notification.type}</span>
                                  <span>•</span>
                                  <span>
                                    {notification.createdAt ? format(new Date(notification.createdAt), "dd/MM/yyyy HH:mm", { locale: ar }) : "غير محدد"}
                                  </span>
                                </div>
                              </div>
                              {notification.read === "false" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  data-testid={`button-mark-read-${notification.id}`}
                                >
                                  تحديد كمقروء
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      إحصائيات الطلبات حسب النوع
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>طلبات</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ 
                                width: `${(analytics.requestsByType.request / analytics.totalRequests) * 100}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium">{analytics.requestsByType.request}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>اقتراحات</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-green-500 rounded-full"
                              style={{ 
                                width: `${(analytics.requestsByType.suggestion / analytics.totalRequests) * 100}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium">{analytics.requestsByType.suggestion}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>تعليقات</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-purple-500 rounded-full"
                              style={{ 
                                width: `${(analytics.requestsByType.comment / analytics.totalRequests) * 100}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium">{analytics.requestsByType.comment}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      أداء النظام
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {Math.round((analytics.answeredRequests / analytics.totalRequests) * 100) || 0}%
                        </div>
                        <p className="text-sm text-gray-600">معدل الاستجابة</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {analytics.totalResponses}
                        </div>
                        <p className="text-sm text-gray-600">إجمالي الردود</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          {analytics.averageResponseTime}س
                        </div>
                        <p className="text-sm text-gray-600">متوسط وقت الرد</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminRoute>
  );
}