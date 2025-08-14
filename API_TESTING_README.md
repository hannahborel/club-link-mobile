# Mobile App API Testing Guide

## Overview

This guide explains how to test the mobile app's connection to the Club Link API and verify the data flow between the mobile app and the backend.

## Prerequisites

1. **API Server Running**: Ensure the Club Link API is running on `http://localhost:3000`
2. **Mobile App Running**: Start the Expo development server with `npm start`
3. **Database Access**: PostgreSQL database should be accessible and seeded with test data

## Quick Start

### 1. Start the API Server

```bash
cd club-link-api
npm run dev
```

The API will be available at `http://localhost:3000/api/test-db`

### 2. Start the Mobile App

```bash
cd club-link-mobile
npm start
```

This will start the Expo development server and show a QR code for testing.

### 3. Run Automated Tests

```bash
cd club-link-mobile
node test-api-connection.js
```

This script will test all CRUD operations and verify the data flow.

## Testing the Mobile App

### Manual Testing

1. **Open the Mobile App**: Use Expo Go app on your device or simulator
2. **Check API Health**: The app will automatically check API connectivity
3. **View Users**: Browse the list of existing users from the database
4. **Create User**: Tap "Add User" to create a new test user
5. **Edit User**: Tap "Edit" on any user to modify their details
6. **Delete User**: Tap "Delete" to remove a user (with confirmation)

### Automated Testing

The `test-api-connection.js` script performs comprehensive testing:

- ✅ **Health Check**: Verifies API connectivity
- ✅ **Create User**: Tests POST endpoint
- ✅ **Update User**: Tests PUT endpoint  
- ✅ **Verify Update**: Confirms data persistence
- ✅ **Delete User**: Tests DELETE endpoint
- ✅ **Verify Deletion**: Confirms data removal

## API Endpoints Tested

### GET `/api/test-db`
- **Purpose**: Fetch all users
- **Response**: List of users with success status
- **Mobile App Usage**: Displays user list and checks API health

### POST `/api/test-db`
- **Purpose**: Create new user
- **Body**: `{ email, role, clerkId }`
- **Response**: Created user data
- **Mobile App Usage**: Add new user form

### PUT `/api/test-db?id={userId}`
- **Purpose**: Update existing user
- **Body**: `{ email?, role? }`
- **Response**: Updated user data
- **Mobile App Usage**: Edit user form

### DELETE `/api/test-db?id={userId}`
- **Purpose**: Delete user
- **Response**: Deleted user data
- **Mobile App Usage**: Delete user with confirmation

## Data Flow Verification

### 1. **Create → Read Flow**
1. Create user via POST request
2. Verify user appears in GET response
3. Confirm all fields are correctly stored

### 2. **Update → Read Flow**
1. Update user via PUT request
2. Verify changes appear in GET response
3. Confirm `updatedAt` timestamp is updated

### 3. **Delete → Read Flow**
1. Delete user via DELETE request
2. Verify user no longer appears in GET response
3. Confirm count decreases by 1

## Platform-Specific Testing

### iOS Simulator
- API URL: `http://localhost:3000`
- Use iOS Simulator or Expo Go app

### Android Emulator
- API URL: `http://10.0.2.2:3000`
- Use Android Emulator or Expo Go app

### Physical Device
- API URL: Your computer's local IP address
- Ensure device and computer are on same network

## Error Handling

The mobile app handles various error scenarios:

- **Network Errors**: Shows user-friendly error messages
- **API Errors**: Displays server error details
- **Validation Errors**: Shows field-specific validation messages
- **Loading States**: Indicates when operations are in progress

## Troubleshooting

### Common Issues

1. **API Not Reachable**
   - Check if API server is running
   - Verify port 3000 is not blocked
   - Check firewall settings

2. **CORS Errors**
   - API CORS is configured to allow all origins for testing
   - Ensure API headers include proper CORS configuration

3. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check database credentials in API environment
   - Ensure database schema is migrated

4. **Mobile App Won't Start**
   - Check Node.js version compatibility
   - Clear Expo cache: `expo start -c`
   - Verify all dependencies are installed

### Debug Commands

```bash
# Check API health
curl http://localhost:3000/api/test-db

# Test specific endpoint
curl -X POST http://localhost:3000/api/test-db \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","role":"member","clerkId":"test_001"}'

# Check mobile app logs
expo logs
```

## Success Criteria

The mobile app API connection is considered successful when:

1. ✅ **Health Check Passes**: API responds with 200 status
2. ✅ **All CRUD Operations Work**: Create, Read, Update, Delete users
3. ✅ **Data Persistence**: Changes are saved to database
4. ✅ **Error Handling**: Graceful handling of network/API errors
5. ✅ **User Experience**: Smooth loading states and feedback

## Next Steps

After successful API testing:

1. **Implement Real Authentication**: Replace test endpoints with Clerk integration
2. **Add Real Data Models**: Implement gym, visit, and payment entities
3. **Enhance UI**: Add proper navigation and role-based interfaces
4. **Performance Testing**: Test with larger datasets and network conditions
5. **Security Testing**: Implement proper authentication and authorization

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review API server logs for errors
3. Verify database connectivity
4. Test API endpoints independently with curl/Postman
5. Check Expo development server logs

---

**Last Updated**: August 14, 2025  
**Status**: ✅ API Connection Verified  
**Test Results**: All CRUD operations working correctly
