let cart = JSON.parse(localStorage.getItem('cart')) || {};

function guardarCart(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

document.addEventListener('click', function(e){
    const btn = e.target.closest('.add');
    if(btn){
        const id = btn.dataset.id;
        const nombre = btn.dataset.name;
        const precio = parseFloat(btn.dataset.price);

        if(cart[id]){
            cart[id].cantidad += 1;
        } else {
            cart[id] = { nombre, precio, cantidad: 1 };
        }
        guardarCart();
        renderCart();
    }

    const btnRemove = e.target.closest('.remove-item');
    if(btnRemove){
        const id = btnRemove.dataset.id
        eliminarProducto(id)
    }

});

function eliminarProducto(id){
    delete cart[id];
    guardarCart();
    renderCart();
}

function clearCart(){
    cart = {}
    guardarCart();
    renderCart();
}

function renderCart(){
    const items = Object.entries(cart);
    const contenedor = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    const cantidadEl = document.getElementById("cartCount");

    const totalCantidad = items.reduce((sum, [id, i]) => sum + i.cantidad, 0);
    const totalPrecio = items.reduce((sum, [id, i]) => sum + i.precio * i.cantidad, 0);

    cantidadEl.textContent = totalCantidad;
    totalEl.textContent = '$' + totalPrecio.toLocaleString('es-AR');

    if(items.length === 0){
        contenedor.innerHTML = '<p class="cart-empty">Todavía no agregaste nada</p>';
        return;
    }

    contenedor.innerHTML = items.map(([id, item]) => `
        <div class="cart-row">
            <span>${item.nombre} x ${item.cantidad}</span>
            <span class="cart-row-right">
                $${(item.precio * item.cantidad).toLocaleString('es-AR')}
                <button class="remove-item" data-id="${id}">✕</button>
            </span>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderCart);

function openCart(){
    document.getElementById("drawer").classList.add('open');
    document.getElementById("overlay").classList.add('open');
}

function closeCart(){
    document.getElementById("drawer").classList.remove('open');
    document.getElementById("overlay").classList.remove('open');
}