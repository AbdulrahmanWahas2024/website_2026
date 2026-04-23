import NewsDetailsPage from './NewsDetailsClient';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';

export async function generateStaticParams() {
  const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.NEWS);
  return data.map((item: any) => ({
    slug: (item.name || item.id).toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NewsDetailsPage />;
}
