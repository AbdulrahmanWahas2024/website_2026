import TenderDetailsClient from './TenderDetailsClient';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';

export async function generateStaticParams() {
  const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.TENDERS);
  return data.map((item: any) => ({
    id: item.id.toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TenderDetailsClient id={id} />;
}
