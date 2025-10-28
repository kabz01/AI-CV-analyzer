#!/bin/bash

echo "🔍 Pre-deployment Check for Car Wrap Company Website"
echo "=================================================="

# Check package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found"
    exit 1
fi

# Check if all required dependencies are listed
echo "📦 Checking dependencies..."
required_deps=("next" "react" "react-dom" "@supabase/supabase-js" "framer-motion" "tailwindcss")

for dep in "${required_deps[@]}"; do
    if grep -q "\"$dep\"" package.json; then
        echo "✅ $dep found"
    else
        echo "❌ $dep missing"
    fi
done

# Check if all pages exist
echo "📄 Checking pages..."
pages=("app/page.tsx" "app/services/page.tsx" "app/contact/page.tsx" "app/about/page.tsx" "app/car-wraps/page.tsx" "app/paint-protection/page.tsx" "app/ceramic-coating/page.tsx" "app/customize/page.tsx")

for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "✅ $page exists"
    else
        echo "❌ $page missing"
    fi
done

# Check if images exist
echo "🖼️ Checking images..."
if [ -f "public/images/services/luxury-detailing.jpg" ]; then
    echo "✅ Luxury detailing image found"
else
    echo "❌ Luxury detailing image missing"
fi

if [ -f "public/images/m28_logo.png" ]; then
    echo "✅ Logo found"
else
    echo "❌ Logo missing"
fi

# Check environment variables template
echo "🔧 Environment variables needed:"
echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
echo "SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"

echo ""
echo "🎯 Pre-deployment check completed!"
echo "If all items show ✅, you're ready to deploy!"
