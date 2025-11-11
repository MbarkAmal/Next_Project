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
├── app/                             
│   ├── layout.jsx                   
│   ├── page.jsx                     
│   ├── signup/
│   │   └── page.jsx                 
│   ├── signin/
│   │   └── page.jsx                 
│   ├── products/
│   │   ├── page.jsx                 
│   │   └── [id]/page.jsx            
│   ├── panier/
│   │   └── page.jsx                 
│   ├── checkout/
│   │   └── page.jsx                 
│   ├── profile/
│   │   └── page.jsx                 
│   ├── data/                         
│   │   ├── products.js				
│   │   │                
│   │   ├── users.js					
│   │   
│   │                     
│   └── globals.css                  
│
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
├── context/                        
│   ├── CartContext.jsx
│   └── AuthContext.jsx
│
├── public/                          
├── .env.local                      
├── next.config.mjs                 
├── package.json
├── tailwind.config.js               
└── README.md





![home](/public/cap1.png)

![cart](/public/cap2.png)

![product](/public/cap3.png)
