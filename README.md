<div align="center">

  <h1>🛒 Kirana Hub — SaaS Admin Dashboard</h1>
  <p><b>A Modern, High-Performance Store Management Platform Built for Local Businesses</b></p>

  <!-- High-Visibility Live Link for Recruiters -->
  <a href="https://kirana-hub-admin.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_VIEW_LIVE_DEMO-kirana--hub--admin.vercel.app-238636?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>

  <br /><br />

  ![Next.js](https://img.shields.io/badge/Next.js-14_(App_Router)-000000?style=flat-square&logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
  ![Status](https://img.shields.io/badge/Status-In_Development-orange?style=flat-square)
  ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

  <p>
    <a href="https://kirana-hub-admin.vercel.app/" target="_blank"><b>🚀 Launch Live Application</b></a> •
    <a href="#-key-features"><b>Key Features</b></a> •
    <a href="#-tech-stack"><b>Tech Stack</b></a> •
    <a href="#-getting-started"><b>Local Setup</b></a>
  </p>

</div>

---

> ⚡ **Live Demo Access for Recruiters & Reviewers:**  
> Visit **[kirana-hub-admin.vercel.app](https://kirana-hub-admin.vercel.app/)** to explore the platform.  
> 🔑 **Access Note:** Public registration is disabled by design—admin accounts are provisioned exclusively by the Master Admin. For quick testing, **demo credentials are pre-filled on the login screen**. Simply click **"Login"** to jump straight into the admin dashboard!

---

## 📌 Overview

**Kirana Hub** is a production-grade SaaS administrative platform designed to modernize operations for local retail and grocery stores. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, the platform bridges a public-facing retail landing experience with an advanced administrative backend for real-time inventory metrics, order status tracking, and delivery operations.

---

## 🚀 Key Features

### 🔒 1. Managed Access & Authentication
* **Master Admin Provisioning:** Public sign-up is disabled to protect store network security. Admin accounts (Store Owners) are created strictly via Master Admin controls.
* **Streamlined Recruiter Demo:** Login form comes pre-populated with active demo credentials for one-click testing without manual typing.

### 🌐 2. Public Store Landing Page
* **Modern Aesthetic ("Clarid"):** Designed with glassmorphic cards, dynamic glowing background gradients, and smooth layout animations.
* **Conversion-Driven Structure:** Highlights a sticky floating navigation bar, hero banner, feature breakdown grid, and social proof badges.
* **Smart Layout Routing:** Dynamic UI logic automatically hides admin sidebars and headers when users navigate to public storefront pages.

### 📊 3. Executive Admin Dashboard
* **Real-Time KPI Cards:** Instant visual monitoring for **Total Revenue**, **Products Managed**, and **Active Customers**.
* **Data Visualization:** Custom interactive revenue trends and order charts powered by `Recharts`.
* **Delivery Operations Center:** Real-time widget tracking available delivery partner status, active dispatches, and assigned routes.

### 🛍️ 4. Advanced Order Management System (OMS)
* **Kanban Board (Live Fulfillment):**
  * Visual status column pipeline (`Pending` → `Preparing` → `Ready`).
  * Color-coded indicator tags (Orange / Blue / Green) for immediate optical scanning.
  * Instant action triggers to **Accept**, **Reject**, or **Mark Ready**.
* **Order History & Data Table:**
  * **Search & Granular Filters:** Filter by Order ID, Customer Name, Status, or Date range.
  * **CSV Data Export:** One-click automated CSV generation for reporting and accounting.
  * **Interactive Overlays:** Glassmorphic modal overlays for detailed order inspections and deletion actions, accompanied by instant dynamic Toast feedback notifications.

### 🎨 5. Theme Engine
* **Dual Palette System:** Seamless, instant toggling between **Sello Light Mode** and **Clarid Dark Mode**.
* **Native System Preference Detection:** Respects system-level dark mode settings out of the box using Tailwind's `class` strategy.

---

## 🛠️ Tech Stack

<div align="left">

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | **Next.js 14** (App Router), **React 18** |
| **Language** | **TypeScript** |
| **Styling & UI** | **Tailwind CSS**, Custom Glassmorphism CSS, Heroicons |
| **State Management** | **Zustand**, React Custom Hooks |
| **Data Visualization** | **Recharts** |
| **Deployment** | **Vercel** |

</div>

---

## 💻 Getting Started

To run Kirana Hub locally on your system:

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**, **yarn**, or **pnpm**

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/abhijeethursad/kirana-hub.git](https://github.com/abhijeethursad/kirana-hub.git)
   cd kirana-hub