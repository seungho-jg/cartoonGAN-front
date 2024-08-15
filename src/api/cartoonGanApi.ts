import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const convertImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', image);

  try {
    const response = await axios.post(`${API_BASE_URL}/convert`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',  // 이미지 데이터를 Blob으로 받음
    });
    // Blob 데이터를 URL로 변환
    const url = URL.createObjectURL(new Blob([response.data]));
    return url;
} catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error converting image:', error.response?.data || error.message);
    } else {
      console.error('Error converting image:', error);
    }
    throw error;
  }
};