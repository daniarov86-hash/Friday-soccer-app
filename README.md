# ⚽ שישי כדורגל בכיף - PWA

אפליקציה פרוגרסיבית (PWA) לניהול טורניר כדורגל שישי עם תוצאות **בזמן אמת** לכל המשתתפים.

---

## 📁 מבנה הקבצים

```
Friday Soccer App/
├── index.html          # האפליקציה הראשית
├── manifest.json       # הגדרות ה-PWA
├── sw.js               # Service Worker (מאפשר עבודה אופליין)
├── icon-192x192.png    # אייקון קטן
├── icon-512x512.png    # אייקון גדול
└── README.md           # המדריך הזה
```

---

## 🚀 העלאה ל-GitHub Pages

1. כנס לריפוזיטורי שלך ב-GitHub
2. העלה את כל הקבצים (החלף את הישנים)
3. עבור ל: **Settings → Pages → Branch: main → Save**
4. האפליקציה זמינה בכתובת:
   `https://<username>.github.io/<repo-name>/`

---

## 🔥 הגדרת Firebase (חובה לתוצאות בזמן אמת)

### שלב 1 — צור פרויקט Firebase
1. כנס ל־ https://console.firebase.google.com
2. לחץ **"Add project"**
3. תן שם (למשל `friday-soccer`) ← לחץ Continue
4. כבה את Google Analytics ← לחץ **Create project**

### שלב 2 — הפעל Realtime Database
1. בתפריט השמאלי לחץ **"Databases & Storage"**
2. לחץ על **"Realtime Database"**
3. לחץ **"Create Database"**
4. בחר אזור: **United States** ← לחץ Next
5. בחר **"Start in test mode"** ← לחץ **Enable**

### שלב 3 — קבל את ה-Config
1. לחץ על גלגל השיניים ⚙️ ← **"Project settings"**
2. גלול למטה ← לחץ על **`</>`** (Web app)
3. תן שם ← לחץ **"Register app"**
4. תראה קוד — העתק רק את החלק הזה (ה-JSON שלך יראה דומה לזה):

```json
{
  "apiKey": "AIzaSyAiSIHzBlC9l6UUjOo1xiwIAKYGNK5pUiM",
  "authDomain": "friday-soccer-shishi.firebaseapp.com",
  "databaseURL": "https://friday-soccer-shishi-default-rtdb.firebaseio.com",
  "projectId": "friday-soccer-shishi",
  "storageBucket": "friday-soccer-shishi.firebasestorage.app",
  "messagingSenderId": "246429163079",
  "appId": "1:246429163079:web:022c036f1d9fa7e61e5b62"
}
```

> ⚠️ הערכים שלך יהיו שונים — העתק את ה-JSON **שלך** מ-Firebase, לא את הדוגמה למעלה.

### שלב 4 — חבר באפליקציה
1. פתח את האפליקציה
2. בחר **מנהל** ← הזן סיסמה: `shishi`
3. תראה תיבה צהובה — הדבק את ה-JSON ← לחץ **"התחבר"**
4. החיבור נשמר אוטומטית לפעמים הבאות ✅

---

## 🔐 מצבי משתמש

| מצב | הרשאות | גישה |
|-----|---------|-------|
| **מנהל** | עריכה מלאה — תוצאות, הגרלה, קבוצות | סיסמה: `shishi` |
| **צופה** | צפייה בלבד בזמן אמת | ללא סיסמה |

- צופה יכול לעבור למנהל בכל עת דרך כפתור **"🔐 עבור למנהל"**
- כפתור **"🔌 ניתוק"** חוזר למסך בחירת תפקיד

---

## 📲 התקנה כאפליקציה

- **Android/Chrome** — תופיע הודעה קופצת "התקן"
- **iOS/Safari** — לחץ על כפתור השיתוף ← "הוסף למסך הבית"

---

## ✅ דרישות טכניות

- [x] manifest.json עם אייקונים
- [x] Service Worker עם caching
- [x] HTTPS (GitHub Pages מספק אוטומטית)
- [x] Firebase Realtime Database לסנכרון בזמן אמת
