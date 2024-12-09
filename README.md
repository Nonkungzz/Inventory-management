# วิธีการเริ่มต้นใช้งานโปรแกรม

## 1. ดาวน์โหลดและติดตั้ง XAMPP
- ไปที่ [apachefriends.org](https://www.apachefriends.org) และดาวน์โหลด XAMPP
- ติดตั้ง XAMPP เพื่อใช้สำหรับการรันเซิร์ฟเวอร์และฐานข้อมูล MySQL

## 2. ตั้งค่าฐานข้อมูล
- เปิด **phpMyAdmin** ผ่าน XAMPP Control Panel
- สร้างฐานข้อมูลใหม่ชื่อ **`inventory_system`**
- นำไฟล์ **`Nonkungz.sql`** เข้าไป Import เพื่อสร้างตารางและข้อมูลตัวอย่าง
- กด **Start** Apache และ MySQL ใน XAMPP Control Panel

## 3. ติดตั้ง Node.js
- ไปที่ [nodejs.org](https://nodejs.org) และดาวน์โหลด Node.js
- ติดตั้ง Node.js บนเครื่องของคุณ

## 4. ติดตั้ง Dependencies
- เปิด **Terminal** หรือ **Command Prompt**
- รันคำสั่ง:
  ```bash
  npm install

## 5. ตั้งค่าไฟล์เซิร์ฟเวอร์
เปิดไฟล์ server.js
ตั้งค่าการเชื่อมต่อกับฐานข้อมูล MySQL ดังนี้

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_system'
});


## 6. รันเซิร์ฟเวอร์
node server.js


## 7. เปิดเว็ปไซต์
http://localhost:3000