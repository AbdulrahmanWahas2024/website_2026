export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.128',
  SITE_URL: 'http://192.168.1.128:3000', // رابط الموقع الثابت 
  API_KEY: process.env.ERP_API_KEY,
  API_SECRET: process.env.ERP_API_SECRET,
  IS_CONFIGURED: !!process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    RESOURCE: '/api/resource',
    METHOD: '/api/method',
  },
  DOC_TYPES: {
    NEWS: 'YPC News',
    PROJECTS: 'YPC Project',
    FUEL_PRICES: 'YPC Fuel Prices',
    TENDERS: 'YPC Tenders',
    COMPLAINTS: 'YPC Complaints',
  }
};
