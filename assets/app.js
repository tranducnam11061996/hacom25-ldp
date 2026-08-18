const demoMenuGroups = Object.freeze([
  ['Danh mục demo', ['Sản phẩm nổi bật', 'Hàng mới về', 'Bán chạy nhất']],
  ['Thông tin demo', ['Tư vấn chọn sản phẩm', 'Phụ kiện đi kèm', 'Khuyến mại hôm nay']]
]);

const laptopFlyout = Object.freeze({
  type: 'laptop-showcase',
  needsTitle: 'NHU CẦU SỬ DỤNG',
  needsSubtitle: 'Chọn laptop phù hợp với nhu cầu của bạn',
  needsIcon: 'fa-solid fa-bullseye',
  needs: Object.freeze([
    {
      id: 'study-office',
      label: 'Học tập Văn phòng',
      lines: Object.freeze(['Học tập', 'Văn phòng']),
      image: 'assets/media/menu/laptops/needs/study-office.webp',
      accent: 'blue'
    },
    {
      id: 'gaming',
      label: 'Laptop Gaming',
      lines: Object.freeze(['Laptop', 'Gaming']),
      image: 'assets/media/menu/laptops/needs/gaming.webp',
      accent: 'red'
    },
    {
      id: 'graphics-design',
      label: 'Đồ họa Thiết kế',
      lines: Object.freeze(['Đồ họa', 'Thiết kế']),
      image: 'assets/media/menu/laptops/needs/graphics-design.webp',
      accent: 'purple'
    },
    {
      id: 'business-premium',
      label: 'Doanh nhân Cao cấp',
      lines: Object.freeze(['Doanh nhân', 'Cao cấp']),
      image: 'assets/media/menu/laptops/needs/business-premium.webp',
      accent: 'blue'
    },
    {
      id: 'student-budget',
      label: 'Sinh viên Giá tốt',
      lines: Object.freeze(['Sinh viên', 'Giá tốt']),
      image: 'assets/media/menu/laptops/needs/student-budget.webp',
      accent: 'orange'
    }
  ]),
  pricesTitle: 'PHÂN KHÚC GIÁ',
  pricesSubtitle: 'Dễ dàng chọn laptop theo ngân sách',
  pricesIcon: 'fa-solid fa-tags',
  prices: Object.freeze([
    { id: 'under-10', label: 'Dưới 10 triệu', lines: Object.freeze(['Dưới', '10 triệu']), icon: 'fa-solid fa-wallet' },
    { id: '10-15', label: '10 – 15 triệu', lines: Object.freeze(['10 – 15', 'triệu']), icon: 'fa-solid fa-money-bill-wave' },
    { id: '15-20', label: '15 – 20 triệu', lines: Object.freeze(['15 – 20', 'triệu']), icon: 'fa-solid fa-sack-dollar' },
    { id: '20-30', label: '20 – 30 triệu', lines: Object.freeze(['20 – 30', 'triệu']), icon: 'fa-solid fa-coins' },
    { id: 'over-30', label: 'Trên 30 triệu', lines: Object.freeze(['Trên', '30 triệu']), icon: 'fa-solid fa-gem' }
  ]),
  processorsTitle: 'DÒNG CHIP',
  processorsSubtitle: 'Hiệu năng mạnh mẽ, xử lý mọi tác vụ',
  processorsIcon: 'fa-solid fa-microchip',
  processors: Object.freeze([
    { id: 'intel-core', label: 'Intel Core', lines: Object.freeze(['Intel', 'Core']), brand: 'intel', series: Object.freeze(['Core']) },
    { id: 'intel-core-ultra', label: 'Intel Core Ultra', lines: Object.freeze(['Intel', 'Core Ultra']), brand: 'intel', series: Object.freeze(['Core', 'Ultra']) },
    { id: 'ryzen-5', label: 'Ryzen 5', lines: Object.freeze(['Ryzen', '5']), brand: 'amd', series: Object.freeze(['RYZEN']), tier: '5' },
    { id: 'ryzen-7', label: 'Ryzen 7', lines: Object.freeze(['Ryzen', '7']), brand: 'amd', series: Object.freeze(['RYZEN']), tier: '7' },
    { id: 'ryzen-9', label: 'Ryzen 9', lines: Object.freeze(['Ryzen', '9']), brand: 'amd', series: Object.freeze(['RYZEN']), tier: '9' },
    { id: 'ryzen-ai', label: 'Ryzen AI', lines: Object.freeze(['Ryzen', 'AI']), brand: 'amd', series: Object.freeze(['RYZEN']), tier: 'AI' }
  ]),
  screensTitle: 'KÍCH THƯỚC MÀN HÌNH',
  screensSubtitle: 'Chọn kích thước phù hợp với nhu cầu',
  screensIcon: 'fa-solid fa-display',
  screens: Object.freeze([
    { id: 'under-14', label: 'Dưới 14 inch', lines: Object.freeze(['Dưới 14 inch']), icon: 'fa-solid fa-laptop' },
    { id: '14', label: '14 inch', lines: Object.freeze(['14 inch']), icon: 'fa-solid fa-laptop' },
    { id: '15-15-6', label: '15 – 15.6 inch', lines: Object.freeze(['15 – 15.6 inch']), icon: 'fa-solid fa-laptop' },
    { id: '16', label: '16 inch', lines: Object.freeze(['16 inch']), icon: 'fa-solid fa-laptop' },
    { id: '17-plus', label: '17 inch trở lên', lines: Object.freeze(['17 inch', 'trở lên']), icon: 'fa-solid fa-laptop' }
  ])
});

const appleFlyout = Object.freeze({
  type: 'apple-showcase',
  navigation: Object.freeze([
    { id: 'apple', name: 'SẢN PHẨM APPLE', icon: 'fa-brands fa-apple' },
    { id: 'mac', name: 'MAC', icon: 'fa-solid fa-laptop' },
    { id: 'iphone', name: 'IPHONE', icon: 'fa-solid fa-mobile-screen-button' },
    { id: 'ipad', name: 'IPAD', icon: 'fa-solid fa-tablet-screen-button' },
    { id: 'watch', name: 'WATCH', icon: 'fa-solid fa-stopwatch' }
  ]),
  hero: Object.freeze({
    title: 'SẢN PHẨM APPLE',
    subtitle: 'Chính hãng – Uy tín – Giá tốt',
    media: Object.freeze([
      { image: 'assets/media/menu/apple/mac/macbook-pro.webp', position: 'laptop' },
      { image: 'assets/media/menu/apple/iphone/iphone-16.webp', position: 'phone' },
      { image: 'assets/media/menu/apple/watch/apple-watch.webp', position: 'watch' },
      { image: 'assets/media/menu/apple/accessories/airpods.webp', position: 'airpods' }
    ]),
    proofs: Object.freeze([
      { title: 'Chính hãng 100%', description: 'Apple Việt Nam', icon: 'fa-solid fa-shield-halved' },
      { title: 'Đổi trả dễ dàng', description: 'Trong 7 ngày', icon: 'fa-solid fa-rotate-left' },
      { title: 'Giao hàng nhanh', description: 'Toàn quốc', icon: 'fa-solid fa-truck' }
    ])
  }),
  mac: Object.freeze({
    title: 'MAC',
    icon: 'fa-solid fa-laptop',
    items: Object.freeze([
      { name: 'MacBook Air', image: 'assets/media/menu/apple/mac/macbook-air.webp' },
      { name: 'MacBook Pro', image: 'assets/media/menu/apple/mac/macbook-pro.webp' },
      { name: 'iMac', image: 'assets/media/menu/apple/mac/imac.webp' },
      { name: 'Mac Mini', image: 'assets/media/menu/apple/mac/mac-mini.webp' }
    ])
  }),
  iphone: Object.freeze({
    title: 'IPHONE',
    icon: 'fa-solid fa-mobile-screen-button',
    items: Object.freeze([
      { name: 'iPhone 17 Series', image: 'assets/media/menu/apple/iphone/iphone-17.webp' },
      { name: 'iPhone 16 Series', image: 'assets/media/menu/apple/iphone/iphone-16.webp' },
      { name: 'iPhone 15 Series', image: 'assets/media/menu/apple/iphone/iphone-15.webp' }
    ])
  }),
  ipad: Object.freeze({
    title: 'IPAD',
    icon: 'fa-solid fa-tablet-screen-button',
    items: Object.freeze([
      { name: 'iPad Pro', image: 'assets/media/menu/apple/ipad/ipad-pro.webp' },
      { name: 'iPad Air', image: 'assets/media/menu/apple/ipad/ipad-air.webp' },
      { name: 'iPad Mini', image: 'assets/media/menu/apple/ipad/ipad-mini.webp' },
      { name: 'iPad Gen Series', image: 'assets/media/menu/apple/ipad/ipad-gen.webp' }
    ])
  }),
  watch: Object.freeze({
    title: 'WATCH',
    icon: 'fa-solid fa-stopwatch',
    items: Object.freeze([
      { name: 'Apple Watch', image: 'assets/media/menu/apple/watch/apple-watch.webp' }
    ])
  }),
  accessories: Object.freeze({
    title: 'PHỤ KIỆN APPLE',
    icon: 'fa-solid fa-box-open',
    items: Object.freeze([
      { name: 'Bàn Phím Apple', image: 'assets/media/menu/apple/accessories/apple-keyboard.webp' },
      { name: 'Chuột Apple', image: 'assets/media/menu/apple/accessories/apple-mouse.webp' },
      { name: 'Tai Nghe Apple', image: 'assets/media/menu/apple/accessories/airpods.webp' },
      { name: 'Bút Apple', image: 'assets/media/menu/apple/accessories/apple-pencil.webp' },
      { name: 'Cáp Sạc Apple', image: 'assets/media/menu/apple/accessories/apple-cable.webp' }
    ])
  })
});

const keyboardFlyout = Object.freeze({
  type: 'keyboard-showcase',
  brands: Object.freeze([
    { name: 'Logitech', logo: 'assets/media/menu/keyboard/brands/logitech.svg' },
    { name: 'Razer', logo: 'assets/media/menu/keyboard/brands/razer.svg' },
    { name: 'Corsair', logo: 'assets/media/menu/keyboard/brands/corsair.svg' },
    { name: 'DAREU', logo: 'assets/media/menu/keyboard/brands/dareu.svg' },
    { name: 'AKKO', logo: 'assets/media/menu/keyboard/brands/akko.svg' },
    { name: 'Keychron', logo: 'assets/media/menu/keyboard/brands/keychron.svg' },
    { name: 'Rapoo', logo: 'assets/media/menu/keyboard/brands/rapoo.svg' },
    { name: 'Fuhlen', logo: 'assets/media/menu/keyboard/brands/fuhlen.svg' },
    { name: 'ASUS ROG', logo: 'assets/media/menu/keyboard/brands/asus-rog.svg' },
    { name: 'SteelSeries', logo: 'assets/media/menu/keyboard/brands/steelseries.svg' }
  ]),
  types: Object.freeze([
    { name: 'Bàn phím cơ', image: 'assets/media/menu/keyboard/types/mechanical.webp' },
    { name: 'Bàn phím giả cơ', image: 'assets/media/menu/keyboard/types/semi-mechanical.webp' },
    { name: 'Bàn phím màng (membrane)', image: 'assets/media/menu/keyboard/types/membrane.webp' },
    { name: 'Bàn phím mini / 60% / TKL', image: 'assets/media/menu/keyboard/types/compact.webp' },
    { name: 'Bàn phím fullsize (104 phím)', image: 'assets/media/menu/keyboard/types/fullsize.webp' },
    { name: 'Bàn phím văn phòng', image: 'assets/media/menu/keyboard/types/office.webp' },
    { name: 'Bàn phím gaming', image: 'assets/media/menu/keyboard/types/gaming.webp' }
  ]),
  prices: Object.freeze([
    { name: 'Dưới 300.000đ', icon: 'fa-solid fa-coins' },
    { name: '300.000đ – 700.000đ', icon: 'fa-solid fa-wallet' },
    { name: '700.000đ – 1.500.000đ', icon: 'fa-solid fa-money-bill-wave' },
    { name: '1.500.000đ – 3.000.000đ', icon: 'fa-solid fa-money-check-dollar' },
    { name: 'Trên 3.000.000đ', icon: 'fa-solid fa-briefcase' }
  ]),
  connections: Object.freeze([
    { name: 'Có dây (USB / PS2)', icon: 'fa-solid fa-plug' },
    { name: 'Không dây', icon: 'fa-solid fa-wifi' },
    { name: 'Kết nối đa thiết bị', icon: 'fa-solid fa-mobile-screen-button' }
  ]),
  features: Object.freeze([
    { name: 'Led RGB / Led đơn sắc', icon: 'fa-solid fa-lightbulb' },
    { name: 'Switch thay nóng (Hot-swap)', icon: 'fa-solid fa-cube' },
    { name: 'Anti-ghosting / N-Key Rollover', icon: 'fa-solid fa-keyboard' },
    { name: 'Dây tháo rời Type-C', icon: 'fa-solid fa-plug-circle-check' },
    { name: 'Layout ANSI / ISO / JIS', icon: 'fa-solid fa-language' }
  ]),
  accessories: Object.freeze([
    { name: 'Keycap rời', image: 'assets/media/menu/keyboard/accessories/keycap.webp' },
    { name: 'Kê tay (Wrist Rest)', image: 'assets/media/menu/keyboard/accessories/wrist-rest.webp' },
    { name: 'Switch rời', image: 'assets/media/menu/keyboard/accessories/switch.webp' },
    { name: 'Dây cáp bàn phím', image: 'assets/media/menu/keyboard/accessories/cable.webp' },
    { name: 'Bàn chải vệ sinh / Dụng cụ pull keycap', image: 'assets/media/menu/keyboard/accessories/cleaning-kit.webp' }
  ])
});

const pcFlyout = Object.freeze({
  type: 'pc-showcase',
  families: Object.freeze([
    { id: 'gaming', label: 'PC Gaming', icon: 'fa-solid fa-gamepad' },
    { id: 'graphics', label: 'PC Đồ Họa', icon: 'fa-solid fa-palette' },
    { id: 'office', label: 'PC Văn Phòng', icon: 'fa-solid fa-briefcase' },
    { id: 'business', label: 'PC Doanh Nghiệp', icon: 'fa-solid fa-building' },
    { id: 'workstation', label: 'PC Workstation', icon: 'fa-solid fa-chart-line' },
    { id: 'server', label: 'PC Server', icon: 'fa-solid fa-server' },
    { id: 'all-in-one', label: 'PC All-in-One', icon: 'fa-solid fa-desktop' },
    { id: 'mini', label: 'PC Mini', icon: 'fa-solid fa-box' },
    { id: 'custom', label: 'PC Custom', icon: 'fa-solid fa-screwdriver-wrench' },
    { id: 'synchronized', label: 'PC Đồng Bộ', icon: 'fa-solid fa-computer' }
  ]),
  filters: Object.freeze([
    {
      id: 'prices',
      title: 'CHỌN THEO PHÂN KHÚC GIÁ',
      icon: 'fa-solid fa-tags',
      accent: 'green',
      columns: Object.freeze([
        Object.freeze([
          { id: 'under-10', label: 'Dưới 10 triệu' },
          { id: '10-15', label: '10 – 15 triệu' },
          { id: '15-20', label: '15 – 20 triệu' },
          { id: '20-30', label: '20 – 30 triệu' }
        ]),
        Object.freeze([
          { id: '30-50', label: '30 – 50 triệu' },
          { id: '50-80', label: '50 – 80 triệu' },
          { id: '80-120', label: '80 – 120 triệu' },
          { id: 'over-120', label: 'Trên 120 triệu' }
        ])
      ])
    },
    {
      id: 'processors',
      title: 'CHỌN THEO CPU',
      icon: 'fa-solid fa-microchip',
      accent: 'blue',
      columns: Object.freeze([
        Object.freeze([
          { id: 'intel-i3', label: 'Intel Core i3' },
          { id: 'intel-i5', label: 'Intel Core i5' },
          { id: 'intel-i7', label: 'Intel Core i7' },
          { id: 'intel-i9', label: 'Intel Core i9' },
          { id: 'intel-ultra', label: 'Intel Core Ultra' }
        ]),
        Object.freeze([
          { id: 'ryzen-5', label: 'AMD Ryzen 5' },
          { id: 'ryzen-7', label: 'AMD Ryzen 7' },
          { id: 'ryzen-9', label: 'AMD Ryzen 9' },
          { id: 'ryzen-ai', label: 'AMD Ryzen AI' },
          { id: 'intel-xeon', label: 'Intel Xeon' }
        ])
      ])
    },
    {
      id: 'graphics',
      title: 'CHỌN THEO GPU',
      icon: 'fa-solid fa-memory',
      accent: 'orange',
      columns: Object.freeze([
        Object.freeze([
          { id: 'integrated-graphics', label: 'Integrated Graphics' },
          { id: 'rtx-30', label: 'RTX 30 Series' },
          { id: 'rtx-40', label: 'RTX 40 Series' },
          { id: 'rtx-50', label: 'RTX 50 Series' },
          { id: 'rx-6000', label: 'RX 6000 Series' }
        ]),
        Object.freeze([
          { id: 'rx-7000', label: 'RX 7000 Series' },
          { id: 'rx-9000', label: 'RX 9000 Series' },
          { id: 'rtx-workstation', label: 'RTX Workstation' },
          { id: 'quadro', label: 'Quadro' },
          { id: 'no-dedicated-gpu', label: 'No dedicated GPU' }
        ])
      ])
    },
    {
      id: 'memory',
      title: 'CHỌN THEO RAM',
      icon: 'fa-solid fa-memory',
      accent: 'purple',
      columns: Object.freeze([
        Object.freeze([
          { id: 'ram-8', label: '8GB' },
          { id: 'ram-16', label: '16GB' },
          { id: 'ram-32', label: '32GB' },
          { id: 'ram-64', label: '64GB' }
        ]),
        Object.freeze([
          { id: 'ram-96', label: '96GB' },
          { id: 'ram-128-plus', label: 'Trên 128GB' },
          { id: 'ddr4', label: 'DDR4' },
          { id: 'ddr5', label: 'DDR5' }
        ])
      ])
    },
    {
      id: 'storage',
      title: 'CHỌN THEO Ổ CỨNG',
      icon: 'fa-solid fa-hard-drive',
      accent: 'blue',
      columns: Object.freeze([
        Object.freeze([
          { id: 'ssd-256', label: 'SSD 256GB' },
          { id: 'ssd-512', label: 'SSD 512GB' },
          { id: 'ssd-1tb', label: 'SSD 1TB' },
          { id: 'ssd-2tb', label: 'SSD 2TB' }
        ]),
        Object.freeze([
          { id: 'hdd-1tb', label: 'HDD 1TB' },
          { id: 'hdd-2tb', label: 'HDD 2TB' },
          { id: 'nvme-3', label: 'NVMe PCIe 3.0' },
          { id: 'nvme-4', label: 'NVMe PCIe 4.0' }
        ]),
        Object.freeze([
          { id: 'nvme-5', label: 'NVMe PCIe 5.0' }
        ])
      ])
    },
    {
      id: 'form-factor',
      title: 'CHỌN THEO KÍCH THƯỚC / FORM FACTOR',
      icon: 'fa-solid fa-computer',
      accent: 'pink',
      columns: Object.freeze([
        Object.freeze([
          { id: 'mini-pc-nuc', label: 'Mini PC / NUC' },
          { id: 'sff', label: 'SFF (Small Form Factor)' },
          { id: 'micro-tower', label: 'Micro Tower' },
          { id: 'mid-tower', label: 'Mid Tower' }
        ]),
        Object.freeze([
          { id: 'full-tower', label: 'Full Tower' },
          { id: 'all-in-one', label: 'All-in-One' },
          { id: 'mini-itx', label: 'Mini ITX' },
          { id: 'dtx', label: 'DTX' }
        ]),
        Object.freeze([
          { id: 'slim-desktop', label: 'Slim Desktop' },
          { id: 'server-chassis', label: 'Server chassis' },
          { id: 'rack', label: 'Rack' }
        ])
      ])
    }
  ])
});

const displayFlyout = Object.freeze({
  type: 'display-showcase',
  useCases: Object.freeze([
    { id: 'gaming', label: 'Màn hình Gaming', lines: Object.freeze(['Màn hình', 'Gaming']), icon: 'fa-solid fa-gamepad' },
    { id: 'office-study', label: 'Màn hình Văn phòng / Học tập', lines: Object.freeze(['Màn hình Văn phòng', '/ Học tập']), icon: 'fa-solid fa-briefcase' },
    { id: 'graphics-design', label: 'Màn hình Đồ họa – Thiết kế', lines: Object.freeze(['Màn hình Đồ họa', '– Thiết kế']), icon: 'fa-solid fa-palette' },
    { id: 'programming', label: 'Màn hình Lập trình / Làm việc dài giờ (chống mỏi mắt)', lines: Object.freeze(['Màn hình Lập trình', '/ Làm việc dài giờ', '(chống mỏi mắt)']), icon: 'fa-solid fa-laptop-code' },
    { id: 'surveillance-pos', label: 'Màn hình Camera giám sát / POS / Công nghiệp', lines: Object.freeze(['Màn hình Camera giám sát', '/ POS / Công nghiệp']), icon: 'fa-solid fa-video' },
    { id: 'multi-purpose', label: 'Màn hình Đa năng', lines: Object.freeze(['Màn hình', 'Đa năng']), icon: 'fa-solid fa-table-cells-large' }
  ]),
  selectors: Object.freeze([
    {
      id: 'sizes',
      title: 'KÍCH THƯỚC',
      icon: 'fa-solid fa-display',
      accent: 'green',
      columns: 5,
      items: Object.freeze([
        { id: 'under-22', label: 'Dưới 22 inch' },
        { id: '24-25', label: '24 – 25 inch' },
        { id: '27-29', label: '27 – 29 inch' },
        { id: '30-34', label: '30 – 34 inch' },
        { id: 'over-34', label: 'Trên 34 inch / (ultrawide / super ultrawide)', lines: Object.freeze(['Trên 34 inch /', '(ultrawide / super ultrawide)']) }
      ])
    },
    {
      id: 'prices',
      title: 'PHÂN KHÚC GIÁ',
      icon: 'fa-solid fa-tags',
      accent: 'orange',
      columns: 5,
      items: Object.freeze([
        { id: 'under-3', label: 'Dưới 3 triệu' },
        { id: '3-5', label: '3 – 5 triệu' },
        { id: '5-8', label: '5 – 8 triệu' },
        { id: '8-12', label: '8 – 12 triệu' },
        { id: 'over-12', label: 'Trên 12 triệu' }
      ])
    }
  ]),
  brands: Object.freeze([
    { id: 'asus', name: 'ASUS', logo: 'assets/media/menu/displays/brands/asus.webp' },
    { id: 'acer', name: 'Acer', logo: 'assets/media/menu/displays/brands/acer.webp' },
    { id: 'lg', name: 'LG', logo: 'assets/media/menu/displays/brands/lg.webp' },
    { id: 'samsung', name: 'Samsung', logo: 'assets/media/menu/displays/brands/samsung.webp' },
    { id: 'dell', name: 'Dell', logo: 'assets/media/menu/displays/brands/dell.webp' },
    { id: 'msi', name: 'MSI', logo: 'assets/media/menu/displays/brands/msi.webp' },
    { id: 'gigabyte', name: 'Gigabyte / AORUS', logo: 'assets/media/menu/displays/brands/gigabyte.webp', submark: 'AORUS' },
    { id: 'viewsonic', name: 'ViewSonic', logo: 'assets/media/menu/displays/brands/viewsonic.webp' },
    { id: 'benq', name: 'BenQ', logo: 'assets/media/menu/displays/brands/benq.webp' },
    { id: 'philips', name: 'Philips', logo: 'assets/media/menu/displays/brands/philips.webp' },
    { id: 'lenovo', name: 'Lenovo', logo: 'assets/media/menu/displays/brands/lenovo.webp' },
    { id: 'cooler-master', name: 'Cooler Master', logo: 'assets/media/menu/displays/brands/cooler-master.webp' },
    { id: 'hp', name: 'HP', logo: 'assets/media/menu/displays/brands/hp.webp', rail: true }
  ]),
  specifications: Object.freeze([
    {
      id: 'refresh-rate',
      title: 'TẦN SỐ QUÉT',
      icon: 'fa-solid fa-wave-square',
      accent: 'indigo',
      items: Object.freeze([
        { id: '60-75hz', label: '60Hz – 75Hz (văn phòng / học tập)' },
        { id: '100-144hz', label: '100Hz – 144Hz (gaming cơ bản)' },
        { id: '165-240hz', label: '165Hz – 240Hz (gaming cao cấp)' },
        { id: 'over-240hz', label: 'Trên 240Hz (eSports, chuyên nghiệp)' }
      ])
    },
    {
      id: 'panel-type',
      title: 'LOẠI TẤM NỀN',
      icon: 'fa-solid fa-layer-group',
      accent: 'cyan',
      items: Object.freeze([
        { id: 'ips', label: 'IPS (màu sắc trung thực, góc nhìn rộng)' },
        { id: 'va', label: 'VA (tương phản cao, phù hợp giải trí)' },
        { id: 'tn', label: 'TN (tốc độ phản hồi nhanh, gaming eSports)' },
        { id: 'oled-qd-oled', label: 'OLED / QD-OLED (cao cấp, hiển thị hoàn hảo)' }
      ])
    },
    {
      id: 'display-features',
      title: 'ĐẶC ĐIỂM HIỂN THỊ',
      icon: 'fa-solid fa-star',
      accent: 'yellow',
      items: Object.freeze([
        { id: 'curved', label: 'Màn hình cong (Curved)' },
        { id: 'flat', label: 'Màn hình phẳng (Flat)' },
        { id: 'touch-screen', label: 'Màn hình cảm ứng (Touch screen)' },
        { id: 'built-in-speakers', label: 'Màn hình có loa tích hợp' },
        { id: 'pivot', label: 'Màn hình xoay dọc / Pivot' },
        { id: 'slim-bezel', label: 'Màn hình siêu mỏng viền' }
      ])
    },
    {
      id: 'connections',
      title: 'CỔNG KẾT NỐI',
      icon: 'fa-solid fa-plug',
      accent: 'pink',
      items: Object.freeze([
        { id: 'hdmi', label: 'HDMI' },
        { id: 'displayport', label: 'DisplayPort' },
        { id: 'usb-c-thunderbolt', label: 'USB-C / Thunderbolt' },
        { id: 'vga-dvi', label: 'VGA / DVI (phù hợp văn phòng cũ)' },
        { id: 'multi-port', label: 'Kết nối đa năng (tích hợp nhiều cổng)' }
      ])
    }
  ]),
  specialties: Object.freeze([
    { id: 'portable', label: 'Màn hình di động (Portable Monitor)', lines: Object.freeze(['Màn hình di động', '(Portable Monitor)']), icon: 'fa-solid fa-laptop' },
    { id: 'ultrawide', label: 'Màn hình UltraWide / Super UltraWide', lines: Object.freeze(['Màn hình UltraWide', '/ Super UltraWide']), icon: 'fa-solid fa-display' },
    { id: 'mini-led-oled', label: 'Màn hình Mini LED / OLED cao cấp', lines: Object.freeze(['Màn hình Mini LED /', 'OLED cao cấp']), icon: 'fa-solid fa-table-cells-large' },
    { id: 'macbook', label: 'Màn hình cho MacBook', lines: Object.freeze(['Màn hình cho', 'MacBook']), icon: 'fa-brands fa-apple' }
  ])
});

const additionalFlyouts = window.__hacomFlyoutData || {};

const categoryTree = Object.freeze([
  { id: 'apple', name: 'Sản phẩm Apple', icon: 'fa-brands fa-apple', groups: demoMenuGroups, flyout: appleFlyout },
  { id: 'laptops', name: 'Laptop', icon: 'fa-solid fa-laptop', groups: demoMenuGroups, flyout: laptopFlyout },
  { id: 'pc', name: 'PC', icon: 'fa-solid fa-desktop', groups: demoMenuGroups, flyout: pcFlyout },
  { id: 'displays', name: 'Màn Hình', icon: 'fa-solid fa-display', groups: demoMenuGroups, flyout: displayFlyout },
  { id: 'keyboards', name: 'Bàn phím', icon: 'fa-solid fa-keyboard', groups: demoMenuGroups, flyout: keyboardFlyout },
  { id: 'mice', name: 'Chuột', icon: 'fa-solid fa-computer-mouse', groups: demoMenuGroups, flyout: additionalFlyouts.mice },
  { id: 'headphones', name: 'Tai Nghe', icon: 'fa-solid fa-headphones', groups: demoMenuGroups, flyout: additionalFlyouts.headphones },
  { id: 'speakers', name: 'Loa', icon: 'fa-solid fa-volume-high', groups: demoMenuGroups, flyout: additionalFlyouts.speakers },
  { id: 'gaming-consoles', name: 'Máy chơi game', icon: 'fa-solid fa-gamepad', groups: demoMenuGroups, flyout: additionalFlyouts.gamingConsoles },
  { id: 'printers', name: 'Máy In', icon: 'fa-solid fa-print', groups: demoMenuGroups, flyout: additionalFlyouts.printers },
  { id: 'projectors', name: 'Máy Chiếu', icon: 'fa-solid fa-video', groups: demoMenuGroups, flyout: additionalFlyouts.projectors },
  { id: 'gpu', name: 'VGA', icon: 'fa-solid fa-microchip', groups: demoMenuGroups, flyout: additionalFlyouts.gpu },
  { id: 'cpu', name: 'CPU', icon: 'fa-solid fa-microchip', groups: demoMenuGroups, flyout: additionalFlyouts.cpu },
  { id: 'mainboard', name: 'Main', icon: 'fa-solid fa-server', groups: demoMenuGroups, flyout: additionalFlyouts.mainboard },
  { id: 'ram', name: 'RAM', icon: 'fa-solid fa-memory', groups: demoMenuGroups, flyout: additionalFlyouts.ram },
  { id: 'cooling', name: 'Tản Nhiệt', icon: 'fa-solid fa-fan', groups: demoMenuGroups, flyout: additionalFlyouts.cooling },
  { id: 'chairs', name: 'Ghế', icon: 'fa-solid fa-chair', groups: demoMenuGroups, flyout: additionalFlyouts.chairs },
  { id: 'network', name: 'Thiết Bị Mạng', icon: 'fa-solid fa-wifi', groups: demoMenuGroups, flyout: additionalFlyouts.network },
  { id: 'home-appliances', name: 'Gia Dụng', icon: 'fa-solid fa-house', groups: demoMenuGroups, flyout: additionalFlyouts.homeAppliances },
  { id: 'cameras', name: 'Camera', icon: 'fa-solid fa-camera', groups: demoMenuGroups, flyout: additionalFlyouts.cameras },
  { id: 'business', name: 'Dành Cho Doanh Nghiệp', icon: 'fa-solid fa-briefcase', groups: demoMenuGroups, flyout: additionalFlyouts.business }
]);

const campaignSets = Object.freeze([
  { id: 'akko', name: 'Bàn phím cơ siêu lướt', artwork: { main: 'header-tech/hero-akko', side: [] } },
  { id: 'performance', name: 'HACOM Performance', artwork: { main: 'header-tech/hero-performance', side: [] } },
  { id: 'builder', name: 'PC Builder', artwork: { main: 'header-tech/hero-builder', side: [] } }
]);

const homepageCollections = Object.freeze({
  deals: Object.freeze(['MELO0130', 'VGAS0733', 'HDSA0250', 'PWMI0005', 'PADM0937', 'MERZ0119']),
  trending: Object.freeze(['LAHP0257', 'PCGM00007', 'VGAS0733', 'MOVI0237', 'MELO0130', 'TNHP0034']),
  'new-arrivals': Object.freeze(['LTLV0317', 'PCGM00007', 'HDSA0250', 'RAKT0413', 'PWMI0005', 'RTRU0047']),
  laptops: Object.freeze(['LAHP0257', 'LTLV0317']),
  'pc-gaming': Object.freeze(['PCGM00007', 'VGAS0733']),
  displays: Object.freeze(['MOVI0237']),
  components: Object.freeze(['HDSA0250', 'PWMI0005', 'RAKT0413']),
  'gaming-gear': Object.freeze(['MELO0130', 'KBHP0023', 'TNHP0034', 'PADM0937', 'MERZ0119', 'MICR0249'])
});

window.HacomGatewayData = Object.freeze({ categoryTree, campaignSets, homepageCollections });

const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'className') element.className = value;
    else if (key === 'text') element.textContent = value;
    else if (key.startsWith('data-')) element.setAttribute(key, value);
    else if (key.startsWith('data')) element.dataset[key.slice(4)] = value;
    else element.setAttribute(key, value);
  });
  return element;
};

const announce = (message) => {
  const status = document.getElementById('pageStatus');
  if (status) status.textContent = message;
};

const createIcon = (iconClass) => createElement('i', {
  className: `${iconClass} menu-icon`,
  'aria-hidden': 'true'
});

function initResponsiveHeaderPanels() {
  const header = document.querySelector('.site-header--reference');
  const triggers = [...document.querySelectorAll('[data-header-panel-trigger]')];
  const panels = new Map(
    [...document.querySelectorAll('[data-header-panel]')]
      .map((panel) => [panel.dataset.headerPanel, panel])
  );
  if (!(header instanceof HTMLElement) || triggers.length === 0 || panels.size === 0) return;

  const desktopQuery = window.matchMedia('(min-width: 1181px)');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const closeTimers = new Map();
  let activeName = null;
  let activeTrigger = null;

  const clearCloseTimer = (name) => {
    const timer = closeTimers.get(name);
    if (timer) window.clearTimeout(timer);
    closeTimers.delete(name);
  };

  const concealPanel = (name, immediate = false) => {
    const panel = panels.get(name);
    if (!(panel instanceof HTMLElement)) return;
    clearCloseTimer(name);
    panel.classList.remove('is-open');
    if (immediate || reducedMotionQuery.matches) {
      panel.hidden = true;
      return;
    }
    closeTimers.set(name, window.setTimeout(() => {
      panel.hidden = true;
      closeTimers.delete(name);
    }, 220));
  };

  const closeActive = ({ returnFocus = false, immediate = false } = {}) => {
    if (!activeName) return;
    const closingName = activeName;
    const closingTrigger = activeTrigger;
    activeName = null;
    activeTrigger = null;
    triggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
    concealPanel(closingName, immediate);
    if (returnFocus && closingTrigger instanceof HTMLElement) {
      activeTrigger = closingTrigger;
      activeTrigger?.focus();
      activeTrigger = null;
    }
  };

  const openPanel = (name, trigger) => {
    const panel = panels.get(name);
    if (!(panel instanceof HTMLElement)) return;
    if (activeName && activeName !== name) closeActive({ immediate: true });
    clearCloseTimer(name);
    activeName = name;
    activeTrigger = trigger;
    triggers.forEach((item) => item.setAttribute('aria-expanded', String(item === trigger)));
    panel.hidden = false;
    panel.getBoundingClientRect();
    window.requestAnimationFrame(() => {
      if (activeName === name) panel.classList.add('is-open');
    });
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const name = trigger.dataset.headerPanelTrigger;
      if (!name) return;
      if (activeName === name) closeActive();
      else openPanel(name, trigger);
    });
  });

  panels.forEach((panel) => {
    panel.querySelectorAll('[data-header-panel-action]').forEach((action) => {
      action.addEventListener('click', () => closeActive());
    });
  });

  document.addEventListener('click', (event) => {
    if (!activeName || !(event.target instanceof Element)) return;
    if (event.target.closest('[data-header-panel-trigger], [data-header-panel]')) return;
    closeActive();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !activeName) return;
    event.preventDefault();
    closeActive({ returnFocus: true });
  });

  desktopQuery.addEventListener?.('change', (event) => {
    if (event.matches) closeActive({ immediate: true });
  });
}

function initMenu() {
  const menu = document.getElementById('megaMenu');
  const toggles = [...document.querySelectorAll('[data-menu-toggle]')];
  const desktopList = document.getElementById('desktopSidebarList');
  const desktopContent = document.getElementById('desktopContentContainer');
  const mobileGrid = document.getElementById('mobileGrid');
  const mobileGridContainer = document.getElementById('mobileGridContainer');
  const mobileSubView = document.getElementById('mobileSubView');
  const mobileSubTitle = document.getElementById('mobileSubTitle');
  const mobileSubContent = document.getElementById('mobileSubContentList');
  const mobileBack = document.querySelector('[data-mobile-menu-back]');

  if (!menu || toggles.length === 0 || !desktopList || !desktopContent || !mobileGrid || !mobileGridContainer || !mobileSubView || !mobileSubTitle || !mobileSubContent) return;

  let activeCategoryId = categoryTree[0].id;
  let opener = null;

  const setMenuOpen = (open, trigger = null) => {
    menu.hidden = !open;
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('mobile-menu-open', open);
    toggles.forEach((toggle) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Đóng menu danh mục' : 'Mở menu danh mục');
    });
    document.querySelectorAll('[data-menu-icon]').forEach((icon) => {
      icon.className = `fa-solid ${open ? 'fa-xmark' : 'fa-bars'} menu-icon`;
      icon.setAttribute('aria-hidden', 'true');
    });
    if (open) {
      opener = trigger || document.activeElement;
      mobileGrid.classList.remove('hidden');
      mobileSubView.classList.add('hidden');
    } else if (opener instanceof HTMLElement) {
      opener.focus();
    }
  };

  const renderDesktopContent = () => {
    const category = categoryTree.find((item) => item.id === activeCategoryId) || categoryTree[0];
    const groups = createElement('div', { className: 'menu-content-grid' });
    category.groups.forEach(([title, items]) => {
      const group = createElement('section');
      group.append(createElement('h3', { className: 'menu-group-title', text: title }));
      const list = createElement('ul', { className: 'menu-link-list' });
      items.forEach((item) => {
        const button = createElement('button', { type: 'button', className: 'sub-link', text: item });
        button.dataset.demoAction = '';
        const listItem = createElement('li');
        listItem.append(button);
        list.append(listItem);
      });
      group.append(list);
      groups.append(group);
    });
    desktopContent.replaceChildren(groups);
  };

  const renderDesktopList = () => {
    const fragment = document.createDocumentFragment();
    categoryTree.forEach((category) => {
      const button = createElement('button', {
        type: 'button',
        className: `sidebar-item ${category.id === activeCategoryId ? 'active' : ''}`,
        'aria-pressed': String(category.id === activeCategoryId)
      });
      button.append(createIcon(category.icon), createElement('span', { text: category.name }));
      button.addEventListener('click', () => {
        activeCategoryId = category.id;
        renderDesktopList();
        renderDesktopContent();
      });
      button.addEventListener('focus', () => {
        if (activeCategoryId !== category.id) {
          activeCategoryId = category.id;
          renderDesktopList();
          renderDesktopContent();
        }
      });
      fragment.append(button);
    });
    desktopList.replaceChildren(fragment);
  };

  const openMobileCategory = (category) => {
    mobileSubTitle.textContent = category.name;
    const fragment = document.createDocumentFragment();
    category.groups.forEach(([title, items]) => {
      const group = createElement('section');
      group.append(createElement('h3', { className: 'menu-group-title', text: title }));
      const list = createElement('ul', { className: 'menu-link-list' });
      items.forEach((item) => {
        const button = createElement('button', { type: 'button', className: 'sub-link text-left', text: item });
        button.dataset.demoAction = '';
        const listItem = createElement('li');
        listItem.append(button);
        list.append(listItem);
      });
      group.append(list);
      fragment.append(group);
    });
    mobileSubContent.replaceChildren(fragment);
    mobileGrid.classList.add('hidden');
    mobileSubView.classList.remove('hidden');
    mobileBack?.focus();
  };

  const renderMobileGrid = () => {
    const fragment = document.createDocumentFragment();
    categoryTree.forEach((category) => {
      const button = createElement('button', {
        type: 'button',
        className: 'category-menu-button',
        'aria-label': `Mở danh mục ${category.name}`
      });
      button.append(createIcon(category.icon));
      button.append(createElement('span', { className: 'menu-category-name', text: category.name }));
      button.addEventListener('click', () => openMobileCategory(category));
      fragment.append(button);
    });
    mobileGridContainer.replaceChildren(fragment);
  };

  toggles.forEach((toggle) => toggle.addEventListener('click', () => setMenuOpen(menu.hidden, toggle)));
  mobileBack?.addEventListener('click', () => {
    mobileSubView.classList.add('hidden');
    mobileGrid.classList.remove('hidden');
    mobileGridContainer.querySelector('button')?.focus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) setMenuOpen(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (!menu.hidden && !menu.contains(event.target) && !toggles.some((toggle) => toggle.contains(event.target))) setMenuOpen(false);
  });

  renderDesktopList();
  renderDesktopContent();
  renderMobileGrid();
}

const createPcFamilyCard = (item) => {
  const button = createElement('button', {
    type: 'button',
    className: `pc-flyout__family-card pc-flyout__family-card--${item.id}`,
    'aria-label': item.label
  });
  button.dataset.demoAction = '';
  button.append(
    createIcon(item.icon),
    createElement('span', { className: 'pc-flyout__family-label', text: item.label })
  );
  return button;
};

const createPcSectionHeader = ({ title, icon, accent }) => {
  const heading = createElement('div', {
    className: `pc-flyout__section-heading pc-flyout__section-heading--${accent}`
  });
  heading.append(
    createIcon(icon),
    createElement('h3', { text: title }),
    createElement('span', { className: 'pc-flyout__section-rule', 'aria-hidden': 'true' })
  );
  return heading;
};

const createPcFilterColumn = (items) => {
  const column = createElement('div', { className: 'pc-flyout__filter-column' });
  items.forEach((item) => {
    const button = createElement('button', {
      type: 'button',
      className: 'pc-flyout__filter-item',
      'aria-label': item.label
    });
    button.dataset.demoAction = '';
    button.append(
      createElement('span', { className: 'pc-flyout__filter-label', text: item.label }),
      createIcon('fa-solid fa-chevron-right')
    );
    column.append(button);
  });
  return column;
};

const createPcFilterPanel = (filter) => {
  const rowCount = Math.max(...filter.columns.map((column) => column.length));
  const panel = createElement('section', {
    className: `pc-flyout__panel pc-flyout__panel--${filter.id} pc-flyout__panel--${filter.accent} pc-flyout__panel--columns-${filter.columns.length} pc-flyout__panel--rows-${rowCount}`,
    'aria-label': filter.title
  });
  const columns = createElement('div', { className: 'pc-flyout__filter-columns' });
  filter.columns.forEach((items) => columns.append(createPcFilterColumn(items)));
  panel.append(createPcSectionHeader(filter), columns);
  return panel;
};

const renderPcFlyout = (flyoutData) => {
  const shell = createElement('div', { className: 'pc-flyout' });
  const families = createElement('section', {
    className: 'pc-flyout__families',
    'aria-label': 'Các dòng PC'
  });
  flyoutData.families.forEach((item) => families.append(createPcFamilyCard(item)));

  const taxonomy = createElement('div', {
    className: 'pc-flyout__taxonomy',
    'aria-label': 'Bộ lọc PC'
  });
  flyoutData.filters.forEach((filter) => taxonomy.append(createPcFilterPanel(filter)));
  shell.append(families, taxonomy);
  return shell;
};

const createDisplayLabel = (lines, className = 'display-flyout__card-label') => {
  const label = createElement('span', { className });
  lines.forEach((line) => label.append(createElement('span', { text: line })));
  return label;
};

const createDisplayArrow = () => {
  const arrow = createElement('span', { className: 'display-flyout__card-arrow', 'aria-hidden': 'true' });
  arrow.append(createIcon('fa-solid fa-chevron-right'));
  return arrow;
};

const createDisplayUseCaseCard = (item) => {
  const button = createElement('button', {
    type: 'button',
    className: `display-flyout__use-case display-flyout__use-case--${item.id}`,
    'aria-label': item.label
  });
  button.dataset.demoAction = '';
  button.append(
    createIcon(item.icon),
    createDisplayLabel(item.lines, 'display-flyout__use-case-label'),
    createDisplayArrow()
  );
  return button;
};

const createDisplaySectionHeader = ({ title, icon, accent }) => {
  const heading = createElement('div', {
    className: `display-flyout__section-heading display-flyout__section-heading--${accent}`
  });
  heading.append(
    createIcon(icon),
    createElement('h3', { text: title }),
    createElement('span', { className: 'display-flyout__section-rule', 'aria-hidden': 'true' })
  );
  return heading;
};

const createDisplayListItem = (item, variant = 'taxonomy') => {
  const button = createElement('button', {
    type: 'button',
    className: `display-flyout__list-item display-flyout__list-item--${variant}`,
    'aria-label': item.label
  });
  button.dataset.demoAction = '';
  button.append(
    createDisplayLabel(item.lines || [item.label], 'display-flyout__list-label'),
    createDisplayArrow()
  );
  return button;
};

const createDisplaySelectorPanel = (selector) => {
  const panel = createElement('section', {
    className: `display-flyout__selector-panel display-flyout__selector-panel--${selector.id} display-flyout__selector-panel--${selector.accent}`,
    'aria-label': selector.title
  });
  const grid = createElement('div', { className: 'display-flyout__selector-grid' });
  selector.items.forEach((item) => grid.append(createDisplayListItem(item, selector.id)));
  panel.append(createDisplaySectionHeader(selector), grid);
  return panel;
};

const createDisplayBrandCard = (item) => {
  const button = createElement('button', {
    type: 'button',
    className: `display-flyout__brand-card${item.rail ? ' display-flyout__brand-card--rail' : ''}`,
    'aria-label': item.name
  });
  button.dataset.demoAction = '';
  button.append(createElement('img', {
    className: 'display-flyout__brand-logo',
    src: item.logo,
    alt: '',
    width: item.rail ? '96' : '240',
    height: item.rail ? '96' : '80',
    loading: 'eager',
    decoding: 'async'
  }));
  if (item.submark) button.append(createElement('span', { className: 'display-flyout__brand-submark', text: item.submark }));
  if (!item.rail) button.append(createDisplayArrow());
  return button;
};

const createDisplaySpecificationPanel = (specification) => {
  const panel = createElement('section', {
    className: `display-flyout__spec-panel display-flyout__spec-panel--${specification.id} display-flyout__spec-panel--${specification.accent}`,
    'aria-label': specification.title
  });
  const list = createElement('div', { className: 'display-flyout__spec-list' });
  specification.items.forEach((item) => list.append(createDisplayListItem(item, 'specification')));
  panel.append(createDisplaySectionHeader(specification), list);
  return panel;
};

const createDisplaySpecialtyCard = (item) => {
  const button = createElement('button', {
    type: 'button',
    className: `display-flyout__specialty-card display-flyout__specialty-card--${item.id}`,
    'aria-label': item.label
  });
  button.dataset.demoAction = '';
  button.append(
    createIcon(item.icon),
    createDisplayLabel(item.lines, 'display-flyout__specialty-label'),
    createDisplayArrow()
  );
  return button;
};

const renderDisplayFlyout = (flyoutData) => {
  const shell = createElement('div', { className: 'display-flyout' });

  const useCases = createElement('section', {
    className: 'display-flyout__use-cases',
    'aria-label': 'Nhu cầu sử dụng màn hình'
  });
  flyoutData.useCases.forEach((item) => useCases.append(createDisplayUseCaseCard(item)));

  const selectors = createElement('section', {
    className: 'display-flyout__selectors',
    'aria-label': 'Kích thước và phân khúc giá'
  });
  flyoutData.selectors.forEach((selector) => selectors.append(createDisplaySelectorPanel(selector)));

  const brands = createElement('section', {
    className: 'display-flyout__brands',
    'aria-label': 'Thương hiệu màn hình'
  });
  brands.append(createDisplaySectionHeader({ title: 'THƯƠNG HIỆU', icon: 'fa-solid fa-desktop', accent: 'blue' }));
  const brandGrid = createElement('div', { className: 'display-flyout__brand-grid' });
  const brandCards = createElement('div', { className: 'display-flyout__brand-cards' });
  const brandRail = createElement('div', { className: 'display-flyout__brand-rail', 'aria-label': 'Thương hiệu bổ sung' });
  flyoutData.brands.forEach((item) => {
    if (item.rail) brandRail.append(createDisplayBrandCard(item));
    else brandCards.append(createDisplayBrandCard(item));
  });
  brandGrid.append(brandCards, brandRail);
  brands.append(brandGrid);

  const specifications = createElement('section', {
    className: 'display-flyout__specifications',
    'aria-label': 'Thông số hiển thị'
  });
  flyoutData.specifications.forEach((specification) => specifications.append(createDisplaySpecificationPanel(specification)));

  const specialties = createElement('section', {
    className: 'display-flyout__specialties',
    'aria-label': 'Màn hình chuyên biệt'
  });
  specialties.append(createDisplaySectionHeader({ title: 'MÀN HÌNH CHUYÊN BIỆT', icon: 'fa-solid fa-award', accent: 'purple' }));
  const specialtyGrid = createElement('div', { className: 'display-flyout__specialty-grid' });
  flyoutData.specialties.forEach((item) => specialtyGrid.append(createDisplaySpecialtyCard(item)));
  specialties.append(specialtyGrid);

  shell.append(useCases, selectors, brands, specifications, specialties);
  return shell;
};

const createLaptopSectionHeader = ({ title, subtitle, icon, variant }) => {
  const heading = createElement('div', {
    className: `laptop-flyout__section-heading laptop-flyout__section-heading--${variant}`
  });
  const copy = createElement('div', { className: 'laptop-flyout__section-copy' });
  copy.append(
    createElement('h3', { text: title }),
    createElement('p', { text: subtitle })
  );
  heading.append(createIcon(icon), copy);
  return heading;
};

const createLaptopLineLabel = (lines, className = 'laptop-flyout__card-label') => {
  const label = createElement('span', { className });
  lines.forEach((line) => label.append(createElement('span', { text: line })));
  return label;
};

const createLaptopNeedCard = (item) => {
  const button = createElement('button', {
    type: 'button',
    className: `laptop-flyout__need-card laptop-flyout__need-card--${item.accent}`,
    'aria-label': item.label
  });
  button.dataset.demoAction = '';
  button.append(
    createElement('img', {
      className: 'laptop-flyout__need-image',
      src: item.image,
      alt: '',
      width: '480',
      height: '320',
      loading: 'eager',
      decoding: 'async'
    }),
    createLaptopLineLabel(item.lines, 'laptop-flyout__need-label')
  );
  const arrow = createElement('span', { className: 'laptop-flyout__card-arrow', 'aria-hidden': 'true' });
  arrow.append(createIcon('fa-solid fa-chevron-right'));
  button.append(arrow);
  return button;
};

const createLaptopProcessorMark = (item) => {
  const mark = createElement('span', {
    className: `laptop-flyout__processor-mark laptop-flyout__processor-mark--${item.brand}`,
    'aria-hidden': 'true'
  });
  if (item.brand === 'intel') {
    mark.append(createElement('span', { className: 'laptop-flyout__processor-brand', text: 'intel' }));
    item.series.forEach((line) => mark.append(createElement('span', { className: 'laptop-flyout__processor-line', text: line })));
  } else {
    mark.append(
      createElement('span', { className: 'laptop-flyout__processor-brand', text: 'AMD' }),
      createElement('span', { className: 'laptop-flyout__processor-line', text: item.series[0] }),
      createElement('span', { className: 'laptop-flyout__processor-tier', text: item.tier })
    );
  }
  return mark;
};

const createLaptopFilterCard = (item, variant) => {
  const button = createElement('button', {
    type: 'button',
    className: `laptop-flyout__filter-card laptop-flyout__filter-card--${variant}`,
    'aria-label': item.label
  });
  button.dataset.demoAction = '';
  const visual = variant === 'processors'
    ? createLaptopProcessorMark(item)
    : createIcon(item.icon);
  const label = createLaptopLineLabel(item.lines || [item.label]);
  const arrow = createElement('span', { className: 'laptop-flyout__card-arrow', 'aria-hidden': 'true' });
  arrow.append(createIcon('fa-solid fa-chevron-right'));
  button.append(visual, label, arrow);
  return button;
};

const renderLaptopFlyout = (flyoutData) => {
  const shell = createElement('div', { className: 'laptop-flyout' });

  const needs = createElement('section', {
    className: 'laptop-flyout__section laptop-flyout__section--needs',
    'aria-label': flyoutData.needsTitle
  });
  const needsGrid = createElement('div', { className: 'laptop-flyout__need-grid' });
  flyoutData.needs.forEach((item) => needsGrid.append(createLaptopNeedCard(item)));
  needs.append(
    createLaptopSectionHeader({
      title: flyoutData.needsTitle,
      subtitle: flyoutData.needsSubtitle,
      icon: flyoutData.needsIcon,
      variant: 'needs'
    }),
    needsGrid
  );

  const criteria = createElement('div', { className: 'laptop-flyout__criteria' });
  const prices = createElement('section', {
    className: 'laptop-flyout__section laptop-flyout__section--prices',
    'aria-label': flyoutData.pricesTitle
  });
  const priceGrid = createElement('div', { className: 'laptop-flyout__filter-grid laptop-flyout__filter-grid--prices' });
  flyoutData.prices.forEach((item) => priceGrid.append(createLaptopFilterCard(item, 'prices')));
  prices.append(
    createLaptopSectionHeader({
      title: flyoutData.pricesTitle,
      subtitle: flyoutData.pricesSubtitle,
      icon: flyoutData.pricesIcon,
      variant: 'prices'
    }),
    priceGrid
  );

  const processors = createElement('section', {
    className: 'laptop-flyout__section laptop-flyout__section--processors',
    'aria-label': flyoutData.processorsTitle
  });
  const processorGrid = createElement('div', { className: 'laptop-flyout__filter-grid laptop-flyout__filter-grid--processors' });
  flyoutData.processors.forEach((item) => processorGrid.append(createLaptopFilterCard(item, 'processors')));
  processors.append(
    createLaptopSectionHeader({
      title: flyoutData.processorsTitle,
      subtitle: flyoutData.processorsSubtitle,
      icon: flyoutData.processorsIcon,
      variant: 'processors'
    }),
    processorGrid
  );
  criteria.append(prices, processors);

  const screens = createElement('section', {
    className: 'laptop-flyout__section laptop-flyout__section--screens',
    'aria-label': flyoutData.screensTitle
  });
  const screenGrid = createElement('div', { className: 'laptop-flyout__filter-grid laptop-flyout__filter-grid--screens' });
  flyoutData.screens.forEach((item) => screenGrid.append(createLaptopFilterCard(item, 'screens')));
  screens.append(
    createLaptopSectionHeader({
      title: flyoutData.screensTitle,
      subtitle: flyoutData.screensSubtitle,
      icon: flyoutData.screensIcon,
      variant: 'screens'
    }),
    screenGrid
  );

  shell.append(needs, criteria, screens);
  return shell;
};

const createKeyboardFlyoutItem = (item, variant) => {
  const button = createElement('button', {
    type: 'button',
    className: `keyboard-flyout__item keyboard-flyout__item--${variant}`,
    'aria-label': item.name
  });
  button.dataset.demoAction = '';

  if (item.logo) {
    button.append(createElement('img', {
      className: 'keyboard-flyout__brand-logo',
      src: item.logo,
      alt: '',
      width: '32',
      height: '32',
      loading: 'eager',
      decoding: 'async'
    }));
  } else if (item.image) {
    button.append(createElement('img', {
      className: 'keyboard-flyout__product-image',
      src: item.image,
      alt: '',
      width: '480',
      height: '320',
      loading: 'eager',
      decoding: 'async'
    }));
  } else {
    button.append(createIcon(item.icon));
  }

  button.append(
    createElement('span', { className: 'keyboard-flyout__item-label', text: item.name }),
    createIcon('fa-solid fa-chevron-right')
  );
  return button;
};

const createKeyboardFlyoutSection = ({ title, icon, items, variant }) => {
  const section = createElement('section', {
    className: `keyboard-flyout__section keyboard-flyout__section--${variant}`,
    'aria-label': title
  });
  const heading = createElement('h3', { className: 'keyboard-flyout__section-title' });
  if (icon) heading.append(createIcon(icon));
  heading.append(createElement('span', { text: title }));
  const list = createElement('div', { className: 'keyboard-flyout__list' });
  items.forEach((item) => list.append(createKeyboardFlyoutItem(item, variant)));
  section.append(heading, list);
  return section;
};

const createKeyboardAccessories = (items) => {
  const section = createElement('section', {
    className: 'keyboard-flyout__accessories',
    'aria-label': 'Phụ kiện bàn phím'
  });
  const heading = createElement('h3', { className: 'keyboard-flyout__accessories-title' });
  heading.append(
    createIcon('fa-solid fa-gift'),
    createElement('span', { text: 'PHỤ KIỆN BÀN PHÍM' }),
    createElement('span', { className: 'keyboard-flyout__title-line', 'aria-hidden': 'true' })
  );
  const grid = createElement('div', { className: 'keyboard-flyout__accessory-grid' });
  items.forEach((item) => {
    const button = createElement('button', {
      type: 'button',
      className: 'keyboard-flyout__accessory-card',
      'aria-label': item.name
    });
    button.dataset.demoAction = '';
    button.append(
      createElement('img', {
        src: item.image,
        alt: '',
        width: '480',
        height: '320',
        loading: 'eager',
        decoding: 'async'
      }),
      createElement('span', { className: 'keyboard-flyout__accessory-label', text: item.name })
    );
    const arrow = createElement('span', { className: 'keyboard-flyout__accessory-arrow', 'aria-hidden': 'true' });
    arrow.append(createIcon('fa-solid fa-chevron-right'));
    button.append(arrow);
    grid.append(button);
  });
  section.append(heading, grid);
  return section;
};

const renderKeyboardFlyout = (flyoutData) => {
  const shell = createElement('div', { className: 'keyboard-flyout' });
  const taxonomy = createElement('div', { className: 'keyboard-flyout__taxonomy' });
  taxonomy.append(
    createKeyboardFlyoutSection({
      title: 'THƯƠNG HIỆU BÀN PHÍM',
      icon: 'fa-solid fa-shield-halved',
      items: flyoutData.brands,
      variant: 'brands'
    }),
    createKeyboardFlyoutSection({
      title: 'LOẠI BÀN PHÍM',
      icon: 'fa-solid fa-keyboard',
      items: flyoutData.types,
      variant: 'types'
    }),
    createKeyboardFlyoutSection({
      title: 'PHÂN KHÚC GIÁ',
      icon: 'fa-solid fa-tags',
      items: flyoutData.prices,
      variant: 'prices'
    })
  );

  const details = createElement('div', { className: 'keyboard-flyout__details' });
  details.append(
    createKeyboardFlyoutSection({
      title: 'CỔNG KẾT NỐI',
      icon: 'fa-solid fa-plug',
      items: flyoutData.connections,
      variant: 'connections'
    }),
    createKeyboardFlyoutSection({
      title: 'TÍNH NĂNG ĐẶC BIỆT',
      icon: null,
      items: flyoutData.features,
      variant: 'features'
    })
  );
  taxonomy.append(details);
  shell.append(taxonomy, createKeyboardAccessories(flyoutData.accessories));
  return shell;
};

const createAppleNavigationItem = (item) => {
  const button = createElement('button', {
    type: 'button',
    className: `apple-flyout__navigation-item apple-flyout__navigation-item--${item.id}`,
    'aria-label': item.name
  });
  button.dataset.demoAction = '';
  button.append(
    createIcon(item.icon),
    createElement('span', { text: item.name }),
    createIcon('fa-solid fa-chevron-down')
  );
  return button;
};

const createAppleFamilyHeader = ({ title, icon, variant }) => {
  const heading = createElement('h3', {
    className: `apple-flyout__family-title apple-flyout__family-title--${variant}`
  });
  heading.append(createIcon(icon), createElement('span', { text: title }));
  return heading;
};

const createAppleProductRow = (item, variant) => {
  const button = createElement('button', {
    type: 'button',
    className: `apple-flyout__product-row apple-flyout__product-row--${variant}`,
    'aria-label': item.name
  });
  button.dataset.demoAction = '';
  button.append(
    createElement('img', {
      className: 'apple-flyout__product-image',
      src: item.image,
      alt: '',
      width: '480',
      height: '320',
      loading: 'eager',
      decoding: 'async'
    }),
    createElement('span', { className: 'apple-flyout__product-label', text: item.name }),
    createIcon('fa-solid fa-chevron-right')
  );
  return button;
};

const createAppleFamilySection = ({ title, icon, items, variant }) => {
  const section = createElement('section', {
    className: `apple-flyout__family apple-flyout__family--${variant}`,
    'aria-label': title
  });
  const list = createElement('div', { className: 'apple-flyout__product-list' });
  items.forEach((item) => list.append(createAppleProductRow(item, variant)));
  section.append(createAppleFamilyHeader({ title, icon, variant }), list);
  return section;
};

const createAppleHero = (heroData) => {
  const section = createElement('section', {
    className: 'apple-flyout__hero',
    'aria-label': 'Thông tin thương hiệu Apple'
  });
  const copy = createElement('div', { className: 'apple-flyout__hero-copy' });
  copy.append(
    createIcon('fa-brands fa-apple'),
    createElement('h2', { text: heroData.title }),
    createElement('p', { text: heroData.subtitle })
  );

  const media = createElement('div', {
    className: 'apple-flyout__hero-media',
    'aria-hidden': 'true'
  });
  heroData.media.forEach((item) => {
    media.append(createElement('img', {
      className: `apple-flyout__hero-image apple-flyout__hero-image--${item.position}`,
      src: item.image,
      alt: '',
      width: '480',
      height: '320',
      loading: 'eager',
      decoding: 'async'
    }));
  });

  const proofs = createElement('ul', { className: 'apple-flyout__proof-list' });
  heroData.proofs.forEach((proof) => {
    const item = createElement('li', { className: 'apple-flyout__proof' });
    const proofCopy = createElement('span', { className: 'apple-flyout__proof-copy' });
    proofCopy.append(
      createElement('strong', { text: proof.title }),
      createElement('small', { text: proof.description })
    );
    item.append(
      createIcon(proof.icon),
      proofCopy
    );
    proofs.append(item);
  });

  section.append(copy, media, proofs);
  return section;
};

const renderAppleFlyout = (flyoutData) => {
  const shell = createElement('div', { className: 'apple-flyout' });
  const navigation = createElement('nav', {
    className: 'apple-flyout__navigation',
    'aria-label': 'Danh mục sản phẩm Apple'
  });
  flyoutData.navigation.forEach((item) => navigation.append(createAppleNavigationItem(item)));

  const panel = createElement('div', { className: 'apple-flyout__panel' });
  panel.append(
    createAppleHero(flyoutData.hero),
    createAppleFamilySection({ ...flyoutData.mac, variant: 'mac' }),
    createAppleFamilySection({ ...flyoutData.iphone, variant: 'iphone' }),
    createAppleFamilySection({ ...flyoutData.ipad, variant: 'ipad' })
  );

  const watchColumn = createElement('section', {
    className: 'apple-flyout__watch-column',
    'aria-label': 'Watch và phụ kiện Apple'
  });
  watchColumn.append(
    createAppleFamilySection({ ...flyoutData.watch, variant: 'watch' }),
    createElement('div', { className: 'apple-flyout__column-divider', 'aria-hidden': 'true' }),
    createAppleFamilySection({ ...flyoutData.accessories, variant: 'accessories' })
  );
  panel.append(watchColumn);
  shell.append(navigation, panel);
  return shell;
};

const createFlyoutLines = (item, className) => {
  const lines = item.lines || [item.label || item.name || ''];
  const copy = createElement('span', { className });
  lines.forEach((line) => copy.append(createElement('span', { text: line })));
  return copy;
};

const createFlyoutArrow = () => createElement('i', {
  className: 'fa-solid fa-chevron-right flyout-card__arrow',
  'aria-hidden': 'true'
});

const createFlyoutAction = (item, className, options = {}) => {
  const action = createElement('button', {
    className,
    type: 'button',
    'aria-label': item.label || item.name || ''
  });
  action.dataset.demoAction = '';

  if (item.image) {
    action.append(createElement('img', {
      className: options.imageClass || 'flyout-card__image',
      src: item.image,
      alt: '',
      width: '480',
      height: '320',
      loading: options.loading || 'lazy',
      decoding: 'async'
    }));
  } else if (item.logo) {
    action.append(createElement('img', {
      className: 'flyout-card__logo',
      src: item.logo,
      alt: '',
      width: '240',
      height: '80',
      loading: 'lazy',
      decoding: 'async'
    }));
  } else if (item.icon) {
    action.append(createIcon(item.icon));
  } else if (item.wordmark) {
    action.append(createElement('span', { className: 'flyout-card__wordmark', text: item.name || item.label }));
  }

  if (options.showLabel !== false) {
    action.append(createFlyoutLines(item, options.labelClass || 'flyout-card__label'));
  }
  if (options.showArrow !== false) action.append(createFlyoutArrow());
  return action;
};

const createShowcaseSection = (sectionData, options = {}) => {
  const section = createElement('section', {
    className: `showcase-section showcase-section--${sectionData.id} showcase-section--${sectionData.accent || 'blue'} showcase-section--${sectionData.presentation || 'list'} showcase-section--${sectionData.density || 'regular'}`,
    'data-rows': String(sectionData.items.length),
    'aria-labelledby': `showcase-section-title-${sectionData.id}`
  });
  const heading = createElement('h3', {
    className: 'showcase-section__heading',
    id: `showcase-section-title-${sectionData.id}`
  });
  heading.append(createIcon(sectionData.icon), createElement('span', { text: sectionData.title }));

  const list = createElement('div', { className: 'showcase-section__list' });
  sectionData.items.forEach((item) => {
    const itemClass = sectionData.presentation === 'media'
      ? 'showcase-media-card'
      : sectionData.presentation === 'logo'
        ? 'showcase-logo-card'
        : 'showcase-list-card';
    list.append(createFlyoutAction(item, itemClass, {
      labelClass: sectionData.presentation === 'media' ? 'flyout-card__label' : 'flyout-card__label',
      showLabel: true,
      imageClass: options.imageClass
    }));
  });
  section.append(heading, list);
  return section;
};

const renderMediaColumnsFlyout = (flyoutData) => {
  const shell = createElement('div', {
    className: `media-columns-flyout media-columns-flyout--${flyoutData.variant}`,
    'aria-label': 'Danh mục sản phẩm'
  });
  flyoutData.columns.forEach((column, index) => {
    const columnElement = createElement('div', {
      className: `media-columns-flyout__column media-columns-flyout__column--${index + 1}`
    });
    column.sections.forEach((sectionData) => columnElement.append(createShowcaseSection(sectionData)));
    shell.append(columnElement);
  });
  return shell;
};

const renderTaxonomyColumnsFlyout = (flyoutData) => {
  const shell = createElement('div', {
    className: `taxonomy-columns-flyout taxonomy-columns-flyout--${flyoutData.variant}`,
    'aria-label': 'Danh mục sản phẩm'
  });
  flyoutData.columns.forEach((column, index) => {
    const columnElement = createElement('div', {
      className: `taxonomy-columns-flyout__column taxonomy-columns-flyout__column--${index + 1}`
    });
    column.sections.forEach((sectionData) => columnElement.append(createShowcaseSection(sectionData)));
    shell.append(columnElement);
  });
  return shell;
};

const renderMouseFlyout = (flyoutData) => {
  const shell = createElement('div', { className: 'mouse-flyout', 'aria-label': 'Danh mục Chuột' });
  const types = createElement('section', { className: 'mouse-flyout__types' });
  types.append(createElement('h3', { className: 'mouse-flyout__heading', text: 'LOẠI CHUỘT' }));
  const typeGrid = createElement('div', { className: 'mouse-flyout__type-grid' });
  flyoutData.types.forEach((item) => typeGrid.append(createFlyoutAction(item, 'mouse-flyout__type-card')));
  types.append(typeGrid);

  const filters = createElement('div', { className: 'mouse-flyout__filters' });
  [
    ['prices', 'GIÁ', 'green', 'fa-solid fa-coins'],
    ['features', 'TÍNH NĂNG', 'orange', 'fa-solid fa-star']
  ].forEach(([key, title, accent, icon]) => {
    const panel = createElement('section', { className: `mouse-flyout__filter-panel mouse-flyout__filter-panel--${accent}` });
    const heading = createElement('h3', { className: 'mouse-flyout__heading' });
    heading.append(createIcon(icon), createElement('span', { text: title }));
    const grid = createElement('div', { className: 'mouse-flyout__filter-grid' });
    flyoutData[key].forEach((item) => grid.append(createFlyoutAction(item, 'mouse-flyout__filter-card')));
    panel.append(heading, grid);
    filters.append(panel);
  });

  const brands = createElement('section', { className: 'mouse-flyout__brands' });
  const brandHeading = createElement('h3', { className: 'mouse-flyout__heading' });
  brandHeading.append(createIcon('fa-solid fa-tags'), createElement('span', { text: 'THƯƠNG HIỆU' }));
  const brandGrid = createElement('div', { className: 'mouse-flyout__brand-grid' });
  flyoutData.brands.forEach((item) => brandGrid.append(createFlyoutAction(item, 'mouse-flyout__brand-card')));
  brands.append(brandHeading, brandGrid);

  const accessories = createElement('section', { className: 'mouse-flyout__accessories' });
  const accessoryHeading = createElement('h3', { className: 'mouse-flyout__heading' });
  accessoryHeading.append(createIcon('fa-solid fa-bag-shopping'), createElement('span', { text: 'PHỤ KIỆN CHUỘT' }));
  const accessoryGrid = createElement('div', { className: 'mouse-flyout__accessory-grid' });
  flyoutData.accessories.forEach((item) => accessoryGrid.append(createFlyoutAction(item, 'mouse-flyout__accessory-card')));
  accessories.append(accessoryHeading, accessoryGrid);

  shell.append(types, filters, brands, accessories);
  return shell;
};

const renderBusinessFlyout = (flyoutData) => {
  const shell = createElement('div', { className: 'business-flyout', 'aria-label': 'Danh mục Dành Cho Doanh Nghiệp' });
  const navigation = createElement('nav', { className: 'business-flyout__navigation', 'aria-label': 'Dịch vụ doanh nghiệp' });
  flyoutData.navigation.forEach((item) => {
    const action = createFlyoutAction(item, `business-flyout__nav-item business-flyout__nav-item--${item.accent}`, { showArrow: true });
    navigation.append(action);
  });
  const columns = createElement('div', { className: 'business-flyout__columns' });
  flyoutData.columns.forEach((column) => {
    const panel = createElement('section', { className: `business-flyout__panel business-flyout__panel--${column.accent}` });
    const heading = createElement('header', { className: 'business-flyout__panel-heading' });
    heading.append(createIcon(column.icon), createElement('div', { className: 'business-flyout__panel-copy' }));
    const copy = heading.querySelector('.business-flyout__panel-copy');
    copy.append(createElement('strong', { text: column.title }));
    if (column.subtitle) copy.append(createElement('small', { text: column.subtitle }));
    const list = createElement('div', { className: 'business-flyout__list' });
    column.items.forEach((item) => list.append(createFlyoutAction(item, 'business-flyout__item')));
    panel.append(heading, list);
    columns.append(panel);
  });
  shell.append(navigation, columns);
  return shell;
};

function initSnapCarousel(root) {
  const viewport = root.querySelector('[data-snap-viewport]');
  const track = root.querySelector('[data-carousel-track]');
  const previous = root.querySelector('[data-carousel-prev]');
  const next = root.querySelector('[data-carousel-next]');
  const status = root.querySelector('[data-carousel-status]');

  if (!(viewport instanceof HTMLElement) || !(track instanceof HTMLElement)) return null;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let syncFrame = null;

  root.setAttribute('aria-roledescription', 'carousel');

  const getMetrics = () => {
    const firstCard = track.firstElementChild;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = firstCard instanceof HTMLElement
      ? firstCard.getBoundingClientRect().width + gap
      : viewport.clientWidth;

    return {
      maxScroll: Math.max(0, viewport.scrollWidth - viewport.clientWidth),
      step: Math.max(1, step),
    };
  };

  const sync = () => {
    syncFrame = null;
    const { maxScroll, step } = getMetrics();
    const current = Math.min(maxScroll, Math.max(0, viewport.scrollLeft));
    const activeCard = Math.min(track.children.length, Math.round(current / step) + 1);
    const edgeTolerance = 2;

    if (previous instanceof HTMLButtonElement) previous.disabled = current <= edgeTolerance;
    if (next instanceof HTMLButtonElement) next.disabled = current >= maxScroll - edgeTolerance;
    if (status) status.textContent = `Khuyến mại ${activeCard} trên ${track.children.length}`;
  };

  const queueSync = () => {
    if (syncFrame !== null) return;
    syncFrame = window.requestAnimationFrame(sync);
  };

  const move = (direction) => {
    const { maxScroll, step } = getMetrics();
    const target = Math.min(maxScroll, Math.max(0, viewport.scrollLeft + (step * direction)));
    viewport.scrollTo({
      left: target,
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
  };

  const movePrevious = () => move(-1);
  const moveNext = () => move(1);
  const handleKeydown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
  };

  previous?.addEventListener('click', movePrevious);
  next?.addEventListener('click', moveNext);
  viewport.addEventListener('scroll', queueSync, { passive: true });
  viewport.addEventListener('keydown', handleKeydown);

  const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(queueSync) : null;
  resizeObserver?.observe(viewport);
  resizeObserver?.observe(track);
  sync();

  return Object.freeze({
    refresh: sync,
    destroy() {
      previous?.removeEventListener('click', movePrevious);
      next?.removeEventListener('click', moveNext);
      viewport.removeEventListener('scroll', queueSync);
      viewport.removeEventListener('keydown', handleKeydown);
      resizeObserver?.disconnect();
      if (syncFrame !== null) window.cancelAnimationFrame(syncFrame);
    },
  });
}

function initGatewayMenu(carouselController) {
  const root = document.getElementById('gateway');
  const list = document.getElementById('gatewayCategoryList');
  const flyout = document.getElementById('gatewayFlyout');
  const flyoutHead = flyout?.querySelector('.gateway-flyout__head');
  const title = document.getElementById('gatewayFlyoutTitle');
  const content = document.getElementById('gatewayFlyoutContent');
  const closeButton = flyout?.querySelector('[data-gateway-close]');

  if (!root || !list || !flyout || !title || !content) return;

  flyout.setAttribute('role', 'region');
  flyout.setAttribute('aria-label', 'Danh mục sản phẩm');

  const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  let activeCategoryId = null;
  let pinned = false;
  let openTimer = null;
  let closeTimer = null;
  let lastTrigger = null;
  let skipNextFocusOpen = false;

  const clearTimers = () => {
    if (openTimer !== null) window.clearTimeout(openTimer);
    if (closeTimer !== null) window.clearTimeout(closeTimer);
    openTimer = null;
    closeTimer = null;
  };

  const getButtons = () => [...list.querySelectorAll('[data-gateway-category]')];

  const syncButtons = () => {
    getButtons().forEach((button) => {
      const selected = !flyout.hidden && button.dataset.gatewayCategory === activeCategoryId;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-expanded', String(selected));
    });
  };

  const renderFlyout = (category) => {
    title.textContent = category.name;
    const flyoutType = category.flyout?.type;
    const displaySpecialized = flyoutType === 'display-showcase';
    const pcSpecialized = flyoutType === 'pc-showcase';
    const laptopSpecialized = flyoutType === 'laptop-showcase';
    const keyboardSpecialized = flyoutType === 'keyboard-showcase';
    const appleSpecialized = flyoutType === 'apple-showcase';
    const mouseSpecialized = flyoutType === 'mouse-showcase';
    const mediaColumnsSpecialized = flyoutType === 'media-columns-showcase';
    const taxonomyColumnsSpecialized = flyoutType === 'taxonomy-columns-showcase';
    const businessSpecialized = flyoutType === 'business-showcase';
    const specialized = displaySpecialized || pcSpecialized || laptopSpecialized || keyboardSpecialized || appleSpecialized
      || mouseSpecialized || mediaColumnsSpecialized || taxonomyColumnsSpecialized || businessSpecialized;
    flyout.classList.toggle('gateway-flyout--display', displaySpecialized);
    flyout.classList.toggle('gateway-flyout--pc', pcSpecialized);
    flyout.classList.toggle('gateway-flyout--laptop', laptopSpecialized);
    flyout.classList.toggle('gateway-flyout--keyboard', keyboardSpecialized);
    flyout.classList.toggle('gateway-flyout--apple', appleSpecialized);
    ['mice', 'headphones', 'speakers', 'gaming-consoles', 'printers', 'projectors', 'gpu', 'cpu', 'mainboard', 'ram', 'cooling', 'chairs', 'network', 'home-appliances', 'cameras', 'business']
      .forEach((modifier) => flyout.classList.toggle(`gateway-flyout--${modifier}`, category.id === modifier && specialized));
    flyout.setAttribute('aria-label', `Danh mục ${category.name}`);
    if (flyoutHead) flyoutHead.hidden = specialized;

    if (displaySpecialized) {
      content.replaceChildren(renderDisplayFlyout(category.flyout));
      return;
    }

    if (pcSpecialized) {
      content.replaceChildren(renderPcFlyout(category.flyout));
      return;
    }

    if (laptopSpecialized) {
      content.replaceChildren(renderLaptopFlyout(category.flyout));
      return;
    }

    if (appleSpecialized) {
      content.replaceChildren(renderAppleFlyout(category.flyout));
      return;
    }

    if (keyboardSpecialized) {
      content.replaceChildren(renderKeyboardFlyout(category.flyout));
      return;
    }

    if (mouseSpecialized) {
      content.replaceChildren(renderMouseFlyout(category.flyout));
      return;
    }

    if (mediaColumnsSpecialized) {
      content.replaceChildren(renderMediaColumnsFlyout(category.flyout));
      return;
    }

    if (taxonomyColumnsSpecialized) {
      content.replaceChildren(renderTaxonomyColumnsFlyout(category.flyout));
      return;
    }

    if (businessSpecialized) {
      content.replaceChildren(renderBusinessFlyout(category.flyout));
      return;
    }

    const fragment = document.createDocumentFragment();

    category.groups.forEach(([groupTitle, items]) => {
      const group = createElement('section', { className: 'gateway-flyout__group' });
      group.append(createElement('h3', { text: groupTitle }));
      const links = createElement('ul');
      items.forEach((item) => {
        const action = createElement('button', { type: 'button', text: item });
        action.dataset.demoAction = '';
        const listItem = createElement('li');
        listItem.append(action);
        links.append(listItem);
      });
      group.append(links);
      fragment.append(group);
    });

    const allProducts = createElement('button', {
      type: 'button',
      className: 'gateway-flyout__all',
      'aria-label': `Xem tất cả sản phẩm ${category.name}`
    });
    allProducts.dataset.demoAction = '';
    allProducts.append(
      createElement('span', { text: `Xem tất cả ${category.name}` }),
      createIcon('fa-solid fa-arrow-right')
    );
    fragment.append(allProducts);
    content.replaceChildren(fragment);
  };

  const openCategory = (category, { lock = false, focusFlyout = false, trigger = null } = {}) => {
    clearTimers();
    activeCategoryId = category.id;
    pinned = lock;
    lastTrigger = trigger || lastTrigger;
    renderFlyout(category);
    flyout.hidden = false;
    root.classList.add('has-open-flyout');
    root.classList.toggle('has-pinned-flyout', pinned);
    carouselController?.pause?.('gateway-menu', true);
    syncButtons();
    if (focusFlyout) content.querySelector('button')?.focus();
  };

  const closeFlyout = ({ restoreFocus = false } = {}) => {
    clearTimers();
    flyout.hidden = true;
    pinned = false;
    root.classList.remove('has-open-flyout', 'has-pinned-flyout');
    carouselController?.pause?.('gateway-menu', false);
    syncButtons();
    if (restoreFocus && lastTrigger instanceof HTMLElement) {
      if (document.activeElement !== lastTrigger) skipNextFocusOpen = true;
      lastTrigger.focus();
    }
  };

  const scheduleOpen = (category, trigger) => {
    if (!hoverQuery.matches || pinned) return;
    if (openTimer !== null) window.clearTimeout(openTimer);
    openTimer = window.setTimeout(() => openCategory(category, { trigger }), 120);
  };

  const scheduleClose = () => {
    if (pinned) return;
    if (closeTimer !== null) window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => closeFlyout(), 180);
  };

  const fragment = document.createDocumentFragment();
  categoryTree.forEach((category) => {
    const button = createElement('button', {
      type: 'button',
      className: 'gateway-category',
      'aria-controls': 'gatewayFlyout',
      'aria-expanded': 'false'
    });
    button.dataset.gatewayCategory = category.id;
    button.append(
      createIcon(category.icon),
      createElement('span', { text: category.name }),
      createIcon('fa-solid fa-chevron-right')
    );

    button.addEventListener('pointerenter', () => scheduleOpen(category, button));
    button.addEventListener('focus', () => {
      if (skipNextFocusOpen) {
        skipNextFocusOpen = false;
        return;
      }
      if (!pinned) openCategory(category, { trigger: button });
    });
    button.addEventListener('click', () => {
      if (!flyout.hidden && activeCategoryId === category.id && pinned) {
        closeFlyout({ restoreFocus: true });
        return;
      }
      openCategory(category, { lock: true, trigger: button });
    });
    button.addEventListener('keydown', (event) => {
      const buttons = getButtons();
      const index = buttons.indexOf(button);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        buttons[(index + direction + buttons.length) % buttons.length]?.focus();
      }
      if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCategory(category, { lock: true, focusFlyout: true, trigger: button });
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        closeFlyout({ restoreFocus: true });
      }
    });
    fragment.append(button);
  });
  list.replaceChildren(fragment);

  root.addEventListener('pointerenter', () => {
    if (closeTimer !== null) window.clearTimeout(closeTimer);
  });
  root.addEventListener('pointerleave', scheduleClose);
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget) && !pinned) scheduleClose();
  });
  flyout.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'ArrowLeft') {
      event.preventDefault();
      closeFlyout({ restoreFocus: true });
    }
  });
  closeButton?.addEventListener('click', () => closeFlyout({ restoreFocus: true }));
  document.addEventListener('pointerdown', (event) => {
    if (!flyout.hidden && !root.contains(event.target)) closeFlyout();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !flyout.hidden) closeFlyout({ restoreFocus: true });
  });
}

function initBrandExpander() {
  const grid = document.getElementById('brandsGrid');
  const overlay = document.getElementById('expandOverlay');
  const button = document.getElementById('expandBtn');
  if (!grid || !overlay || !button) return;
  button.addEventListener('click', () => {
    const expanded = grid.classList.toggle('expanded');
    button.classList.toggle('rotated', expanded);
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', expanded ? 'Thu gọn thương hiệu' : 'Xem thêm thương hiệu');
    overlay.classList.toggle('is-expanded', expanded);
  });
}

function initProductCollections() {
  const catalog = window.HacomCatalog;
  const renderer = window.HacomProductCards?.renderProductCard;
  if (!catalog || typeof renderer !== 'function') return;

  const collections = window.HacomGatewayData?.homepageCollections || {};
  document.querySelectorAll('[data-product-grid][data-collection]').forEach((grid) => {
    const skus = collections[grid.dataset.collection] || [];
    const fragment = document.createDocumentFragment();
    skus.forEach((sku, index) => {
      const product = catalog.getBySku(sku);
      if (!product) return;
      fragment.append(renderer(product, { variant: 'full', loading: index < 3 ? 'eager' : 'lazy' }));
    });
    grid.replaceChildren(fragment);
  });
}

function initCollectionTabs() {
  const tabs = [...document.querySelectorAll('[data-collection-tab]')];
  const grids = [...document.querySelectorAll('[data-product-grid][data-collection]')];
  if (!tabs.length || !grids.length) return;
  const setActive = (collection) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.collectionTab === collection;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    grids.filter((grid) => ['trending', 'new-arrivals'].includes(grid.dataset.collection)).forEach((grid) => {
      grid.classList.toggle('is-hidden', grid.dataset.collection !== collection);
    });
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => setActive(tab.dataset.collectionTab)));
  setActive(tabs[0].dataset.collectionTab);
}

function initShowroomFinder() {
  const data = window.HacomShowrooms;
  const cards = document.getElementById('showroomCards');
  const search = document.getElementById('showroomSearch');
  const form = document.getElementById('showroomSearchForm');
  const clear = document.getElementById('showroomClear');
  const status = document.getElementById('showroomResultsStatus');
  const empty = document.getElementById('showroomEmpty');
  const toggle = document.getElementById('showroomToggle');
  if (!data?.items?.length || !cards || !(search instanceof HTMLInputElement)) return;

  const regionLabels = { north: 'Miền Bắc', central: 'Miền Trung', south: 'Miền Nam' };
  const normalize = (value) => String(value || '').toLocaleLowerCase('vi-VN').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const phoneHref = (value) => `tel:${String(value || '').split('-')[0].replace(/[^\d+]/g, '')}`;
  const regionText = (region) => regionLabels[region] || 'Toàn quốc';
  const getLimit = () => {
    if (window.matchMedia?.('(min-width: 1181px)').matches) return 8;
    if (window.matchMedia?.('(min-width: 768px)').matches) return 6;
    return 4;
  };
  const getMatches = (state) => {
    const query = normalize(state.query);
    return data.items.filter((item) => {
      if (state.region !== 'all' && item.region !== state.region) return false;
      if (!query) return true;
      return normalize([item.name, item.province, item.address, item.email].join(' ')).includes(query);
    });
  };
  const renderCard = (item) => {
    const details = [
      item.warrantyPhone ? `<div><dt>Bảo hành</dt><dd>${escapeHtml(item.warrantyPhone)}</dd></div>` : '',
      item.email ? `<div><dt>Email showroom</dt><dd><a href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a></dd></div>` : '',
      item.lunchBreak ? `<div><dt>Nghỉ trưa</dt><dd>${escapeHtml(item.lunchBreak)}</dd></div>` : '',
      item.photoUrl ? `<a class="showroom-card__photo-link" href="${escapeHtml(item.photoUrl)}" target="_blank" rel="noopener noreferrer"><i class="fa-regular fa-image" aria-hidden="true"></i> Xem hình ảnh showroom</a>` : ''
    ].join('');
    return `<article class="showroom-card" data-showroom-card data-region="${escapeHtml(item.region)}">
      <div class="showroom-card__heading"><span class="showroom-card__number">${String(item.ordinal).padStart(2, '0')}</span><div><p>${escapeHtml(regionText(item.region))}</p><h3>${escapeHtml(item.name)}</h3></div></div>
      <div class="showroom-card__facts"><p><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>${escapeHtml(item.address)}</span></p><p><i class="fa-regular fa-clock" aria-hidden="true"></i><span>${escapeHtml(item.openHours)}</span></p><a href="${phoneHref(item.salesPhone)}"><i class="fa-solid fa-phone" aria-hidden="true"></i><span>${escapeHtml(item.salesPhone)}</span></a></div>
      <div class="showroom-card__actions"><a class="showroom-card__call" href="${phoneHref(item.salesPhone)}"><i class="fa-solid fa-phone" aria-hidden="true"></i> Gọi showroom</a><a href="${escapeHtml(item.mapUrl)}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-diamond-turn-right" aria-hidden="true"></i> Chỉ đường</a></div>
      <details><summary>Thông tin chi tiết <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary><dl>${details}</dl></details>
    </article>`;
  };
  const state = { query: '', region: 'all', expanded: false };
  const countNodes = [...document.querySelectorAll('[data-showroom-count]')];
  const regionButtons = [...document.querySelectorAll('[data-showroom-region]')];
  const reset = () => {
    state.query = '';
    state.region = 'all';
    state.expanded = false;
    search.value = '';
    render();
    search.focus();
  };
  const render = () => {
    const matches = getMatches(state);
    const limit = getLimit();
    const isFiltered = Boolean(state.query.trim()) || state.region !== 'all';
    const visible = state.expanded || isFiltered ? matches : matches.slice(0, limit);
    const fragment = document.createDocumentFragment();
    const wrapper = document.createElement('div');
    wrapper.insertAdjacentHTML('beforeend', visible.map(renderCard).join(''));
    while (wrapper.firstElementChild) fragment.append(wrapper.firstElementChild);
    cards.replaceChildren(fragment);
    countNodes.forEach((node) => { node.textContent = String(data.items.length); });
    regionButtons.forEach((button) => {
      const region = button.dataset.showroomRegion || 'all';
      const count = region === 'all' ? data.items.length : data.items.filter((item) => item.region === region).length;
      button.setAttribute('aria-pressed', String(state.region === region));
      const badge = button.querySelector('[data-showroom-region-count]');
      if (badge) badge.textContent = String(count);
    });
    const isEmpty = matches.length === 0;
    cards.hidden = isEmpty;
    if (empty) empty.hidden = !isEmpty;
    if (clear) clear.hidden = !state.query;
    if (status) status.textContent = isEmpty ? 'Không tìm thấy showroom phù hợp.' : `Hiển thị ${visible.length} trên ${matches.length} showroom${isFiltered ? ' phù hợp' : ''}.`;
    if (toggle) {
      const canExpand = !isFiltered && matches.length > limit;
      toggle.hidden = !canExpand;
      toggle.setAttribute('aria-expanded', String(state.expanded));
      const icon = document.createElement('i');
      icon.className = `fa-solid fa-arrow-${state.expanded ? 'up' : 'down'}`;
      icon.setAttribute('aria-hidden', 'true');
      toggle.replaceChildren(document.createTextNode(state.expanded ? 'Thu gọn danh sách ' : `Xem toàn bộ ${matches.length} showroom `), icon);
    }
  };

  search.addEventListener('input', () => { state.query = search.value; state.expanded = false; render(); });
  form?.addEventListener('submit', (event) => { event.preventDefault(); state.query = search.value; render(); });
  clear?.addEventListener('click', reset);
  regionButtons.forEach((button) => button.addEventListener('click', () => {
    state.region = button.dataset.showroomRegion || 'all';
    state.expanded = false;
    render();
  }));
  toggle?.addEventListener('click', () => { state.expanded = !state.expanded; render(); });
  document.querySelectorAll('[data-showroom-reset]').forEach((button) => button.addEventListener('click', reset));
  [window.matchMedia?.('(min-width: 768px)'), window.matchMedia?.('(min-width: 1181px)')].filter(Boolean).forEach((query) => query.addEventListener?.('change', render));
  render();
}

function initFormsAndActions() {
  document.querySelectorAll('input[type="search"]:not([data-showroom-search])').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      const query = input.value.trim();
      announce(query ? `Tìm kiếm demo cho “${query}”. Chức năng chưa kết nối dữ liệu.` : 'Hãy nhập từ khoá cần tìm.');
    });
  });
  const newsletter = document.getElementById('newsletterForm');
  const email = document.getElementById('newsletterEmail');
  const newsletterStatus = document.getElementById('newsletterStatus');
  newsletter?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!(email instanceof HTMLInputElement) || !email.validity.valid) {
      if (newsletterStatus) newsletterStatus.textContent = 'Hãy nhập địa chỉ email hợp lệ.';
      email?.focus();
      return;
    }
    if (newsletterStatus) newsletterStatus.textContent = 'Đã lưu email trong phiên bản demo; chưa có kết nối máy chủ.';
    newsletter.reset();
  });
  document.addEventListener('click', (event) => {
    const action = event.target.closest('[data-demo-action]');
    if (!(action instanceof HTMLElement)) return;
    announce(`“${action.textContent.trim() || action.getAttribute('aria-label')}” là chức năng demo và chưa có dữ liệu liên kết.`);
  });
}

function initHeaderPromoReveal() {
  const section = document.querySelector('.header-promo-showcase');
  if (!(section instanceof HTMLElement)) return null;

  section.classList.add('is-promo-ready');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (reducedMotion?.matches || typeof IntersectionObserver !== 'function') {
    section.classList.add('is-promo-visible');
    return null;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    section.classList.add('is-promo-visible');
    observer.disconnect();
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });

  observer.observe(section);
  return observer;
}

function initCustomerStoriesReveal() {
  const section = document.getElementById('customerStories');
  if (!(section instanceof HTMLElement)) return null;

  section.classList.add('is-customer-ready');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (reducedMotion?.matches || typeof IntersectionObserver !== 'function') {
    section.classList.add('is-customer-visible');
    return null;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    section.classList.add('is-customer-visible');
    observer.disconnect();
  }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });

  observer.observe(section);
  return observer;
}

function initCategorySpectrumReveal() {
  const section = document.getElementById('categories');
  if (!(section instanceof HTMLElement)) return null;

  section.classList.add('is-category-ready');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (reducedMotion?.matches || typeof IntersectionObserver !== 'function') {
    section.classList.add('is-category-visible');
    return null;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    section.classList.add('is-category-visible');
    observer.disconnect();
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });

  observer.observe(section);
  return observer;
}

function initDealsReveal() {
  const section = document.getElementById('deals');
  if (!(section instanceof HTMLElement)) return null;

  const carouselRoot = section.querySelector('[data-carousel-root]');
  if (carouselRoot instanceof HTMLElement) {
    carouselRoot.tabIndex = 0;
    carouselRoot.addEventListener('keydown', (event) => {
      if (event.target !== carouselRoot || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      const direction = event.key === 'ArrowLeft' ? 'prev' : 'next';
      const control = section.querySelector(`[data-carousel-${direction}]`);
      if (control instanceof HTMLButtonElement && !control.disabled) control.click();
    });
  }

  section.classList.add('is-deals-ready');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (reducedMotion?.matches || typeof IntersectionObserver !== 'function') {
    section.classList.add('is-deals-visible');
    return null;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    section.classList.add('is-deals-visible');
    observer.disconnect();
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });

  observer.observe(section);
  return observer;
}

document.addEventListener('DOMContentLoaded', () => {
  initResponsiveHeaderPanels();
  initMenu();
  initProductCollections();
  initCollectionTabs();
  initShowroomFinder();
  initHeaderPromoReveal();
  initCustomerStoriesReveal();
  initCategorySpectrumReveal();
  initDealsReveal();
  const initCarousel = window.HacomCarousel?.initInfiniteCarousel;
  const carouselControllers = new Map();
  document.querySelectorAll('[data-carousel-root]').forEach((root) => {
    const carouselVariant = root.dataset.carouselVariant;
    const controller = carouselVariant === 'snap'
      ? initSnapCarousel(root)
      : typeof initCarousel === 'function'
        ? initCarousel(root)
        : null;

    if (controller) carouselControllers.set(root, controller);
    if (!controller && carouselVariant !== 'snap') {
      console.error('Không thể khởi tạo carousel: assets/carousel.js chưa được tải.');
    }
  });
  initGatewayMenu(carouselControllers.get(document.getElementById('gatewayCarousel')));
  initBrandExpander();
  initFormsAndActions();
});
