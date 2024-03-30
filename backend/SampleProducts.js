import productModel from './models/productModel.js'; // Adjust the path as needed

const sampleProducts = [
    {
        name: "Running Shoes",
        description: "High-performance running shoes designed for speed and comfort. Perfect for both casual runners and serious athletes.",
        price: 99.99,
        category: "65fd4dbe67290db1afc9df7d", // Replace "category_id" with the actual category ID
        quantity: 50,
        shipping: true,
        bestSeller: true,
        featured: true,
        slug: "running-shoes",
        image: "/images/men1.png",

    },
    {
        name: "Athletic Sneakers",
        description: "Stylish and versatile sneakers suitable for various sports activities and everyday wear. Made with breathable materials for maximum comfort.",
        price: 79.99,
        category: "65fd56ee1abb4325cd7bfb85", // Replace "category_id" with the actual category ID
        quantity: 40,
        shipping: true,
        bestSeller: false,
        featured: false,
        slug: "athletic-sneakers",
        image: "/images/men2.png",
    },
    {
        name: "Trail Running Shoes",
        description: "Durable trail running shoes designed for off-road adventures. Provides excellent traction and support on rugged terrain.",
        price: 119.99,
        category: "65fd56ee1abb4325cd7bfb85",
        quantity: 30,
        shipping: true,
        bestSeller: false,
        featured: true,
        slug: "trail-running-shoes",
        image: "/images/men3.png",
    },
    {
        name: "Walking Shoes",
        description: "Comfortable walking shoes suitable for long walks and everyday use. Features cushioned insoles for added comfort.",
        price: 69.99,
        category: "65fd56ee1abb4325cd7bfb85",
        quantity: 45,
        shipping: true,
        bestSeller: false,
        featured: true,
        slug: "walking-shoes",
        image: "/images/men4.png",
    },
    {
        name: "Basketball Shoes",
        description: "High-top basketball shoes designed for optimal performance on the court. Provides ankle support and excellent traction.",
        price: 129.99,
        category: "65fd56ee1abb4325cd7bfb85",
        quantity: 35,
        shipping: true,
        bestSeller: true,
        featured: false,
        slug: "basketball-shoes",
        image: "/images/men5.png",
    },
    {
        name: "Cross Training Shoes",
        description: "Versatile cross training shoes suitable for various indoor and outdoor workouts. Offers stability and flexibility during intense training sessions.",
        price: 89.99,
        category: "65fd56ee1abb4325cd7bfb85",
        quantity: 25,
        shipping: true,
        bestSeller: false,
        featured: false,
        slug: "cross-training-shoes",
        image: "/images/men6.png",
    },
    {
        name: "Soccer Cleats",
        description: "Sleek soccer cleats designed for agility and control on the field. Features a lightweight design and textured upper for enhanced ball control.",
        price: 109.99,
        category: "65fd56ee1abb4325cd7bfb85",
        quantity: 20,
        shipping: true,
        bestSeller: true,
        featured: true,
        slug: "soccer-cleats",
        image: "/images/men7.png",
    },
    {
        name: "Hiking Boots",
        description: "Sturdy hiking boots designed for outdoor adventures. Provides ankle support and waterproof protection for hiking in various terrains.",
        price: 149.99,
        category: "65fd56ee1abb4325cd7bfb85",
        quantity: 15,
        shipping: true,
        bestSeller: false,
        featured: false,
        slug: "hiking-boots",
        image: "/images/men8.png", // Example path to the image file
        // Add more fields as needed
    },
    {
        name: "Skate Shoes",
        description: "Durable skate shoes designed for skateboarding enthusiasts. Features reinforced stitching and grippy outsoles for better board control.",
        price: 89.99,
        category: "65fd57691abb4325cd7bfb89", // Replace "category_id" with the actual category ID
        quantity: 30,
        shipping: true,
        bestSeller: true,
        featured: true,
        slug: "skate-shoes",
        image: "/images/men9.png", // Example path to the image file
        // Add more fields as needed
    },
    {
        name: "Casual Slip-Ons",
        description: "Casual slip-on shoes perfect for everyday wear. Easy to slip on and off, with a comfortable fit for all-day comfort.",
        price: 59.99,
        category: "65fd57691abb4325cd7bfb89", // Replace "category_id" with the actual category ID
        quantity: 40,
        shipping: true,
        bestSeller: false,
        featured: true,
        slug: "casual-slip-ons",
        image: "/images/women.png", // Example path to the image file
        // Add more fields as needed
    },
];

// Insert sample products into the database
sampleProducts.forEach(async (product) => {
    try {
        const newProduct = new productModel(product);
        await newProduct.save();
        console.log(`Product ${newProduct.name} inserted successfully.`);
    } catch (error) {
        console.error(`Error inserting product ${product.name}:`, error);
    }
});
