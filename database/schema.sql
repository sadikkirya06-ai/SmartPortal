-- Multi-tenant SaaS schema for SmartPortal
-- Every table contains organization_id to enforce tenant isolation.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(180) NOT NULL,
    logo_url TEXT,
    base_currency VARCHAR(10) NOT NULL DEFAULT 'AED',
    country_code VARCHAR(10),
    billing_email VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    first_name VARCHAR(120) NOT NULL,
    last_name VARCHAR(120) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, email)
);

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(80) NOT NULL,
    description TEXT,
    UNIQUE (organization_id, name)
);

CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE (organization_id, user_id, role_id)
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('RAW_MATERIAL', 'PRODUCT', 'GENERAL')),
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, type, name)
);

CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    code VARCHAR(60) NOT NULL,
    name VARCHAR(160) NOT NULL,
    location_type VARCHAR(30) NOT NULL CHECK (location_type IN ('WAREHOUSE', 'STORE', 'BIN', 'OUTLET')),
    address_line1 VARCHAR(255),
    city VARCHAR(120),
    country VARCHAR(120),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, code)
);

CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    supplier_name VARCHAR(180) NOT NULL,
    contact_name VARCHAR(180),
    phone VARCHAR(50),
    email VARCHAR(255),
    tax_id VARCHAR(80),
    payment_terms VARCHAR(80),
    default_currency VARCHAR(10) DEFAULT 'AED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, supplier_name)
);

CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    full_name VARCHAR(180) NOT NULL,
    job_title VARCHAR(120),
    department VARCHAR(120),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','INACTIVE','ON_LEAVE')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, user_id)
);

CREATE TABLE raw_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    sku VARCHAR(80) NOT NULL,
    item_name VARCHAR(180) NOT NULL,
    uom VARCHAR(30) NOT NULL,
    base_cost NUMERIC(18,4) NOT NULL DEFAULT 0,
    reorder_point NUMERIC(18,4) NOT NULL DEFAULT 0,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, sku)
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    sku VARCHAR(80) NOT NULL,
    item_name VARCHAR(180) NOT NULL,
    selling_price NUMERIC(18,4) NOT NULL DEFAULT 0,
    barcode VARCHAR(120),
    image_url TEXT,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, sku)
);

CREATE TABLE purchase_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    request_no VARCHAR(80) NOT NULL,
    requested_by_staff_id UUID NOT NULL REFERENCES staff(id),
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','SUBMITTED','APPROVED','REJECTED','CANCELLED')),
    request_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    UNIQUE (organization_id, request_no)
);

CREATE TABLE purchase_request_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    purchase_request_id UUID NOT NULL REFERENCES purchase_requests(id) ON DELETE CASCADE,
    raw_material_id UUID REFERENCES raw_materials(id),
    product_id UUID REFERENCES products(id),
    quantity NUMERIC(18,4) NOT NULL,
    uom VARCHAR(30) NOT NULL,
    requested_unit_price NUMERIC(18,4) DEFAULT 0
);

CREATE TABLE supplier_quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    purchase_request_id UUID NOT NULL REFERENCES purchase_requests(id) ON DELETE CASCADE,
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    quote_no VARCHAR(80) NOT NULL,
    unit_price NUMERIC(18,4) NOT NULL,
    lead_time_days INTEGER,
    terms TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, quote_no)
);

CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    po_no VARCHAR(80) NOT NULL,
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    issued_by_staff_id UUID NOT NULL REFERENCES staff(id),
    order_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','APPROVED','SENT','PARTIALLY_RECEIVED','CLOSED')),
    subtotal NUMERIC(18,4) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    total_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    UNIQUE (organization_id, po_no)
);

CREATE TABLE purchase_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    purchase_order_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    raw_material_id UUID REFERENCES raw_materials(id),
    product_id UUID REFERENCES products(id),
    quantity NUMERIC(18,4) NOT NULL,
    unit_price NUMERIC(18,4) NOT NULL,
    received_qty NUMERIC(18,4) NOT NULL DEFAULT 0
);

CREATE TABLE supplier_bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    bill_no VARCHAR(80) NOT NULL,
    purchase_order_id UUID REFERENCES purchase_orders(id),
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    invoice_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    gross_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    due_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','PARTIALLY_PAID','PAID','OVERDUE')),
    UNIQUE (organization_id, bill_no)
);

CREATE TABLE supplier_returns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    return_no VARCHAR(80) NOT NULL,
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    purchase_order_id UUID REFERENCES purchase_orders(id),
    return_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reason TEXT NOT NULL,
    total_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'ISSUED' CHECK (status IN ('ISSUED','APPROVED','CLOSED')),
    UNIQUE (organization_id, return_no)
);

CREATE TABLE stock_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    transaction_type VARCHAR(30) NOT NULL CHECK (transaction_type IN ('INBOUND','OUTBOUND','TRANSFER','ADJUSTMENT','WASTAGE','RETURN')),
    entity_type VARCHAR(30) NOT NULL,
    entity_id UUID NOT NULL,
    location_id UUID NOT NULL REFERENCES locations(id),
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('RAW_MATERIAL','PRODUCT')),
    item_id UUID NOT NULL,
    quantity NUMERIC(18,4) NOT NULL,
    unit_cost NUMERIC(18,4),
    reference_no VARCHAR(120),
    created_by_staff_id UUID REFERENCES staff(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE transfer_vouchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    voucher_no VARCHAR(80) NOT NULL,
    source_location_id UUID NOT NULL REFERENCES locations(id),
    destination_location_id UUID NOT NULL REFERENCES locations(id),
    created_by_staff_id UUID REFERENCES staff(id),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','IN_TRANSIT','RECEIVED','CANCELLED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, voucher_no)
);

CREATE TABLE receiving_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    note_no VARCHAR(80) NOT NULL,
    inbound_reference VARCHAR(120),
    location_id UUID NOT NULL REFERENCES locations(id),
    checked_by_staff_id UUID REFERENCES staff(id),
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    shortage_qty NUMERIC(18,4) NOT NULL DEFAULT 0,
    damage_qty NUMERIC(18,4) NOT NULL DEFAULT 0,
    notes TEXT,
    UNIQUE (organization_id, note_no)
);

CREATE TABLE receiving_vouchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    voucher_no VARCHAR(80) NOT NULL,
    transfer_voucher_id UUID REFERENCES transfer_vouchers(id),
    destination_location_id UUID NOT NULL REFERENCES locations(id),
    acknowledged_by_staff_id UUID REFERENCES staff(id),
    acknowledged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','RECEIVED','CONFIRMED')),
    UNIQUE (organization_id, voucher_no)
);

CREATE TABLE inventory_adjustments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(id),
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('RAW_MATERIAL','PRODUCT')),
    item_id UUID NOT NULL,
    quantity_delta NUMERIC(18,4) NOT NULL,
    reason VARCHAR(40) NOT NULL CHECK (reason IN ('THEFT','DATA_ENTRY_ERROR','AUDIT_RECONCILE','DAMAGED','OTHER')),
    approved_by_staff_id UUID REFERENCES staff(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE wastage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(id),
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('RAW_MATERIAL','PRODUCT')),
    item_id UUID NOT NULL,
    quantity NUMERIC(18,4) NOT NULL,
    reason TEXT NOT NULL,
    recorded_by_staff_id UUID REFERENCES staff(id),
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE stock_take_sheets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    sheet_no VARCHAR(80) NOT NULL,
    location_id UUID NOT NULL REFERENCES locations(id),
    counted_by_staff_id UUID REFERENCES staff(id),
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','COUNTED','RECONCILED','CLOSED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, sheet_no)
);

CREATE TABLE stock_take_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    stock_take_sheet_id UUID NOT NULL REFERENCES stock_take_sheets(id) ON DELETE CASCADE,
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('RAW_MATERIAL','PRODUCT')),
    item_id UUID NOT NULL,
    expected_qty NUMERIC(18,4) NOT NULL DEFAULT 0,
    counted_qty NUMERIC(18,4) NOT NULL DEFAULT 0,
    variance NUMERIC(18,4) NOT NULL DEFAULT 0
);

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    customer_name VARCHAR(180) NOT NULL,
    contact_name VARCHAR(180),
    email VARCHAR(255),
    phone VARCHAR(50),
    tax_id VARCHAR(80),
    credit_limit NUMERIC(18,4) DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, customer_name)
);

CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    quote_no VARCHAR(80) NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    issued_by_staff_id UUID NOT NULL REFERENCES staff(id),
    valid_until TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','SENT','ACCEPTED','REJECTED','EXPIRED')),
    subtotal NUMERIC(18,4) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    total_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, quote_no)
);

CREATE TABLE quotation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    quotation_id UUID NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity NUMERIC(18,4) NOT NULL,
    unit_price NUMERIC(18,4) NOT NULL,
    discount NUMERIC(18,4) NOT NULL DEFAULT 0
);

CREATE TABLE delivery_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    dn_no VARCHAR(80) NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    location_id UUID NOT NULL REFERENCES locations(id),
    issued_by_staff_id UUID NOT NULL REFERENCES staff(id),
    status VARCHAR(20) NOT NULL DEFAULT 'PREPARED' CHECK (status IN ('PREPARED','DISPATCHED','DELIVERED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, dn_no)
);

CREATE TABLE tax_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    invoice_no VARCHAR(80) NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    issue_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    due_date TIMESTAMPTZ,
    subtotal NUMERIC(18,4) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    total_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','PAID','PARTIALLY_PAID','OVERDUE')),
    UNIQUE (organization_id, invoice_no)
);

CREATE TABLE proforma_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    proforma_no VARCHAR(80) NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    subtotal NUMERIC(18,4) NOT NULL DEFAULT 0,
    tax_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    total_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    valid_until TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','APPROVED','SENT','EXPIRED')),
    UNIQUE (organization_id, proforma_no)
);

CREATE TABLE credit_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    credit_no VARCHAR(80) NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    invoice_id UUID REFERENCES tax_invoices(id),
    reason TEXT NOT NULL,
    total_amount NUMERIC(18,4) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'ISSUED' CHECK (status IN ('ISSUED','APPROVED','CLOSED')),
    UNIQUE (organization_id, credit_no)
);

CREATE TABLE receipt_vouchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    receipt_no VARCHAR(80) NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    invoice_id UUID REFERENCES tax_invoices(id),
    payment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    amount_received NUMERIC(18,4) NOT NULL,
    payment_method VARCHAR(30) NOT NULL DEFAULT 'BANK_TRANSFER',
    UNIQUE (organization_id, receipt_no)
);

CREATE INDEX idx_raw_materials_org_category ON raw_materials(organization_id, category_id);
CREATE INDEX idx_products_org_category ON products(organization_id, category_id);
CREATE INDEX idx_locations_org ON locations(organization_id);
CREATE INDEX idx_stock_txns_org_location ON stock_transactions(organization_id, location_id);
CREATE INDEX idx_purchase_orders_org_supplier ON purchase_orders(organization_id, supplier_id);
CREATE INDEX idx_tax_invoices_org_customer ON tax_invoices(organization_id, customer_id);
