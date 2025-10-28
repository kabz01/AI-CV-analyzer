# WrapMaster - Car Wrap Company Website

A modern, responsive website for WrapMaster, a professional car wrap and detailing company. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all device sizes
- **Service Pages**: Dedicated pages for car wraps, paint protection, and ceramic coating
- **Interactive Elements**: Smooth animations and hover effects using Framer Motion
- **Dark Mode Support**: Built-in theme switching capability
- **Contact Integration**: Ready for customer inquiries and bookings

## Services

- **Car Wraps**: Professional vehicle wrapping with premium materials
- **Paint Protection Film (PPF)**: Superior protection for your vehicle's paint
- **Ceramic Coating**: Advanced coating for ultimate shine and protection

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI + Custom Components
- **Database**: Supabase (configured)
- **Deployment**: Vercel (ready)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── car-wraps/         # Car wraps service page
│   ├── ceramic-coating/   # Ceramic coating service page
│   ├── components/        # App-specific components
│   ├── contact/           # Contact page
│   ├── customize/         # Customization page
│   ├── paint-protection/  # Paint protection service page
│   └── services/          # Services overview page
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── lib/                   # Utility functions
├── public/               # Static assets
│   └── images/          # Service images and gallery
└── styles/              # Global styles
```

## Deployment

The project is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

## Customization

- **Colors**: Modify the color scheme in `tailwind.config.ts`
- **Content**: Update service descriptions and images in respective page files
- **Styling**: Customize components in the `components/ui/` directory
- **Animations**: Adjust Framer Motion animations in page components

## License

This project is private and proprietary to WrapMaster.

## Contact

For questions about this website or WrapMaster services, please visit our contact page.
