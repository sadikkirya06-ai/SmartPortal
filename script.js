/* SAMPLE DATA */

let products = [
    {
        id: 1,
        name: "Laptop Computer",
        code: "EBA-001",
        category: "Electronics",
        price: 2499,
        stock: 25
    },
    {
        id: 2,
        name: "Wireless Keyboard",
        code: "EBA-002",
        category: "Accessories",
        price: 149,
        stock: 8
    },
    {
        id: 3,
        name: "Office Chair",
        code: "EBA-003",
        category: "Furniture",
        price: 599,
        stock: 0
    },
    {
        id: 4,
        name: "LED Monitor",
        code: "EBA-004",
        category: "Electronics",
        price: 899,
        stock: 15
    },
    {
        id: 5,
        name: "Printer Paper",
        code: "EBA-005",
        category: "Office Supplies",
        price: 25,
        stock: 4
    },
    {
        id: 6,
        name: "USB-C Hub",
        code: "EBA-006",
        category: "Accessories",
        price: 129,
        stock: 20
    }
];

let editId = null;

/* RENDER PRODUCTS */

function renderProducts(data = products) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    data.forEach(product => {
        let status = "";
        let statusClass = "";

        if (product.stock === 0) {
            status = "Out of Stock";
            statusClass = "badge-out";
        } else if (product.stock <= 5) {
            status = "Low Stock";
            statusClass = "badge-low";
        } else {
            status = "Active";
            statusClass = "badge-active";
        }

        const initials = product.name
            .split(" ")
            .map(word => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="product">
                    <div class="product-image">
                        ${initials}
                    </div>

                    <div>
                        <div class="product-name">
                            ${product.name}
                        </div>

                        <div class="product-code">
                            ${product.code}
                        </div>
                    </div>
                </div>
            </td>

            <td>
                ${product.category}
            </td>

            <td>
                AED ${product.price.toLocaleString()}
            </td>

            <td>
                ${product.stock}
            </td>

            <td>
                <span class="badge ${statusClass}">
                    ${status}
                </span>
            </td>

            <td>
                <div class="actions">
                    <button
                        class="action-btn"
                        title="Edit"
                        onclick="editProduct(${product.id})"
                    >
                        ✎
                    </button>

                    <button
                        class="action-btn delete"
                        title="Delete"
                        onclick="deleteProduct(${product.id})"
                    >
                        🗑
                    </button>
                </div>
            </td>
        `;

        table.appendChild(row);
    });

    updateStatistics(data);
}

/* STATISTICS */

function updateStatistics(data = products) {
    document.getElementById("totalProducts").textContent = data.length;
    document.getElementById("activeProducts").textContent = data.filter(p => p.stock > 5).length;
    document.getElementById("lowProducts").textContent = data.filter(p => p.stock > 0 && p.stock <= 5).length;
    document.getElementById("outProducts").textContent = data.filter(p => p.stock === 0).length;
    document.getElementById("resultText").textContent = `Showing ${data.length} product${data.length !== 1 ? "s" : ""}`;
}

/* SEARCH + FILTER */

function filterProducts() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const status = document.getElementById("statusFilter").value;

    const filtered = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.code.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        let matchesStatus = true;

        if (status === "active") {
            matchesStatus = product.stock > 5;
        }

        if (status === "low") {
            matchesStatus = product.stock > 0 && product.stock <= 5;
        }

        if (status === "out") {
            matchesStatus = product.stock === 0;
        }

        return matchesSearch && matchesStatus;
    });

    renderProducts(filtered);
}

/* OPEN MODAL */

function openModal() {
    editId = null;
    document.getElementById("modalTitle").textContent = "Add Product";
    document.getElementById("productForm").reset();
    document.getElementById("productModal").classList.add("show");
}

/* CLOSE MODAL */

function closeModal() {
    document.getElementById("productModal").classList.remove("show");
}

/* ADD / EDIT PRODUCT */

document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const code = document.getElementById("productCode").value;
    const category = document.getElementById("productCategory").value;
    const price = Number(document.getElementById("productPrice").value);
    const stock = Number(document.getElementById("productStock").value);

    if (editId !== null) {
        const product = products.find(p => p.id === editId);

        product.name = name;
        product.code = code;
        product.category = category;
        product.price = price;
        product.stock = stock;
    } else {
        products.push({
            id: Date.now(),
            name: name,
            code: code,
            category: category,
            price: price,
            stock: stock
        });
    }

    closeModal();
    renderProducts();
});

/* EDIT PRODUCT */

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    editId = id;
    document.getElementById("modalTitle").textContent = "Edit Product";
    document.getElementById("productName").value = product.name;
    document.getElementById("productCode").value = product.code;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productStock").value = product.stock;
    document.getElementById("productModal").classList.add("show");
}

/* DELETE PRODUCT */

function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        products = products.filter(p => p.id !== id);
        renderProducts();
    }
}

/* MOBILE SIDEBAR */

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}

/* CLOSE MODAL WHEN CLICKING OUTSIDE */

document.getElementById("productModal").addEventListener("click", function (e) {
    if (e.target === this) {
        closeModal();
    }
});

/* INITIAL LOAD */

renderProducts();
