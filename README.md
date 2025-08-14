# Club Link Mobile

A React Native mobile application for the Club Link luxury gym network platform. This app provides members with gym discovery, booking, and access management capabilities.

## Features

- **API Testing Interface**: Complete CRUD operations for testing database connectivity
- **Health Monitoring**: Real-time API health status checking
- **User Management**: Create, read, update, and delete user records
- **Responsive Design**: Optimized for both iOS and Android platforms
- **Modern UI**: Built with React Native Paper for consistent Material Design

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio & Emulator (for Android development)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hannahborel/club-link-mobile.git
   cd club-link-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## Development

### Running the App

- **iOS Simulator**: `npm run ios`
- **Android Emulator**: `npm run android`
- **Web Browser**: `npm run web`
- **Expo Go App**: Scan QR code from `npm start`

### Project Structure

```
src/
├── App.tsx                 # Main application component
├── components/             # Reusable UI components
├── screens/                # Screen components
├── navigation/             # Navigation configuration
├── services/               # API services
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
└── types/                  # TypeScript type definitions
```

### Key Dependencies

- **React Native**: Core mobile framework
- **Expo**: Development platform and tools
- **React Native Paper**: Material Design components
- **React Navigation**: Navigation between screens

## API Integration

The mobile app connects to the Club Link API for all data operations. The current implementation includes:

- **Health Check**: `/api/test-db` GET endpoint
- **User CRUD**: Full Create, Read, Update, Delete operations
- **Error Handling**: Comprehensive error management and user feedback

### API Configuration

The app automatically detects the platform and uses the appropriate API endpoint:
- **iOS Simulator**: `http://localhost:3000`
- **Android Emulator**: `http://10.0.2.2:3000`

## Testing

### Manual Testing

1. **Start the API server** (club-link-api repository)
2. **Launch the mobile app** using `npm start`
3. **Test API connectivity** using the health check feature
4. **Verify CRUD operations** by creating, editing, and deleting users

### Test Scenarios

- ✅ API health check functionality
- ✅ User creation with validation
- ✅ User editing and updates
- ✅ User deletion with confirmation
- ✅ Error handling and display
- ✅ Loading states and feedback
- ✅ Pull-to-refresh functionality

## Building and Deployment

### Development Build

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

### Production Build

```bash
# Build for app stores
eas build --platform all
```

## Troubleshooting

### Common Issues

1. **Metro bundler errors**: Clear cache with `npx expo start --clear`
2. **API connection issues**: Verify API server is running on correct port
3. **Platform-specific bugs**: Test on both iOS and Android simulators

### Debug Mode

Enable debug mode by shaking the device or pressing `Cmd+D` (iOS) / `Cmd+M` (Android) in the simulator.

## Contributing

1. Follow the established code style and patterns
2. Test on both iOS and Android platforms
3. Ensure all API integrations are working
4. Update documentation for any new features

## License

This project is part of the Club Link platform and follows the same licensing terms.

## Support

For development support, refer to the main Club Link documentation repository.
