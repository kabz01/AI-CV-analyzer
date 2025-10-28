# Car Wrap Company - Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
npx vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: car-wrap-company
# - Directory: ./
# - Override settings? No
\`\`\`

### Option 2: Netlify
\`\`\`bash
# Build the project
npm run build

# Drag the .next folder to netlify.com/drop
# Or use Netlify CLI:
npm i -g netlify-cli
netlify deploy --prod --dir=.next
\`\`\`

### Option 3: Manual Setup
1. Download the code
2. Run `npm install`
3. Run `npm run build`
4. Upload the `.next` folder to your hosting provider

## Environment Variables
Set these in your hosting platform:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

## Database Setup
1. Create a Supabase project
2. Run the SQL scripts in the `scripts` folder
3. Update environment variables

## Verification Checklist
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Car wraps page displays colors
- [ ] Quote forms submit successfully
- [ ] Contact forms work
- [ ] Admin panel accessible at /admin/test-connection
- [ ] Mobile responsive design
- [ ] Images load properly

## Troubleshooting
- **Build errors**: Check Node.js version (use 18+)
- **Image issues**: Verify all image URLs are accessible
- **Database errors**: Check Supabase credentials
- **Styling issues**: Ensure Tailwind CSS is properly configured
