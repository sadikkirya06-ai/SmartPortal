import { Router, Request, Response } from 'express';

const router = Router();

const withTenant = (req: Request, res: Response, next: () => void) => {
  const organizationId = req.params.organizationId ?? req.headers['x-tenant-id'];

  if (!organizationId) {
    return res.status(400).json({ message: 'Tenant context is required' });
  }

  req.app.locals.organizationId = organizationId;
  next();
};

router.use('/:organizationId', withTenant);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'smartportal-api' });
});

router.get('/:organizationId/master-data/raw-materials', (_req, res) => {
  res.json({
    data: [
      { id: 'rm_1', sku: 'RM-1001', name: 'HDPE Resin', uom: 'kg', reorderPoint: 50, baseCost: 4.25 },
      { id: 'rm_2', sku: 'RM-2002', name: 'Industrial Solvent', uom: 'liters', reorderPoint: 20, baseCost: 11.5 }
    ]
  });
});

router.post('/:organizationId/master-data/raw-materials', (req, res) => {
  res.status(201).json({ message: 'Raw material created', payload: req.body });
});

router.get('/:organizationId/master-data/products', (_req, res) => {
  res.json({
    data: [
      { id: 'prod_1', sku: 'FG-9001', name: 'Bulk Storage Tank', sellingPrice: 1800, barcode: '890123456789' }
    ]
  });
});

router.get('/:organizationId/procurement/purchase-requests', (_req, res) => {
  res.json({
    data: [
      { id: 'pr_1', requestNo: 'PR-2026-001', status: 'APPROVED', total: 4800 }
    ]
  });
});

router.post('/:organizationId/procurement/purchase-requests', (req, res) => {
  res.status(201).json({ message: 'Purchase request saved', payload: req.body });
});

router.get('/:organizationId/procurement/purchase-orders', (_req, res) => {
  res.json({
    data: [
      { id: 'po_1', poNo: 'PO-2026-110', supplier: 'Gulf Supply Co.', total: 9600, status: 'SENT' }
    ]
  });
});

router.get('/:organizationId/inventory/stock', (_req, res) => {
  res.json({
    data: [
      { location: 'WH-01', sku: 'FG-9001', onHand: 42, reorderPoint: 10, status: 'healthy' },
      { location: 'WH-03', sku: 'RM-1001', onHand: 6, reorderPoint: 15, status: 'low-stock' }
    ]
  });
});

router.post('/:organizationId/inventory/adjustments', (req, res) => {
  res.status(201).json({ message: 'Inventory adjustment registered', payload: req.body });
});

router.get('/:organizationId/sales/quotes', (_req, res) => {
  res.json({
    data: [
      { id: 'q_1', quoteNo: 'Q-2026-008', customer: 'Al Muna Logistics', total: 6250, status: 'SENT' }
    ]
  });
});

router.get('/:organizationId/sales/invoices', (_req, res) => {
  res.json({
    data: [
      { id: 'inv_1', invoiceNo: 'INV-2026-016', customer: 'Nexus Retail', total: 17450, status: 'OPEN' }
    ]
  });
});

router.post('/:organizationId/saas/signup', (req, res) => {
  res.status(201).json({
    message: 'Tenant onboarding initiated',
    organization: { id: req.params.organizationId || 'tenant_123', name: req.body.companyName || 'Acme Corp' }
  });
});

router.get('/:organizationId/saas/team', (_req, res) => {
  res.json({
    data: [
      { id: 'u_1', fullName: 'Amina Saleh', role: 'Administrator' },
      { id: 'u_2', fullName: 'Omar Naser', role: 'Warehouse Clerk' }
    ]
  });
});

export default router;
