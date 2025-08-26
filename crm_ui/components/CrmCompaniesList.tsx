import React from 'react';
import { TableController, TableColumn } from './TableController';
import { Badge } from './base/Badge';

interface CompaniesListProps {
  onCompanySelect?: (company: any) => void;
  onCreateCompany?: () => void;
}

export const CrmCompaniesList: React.FC<CompaniesListProps> = ({
  onCompanySelect,
  onCreateCompany
}) => {
  const getSizeTierColor = (tier: string) => {
    switch (tier) {
      case 'ent': return 'bg-purple-100 text-purple-800';
      case 'smb': return 'bg-blue-100 text-blue-800';
      case 'micro': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSizeTierLabel = (tier: string) => {
    switch (tier) {
      case 'ent': return 'مؤسسة كبيرة';
      case 'smb': return 'شركة متوسطة';
      case 'micro': return 'شركة صغيرة';
      default: return 'غير محدد';
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
      key: 'name',
      label: 'اسم الشركة',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-medium">
            {row.legal_name?.charAt(0) || 'ش'}
          </div>
          <div>
            <div className="font-medium text-secondary">{row.legal_name}</div>
            {row.region && (
              <div className="text-sm text-muted-foreground">{row.region}</div>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'industry',
      label: 'القطاع',
      sortable: true,
      render: (value) => (
        <div className="text-sm text-muted-foreground">{value || '—'}</div>
      )
    },
    {
      key: 'size_tier',
      label: 'الحجم',
      sortable: true,
      render: (value, row) => (
        <Badge 
          className={getSizeTierColor(value)}
          data-testid={`badge-size-${row.id}`}
        >
          {getSizeTierLabel(value)}
        </Badge>
      )
    },
    {
      key: 'website',
      label: 'الموقع الإلكتروني',
      sortable: true,
      render: (value) => 
        value ? (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
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
      key: 'is_active',
      label: 'الحالة',
      sortable: true,
      render: (value, row) => (
        <Badge 
          className={value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          data-testid={`badge-status-${row.id}`}
        >
          {value ? 'نشط' : 'غير نشط'}
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
              onCompanySelect?.(row);
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
        <h2 className="text-2xl font-bold text-secondary">الشركات</h2>
        <button 
          onClick={onCreateCompany}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          data-testid="button-create-company"
        >
          <i className="fas fa-plus ml-2"></i>
          إضافة شركة
        </button>
      </div>

      {/* Enterprise Table */}
      <TableController
        endpoint="/api/table/accounts"
        queryKey={['table-accounts']}
        columns={columns}
        defaultPageSize={25}
        defaultSort={[{ field: 'created_at', direction: 'desc' }]}
        enableExport={true}
        enableSavedViews={true}
        enableColumnToggle={true}
        onRowClick={onCompanySelect}
      />
    </div>
  );
};