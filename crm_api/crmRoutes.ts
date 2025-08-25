import { Router } from "express";
import { simpleContactsService } from "../crm_services/simpleContactsService";
import { simpleCompaniesService } from "../crm_services/simpleCompaniesService";
import { simpleDealsService } from "../crm_services/simpleDealsService";

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

// Deals endpoints
router.get("/deals/kanban", async (req, res) => {
  try {
    const kanbanData = await simpleDealsService.getKanbanData();
    res.json(kanbanData);
  } catch (error) {
    console.error("Error fetching kanban data:", error);
    res.status(500).json({ error: "Failed to fetch kanban data" });
  }
});

router.get("/deals/stages", async (req, res) => {
  try {
    const stages = await simpleDealsService.getDealStages();
    res.json(stages);
  } catch (error) {
    console.error("Error fetching deal stages:", error);
    res.status(500).json({ error: "Failed to fetch deal stages" });
  }
});

router.get("/deals", async (req, res) => {
  try {
    const deals = await simpleDealsService.getAllDeals();
    res.json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

router.post("/deals", async (req, res) => {
  try {
    const deal = await simpleDealsService.createDeal(req.body);
    if (!deal) {
      return res.status(400).json({ error: "Failed to create deal" });
    }
    res.status(201).json(deal);
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({ error: "Failed to create deal" });
  }
});

router.put("/deals/:id/stage", async (req, res) => {
  try {
    const { stageId } = req.body;
    const deal = await simpleDealsService.updateDealStage(req.params.id, stageId);
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
    const success = await simpleDealsService.deleteDeal(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ error: "Failed to delete deal" });
  }
});

// Tickets endpoints (basic structure)
router.get("/tickets", async (req, res) => {
  try {
    // TODO: Implement ticket service
    res.json([]);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

// Activities/Timeline endpoints (basic structure)
router.get("/activities/:entityType/:entityId", async (req, res) => {
  try {
    // TODO: Implement activities service
    res.json([]);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

export { router as crmRoutes };