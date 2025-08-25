import { db } from "../server/db";
import { eq, and, like, desc, asc, inArray, isNull } from "drizzle-orm";

// DTOs for API responses
export interface ContactDTO {
  id: string;
  companyId?: string;
  companyName?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email?: string;
  phone?: string;
  mobile?: string;
  jobTitle?: string;
  department?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
  isPrimary: boolean;
  isDecisionMaker: boolean;
  leadSource?: string;
  leadScore: number;
  tags: string[];
  notes?: string;
  lastContactedAt?: Date;
  ownerId?: string;
  ownerName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactListResponse {
  contacts: ContactDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ContactFilters {
  search?: string;
  companyId?: string;
  ownerId?: string;
  leadSource?: string;
  isDecisionMaker?: boolean;
  leadScoreMin?: number;
  leadScoreMax?: number;
  tags?: string[];
  hasEmail?: boolean;
  hasPhone?: boolean;
}

export interface ContactCreateInput {
  companyId?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  mobile?: string;
  jobTitle?: string;
  department?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
  isPrimary?: boolean;
  isDecisionMaker?: boolean;
  leadSource?: string;
  leadScore?: number;
  tags?: string[];
  notes?: string;
  ownerId?: string;
}

export interface ContactUpdateInput extends Partial<ContactCreateInput> {
  lastContactedAt?: Date;
}

class ContactsService {
  async getContacts(
    filters: ContactFilters = {},
    page: number = 1,
    limit: number = 20,
    sortBy: string = 'updated_at',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<ContactListResponse> {
    const offset = (page - 1) * limit;
    
    // Build query conditions
    const conditions = [];
    
    if (filters.search) {
      const searchTerm = `%${filters.search}%`;
      conditions.push(
        db.$with('search').as(
          db.select().from('crm_contacts').where(
            db.or(
              like('first_name', searchTerm),
              like('last_name', searchTerm),
              like('email', searchTerm),
              like('job_title', searchTerm)
            )
          )
        )
      );
    }
    
    if (filters.companyId) {
      conditions.push(eq('company_id', filters.companyId));
    }
    
    if (filters.ownerId) {
      conditions.push(eq('owner_id', filters.ownerId));
    }
    
    if (filters.leadSource) {
      conditions.push(eq('lead_source', filters.leadSource));
    }
    
    if (filters.isDecisionMaker !== undefined) {
      conditions.push(eq('is_decision_maker', filters.isDecisionMaker));
    }
    
    if (filters.leadScoreMin !== undefined) {
      conditions.push(gte('lead_score', filters.leadScoreMin));
    }
    
    if (filters.leadScoreMax !== undefined) {
      conditions.push(lte('lead_score', filters.leadScoreMax));
    }
    
    if (filters.hasEmail) {
      conditions.push(isNull('email').not());
    }
    
    if (filters.hasPhone) {
      conditions.push(
        db.or(
          isNull('phone').not(),
          isNull('mobile').not()
        )
      );
    }

    // Execute query with joins
    const query = db
      .select({
        contact: 'crm_contacts.*',
        companyName: 'crm_companies.name',
        ownerName: 'users.name'
      })
      .from('crm_contacts')
      .leftJoin('crm_companies', eq('crm_contacts.company_id', 'crm_companies.id'))
      .leftJoin('users', eq('crm_contacts.owner_id', 'users.id'))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(sortOrder === 'desc' ? desc(sortBy) : asc(sortBy))
      .limit(limit)
      .offset(offset);

    const [contacts, [{ count }]] = await Promise.all([
      query,
      db.select({ count: db.count() }).from('crm_contacts').where(conditions.length > 0 ? and(...conditions) : undefined)
    ]);

    // Transform to DTOs
    const contactDTOs: ContactDTO[] = contacts.map(row => ({
      id: row.contact.id,
      companyId: row.contact.company_id,
      companyName: row.companyName,
      firstName: row.contact.first_name,
      lastName: row.contact.last_name,
      fullName: `${row.contact.first_name} ${row.contact.last_name}`,
      email: row.contact.email,
      phone: row.contact.phone,
      mobile: row.contact.mobile,
      jobTitle: row.contact.job_title,
      department: row.contact.department,
      linkedinUrl: row.contact.linkedin_url,
      avatarUrl: row.contact.avatar_url,
      isPrimary: row.contact.is_primary,
      isDecisionMaker: row.contact.is_decision_maker,
      leadSource: row.contact.lead_source,
      leadScore: row.contact.lead_score,
      tags: row.contact.tags || [],
      notes: row.contact.notes,
      lastContactedAt: row.contact.last_contacted_at,
      ownerId: row.contact.owner_id,
      ownerName: row.ownerName,
      createdAt: row.contact.created_at,
      updatedAt: row.contact.updated_at
    }));

    return {
      contacts: contactDTOs,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    };
  }

  async getContactById(id: string): Promise<ContactDTO | null> {
    const result = await db
      .select({
        contact: 'crm_contacts.*',
        companyName: 'crm_companies.name',
        ownerName: 'users.name'
      })
      .from('crm_contacts')
      .leftJoin('crm_companies', eq('crm_contacts.company_id', 'crm_companies.id'))
      .leftJoin('users', eq('crm_contacts.owner_id', 'users.id'))
      .where(eq('crm_contacts.id', id))
      .limit(1);

    if (!result.length) return null;

    const row = result[0];
    return {
      id: row.contact.id,
      companyId: row.contact.company_id,
      companyName: row.companyName,
      firstName: row.contact.first_name,
      lastName: row.contact.last_name,
      fullName: `${row.contact.first_name} ${row.contact.last_name}`,
      email: row.contact.email,
      phone: row.contact.phone,
      mobile: row.contact.mobile,
      jobTitle: row.contact.job_title,
      department: row.contact.department,
      linkedinUrl: row.contact.linkedin_url,
      avatarUrl: row.contact.avatar_url,
      isPrimary: row.contact.is_primary,
      isDecisionMaker: row.contact.is_decision_maker,
      leadSource: row.contact.lead_source,
      leadScore: row.contact.lead_score,
      tags: row.contact.tags || [],
      notes: row.contact.notes,
      lastContactedAt: row.contact.last_contacted_at,
      ownerId: row.contact.owner_id,
      ownerName: row.ownerName,
      createdAt: row.contact.created_at,
      updatedAt: row.contact.updated_at
    };
  }

  async createContact(input: ContactCreateInput): Promise<ContactDTO> {
    const [created] = await db.insert('crm_contacts').values({
      company_id: input.companyId,
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      phone: input.phone,
      mobile: input.mobile,
      job_title: input.jobTitle,
      department: input.department,
      linkedin_url: input.linkedinUrl,
      avatar_url: input.avatarUrl,
      is_primary: input.isPrimary || false,
      is_decision_maker: input.isDecisionMaker || false,
      lead_source: input.leadSource,
      lead_score: input.leadScore || 0,
      tags: input.tags || [],
      notes: input.notes,
      owner_id: input.ownerId,
      updated_at: new Date()
    }).returning();

    return this.getContactById(created.id)!;
  }

  async updateContact(id: string, input: ContactUpdateInput): Promise<ContactDTO | null> {
    const [updated] = await db.update('crm_contacts')
      .set({
        company_id: input.companyId,
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        phone: input.phone,
        mobile: input.mobile,
        job_title: input.jobTitle,
        department: input.department,
        linkedin_url: input.linkedinUrl,
        avatar_url: input.avatarUrl,
        is_primary: input.isPrimary,
        is_decision_maker: input.isDecisionMaker,
        lead_source: input.leadSource,
        lead_score: input.leadScore,
        tags: input.tags,
        notes: input.notes,
        last_contacted_at: input.lastContactedAt,
        owner_id: input.ownerId,
        updated_at: new Date()
      })
      .where(eq('id', id))
      .returning();

    if (!updated) return null;
    return this.getContactById(id);
  }

  async deleteContact(id: string): Promise<boolean> {
    const result = await db.delete('crm_contacts').where(eq('id', id));
    return result.rowCount > 0;
  }

  async getContactsByCompany(companyId: string): Promise<ContactDTO[]> {
    const result = await this.getContacts({ companyId }, 1, 100);
    return result.contacts;
  }

  async searchContacts(query: string, limit: number = 10): Promise<ContactDTO[]> {
    const result = await this.getContacts({ search: query }, 1, limit);
    return result.contacts;
  }
}

export const contactsService = new ContactsService();