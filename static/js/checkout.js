

function renderCheckout(){
    const items = Object.entries(cart);
    const contenedor = document.querySelector(".checkout-items");
    const totalEl = document.querySelector(".checkout-total");

    if(items.length === 0){
        contenedor.innerHTML = '<p>No agregaste nada al carrito</p>'
        totalEl.textContent = '$0';
        return
    }

    const totalPrecio = items.reduce((sum, [id, item]) => sum + item.precio * item.cantidad, 0);

    contenedor.innerHTML = items.map(([id,item]) => `
        <div class="checkout-row">
            <span>${item.nombre} x ${item.cantidad}</span>
            <span>$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
        </div>
    `).join('')

    totalEl.textContent = '$' + totalPrecio.toLocaleString('es-AR');
}

function realizarPedido(){
    const items = Object.entries(cart)
    if(items.length === 0){
        alert("tu carrito esta vacio")
        return
    }

    const metodoPago = document.querySelector('input[name="pay"]:checked').value;
    const metodoTexto = metodoPago === 'Mercado-pago' ? 'Mercado Pago / otros' : 'Efectivo';
    const total = items.reduce((sum, [id, item]) => sum + item.precio * item.cantidad, 0);

    let mensaje = `hola queria hacer este pedido: \n\n`;
    items.forEach(([id,item])=>{
        mensaje += `- ${item.nombre} x ${item.cantidad}: $${(item.precio * item.cantidad).toLocaleString('es-AR')}\n`
    })
    mensaje += `\n Total = $${total.toLocaleString('es-AR')}\n Forma de pago = ${metodoTexto}`;

    const numero = '5491158651828'
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", renderCheckout);
