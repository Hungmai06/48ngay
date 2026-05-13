# 48 Ngay Lay Goc Tieng Anh - Frontend

Frontend React + Vite cho web hoc tieng Anh. Du an hien tai chi dung mock data local JSON de de thay the bang Spring Boot API sau nay.

## Cong nghe

- React + Vite
- React Router
- CSS hien dai, responsive
- LocalStorage cho auth/progress/vocabulary state

## Chay du an

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Tai khoan mock de login

- hocvien1@example.com
- hocvien2@example.com
- hocvien3@example.com
- admin@48ngay.vn

Password co the nhap bat ky gia tri khong rong.

## Cau truc thu muc

```
src/
	components/
	pages/
	services/
	utils/
	data/
	hooks/
	layouts/
```

## Ghi chu tich hop backend sau nay

- Thay logic trong `src/services/authService.js` va `src/services/courseService.js` bang call API Spring Boot.
- `parseDriveLink()` o `src/utils/parseDriveLink.js` da tach rieng de tai su dung.
- UI da dung route bao ve va state localStorage, nen co the thay bang token/session API ma khong can doi layout trang.
