# Car Wrap Company Website - Deployment Guide

## Latest Updates Included
- ✅ Luxury detailing image added to services page
- ✅ All service pages optimized
- ✅ Supabase integration with offline support
- ✅ Responsive design across all devices
- ✅ Contact forms and quote systems
- ✅ Paint protection and ceramic coating pages

## Quick Deployment Options

### Option 1: Vercel (Recommended)

#### Method A: Through Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: Leave empty
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Add environment variables:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   \`\`\`
7. Click "Deploy"

#### Method B: Using Vercel CLI
\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
\`\`\`

### Option 2: Netlify

1. Build the project:
   \`\`\`bash
   npm run build
   \`\`\`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `.next` folder
4. Add environment variables in site settings

### Option 3: Railway

\`\`\`bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
\`\`\`

## Environment Variables Required

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
\`\`\`

## Build Commands

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Verify all images are in the correct paths

### Environment Variables
- Make sure all Supabase variables are set
- Check variable names match exactly
- Ensure URLs don't have trailing slashes

### GitHub Connection Issues
\`\`\`bash
git remote -v
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
\`\`\`

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Images display properly
- [ ] Contact forms work
- [ ] Quote system functions
- [ ] Mobile responsiveness
- [ ] Supabase connection active
- [ ] Environment variables set
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)

## Performance Optimization

The website includes:
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ Responsive images with proper sizing
- ✅ Optimized fonts and assets
- ✅ Efficient database queries
- ✅ Offline support for forms

## Support

If you encounter any issues during deployment:
1. Check the build logs for specific errors
2. Verify all environment variables are set
3. Ensure your GitHub repository is accessible
4. Contact support if needed

Your car wrap company website is ready for production! 🚀
