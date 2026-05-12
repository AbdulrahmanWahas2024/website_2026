import { API_CONFIG } from '@/lib/api-config';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("is_private", "0");

  const res = await fetch(
    `${API_CONFIG.BASE_URL}/api/upload_file`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
      
    }
    
  );

  const result = await res.json();

  return result.message.file_url;
};