# MERN Developer Portfolio

A modern, full-stack portfolio application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

### Public Site
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Lighthouse score 90+ across all metrics
- **SEO Friendly**: Open Graph, structured data, and sitemap
- **Accessibility**: WCAG 2.1 AA compliant
- **PWA Ready**: Service worker and offline functionality

### Content Management
- **Projects Portfolio**: Showcase with filtering and search
- **Skills Database**: Categorized technical skills with proficiency
- **Timeline**: Professional experience and education
- **Contact Form**: Spam protection and email notifications
- **Admin Panel**: Full CRUD operations with authentication

### Technical Features
- **Security**: JWT auth, rate limiting, input validation
- **Error Handling**: Comprehensive error boundaries and 404 pages
- **Performance**: Image lazy loading, code splitting, caching
- **Monitoring**: Health checks and performance metrics
- **CI/CD**: GitHub Actions for automated testing and deployment

## 🛠 Tech Stack

### Frontend
- **React 18**: Latest React with hooks and context
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router 6**: Client-side routing
- **React Hook Form**: Form validation and management
- **React Query**: Server state management
- **PWA**: Service worker for offline functionality

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
- **Nodemailer**: Email notifications
- **Express Validator**: Input validation

### DevOps & Tools
- **GitHub Actions**: CI/CD pipeline
- **ESLint & Prettier**: Code formatting and linting
- **Lighthouse CI**: Performance monitoring
- **Husky**: Git hooks
- **Docker**: Containerization (optional)

## 📁 Project Structure

portfolio-mern/
├── client/ # React frontend
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── hooks/ # Custom hooks
│ │ ├── services/ # API services
│ │ ├── contexts/ # React contexts
│ │ └── utils/ # Utility functions
│ └── dist/ # Build output
├── server/ # Express backend
│ ├── controllers/ # Route controllers
│ ├── middleware/ # Custom middleware
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── utils/ # Utility functions
│ └── scripts/ # Database scripts
└── .github/ # GitHub Actions workflows


## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**

