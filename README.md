#  E-commerce Project (Next.js + Tailwind CSS)
A modern, responsive **e-commerce web application** built with **Next.js**, **Tailwind CSS**, **Lucide Icons**, and **Framer Motion**.  

why Next.js:
	Next.js is a framework built on top of React
	Next.js makes React production-ready, faster, and SEO-friendly, while letting you focus on building your app instead of configuring tools.
	
## 🚀 Project Setup

npx create-next-app@latest ecommerce  /// create new next.js project
npm run dev 	Start the development server

**Setup Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

**Install UI Libraries
npm install lucide-react    //open-source React icons

npm install framer-motion  //motion library for React to create smooth animations and transitions.



ecommerce/
│
├── app/                             # Next.js App Router
│   ├── layout.jsx                   # Main layout (Navbar, Footer, productGrid.)
│   ├── page.jsx                     # Home page
│   ├── signup/
│   │   └── page.jsx                 # Signup page
│   ├── signin/
│   │   └── page.jsx                 # Login page
│   ├── products/
│   │   ├── page.jsx                 # Product listing page shows all or filtered products 
│   │   └── [id]/page.jsx            # Product details by ID
│   ├── panier/
│   │   └── page.jsx                 # Shopping cart page
│   ├── checkout/
│   │   └── page.jsx                 # Checkout page
│   ├── profile/
│   │   └── page.jsx                 # User profile
│   ├── data/                         # Server-side API routes (Next.js server functions)
│   │   ├── products.js				#products data
│   │   │                
│   │   ├── users.js					#users data (exemples)
│   │   
│   │                     
│   └── globals.css                  # Global styles
│
├── components/                      # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── CategoryCard.jsx
│   ├── CartegoryGrid.jsx
│   ├── Slider.jsx
│   ├── Gallery.jsx
│   
│
├── context/                         # React Contexts (global states)
│   ├── CartContext.jsx
│   └── AuthContext.jsx
│
├── public/                          # Static files (images, icons, etc.)
├── .env.local                       # Environment variables (DB_URL, JWT_SECRET, etc.)
├── next.config.mjs                  # Next.js configuration
├── package.json
├── tailwind.config.js               # Tailwind config 
└── README.md



RootLayout
└─ CartProvider (holds cart state)
   ├─ Navbar  ← reads cart to show badge count
   ├─ Product Listing Page
   │   └─ ProductCard(s)  ← calls addToCart() on click
   └─ Panier Page         ← reads cart, shows full items, total, quantities


![home](/public/cap1.png)

![cart](/public/cap2.png)

![product](/public/cap3.png)