# TestFlight Deployment Checklist

This checklist is tailored for React Native/Expo apps.

## 1. Update App Metadata

- [ ] Verify app name, icon, and version in `app.json`.
- [ ] Confirm bundle identifier is correct for iOS.

## 2. Production-Ready Code

- [ ] Remove debug logs and test data.
- [ ] Delete unused files and assets.

## 3. Validate Dependencies

- [ ] Run `npm install` or `yarn install` to update dependencies.
- [ ] Check for outdated or insecure packages.

## 4. Run Production Build

- [ ] Build the app locally using Expo or React Native CLI.
- [ ] Test the app thoroughly for crashes and bugs.

## 5. Platform-Specific Configs (iOS)

- [ ] Ensure Apple Developer account access.
- [ ] Confirm provisioning profile and certificates are valid.
- [ ] Check bundle identifier in `app.json` matches Apple Developer portal.

## 6. App Store Requirements

- [ ] Review Apple’s guidelines for privacy, permissions, and content.
- [ ] Add required privacy descriptions to `Info.plist` if using native modules.

## 7. Release Notes

- [ ] Prepare clear release notes for testers.

## 8. Final Checks

- [ ] Remove this checklist from production builds.
- [ ] Add this file to `.gitignore`.

---

**File:** `TESTFLIGHT_DEPLOYMENT_CHECKLIST.md`
