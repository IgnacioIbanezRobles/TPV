// MESAS
let currentTable = null;
let nTotalMesas = 6;




function hideAllContent() {
    for (let i = 1; i <= nTotalMesas; i++) {
        const mesa = document.getElementById("mesa" + i);
        if (mesa) {
            mesa.style.display = "none";
        }
    }
}

// Función para cambiar la mesa actual
function selectTable(nMesa) {
    hideAllContent();
    const mesa = document.getElementById("mesa" + nMesa);
    if (mesa) {
        mesa.style.display = "block";
        currentTable = nMesa;
    }
}


// CATEGORIAS
//Funcion ocultar todas las categorias de la mesa actual
function hideAllCategories() {

     var bebidasId = ('bebidas_menu' +currentTable);
     var vinosId = ('vinos_menu' +currentTable);
     var primerosId = ('primeros_menu' +currentTable);
     var segundosId = ('segundos_menu' +currentTable);
     var postresId = ('postres_menu' +currentTable);

     var bebidasCategoria = document.getElementById(bebidasId);
     var vinosCategoria = document.getElementById(vinosId);
     var primerosCategoria = document.getElementById(primerosId);
     var segundosCategoria = document.getElementById(segundosId);
     var postresCategoria = document.getElementById(postresId);

     // Oculta todas las categorías
     bebidasCategoria.style.display = "none";
     vinosCategoria.style.display = "none";
     primerosCategoria.style.display = "none";
     segundosCategoria.style.display = "none";
     postresCategoria.style.display = "none";

}


// Función para cambiar la categoría actual
function displayCategory(categoria) {
    if (currentTable) {
        var categoryId = categoria +"_menu" +currentTable;
        var cat = document.getElementById(categoryId);

        if (cat) {
            hideAllCategories()
            cat.style.display = "block";
        }
    }
}



//CUENTA DE LAS MESAS
// Define un objeto para representar las mesas
const tables = {
    mesa1: {
        cartItems: [],
        totalPrice: 0,
    },
    mesa2: {
        cartItems: [],
        totalPrice: 0,
    },
    mesa3: {
        cartItems: [],
        totalPrice: 0,
    },
    mesa4: {
        cartItems: [],
        totalPrice: 0,
    },
    mesa5: {
        cartItems: [],
        totalPrice: 0,
    },
    mesa6: {
        cartItems: [],
        totalPrice: 0,
    },
    // Agregar más mesas
};

// Función para agregar productos al carrito de la mesa actual
function addToCart(productName, price) {
    const table = tables["mesa" + currentTable];
    if (table) {
        table.cartItems.push({ name: productName, price: price });
        table.totalPrice += price;
        updateCart(currentTable);
    }
}

// Función para actualizar el carrito de la mesa actual
function updateCart(currentTable) {
    const table = tables["mesa" + currentTable];
    if (table) {
        const cartList = document.getElementById('cart-items-mesa' + currentTable);
        const totalAmount = document.getElementById('total-amount-mesa' + currentTable);

        cartList.innerHTML = '';
        table.cartItems.forEach(item => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
  //Casilla para Seleccionar
            checkbox.type = "checkbox";
            checkbox.name = "cartItem";
            checkbox.value = `${item.name} - ${item.price.toFixed(2)} €`;
            li.appendChild(checkbox);

            const label = document.createElement('label');
            label.appendChild(document.createTextNode(`${item.name} - ${item.price.toFixed(2)} €`));
            li.appendChild(label);

            cartList.appendChild(li);
        });

        totalAmount.innerText = `${table.totalPrice.toFixed(2)} €`;
    }
}

// Función para eliminar productos al carrito de la mesa actual
function removeFromCart(productName, price) {
    const table = tables["mesa" + currentTable];

    if (table && table.cartItems.length > 0) {
        // Busca el producto en el carrito
        const index = table.cartItems.findIndex(item => item.name === productName);

        if (index !== -1) {
            // Encuentra el producto en el carrito y réstale el precio al total
            const removedProduct = table.cartItems.splice(index, 1)[0];
            table.totalPrice -= removedProduct.price;
            updateCart(currentTable);
        }
    }
}
// Función para eliminar productos seleccionados del carrito de la mesa actual
function removeSelectedFromCart() {
    const table = tables["mesa" + currentTable];

    if (table && table.cartItems.length > 0) {
        // Obtén todos los elementos de casilla de verificación marcados
        const selectedCheckboxes = document.querySelectorAll('input[name="cartItem"]:checked');

        if (selectedCheckboxes.length > 0) {
            selectedCheckboxes.forEach(checkbox => {
                const productName = checkbox.value.split(' - ')[0];
                const price = parseFloat(checkbox.value.split(' - ')[1]);
                const index = table.cartItems.findIndex(item => item.name === productName);

                if (index !== -1) {
                    // Encuentra el producto en el carrito y réstale el precio al total
                    const removedProduct = table.cartItems.splice(index, 1)[0];
                    table.totalPrice -= removedProduct.price;
                }
            });

            // Actualiza el carrito después de eliminar productos seleccionados
            updateCart(currentTable);
        }
    }
}


//FUNCION agregar producto 

 function addProduct() {
	// Solicitar nombre del producto
      var nombre = prompt("Introduce el nombre del producto:");

      // Solicitar precio del producto
      var precio = prompt("Introduce el precio del producto:");

      // Validar la entrada
      if (nombre !== null && precio !== null && !isNaN(parseFloat(precio))) {
        // Llamar a la función addProduct con los valores introducidos
        addToCart(nombre, parseFloat(precio));
		alert("Producto Agregado:\nNombre: " + nombre + "\nPrecio: $" + precio.toFixed(2));
      } else {
        alert("Entrada inválida. Asegúrate de introducir un nombre y un precio numérico.");
      }
    }

    



// Funcion para sacar el total de la cuenta y reiniciar la mesa
function checkout() {
    if (currentTable !== null) {
        // Lógica de pago y reiniciar la caja registradora
        const table = tables["mesa" + currentTable];
        if (table) {
            // Calcular el IVA (por ejemplo, 21%)
            const ivaRate = 0.10;
            const ivaAmount = table.totalPrice * ivaRate;
			var separator = "---------------------------------";
            

            // Crear la lista de productos con formato
            const productList = table.cartItems.map(item => `\t${item.name} - ${item.price.toFixed(2)} €`).join('\n');

            // Crear el mensaje de la factura con detalles
            const alertMessage = `Factura:
			\n${productList}
			\n${separator}
			\nSubtotal: ${table.totalPrice.toFixed(2)} €
			\n${separator}
			\nIVA (${(ivaRate * 100).toFixed(2)}%): ${ivaAmount.toFixed(2)} €
            \n${separator}
            \nTotal:  ${(table.totalPrice+ivaAmount).toFixed(2)} €
			\n\n¡Gracias por su compra!`;

            // Mostrar la alerta con la factura
             Swal.fire(alertMessage);

            // Reiniciar el carrito y actualizar la interfaz
            table.cartItems = [];
            table.totalPrice = 0;
            updateCart(currentTable);
        }
    } else {
        alert("Selecciona una mesa antes de finalizar el pedido.");
    }
}
