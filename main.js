
const products = [
    {
        id: 1,
        name: "Minimalist Smartwatch",
        description: "Sleek and modern, these wireless headphones deliver high-quality sound with a comfortable, over-ear design. Perfect for on-the-go music lovers, they feature a minimalistic black finish and provide excellent noise isolation, making them ideal for both work and leisure.",
        price: "$99.99",
        image: "rachit-tank-2cFZ_FB08UM-unsplash.jpg"
    },
    {
        id: 2,
        name: "Polaroid Instant Camera",
        description: "Capture your memories instantly with this stylish Polaroid OneStep2 instant camera. Featuring a retro-inspired design, it blends classic charm with modern functionality. Equipped with easy-to-use controls, this camera is perfect for anyone looking to relive the magic of instant photography.",
        price: "$149.99",
        image: "eniko-kis-KsLPTsYaqIQ-unsplash.jpg"
    },
    {
        id: 3,
        name: "Wireless headphone",
        description: "This elegant smartwatch combines modern technology with a minimalist design. The slim, silver band and round display make it a versatile accessory that complements any outfit. Track your fitness, receive notifications, and stay connected without compromising on style.",
        price: "$79.99",
        image: "c-d-x-PDX_a_82obo-unsplash.jpg"
    },
    {
        id: 4,
        name: "Superior Watch",
        description: "This elegant smartwatch combines modern technology with a minimalist design. The slim, silver band and round display make it a versatile accessory that complements any outfit. Track your fitness, receive notifications, and stay connected without compromising on style.",
        price: "$55.99",
        image: "pexels-javon-swaby-197616-2783873.jpg"
        
    },
];

document.addEventListener('DOMContentLoaded', function() {
    // Save the selected product ID to local storage
    document.querySelectorAll('.product-item a').forEach(item => {
        item.addEventListener('click', event => {
            const productId = event.currentTarget.getAttribute('data-id');
            console.log(`Selected product ID: ${productId}`);
            localStorage.setItem('selectedProductId', productId);
        });
    });

    // Function to load the product details
    function loadProductDetails() {
        const productId = localStorage.getItem('selectedProductId');
        console.log(`Loading details for product ID: ${productId}`);
        const product = products.find(p => p.id === parseInt(productId));

        if (product) {
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('product-description').innerText = product.description;
            document.getElementById('product-price').innerText = `Price: ${product.price}`;
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-image').alt = product.name;

            // Load details into checkout panel
            document.getElementById('checkoutProductName').innerText = product.name;
            document.getElementById('checkoutProductPrice').innerText = product.price;
            document.getElementById('checkoutProductImage').src = product.image;
            document.getElementById('checkoutProductImage').alt = product.name;
        } else {
            document.querySelector('.product-detail').innerText = "Product not found!";
        }
    }

    // Call the function when the product detail page is loaded
    if (window.location.pathname.includes('product.html')) {
        loadProductDetails();
    }

    // Function to add 'Buy Now' buttons to each product item
    function addBuyNowButtons() {
        document.querySelectorAll('.product-item').forEach(item => {
            const productId = item.querySelector('a').getAttribute('data-id');
            const button = document.createElement('button');
            button.className = 'buy-now-button';
            button.innerText = 'Buy Now';
            button.setAttribute('data-id', productId);
            button.addEventListener('click', event => {
                localStorage.setItem('selectedProductId', productId);
                window.location.href = 'product.html';
            });
            item.appendChild(button); // Append the button to the product item
        });
    }

    // Call the function to add the buttons after the DOM has loaded
    addBuyNowButtons();

    const openCheckoutButton = document.getElementById('openCheckout');
    const checkoutPanel = document.getElementById('checkoutPanel');
    const closeCheckoutButton = document.getElementById('closeCheckout');
    const successMessage = document.getElementById('successMessage');

    openCheckoutButton.addEventListener('click', function () {
        checkoutPanel.classList.add('open');

        // Get the selected product ID and load product details
        const productId = localStorage.getItem('selectedProductId');
        const product = products.find(p => p.id === parseInt(productId));

        if (product) {
            document.getElementById('checkoutProductName').innerText = product.name;
            document.getElementById('checkoutProductPrice').innerText = product.price;
            document.getElementById('checkoutProductImage').src = product.image;
            document.getElementById('checkoutProductImage').alt = product.name;
        }
    });

    closeCheckoutButton.addEventListener('click', function () {
        checkoutPanel.classList.remove('open');
        successMessage.classList.remove('show');
    });

    document.getElementById('checkoutForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };

        try {
            // Send the form data to the server
            const response = await fetch('http://localhost:3003/submit-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Handle the server response
            if (response.ok) {
                // Display the success message
              
                successMessage.style.display = 'block';
                successMessage.classList.add('show');

                // Optionally close the checkout panel after a few seconds
                
                setTimeout(function() {
                    checkoutPanel.classList.remove('open');
                    successMessage.classList.remove('show');
                }, 3000); // 3 seconds delay before closing
            } else {
                alert('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
