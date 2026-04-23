import { API_CONFIG } from './api-config';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Mock data for preview/fallback mode
const MOCK_DATA: Record<string, any[]> = {
  'NOC News': [
    { id: '1', title: 'افتتاح منشأة تخزين استراتيجية جديدة', date: '2026-03-10', image: 'https://picsum.photos/seed/oil1/800/600', category: 'مشاريع' },
    { id: '2', title: 'توقيع اتفاقية تعاون دولي في مجال الطاقة', date: '2026-03-08', image: 'https://picsum.photos/seed/oil2/800/600', category: 'أخبار' },
    { id: '3', title: 'تقرير الاستدامة السنوي لعام 2025', date: '2026-03-05', image: 'https://picsum.photos/seed/oil3/800/600', category: 'تقارير' },
  ],
  'NOC Projects': [
    { id: '1', title: 'توسعة محطة التوزيع المركزية', image: 'https://picsum.photos/seed/proj1/800/600', description: 'مشروع استراتيجي لزيادة القدرة الاستيعابية للتوزيع.' },
    { id: '2', title: 'تحديث أسطول النقل البري', image: 'https://picsum.photos/seed/proj2/800/600', description: 'إضافة 50 ناقلة حديثة بمعايير سلامة عالمية.' },
    { id: '3', title: 'نظام المراقبة الرقمي لخطوط الأنابيب', image: 'https://picsum.photos/seed/proj3/800/600', description: 'استخدام الذكاء الاصطناعي لمراقبة التسرب والأمان.' },
  ],
  'NOC Fuel Prices': [
    { id: 'diesel', label: 'diesel', price: 470, unit: 'YER/L' },
    { id: 'petrol', label: 'petrol/بترول', price: 470, unit: 'YER/L' },
    { id: 'gas', label: 'gas', price: 3500, unit: 'Cylinder' },
  ],
  'NOC Tenders': [
    { id: 'T-2026-001', title: 'توريد قطع غيار للمضخات الرئيسية', date: '2026-03-15', status: 'مفتوح' },
    { id: 'T-2026-002', title: 'صيانة خزانات الوقود في ميناء الحديدة', date: '2026-03-20', status: 'مفتوح' },
    { id: 'T-2026-003', title: 'تحديث أنظمة السلامة والإطفاء', date: '2026-03-25', status: 'مفتوح' },
  ]
};

class ApiService {
  private isPreview = false; // Set to true for AI Studio preview environment

  private getHeaders() {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (API_CONFIG.API_KEY && API_CONFIG.API_SECRET) {
      headers['Authorization'] = `token ${API_CONFIG.API_KEY}:${API_CONFIG.API_SECRET}`;
    }

    return headers;
  }

  /* async get<T>(docType: string, filters?: any, fields: string[] = ['*']): Promise<T[]> {
    if (this.isPreview || !API_CONFIG.IS_CONFIGURED) {
      return (MOCK_DATA[docType] || []) as T[];
    } */
  async get<T>(docType: string): Promise<T[]> {

    if (this.isPreview || !API_CONFIG.IS_CONFIGURED) {
      return (MOCK_DATA[docType] || []) as T[];
    }

    try {

      const fields = [
        "name",
        "title",
        "image",
        "date",
        "category",
        "description",
        "price",
        "unit",
        "status",
        "label"
      ];

      const params = new URLSearchParams();
      params.append("fields", JSON.stringify(fields));

      const url =
        `${API_CONFIG.BASE_URL}` +
        `${API_CONFIG.ENDPOINTS.RESOURCE}/${docType}` +
        `?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      return (result.data || []).map((item: any) => {

        // إصلاح مسار الصور
        if (item.image && item.image.startsWith("/files")) {
          item.image = `${API_CONFIG.BASE_URL}${item.image}`;
        }

        return item;
      });

    } catch (error) {

      console.warn(`Fetch failed for ${docType}`);

      return (MOCK_DATA[docType] || []) as T[];

    }
  }


  async post<T>(docType: string, data: any): Promise<T> {
    if (this.isPreview || !API_CONFIG.IS_CONFIGURED) {
      console.warn(`API not configured or in Preview. Simulating post to ${docType}`);
      return { name: 'mock-response-' + Date.now(), ...data } as T;
    }

    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RESOURCE}/${docType}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return (result.data || []).map((item: any) => {
        if (item.image && item.image.startsWith('/files')) {
          item.image = `${API_CONFIG.BASE_URL}${item.image}`;
        }
        return item;
      });
    } catch (error) {
      console.warn(`Post failed for ${docType}, simulating success in preview.`);
      return { name: 'fallback-response-' + Date.now(), ...data } as T;
    }
  }
}

export const apiService = new ApiService();
