// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // =============================
    // ฟังก์ชันสำหรับหน้าเพิ่มสินค้า (add-product.html)
    // =============================
    const addProductForm = document.getElementById('addProductForm');
    const historyTableBody = document.querySelector('#historyTable tbody');

    if (addProductForm && historyTableBody) {
        // ฟังก์ชันสำหรับแสดงประวัติการเพิ่มสินค้า
        const fetchHistory = () => {
            fetch('/api/products')
                .then(response => response.json())
                .then(data => {
                    historyTableBody.innerHTML = ''; // ล้างข้อมูลเก่า
                    data.reverse().forEach(product => { // ใช้ reverse() เพื่อให้รายการล่าสุดอยู่บนสุด
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${product.name}</td>
                            <td>${product.quantity}</td>
                            <td>${product.price}</td>
                            <td>${new Date(product.created_at).toLocaleString()}</td>
                        `;
                        historyTableBody.appendChild(row);
                    });
                })
                .catch(error => console.error('Error fetching history:', error));
        };
        
        // ฟังก์ชันสำหรับเพิ่มสินค้า
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const quantity = parseInt(document.getElementById('quantity').value, 10);
            const price = parseFloat(document.getElementById('price').value);

            if (name === '' || isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0) {
                showNotification('กรุณากรอกข้อมูลสินค้าให้ถูกต้อง', 'warning');
                return;
            }

            fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, quantity, price })
            })
            .then(response => response.json())
            .then(data => {
                addProductForm.reset(); // รีเซ็ตฟอร์ม
                showNotification('เพิ่มสินค้าเรียบร้อย', 'success');
                fetchHistory(); // ดึงประวัติสินค้าใหม่
            })
            .catch(error => {
                console.error('Error adding product:', error);
                showNotification('เกิดข้อผิดพลาดในการเพิ่มสินค้า', 'danger');
            });
        });

        // เรียกฟังก์ชันเพื่อแสดงประวัติการเพิ่มสินค้าเมื่อโหลดหน้า
        fetchHistory(); // แสดงประวัติการเพิ่มสินค้า
    }

    // =============================
    // ฟังก์ชันสำหรับหน้าเช็คสินค้าในสต็อก (manage-product.html)
    // =============================
    const productsTableBody = document.querySelector('#productsTable tbody');
    const searchInput = document.getElementById('search');

    if (productsTableBody && searchInput) {
        // ฟังก์ชันสำหรับแสดงข้อมูลสินค้าในสต็อก
        const fetchProducts = (searchTerm = '') => {
            const url = searchTerm ? `/api/products?search=${encodeURIComponent(searchTerm)}` : '/api/products';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    productsTableBody.innerHTML = ''; // ล้างข้อมูลเก่า
                    data.forEach(product => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${product.name}</td>
                            <td>${product.quantity}</td>
                            <td>${product.price}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${product.id}">แก้ไข</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">ลบ</button>
                            </td>
                        `;
                        productsTableBody.appendChild(row);
                    });
                })
                .catch(error => console.error('Error fetching products:', error));
        };

        // ฟังก์ชันค้นหาสินค้า
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.trim();
            fetchProducts(searchTerm);
        });

        // ฟังก์ชันสำหรับลบสินค้า
        productsTableBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const id = e.target.getAttribute('data-id');
                if (confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
                    fetch(`/api/products/${id}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            showNotification(`ไม่สามารถลบสินค้าได้: ${data.error}`, 'danger');
                        } else {
                            showNotification('ลบสินค้าเรียบร้อย', 'success');
                            fetchProducts(); // ดึงข้อมูลสินค้าใหม่
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting product:', error);
                        showNotification('เกิดข้อผิดพลาดในการลบสินค้า', 'danger');
                    });
                }
            }

            // ฟังก์ชันสำหรับแก้ไขสินค้า
            if (e.target.classList.contains('edit-btn')) {
                const id = e.target.getAttribute('data-id');
                fetch(`/api/products/${id}`)
                    .then(response => {
                        if (!response.ok) throw new Error('Product not found');
                        return response.json();
                    })
                    .then(product => {
                        openEditModal(product);
                    })
                    .catch(error => {
                        console.error('Error fetching product:', error);
                        showNotification('ไม่พบสินค้านี้', 'danger');
                    });
            }
        });

        // ฟังก์ชันเปิด Modal แก้ไขสินค้า
        const openEditModal = (product) => {
            const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
            document.getElementById('edit-id').value = product.id;
            document.getElementById('edit-name').value = product.name;
            document.getElementById('edit-quantity').value = product.quantity;
            document.getElementById('edit-price').value = product.price;
            editProductModal.show();
        };

        // ฟังก์ชันสำหรับแก้ไขสินค้า
        const editProductForm = document.getElementById('editProductForm');
        if (editProductForm) {
            editProductForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const id = document.getElementById('edit-id').value;
                const name = document.getElementById('edit-name').value.trim();
                const quantity = parseInt(document.getElementById('edit-quantity').value, 10);
                const price = parseFloat(document.getElementById('edit-price').value);

                if (name === '' || isNaN(quantity) || isNaN(price) || quantity < 0 || price < 0) {
                    showNotification('กรุณากรอกข้อมูลสินค้าให้ถูกต้อง', 'warning');
                    return;
                }

                fetch(`/api/products/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, quantity, price })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        showNotification(`ไม่สามารถแก้ไขสินค้าได้: ${data.error}`, 'danger');
                    } else {
                        showNotification('แก้ไขสินค้าเรียบร้อย', 'success');
                        const editProductModal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
                        editProductModal.hide();
                        fetchProducts(); // ดึงข้อมูลสินค้าใหม่
                    }
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                    showNotification('เกิดข้อผิดพลาดในการแก้ไขสินค้า', 'danger');
                });
            });
        }

        // เรียกฟังก์ชันเพื่อแสดงข้อมูลสินค้าเมื่อโหลดหน้า
        fetchProducts(); // แสดงข้อมูลสินค้าทั้งหมดในสต็อก
    }

    // =============================
    // ฟังก์ชันสำหรับหน้ารายการซื้อสินค้า (purchase.html)
    // =============================
    const purchaseForm = document.getElementById('purchaseForm');
    const purchaseProductSelect = document.getElementById('purchaseProduct');
    const purchaseQuantityInput = document.getElementById('purchaseQuantity');
    const totalPriceElement = document.getElementById('totalPrice');

    if (purchaseForm && purchaseProductSelect && purchaseQuantityInput && totalPriceElement) {
        // ฟังก์ชันสำหรับโหลดสินค้าไปใน Dropdown
        const loadProducts = () => {
            fetch('/api/products')
                .then(response => response.json())
                .then(data => {
                    purchaseProductSelect.innerHTML = '<option value="">เลือกสินค้า</option>';
                    data.forEach(product => {
                        const option = document.createElement('option');
                        option.value = product.id;
                        option.textContent = `${product.name} (คงเหลือ: ${product.quantity})`;
                        purchaseProductSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error loading products:', error));
        };

        // ฟังก์ชันคำนวณราคารวม
        const calculateTotal = () => {
            const selectedProductId = purchaseProductSelect.value;
            const quantity = parseInt(purchaseQuantityInput.value, 10);

            if (!selectedProductId || isNaN(quantity) || quantity <= 0) {
                totalPriceElement.textContent = '0.00 บาท';
                return;
            }

            fetch(`/api/products/${selectedProductId}`)
                .then(response => response.json())
                .then(product => {
                    const total = product.price * quantity;
                    totalPriceElement.textContent = `${total.toFixed(2)} บาท`;
                })
                .catch(error => console.error('Error calculating total:', error));
        };

        // โหลดสินค้าทุกครั้งที่เลือกสินค้าใหม่
        purchaseProductSelect.addEventListener('change', calculateTotal);
        purchaseQuantityInput.addEventListener('input', calculateTotal);

        // ฟังก์ชันสำหรับซื้อสินค้า
        purchaseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productId = purchaseProductSelect.value;
            const quantity = parseInt(purchaseQuantityInput.value, 10);

            if (!productId || isNaN(quantity) || quantity <= 0) {
                showNotification('กรุณาเลือกสินค้าและใส่จำนวนที่ถูกต้อง', 'warning');
                return;
            }

            fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId, quantity })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showNotification(`ไม่สามารถซื้อสินค้าได้: ${data.error}`, 'danger');
                } else {
                    showNotification(`ซื้อสินค้าเรียบร้อย! ราคารวม: ${data.totalPrice.toFixed(2)} บาท`, 'success');
                    purchaseForm.reset();
                    totalPriceElement.textContent = '0.00 บาท';
                    loadProducts(); // อัปเดตรายการสินค้าใน Dropdown
                }
            })
            .catch(error => {
                console.error('Error purchasing product:', error);
                showNotification('เกิดข้อผิดพลาดในการซื้อสินค้า', 'danger');
            });
        });

        // โหลดสินค้าเมื่อโหลดหน้า
        loadProducts();
    }

    // =============================
    // ฟังก์ชันทั่วไปสำหรับแสดงแจ้งเตือน
    // =============================
    const showNotification = (message, type) => {
        const notificationModal = new bootstrap.Modal(document.getElementById('notificationModal'));
        const modalBody = document.querySelector('#notificationModal .modal-body');
        modalBody.textContent = message;

        const modalTitle = document.querySelector('#notificationModal .modal-title');
        if (type === 'success') {
            modalTitle.textContent = 'สำเร็จ';
            modalTitle.style.color = '#28a745';
        } else if (type === 'warning') {
            modalTitle.textContent = 'เตือน';
            modalTitle.style.color = '#ffc107';
        } else if (type === 'danger') {
            modalTitle.textContent = 'ผิดพลาด';
            modalTitle.style.color = '#dc3545';
        } else {
            modalTitle.textContent = 'แจ้งเตือน';
            modalTitle.style.color = '#333333';
        }

        notificationModal.show();
    };
});
