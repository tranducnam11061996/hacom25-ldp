(function exposeHacomCatalog(global) {
  const product = (data) => Object.freeze({
    ...data,
    image: Object.freeze({
      src: `assets/media/products/${data.sku}-640.webp`,
      srcSet: `assets/media/products/${data.sku}-320.webp 320w, assets/media/products/${data.sku}-640.webp 640w`,
      sizes: '(max-width: 767px) 44vw, (max-width: 1180px) 22vw, 300px',
      alt: data.imageAlt || data.title,
      width: 640,
      height: 640,
      presentation: Object.freeze({
        scale: 1.12,
        xPercent: 0,
        yPercent: 0,
        ...data.imagePresentation
      })
    }),
    specs: Object.freeze(data.specs.map((spec) => Object.freeze({ ...spec })))
  });

  const products = Object.freeze({
    MELO0130: product({
      imagePresentation: { scale: 1.12 },
      sku: 'MELO0130', brand: 'LOGITECH', category: 'Chuột gaming',
      title: 'Chuột game Logitech G502 Hero (USB/RGB/đen)', price: 899000, listPrice: 1699000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 4,
      specs: [{ label: 'Cảm biến', value: 'HERO 25K' }, { label: 'Kết nối', value: 'USB · RGB' }],
      sourceUrl: 'https://hacom.vn/mouse-logitech-g502-hero-gaming-usb-black'
    }),
    KBHP0023: product({
      imagePresentation: { scale: 1.28, yPercent: 4 },
      sku: 'KBHP0023', brand: 'KINGSTON / HYPERX', category: 'Bàn phím cơ',
      title: 'Bàn phím cơ Kingston HyperX Alloy Origins Core TKL RGB Aqua Switch', price: 1799000, listPrice: 2099000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 0,
      specs: [{ label: 'Layout', value: 'TKL · 87 phím' }, { label: 'Đèn nền', value: 'RGB 16.8 triệu màu' }],
      sourceUrl: 'https://hacom.vn/ban-phim-co-kingston-hyperx-alloy-origins-core-tkl-rgb-aqua-switch/'
    }),
    TNHP0034: product({
      imagePresentation: { scale: 1.1 },
      sku: 'TNHP0034', brand: 'HYPERX', category: 'Tai nghe gaming',
      title: 'Tai nghe Gaming HP HyperX Cloud III Wireless BLK GAM HS (77Z45AA)', price: 3299000, listPrice: 4499000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 0,
      specs: [{ label: 'Kết nối', value: 'Wireless 2.4GHz' }, { label: 'Pin', value: 'Lên đến 120 giờ' }],
      sourceUrl: 'https://hacom.vn/tai-nghe-gaming-hp-hyperx-cloud-iii-wireless-blk-gam-hs-77z45aa'
    }),
    GHEG0949: product({
      imagePresentation: { scale: 1.1 },
      sku: 'GHEG0949', brand: 'CENTAUR', category: 'Ghế gaming',
      title: 'Ghế game CENTAUR GUNDAM BLACK', price: 1599000, listPrice: 2499000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 0,
      specs: [{ label: 'Chất liệu', value: 'Da PU cao cấp' }, { label: 'Độ ngả', value: 'Tối đa 135°' }],
      sourceUrl: 'https://hacom.vn/ghe-game-centaur-gundam-black'
    }),
    MICR0249: product({
      imagePresentation: { scale: 1.12 },
      sku: 'MICR0249', brand: 'FIFINE', category: 'Microphone',
      title: 'Micro thu âm Fifine AM8', price: 1299000, listPrice: 1899000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 0,
      specs: [{ label: 'Loại mic', value: 'Dynamic Cardioid' }, { label: 'Kết nối', value: 'USB-C · XLR' }],
      sourceUrl: 'https://hacom.vn/micro-thu-am-fifine-am8-micr0249'
    }),
    LAHP0257: product({
      imagePresentation: { scale: 1.16 },
      sku: 'LAHP0257', brand: 'HP', category: 'Laptop văn phòng',
      title: 'Laptop HP 15 255 G10 (R5 7520U/16GB/512GB/15.6 FHD)', price: 9999000, listPrice: 11999000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'AMD Ryzen 5 7520U' }, { label: 'Bộ nhớ', value: '16GB · 512GB SSD' }],
      sourceUrl: 'https://hacom.vn/laptop-hp-15-255-g10-bk2d8pt'
    }),
    LTLV0317: product({
      imagePresentation: { scale: 1.1, xPercent: -4 },
      sku: 'LTLV0317', brand: 'LENOVO', category: 'Laptop văn phòng',
      title: 'Laptop Lenovo IdeaPad Slim 3 15ARP10 (R7 7735HS/24GB/512GB)', price: 21499000, listPrice: 21999000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'AMD Ryzen 7 7735HS' }, { label: 'Bộ nhớ', value: '24GB · 512GB SSD' }],
      sourceUrl: 'https://hacom.vn/laptop-lenovo-ideapad-slim-3-15arp10-83k700evvn-ltlv0317'
    }),
    LTAC1001: product({
      imagePresentation: { scale: 1.1 },
      sku: 'LTAC1001', brand: 'ACER', category: 'Laptop văn phòng',
      title: 'Laptop Acer Aspire Go AG15-72P-54GY (Core 5-120U/16GB/512GB/15.6 FHD)', price: 19399000, listPrice: 21999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'Intel Core 5 120U' }, { label: 'Bộ nhớ', value: '16GB · 512GB SSD' }],
      sourceUrl: 'https://hacom.vn/laptop-acer-aspire-go-ag15-72p-54gy-ltac1001'
    }),
    LTMS0640: product({
      imagePresentation: { scale: 1.1 },
      sku: 'LTMS0640', brand: 'MSI', category: 'Laptop gaming',
      title: 'Laptop MSI Cyborg 15 A13UC-2082VN (i7-13620H/16GB/512GB/RTX 3050)', price: 27599000, listPrice: 29999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'Intel Core i7-13620H' }, { label: 'Đồ họa', value: 'RTX 3050 4GB' }],
      sourceUrl: 'https://hacom.vn/laptop-msi-cyborg-15-a13uc-2082vn-ltms0640'
    }),
    LTAU1091: product({
      imagePresentation: { scale: 1.1 },
      sku: 'LTAU1091', brand: 'ASUS TUF', category: 'Laptop gaming',
      title: 'Laptop Asus TUF Gaming FA506NCG-HN329W (R7 8845HS/16GB/512GB/RTX 3050)', price: 25999000, listPrice: 39999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'AMD Ryzen 7 8845HS' }, { label: 'Đồ họa', value: 'RTX 3050 4GB' }],
      sourceUrl: 'https://hacom.vn/laptop-asus-gaming-tuf-fa506ncg-hn329w-ltau1091'
    }),
    LTAC1029: product({
      imagePresentation: { scale: 1.08 },
      sku: 'LTAC1029', brand: 'ACER PREDATOR', category: 'Laptop gaming',
      title: 'Laptop Acer Predator Helios PHN16-I31-72XE (i7-14650HX/32GB/RTX 5060)', price: 59999000, listPrice: 61999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'Intel Core i7-14650HX' }, { label: 'Đồ họa', value: 'RTX 5060 8GB' }],
      sourceUrl: 'https://hacom.vn/laptop-acer-predator-helios-phn16-i31-72xe-ltac1029'
    }),
    PCGM00007: product({
      imagePresentation: { scale: 1.06 },
      sku: 'PCGM00007', brand: 'HACOM PC', category: 'PC Gaming',
      title: 'PC HACOM GAMING ALPHA 002 (i7-10700F/16GB/500GB/RTX 3060 Ti)', price: 15999000, listPrice: 24999000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'Intel Core i7-10700F' }, { label: 'Đồ họa', value: 'RTX 3060 Ti 8GB' }],
      sourceUrl: 'https://hacom.vn/pc-hacom-gaming-alpha-002-i7-10700f-b460-16gb-ram-500gb-ssd-rtx-3060ti'
    }),
    PCGM1174: product({
      imagePresentation: { scale: 1.04 },
      sku: 'PCGM1174', brand: 'HACOM PC', category: 'PC Gaming',
      title: 'PC HACOM PLATINUM PRO 035 (Intel i7-14700F/RTX 5070/Wi-Fi)', price: 49999000, listPrice: 52399000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'Intel Core i7-14700F' }, { label: 'Đồ họa', value: 'GeForce RTX 5070' }],
      sourceUrl: 'https://hacom.vn/pc-hacom-platinum-pro-035-pcgm1174'
    }),
    PCGM1171: product({
      imagePresentation: { scale: 1.04 },
      sku: 'PCGM1171', brand: 'HACOM PC', category: 'PC Gaming',
      title: 'PC HACOM SILVER PRO 036 (Ryzen 5 5600G/Radeon Vega 7)', price: 10199000, listPrice: 11499000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'AMD Ryzen 5 5600G' }, { label: 'Đồ họa', value: 'Radeon Vega 7' }],
      sourceUrl: 'https://hacom.vn/pc-hacom-silver-pro-036-pcgm1171'
    }),
    PCGM1143: product({
      imagePresentation: { scale: 1.04 },
      sku: 'PCGM1143', brand: 'HACOM PC', category: 'PC Gaming',
      title: 'PC HACOM GOLD PRO 076 (Intel i5-12400F/Wi-Fi/RTX 3060)', price: 23999000, listPrice: 26999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'Intel Core i5-12400F' }, { label: 'Đồ họa', value: 'GeForce RTX 3060' }],
      sourceUrl: 'https://hacom.vn/pc-hacom-gold-pro-076-pcgm1143'
    }),
    PCGM1178: product({
      imagePresentation: { scale: 1.04 },
      sku: 'PCGM1178', brand: 'HACOM PC', category: 'PC Gaming',
      title: 'PC HACOM GOLD PRO 037 (Intel i5-14400F/RTX 5050)', price: 18999000, listPrice: 20499000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'CPU', value: 'Intel Core i5-14400F' }, { label: 'Đồ họa', value: 'GeForce RTX 5050' }],
      sourceUrl: 'https://hacom.vn/pc-hacom-gold-pro-037-pcgm1178'
    }),
    VGAS0733: product({
      imagePresentation: { scale: 1.02, xPercent: 4 },
      sku: 'VGAS0733', brand: 'ASUS ROG', category: 'Card đồ họa',
      title: 'Card màn hình Asus ROG STRIX RTX 4060-O8G-GAMING', price: 10399000, listPrice: 12999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'GPU', value: 'GeForce RTX 4060' }, { label: 'VRAM', value: '8GB GDDR6' }],
      sourceUrl: 'https://hacom.vn/card-man-hinh-asus-rog-strix-rtx-4060-o8g-gaming'
    }),
    MOVI0237: product({
      imagePresentation: { scale: 1.16 },
      sku: 'MOVI0237', brand: 'VIEWSONIC', category: 'Màn hình gaming',
      title: 'Màn hình ViewSonic VX2779A-HD-Pro (27 inch/FHD/IPS/240Hz/1ms)', price: 3899000, listPrice: 5799000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 0,
      specs: [{ label: 'Tấm nền', value: '27″ · IPS · FHD' }, { label: 'Tần số', value: '240Hz · 1ms' }],
      sourceUrl: 'https://hacom.vn/man-hinh-viewsonic-vx2779a-hd-pro'
    }),
    MOGI0059: product({
      imagePresentation: { scale: 1.12 },
      sku: 'MOGI0059', brand: 'GIGABYTE', category: 'Màn hình gaming',
      title: 'Màn hình Gigabyte MO27Q2 (27 inch/QHD/QD-OLED/240Hz/0.03ms)', price: 13590000, listPrice: 16299000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'Tấm nền', value: '27″ · QD-OLED · QHD' }, { label: 'Tần số', value: '240Hz · 0.03ms' }],
      sourceUrl: 'https://hacom.vn/man-hinh-gigabyte-mo27q2'
    }),
    MOAS0338: product({
      imagePresentation: { scale: 1.12 },
      sku: 'MOAS0338', brand: 'ASUS TUF', category: 'Màn hình gaming',
      title: 'Màn hình ASUS TUF VG279QE5A (27 inch/FHD/IPS/146Hz/1ms)', price: 2990000, listPrice: 3999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'Tấm nền', value: '27″ · IPS · FHD' }, { label: 'Tần số', value: '146Hz · 1ms' }],
      sourceUrl: 'https://hacom.vn/man-hinh-asus-tuf-vg279qe5a'
    }),
    MODE0306: product({
      imagePresentation: { scale: 1.12 },
      sku: 'MODE0306', brand: 'DELL', category: 'Màn hình văn phòng',
      title: 'Màn hình Dell Pro Plus P2725D (27 inch/QHD/IPS/100Hz/USB-C)', price: 6990000, listPrice: 7999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'Tấm nền', value: '27″ · IPS · QHD' }, { label: 'Tần số', value: '100Hz · USB-C' }],
      sourceUrl: 'https://hacom.vn/man-hinh-dell-pro-plus-p2725d'
    }),
    MOAS0339: product({
      imagePresentation: { scale: 1.12 },
      sku: 'MOAS0339', brand: 'ASUS', category: 'Màn hình văn phòng',
      title: 'Màn hình ASUS VA279HG (27 inch/FHD/IPS/120Hz/1ms)', price: 2790000, listPrice: 3999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'Tấm nền', value: '27″ · IPS · FHD' }, { label: 'Tần số', value: '120Hz · 1ms' }],
      sourceUrl: 'https://hacom.vn/man-hinh-asus-va279hg'
    }),
    MOSA0326: product({
      imagePresentation: { scale: 1.12 },
      sku: 'MOSA0326', brand: 'SAMSUNG', category: 'Màn hình văn phòng',
      title: 'Màn hình Samsung S3 S32GF (27 inch/FHD/IPS/120Hz/5ms)', price: 2790000, listPrice: 3999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'Tấm nền', value: '27″ · IPS · FHD' }, { label: 'Tần số', value: '120Hz · 5ms' }],
      sourceUrl: 'https://hacom.vn/man-hinh-samsung-s3-s32gf-ls27f320gaexxv'
    }),
    PADM0937: product({
      imagePresentation: { scale: 1.28 },
      sku: 'PADM0937', brand: 'REDRAGON', category: 'Bàn di chuột',
      title: 'Bàn di chuột gaming Redragon P047-L (400×900×4mm)', price: 269000, listPrice: 359000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'Kích thước', value: '400 × 900mm' }, { label: 'Bề mặt', value: 'Speed · 4mm' }],
      sourceUrl: 'https://hacom.vn/ban-di-chuot-gaming-redragon-p047-l-padm0937'
    }),
    MERZ0119: product({
      imagePresentation: { scale: 1.12 },
      sku: 'MERZ0119', brand: 'RAZER', category: 'Chuột gaming',
      title: 'Chuột Razer DeathAdder Essential Ergonomic đen', price: 379000, listPrice: 699000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 7,
      specs: [{ label: 'Cảm biến', value: '6400 DPI' }, { label: 'Kết nối', value: 'USB · LED xanh' }],
      sourceUrl: 'https://hacom.vn/chuot-razer-deathadder-essential-ergonomic-den-usb-led-green-rz01-03850100-r3m1'
    }),
    HDSA0250: product({
      imagePresentation: { scale: 1.28 },
      sku: 'HDSA0250', brand: 'SAMSUNG', category: 'SSD NVMe',
      title: 'SSD Samsung 990 EVO Plus 1TB PCIe NVMe', price: 7690000, listPrice: 8990000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'Dung lượng', value: '1TB' }, { label: 'Tốc độ', value: 'Đọc 7250MB/s' }],
      sourceUrl: 'https://hacom.vn/o-cung-ssd-samsung-990-evo-plus-1tb-m.2-2280-pcie-gen4-x4'
    }),
    PWMI0005: product({
      imagePresentation: { scale: 1.16 },
      sku: 'PWMI0005', brand: 'MSI', category: 'Nguồn máy tính',
      title: 'Nguồn máy tính MSI MAG A650BN 650W 80 Plus Bronze', price: 1249000, listPrice: 1699000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 2,
      specs: [{ label: 'Công suất', value: '650W' }, { label: 'Chuẩn', value: '80 Plus Bronze' }],
      sourceUrl: 'https://hacom.vn/nguon-may-tinh-msi-mag-a650bn-650w-80-plus-bronze-mau-den'
    }),
    RAKT0413: product({
      imagePresentation: { scale: 1.28 },
      sku: 'RAKT0413', brand: 'KINGSTON', category: 'RAM máy chủ',
      title: 'RAM Kingston DDR4 32GB 3200MHz ECC RDIMM', price: 3600000, listPrice: 4200000,
      stock: 'Đặt trước', availability: 'preorder', rating: 5, reviewCount: 0,
      specs: [{ label: 'Dung lượng', value: '32GB · 1×32GB' }, { label: 'Chuẩn', value: 'DDR4 · 3200MHz' }],
      sourceUrl: 'https://hacom.vn/ram-ecc-rdimm-kingston-32gb-ksm32rd4-32hdr'
    }),
    VGGI0734: product({
      imagePresentation: { scale: 1.04 },
      sku: 'VGGI0734', brand: 'GIGABYTE', category: 'Card đồ họa',
      title: 'Card màn hình Gigabyte RTX 5060 WINDFORCE MAX OC 8GB', price: 11299000, listPrice: 11999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'GPU', value: 'GeForce RTX 5060' }, { label: 'VRAM', value: '8GB GDDR7' }],
      sourceUrl: 'https://hacom.vn/card-man-hinh-gigabyte-rtx-5060-windforce-max-oc-8gb-vggi0734'
    }),
    VGGI0692: product({
      imagePresentation: { scale: 1.04 },
      sku: 'VGGI0692', brand: 'GIGABYTE', category: 'Card đồ họa',
      title: 'Card màn hình Gigabyte RTX 5070 WINDFORCE OC SFF 12G GDDR7', price: 23599000, listPrice: 25999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'GPU', value: 'GeForce RTX 5070' }, { label: 'VRAM', value: '12GB GDDR7' }],
      sourceUrl: 'https://hacom.vn/card-man-hinh-gigabyte-rtx-5070-windforce-oc-sff-12g-gddr7-gv-n5070wf3oc-12gd'
    }),
    VGAS0844: product({
      imagePresentation: { scale: 1.04 },
      sku: 'VGAS0844', brand: 'ASUS', category: 'Card đồ họa',
      title: 'Card màn hình Asus DUAL RTX 5060 8G OC GDDR7', price: 11999000, listPrice: 12999000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'GPU', value: 'GeForce RTX 5060' }, { label: 'VRAM', value: '8GB GDDR7' }],
      sourceUrl: 'https://hacom.vn/card-man-hinh-asus-dual-rtx-5060-8g-oc-gddr7-dual-rtx5060-o8g'
    }),
    RTRU0047: product({
      imagePresentation: { scale: 1.16 },
      sku: 'RTRU0047', brand: 'RUIJIE', category: 'Thiết bị mạng',
      title: 'Router WiFi 6 Ruijie Reyee RG-EW3000GX', price: 1399000, listPrice: 1899000,
      stock: 'Sẵn hàng', availability: 'in-stock', rating: 5, reviewCount: 0,
      specs: [{ label: 'Chuẩn Wi-Fi', value: 'Wi-Fi 6' }, { label: 'Tốc độ', value: 'AX3000' }],
      sourceUrl: 'https://hacom.vn/router-wifi-6-ruijie-reyee-rg-ew3000gx-rtru0047'
    })
  });

  const legacyAliases = Object.freeze({
    'g502 hero gaming mouse': 'MELO0130',
    'mechanical keyboard 75%': 'KBHP0023',
    'cloud iii wireless': 'TNHP0034',
    'gaming chair e3': 'GHEG0949',
    'studio usb microphone': 'MICR0249',
    'hp 15 — core i5 / 16gb / 512gb': 'LAHP0257',
    'ideapad slim 3 — ryzen 7': 'LTLV0317',
    'hacom gaming core i7 / rtx': 'PCGM00007',
    'rog strix graphics card': 'VGAS0733',
    'vx2779a — 27 inch / 180hz': 'MOVI0237',
    'vx2779a — 27 inch': 'MOVI0237',
    'm171 wireless mouse': 'MELO0130',
    'desk mat xl — navy': 'PADM0937',
    'deathadder essential': 'MERZ0119',
    'gaming mic usb': 'MICR0249',
    'rival gaming mouse': 'MERZ0119',
    'g502 hero': 'MELO0130',
    'memory kit 32gb': 'RAKT0413',
    'psu 650w bronze': 'PWMI0005',
    '990 evo 1tb': 'HDSA0250',
    'màn hình 27 inch 180hz': 'MOVI0237',
    'ghế gaming e3': 'GHEG0949',
    'combo keyboard & mouse': 'KBHP0023',
    'loa desktop compact': 'MICR0249',
    'atlas air wireless': 'TNHP0034',
    'microphone studio': 'MICR0249',
    'wi-fi 6 router': 'RTRU0047'
  });

  const normalize = (value) => String(value || '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim().toLowerCase();
  const getByLegacyTitle = (title) => products[legacyAliases[normalize(title)]] || null;
  const getBySku = (sku) => products[String(sku || '').toUpperCase()] || null;

  global.HacomCatalog = Object.freeze({
    products,
    legacyAliases,
    getByLegacyTitle,
    getBySku,
    all: Object.freeze(Object.values(products))
  });
})(window);
