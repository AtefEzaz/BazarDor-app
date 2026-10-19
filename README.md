<div align="center">

# 🛒 বাজার দর · BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে**
*Daily grocery prices of Bangladesh — rice, lentils, oil, vegetables, fish, meat, eggs & spices — in one place.*

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![BetterAuth](https://img.shields.io/badge/Auth-BetterAuth-05893E)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

[🌐 Live Demo](https://YOUR-LIVE-LINK.vercel.app) · [🐛 Report a Bug](https://github.com/YOUR-USERNAME/YOUR-REPO/issues) · [✨ Request a Feature](https://github.com/YOUR-USERNAME/YOUR-REPO/issues)

</div>

---

## 📖 About the Project

**BazarDor (বাজার দর)** is a fully responsive, Bangla-first web application that helps people track the daily market prices of everyday essentials. Users can see today's price movers, browse products by category, sort by price, and — after signing in — compare prices across different bazars with minimum, maximum and average values.

The project was built as part of the **Programming Hero B14-A7** assignment, using the Next.js App Router with BetterAuth and MongoDB for authentication.

## ✨ Key Features

| | Feature | Description |
|---|---|---|
| 📈 | **Live price ticker** | Infinite scrolling strip showing emoji, product name, price per unit and ▲/▼ change percentage. Pauses on hover. |
| 🔺🔻 | **Today's price movers** | Top 6 products whose price rose and top 6 whose price fell, with colour-coded badges. |
| 🗂️ | **Category pages** | Browse Rice, Lentils, Oil, Vegetables, Fish, Meat, Egg & Milk and Spices. Includes skeleton loaders and an empty state. |
| ↕️ | **Smart sorting** | Sort by *Default*, *Price: Low → High* or *High → Low*. Sorting uses real numeric values, so Bengali numerals (১,৮৫০ vs ৯৯) are handled correctly. |
| 🔐 | **Authentication** | Email/password, Google and GitHub login powered by **BetterAuth** and MongoDB, with toast notifications for every action. |
| 🛡️ | **Protected product details** | Min / max / average price and a market-wise price table, available only to signed-in users. |
| 👤 | **My Profile** | View account info, sign out, and update your name from a dedicated page. |
| 📱 | **Fully responsive** | Works smoothly on mobile, tablet and desktop. |
| 🚧 | **Custom 404 page** | Friendly message with a "হোম পেজে ফিরে যান" button for any invalid route. |

## 🧰 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router) + React + TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [HeroUI](https://www.heroui.com/) styles
- **Authentication:** [BetterAuth](https://better-auth.com/) (email/password + Google + GitHub)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) via `@better-auth/mongo-adapter`
- **Notifications:** [react-hot-toast](https://react-hot-toast.com/)
- **Font:** Hind Siliguri (Google Fonts)
- **Deployment:** [Vercel](https://vercel.com/)

## 📂 Project Structure

```text
├── app/
│   ├── (auth)/signin, signup     # Authentication pages
│   ├── api/auth/[...all]         # BetterAuth route handler
│   ├── category/[slug]           # Category page (sorting + skeleton)
│   ├── product/[slug]            # Protected product details page
│   ├── profile/ , profile/update # Profile and update-name pages
│   ├── layout.tsx                # Navbar + ticker + footer + toaster
│   ├── page.tsx                  # Home page
│   └── not-found.tsx             # 404 page
├── components/                   # Navbar, Ticker, Hero, ProductCard, ...
├── lib/
│   ├── auth.ts                   # BetterAuth server config
│   ├── auth-client.ts            # BetterAuth client helpers
│   ├── api.ts                    # Data fetching (+ fallback data)
│   └── format.ts                 # Bengali number & price formatting
└── public/                       # Images and logo
```

## 🔌 Data Source

Product and category data is fetched from the Programming Hero BazarDor API:

```text
GET /products            # all products
GET /products/:id        # single product
GET /categories          # all categories
```

The app tries the main API first and automatically falls back to two alternative base URLs if it is unavailable.

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or later
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
# Required
BETTER_AUTH_MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000

# Optional — enables social login buttons
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

> 💡 Social login activates automatically when its keys are present.
> OAuth callback URLs: `{BETTER_AUTH_URL}/api/auth/callback/google` and `{BETTER_AUTH_URL}/api/auth/callback/github`

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

## ☁️ Deployment (Vercel)

1. Push the project to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add the same environment variables from your `.env` file, and set `BETTER_AUTH_URL` to your live site URL (for example `https://your-app.vercel.app`).
4. Click **Deploy**.
5. In MongoDB Atlas, allow Vercel to connect under **Network Access** (for example `0.0.0.0/0`).

## 🖼️ Screenshots

> Add your screenshots to a `screenshots/` folder and update the paths below.

| Home | Category |
|---|---|
| ![Home](screenshots/home.png) | ![Category](screenshots/category.png) |

| Product Details | Sign In |
|---|---|
| ![Product](screenshots/product.png) | ![Sign In](screenshots/signin.png) |

## 🗺️ Roadmap

- [ ] Price history charts for each product
- [ ] Favourite / watch-list products
- [ ] Email verification and password reset
- [ ] English / Bangla language toggle

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to open an issue or submit a pull request.

## 👨‍💻 Author

**Atef Akbar Ezaz**

- GitHub: [@YOUR-USERNAME](https://github.com/YOUR-USERNAME)

## 📄 License

This project was created for educational purposes as part of the Programming Hero course.

---

<div align="center">

⭐ If you like this project, please give it a star!

</div>
