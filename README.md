<img width="1920" height="1080" alt="Screenshot (77)" src="https://github.com/user-attachments/assets/b5c0910b-2e9f-4167-b547-b4a39374387a" />
<img width="1920" height="1080" alt="Screenshot (78)" src="https://github.com/user-attachments/assets/4cccbe41-f443-46a4-a7be-b676129e50e7" />
<img width="1920" height="1080" alt="Screenshot (82)" src="https://github.com/user-attachments/assets/886b6127-308b-44de-84bb-4e5249807d62" />
<img width="1920" height="1080" alt="Screenshot (83)" src="https://github.com/user-attachments/assets/01763272-55d2-435c-b6d9-856dd3c6ebc5" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/70ef7a72-d7ee-48f4-b36d-fef57c47fb0e" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/120667ab-526d-4457-a0fd-18b7d11a6e39" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/07005ac3-d3fc-4474-b22f-dd5d6b45bd46" />

# 🎓 College Management System (Enterprise ERP)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://mongodb.com)
[![Freelance Project](https://img.shields.io/badge/Status-Freelance%20Project-green.svg)](#)

A professional-grade, multi-role Educational Resource Planning (ERP) system designed to digitize administrative, faculty, and student workflows. This project was developed as a freelance solution to solve real-world college management challenges.

---

## 🚀 Live Demo & Screenshots
* **Live Link:** [Paste Your Vercel/Render Link Here]
* **Demo Credentials:**
  * **Admin:** admin@college.com / admin123
  * **Faculty:** faculty@college.com / faculty123
  * **Student:** student@college.com / student123

---

## ✨ Key Features

### 🔐 Multi-Role Authentication (RBAC)
- **Role-Based Access Control:** Custom middleware to restrict access based on user roles (Admin, Faculty, Student).
- **Secure JWT Auth:** Implementation of JSON Web Tokens for secure session management.

### 📋 Attendance & Academic Management
- **Smart Attendance:** Automated eligibility tracking (flags students below 75%).
- **Results Module:** Automated CGPA/SGPA calculation and digital marksheet generation.
- **Course Scheduling:** Department-wise subject allocation and faculty assignment.

### 💰 Fee & Financials
- **Fee Management:** Track paid/pending fees with automated invoice generation.
- **Payment Integration:** (Optional: Razorpay/Stripe integration for digital fee collection).

### 📢 Communication Hub
- **Real-time Notices:** Instant notice board updates using Socket.io or efficient API polling.
- **Profile Management:** Detailed profiles for all stakeholders with secure document uploads.

---

## 🛠️ Tech Stack

**Frontend:**
- **React.js** (Functional Components, Hooks)
- **Zustand / Redux Toolkit** (State Management)
- **Tailwind CSS / Material UI** (Professional Aesthetic)
- **Axios** (API Interaction)

**Backend:**
- **Node.js & Express.js** (Scalable API Architecture)
- **MongoDB & Mongoose** (NoSQL Database with complex relationship modeling)
- **Cloudinary** (For profile image and document storage)

---

## 📂 Folder Structure

```text
├── backend/
│   ├── controllers/   # Business logic (attendance, fees, auth)
│   ├── models/        # Mongoose schemas (Schema validation)
│   ├── routes/        # API Endpoints
│   ├── middleware/    # Auth & Error Handling
│   └── utils/         # Helper functions (PDF generators, emails)
├── frontend/
│   ├── src/
│   │   ├── components/# Reusable UI elements
│   │   ├── hooks/     # Custom React hooks
│   │   ├── pages/     # Dashboard and Role-specific views
│   │   └── store/     # Global state management
⚙️ Installation & Setup
Clone the repository:

Bash
git clone [https://github.com/thisisrakeshhhh/freelance.git](https://github.com/thisisrakeshhhh/freelance.git)
Setup Backend:

Navigate to backend/

Run npm install

Create a .env file (Add: MONGO_URI, JWT_SECRET, PORT)

Start: npm run dev

Setup Frontend:

Navigate to frontend/

Run npm install

Start: npm run dev

📈 Challenges Overcome
Complex Data Relationships: Managed many-to-many relationships between students and courses using MongoDB ref and .populate().

Logic Integrity: Developed a robust logic for automatic attendance calculation to reduce administrative manual work by 40%.

📬 Contact & Support
Developed by Rakesh 📍 Based in Chandigarh/Mohali

🔗 [LinkedIn Profile Link] | 📧 [Your Email]


### Tips for your GitHub:
1. **Add Screenshots:** A README without images is like a book without a cover. Use your phone or a screenshot tool to take 2-3 clear pictures of the **Dashboard**, **Attendance Page**, and **Login Page**.
2. **Hide Secrets:** Ensure your `node_modules` and `.env` are in your `.gitignore` file.
3. **Commit History:** Ensure your recent commits have meaningful names like "Feat: added role-based middleware" instead of "fixed stuff."

**Do you want me to help you write the `.env` template so you don't accidentally leak your database password?**
