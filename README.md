# **StorageTraker**

StorageTraker is an streamlined inventory‑management application designed for eBay sellers who need accurate, real‑time control of their stored items, listings, and workflow. StorageTraker provides a clean interface, fast lookups, and reliable tracking to help sellers stay organized and prevent costly mistakes like overselling or misplacing inventory. Whether you manage a small side‑hustle or a growing online store, StorageTraker keeps your items, quantities, and listing statuses neatly under control.

---

## **Badges**

`https://img.shields.io/badge/status-active-brightgreen`  
`https://img.shields.io/badge/license-MIT-blue`  
`https://img.shields.io/badge/platform-web-lightgrey`  
`https://img.shields.io/badge/API-eBay%20Compatible-orange`  

---

## **Features**

- **Track item quantities, storage bins, and SKU details**  
- **Centralized dashboard** for all stored items  
- **Search and filter tools** for fast lookups  
- **Monitor listing status** (listed, sold, awaiting shipment)  
- **Clean, simple interface** to keep workflows organized  
- **Exportable reports** for audits and bookkeeping  

---

## **Project Goals**

- Reduce manual errors in inventory management  
- Provide a scalable foundation for high‑volume sellers  
- Offer a clean, modern UI with minimal friction  
- Support future expansion through modular architecture  

---

## **Tech Stack**

### **Languages & Frameworks**
- **Frontend:** JavaScript or TypeScript with React (recommended for speed + component structure)  
- **Backend:** Node.js (Express) or Python (FastAPI)  
- **Database:** SQL-based system (PostgreSQL or MySQL recommended)  
- **ORM Options:** Prisma, Sequelize, or SQLAlchemy  

### **APIs & Integrations**
- **eBay API** for automated listing synchronization  
- OAuth-based authentication for secure user access  

### **Infrastructure**
- Local storage for MVP  
- Cloud-hosted database for multi-user support (Phase 2)  
- Optional CDN for static assets  
- Containerization with Docker for deployment consistency  

---

## **Installation**

### **Prerequisites**
- Node.js (v18+)  
- PostgreSQL or MySQL installed locally  
- Git  

### **Clone the Repository**
```bash
git clone https://github.com/yourusername/StorageTraker.git
cd StorageTraker
```

### **Install Dependencies**
```bash
npm install
```

### **Environment Variables**
Create a `.env` file in the project root:

```
DATABASE_URL="your-sql-connection-string"
EBAY_APP_ID="your-ebay-app-id"
EBAY_CERT_ID="your-ebay-cert-id"
EBAY_DEV_ID="your-ebay-dev-id"
JWT_SECRET="your-secret-key"
```

### **Run the Development Server**
```bash
npm run dev
```

---

## **Usage**

Once the server is running:

- Access the dashboard at `http://localhost:3000`
- Add items with SKU, quantity, and storage bin  
- Filter and search through your inventory  
- Update listing status as items move through your workflow  
- Export reports as CSV or PDF  

---

## **Roadmap**

### **Phase 1 — Local MVP**
- Local database  
- Core inventory tracking  
- Dashboard + search  

### **Phase 2 — Cloud & Users**
- User accounts  
- Cloud database  
- Multi-device sync  
- eBay API integration  

### **Phase 3 — AI Enhancements**
- Image detection for item recognition  
- Voice assistant integration (Google Home, Alexa)  
- Smart recommendations  

---

## **Contributing**

1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Open a pull request  

---

## **License**

This project is licensed under the **MIT License**.

---

