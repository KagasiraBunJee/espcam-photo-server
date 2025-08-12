# ESP32 Camera Server - Home Assistant Add-on

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.3+-green.svg)](https://www.mongodb.com/)

A robust Node.js server for receiving, processing, and managing images from ESP32 cameras, specifically designed as a Home Assistant add-on for water meter screening and monitoring.

## 🏠 Overview

This server application provides a comprehensive solution for ESP32 camera integration with Home Assistant, offering:

- **Image Reception**: Accepts and stores images from ESP32 camera modules
- **Dashboard Interface**: Web-based dashboard for viewing and managing captured images
- **MongoDB Storage**: Persistent data storage using Mongoose ODM
- **Device Management**: Track and manage multiple ESP32 camera devices
- **File Management**: Organized file storage and retrieval system
- **CORS Security**: Configured for Home Assistant integration (ports 8123, 7123)

## 🚀 Features

- ✅ Real-time image capture from ESP32 cameras
- ✅ MongoDB database integration with Mongoose
- ✅ RESTful API endpoints for device and file management
- ✅ Web dashboard for image viewing and management
- ✅ TypeScript support for enhanced development
- ✅ Secure CORS configuration for Home Assistant
- ✅ Automatic upload directory creation
- ✅ Environment-based configuration
- ✅ Support for large image uploads (100MB limit)

## 📋 Prerequisites

Before installing this add-on, ensure you have:

- Home Assistant OS or Supervised installation
- MongoDB instance (local or remote)
- ESP32 camera module configured to send images
- Node.js 18+ (handled by the add-on)

## 🛠️ Installation

### As a Home Assistant Add-on

1. Add this repository to your Home Assistant add-on store
2. Install the "ESP32 Camera Server" add-on
3. Configure the add-on with your MongoDB credentials
4. Start the add-on

### Manual Installation

```bash
# Clone the repository
git clone <repository-url>
cd esp-cam-server

# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Start the server
npm start
```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
DBLOGIN=your_mongodb_username
DBPASS=your_mongodb_password
DBNAME=esp_cam_db
DBDOMAIN=localhost
DBPORT=27017

# Server Configuration
PORT=8000
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DBLOGIN` | MongoDB username | Required |
| `DBPASS` | MongoDB password | Required |
| `DBNAME` | MongoDB database name | Required |
| `DBDOMAIN` | MongoDB host/domain | localhost |
| `DBPORT` | MongoDB port | 27017 |
| `PORT` | Server port | 8000 |

## 🔧 API Endpoints

### Dashboard
- `GET /` - Main dashboard interface
- `GET /api/dashboard/*` - Dashboard API endpoints

### Devices
- `GET /api/devices` - List all registered devices
- `POST /api/devices` - Register a new device
- `PUT /api/devices/:id` - Update device information
- `DELETE /api/devices/:id` - Remove a device

### Files
- `POST /api/files/upload` - Upload image from ESP32
- `GET /api/files` - List stored files
- `GET /api/files/:id` - Download specific file
- `DELETE /api/files/:id` - Delete a file

## 📱 Usage

### ESP32 Configuration

Configure your ESP32 camera to send POST requests to:
```
http://your-home-assistant-ip:8000/api/files/upload
```

### Dashboard Access

Access the web dashboard at:
```
http://your-home-assistant-ip:8000
```

### Home Assistant Integration

The server is configured to accept requests from Home Assistant on ports 8123 and 7123. Add camera entities or automations that utilize the stored images.

## 🏗️ Development

### Available Scripts

```bash
# Development with auto-reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start
```

### Project Structure

```
esp-cam-server/
├── api/                 # API route handlers
│   ├── dashboard/       # Dashboard endpoints
│   ├── devices/         # Device management
│   ├── files/           # File operations
│   └── index.ts         # API router
├── db/                  # Database schemas
├── helper/              # Utility functions
├── public/              # Static web assets
├── uploads/             # Image storage directory
├── dist/                # Compiled JavaScript
├── index.ts             # Main server file
└── package.json
```

### Database Schema

The application uses MongoDB with Mongoose for data persistence. Schemas are defined in the `db/schemes.ts` file.

## 🔒 Security

- CORS is configured to only allow requests from Home Assistant ports (8123, 7123)
- File uploads are limited to 100MB
- Environment variables are used for sensitive configuration
- Input validation on all API endpoints

## 🐛 Troubleshooting

### Common Issues

1. **Connection refused to MongoDB**
   - Verify MongoDB is running
   - Check database credentials in `.env`
   - Ensure network connectivity

2. **Images not uploading**
   - Verify ESP32 is sending to correct endpoint
   - Check server logs for errors
   - Ensure upload directory has write permissions

3. **CORS errors**
   - Confirm Home Assistant is running on ports 8123 or 7123
   - Check browser console for specific CORS messages

### Logs

Server logs are available in the Home Assistant add-on logs or via console when running manually.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Home Assistant community for integration patterns
- ESP32 camera module developers
- MongoDB team for excellent documentation
- TypeScript community for type definitions

## 📞 Support

- Create an issue for bug reports
- Check existing issues for solutions
- Contribute to documentation improvements

---

**Note**: This add-on is specifically designed for water meter screening but can be adapted for other ESP32 camera monitoring applications.