# 🚀 Production Deployment Checklist

## ✅ Pre-Deployment Verification

### Backend Ready ✓
- [x] Environment files configured
- [x] `.gitignore` created
- [x] `render.yaml` configured
- [x] CORS updated for production
- [x] MongoDB connection ready

### Frontend Ready ✓
- [x] API URLs centralized
- [x] `.env.production` created
- [x] `vercel.json` configured
- [x] All components using `API_BASE_URL`

---

## 📋 Deployment Steps

### Step 1: Generate JWT Secret

Run in PowerShell to generate a strong secret:
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```
**Save this output** - you'll need it for Render!

---

### Step 2: Push to GitHub

```powershell
# Initialize and push to GitHub
git add .
git commit -m "Ready for production deployment"
git push origin main
```

---

### Step 3: Deploy Backend to Render

1. **Go to**: https://dashboard.render.com
2. **Click**: "New +" → "Web Service"
3. **Connect**: Your GitHub repository
4. **Configure**:
   - Name: `tce-connect-backend`
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`

5. **Environment Variables** (Click "Advanced"):
   ```
   MONGODB_URI=mongodb+srv://prodadmin:<password>@prod-cluster.xxxxx.mongodb.net/tce-connect?retryWrites=true&w=majority
   JWT_SECRET=<paste-generated-secret-from-step-1>
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://tce-connect.vercel.app
   ```
   ⚠️ Replace:
   - `<password>` with your production MongoDB password
   - `prod-cluster.xxxxx` with your actual cluster address
   - `<paste-generated-secret-from-step-1>` with JWT secret from Step 1

6. **Click**: "Create Web Service"
7. **Wait**: 5-10 minutes for deployment
8. **Copy**: Your backend URL (e.g., `https://tce-connect-backend.onrender.com`)

---

### Step 4: Update Frontend Production URL

**If your Render backend URL is different**, update:
```powershell
# Edit frontend\.env.production
# Change the URL to match your actual Render URL
```

---

### Step 5: Deploy Frontend to Vercel

**Option A: Vercel CLI (Recommended)**
```powershell
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

**Option B: Vercel Dashboard**
1. **Go to**: https://vercel.com/dashboard
2. **Click**: "Add New..." → "Project"
3. **Import**: Your GitHub repository
4. **Configure**:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Environment Variable**:
   ```
   VITE_API_URL=https://tce-connect-backend.onrender.com/api
   ```
   (Use your actual Render URL)

6. **Click**: "Deploy"
7. **Wait**: 2-5 minutes

---

### Step 6: Update Backend CORS

1. Go to Render → Your Service → Environment
2. Update `FRONTEND_URL` with your actual Vercel URL
3. Click "Save Changes" (auto-redeploys)

---

## 🧪 Testing Deployment

### Test Backend
```powershell
curl https://tce-connect-backend.onrender.com/
# Should return: "TCE Connect Backend API is running"
```

### Test Frontend
1. Visit your Vercel URL
2. Try user registration
3. Try login
4. Create an event
5. Register for an event
6. Check browser console for errors

---

## 📊 Your Live URLs

**Frontend**: https://tce-connect.vercel.app (or your custom URL)  
**Backend**: https://tce-connect-backend.onrender.com (or your custom URL)

---

## 🔧 Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` in Render matches Vercel URL exactly

### Backend Error
- Check Render logs
- Verify MongoDB connection string
- Ensure all env vars are set

### Frontend Can't Connect
- Check `VITE_API_URL` in Vercel
- Verify backend is running
- Check browser Network tab

### Render Free Tier Sleeps
- First request after 15 min takes 30-60 seconds
- Consider upgrading for always-on service

---

## 🎉 Deployment Complete!

Your TCE Connect app is now live and ready to use!
