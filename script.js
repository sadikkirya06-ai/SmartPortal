const overviewStats = [
  { label: 'Active Tenants', value: 18, icon: '◎', tone: 'blue' },
  { label: 'Open POs', value: 46, icon: '▣', tone: 'green' },
  { label: 'Low Stock Alerts', value: 11, icon: '!', tone: 'orange' },
  { label: 'Monthly Turnover', value: 'AED 1.4M', icon: '◈', tone: 'purple' }
];

const modules = [
  {
    title: 'Master Data',
    subtitle: 'Core setup and product governance',
    items: ['Raw Materials Profile', 'Products Profile', 'Locations', 'Categories', 'Suppliers', 'Staff Profiles']
  },
  {
    title: 'Procurement',
    subtitle: 'Buy smart and stay compliant',
    items: ['Purchase Request', 'Vendor Comparison', 'Purchase Order', 'Supplier Bill Log', 'Supplier Return']
  },
  {
    title: 'Inventory',
    subtitle: 'Stock visibility and warehouse operations',
    items: ['Single Order Intake', 'Bulk Intake', 'Receiving Notes', 'Transfers', 'Adjustments', 'Inventory Report']
  },
  {
    title: 'Sales & Fulfillment',
    subtitle: 'Orders, billing, and receivables',
    items: ['Quotation', 'Delivery Note', 'Tax Invoice', 'Proforma Invoice', 'Credit Note', 'Receipt Voucher']
  },
  {
    title: 'SaaS Billing',
    subtitle: 'Tenant onboarding and subscription lifecycle',
    items: ['User Registration', 'Subscription Checkout', 'Organization Settings', 'Team & Role Management']
  },
  {
    title: 'Controls',
    subtitle: 'Audit and operational governance',
    items: ['Approval Workflows', 'Role Based Access', 'Inventory Valuation', 'Low Stock Warnings', 'Audit Trails']
  }
];

const recentActivity = [
  { reference: 'PR-2026-102', module: 'Procurement', tenant: 'Acme Trading', owner: 'A. Saleh', status: 'Approved', statusClass: 'success', updated: '2h ago' },
  { reference: 'INV-2026-070', module: 'Sales', tenant: 'Nexus Retail', owner: 'M. Rahman', status: 'Pending', statusClass: 'warning', updated: '4h ago' },
  { reference: 'TFR-2026-014', module: 'Inventory', tenant: 'Blue Harbor', owner: 'O. Naser', status: 'In Transit', statusClass: 'neutral', updated: 'Today' },
  { reference: 'STK-2026-009', module: 'Inventory', tenant: 'Desert Foods', owner: 'L. Hassan', status: 'Reconciled', statusClass: 'success', updated: '1d ago' },
  { reference: 'CN-2026-003', module: 'Sales', tenant: 'Al Muna Logistics', owner: 'F. Kader', status: 'Needs Review', statusClass: 'danger', updated: '1d ago' }
];

const sectionConfig = {
  dashboard: {
    title: 'Business Control Center',
    breadcrumb: 'Operations Hub / Dashboard',
    description: 'Unified workflows for master data, procurement, inventory, sales, and tenant management.',
    metrics: []
  },
  'raw-materials': {
    title: 'Raw Materials Profile',
    breadcrumb: 'Operations Hub / Master Data / Raw Materials',
    description: 'Track raw material SKU, unit of measure, cost, and reorder safety levels.',
    actionLabel: 'Raw Material',
    columns: [
      { key: 'sku', label: 'SKU' },
      { key: 'itemName', label: 'Item Name' },
      { key: 'uom', label: 'UOM' },
      { key: 'baseCost', label: 'Base Cost', type: 'currency' },
      { key: 'reorderPoint', label: 'Reorder Point', type: 'number' },
      { key: 'category', label: 'Category' }
    ],
    fields: [
      { name: 'sku', label: 'SKU', type: 'text', placeholder: 'RM-1001' },
      { name: 'itemName', label: 'Item Name', type: 'text', placeholder: 'HDPE Resin' },
      { name: 'uom', label: 'Unit of Measure', type: 'select', options: ['kg', 'liters', 'pcs', 'boxes'] },
      { name: 'baseCost', label: 'Base Cost', type: 'number', step: '0.01' },
      { name: 'reorderPoint', label: 'Safety Reorder', type: 'number', step: '0.01' },
      { name: 'category', label: 'Category', type: 'text', placeholder: 'Plastics' }
    ],
    metrics: [{ label: 'Active SKUs', value: 24 }, { label: 'Low Stock', value: 5 }, { label: 'Reorder Watchlist', value: 3 }]
  },
  products: {
    title: 'Products Profile',
    breadcrumb: 'Operations Hub / Master Data / Products',
    description: 'Track finished goods demand, pricing, inventory status, and barcodes.',
    actionLabel: 'Product',
    columns: [
      { key: 'sku', label: 'SKU' },
      { key: 'itemName', label: 'Item Name' },
      { key: 'category', label: 'Category' },
      { key: 'sellingPrice', label: 'Selling Price', type: 'currency' },
      { key: 'barcode', label: 'Barcode' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'sku', label: 'SKU', type: 'text', placeholder: 'FG-1001' },
      { name: 'itemName', label: 'Item Name', type: 'text', placeholder: 'Storage Tank' },
      { name: 'category', label: 'Category', type: 'text', placeholder: 'Industrial' },
      { name: 'sellingPrice', label: 'Selling Price', type: 'number', step: '0.01' },
      { name: 'barcode', label: 'Barcode', type: 'text', placeholder: '890123456789' },
      { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Low Stock', 'Discontinued'] }
    ],
    metrics: [{ label: 'Finished Goods', value: 87 }, { label: 'Active Items', value: 71 }, { label: 'Low Stock', value: 9 }]
  },
  locations: {
    title: 'Locations Form',
    breadcrumb: 'Operations Hub / Master Data / Locations',
    description: 'Manage warehouse, storefront, and storage-bin locations across the business.',
    actionLabel: 'Location',
    columns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Name' },
      { key: 'type', label: 'Type' },
      { key: 'city', label: 'City' },
      { key: 'country', label: 'Country' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'code', label: 'Code', type: 'text', placeholder: 'WH-01' },
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Warehouse 01' },
      { name: 'type', label: 'Type', type: 'select', options: ['WAREHOUSE', 'STORE', 'BIN', 'OUTLET'] },
      { name: 'city', label: 'City', type: 'text', placeholder: 'Dubai' },
      { name: 'country', label: 'Country', type: 'text', placeholder: 'UAE' },
      { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ],
    metrics: [{ label: 'Locations', value: 12 }, { label: 'Warehouses', value: 4 }, { label: 'Open Stores', value: 3 }]
  },
  categories: {
    title: 'Categories Manager',
    breadcrumb: 'Operations Hub / Master Data / Categories',
    description: 'Organize raw materials and finished goods by category tree and classification.',
    actionLabel: 'Category',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'type', label: 'Type' },
      { key: 'parent', label: 'Parent' },
      { key: 'items', label: 'Linked Items' }
    ],
    fields: [
      { name: 'name', label: 'Category Name', type: 'text', placeholder: 'Plastics' },
      { name: 'type', label: 'Type', type: 'select', options: ['RAW_MATERIAL', 'PRODUCT', 'GENERAL'] },
      { name: 'parent', label: 'Parent Category', type: 'text', placeholder: 'Packaging' },
      { name: 'items', label: 'Linked Items', type: 'number' }
    ],
    metrics: [{ label: 'Categories', value: 18 }, { label: 'Raw Groups', value: 8 }, { label: 'Product Groups', value: 10 }]
  },
  suppliers: {
    title: 'Suppliers Profile',
    breadcrumb: 'Operations Hub / Master Data / Suppliers',
    description: 'Track approved suppliers, tax details, payment terms, and primary contacts.',
    actionLabel: 'Supplier',
    columns: [
      { key: 'supplierName', label: 'Supplier Name' },
      { key: 'contactName', label: 'Contact' },
      { key: 'email', label: 'Email' },
      { key: 'taxId', label: 'Tax ID' },
      { key: 'paymentTerms', label: 'Payment Terms' }
    ],
    fields: [
      { name: 'supplierName', label: 'Supplier Name', type: 'text', placeholder: 'Gulf Supply Co.' },
      { name: 'contactName', label: 'Primary Contact', type: 'text', placeholder: 'Nasser Ali' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'ops@gulfsupply.com' },
      { name: 'taxId', label: 'Tax ID', type: 'text', placeholder: '1001234567003' },
      { name: 'paymentTerms', label: 'Payment Terms', type: 'text', placeholder: 'Net 30' }
    ],
    metrics: [{ label: 'Suppliers', value: 34 }, { label: 'Preferred', value: 12 }, { label: 'On Hold', value: 2 }]
  },
  'staff-profiles': {
    title: 'Staff Profiles',
    breadcrumb: 'Operations Hub / Master Data / Staff',
    description: 'Maintain internal employee positions, departments, and system access mapping.',
    actionLabel: 'Staff Member',
    columns: [
      { key: 'fullName', label: 'Full Name' },
      { key: 'jobTitle', label: 'Job Title' },
      { key: 'department', label: 'Department' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Amina Saleh' },
      { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Procurement Officer' },
      { name: 'department', label: 'Department', type: 'text', placeholder: 'Operations' },
      { name: 'status', label: 'Status', type: 'select', options: ['ACTIVE', 'INACTIVE', 'ON_LEAVE'] }
    ],
    metrics: [{ label: 'Staff', value: 56 }, { label: 'Procurement', value: 7 }, { label: 'Warehouse', value: 12 }]
  },
  'purchase-requests': {
    title: 'Purchase Request (PR)',
    breadcrumb: 'Operations Hub / Procurement / Purchase Requests',
    description: 'Internal employee workflow for requesting inventory and supply replenishment.',
    actionLabel: 'Purchase Request',
    columns: [
      { key: 'requestNo', label: 'Request No.' },
      { key: 'requestedBy', label: 'Requested By' },
      { key: 'amount', label: 'Amount', type: 'currency' },
      { key: 'status', label: 'Status' },
      { key: 'date', label: 'Date' }
    ],
    fields: [
      { name: 'requestNo', label: 'Request No.', type: 'text', placeholder: 'PR-2026-001' },
      { name: 'requestedBy', label: 'Requested By', type: 'text', placeholder: 'Amina Saleh' },
      { name: 'amount', label: 'Amount', type: 'number', step: '0.01' },
      { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'] },
      { name: 'date', label: 'Date', type: 'date' }
    ],
    metrics: [{ label: 'Open PRs', value: 18 }, { label: 'Approved', value: 12 }, { label: 'Pending', value: 6 }]
  },
  'vendor-comparison': {
    title: 'Vendor Comparison Sheet',
    breadcrumb: 'Operations Hub / Procurement / Vendor Comparison',
    description: 'Compare supplier quotes, prices, and delivery terms side-by-side.',
    actionLabel: 'Quote Comparison',
    columns: [
      { key: 'supplier', label: 'Supplier' },
      { key: 'quoteNo', label: 'Quote No.' },
      { key: 'unitPrice', label: 'Unit Price', type: 'currency' },
      { key: 'leadTime', label: 'Lead Time' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'supplier', label: 'Supplier', type: 'text', placeholder: 'Gulf Supply Co.' },
      { name: 'quoteNo', label: 'Quote No.', type: 'text', placeholder: 'Q-2026-044' },
      { name: 'unitPrice', label: 'Unit Price', type: 'number', step: '0.01' },
      { name: 'leadTime', label: 'Lead Time (days)', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: ['PENDING', 'PREFERRED', 'REJECTED'] }
    ],
    metrics: [{ label: 'Quotes', value: 21 }, { label: 'Preferred', value: 6 }, { label: 'Avg. Lead Time', value: '12d' }]
  },
  'purchase-orders': {
    title: 'Purchase Order (PO)',
    breadcrumb: 'Operations Hub / Procurement / Purchase Orders',
    description: 'Generate legally binding orders and track supplier fulfilment progress.',
    actionLabel: 'Purchase Order',
    columns: [
      { key: 'poNo', label: 'PO No.' },
      { key: 'supplier', label: 'Supplier' },
      { key: 'totalAmount', label: 'Total Amount', type: 'currency' },
      { key: 'status', label: 'Status' },
      { key: 'orderDate', label: 'Order Date' }
    ],
    fields: [
      { name: 'poNo', label: 'PO No.', type: 'text', placeholder: 'PO-2026-110' },
      { name: 'supplier', label: 'Supplier', type: 'text', placeholder: 'Gulf Supply Co.' },
      { name: 'totalAmount', label: 'Total Amount', type: 'number', step: '0.01' },
      { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'APPROVED', 'SENT', 'CLOSED'] },
      { name: 'orderDate', label: 'Order Date', type: 'date' }
    ],
    metrics: [{ label: 'Purchase Orders', value: 36 }, { label: 'Open', value: 16 }, { label: 'Closed', value: 9 }]
  },
  'supplier-bills': {
    title: 'Supplier Bill Log',
    breadcrumb: 'Operations Hub / Procurement / Supplier Bills',
    description: 'Record inbound invoices and reconcile them against purchase orders and receipts.',
    actionLabel: 'Supplier Bill',
    columns: [
      { key: 'billNo', label: 'Bill No.' },
      { key: 'supplier', label: 'Supplier' },
      { key: 'grossAmount', label: 'Gross Amount', type: 'currency' },
      { key: 'status', label: 'Status' },
      { key: 'invoiceDate', label: 'Invoice Date' }
    ],
    fields: [
      { name: 'billNo', label: 'Bill No.', type: 'text', placeholder: 'BILL-102' },
      { name: 'supplier', label: 'Supplier', type: 'text', placeholder: 'Gulf Supply Co.' },
      { name: 'grossAmount', label: 'Gross Amount', type: 'number', step: '0.01' },
      { name: 'status', label: 'Status', type: 'select', options: ['OPEN', 'PARTIALLY_PAID', 'PAID', 'OVERDUE'] },
      { name: 'invoiceDate', label: 'Invoice Date', type: 'date' }
    ],
    metrics: [{ label: 'Bills', value: 29 }, { label: 'Open', value: 11 }, { label: 'Overdue', value: 3 }]
  },
  'supplier-returns': {
    title: 'Supplier Return (Debit Note)',
    breadcrumb: 'Operations Hub / Procurement / Supplier Returns',
    description: 'Adjust outbound return claims and reconcile vendor credit balances.',
    actionLabel: 'Supplier Return',
    columns: [
      { key: 'returnNo', label: 'Return No.' },
      { key: 'supplier', label: 'Supplier' },
      { key: 'reason', label: 'Reason' },
      { key: 'totalAmount', label: 'Total Amount', type: 'currency' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'returnNo', label: 'Return No.', type: 'text', placeholder: 'RET-002' },
      { name: 'supplier', label: 'Supplier', type: 'text', placeholder: 'Apex Steel' },
      { name: 'reason', label: 'Reason', type: 'text', placeholder: 'Damaged items' },
      { name: 'totalAmount', label: 'Total Amount', type: 'number', step: '0.01' },
      { name: 'status', label: 'Status', type: 'select', options: ['ISSUED', 'APPROVED', 'CLOSED'] }
    ],
    metrics: [{ label: 'Returns', value: 7 }, { label: 'Approved', value: 5 }, { label: 'Open', value: 2 }]
  },
  'single-order-intake': {
    title: 'Single Order Intake',
    breadcrumb: 'Operations Hub / Inventory / Single Order Intake',
    description: 'Log a single incoming stock item directly into a selected location.',
    actionLabel: 'Single Intake',
    columns: [
      { key: 'reference', label: 'Reference' },
      { key: 'item', label: 'Item' },
      { key: 'location', label: 'Location' },
      { key: 'quantity', label: 'Quantity', type: 'number' },
      { key: 'supplier', label: 'Supplier' }
    ],
    fields: [
      { name: 'reference', label: 'Reference', type: 'text', placeholder: 'SO-1001' },
      { name: 'item', label: 'Item', type: 'text', placeholder: 'Steel Rod' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'WH-01' },
      { name: 'quantity', label: 'Quantity', type: 'number' },
      { name: 'supplier', label: 'Supplier', type: 'text', placeholder: 'Apex Steel' }
    ],
    metrics: [{ label: 'Intakes', value: 142 }, { label: 'Today', value: 8 }, { label: 'Pending QA', value: 3 }]
  },
  'bulk-intake': {
    title: 'Bulk Order Intake',
    breadcrumb: 'Operations Hub / Inventory / Bulk Intake',
    description: 'Import or input bulk stock records by CSV or multi-row inventory list.',
    actionLabel: 'Bulk Intake',
    columns: [
      { key: 'batch', label: 'Batch' },
      { key: 'source', label: 'Source' },
      { key: 'location', label: 'Location' },
      { key: 'totalQty', label: 'Total Qty', type: 'number' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'batch', label: 'Batch', type: 'text', placeholder: 'BULK-2026-01' },
      { name: 'source', label: 'Source', type: 'text', placeholder: 'Main Supplier' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'WH-02' },
      { name: 'totalQty', label: 'Total Qty', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: ['Queued', 'Uploaded', 'Processed'] }
    ],
    metrics: [{ label: 'Bulk Files', value: 26 }, { label: 'Processed', value: 18 }, { label: 'Failed', value: 2 }]
  },
  'receiving-notes': {
    title: 'Receiving Notes',
    breadcrumb: 'Operations Hub / Inventory / Receiving Notes',
    description: 'Cross-check shipments against target locations and log shortages or damage.',
    actionLabel: 'Receiving Note',
    columns: [
      { key: 'noteNo', label: 'Note No.' },
      { key: 'location', label: 'Location' },
      { key: 'shortage', label: 'Shortage', type: 'number' },
      { key: 'damage', label: 'Damage', type: 'number' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'noteNo', label: 'Note No.', type: 'text', placeholder: 'RN-1004' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'WH-01' },
      { name: 'shortage', label: 'Shortage', type: 'number' },
      { name: 'damage', label: 'Damage', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: ['Accepted', 'Needs Follow-Up', 'Rejected'] }
    ],
    metrics: [{ label: 'Receiving Notes', value: 41 }, { label: 'Shortages', value: 6 }, { label: 'Damages', value: 3 }]
  },
  'transfer-voucher': {
    title: 'Transfer Voucher',
    breadcrumb: 'Operations Hub / Inventory / Transfer Voucher',
    description: 'Track physical movement of stock between source and destination locations.',
    actionLabel: 'Transfer',
    columns: [
      { key: 'voucherNo', label: 'Voucher No.' },
      { key: 'source', label: 'From' },
      { key: 'destination', label: 'To' },
      { key: 'qty', label: 'Qty', type: 'number' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'voucherNo', label: 'Voucher No.', type: 'text', placeholder: 'TFR-014' },
      { name: 'source', label: 'From Location', type: 'text', placeholder: 'WH-01' },
      { name: 'destination', label: 'To Location', type: 'text', placeholder: 'WH-04' },
      { name: 'qty', label: 'Qty', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: ['PENDING', 'APPROVED', 'IN_TRANSIT', 'RECEIVED'] }
    ],
    metrics: [{ label: 'Transfers', value: 19 }, { label: 'In Transit', value: 4 }, { label: 'Completed', value: 12 }]
  },
  'receiving-voucher': {
    title: 'Receiving Voucher',
    breadcrumb: 'Operations Hub / Inventory / Receiving Voucher',
    description: 'Formal confirmation that transferred stock has safely arrived at destination.',
    actionLabel: 'Receiving Voucher',
    columns: [
      { key: 'voucherNo', label: 'Voucher No.' },
      { key: 'transferRef', label: 'Transfer Ref.' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
      { key: 'confirmedBy', label: 'Confirmed By' }
    ],
    fields: [
      { name: 'voucherNo', label: 'Voucher No.', type: 'text', placeholder: 'RCV-003' },
      { name: 'transferRef', label: 'Transfer Ref.', type: 'text', placeholder: 'TFR-014' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'WH-04' },
      { name: 'status', label: 'Status', type: 'select', options: ['PENDING', 'RECEIVED', 'CONFIRMED'] },
      { name: 'confirmedBy', label: 'Confirmed By', type: 'text', placeholder: 'Omar Naser' }
    ],
    metrics: [{ label: 'Vouchers', value: 11 }, { label: 'Confirmed', value: 8 }, { label: 'Awaiting', value: 3 }]
  },
  'inventory-adjustments': {
    title: 'Inventory Adjustment Form',
    breadcrumb: 'Operations Hub / Inventory / Adjustments',
    description: 'Correct stock counts and document adjustment reasons such as theft or audit reconciliation.',
    actionLabel: 'Adjustment',
    columns: [
      { key: 'item', label: 'Item' },
      { key: 'location', label: 'Location' },
      { key: 'delta', label: 'Delta', type: 'number' },
      { key: 'reason', label: 'Reason' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'item', label: 'Item', type: 'text', placeholder: 'HDPE Resin' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'WH-03' },
      { name: 'delta', label: 'Quantity Delta', type: 'number' },
      { name: 'reason', label: 'Reason', type: 'select', options: ['THEFT', 'DATA_ENTRY_ERROR', 'AUDIT_RECONCILE', 'DAMAGED', 'OTHER'] },
      { name: 'status', label: 'Status', type: 'select', options: ['Approved', 'Pending'] }
    ],
    metrics: [{ label: 'Adjustments', value: 15 }, { label: 'Approved', value: 11 }, { label: 'Pending', value: 4 }]
  },
  'inventory-report': {
    title: 'Inventory Report',
    breadcrumb: 'Operations Hub / Inventory / Inventory Report',
    description: 'Dashboard overview of valuation, stock warnings, and transaction history by location.',
    actionLabel: 'Report Entry',
    columns: [
      { key: 'sku', label: 'SKU' },
      { key: 'location', label: 'Location' },
      { key: 'onHand', label: 'On Hand', type: 'number' },
      { key: 'reorderPoint', label: 'Reorder Point', type: 'number' },
      { key: 'value', label: 'Valuation', type: 'currency' }
    ],
    fields: [
      { name: 'sku', label: 'SKU', type: 'text', placeholder: 'FG-1001' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'WH-01' },
      { name: 'onHand', label: 'On Hand', type: 'number' },
      { name: 'reorderPoint', label: 'Reorder Point', type: 'number' },
      { name: 'value', label: 'Valuation', type: 'number', step: '0.01' }
    ],
    metrics: [{ label: 'Inventory Value', value: 'AED 5.8M' }, { label: 'Low Stock', value: 11 }, { label: 'Locations', value: 12 }]
  },
  'wastage-log': {
    title: 'Wastage Log',
    breadcrumb: 'Operations Hub / Inventory / Wastage Log',
    description: 'Write off expired raw materials or damaged goods with formal disposal tracking.',
    actionLabel: 'Wastage Record',
    columns: [
      { key: 'item', label: 'Item' },
      { key: 'location', label: 'Location' },
      { key: 'quantity', label: 'Qty', type: 'number' },
      { key: 'reason', label: 'Reason' },
      { key: 'recordedBy', label: 'Recorded By' }
    ],
    fields: [
      { name: 'item', label: 'Item', type: 'text', placeholder: 'Expired Solvent' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'WH-02' },
      { name: 'quantity', label: 'Qty', type: 'number' },
      { name: 'reason', label: 'Reason', type: 'text', placeholder: 'Expired / Damaged' },
      { name: 'recordedBy', label: 'Recorded By', type: 'text', placeholder: 'L. Hassan' }
    ],
    metrics: [{ label: 'Wastage Entries', value: 9 }, { label: 'This Month', value: 3 }, { label: 'Disposed Value', value: 'AED 12k' }]
  },
  'stock-take-sheet': {
    title: 'Stock Take Sheet',
    breadcrumb: 'Operations Hub / Inventory / Stock Take Sheet',
    description: 'Capture physical counts and reconcile them with system quantities during audits.',
    actionLabel: 'Stock Sheet',
    columns: [
      { key: 'sheetNo', label: 'Sheet No.' },
      { key: 'location', label: 'Location' },
      { key: 'countedBy', label: 'Counted By' },
      { key: 'status', label: 'Status' },
      { key: 'variance', label: 'Variance', type: 'number' }
    ],
    fields: [
      { name: 'sheetNo', label: 'Sheet No.', type: 'text', placeholder: 'ST-018' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'WH-04' },
      { name: 'countedBy', label: 'Counted By', type: 'text', placeholder: 'Omar Naser' },
      { name: 'status', label: 'Status', type: 'select', options: ['OPEN', 'COUNTED', 'RECONCILED', 'CLOSED'] },
      { name: 'variance', label: 'Variance', type: 'number' }
    ],
    metrics: [{ label: 'Sheets', value: 8 }, { label: 'Open', value: 2 }, { label: 'Variance', value: 5 }]
  },
  quotations: {
    title: 'Quotation (Quote)',
    breadcrumb: 'Operations Hub / Sales / Quotations',
    description: 'Generate customer pricing proposals with terms, conditions, and delivery information.',
    actionLabel: 'Quotation',
    columns: [
      { key: 'quoteNo', label: 'Quote No.' },
      { key: 'customer', label: 'Customer' },
      { key: 'totalAmount', label: 'Total', type: 'currency' },
      { key: 'status', label: 'Status' },
      { key: 'validUntil', label: 'Valid Until' }
    ],
    fields: [
      { name: 'quoteNo', label: 'Quote No.', type: 'text', placeholder: 'Q-2026-008' },
      { name: 'customer', label: 'Customer', type: 'text', placeholder: 'Al Muna Logistics' },
      { name: 'totalAmount', label: 'Total', type: 'number', step: '0.01' },
      { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED'] },
      { name: 'validUntil', label: 'Valid Until', type: 'date' }
    ],
    metrics: [{ label: 'Quotes', value: 41 }, { label: 'Accepted', value: 19 }, { label: 'Pending', value: 8 }]
  },
  'delivery-notes': {
    title: 'Delivery Note (DN)',
    breadcrumb: 'Operations Hub / Sales / Delivery Notes',
    description: 'Provide packing slips and signed confirmation of Customer delivery receipt.',
    actionLabel: 'Delivery Note',
    columns: [
      { key: 'dnNo', label: 'DN No.' },
      { key: 'customer', label: 'Customer' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
      { key: 'issuedBy', label: 'Issued By' }
    ],
    fields: [
      { name: 'dnNo', label: 'DN No.', type: 'text', placeholder: 'DN-1007' },
      { name: 'customer', label: 'Customer', type: 'text', placeholder: 'Nexus Retail' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'Store 02' },
      { name: 'status', label: 'Status', type: 'select', options: ['PREPARED', 'DISPATCHED', 'DELIVERED'] },
      { name: 'issuedBy', label: 'Issued By', type: 'text', placeholder: 'F. Kader' }
    ],
    metrics: [{ label: 'DNs', value: 52 }, { label: 'Delivered', value: 36 }, { label: 'Pending', value: 6 }]
  },
  'tax-invoices': {
    title: 'Tax Invoice',
    breadcrumb: 'Operations Hub / Sales / Tax Invoices',
    description: 'Issue tax-compliant commercial invoices with government VAT summary fields.',
    actionLabel: 'Tax Invoice',
    columns: [
      { key: 'invoiceNo', label: 'Invoice No.' },
      { key: 'customer', label: 'Customer' },
      { key: 'totalAmount', label: 'Total', type: 'currency' },
      { key: 'taxAmount', label: 'Tax', type: 'currency' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'invoiceNo', label: 'Invoice No.', type: 'text', placeholder: 'INV-2026-030' },
      { name: 'customer', label: 'Customer', type: 'text', placeholder: 'Nexus Retail' },
      { name: 'totalAmount', label: 'Total', type: 'number', step: '0.01' },
      { name: 'taxAmount', label: 'Tax', type: 'number', step: '0.01' },
      { name: 'status', label: 'Status', type: 'select', options: ['OPEN', 'PAID', 'PARTIALLY_PAID', 'OVERDUE'] }
    ],
    metrics: [{ label: 'Invoices', value: 77 }, { label: 'Paid', value: 52 }, { label: 'Open', value: 9 }]
  },
  'proforma-invoices': {
    title: 'Proforma Invoice',
    breadcrumb: 'Operations Hub / Sales / Proforma Invoices',
    description: 'Draft sales documents used for budget approval and import financing decisions.',
    actionLabel: 'Proforma',
    columns: [
      { key: 'proformaNo', label: 'Proforma No.' },
      { key: 'customer', label: 'Customer' },
      { key: 'totalAmount', label: 'Total', type: 'currency' },
      { key: 'status', label: 'Status' },
      { key: 'validUntil', label: 'Valid Until' }
    ],
    fields: [
      { name: 'proformaNo', label: 'Proforma No.', type: 'text', placeholder: 'PF-2026-010' },
      { name: 'customer', label: 'Customer', type: 'text', placeholder: 'Blue Harbor' },
      { name: 'totalAmount', label: 'Total', type: 'number', step: '0.01' },
      { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'APPROVED', 'SENT', 'EXPIRED'] },
      { name: 'validUntil', label: 'Valid Until', type: 'date' }
    ],
    metrics: [{ label: 'Proformas', value: 19 }, { label: 'Approved', value: 11 }, { label: 'Draft', value: 4 }]
  },
  'credit-notes': {
    title: 'Credit Note (Sales Return)',
    breadcrumb: 'Operations Hub / Sales / Credit Notes',
    description: 'Reduce invoice balances or customer account credits for returns and adjustments.',
    actionLabel: 'Credit Note',
    columns: [
      { key: 'creditNo', label: 'Credit No.' },
      { key: 'customer', label: 'Customer' },
      { key: 'reason', label: 'Reason' },
      { key: 'totalAmount', label: 'Amount', type: 'currency' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'creditNo', label: 'Credit No.', type: 'text', placeholder: 'CN-2026-003' },
      { name: 'customer', label: 'Customer', type: 'text', placeholder: 'Al Muna Logistics' },
      { name: 'reason', label: 'Reason', type: 'text', placeholder: 'Product return' },
      { name: 'totalAmount', label: 'Amount', type: 'number', step: '0.01' },
      { name: 'status', label: 'Status', type: 'select', options: ['ISSUED', 'APPROVED', 'CLOSED'] }
    ],
    metrics: [{ label: 'Credit Notes', value: 12 }, { label: 'Approved', value: 10 }, { label: 'Open', value: 2 }]
  },
  'receipt-vouchers': {
    title: 'Receipt Voucher',
    breadcrumb: 'Operations Hub / Sales / Receipt Vouchers',
    description: 'Confirm customer payments against invoice balances and direct receivables receipts.',
    actionLabel: 'Receipt',
    columns: [
      { key: 'receiptNo', label: 'Receipt No.' },
      { key: 'customer', label: 'Customer' },
      { key: 'invoiceNo', label: 'Invoice No.' },
      { key: 'amountReceived', label: 'Amount', type: 'currency' },
      { key: 'paymentMethod', label: 'Payment Method' }
    ],
    fields: [
      { name: 'receiptNo', label: 'Receipt No.', type: 'text', placeholder: 'RCPT-2026-012' },
      { name: 'customer', label: 'Customer', type: 'text', placeholder: 'Acme Trading' },
      { name: 'invoiceNo', label: 'Invoice No.', type: 'text', placeholder: 'INV-2026-030' },
      { name: 'amountReceived', label: 'Amount Received', type: 'number', step: '0.01' },
      { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['BANK_TRANSFER', 'CARD', 'CASH', 'CHEQUE'] }
    ],
    metrics: [{ label: 'Receipts', value: 63 }, { label: 'This Week', value: 17 }, { label: 'Accounts Cleared', value: 54 }]
  },
  signup: {
    title: 'User Registration & Signup',
    breadcrumb: 'Operations Hub / SaaS / Sign Up',
    description: 'Onboarding portal for new business customers to define their tenant profile.',
    actionLabel: 'Tenant',
    columns: [
      { key: 'businessName', label: 'Business Name' },
      { key: 'owner', label: 'Owner' },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Northwind Logistics' },
      { name: 'owner', label: 'Owner', type: 'text', placeholder: 'Rahman Ali' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'owner@northwind.com' },
      { name: 'status', label: 'Status', type: 'select', options: ['Trial', 'Active', 'Pending'] }
    ],
    metrics: [{ label: 'New Sign-Ups', value: 9 }, { label: 'Trials', value: 3 }, { label: 'Activated', value: 6 }]
  },
  subscription: {
    title: 'Subscription Checkout',
    breadcrumb: 'Operations Hub / SaaS / Subscription',
    description: 'Pricing tier selection and card-ready checkout workflow for SaaS billing.',
    actionLabel: 'Plan',
    columns: [
      { key: 'tenant', label: 'Tenant' },
      { key: 'plan', label: 'Plan' },
      { key: 'monthlyPrice', label: 'Monthly Price', type: 'currency' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'tenant', label: 'Tenant', type: 'text', placeholder: 'Acme Trading' },
      { name: 'plan', label: 'Plan', type: 'select', options: ['Starter', 'Growth', 'Enterprise'] },
      { name: 'monthlyPrice', label: 'Monthly Price', type: 'number', step: '0.01' },
      { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Cancel Requested', 'Paused'] }
    ],
    metrics: [{ label: 'Plans', value: 3 }, { label: 'Active', value: 14 }, { label: 'Overdue', value: 2 }]
  },
  'organization-profile': {
    title: 'Organization Profile Settings',
    breadcrumb: 'Operations Hub / SaaS / Organization Profile',
    description: 'Manage company preferences, branding, addresses, and base currency per tenant.',
    actionLabel: 'Profile',
    columns: [
      { key: 'organization', label: 'Organization' },
      { key: 'baseCurrency', label: 'Currency' },
      { key: 'country', label: 'Country' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'organization', label: 'Organization', type: 'text', placeholder: 'Acme Trading' },
      { name: 'baseCurrency', label: 'Base Currency', type: 'select', options: ['AED', 'USD', 'SAR', 'GBP'] },
      { name: 'country', label: 'Country', type: 'text', placeholder: 'UAE' },
      { name: 'status', label: 'Status', type: 'select', options: ['Verified', 'Needs Review'] }
    ],
    metrics: [{ label: 'Organizations', value: 18 }, { label: 'Currencies', value: 4 }, { label: 'Verified', value: 16 }]
  },
  'team-roles': {
    title: 'Team & Role Management',
    breadcrumb: 'Operations Hub / SaaS / Team & Roles',
    description: 'Invite team members and assign permissions for admin, procurement, warehouse, and finance roles.',
    actionLabel: 'Team Member',
    columns: [
      { key: 'fullName', label: 'Full Name' },
      { key: 'role', label: 'Role' },
      { key: 'department', label: 'Department' },
      { key: 'status', label: 'Status' }
    ],
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Amina Saleh' },
      { name: 'role', label: 'Role', type: 'select', options: ['Administrator', 'Procurement Officer', 'Warehouse Clerk', 'Accountant'] },
      { name: 'department', label: 'Department', type: 'text', placeholder: 'Operations' },
      { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Pending', 'Disabled'] }
    ],
    metrics: [{ label: 'Members', value: 48 }, { label: 'Admins', value: 5 }, { label: 'Warehouse', value: 11 }]
  }
};

const appState = {
  currentSection: 'dashboard',
  records: {
    'raw-materials': [
      { id: 1, sku: 'RM-1001', itemName: 'HDPE Resin', uom: 'kg', baseCost: 4.25, reorderPoint: 50, category: 'Plastics' },
      { id: 2, sku: 'RM-2002', itemName: 'Industrial Solvent', uom: 'liters', baseCost: 11.5, reorderPoint: 20, category: 'Chemicals' }
    ],
    products: [
      { id: 1, sku: 'FG-1001', itemName: 'Storage Tank', category: 'Industrial', sellingPrice: 1800, barcode: '890123456789', status: 'Active' },
      { id: 2, sku: 'FG-1002', itemName: 'Safety Valve', category: 'Industrial', sellingPrice: 240, barcode: '890123456790', status: 'Low Stock' }
    ],
    locations: [
      { id: 1, code: 'WH-01', name: 'Warehouse 01', type: 'WAREHOUSE', city: 'Dubai', country: 'UAE', status: 'Active' },
      { id: 2, code: 'STR-02', name: 'Retail Outlet 02', type: 'STORE', city: 'Abu Dhabi', country: 'UAE', status: 'Active' }
    ],
    categories: [
      { id: 1, name: 'Plastics', type: 'RAW_MATERIAL', parent: 'Packaging', items: 12 },
      { id: 2, name: 'Industrial', type: 'PRODUCT', parent: 'Core Inventory', items: 21 }
    ],
    suppliers: [
      { id: 1, supplierName: 'Gulf Supply Co.', contactName: 'Nasser Ali', email: 'ops@gulfsupply.com', taxId: '1001234567003', paymentTerms: 'Net 30' },
      { id: 2, supplierName: 'Apex Steel', contactName: 'Sami Rahman', email: 'sales@apexsteel.com', taxId: '1001234567004', paymentTerms: 'Net 15' }
    ],
    'staff-profiles': [
      { id: 1, fullName: 'Amina Saleh', jobTitle: 'Procurement Officer', department: 'Operations', status: 'ACTIVE' },
      { id: 2, fullName: 'Omar Naser', jobTitle: 'Warehouse Clerk', department: 'Logistics', status: 'ACTIVE' }
    ],
    'purchase-requests': [
      { id: 1, requestNo: 'PR-2026-001', requestedBy: 'Amina Saleh', amount: 4800, status: 'APPROVED', date: '2026-10-01' },
      { id: 2, requestNo: 'PR-2026-015', requestedBy: 'Lina Hassan', amount: 3200, status: 'SUBMITTED', date: '2026-10-04' }
    ],
    'vendor-comparison': [
      { id: 1, supplier: 'Gulf Supply Co.', quoteNo: 'Q-2026-044', unitPrice: 3150, leadTime: 12, status: 'PREFERRED' },
      { id: 2, supplier: 'Apex Steel', quoteNo: 'Q-2026-052', unitPrice: 3320, leadTime: 9, status: 'PENDING' }
    ],
    'purchase-orders': [
      { id: 1, poNo: 'PO-2026-110', supplier: 'Gulf Supply Co.', totalAmount: 9600, status: 'SENT', orderDate: '2026-10-02' },
      { id: 2, poNo: 'PO-2026-118', supplier: 'Apex Steel', totalAmount: 4200, status: 'APPROVED', orderDate: '2026-10-05' }
    ],
    'supplier-bills': [
      { id: 1, billNo: 'BILL-102', supplier: 'Gulf Supply Co.', grossAmount: 5200, status: 'OPEN', invoiceDate: '2026-10-03' },
      { id: 2, billNo: 'BILL-103', supplier: 'Apex Steel', grossAmount: 2800, status: 'PAID', invoiceDate: '2026-10-06' }
    ],
    'supplier-returns': [
      { id: 1, returnNo: 'RET-002', supplier: 'Apex Steel', reason: 'Damaged items', totalAmount: 634, status: 'APPROVED' },
      { id: 2, returnNo: 'RET-004', supplier: 'Gulf Supply Co.', reason: 'Incorrect quantity', totalAmount: 199, status: 'ISSUED' }
    ],
    'single-order-intake': [
      { id: 1, reference: 'SO-1001', item: 'Steel Rod', location: 'WH-01', quantity: 120, supplier: 'Apex Steel' },
      { id: 2, reference: 'SO-1010', item: 'Safety Valve', location: 'WH-02', quantity: 25, supplier: 'Gulf Supply Co.' }
    ],
    'bulk-intake': [
      { id: 1, batch: 'BULK-2026-01', source: 'Main Supplier', location: 'WH-02', totalQty: 400, status: 'Processed' },
      { id: 2, batch: 'BULK-2026-02', source: 'Regional Partner', location: 'WH-03', totalQty: 250, status: 'Queued' }
    ],
    'receiving-notes': [
      { id: 1, noteNo: 'RN-1004', location: 'WH-01', shortage: 4, damage: 1, status: 'Needs Follow-Up' },
      { id: 2, noteNo: 'RN-1009', location: 'WH-02', shortage: 0, damage: 2, status: 'Accepted' }
    ],
    'transfer-voucher': [
      { id: 1, voucherNo: 'TFR-014', source: 'WH-01', destination: 'WH-04', qty: 80, status: 'IN_TRANSIT' },
      { id: 2, voucherNo: 'TFR-018', source: 'WH-02', destination: 'WH-03', qty: 60, status: 'RECEIVED' }
    ],
    'receiving-voucher': [
      { id: 1, voucherNo: 'RCV-003', transferRef: 'TFR-014', location: 'WH-04', status: 'RECEIVED', confirmedBy: 'Omar Naser' },
      { id: 2, voucherNo: 'RCV-006', transferRef: 'TFR-018', location: 'WH-03', status: 'CONFIRMED', confirmedBy: 'Lina Hassan' }
    ],
    'inventory-adjustments': [
      { id: 1, item: 'HDPE Resin', location: 'WH-03', delta: -12, reason: 'THEFT', status: 'Approved' },
      { id: 2, item: 'Storage Tank', location: 'WH-01', delta: 5, reason: 'AUDIT_RECONCILE', status: 'Pending' }
    ],
    'inventory-report': [
      { id: 1, sku: 'FG-1001', location: 'WH-01', onHand: 42, reorderPoint: 10, value: 75600 },
      { id: 2, sku: 'RM-1001', location: 'WH-03', onHand: 6, reorderPoint: 15, value: 648 }
    ],
    'wastage-log': [
      { id: 1, item: 'Expired Solvent', location: 'WH-02', quantity: 8, reason: 'Expired', recordedBy: 'L. Hassan' },
      { id: 2, item: 'Damaged Valve', location: 'WH-01', quantity: 3, reason: 'Damaged', recordedBy: 'O. Naser' }
    ],
    'stock-take-sheet': [
      { id: 1, sheetNo: 'ST-018', location: 'WH-04', countedBy: 'Omar Naser', status: 'COUNTED', variance: 5 },
      { id: 2, sheetNo: 'ST-019', location: 'WH-03', countedBy: 'Lina Hassan', status: 'OPEN', variance: 0 }
    ],
    quotations: [
      { id: 1, quoteNo: 'Q-2026-008', customer: 'Al Muna Logistics', totalAmount: 6250, status: 'SENT', validUntil: '2026-10-18' },
      { id: 2, quoteNo: 'Q-2026-010', customer: 'Nexus Retail', totalAmount: 9200, status: 'ACCEPTED', validUntil: '2026-10-22' }
    ],
    'delivery-notes': [
      { id: 1, dnNo: 'DN-1007', customer: 'Nexus Retail', location: 'Store 02', status: 'DELIVERED', issuedBy: 'F. Kader' },
      { id: 2, dnNo: 'DN-1010', customer: 'Al Muna Logistics', location: 'Warehouse 01', status: 'DISPATCHED', issuedBy: 'A. Saleh' }
    ],
    'tax-invoices': [
      { id: 1, invoiceNo: 'INV-2026-016', customer: 'Nexus Retail', totalAmount: 17450, taxAmount: 1745, status: 'OPEN' },
      { id: 2, invoiceNo: 'INV-2026-021', customer: 'Blue Harbor', totalAmount: 8900, taxAmount: 890, status: 'PAID' }
    ],
    'proforma-invoices': [
      { id: 1, proformaNo: 'PF-2026-010', customer: 'Blue Harbor', totalAmount: 15000, status: 'APPROVED', validUntil: '2026-10-20' },
      { id: 2, proformaNo: 'PF-2026-012', customer: 'Desert Foods', totalAmount: 6300, status: 'DRAFT', validUntil: '2026-10-17' }
    ],
    'credit-notes': [
      { id: 1, creditNo: 'CN-2026-003', customer: 'Al Muna Logistics', reason: 'Product return', totalAmount: 690, status: 'APPROVED' },
      { id: 2, creditNo: 'CN-2026-005', customer: 'Blue Harbor', reason: 'Billing adjustment', totalAmount: 430, status: 'ISSUED' }
    ],
    'receipt-vouchers': [
      { id: 1, receiptNo: 'RCPT-2026-012', customer: 'Acme Trading', invoiceNo: 'INV-2026-030', amountReceived: 12300, paymentMethod: 'BANK_TRANSFER' },
      { id: 2, receiptNo: 'RCPT-2026-018', customer: 'Nexus Retail', invoiceNo: 'INV-2026-016', amountReceived: 6400, paymentMethod: 'CARD' }
    ],
    signup: [
      { id: 1, businessName: 'Northwind Logistics', owner: 'Rahman Ali', email: 'owner@northwind.com', status: 'Trial' },
      { id: 2, businessName: 'Milan Retail', owner: 'Leila Jamal', email: 'sales@milanretail.com', status: 'Active' }
    ],
    subscription: [
      { id: 1, tenant: 'Acme Trading', plan: 'Growth', monthlyPrice: 1480, status: 'Active' },
      { id: 2, tenant: 'Blue Harbor', plan: 'Enterprise', monthlyPrice: 3200, status: 'Paused' }
    ],
    'organization-profile': [
      { id: 1, organization: 'Acme Trading', baseCurrency: 'AED', country: 'UAE', status: 'Verified' },
      { id: 2, organization: 'Blue Harbor', baseCurrency: 'USD', country: 'KSA', status: 'Needs Review' }
    ],
    'team-roles': [
      { id: 1, fullName: 'Amina Saleh', role: 'Administrator', department: 'Operations', status: 'Active' },
      { id: 2, fullName: 'Omar Naser', role: 'Warehouse Clerk', department: 'Logistics', status: 'Active' }
    ]
  }
};

function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return '-';
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}

function formatFieldValue(value, fieldType) {
  if (fieldType === 'currency') return formatCurrency(value);
  if (fieldType === 'number') return Number(value).toLocaleString('en-AE');
  if (value === null || value === undefined || value === '') return '-';
  return value;
}

function updateHeader(sectionKey) {
  const config = sectionConfig[sectionKey] || sectionConfig.dashboard;
  document.getElementById('pageTitle').textContent = config.title;
  document.getElementById('pageBreadcrumb').textContent = config.breadcrumb;
}

function renderDashboard() {
  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    <div class="page-title">
      <div>
        <h1>${sectionConfig.dashboard.title}</h1>
        <p>${sectionConfig.dashboard.description}</p>
      </div>
      <button type="button" class="btn btn-primary">+ New Workflow</button>
    </div>

    <div id="overview-cards" class="cards">
      ${overviewStats.map(item => `
        <div class="card">
          <div class="card-info">
            <span>${item.label}</span>
            <h2>${item.value}</h2>
          </div>
          <div class="card-icon ${item.tone}">${item.icon}</div>
        </div>
      `).join('')}
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Operational Modules</h3>
        <div class="page-pills">
          <span class="pill success">Multi-Tenant</span>
          <span class="pill neutral">SaaS Ready</span>
        </div>
      </div>
      <div class="module-grid">
        ${modules.map(module => `
          <article class="module-card">
            <h4>${module.title}</h4>
            <p>${module.subtitle}</p>
            <ul class="module-list">
              ${module.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </article>
        `).join('')}
      </div>
    </div>

    <div class="panel activity-panel">
      <div class="panel-header">
        <h3>Recent Activity</h3>
        <button type="button" class="btn btn-secondary">Export</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Module</th>
              <th>Tenant</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            ${recentActivity.map(item => `
              <tr>
                <td>${item.reference}</td>
                <td>${item.module}</td>
                <td>${item.tenant}</td>
                <td>${item.owner}</td>
                <td><span class="status ${item.statusClass}">${item.status}</span></td>
                <td>${item.updated}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderModulePage(sectionKey) {
  const config = sectionConfig[sectionKey];
  const rows = appState.records[sectionKey] || [];

  const tableHeaders = config.columns.map(column => `<th>${column.label}</th>`).concat('<th>Actions</th>');
  const tableRows = rows.map(row => `
    <tr>
      ${config.columns.map(column => `<td>${formatFieldValue(row[column.key], column.type)}</td>`).join('')}
      <td>
        <div class="table-actions">
          <button type="button" class="small-btn danger" data-action="delete-record" data-section="${sectionKey}" data-id="${row.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  const filterOptions = [
    '<option value="all">All Status</option>',
    ...(config.fields
      .filter(field => field.type === 'select')
      .flatMap(field => field.options.map(option => `<option value="${option}">${option}</option>`)) || [])
  ];

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    <div class="section-header">
      <div>
        <h2>${config.title}</h2>
        <p>${config.description}</p>
      </div>
      <div class="section-tools">
        <input id="sectionSearch" class="search-input" type="text" placeholder="Search ${config.title.toLowerCase()}..." />
        <select id="sectionFilter" class="filter-select">
          ${filterOptions.join('')}
        </select>
        <button type="button" class="btn btn-primary" data-action="add-record" data-section="${sectionKey}">+ Add ${config.actionLabel}</button>
      </div>
    </div>

    <div class="section-grid">
      ${config.metrics.map(item => `
        <div class="metric-box">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </div>
      `).join('')}
    </div>

    <div class="section-panel">
      <div class="panel-header">
        <h3>${config.title} List</h3>
        <span class="pill neutral">${rows.length} records</span>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>${tableHeaders}</tr>
          </thead>
          <tbody id="moduleTableBody">${tableRows || '<tr><td colspan="100%">No records found.</td></tr>'}</tbody>
        </table>
      </div>
    </div>
  `;

  const searchInput = document.getElementById('sectionSearch');
  const filterSelect = document.getElementById('sectionFilter');

  if (searchInput) {
    searchInput.addEventListener('input', () => filterModuleRows(sectionKey));
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', () => filterModuleRows(sectionKey));
  }
}

function filterModuleRows(sectionKey) {
  const config = sectionConfig[sectionKey];
  const rows = appState.records[sectionKey] || [];
  const searchQuery = (document.getElementById('sectionSearch')?.value || '').toLowerCase();
  const filterValue = document.getElementById('sectionFilter')?.value || 'all';

  const filteredRows = rows.filter(row => {
    const matchesSearch = config.columns.some(column => {
      const value = row[column.key];
      return String(value ?? '').toLowerCase().includes(searchQuery);
    });

    const matchesFilter = filterValue === 'all' || Object.values(row).some(value => String(value).toLowerCase() === filterValue.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const tableRows = filteredRows.map(row => `
    <tr>
      ${config.columns.map(column => `<td>${formatFieldValue(row[column.key], column.type)}</td>`).join('')}
      <td>
        <div class="table-actions">
          <button type="button" class="small-btn danger" data-action="delete-record" data-section="${sectionKey}" data-id="${row.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  const tbody = document.getElementById('moduleTableBody');
  if (tbody) {
    tbody.innerHTML = tableRows || '<tr><td colspan="100%">No records found.</td></tr>';
  }
}

function renderForm(sectionKey) {
  const config = sectionConfig[sectionKey];
  const modal = document.getElementById('entityModal');
  const form = document.getElementById('entityForm');
  const modalTitle = document.getElementById('modalTitle');

  modalTitle.textContent = `Add ${config.actionLabel}`;

  const fieldMarkup = config.fields.map(field => {
    const isFull = field.type === 'text' || field.type === 'email' || field.type === 'date' || field.type === 'number';
    const className = `form-group ${field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'date' ? 'full' : ''}`;

    if (field.type === 'select') {
      return `
        <div class="${className}">
          <label for="${field.name}">${field.label}</label>
          <select id="${field.name}" name="${field.name}">
            ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
          </select>
        </div>
      `;
    }

    return `
      <div class="${className}">
        <label for="${field.name}">${field.label}</label>
        <input id="${field.name}" name="${field.name}" type="${field.type}" placeholder="${field.placeholder || ''}" ${field.step ? `step="${field.step}"` : ''} />
      </div>
    `;
  }).join('');

  form.innerHTML = `
    <div class="form-grid">
      ${fieldMarkup}
    </div>
    <div class="form-actions">
      <button type="button" class="btn btn-secondary" data-close-modal="true">Cancel</button>
      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  `;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    appState.records[sectionKey] = appState.records[sectionKey] || [];

    const newRecord = { id: Date.now(), ...data };

    Object.keys(newRecord).forEach(key => {
      if (key !== 'id') {
        if (['baseCost', 'sellingPrice', 'totalAmount', 'unitPrice', 'grossAmount', 'amount', 'value', 'monthlyPrice', 'amountReceived', 'totalQty', 'quantity', 'reorderPoint', 'delta', 'onHand', 'leadTime', 'variance', 'shortage', 'damage', 'totalQty', 'grossAmount', 'leadTime'].includes(key)) {
          newRecord[key] = Number(newRecord[key]) || 0;
        }
      }
    });

    appState.records[sectionKey].push(newRecord);
    closeModal();
    renderPage();
  });

  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('entityModal');
  modal.classList.add('hidden');
}

function deleteRecord(sectionKey, id) {
  appState.records[sectionKey] = (appState.records[sectionKey] || []).filter(item => item.id !== Number(id));
  renderPage();
}

function renderPage() {
  const sectionKey = appState.currentSection;
  updateHeader(sectionKey);

  const activeLinks = document.querySelectorAll('.nav-link');
  activeLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionKey);
  });

  if (sectionKey === 'dashboard') {
    renderDashboard();
  } else {
    renderModulePage(sectionKey);
  }
}

function setSection(sectionKey) {
  appState.currentSection = sectionKey;
  renderPage();
}

document.addEventListener('click', (event) => {
  const navLink = event.target.closest('.nav-link');
  if (navLink) {
    event.preventDefault();
    setSection(navLink.dataset.section);
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.remove('open');
    }
    return;
  }

  const addButton = event.target.closest('[data-action="add-record"]');
  if (addButton) {
    renderForm(addButton.dataset.section);
    return;
  }

  const deleteButton = event.target.closest('[data-action="delete-record"]');
  if (deleteButton) {
    deleteRecord(deleteButton.dataset.section, deleteButton.dataset.id);
    return;
  }

  const closeTrigger = event.target.closest('[data-close-modal="true"]');
  if (closeTrigger) {
    closeModal();
  }
});

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

renderPage();
