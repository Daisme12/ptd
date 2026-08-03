import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(keyPath)) {
  console.error('Service account key not found at:', keyPath);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function prerender() {
  const distPath = path.join(__dirname, '../frontend/dist');
  const indexHtmlPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Frontend build index.html not found at:', indexHtmlPath);
    process.exit(1);
  }
  
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  
  console.log('Fetching active products from Firestore...');
  const snapshot = await db.collection('products').where('status', '==', true).get();
  console.log(`Found ${snapshot.size} products.`);
  
  for (const doc of snapshot.docs) {
    const product = doc.data();
    const slug = product.slug;
    if (!slug) continue;
    
    const title = `${product.name} | Thịnh Phong Đỗ`;
    const desc = product.description || "Công ty TNHH Thịnh Phong Đỗ chuyên cung cấp suất ăn công nghiệp, suất ăn trường học với quy trình đạt chuẩn ISO 22000:2018.";
    const image = product.imageUrl || "https://thinhphongdo-vn.web.app/Logo.png";
    const url = `https://thinhphongdo-vn.web.app/products/${slug}`;
    
    // Replace meta tags
    let html = baseHtml
      .replace(/<title>.*?<\/title>/g, `<title>${title}</title>`)
      .replace(/<meta property="og:title" content=".*?"\s*\/?>/g, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta property="og:description" content=".*?"\s*\/?>/g, `<meta property="og:description" content="${desc}" />`)
      .replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="${image}" />`)
      .replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${url}" />`)
      .replace(/<meta name="twitter:title" content=".*?"\s*\/?>/g, `<meta name="twitter:title" content="${title}" />`)
      .replace(/<meta name="twitter:description" content=".*?"\s*\/?>/g, `<meta name="twitter:description" content="${desc}" />`)
      .replace(/<meta name="twitter:image" content=".*?"\s*\/?>/g, `<meta name="twitter:image" content="${image}" />`);
      
    const productDir = path.join(distPath, 'products', slug);
    fs.mkdirSync(productDir, { recursive: true });
    fs.writeFileSync(path.join(productDir, 'index.html'), html);
    console.log(`Prerendered: /products/${slug}`);
  }
  
  console.log('Prerendering completed successfully!');
  process.exit(0);
}

prerender().catch(e => {
  console.error('Prerendering failed:', e);
  process.exit(1);
});
