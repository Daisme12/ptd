import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  exactTitle = false,
  description, 
  keywords, 
  image, 
  url, 
  noindex = false, 
  schema 
}) => {
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://thinhphongdo-vn.web.app";
  const siteName = "Thịnh Phong Đỗ";
  const defaultTitle = `${siteName} - Dịch Vụ Suất Ăn Công Nghiệp & Canteen Chuẩn ISO`;
  const defaultDescription = "Thịnh Phong Đỗ chuyên cung cấp suất ăn công nghiệp, suất ăn trường học và dịch vụ canteen uy tín hàng đầu, quy trình khép kín đạt tiêu chuẩn vệ sinh ATTP ISO 22000:2018.";
  const defaultKeywords = "suất ăn công nghiệp, suất ăn trường học, dịch vụ canteen, thực phẩm sạch, Thịnh Phong Đỗ, cung cấp suất ăn, chứng nhận ISO 22000:2018";
  
  // Đảm bảo ảnh luôn có URL tuyệt đối
  const defaultImage = `${baseUrl}/Logo.png`; 
  
  // URL hiện tại của trang
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : baseUrl);

  // Tính toán title hiển thị
  let pageTitle = defaultTitle;
  if (title) {
    if (exactTitle || title.includes(siteName)) {
      pageTitle = title;
    } else {
      pageTitle = `${title} | ${siteName}`;
    }
  }

  return (
    <Helmet>
      {/* Cấu hình tiêu đề & Meta cơ bản */}
      <title>{pageTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Thẻ quản lý Robot Index */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />

      {/* Favicon & Logo cho Search Engine */}
      <link rel="icon" type="image/png" sizes="192x192" href={`${baseUrl}/Logo.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${baseUrl}/Logo.png`} />
      <link rel="apple-touch-icon" href={`${baseUrl}/Logo.png`} />

      {/* Cấu hình Open Graph (Facebook, Zalo) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
