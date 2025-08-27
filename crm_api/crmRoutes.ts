import { Router } from "express";
import { simpleContactsService } from "../crm_services/simpleContactsService";
import { simpleCompaniesService } from "../crm_services/simpleCompaniesService";
import { simpleDealsService } from "../crm_services/simpleDealsService";
import { dealsService } from "../crm_services/dealsService";
import { ticketsService } from "../crm_services/ticketsService";
import { activitiesService } from "../crm_services/activitiesService";

const router = Router();

// Contacts endpoints
router.get("/contacts", async (req, res) => {
  try {
    const { search } = req.query;
    
    if (search && typeof search === 'string') {
      const contacts = await simpleContactsService.searchContacts(search);
      res.json(contacts);
    } else {
      const contacts = await simpleContactsService.getAllContacts();
      res.json(contacts);
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

router.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await simpleContactsService.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const contact = await simpleContactsService.createContact(req.body);
    if (!contact) {
      return res.status(400).json({ error: "Failed to create contact" });
    }
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
});

router.put("/contacts/:id", async (req, res) => {
  try {
    const contact = await simpleContactsService.updateContact(req.params.id, req.body);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Failed to update contact" });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    const success = await simpleContactsService.deleteContact(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// Companies endpoints
router.get("/companies", async (req, res) => {
  try {
    const { search } = req.query;
    
    if (search && typeof search === 'string') {
      const companies = await simpleCompaniesService.searchCompanies(search);
      res.json(companies);
    } else {
      const companies = await simpleCompaniesService.getAllCompanies();
      res.json(companies);
    }
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

router.get("/companies/:id", async (req, res) => {
  try {
    const company = await simpleCompaniesService.getCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "Failed to fetch company" });
  }
});

router.post("/companies", async (req, res) => {
  try {
    const company = await simpleCompaniesService.createCompany(req.body);
    if (!company) {
      return res.status(400).json({ error: "Failed to create company" });
    }
    res.status(201).json(company);
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "Failed to create company" });
  }
});

router.put("/companies/:id", async (req, res) => {
  try {
    const company = await simpleCompaniesService.updateCompany(req.params.id, req.body);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ error: "Failed to update company" });
  }
});

router.delete("/companies/:id", async (req, res) => {
  try {
    const success = await simpleCompaniesService.deleteCompany(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ error: "Failed to delete company" });
  }
});

// Deals endpoints - Enhanced with new service
router.get("/deals/kanban", async (req, res) => {
  try {
    const kanbanData = await dealsService.getKanbanData();
    res.json(kanbanData);
  } catch (error) {
    console.error("Error fetching kanban data:", error);
    res.status(500).json({ error: "Failed to fetch kanban data" });
  }
});

router.get("/deals/stages", async (req, res) => {
  try {
    const stages = await dealsService.getDealStages();
    res.json(stages);
  } catch (error) {
    console.error("Error fetching deal stages:", error);
    res.status(500).json({ error: "Failed to fetch deal stages" });
  }
});

router.get("/deals", async (req, res) => {
  try {
    const { search, stageId, accountId, ownerId, page = 1, limit = 20, sortBy = 'updated_at', sortOrder = 'desc' } = req.query;
    
    const filters = {
      search: search as string,
      stageId: stageId as string,
      accountId: accountId as string,
      ownerId: ownerId as string
    };

    const result = await dealsService.getDeals(
      filters, 
      parseInt(page as string), 
      parseInt(limit as string),
      sortBy as string,
      sortOrder as 'asc' | 'desc'
    );
    
    res.json(result);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

router.get("/deals/:id", async (req, res) => {
  try {
    const deal = await dealsService.getDealById(req.params.id);
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json(deal);
  } catch (error) {
    console.error("Error fetching deal:", error);
    res.status(500).json({ error: "Failed to fetch deal" });
  }
});

router.post("/deals", async (req, res) => {
  try {
    const deal = await dealsService.createDeal(req.body);
    if (!deal) {
      return res.status(400).json({ error: "Failed to create deal" });
    }
    res.status(201).json(deal);
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({ error: "Failed to create deal" });
  }
});

router.put("/deals/:id", async (req, res) => {
  try {
    const deal = await dealsService.updateDeal(req.params.id, req.body);
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json(deal);
  } catch (error) {
    console.error("Error updating deal:", error);
    res.status(500).json({ error: "Failed to update deal" });
  }
});

router.put("/deals/:id/stage", async (req, res) => {
  try {
    const { stageId } = req.body;
    const deal = await dealsService.updateDealStage(req.params.id, stageId);
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json(deal);
  } catch (error) {
    console.error("Error updating deal stage:", error);
    res.status(500).json({ error: "Failed to update deal stage" });
  }
});

router.delete("/deals/:id", async (req, res) => {
  try {
    const success = await dealsService.deleteDeal(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ error: "Failed to delete deal" });
  }
});

// Tickets endpoints - Enhanced
router.get("/tickets", async (req, res) => {
  try {
    const { search, status, priority, assignedTo, page = 1, limit = 20, sortBy = 'updated_at', sortOrder = 'desc' } = req.query;
    
    const filters = {
      search: search as string,
      status: status as string,
      priority: priority as string,
      assignedTo: assignedTo as string
    };

    const result = await ticketsService.getTickets(
      filters,
      parseInt(page as string),
      parseInt(limit as string),
      sortBy as string,
      sortOrder as 'asc' | 'desc'
    );
    
    res.json(result);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

router.get("/tickets/statuses", async (req, res) => {
  try {
    const statuses = await ticketsService.getTicketStatuses();
    res.json(statuses);
  } catch (error) {
    console.error("Error fetching ticket statuses:", error);
    res.status(500).json({ error: "Failed to fetch ticket statuses" });
  }
});

router.get("/tickets/:id", async (req, res) => {
  try {
    const ticket = await ticketsService.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
});

router.post("/tickets", async (req, res) => {
  try {
    const ticket = await ticketsService.createTicket(req.body);
    if (!ticket) {
      return res.status(400).json({ error: "Failed to create ticket" });
    }
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

router.put("/tickets/:id", async (req, res) => {
  try {
    const ticket = await ticketsService.updateTicket(req.params.id, req.body);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: "Failed to update ticket" });
  }
});

router.put("/tickets/:id/status", async (req, res) => {
  try {
    const { statusId } = req.body;
    const ticket = await ticketsService.updateTicketStatus(req.params.id, statusId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ error: "Failed to update ticket status" });
  }
});

router.delete("/tickets/:id", async (req, res) => {
  try {
    const success = await ticketsService.deleteTicket(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
});

// Activities/Timeline endpoints - Enhanced
router.get("/activities/:entityType/:entityId", async (req, res) => {
  try {
    const { entityType, entityId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    const result = await activitiesService.getActivities(
      { entityType, entityId },
      parseInt(page as string),
      parseInt(limit as string)
    );
    
    res.json(result);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

router.post("/activities", async (req, res) => {
  try {
    const activity = await activitiesService.createActivity(req.body);
    if (!activity) {
      return res.status(400).json({ error: "Failed to create activity" });
    }
    res.status(201).json(activity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ error: "Failed to create activity" });
  }
});

router.put("/activities/:id/complete", async (req, res) => {
  try {
    const activity = await activitiesService.completeActivity(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.json(activity);
  } catch (error) {
    console.error("Error completing activity:", error);
    res.status(500).json({ error: "Failed to complete activity" });
  }
});

export { router as crmRoutes };