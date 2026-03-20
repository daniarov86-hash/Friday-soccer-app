# ⚽ שישי כדורגל בכיף - PWA

אפליקציה פרוגרסיבית (PWA) לניהול טורניר כדורגל שישי.

## 📁 מבנה הקבצים

```
pwa-app/
├── index.html          # האפליקציה הראשית
├── manifest.json       # הגדרות ה-PWA
├── sw.js               # Service Worker (מאפשר עבודה אופליין)
├── icons/
│   ├── icon-192x192.png
│   └── icon-512x512.png
└── README.md
```

## 🚀 העלאה ל-GitHub Pages (חינם!)

1. צור repository חדש ב-GitHub
2. העלה את כל הקבצים (שמור על מבנה התיקיות)
3. עבור ל: Settings → Pages → Branch: main → Save
4. האפליקציה תהיה זמינה בכתובת:  
   `https://<username>.github.io/<repo-name>/`

## 📲 התקנה כאפליקציה

- **Android/Chrome**: כשנכנסים לקישור, תופיע הודעה קופצת "התקן"
- **iOS/Safari**: לחץ על כפתור השיתוף ← "הוסף למסך הבית"

## ✅ דרישות PWA

- [x] manifest.json עם אייקונים
- [x] Service Worker עם caching אופליין
- [x] HTTPS (GitHub Pages מספק אוטומטית)
- [x] Install prompt אוטומטי
