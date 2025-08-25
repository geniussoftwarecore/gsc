import React, { useState, useEffect } from 'react';
import { Card } from './base/Card';
import { Button } from './base/Button';
import { Input } from './base/Input';
import { Badge } from './base/Badge';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email?: string;
  phone?: string;
  companyId?: string;
  jobTitle?: string;
  leadScore: number;
  ownerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ContactsListProps {
  onContactSelect?: (contact: Contact) => void;
  onCreateContact?: () => void;
}

export const CrmContactsList: React.FC<ContactsListProps> = ({
  onContactSelect,
  onCreateContact
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredContacts(
        contacts.filter(contact =>
          contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredContacts(contacts);
    }
  }, [contacts, searchTerm]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/crm/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    if (score >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-YE', {
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
        <h2 className="text-2xl font-bold text-secondary">جهات الاتصال</h2>
        <Button 
          onClick={onCreateContact}
          className="btn-primary"
          data-testid="button-create-contact"
        >
          <i className="fas fa-plus ml-2"></i>
          إضافة جهة اتصال
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="البحث في جهات الاتصال..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              data-testid="input-search-contacts"
            />
          </div>
          <Button 
            variant="outline"
            data-testid="button-filter-contacts"
          >
            <i className="fas fa-filter ml-2"></i>
            تصفية
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">إجمالي جهات الاتصال</div>
          <div className="text-2xl font-bold text-secondary">{contacts.length}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">نتائج البحث</div>
          <div className="text-2xl font-bold text-primary">{filteredContacts.length}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">عملاء محتملين</div>
          <div className="text-2xl font-bold text-green-600">
            {contacts.filter(c => c.leadScore >= 60).length}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">يحتاج متابعة</div>
          <div className="text-2xl font-bold text-orange-600">
            {contacts.filter(c => c.leadScore < 40).length}
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">الاسم</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">البريد الإلكتروني</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">الهاتف</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">المنصب</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">النقاط</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">تاريخ الإضافة</th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr 
                key={contact.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onContactSelect?.(contact)}
                data-testid={`row-contact-${contact.id}`}
              >
                <td className="p-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-secondary">{contact.fullName}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">{contact.email || '—'}</div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">{contact.phone || '—'}</div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">{contact.jobTitle || '—'}</div>
                </td>
                <td className="p-3">
                  <Badge 
                    className={getLeadScoreColor(contact.leadScore)}
                    data-testid={`badge-score-${contact.id}`}
                  >
                    {contact.leadScore}
                  </Badge>
                </td>
                <td className="p-3">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(contact.createdAt)}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContactSelect?.(contact);
                      }}
                      data-testid={`button-view-${contact.id}`}
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
                      data-testid={`button-edit-${contact.id}`}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredContacts.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <i className="fas fa-address-book text-4xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد جهات اتصال</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'لم يتم العثور على نتائج مطابقة للبحث' : 'ابدأ بإضافة جهات اتصال جديدة'}
            </p>
            {!searchTerm && (
              <Button 
                onClick={onCreateContact}
                className="btn-primary"
                data-testid="button-create-first-contact"
              >
                <i className="fas fa-plus ml-2"></i>
                إضافة أول جهة اتصال
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};