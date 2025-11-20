# Deployment Guide for TCE Connect

## Overview
This guide will help you deploy:
- **Backend**: Node.js + Express + MongoDB on **Render**
- **Frontend**: React + TypeScript + Vite on **Vercel**

---

## 📋 Prerequisites

1. **MongoDB Atlas Account** (Free tier available)
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a cluster and get your connection string

2. **Render Account** (Free tier available)
   - Sign up at https://render.com
   
3. **Vercel Account** (Free tier available)
   - Sign up at https://vercel.com

4. **GitHub Account** (for code repository)
   - Push your code to GitHub

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Create a new cluster (free M0 tier)
3. Click "Connect" → "Connect your application"
4. Copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/tce-connect?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your credentials
6. Keep this connection string - you'll need it for Render

---

## 🚀 Step 2: Deploy Backend to Render

### A. Push Code to GitHub
```powershell
cd backend
git init
git add .
git commit -m "Initial backend setup"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### B. Deploy on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `tce-connect-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-random-secret-key>
   PORT=5000
   FRONTEND_URL=https://tce-connect.vercel.app
   ```

   **Generate JWT_SECRET** using PowerShell:
   ```powershell
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
   ```

6. Click **"Create Web Service"**

7. Wait for deployment (5-10 minutes)

8. **Copy your backend URL**: `https://tce-connect-backend.onrender.com`

---

## 🎨 Step 3: Deploy Frontend to Vercel

### A. Update Environment Variables

1. Edit `frontend/.env.local`:
   ```env
   VITE_API_URL=https://tce-connect-backend.onrender.com/api
   ```

2. Commit the change:
   ```powershell
   cd frontend
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

### B. Deploy on Vercel

**Option 1: Using Vercel CLI (Recommended)**
```powershell
npm install -g vercel
cd frontend
vercel login
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **What's your project's name?** → `tce-connect`
- **In which directory is your code located?** → `./`
- **Want to override settings?** → No

**Option 2: Using Vercel Dashboard**

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variable**:
   ```
   VITE_API_URL=https://tce-connect-backend.onrender.com/api
   ```

6. Click **"Deploy"**

7. Wait for deployment (2-5 minutes)

8. **Your app is live!** 🎉 
   - URL: `https://tce-connect.vercel.app` (or similar)

---

## 🔧 Step 4: Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Click **"Environment"**
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://tce-connect.vercel.app
   ```
   (Use your actual Vercel URL)

5. Click **"Save Changes"**
6. Service will automatically redeploy

---

## ✅ Step 5: Verify Deployment

### Test Backend
```powershell
curl https://tce-connect-backend.onrender.com
# Should return: "TCE Connect Backend API is running"
```

### Test Frontend
1. Visit your Vercel URL: `https://tce-connect.vercel.app`
2. Try registering a new user
3. Login and test event creation/registration
4. Check browser console for any errors

---

## 📝 Common Issues & Fixes

### Issue 1: CORS Errors
**Solution**: Ensure `FRONTEND_URL` in Render matches your Vercel URL exactly

### Issue 2: Backend shows "Application Error"
**Solution**: 
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Issue 3: Frontend can't connect to backend
**Solution**:
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is running on Render
- Check browser Network tab for failed requests

### Issue 4: Render free tier sleeps after inactivity
**Note**: Free tier services sleep after 15 minutes of inactivity. First request after sleep takes 30-60 seconds to wake up.

**Solution** (optional):
- Upgrade to paid plan for always-on service
- Use a cron job to ping your service every 10 minutes

---

## 🔄 Updating Your Deployment

### Update Backend
```powershell
cd backend
git add .
git commit -m "Your changes"
git push
```
Render auto-deploys on push to main branch.

### Update Frontend
```powershell
cd frontend
git add .
git commit -m "Your changes"
git push
```
Vercel auto-deploys on push to main branch.

---

## 🌐 Custom Domain (Optional)

### For Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render (Backend)
1. Go to Service Settings → Custom Domain
2. Add your custom domain
3. Update DNS records as instructed

---

## 📊 Monitoring & Logs

### Render Logs
- Dashboard → Your Service → Logs tab
- Shows server errors and requests

### Vercel Logs
- Project → Deployments → Click deployment → View Function Logs
- Shows build and runtime logs

---

## 💰 Pricing

**Free Tier Includes:**
- **MongoDB Atlas**: 512 MB storage
- **Render**: 750 hours/month, sleeps after 15 min inactivity
- **Vercel**: Unlimited deployments, 100 GB bandwidth

**All services are FREE for small projects!**

---

## 🎉 Your App is Live!

**Frontend**: https://tce-connect.vercel.app  
**Backend**: https://tce-connect-backend.onrender.com

Share with your college community! 🚀

---

## Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
