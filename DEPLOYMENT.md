# 🚀 Panduan Deployment Aplikasi KPD PKP

## 📋 Informasi Aplikasi
- **Nama**: KPD PKP - Sistem Manajemen Pengesahan Kontrak Pajak
- **Lokasi**: Kabupaten Jember
- **Framework**: Next.js 15 + TypeScript + SQLite Database
- **UI Framework**: shadcn/ui + Tailwind CSS

---

## ✅ STATUS DEPLOYMENT SIAP

### **Database**
- ✅ Simple file-based database (JSON) untuk development
- ✅ Schema lengkap untuk 12 table entities
- ✅ Geographic data: 31 Kecamatan, 135 Kelurahan Jember
- ✅ Auto-initialization dengan default admin user

### **Authentication System**
- ✅ JWT-based authentication dengan cookies
- ✅ Role-based access control (admin, petugas_pkp, ar)
- ✅ Password hashing dengan bcryptjs
- ✅ Session management yang secure

### **User Interface**
- ✅ Responsive design untuk desktop dan mobile
- ✅ Modern UI dengan shadcn/ui components
- ✅ Role-specific dashboards dan sidebars
- ✅ Public portal untuk Wajib Pajak

---

## 🔑 AKUN DEFAULT

### **Administrator**
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full system administration

### **Test Petugas PKP**  
- **Username**: `test_petugas2`
- **Password**: `test123`
- **Access**: PKP management dashboard

### **Test AR**
- **Username**: `hanafi`  
- **Password**: `[Generated Password - Check admin panel]`
- **Access**: Account Representative dashboard

---

## 📁 STRUKTUR FILES UNTUK WEBHOSTING

```
aplikasi-kpd-pkp/
├── .next/                 # Build output (auto-generated)
├── public/               # Static assets
├── src/
│   ├── app/             # Next.js app directory
│   ├── components/      # Reusable components
│   ├── lib/             # Utilities dan database
│   ├── types/           # TypeScript definitions
│   └── data/            # Geographic data
├── package.json         # Dependencies
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── simple-db.json       # Database file (auto-created)
```

---

## 🛠️ LANGKAH DEPLOYMENT WEBHOSTING

### **1. Persiapan Server**
```bash
# Install Node.js v18+ dan npm/pnpm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm (recommended)
npm install -g pnpm
```

### **2. Upload dan Install**
```bash
# Upload semua files ke webhosting
# Pastikan struktur direktori sama seperti di atas

# Install dependencies
pnpm install

# Build aplikasi
pnpm run build --no-lint

# Start production server
pnpm start
```

### **3. Konfigurasi Environment**
```bash
# Optional: Set environment variables
export NODE_ENV=production
export JWT_SECRET=your-secure-jwt-secret-key
export PORT=3000
```

### **4. Process Management (Recommended)**
```bash
# Install PM2 untuk production
npm install -g pm2

# Start aplikasi dengan PM2
pm2 start npm --name "kpd-pkp" -- start
pm2 save
pm2 startup
```

---

## 🔐 KEAMANAN WEBHOSTING

### **File Permissions**
```bash
# Set proper permissions untuk security
chmod 644 *.json *.js *.ts
chmod 755 node_modules/
chmod 600 simple-db.json  # Database file
```

### **Firewall Setup**
- Buka port 3000 untuk HTTP traffic
- Set SSL/TLS certificate jika menggunakan HTTPS
- Konfigurasi reverse proxy (nginx/apache) jika diperlukan

### **Database Security**
- Database file `simple-db.json` berisi password hash yang secure
- Backup database secara rutin
- Monitor akses dan log untuk security

---

## 🌐 NGINX CONFIGURATION (Optional)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📊 MONITORING & MAINTENANCE

### **Health Check**
```bash
# Check if application is running
curl http://localhost:3000/login
# Should return HTTP 200 with login page

# Check API endpoints  
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
# Should return success response with JWT
```

### **Database Backup**
```bash
# Backup database file
cp simple-db.json simple-db-backup-$(date +%Y%m%d).json

# Scheduled backup (crontab)
0 2 * * * cp /path/to/app/simple-db.json /path/to/backup/simple-db-$(date +\%Y\%m\%d).json
```

### **Log Monitoring**
```bash
# Monitor application logs dengan PM2
pm2 logs kpd-pkp

# Monitor system logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 🔄 MIGRASI PRODUCTION DATABASE (Future)

Untuk production deployment yang lebih scalable:

### **PostgreSQL Migration**
```sql
-- Create database
CREATE DATABASE kpd_pkp;

-- Import schema dari src/lib/database.ts
-- Migrate data dari simple-db.json
```

### **MySQL Migration**  
```sql
-- Create database
CREATE DATABASE kpd_pkp;

-- Convert SQLite schema ke MySQL
-- Import geographic dan user data
```

---

## 🆘 TROUBLESHOOTING

### **Common Issues**

**Port Already in Use:**
```bash
# Kill existing process
pkill -f "pnpm start"
lsof -ti:3000 | xargs kill
```

**Permission Errors:**
```bash
# Fix file permissions
chmod -R 755 /path/to/app
chown -R www-data:www-data /path/to/app
```

**Database Lock:**
```bash
# Reset database if needed
rm simple-db.json
# Restart application (will recreate with default admin)
```

**Build Errors:**
```bash
# Clear cache and rebuild
rm -rf .next/
pnpm run build --no-lint
```

---

## 📞 SUPPORT & CONTACT

- **System Admin**: admin@your-domain.com
- **Technical Support**: support@your-domain.com
- **Documentation**: README.md
- **Source Code**: Version control system

---

**✅ APLIKASI SIAP UNTUK DEPLOYMENT PRODUCTION!**