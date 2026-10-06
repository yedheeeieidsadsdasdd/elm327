@echo off
echo ============================================
echo   OBD2 Thai App - EAS Build for iPhone
echo ============================================
echo.

SET "PATH=C:\Program Files\nodejs;C:\Users\DEEP2ILENT\AppData\Roaming\npm;%PATH%"
SET EAS_NO_VCS=1
SET "EAS_BIN=C:\Users\DEEP2ILENT\AppData\Roaming\npm\node_modules\eas-cli\bin\run"

echo [Step 1] Node.js version:
node --version
echo.

echo [Step 2] Login status:
node "%EAS_BIN%" whoami
echo.

echo [Step 3] Starting iOS build...
echo   - ระบบอาจถาม Apple ID และรหัสผ่าน
echo   - กรอกแล้วรอ ~20 นาที
echo.

node "%EAS_BIN%" build --platform ios --profile preview

echo.
echo ======================================
echo   เสร็จแล้ว! กด Enter เพื่อปิด
echo   ดู build ที่: expo.dev
echo ======================================
echo.
pause

