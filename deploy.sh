#!/bin/bash

# Configuration
VPS_USER="jelas-beres"
VPS_IP="103.13.207.114"
VPS_PATH="~/jelasberes.id"

echo "🚀 Memulai proses deployment ke VPS ($VPS_IP)..."

echo "📦 1/3 Mengunggah file terbaru ke server (rsync)..."
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' --exclude '.agents' --exclude '.gemini' -e "ssh -o StrictHostKeyChecking=no" ./ "$VPS_USER@$VPS_IP:$VPS_PATH/"

if [ $? -ne 0 ]; then
    echo "❌ Gagal mengunggah file. Proses dihentikan."
    exit 1
fi

echo "⚙️  2/3 Menyiapkan environment dan mem-build aplikasi di server..."
ssh -o StrictHostKeyChecking=no "$VPS_USER@$VPS_IP" << 'EOF'
    cd ~/jelasberes.id
    
    echo "-> Menjalankan npm install..."
    npm install
    
    
    echo "-> Mengupdate Prisma Client..."
    npx prisma generate
    
    echo "-> Membersihkan cache build lama..."
    rm -rf .next/cache
    
    echo "-> Mem-build Next.js (bisa memakan waktu beberapa menit)..."
    npm run build
    
    echo "-> Merestart server PM2..."
    pm2 restart jelasberes
EOF

if [ $? -ne 0 ]; then
    echo "❌ Terjadi kesalahan saat build atau restart server."
    exit 1
fi

echo "✅ Deployment selesai! Website berhasil di-update."
