import React, { useState, useEffect } from 'react';
import { Card } from './base/Card';
import { Button } from './base/Button';
import { Input } from './base/Input';
import { Badge } from './base/Badge';

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'general' | 'technical' | 'billing' | 'feature_request' | 'bug';
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  contactId?: string;
  accountId?: string;
  assignedTo?: string;
  ownerId?: string;
  slaBreached: boolean;
  firstResponseAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface TicketsListProps {
  onTicketSelect?: (ticket: Ticket) => void;
  onCreateTicket?: () => void;
}

export const CrmTicketsList: React.FC<TicketsListProps> = ({
  onTicketSelect,
  onCreateTicket
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (searchTerm.trim()) {
      filtered = filtered.filter(ticket =>
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/crm/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data.data || data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'عاجل';
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'مفتوحة';
      case 'in_progress': return 'قيد المعالجة';
      case 'pending': return 'في الانتظار';
      case 'resolved': return 'محلولة';
      case 'closed': return 'مغلقة';
      default: return status;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'general': return 'عام';
      case 'technical': return 'تقني';
      case 'billing': return 'فوترة';
      case 'feature_request': return 'طلب ميزة';
      case 'bug': return 'خطأ';
      default: return category;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-YE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="mr-3 text-muted-foreground">جاري التحميل...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary">التذاكر</h2>
        <Button 
          onClick={onCreateTicket}
          className="btn-primary"
          data-testid="button-create-ticket"
        >
          <i className="fas fa-plus ml-2"></i>
          إضافة تذكرة
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="البحث في التذاكر..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              data-testid="input-search-tickets"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            data-testid="select-status-filter"
          >
            <option value="all">جميع الحالات</option>
            <option value="open">مفتوحة</option>
            <option value="in_progress">قيد المعالجة</option>
            <option value="pending">في الانتظار</option>
            <option value="resolved">محلولة</option>
            <option value="closed">مغلقة</option>
          </select>
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            data-testid="select-priority-filter"
          >
            <option value="all">جميع الأولويات</option>
            <option value="urgent">عاجل</option>
            <option value="high">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">إجمالي التذاكر</div>
          <div className="text-2xl font-bold text-secondary">{tickets.length}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">مفتوحة</div>
          <div className="text-2xl font-bold text-blue-600">
            {tickets.filter(t => t.status === 'open').length}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">قيد المعالجة</div>
          <div className="text-2xl font-bold text-yellow-600">
            {tickets.filter(t => t.status === 'in_progress').length}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">محلولة</div>
          <div className="text-2xl font-bold text-green-600">
            {tickets.filter(t => t.status === 'resolved').length}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">تجاوزت SLA</div>
          <div className="text-2xl font-bold text-red-600">
            {tickets.filter(t => t.slaBreached).length}
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">رقم التذكرة</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">الموضوع</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">الفئة</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">الأولوية</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">الحالة</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">SLA</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">تاريخ الإنشاء</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr 
                key={ticket.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onTicketSelect?.(ticket)}
                data-testid={`row-ticket-${ticket.id}`}
              >
                <td className="p-3">
                  <div className="font-mono text-sm font-medium text-primary">
                    #{ticket.ticketNumber}
                  </div>
                </td>
                <td className="p-3">
                  <div className="font-medium text-secondary line-clamp-1">
                    {ticket.subject}
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {ticket.description}
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">
                    {getCategoryLabel(ticket.category)}
                  </div>
                </td>
                <td className="p-3">
                  <Badge 
                    className={getPriorityColor(ticket.priority)}
                    data-testid={`badge-priority-${ticket.id}`}
                  >
                    {getPriorityLabel(ticket.priority)}
                  </Badge>
                </td>
                <td className="p-3">
                  <Badge 
                    className={getStatusColor(ticket.status)}
                    data-testid={`badge-status-${ticket.id}`}
                  >
                    {getStatusLabel(ticket.status)}
                  </Badge>
                </td>
                <td className="p-3">
                  {ticket.slaBreached ? (
                    <Badge 
                      variant="danger"
                      data-testid={`badge-sla-${ticket.id}`}
                    >
                      <i className="fas fa-exclamation-triangle mr-1"></i>
                      تجاوز
                    </Badge>
                  ) : (
                    <Badge 
                      variant="success"
                      data-testid={`badge-sla-${ticket.id}`}
                    >
                      <i className="fas fa-check mr-1"></i>
                      آمن
                    </Badge>
                  )}
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(ticket.createdAt)}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTicketSelect?.(ticket);
                      }}
                      data-testid={`button-view-${ticket.id}`}
                    >
                      <i className="fas fa-eye"></i>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement edit
                      }}
                      data-testid={`button-edit-${ticket.id}`}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTickets.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <i className="fas fa-ticket-alt text-4xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد تذاكر</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' ? 
                'لم يتم العثور على نتائج مطابقة للبحث أو الفلاتر' : 
                'ابدأ بإضافة تذاكر دعم جديدة'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && (
              <Button 
                onClick={onCreateTicket}
                className="btn-primary"
                data-testid="button-create-first-ticket"
              >
                <i className="fas fa-plus ml-2"></i>
                إضافة أول تذكرة
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
