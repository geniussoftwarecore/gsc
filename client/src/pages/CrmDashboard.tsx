import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Building2, 
  DollarSign, 
  CheckSquare, 
  Activity,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  AlertCircle,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// Import types from shared schema
import type { Lead, Contact, Account, Opportunity, Task, CrmActivity, User } from "@shared/schema";

// Helper function to format currency in Arabic
const formatCurrency = (amount: string | null) => {
  if (!amount) return "-";
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
  }).format(parseInt(amount));
};

// Helper function to format dates
const formatDate = (date: Date | string | null) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString('ar-SA');
};

// Status badge components
const getStatusBadge = (status: string, type: 'lead' | 'opportunity' | 'task') => {
  const colors = {
    lead: {
      new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      qualified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      proposal: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      negotiation: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      won: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      lost: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    },
    opportunity: {
      prospecting: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      qualification: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      proposal: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      negotiation: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      "closed-won": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "closed-lost": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    },
    task: {
      pending: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    }
  };

  const colorClass = colors[type][status as keyof typeof colors[typeof type]] || "bg-gray-100 text-gray-800";
  
  return (
    <Badge className={`${colorClass} border-0`}>
      {getStatusLabel(status, type)}
    </Badge>
  );
};

const getStatusLabel = (status: string, type: 'lead' | 'opportunity' | 'task') => {
  const labels = {
    lead: {
      new: "جديد",
      contacted: "تم التواصل",
      qualified: "مؤهل",
      proposal: "عرض",
      negotiation: "تفاوض",
      won: "تم الإغلاق",
      lost: "مفقود"
    },
    opportunity: {
      prospecting: "استطلاع",
      qualification: "تأهيل",
      proposal: "عرض",
      negotiation: "تفاوض",
      "closed-won": "تم الإغلاق بنجاح",
      "closed-lost": "فقدت الفرصة"
    },
    task: {
      pending: "معلقة",
      "in-progress": "قيد التنفيذ",
      completed: "مكتملة",
      cancelled: "ملغية"
    }
  };

  return labels[type][status as keyof typeof labels[typeof type]] || status;
};

const getPriorityBadge = (priority: string | null) => {
  if (!priority) return null;
  
  const colors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };

  const labels = {
    low: "منخفضة",
    medium: "متوسطة", 
    high: "عالية",
    urgent: "عاجلة"
  };

  const colorClass = colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  const label = labels[priority as keyof typeof labels] || priority;

  return <Badge className={`${colorClass} border-0`}>{label}</Badge>;
};

export default function CrmDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch CRM data
  const { data: leads = [], isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ['/api/leads'],
  });

  const { data: contacts = [], isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  const { data: accounts = [], isLoading: accountsLoading } = useQuery<Account[]>({
    queryKey: ['/api/accounts'],
  });

  const { data: opportunities = [], isLoading: opportunitiesLoading } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });

  const { data: activities = [], isLoading: activitiesLoading } = useQuery<CrmActivity[]>({
    queryKey: ['/api/activities'],
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  // Calculate dashboard metrics
  const totalLeads = leads.length;
  const hotLeads = leads.filter(lead => lead.rating === "hot").length;
  const totalOpportunities = opportunities.length;
  const totalValue = opportunities.reduce((sum, opp) => sum + (parseInt(opp.amount || "0")), 0);
  const avgProbability = opportunities.length > 0 
    ? opportunities.reduce((sum, opp) => sum + parseInt(opp.probability || "0"), 0) / opportunities.length 
    : 0;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed"
  ).length;

  // Filter functions
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchTerm || lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !statusFilter || statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = !searchTerm || opp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === "all" || opp.stage === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = !searchTerm || task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            لوحة تحكم إدارة علاقات العملاء
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة شاملة للعملاء المحتملين والفرص التجارية والمهام
          </p>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي العملاء المحتملين</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                {hotLeads} عميل محتمل مهم
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الفرص التجارية</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOpportunities}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(totalValue.toString())} إجمالي القيمة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">متوسط نسبة النجاح</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(avgProbability)}%</div>
              <p className="text-xs text-muted-foreground">
                لجميع الفرص التجارية
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المهام المعلقة</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasks}</div>
              <p className="text-xs text-muted-foreground">
                {overdueTasks} مهمة متأخرة
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="leads">العملاء المحتملين</TabsTrigger>
            <TabsTrigger value="opportunities">الفرص التجارية</TabsTrigger>
            <TabsTrigger value="accounts">الحسابات</TabsTrigger>
            <TabsTrigger value="tasks">المهام</TabsTrigger>
            <TabsTrigger value="activities">الأنشطة</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    الأنشطة الأخيرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 space-x-reverse">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {formatDate(activity.createdAt)}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {activity.type === "call" ? "مكالمة" :
                           activity.type === "email" ? "بريد إلكتروني" :
                           activity.type === "meeting" ? "اجتماع" : activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    المهام القادمة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.filter(task => task.status !== "completed")
                          .sort((a, b) => {
                            if (!a.dueDate) return 1;
                            if (!b.dueDate) return -1;
                            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                          })
                          .slice(0, 5)
                          .map((task) => (
                      <div key={task.id} className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {getPriorityBadge(task.priority)}
                            <span className="text-xs text-gray-500">
                              {formatDate(task.dueDate)}
                            </span>
                          </div>
                        </div>
                        {getStatusBadge(task.status || "pending", "task")}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    العملاء المحتملين ({leads.length})
                  </CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة عميل محتمل
                  </Button>
                </div>
                
                {/* Filters */}
                <div className="flex gap-4 mt-4">
                  <div className="flex-1">
                    <Input
                      placeholder="البحث في العملاء المحتملين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="تصفية حسب الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="new">جديد</SelectItem>
                      <SelectItem value="contacted">تم التواصل</SelectItem>
                      <SelectItem value="qualified">مؤهل</SelectItem>
                      <SelectItem value="proposal">عرض</SelectItem>
                      <SelectItem value="negotiation">تفاوض</SelectItem>
                      <SelectItem value="won">تم الإغلاق</SelectItem>
                      <SelectItem value="lost">مفقود</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الاسم</TableHead>
                        <TableHead>الشركة</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>الهاتف</TableHead>
                        <TableHead>المصدر</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>التقييم</TableHead>
                        <TableHead>القيمة المقدرة</TableHead>
                        <TableHead>تاريخ الإنشاء</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.company || "-"}</TableCell>
                          <TableCell>{lead.email || "-"}</TableCell>
                          <TableCell>{lead.phone || "-"}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {lead.leadSource === "website" ? "الموقع الإلكتروني" :
                               lead.leadSource === "referral" ? "إحالة" :
                               lead.leadSource === "advertising" ? "إعلانات" :
                               lead.leadSource === "cold-call" ? "مكالمة باردة" :
                               lead.leadSource === "social-media" ? "وسائل التواصل" : lead.leadSource}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(lead.status || "new", "lead")}
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              lead.rating === "hot" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                              lead.rating === "warm" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                              "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            }>
                              {lead.rating === "hot" ? "ساخن" :
                               lead.rating === "warm" ? "دافئ" : "بارد"}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatCurrency(lead.estimatedValue)}</TableCell>
                          <TableCell>{formatDate(lead.createdAt)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    الفرص التجارية ({opportunities.length})
                  </CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة فرصة تجارية
                  </Button>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mt-4">
                  <div className="flex-1">
                    <Input
                      placeholder="البحث في الفرص التجارية..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="تصفية حسب المرحلة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المراحل</SelectItem>
                      <SelectItem value="prospecting">استطلاع</SelectItem>
                      <SelectItem value="qualification">تأهيل</SelectItem>
                      <SelectItem value="proposal">عرض</SelectItem>
                      <SelectItem value="negotiation">تفاوض</SelectItem>
                      <SelectItem value="closed-won">تم الإغلاق بنجاح</SelectItem>
                      <SelectItem value="closed-lost">فقدت الفرصة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>اسم الفرصة</TableHead>
                        <TableHead>الحساب</TableHead>
                        <TableHead>المرحلة</TableHead>
                        <TableHead>القيمة</TableHead>
                        <TableHead>نسبة النجاح</TableHead>
                        <TableHead>تاريخ الإغلاق المتوقع</TableHead>
                        <TableHead>الخطوة التالية</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOpportunities.map((opportunity) => {
                        const account = accounts.find(acc => acc.id === opportunity.accountId);
                        return (
                          <TableRow key={opportunity.id}>
                            <TableCell className="font-medium">{opportunity.name}</TableCell>
                            <TableCell>{account?.name || "-"}</TableCell>
                            <TableCell>
                              {getStatusBadge(opportunity.stage || "prospecting", "opportunity")}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(opportunity.amount)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${opportunity.probability}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{opportunity.probability}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(opportunity.expectedCloseDate)}</TableCell>
                            <TableCell>{opportunity.nextStep || "-"}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    الحسابات ({accounts.length})
                  </CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة حساب
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>اسم الحساب</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الصناعة</TableHead>
                        <TableHead>الموقع الإلكتروني</TableHead>
                        <TableHead>الهاتف</TableHead>
                        <TableHead>الإيرادات السنوية</TableHead>
                        <TableHead>عدد الموظفين</TableHead>
                        <TableHead>المسؤول</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accounts.map((account) => {
                        const assignedUser = users.find(user => user.id === account.assignedTo);
                        return (
                          <TableRow key={account.id}>
                            <TableCell className="font-medium">{account.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {account.type === "prospect" ? "محتمل" :
                                 account.type === "customer" ? "عميل" :
                                 account.type === "partner" ? "شريك" :
                                 account.type === "vendor" ? "مورد" : account.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{account.industry || "-"}</TableCell>
                            <TableCell>
                              {account.website ? (
                                <a href={account.website} target="_blank" rel="noopener noreferrer" 
                                   className="text-blue-600 hover:underline">
                                  {account.website}
                                </a>
                              ) : "-"}
                            </TableCell>
                            <TableCell>{account.phone || "-"}</TableCell>
                            <TableCell>{formatCurrency(account.annualRevenue)}</TableCell>
                            <TableCell>{account.numberOfEmployees || "-"}</TableCell>
                            <TableCell>{assignedUser?.name || "-"}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5" />
                    المهام ({tasks.length})
                  </CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة مهمة
                  </Button>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mt-4">
                  <div className="flex-1">
                    <Input
                      placeholder="البحث في المهام..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="تصفية حسب الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="pending">معلقة</SelectItem>
                      <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                      <SelectItem value="completed">مكتملة</SelectItem>
                      <SelectItem value="cancelled">ملغية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>عنوان المهمة</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الأولوية</TableHead>
                        <TableHead>المسؤول</TableHead>
                        <TableHead>تاريخ الاستحقاق</TableHead>
                        <TableHead>المرتبطة بـ</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTasks.map((task) => {
                        const assignedUser = users.find(user => user.id === task.assignedTo);
                        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";
                        
                        return (
                          <TableRow key={task.id} className={isOverdue ? "bg-red-50 dark:bg-red-950" : ""}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {task.title}
                                {isOverdue && <AlertCircle className="h-4 w-4 text-red-500" />}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {task.type === "call" ? "مكالمة" :
                                 task.type === "email" ? "بريد إلكتروني" :
                                 task.type === "meeting" ? "اجتماع" :
                                 task.type === "follow-up" ? "متابعة" :
                                 task.type === "demo" ? "عرض توضيحي" : "أخرى"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(task.status || "pending", "task")}
                            </TableCell>
                            <TableCell>
                              {getPriorityBadge(task.priority)}
                            </TableCell>
                            <TableCell>{assignedUser?.name || "-"}</TableCell>
                            <TableCell className={isOverdue ? "text-red-600 dark:text-red-400 font-medium" : ""}>
                              {formatDate(task.dueDate)}
                            </TableCell>
                            <TableCell>
                              {task.relatedTo && task.relatedId ? (
                                <Badge variant="secondary">
                                  {task.relatedTo === "lead" ? "عميل محتمل" :
                                   task.relatedTo === "opportunity" ? "فرصة تجارية" :
                                   task.relatedTo === "account" ? "حساب" :
                                   task.relatedTo === "contact" ? "جهة اتصال" : task.relatedTo}
                                </Badge>
                              ) : "-"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  سجل الأنشطة ({activities.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const user = users.find(u => u.id === activity.userId);
                    return (
                      <div key={activity.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">
                                {activity.type === "call" ? "مكالمة" :
                                 activity.type === "email" ? "بريد إلكتروني" :
                                 activity.type === "meeting" ? "اجتماع" :
                                 activity.type === "note" ? "ملاحظة" : activity.type}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {user?.name || "مستخدم غير معروف"}
                              </span>
                              <span className="text-sm text-gray-400">
                                {formatDate(activity.createdAt)}
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                              {activity.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {activity.description}
                            </p>
                            {activity.outcome && (
                              <div className="text-sm">
                                <span className="font-medium">النتيجة: </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  {activity.outcome}
                                </span>
                              </div>
                            )}
                            {activity.duration && (
                              <div className="text-sm">
                                <span className="font-medium">المدة: </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  {activity.duration} دقيقة
                                </span>
                              </div>
                            )}
                          </div>
                          {activity.relatedTo && activity.relatedId && (
                            <Badge variant="secondary">
                              {activity.relatedTo === "lead" ? "عميل محتمل" :
                               activity.relatedTo === "opportunity" ? "فرصة تجارية" :
                               activity.relatedTo === "account" ? "حساب" :
                               activity.relatedTo === "contact" ? "جهة اتصال" : activity.relatedTo}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}