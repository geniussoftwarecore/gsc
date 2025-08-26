import React from 'react';
import { TableController, TableColumn } from './TableController';
import { Badge } from './base/Badge';

interface ContactsListProps {
  onContactSelect?: (contact: any) => void;
  onCreateContact?: () => void;
}

export const CrmContactsList: React.FC<ContactsListProps> = ({
  onContactSelect,
  onCreateContact
}) => {
  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    if (score >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
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
      key: 'name',
      label: 'الاسم',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
            {row.first_name?.charAt(0)}{row.last_name?.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-secondary">
              {row.first_name} {row.last_name}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'primary_email',
      label: 'البريد الإلكتروني',
      sortable: true,
      render: (value) => (
        <div className="text-sm text-muted-foreground">{value || '—'}</div>
      )
    },
    {
      key: 'phone',
      label: 'الهاتف',
      sortable: true,
      render: (value) => (
        <div className="text-sm text-muted-foreground">{value || '—'}</div>
      )
    },
    {
      key: 'job_title',
      label: 'المنصب',
      sortable: true,
      render: (value) => (
        <div className="text-sm text-muted-foreground">{value || '—'}</div>
      )
    },
    {
      key: 'lead_score',
      label: 'النقاط',
      sortable: true,
      render: (value, row) => (
        <Badge 
          className={getLeadScoreColor(value || 0)}
          data-testid={`badge-score-${row.id}`}
        >
          {value || 0}
        </Badge>
      )
    },
    {
      key: 'created_at',
      label: 'تاريخ الإضافة',
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
              onContactSelect?.(row);
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
        <h2 className="text-2xl font-bold text-secondary">جهات الاتصال</h2>
        <button 
          onClick={onCreateContact}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          data-testid="button-create-contact"
        >
          <i className="fas fa-plus ml-2"></i>
          إضافة جهة اتصال
        </button>
      </div>

      {/* Enterprise Table */}
      <TableController
        endpoint="/api/table/contacts"
        queryKey={['table-contacts']}
        columns={columns}
        defaultPageSize={25}
        defaultSort={[{ field: 'created_at', direction: 'desc' }]}
        enableExport={true}
        enableSavedViews={true}
        enableColumnToggle={true}
        onRowClick={onContactSelect}
      />
    </div>
  );
};