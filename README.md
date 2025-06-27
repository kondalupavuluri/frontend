# Medsage - Your AI Medical Companion

A futuristic medical platform built for MyOnsite Medical Hospital, providing comprehensive healthcare management with AI-powered diagnosis, medication scheduling, emergency services, and family health tracking.

## 🏥 Features

### Core Functionality
- **🏠 Home/Landing Page** - Welcome banner, hospital branding, and feature highlights
- **🧠 AI Diagnosis** - Multilingual symptom analysis with confidence scores
- **🤖 Triage Bot** - Floating AI assistant with voice/chat support
- **💊 Medication Scheduler** - Smart reminders and dose tracking
- **🚑 Emergency Services** - One-click SOS with location tracking
- **👨‍👩‍👧‍👦 Family Health Mode** - Multi-profile health management
- **📜 Medical History** - Complete logs with PDF export

### Technical Features
- **🌙 Dark/Light Mode** - Seamless theme switching
- **📱 Mobile Responsive** - Optimized for all devices
- **🌍 Multilingual Support** - English, Telugu, Hindi, Gujarati
- **⚡ Real-time Updates** - Live tracking and notifications
- **🔒 HIPAA Compliant** - Enterprise-grade security

## 🛠 Tech Stack

- **Frontend**: React 18, Tailwind CSS, Material-UI
- **Animations**: Framer Motion
- **Icons**: Lucide React, Material Icons
- **Routing**: React Router DOM
- **State Management**: React Context, useState, useEffect
- **PDF Export**: jsPDF, html2canvas
- **Notifications**: React Hot Toast

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medsage.git
   cd medsage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
medsage/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   └── Layout.js
│   │   └── TriageBot/
│   │       └── TriageBot.js
│   ├── context/
│   │   └── ThemeContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── AIDiagnosis.js
│   │   ├── MedicationScheduler.js
│   │   ├── EmergencyPage.js
│   │   ├── FamilyHealth.js
│   │   └── MedicalHistory.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Colors
The app uses a medical-themed color palette defined in `tailwind.config.js`:
- Primary: Blue shades (#0ea5e9)
- Success: Green shades (#22c55e)
- Warning: Yellow shades (#f59e0b)
- Error: Red shades (#ef4444)

### Themes
- Light mode: Clean, professional medical interface
- Dark mode: Reduced eye strain for night usage

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_endpoint
REACT_APP_EMERGENCY_NUMBER=108
```

### API Integration
The app includes placeholder API calls that can be easily replaced with real endpoints:
- AI Diagnosis API
- Emergency Services API
- Medication Management API
- Family Health API

## 📱 Mobile Features

- **Touch-friendly Interface** - Large buttons and intuitive gestures
- **Offline Capability** - Basic functionality without internet
- **Push Notifications** - Medication reminders and emergency alerts
- **Voice Input** - Multilingual speech recognition

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a React app
3. Deploy with one click

### Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure custom domain if needed

### Manual Deployment
```bash
npm run build
# Upload the build folder to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏥 About MyOnsite Medical Hospital

Medsage is proudly developed for MyOnsite Medical Hospital, a forward-thinking healthcare institution committed to leveraging technology for better patient care.

## 📞 Support

For technical support or questions:
- Email: support@medsage.com
- Documentation: [docs.medsage.com](https://docs.medsage.com)
- Issues: [GitHub Issues](https://github.com/yourusername/medsage/issues)

---

**Built with ❤️ for better healthcare** 