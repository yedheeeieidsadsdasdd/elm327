# OBD2 Thai App — Build and Deploy Guide (Windows to iPhone 15)

## What You Need Before Starting

- Windows PC with Node.js 20+ installed
- Apple Developer Account ($99/year) — register at developer.apple.com
- Expo Account (free) — register at expo.dev
- iPhone 15 with Developer Mode enabled
- ELM327 BLE Adapter (e.g., Vgate iCar Pro BLE)

---

## Step 1: Install Dependencies

Open PowerShell and run:

```powershell
cd "C:\Users\DEEP2ILENT\Desktop\ELM327 App ProJects"

npm install

node download-fonts.js

npm install -g eas-cli

eas login
```

---

## Step 2: Initialize EAS Project

```powershell
eas init
```

After getting a Project ID, open `app.json` and update:

```json
"extra": {
  "eas": {
    "projectId": "YOUR_PROJECT_ID_HERE"
  }
}
```

---

## Step 3: Set Up Apple Developer Signing

```powershell
eas credentials
```

Select: iOS > Provisioning Profile > Create new
Select: Distribution Certificate > Let EAS handle it

To register your iPhone 15 UDID:
```powershell
eas device:create
```
EAS will send a link to your iPhone to capture the UDID automatically.

---

## Step 4: Build on EAS Cloud (No Mac Required!)

```powershell
eas build --platform ios --profile preview
```

This will:
1. Upload source code to EAS Cloud
2. Build on Expo's Mac servers (takes 15-25 minutes)
3. Return a download link for the .ipa file

Check build status:
```powershell
eas build:list
```

---

## Step 5: Install on iPhone 15

**Method A: Via EAS QR Code (Easiest)**
When the build completes, EAS shows a QR Code.
Scan with iPhone Safari > tap Install.

**Method B: Via Sideloadly (Recommended for Windows)**
1. Download Sideloadly from sideloadly.io for Windows
2. Connect iPhone via USB
3. Drag the .ipa file into Sideloadly > click Start
4. On iPhone: Settings > General > VPN & Device Management > Trust

**Method C: Via AltStore (Free, no $99 needed)**
1. Download AltServer for Windows from altstore.io
2. Install AltStore on iPhone via USB
3. Sideload the .ipa through AltStore
4. Note: Must refresh every 7 days (Apple free account limitation)

---

## Step 6: Enable Developer Mode on iPhone 15

1. Settings > Privacy & Security > Developer Mode > Turn ON
2. Restart iPhone
3. Confirm Developer Mode activation

---

## Troubleshooting

**Bluetooth Permission Denied**
Go to Settings > Privacy > Bluetooth > Allow the app

**No ELM327 Device Found**
- Make sure OBD2 dongle is plugged in and ignition is ON
- Some BLE adapters need a button press to be discoverable
- Forget device in Bluetooth settings and scan again

**ELM327 Initialization Failed**
- Wait 3 seconds after plugging in OBD2 before connecting
- Toggle iPhone Bluetooth off and on

**NO DATA from PID**
- Some vehicles do not support all PIDs — this is normal
- Try with engine actually running (not just ACC)

**Build Error: bundleIdentifier already in use**
Change the bundleIdentifier in app.json to something unique like:
com.yourname.obd2thai2024

---

## Project Structure

```
ELM327 App Projects/
├── app/
│   ├── _layout.tsx        Root layout + tab navigation
│   ├── index.tsx          Entry point redirect
│   ├── connection.tsx     BLE connection tab
│   ├── dashboard.tsx      Live data dashboard tab
│   ├── dtc.tsx            DTC scan/clear tab
│   └── profile.tsx        Vehicle profile tab
├── src/
│   ├── services/
│   │   ├── BLEManager.ts  Core BLE + ELM327 initialization
│   │   └── OBDParser.ts   Hex parser + Thai DTC database
│   ├── store/
│   │   └── obdStore.ts    Zustand global state
│   ├── hooks/
│   │   └── useOBD.ts      Polling loop + DTC hooks
│   ├── components/
│   │   └── Gauges.tsx     CircularGauge, BarGauge, DigitalCard
│   ├── screens/
│   │   ├── ConnectionScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── DTCScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── theme/
│       └── theme.ts       Colors, fonts, spacing
├── assets/
│   ├── fonts/             Prompt-*.ttf + SpaceMono.ttf
│   ├── icon.png
│   └── splash.png
├── app.json               Expo config + iOS permissions
├── eas.json               EAS build profiles
├── package.json           Dependencies
├── babel.config.js        Babel config
├── tsconfig.json          TypeScript config
└── download-fonts.js      Font auto-downloader
```

---

## Quick Summary Commands

```powershell
npm install
node download-fonts.js
eas login
eas init
eas device:create
eas build --platform ios --profile preview
eas build:list
```

---

## Supported ELM327 BLE Devices

| Device              | BLE Service UUID | Tested |
|---------------------|-----------------|--------|
| Vgate iCar Pro BLE  | FFF0            | Yes    |
| OBDLink CX          | FFE0            | Yes    |
| Veepeak OBDCheck BLE| FFE0            | Yes    |
| Generic ELM327 BLE  | FFF0/FFE0       | Yes    |
| Carista Bluetooth   | FFF0            | Yes    |
