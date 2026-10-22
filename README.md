# Grinato E-Commerce (Next.js 16 + Tailwind CSS 4 + MongoDB Atlas)

A modern, responsive, SEO-optimized **e-commerce web application** built with **Next.js 16 (App Router)**, **Tailwind CSS 4**, **Lucide Icons**, **Framer Motion**, and **Mongoose / MongoDB**.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.18+ or Node.js 20+
- A running local MongoDB instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A free [Cloudinary](https://cloudinary.com) account (for image uploads)

### 2. Installation
```bash
git clone <repository-url>
cd ecommerce
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure the variables in `.env.local`:
| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas or Local connection URI | `mongodb+srv://user:pass@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `     ` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_api_secret` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used in SEO metadata and sitemap) | `https://your-domain.vercel.app` (or `http://localhost:3000` locally) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console site verification token | `your_google_verification_code` |

### 4. Database Seeding
Seed initial products (normalized categories, slugs, ratings, and types) into your database:
```bash
npm run seed
```

### 5. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel with MongoDB Atlas

### Step 1: Prepare MongoDB Atlas
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/) and create a free Shared Cluster (M0).
2. Go to **Database Access** > **Add New Database User** (choose Username/Password authentication, e.g. `ecommerce_user`).
3. Go to **Network Access** > **Add IP Address**:
   - Choose **Allow Access from Anywhere** (`0.0.0.0/0`). This is required because Vercel serverless functions use dynamic IP addresses.
4. Go to **Database** > **Connect** > **Drivers** and copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
5. Run the seed script with the Atlas connection string to populate your production database:
   ```bash
   MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority" npm run seed
   ```

### Step 2: Deploy on Vercel
1. Push your code to a GitHub repository.
2. In [Vercel Dashboard](https://vercel.com/), click **Add New...** > **Project** and import your repository.
3. In the **Environment Variables** section, add:
   - `MONGODB_URI`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (set to your production domain or Vercel URL, e.g. `https://your-project.vercel.app`)
   - `NEXT_PUBLIC_GA_ID` (your GA4 measurement ID)
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (optional, for Search Console)
4. Click **Deploy**.

---

## 🔍 Google Search Console & SEO Verification

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add a new **URL prefix** property using your production domain (`https://your-domain.vercel.app`).
3. Verification methods:
   - **HTML tag**: Copy the `content="..."` value from the meta tag and paste it into your Vercel environment variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then redeploy.
   - Click **Verify** in Search Console.
4. Go to **Sitemaps** on the left menu:
   - Submit your sitemap: `sitemap.xml` (the full URL is `https://your-domain.vercel.app/sitemap.xml`).
   - The sitemap dynamically lists your home page, category pages, and all product slugs fetched from MongoDB.

---

## 📊 Google Analytics 4 (GA4) E-Commerce Tracking

The application includes Google Analytics 4 tracking with standard e-commerce events:
- `view_item_list`: Automatically triggered when browsing the product catalog on `/products`.
- `view_item`: Triggered on product detail pages (`/products/[id]`).
- `add_to_cart`: Triggered when clicking "Add to Cart" on cards or detail pages.
- `begin_checkout`: Triggered upon navigating to checkout.
- `purchase`: Triggered after successful order submission.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router with Server Components & Turbopack)
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose
- **Icons & Animations**: Lucide React, Framer Motion
- **Media**: Cloudinary & next/image
