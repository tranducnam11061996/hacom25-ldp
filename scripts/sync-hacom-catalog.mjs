import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'assets', 'media', 'products');
const optimizedWidths = Object.freeze([320, 640]);

export const sourceProducts = Object.freeze([
  { sku: 'MELO0130', sourceUrl: 'https://hacom.vn/mouse-logitech-g502-hero-gaming-usb-black' },
  { sku: 'KBHP0023', sourceUrl: 'https://hacom.vn/ban-phim-co-kingston-hyperx-alloy-origins-core-tkl-rgb-aqua-switch/' },
  { sku: 'TNHP0034', sourceUrl: 'https://hacom.vn/tai-nghe-gaming-hp-hyperx-cloud-iii-wireless-blk-gam-hs-77z45aa' },
  { sku: 'GHEG0949', sourceUrl: 'https://hacom.vn/ghe-game-centaur-gundam-black' },
  { sku: 'MICR0249', sourceUrl: 'https://hacom.vn/micro-thu-am-fifine-am8-micr0249' },
  { sku: 'LAHP0257', sourceUrl: 'https://hacom.vn/laptop-hp-15-255-g10-bk2d8pt' },
  { sku: 'LTLV0317', sourceUrl: 'https://hacom.vn/laptop-lenovo-ideapad-slim-3-15arp10-83k700evvn-ltlv0317' },
  { sku: 'LTAC1001', sourceUrl: 'https://hacom.vn/laptop-acer-aspire-go-ag15-72p-54gy-ltac1001' },
  { sku: 'LTMS0640', sourceUrl: 'https://hacom.vn/laptop-msi-cyborg-15-a13uc-2082vn-ltms0640' },
  { sku: 'LTAU1091', sourceUrl: 'https://hacom.vn/laptop-asus-gaming-tuf-fa506ncg-hn329w-ltau1091' },
  { sku: 'LTAC1029', sourceUrl: 'https://hacom.vn/laptop-acer-predator-helios-phn16-i31-72xe-ltac1029' },
  { sku: 'PCGM00007', sourceUrl: 'https://hacom.vn/pc-hacom-gaming-alpha-002-i7-10700f-b460-16gb-ram-500gb-ssd-rtx-3060ti' },
  { sku: 'PCGM1174', sourceUrl: 'https://hacom.vn/pc-hacom-platinum-pro-035-pcgm1174' },
  { sku: 'PCGM1171', sourceUrl: 'https://hacom.vn/pc-hacom-silver-pro-036-pcgm1171' },
  { sku: 'PCGM1143', sourceUrl: 'https://hacom.vn/pc-hacom-gold-pro-076-pcgm1143' },
  { sku: 'PCGM1178', sourceUrl: 'https://hacom.vn/pc-hacom-gold-pro-037-pcgm1178' },
  { sku: 'VGAS0733', sourceUrl: 'https://hacom.vn/card-man-hinh-asus-rog-strix-rtx-4060-o8g-gaming' },
  { sku: 'MOVI0237', sourceUrl: 'https://hacom.vn/man-hinh-viewsonic-vx2779a-hd-pro' },
  { sku: 'MOGI0059', sourceUrl: 'https://hacom.vn/man-hinh-gigabyte-mo27q2' },
  { sku: 'MOAS0338', sourceUrl: 'https://hacom.vn/man-hinh-asus-tuf-vg279qe5a' },
  { sku: 'MODE0306', sourceUrl: 'https://hacom.vn/man-hinh-dell-pro-plus-p2725d' },
  { sku: 'MOAS0339', sourceUrl: 'https://hacom.vn/man-hinh-asus-va279hg' },
  { sku: 'MOSA0326', sourceUrl: 'https://hacom.vn/man-hinh-samsung-s3-s32gf-ls27f320gaexxv' },
  { sku: 'MELO0173', sourceUrl: 'https://hacom.vn/chuot-khong-day-logitech-m171-xam-usb' },
  { sku: 'PADM0937', sourceUrl: 'https://hacom.vn/ban-di-chuot-gaming-redragon-p047-l-padm0937' },
  { sku: 'MERZ0119', sourceUrl: 'https://hacom.vn/chuot-razer-deathadder-essential-ergonomic-den-usb-led-green-rz01-03850100-r3m1' },
  { sku: 'HDSA0250', sourceUrl: 'https://hacom.vn/o-cung-ssd-samsung-990-evo-plus-1tb-m.2-2280-pcie-gen4-x4' },
  { sku: 'PWMI0005', sourceUrl: 'https://hacom.vn/nguon-may-tinh-msi-mag-a650bn-650w-80-plus-bronze-mau-den' },
  { sku: 'RAKT0413', sourceUrl: 'https://hacom.vn/ram-ecc-rdimm-kingston-32gb-ksm32rd4-32hdr' },
  { sku: 'VGGI0734', sourceUrl: 'https://hacom.vn/card-man-hinh-gigabyte-rtx-5060-windforce-max-oc-8gb-vggi0734' },
  { sku: 'VGGI0692', sourceUrl: 'https://hacom.vn/card-man-hinh-gigabyte-rtx-5070-windforce-oc-sff-12g-gddr7-gv-n5070wf3oc-12gd' },
  { sku: 'VGAS0844', sourceUrl: 'https://hacom.vn/card-man-hinh-asus-dual-rtx-5060-8g-oc-gddr7-dual-rtx5060-o8g' },
  { sku: 'RTRU0047', sourceUrl: 'https://hacom.vn/router-wifi-6-ruijie-reyee-rg-ew3000gx-rtru0047' }
]);

const absoluteUrl = (value) => new URL(value, 'https://hacom.vn').toString();
const readMeta = (html, property) => html.match(new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'))?.[1] || null;

const fetchText = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'HACOM-static-catalog-sync/1.0' } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
};

const fetchBinary = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'HACOM-static-catalog-sync/1.0' } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
};

export async function syncImages() {
  await mkdir(outputDir, { recursive: true });
  const manifest = [];
  for (const item of sourceProducts) {
    const html = await fetchText(item.sourceUrl);
    const imageUrl = absoluteUrl(readMeta(html, 'og:image'));
    if (!imageUrl) throw new Error(`Missing og:image for ${item.sku}`);
    const image = await fetchBinary(imageUrl);
    const filename = `${item.sku}.jpg`;
    await writeFile(path.join(outputDir, filename), image);
    const variants = [];
    for (const width of optimizedWidths) {
      const optimized = await sharp(image)
        .resize({ width, height: width, fit: 'contain', background: '#ffffff' })
        .webp({ quality: 82, effort: 6 })
        .toBuffer();
      const optimizedFilename = `${item.sku}-${width}.webp`;
      await writeFile(path.join(outputDir, optimizedFilename), optimized);
      variants.push({
        path: `assets/media/products/${optimizedFilename}`,
        width,
        height: width,
        format: 'webp',
        bytes: optimized.byteLength
      });
    }
    manifest.push({
      ...item,
      imageUrl,
      imagePath: `assets/media/products/${filename}`,
      bytes: image.byteLength,
      variants
    });
    console.log(`${item.sku}: ${filename} (${image.byteLength} bytes), ${variants.map(({ width, bytes }) => `${width}px WebP ${bytes} bytes`).join(', ')}`);
  }
  await writeFile(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  syncImages().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
