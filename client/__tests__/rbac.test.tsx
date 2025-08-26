import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminRoute } from '../src/components/auth/AdminRoute';
import { AuthGuard } from '../src/components/auth/Guard';
import { useAuth } from '../src/contexts/AuthContext';
import { hasPermission, getVisibleFields, canViewField, filterEntityFields } from '@shared/security/roles';

// Mock the auth context
jest.mock('../src/contexts/AuthContext');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock wouter location hook
jest.mock('wouter', () => ({
  useLocation: jest.fn(() => ['/', jest.fn()])
}));

// Test component for AdminRoute
function TestAdminComponent() {
  return <div data-testid="admin-content">Admin Only Content</div>;
}

// Test component for AuthGuard
function TestProtectedComponent() {
  return <div data-testid="protected-content">Protected Content</div>;
}

describe('RBAC (Role-Based Access Control)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('AdminRoute Component', () => {
    test('should render children when user is admin', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', email: 'admin@test.com', role: 'admin' },
        isAdmin: true,
        isAuthenticated: true,
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        isLoading: false,
        trialDaysRemaining: 0
      });

      render(
        <AdminRoute>
          <TestAdminComponent />
        </AdminRoute>
      );

      expect(screen.getByTestId('admin-content')).toBeInTheDocument();
    });

    test('should show loading state when loading', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAdmin: false,
        isAuthenticated: false,
        loading: true,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        isLoading: true,
        trialDaysRemaining: 0
      });

      render(
        <AdminRoute>
          <TestAdminComponent />
        </AdminRoute>
      );

      expect(screen.getByText('جاري التحقق من الصلاحيات...')).toBeInTheDocument();
    });

    test('should show access denied when user is not admin', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', email: 'user@test.com', role: 'agent' },
        isAdmin: false,
        isAuthenticated: true,
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        isLoading: false,
        trialDaysRemaining: 0
      });

      render(
        <AdminRoute>
          <TestAdminComponent />
        </AdminRoute>
      );

      expect(screen.getByText('غير مصرح لك بالوصول')).toBeInTheDocument();
      expect(screen.queryByTestId('admin-content')).not.toBeInTheDocument();
    });

    test('should not render children when not authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAdmin: false,
        isAuthenticated: false,
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        isLoading: false,
        trialDaysRemaining: 0
      });

      render(
        <AdminRoute>
          <TestAdminComponent />
        </AdminRoute>
      );

      expect(screen.queryByTestId('admin-content')).not.toBeInTheDocument();
    });
  });

  describe('AuthGuard Component', () => {
    test('should render children when authentication not required', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAdmin: false,
        isAuthenticated: false,
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        isLoading: false,
        trialDaysRemaining: 0
      });

      render(
        <AuthGuard requireAuth={false}>
          <TestProtectedComponent />
        </AuthGuard>
      );

      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });

    test('should show login required when authentication is required but user not authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAdmin: false,
        isAuthenticated: false,
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        isLoading: false,
        trialDaysRemaining: 0
      });

      render(
        <AuthGuard requireAuth={true}>
          <TestProtectedComponent />
        </AuthGuard>
      );

      expect(screen.getByText('تسجيل الدخول مطلوب')).toBeInTheDocument();
      expect(screen.getByTestId('button-login-required')).toBeInTheDocument();
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    test('should render children when authenticated and requireAuth is true', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', email: 'user@test.com', role: 'agent' },
        isAdmin: false,
        isAuthenticated: true,
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        isLoading: false,
        trialDaysRemaining: 0
      });

      render(
        <AuthGuard requireAuth={true}>
          <TestProtectedComponent />
        </AuthGuard>
      );

      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });

    test('should show plan upgrade when required plan not met', () => {
      mockUseAuth.mockReturnValue({
        user: { 
          id: '1', 
          email: 'user@test.com', 
          role: 'agent',
          subscription: { plan: 'free', status: 'active' }
        },
        isAdmin: false,
        isAuthenticated: true,
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        isLoading: false,
        trialDaysRemaining: 0
      });

      render(
        <AuthGuard requireAuth={true} requirePlan="pro">
          <TestProtectedComponent />
        </AuthGuard>
      );

      expect(screen.getByText('ترقية الخطة مطلوبة')).toBeInTheDocument();
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('RBAC Permission Functions', () => {
    test('hasPermission should grant admin full access', () => {
      expect(hasPermission('admin', 'accounts', 'delete')).toBe(true);
      expect(hasPermission('admin', 'any-resource', 'any-action')).toBe(true);
    });

    test('hasPermission should respect role-specific permissions', () => {
      expect(hasPermission('agent', 'accounts', 'read')).toBe(true);
      expect(hasPermission('agent', 'accounts', 'delete')).toBe(false);
      expect(hasPermission('viewer', 'accounts', 'create')).toBe(false);
    });

    test('hasPermission should check conditions', () => {
      const context = {
        userId: 'user1',
        assignedTo: 'user1',
        teamId: 'team1',
        userTeamId: 'team1'
      };

      expect(hasPermission('agent', 'deals', 'read', context)).toBe(true);

      const contextNotAssigned = {
        userId: 'user1',
        assignedTo: 'user2',
        teamId: 'team1',
        userTeamId: 'team1'
      };

      expect(hasPermission('agent', 'deals', 'read', contextNotAssigned)).toBe(false);
    });

    test('getVisibleFields should return correct fields for role', () => {
      const adminFields = getVisibleFields('admin', 'accounts');
      const agentFields = getVisibleFields('agent', 'accounts');
      const viewerFields = getVisibleFields('viewer', 'accounts');

      expect(adminFields).toContain('*');
      expect(agentFields).toContain('legalName');
      expect(agentFields).not.toContain('revenue');
      expect(viewerFields).toContain('legalName');
      expect(viewerFields).not.toContain('revenue');
    });

    test('canViewField should check field visibility correctly', () => {
      expect(canViewField('admin', 'accounts', 'revenue')).toBe(true);
      expect(canViewField('agent', 'accounts', 'revenue')).toBe(false);
      expect(canViewField('agent', 'accounts', 'legalName')).toBe(true);
      expect(canViewField('viewer', 'accounts', 'revenue')).toBe(false);
    });

    test('filterEntityFields should mask fields based on role', () => {
      const entity = {
        id: '1',
        legalName: 'Test Company',
        revenue: 1000000,
        email: 'test@company.com',
        secretField: 'secret'
      };

      const adminFiltered = filterEntityFields(entity, 'admin', 'accounts');
      const agentFiltered = filterEntityFields(entity, 'agent', 'accounts');

      expect(adminFiltered).toEqual(entity);
      expect(agentFiltered).toHaveProperty('legalName');
      expect(agentFiltered).toHaveProperty('email');
      expect(agentFiltered).not.toHaveProperty('revenue');
      expect(agentFiltered).not.toHaveProperty('secretField');
    });
  });

  describe('Component Props Masking', () => {
    // Test component that uses RBAC field masking
    interface TestEntityProps {
      entity: Record<string, any>;
      userRole: 'admin' | 'manager' | 'agent' | 'viewer';
      entityType: string;
    }

    function TestEntityComponent({ entity, userRole, entityType }: TestEntityProps) {
      const filteredEntity = filterEntityFields(entity, userRole, entityType);
      
      return (
        <div data-testid="entity-component">
          {Object.entries(filteredEntity).map(([key, value]) => (
            <div key={key} data-testid={`field-${key}`}>
              {key}: {String(value)}
            </div>
          ))}
        </div>
      );
    }

    test('should mask sensitive fields for non-admin users', () => {
      const entity = {
        id: '1',
        legalName: 'Test Company',
        revenue: 1000000,
        email: 'test@company.com'
      };

      render(
        <TestEntityComponent 
          entity={entity} 
          userRole="agent" 
          entityType="accounts" 
        />
      );

      expect(screen.getByTestId('field-legalName')).toBeInTheDocument();
      expect(screen.getByTestId('field-email')).toBeInTheDocument();
      expect(screen.queryByTestId('field-revenue')).not.toBeInTheDocument();
    });

    test('should show all fields for admin users', () => {
      const entity = {
        id: '1',
        legalName: 'Test Company',
        revenue: 1000000,
        email: 'test@company.com'
      };

      render(
        <TestEntityComponent 
          entity={entity} 
          userRole="admin" 
          entityType="accounts" 
        />
      );

      expect(screen.getByTestId('field-legalName')).toBeInTheDocument();
      expect(screen.getByTestId('field-email')).toBeInTheDocument();
      expect(screen.getByTestId('field-revenue')).toBeInTheDocument();
    });

    test('should mask different fields for different roles', () => {
      const userEntity = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@company.com',
        password: 'secret',
        salary: 75000
      };

      const { rerender } = render(
        <TestEntityComponent 
          entity={userEntity} 
          userRole="agent" 
          entityType="users" 
        />
      );

      expect(screen.getByTestId('field-firstName')).toBeInTheDocument();
      expect(screen.queryByTestId('field-password')).not.toBeInTheDocument();
      expect(screen.queryByTestId('field-salary')).not.toBeInTheDocument();

      rerender(
        <TestEntityComponent 
          entity={userEntity} 
          userRole="manager" 
          entityType="users" 
        />
      );

      expect(screen.getByTestId('field-firstName')).toBeInTheDocument();
      expect(screen.queryByTestId('field-password')).not.toBeInTheDocument();
      expect(screen.queryByTestId('field-salary')).not.toBeInTheDocument();
    });
  });
});