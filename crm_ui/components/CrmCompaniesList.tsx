import React, { useState, useEffect } from 'react';
import { Card } from './base/Card';
import { Button } from './base/Button';
import { Input } from './base/Input';
import { Badge } from './base/Badge';

interface Company {
  id: string;
  legalName: string;
  industry?: string;
  sizeTier?: string;
  region?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  ownerId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CompaniesListProps {
  onCompanySelect?: (company: Company) => void;
  onCreateCompany?: () => void;
}

export const CrmCompaniesList: React.FC<CompaniesListProps> = ({
  onCompanySelect,
  onCreateCompany
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredCompanies(
        companies.filter(company =>
          company.legalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCompanies(companies);
    }
  }, [companies, searchTerm]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/crm/accounts');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data.data || data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSizeTierColor = (sizeTier?: string) => {
    switch (sizeTier) {
      case 'ent': return 'bg-purple-100 text-purple-800';
      case 'smb': return 'bg-blue-100 text-blue-800';
      case 'micro': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSizeTierLabel = (sizeTier?: string) => {
    switch (sizeTier) {
      case 'ent': return 'مؤسسة كبيرة';
      case 'smb': return 'شركة متوسطة';
      case 'micro': return 'شركة صغيرة';
      default: return 'غير محدد';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-YE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
        <h2 className="text-2xl font-bold text-secondary">الشركات</h2>
        <Button 
          onClick={onCreateCompany}
          className="btn-primary"
          data-testid="button-create-company"
        >
          <i className="fas fa-plus ml-2"></i>
          إضافة شركة
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="البحث في الشركات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              data-testid="input-search-companies"
            />
          </div>
          <Button 
            variant="outline"
            data-testid="button-filter-companies"
          >
            <i className="fas fa-filter ml-2"></i>
            تصفية
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">إجمالي الشركات</div>
          <div className="text-2xl font-bold text-secondary">{companies.length}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">نتائج البحث</div>
          <div className="text-2xl font-bold text-primary">{filteredCompanies.length}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">مؤسسات كبيرة</div>
          <div className="text-2xl font-bold text-purple-600">
            {companies.filter(c => c.sizeTier === 'ent').length}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">شركات نشطة</div>
          <div className="text-2xl font-bold text-green-600">
            {companies.filter(c => c.isActive).length}
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">اسم الشركة</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">القطاع</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">الحجم</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">الموقع الإلكتروني</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">البريد الإلكتروني</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">الحالة</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">تاريخ الإضافة</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr 
                key={company.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onCompanySelect?.(company)}
                data-testid={`row-company-${company.id}`}
              >
                <td className="p-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      {company.legalName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-secondary">{company.legalName}</div>
                      {company.region && (
                        <div className="text-sm text-muted-foreground">{company.region}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">{company.industry || '—'}</div>
                </td>
                <td className="p-3">
                  <Badge 
                    className={getSizeTierColor(company.sizeTier)}
                    data-testid={`badge-size-${company.id}`}
                  >
                    {getSizeTierLabel(company.sizeTier)}
                  </Badge>
                </td>
                <td className="p-3">
                  {company.website ? (
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {company.website}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">{company.email || '—'}</div>
                </td>
                <td className="p-3">
                  <Badge 
                    variant={company.isActive ? 'success' : 'secondary'}
                    data-testid={`badge-status-${company.id}`}
                  >
                    {company.isActive ? 'نشط' : 'غير نشط'}
                  </Badge>
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(company.createdAt)}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCompanySelect?.(company);
                      }}
                      data-testid={`button-view-${company.id}`}
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
                      data-testid={`button-edit-${company.id}`}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <i className="fas fa-building text-4xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد شركات</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'لم يتم العثور على نتائج مطابقة للبحث' : 'ابدأ بإضافة شركات جديدة'}
            </p>
            {!searchTerm && (
              <Button 
                onClick={onCreateCompany}
                className="btn-primary"
                data-testid="button-create-first-company"
              >
                <i className="fas fa-plus ml-2"></i>
                إضافة أول شركة
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
