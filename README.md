# Great Beginnings Day Care - Website

## 🏫 Overview
Modern, high-performance website for Great Beginnings Day Care Center in Roselle, Illinois. Built with Next.js 15.5.2, React 19, TypeScript 5.9.2, and Tailwind CSS 4.1.13.

## 🚀 Features

### Core Technologies
- **Next.js 15.5.2** - Latest React framework with App Router
- **React 19.0.0** - Cutting-edge React with Server Components
- **TypeScript 5.9.2** - Type-safe development with strictest settings
- **Tailwind CSS 4.1.13** - Modern utility-first CSS framework
- **Turbopack** - Lightning-fast development builds
- **PostgreSQL 17** - Modern database with advanced features
- **Supabase** - Backend-as-a-Service for authentication and database

### Key Features
- 🌐 Multi-language support (English, Spanish, Russian, Ukrainian)
- 📱 Progressive Web App (PWA) capabilities
- 🔒 Secure parent portal with document uploads
- 📅 Event calendar and announcements
- 📝 Online enrollment and waitlist management
- 🎯 Real-time tour scheduling
- 📊 Admin dashboard for staff
- ♿ WCAG 2.1 AA accessibility compliant

## 📁 Project Structure

```
gbdc-roselle-website/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles with Tailwind CSS 4
├── database/              # Database layer
│   ├── migrations/        # PostgreSQL 17 schema migrations
│   ├── types.ts          # TypeScript types for database
│   ├── helpers.ts        # Database utility functions
│   └── repositories/     # Repository pattern for data access
├── lib/                   # Library code
│   └── supabase/         # Supabase client configurations
├── public/               # Static assets
├── .env.example          # Environment variables template
├── .env.local           # Local environment variables (not in git)
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🛠️ Installation

### Prerequisites
- Node.js 18.18+ (LTS recommended)
- PostgreSQL 17 or Supabase account
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/gbdc-website.git
cd gbdc-website/gbdc-roselle-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your actual values:
# - Supabase credentials
# - API keys for Google Maps, OpenWeatherMap
# - Email service (Resend) credentials
```

4. **Set up the database**
```bash
# Run the migration file in your PostgreSQL/Supabase instance
# Location: database/migrations/001_initial_schema.sql
```

5. **Start development server**
```bash
npm run dev
# Open http://localhost:3000
```

## 📝 Available Scripts

```bash
# Development with Turbopack (fast refresh)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Check code quality
npm run lint
```

## 🗄️ Database Schema

The application uses PostgreSQL 17 with modern features:

### Main Tables
- **users** - User accounts with roles (parent, staff, admin)
- **children** - Child profiles with enrollment status
- **document_uploads** - Secure document storage
- **referrals** - Referral program tracking
- **contact_submissions** - Contact form entries
- **waitlist** - Waitlist management with priority scoring
- **classrooms** - Classroom information
- **events** - Calendar events
- **announcements** - News and updates
- **resources** - Educational resources library

### PostgreSQL 17 Features Used
- `gen_random_uuid()` for UUID generation
- BRIN indexes for timestamp columns
- Covering indexes for optimized queries
- Native JSONB path queries
- Generated columns for computed values
- Row Level Security (RLS) policies
- Partitioned tables for audit logs

## 🔐 Environment Variables

Key environment variables needed:

```env
# Supabase (Database & Auth)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Google Maps (for location/directions)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key

# Email Service (Resend)
RESEND_API_KEY=your_resend_key

# Weather Widget
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_weather_key

# Analytics (Optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Self-Hosted
1. Build the application: `npm run build`
2. The output will be in `.next` folder
3. Run with: `npm start`
4. Use PM2 or similar for process management

## 🧪 Development Guidelines

### TypeScript
- Strict mode enabled with all checks
- Use type-safe database queries with generated types
- Avoid `any` types

### Code Style
- Tailwind CSS for styling
- Component-based architecture
- Server Components by default
- Client Components only when needed

### Database Access
- Use repository pattern for data access
- Type-safe queries with Supabase
- Implement proper error handling

## 📚 Documentation

- **Database Types**: See `database/types.ts` for all table definitions
- **API Routes**: Server Actions in `app/actions/`
- **Components**: Reusable components in `app/components/`
- **Utilities**: Helper functions in `database/helpers.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## 📄 License

Copyright © 2024 Great Beginnings Day Care Center. All rights reserved.

## 📞 Contact

**Great Beginnings Day Care Center**
- Address: 757 E Nerge Rd, Roselle, IL 60172
- Phone: (630) 894-3440
- Email: info@greatbeginningsdaycare.com
- Hours: Monday-Friday 6:30 AM - 6:00 PM

## 🛡️ Security

- All data encrypted in transit and at rest
- HIPAA-compliant document handling
- Regular security audits
- Automatic backups

---

Built with ❤️ for Great Beginnings Day Care Center