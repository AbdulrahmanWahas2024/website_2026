import { API_CONFIG } from "@/lib/api-config";

/**
 * Tender Type موحد
 */
export interface Tender {
    id: string;
    title: string;
    status?: string;
    start_date?: string;
    closing_date?: string;
    location?: string;
    description?: string;
    requirements?: string;
    file?: string;
    terms_file?: string;
    technical_file?: string;
    financial_file?: string;
    published?: number;
    
}

/**
 *  Normalize ERPNext Response (الأهم في المشروع)
 */ // لأن API ERPNext ممكن ترجع object لو عنصر واحد، أو array لو أكتر من عنصر  
function normalizeTenders(result: any): Tender[] {
    const data = result?.data;

    if (!data) return [];

    // لو object واحد
    if (!Array.isArray(data)) {
        return [{
            id: data.name,
            title: data.title || "",
            status: data.status,
            start_date: data.start_date,
            closing_date: data.closing_date,
            location: data.location,
            description: data.description,
            requirements: data.requirements,
            file: data.file
                ? `${API_CONFIG.BASE_URL}${data.file}`
                : undefined,
            terms_file: data.terms_file
                ? `${API_CONFIG.BASE_URL}${data.terms_file}`
                : undefined,

            technical_file: data.technical_file
                ? `${API_CONFIG.BASE_URL}${data.technical_file}`
                : undefined,

            financial_file: data.financial_file
                ? `${API_CONFIG.BASE_URL}${data.financial_file}`
                : undefined,
            published: data.published
            
        }];
    }

    // لو array
    return data.map((item: any) => ({ // تأكد من وجود الحقول الأساسية 
        id: item.name,
        title: item.title || "",
        status: item.status,
        start_date: item.start_date,
        closing_date: item.closing_date,
        location: item.location,
        description: item.description,
        requirements: item.requirements,
        file: item.file
            ? `${API_CONFIG.BASE_URL}${item.file}`
            : undefined,
        terms_file: item.terms_file
            ? `${API_CONFIG.BASE_URL}${item.terms_file}`
            : undefined,

        technical_file: item.technical_file
            ? `${API_CONFIG.BASE_URL}${item.technical_file}`
            : undefined,

        financial_file: item.financial_file
            ? `${API_CONFIG.BASE_URL}${item.financial_file}`
            : undefined,
        published: item.published
    }));
}

/**
 *  Fetch Tenders (List) في صفحة المناقصات  
 */
export async function fetchTenders(limit = 3): Promise<Tender[]> {
    try {
        const fields = encodeURIComponent(JSON.stringify([
            "name",
            "title",
            "status",
            "start_date",
            "closing_date",
            "location",
            "description",
            "requirements",
            "file",
            "published",
            "creation",
            "terms_file",
            "technical_file",
            "financial_file"
        ]));

        const filters = encodeURIComponent(JSON.stringify([
            ["published", "=", 1]
        ]));

        const url =
            `${API_CONFIG.BASE_URL}/api/resource/YPC Tenders` +
            `?fields=${fields}` +
            `&filters=${filters}` +
            `&order_by=creation desc` +
            `&limit_page_length=${limit}`;

        console.log("TENDERS URL:", url);

        const res = await fetch(url);
        const result = await res.json();

        console.log("RAW TENDERS RESULT:", result);

        return normalizeTenders(result);

    } catch (error) {
        console.error("TENDERS ERROR:", error);
        return [];
    }
} // يمكنك تعديل limit في fetchTenders لتحديد عدد المناقصات التي تريد جلبها، أو تركه بدون قيمة لافتراضي 3 مناقصات.

/**
 *  Fetch Tender By ID في صفحة تفاصيل المناقصة  
 */

export async function fetchTenderById(id: string): Promise<Tender | null> {

    try {

        const fields = encodeURIComponent(JSON.stringify([
            "name",
            "title",
            "status",
            "start_date",
            "closing_date",
            "location",
            "description",
            "requirements",
            "terms_file",
            "technical_file",
            "financial_file",
            "published"
        ]));

        const url =
            `${API_CONFIG.BASE_URL}/api/resource/YPC Tenders/${id}` +
            `?fields=${fields}`;

        console.log("TENDER DETAILS URL:", url);

        const res = await fetch(url);

        const result = await res.json();

        console.log("TENDER DETAILS RESPONSE:", result);

        const normalized = normalizeTenders(result);

        return normalized[0] || null;

    } catch (error) {

        console.error("FETCH TENDER BY ID ERROR:", error);

        return null;

    }

}