let carrito = [];
 
function agregarProducto(nombre, precio, cantidad) {
    const existe = carrito.find(item => item.nombre === nombre);
    if (existe) {
        existe.cantidad += cantidad;
    } else {
        carrito.push({ nombre, precio, cantidad });
    }
    renderCarrito();
}
 
function removerItem(idx) {
    carrito.splice(idx, 1);
    renderCarrito();
}
 
function renderCarrito() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const amountEl = document.getElementById('total-amount');
    const countEl = document.getElementById('cart-count');
 
    const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    const count = carrito.reduce((s, i) => s + i.cantidad, 0);
 
    if (count > 0) {
        countEl.style.display = 'flex';
        countEl.textContent = count;
    } else {
        countEl.style.display = 'none';
    }
 
    if (carrito.length === 0) {
        container.innerHTML = '<p class="empty-cart">Sin productos aún</p>';
        totalEl.style.display = 'none';
        return;
    }
 
    container.innerHTML = '';
    carrito.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div>
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-detail">$${item.precio} × ${item.cantidad}</div>
            </div>
            <button class="cart-remove" onclick="removerItem(${idx})">×</button>
        `;
        container.appendChild(row);
    });
 
    totalEl.style.display = 'flex';
    amountEl.textContent = '$' + total.toLocaleString();
}
 
function toggleCart() {
    const panel = document.getElementById('cart-panel');
    panel.classList.toggle('open');
}
 
document.addEventListener('click', function (e) {
    const panel = document.getElementById('cart-panel');
    const cartBtn = document.querySelector('.cart-l');
    if (panel && cartBtn && !panel.contains(e.target) && !cartBtn.contains(e.target)) {
        panel.classList.remove('open');
    }
});
 