# ShopFit Solutions — Australian Edition

## Project Structure

```
ShopFitting_Solutions/
├── src/                    # React frontend + admin panel
│   ├── components/         # Public frontend components
│   ├── admin/              # Admin panel (pages, context, components)
│   ├── data/               # Default site data
│   └── pages/              # Service & Portfolio detail pages
├── backend/                # Node.js + Express backend (single, flat structure)
│   ├── config/db.js        # MongoDB connection
│   ├── middleware/auth.js  # JWT auth middleware
│   ├── models/SiteData.js  # Mongoose schema
│   ├── routes/             # Auth + SiteData routes
│   ├── server.js           # Entry point
│   └── .env                # Environment variables (create this!)
├── public/                 # Static assets / images
└── package.json            # Frontend dependencies
```

## Setup

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node server.js
```

### Environment Variables (backend/.env)
```
PORT=5000
MONGO_URI=mongodb+srv://YOUR_CLUSTER/shopfit_solutions
ADMIN_USERNAME=admin
ADMIN_PASSWORD=yourpassword
JWT_SECRET=your_secret_key_here
```

## Admin Panel
Visit `/admin` — default credentials: `admin` / `admin123`

The admin panel manages all frontend content in real time:
- Hero Slides
- Services & Services Detail
- Industries
- Process Steps
- Portfolio & Portfolio Detail
- Testimonials

## Color Scheme — Australian Flag
- Navy Blue: `#00308F`
- Red: `#CC0001`
- White: `#FFFFFF`
- Gold: `#FFCD00`

## Deployment
- **Frontend**: Vercel, Netlify, or any static host (`npm run build`)
- **Backend**: Railway, Render, Heroku (point to `backend/` folder)
- Set `MONGO_URI` to your MongoDB Atlas connection string
