import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, noindex = false }) => {
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://thinhphongdo-vn.web.app";
  const siteName = "Thịnh Phong Đỗ";
  const defaultTitle = `${siteName} | Dịch Vụ Suất Ăn Chuyên Nghiệp`;
  const defaultDescription = "Công ty TNHH Thịnh Phong Đỗ chuyên cung cấp suất ăn công nghiệp, suất ăn trường học, và dịch vụ canteen uy tín, chất lượng với quy trình đạt chuẩn ISO 22000:2018.";
  const defaultKeywords = "suất ăn công nghiệp, suất ăn trường học, dịch vụ canteen, thực phẩm sạch, Thịnh Phong Đỗ, cung cấp suất ăn, chứng nhận ISO 22000:2018";
  
  // Đảm bảo ảnh luôn có URL tuyệt đối để Facebook/Zalo đọc được (Lưu ý: Không dùng đuôi .svg)
  const defaultImage = `${baseUrl}/Logo.png`; 
  
  // Tự động lấy URL hiện tại của trang
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : baseUrl);

  return (
    <Helmet>
      {/* Cấu hình cơ bản */}
      <title>{title ? `${title} | ${siteName}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Chặn Index đối với các trang không cần thiết (Admin) */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Cấu hình Open Graph cho Facebook, Zalo */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? `${title} | ${siteName}` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | ${siteName}` : defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
