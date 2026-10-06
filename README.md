# OBD2 Thai App — Project Summary

## App Icon
See icon.png in assets/ folder.

## Project Files Created (33 files total)

### Configuration
- package.json — All dependencies (BLE, navigation, Zustand, etc.)
- app.json — iOS Bluetooth permissions + EAS config
- eas.json — Cloud build profiles (preview = Ad-hoc for iPhone)
- babel.config.js — Reanimated plugin
- tsconfig.json — TypeScript paths

### App Screens (src/screens/)
- ConnectionScreen.tsx — BLE scan, device list, connect/disconnect
- DashboardScreen.tsx — Live gauges + digital view
- DTCScreen.tsx — Scan and clear fault codes (Thai descriptions)
- ProfileScreen.tsx — Vehicle profile + settings (AsyncStorage)

### Core Services (src/services/)
- BLEManager.ts — Full BLE lifecycle, ELM327 AT command init
- OBDParser.ts — Hex parser for all PIDs + 60+ Thai DTC descriptions

### State & Logic
- src/store/obdStore.ts — Zustand store (connection, live data, DTCs)
- src/hooks/useOBD.ts — Polling loop + DTC read/clear hooks
- src/components/Gauges.tsx — CircularGauge, BarGauge, DigitalCard
- src/theme/theme.ts — Dark racing dashboard design tokens

### Assets Downloaded
- assets/fonts/Prompt-Regular.ttf (Thai font)
- assets/fonts/Prompt-Medium.ttf
- assets/fonts/Prompt-SemiBold.ttf
- assets/fonts/Prompt-Bold.ttf
- assets/fonts/SpaceMono-Regular.ttf
- assets/icon.png (app icon)
- assets/splash.png

## Next Steps to Build

Node.js is not installed on this machine. Install it first:
1. Go to nodejs.org and download Node.js LTS (v20+)
2. Install it with defaults
3. Open new PowerShell window
4. Run the commands in BUILD_GUIDE.md

Quick start after Node.js is installed:

```powershell
cd "C:\Users\DEEP2ILENT\Desktop\ELM327 App ProJects"
npm install
npm install -g eas-cli
eas login
eas init
eas device:create
eas build --platform ios --profile preview
```
