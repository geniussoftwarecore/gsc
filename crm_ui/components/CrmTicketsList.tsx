import React from 'react';
import { TableController, TableColumn } from './TableController';
import { Badge } from './base/Badge';

interface TicketsListProps {
  onTicketSelect?: (ticket: any) => void;
  onCreateTicket?: () => void;
}

export const CrmTicketsList: React.FC<TicketsListProps> = ({
  onTicketSelect,
  onCreateTicket
}) => {
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
      default: return priority || 'غير محدد';
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
      default: return status || 'غير محدد';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'bug': return 'خطأ برمجي';
      case 'feature_request': return 'طلب ميزة';
      case 'support': return 'دعم فني';
      case 'general': return 'عام';
      case 'technical': return 'تقني';
      case 'billing': return 'فوترة';
      default: return category || 'غير محدد';
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('ar-YE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const columns: TableColumn[] = [
    {
      key: 'ticket_number',
      label: 'رقم التذكرة',
      sortable: true,
      render: (value, row) => (
        <div className="font-mono text-sm font-medium text-primary">
          #{value}
        </div>
      )
    },
    {
      key: 'subject',
      label: 'الموضوع',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-secondary line-clamp-1">
            {value}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {row.description}
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'الفئة',
      sortable: true,
      render: (value) => (
        <div className="text-sm text-muted-foreground">
          {getCategoryLabel(value)}
        </div>
      )
    },
    {
      key: 'priority',
      label: 'الأولوية',
      sortable: true,
      render: (value, row) => (
        <Badge 
          className={getPriorityColor(value)}
          data-testid={`badge-priority-${row.id}`}
        >
          {getPriorityLabel(value)}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'الحالة',
      sortable: true,
      render: (value, row) => (
        <Badge 
          className={getStatusColor(value)}
          data-testid={`badge-status-${row.id}`}
        >
          {getStatusLabel(value)}
        </Badge>
      )
    },
    {
      key: 'sla_deadline',
      label: 'SLA',
      sortable: true,
      render: (value) => {
        if (!value) return <span className="text-sm text-muted-foreground">—</span>;
        const deadline = new Date(value);
        const now = new Date();
        const isOverdue = deadline < now;
        return (
          <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
            {formatDate(deadline)}
          </div>
        );
      }
    },
    {
      key: 'created_at',
      label: 'تاريخ الإنشاء',
      sortable: true,
      render: (value) => (
        <div className="text-sm text-muted-foreground">
          {formatDate(value)}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'إجراءات',
      sortable: false,
      render: (value, row) => (
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button 
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            onClick={(e) => {
              e.stopPropagation();
              onTicketSelect?.(row);
            }}
            data-testid={`button-view-${row.id}`}
          >
            <i className="fas fa-eye"></i>
          </button>
          <button 
            className="p-1 text-gray-600 hover:bg-gray-50 rounded"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Implement edit
            }}
            data-testid={`button-edit-${row.id}`}
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary">التذاكر</h2>
        <button 
          onClick={onCreateTicket}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          data-testid="button-create-ticket"
        >
          <i className="fas fa-plus ml-2"></i>
          إضافة تذكرة
        </button>
      </div>

      {/* Enterprise Table */}
      <TableController
        endpoint="/api/table/tickets"
        queryKey={['table-tickets']}
        columns={columns}
        defaultPageSize={25}
        defaultSort={[{ field: 'created_at', direction: 'desc' }]}
        enableExport={true}
        enableSavedViews={true}
        enableColumnToggle={true}
        onRowClick={onTicketSelect}
      />
    </div>
  );
};