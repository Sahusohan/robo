// ============================================
// TINYBOTICS — FIREBASE VISITOR TRACKER
// ============================================

import { initializeApp }          from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAisU7STb4UAJmcpuFtvp520OrX0of-THI",
  authDomain:        "anonymousconfession-19707.firebaseapp.com",
  databaseURL:       "https://anonymousconfession-19707-default-rtdb.firebaseio.com",
  projectId:         "anonymousconfession-19707",
  storageBucket:     "anonymousconfession-19707.firebasestorage.app",
  messagingSenderId: "513711142017",
  appId:             "1:513711142017:web:a54387faff58ba03644980",
  measurementId:     "G-B7YXCGCB8Q"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

async function getIP() {
  try {
    const r = await fetch("https://api.ipify.org?format=json");
    return (await r.json()).ip;
  } catch { return "unknown"; }
}

async function getLocation(ip) {
  try {
    if (ip === "unknown") return {};
    const r = await fetch(`https://ipapi.co/${ip}/json/`);
    const d = await r.json();
    return {
      country:   d.country_name || "unknown",
      region:    d.region       || "unknown",
      city:      d.city         || "unknown",
      isp:       d.org          || "unknown",
      timezone:  d.timezone     || "unknown",
      latitude:  d.latitude     || null,
      longitude: d.longitude    || null,
    };
  } catch { return {}; }
}

function getDeviceInfo() {
  const ua = navigator.userAgent;

  let device = "Desktop";
  if (/Mobi|Android/i.test(ua) && !/Tablet|iPad/i.test(ua)) device = "Mobile";
  else if (/Tablet|iPad/i.test(ua)) device = "Tablet";

  let browser = "Unknown";
  if      (ua.includes("Edg"))                           browser = "Edge";
  else if (ua.includes("OPR") || ua.includes("Opera"))   browser = "Opera";
  else if (ua.includes("Chrome"))                        browser = "Chrome";
  else if (ua.includes("Firefox"))                       browser = "Firefox";
  else if (ua.includes("Safari"))                        browser = "Safari";

  let os = "Unknown";
  if      (ua.includes("Windows NT 10")) os = "Windows 10/11";
  else if (ua.includes("Windows"))       os = "Windows";
  else if (ua.includes("Mac OS X"))      os = "macOS";
  else if (ua.includes("Android"))       os = "Android";
  else if (ua.includes("iPhone"))        os = "iOS (iPhone)";
  else if (ua.includes("iPad"))          os = "iOS (iPad)";
  else if (ua.includes("Linux"))         os = "Linux";

  const conn       = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const connection = conn ? (conn.effectiveType || conn.type || "unknown") : "unknown";

  return {
    device,
    browser,
    os,
    platform:    navigator.platform || "unknown",
    language:    navigator.language || "unknown",
    languages:   (navigator.languages || []).join(", "),
    screenRes:   `${screen.width}x${screen.height}`,
    windowRes:   `${window.innerWidth}x${window.innerHeight}`,
    colorDepth:  `${screen.colorDepth}-bit`,
    touchPoints: navigator.maxTouchPoints || 0,
    cookiesOn:   navigator.cookieEnabled,
    doNotTrack:  navigator.doNotTrack === "1",
    connection,
    userAgent:   ua,
  };
}

async function logVisitor() {
  const ip       = await getIP();
  const location = await getLocation(ip);
  const device   = getDeviceInfo();
  const now      = new Date();

  const data = {
    ip,
    ...location,
    ...device,
    page:      window.location.pathname || "/",
    pageTitle: document.title           || "unknown",
    referrer:  document.referrer        || "direct",
    fullURL:   window.location.href,
    timestamp: now.toISOString(),
    timeIST:   now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    dayOfWeek: now.toLocaleDateString("en-IN", { weekday: "long", timeZone: "Asia/Kolkata" }),
  };

  try {
    await push(ref(db, "tinybotics_visitors"), data);
    console.log("Visitor logged");
  } catch (err) {
    console.error("Firebase error:", err);
  }
}

logVisitor();
