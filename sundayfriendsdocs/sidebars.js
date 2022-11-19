/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  adminSidebar: [
    {
      type: "category",
      label: "Admin Portal (Web)",
      items: [
        {
          type: "doc",
          id: "AdminPortal/introWeb",
          label: "Introduction",
        },
        {
          type: "doc",
          id: "AdminPortal/getStartedWeb",
          label: "Get Started",
        },
        {
          type: "doc",
          id: "AdminPortal/authWeb",
          label: "Authentication",
        },
        {
          type: "doc",
          id: "AdminPortal/profileWeb",
          label: "Profile",
        },
        {
          type: "doc",
          id: "AdminPortal/adminAccWeb",
          label: "Admin Accounts",
        },
        {
          type: "doc",
          id: "AdminPortal/familyAccWeb",
          label: "Family & User Accounts",
        },
        {
          type: "doc",
          id: "AdminPortal/transactionsWeb",
          label: "Managing Transactions",
        },
        {
          type: "doc",
          id: "AdminPortal/settingsWeb",
          label: "Program Settings",
        },
        {
          type: "doc",
          id: "AdminPortal/troubleshootingWeb",
          label: "Troubleshooting",
        },
      ],
    },
    {
      type: "category",
      label: "Family Application (Mobile)",
      items: [
        {
          type: "doc",
          id: "FamilyApp/introMobile",
          label: "Introduction",
        },
        {
          type: "doc",
          id: "FamilyApp/getStartedMobile",
          label: "Get Started",
        },
        {
          type: "doc",
          id: "FamilyApp/authMobile",
          label: "Authentication",
        },
        {
          type: "doc",
          id: "FamilyApp/tierProgressMobile",
          label: "Tier Progress",
        },
        {
          type: "doc",
          id: "FamilyApp/transactionsMobile",
          label: "Transactions",
        },
        {
          type: "doc",
          id: "FamilyApp/familyMembers",
          label: "Family Members",
        },
        {
          type: "doc",
          id: "FamilyApp/profileMobile",
          label: "Profile",
        },
        {
          type: "doc",
          id: "FamilyApp/troubleshootingMobile",
          label: "Troubleshooting",
        },
      ],
    },
  ],
  devSidebar: [
    {
      type: "category",
      label: "Admin Portal (Web)",
      items: [
        {
          type: "doc",
          id: "AdminPortalDev/introWebDev",
          label: "Introduction",
        },
        {
          type: "doc",
          id: "AdminPortalDev/getStartedWebDev",
          label: "Getting Started",
        },
        {
          type: "doc",
          id: "AdminPortalDev/authWebDev",
          label: "Authentication",
        },
        {
          type: "doc",
          id: "AdminPortalDev/navWebDev",
          label: "Navigation",
        },
        {
          type: "doc",
          id: "AdminPortalDev/usersWebDev",
          label: "Users",
        },
        {
          type: "doc",
          id: "AdminPortalDev/adminsWebDev",
          label: "Admins",
        },
        {
          type: "doc",
          id: "AdminPortalDev/transactionsWebDev",
          label: "Transactions",
        },
        {
          type: "doc",
          id: "AdminPortalDev/profileWebDev",
          label: "Profile",
        },
        {
          type: "doc",
          id: "AdminPortalDev/settingsWebDev",
          label: "Settings",
        },
        {
          type: "doc",
          id: "AdminPortalDev/stylingWebDev",
          label: "Styling",
        },
        {
          type: "doc",
          id: "AdminPortalDev/iconsWebDev",
          label: "Icons",
        },
      ],
    },
    {
      type: "category",
      label: "Family Application (Mobile)",
      items: [
        {
          type: "doc",
          id: "FamilyAppDev/introMobileDev",
          label: "Introduction",
        },
        {
          type: "doc",
          id: "FamilyAppDev/getStartedMobileDev",
          label: "Getting Started",
        },
        {
          type: "doc",
          id: "FamilyAppDev/navMobileDev",
          label: "Navigation",
        },
        {
          type: "doc",
          id: "FamilyAppDev/authMobileDev",
          label: "Authentication",
        },
        {
          type: "doc",
          id: "FamilyAppDev/registrationMobileDev",
          label: "Registration",
        },
        {
          type: "doc",
          id: "FamilyAppDev/familyMobileDev",
          label: "Family Screen",
        },
        {
          type: "doc",
          id: "FamilyAppDev/personalMobileDev",
          label: "Personal Screen",
        },
        {
          type: "doc",
          id: "FamilyAppDev/transactionsMobileDev",
          label: "Transactions List",
        },
        {
          type: "doc",
          id: "FamilyAppDev/profileMobileDev",
          label: "Profile",
        },
        {
          type: "doc",
          id: "FamilyAppDev/stylingMobileDev",
          label: "Styling",
        },
        {
          type: "doc",
          id: "FamilyAppDev/iconsMobileDev",
          label: "Icons",
        },
      ],
    },
    {
      type: "category",
      label: "Backend Server",
      items: [
        {
          type: "doc",
          id: "BackendServer/introBackend",
          label: "Introduction",
        },
        {
          type: "doc",
          id: "BackendServer/getStartedBackend",
          label: "Getting Started",
        },
        {
          type: "doc",
          id: "BackendServer/usersBackend",
          label: "User",
        },
        {
          type: "doc",
          id: "BackendServer/adminsBackend",
          label: "Admin",
        },
        {
          type: "doc",
          id: "BackendServer/familyBackend",
          label: "Family",
        },
        {
          type: "doc",
          id: "BackendServer/transactionsBackend",
          label: "Transaction",
        },
        {
          type: "doc",
          id: "BackendServer/tiersBackend",
          label: "Tiers",
        },
        {
          type: "doc",
          id: "BackendServer/invitesBackend",
          label: "Invites",
        },
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
