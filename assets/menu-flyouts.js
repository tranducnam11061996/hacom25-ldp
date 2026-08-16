(() => {
  const freeze = (value) => Object.freeze(value);
  const slug = (value) => value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const rows = (values, icon = 'fa-solid fa-circle-dot') => freeze(values.map((value) => {
    if (typeof value === 'string') return { id: slug(value), label: value, icon };
    return { icon, ...value };
  }));

  const section = (id, title, accent, icon, items, options = {}) => ({
    id,
    title,
    accent,
    icon,
    presentation: options.presentation || 'list',
    density: options.density || 'regular',
    items: freeze(items),
    ...(options.lines ? { lines: options.lines } : {})
  });

  const media = (id, label, image, lines = null, icon = 'fa-solid fa-cube') => ({
    id,
    label,
    image,
    icon,
    ...(lines ? { lines } : {})
  });

  const logo = (id, name, path = null, extra = {}) => ({
    id,
    label: name,
    name,
    ...(path ? { logo: path } : { wordmark: true }),
    ...extra
  });

  const mediaPath = (category, group, id) => `assets/media/menu/${category}/${group}/${id}.webp`;

  const mouseFlyout = {
    type: 'mouse-showcase',
    types: rows([
      media('gaming', 'Chuột Gaming', mediaPath('mice', 'types', 'gaming'), null, 'fa-solid fa-gamepad'),
      media('office', 'Chuột Văn Phòng', mediaPath('mice', 'types', 'office'), null, 'fa-solid fa-briefcase'),
      media('wireless', 'Chuột Không Dây', mediaPath('mice', 'types', 'wireless'), null, 'fa-solid fa-wifi'),
      media('wired', 'Chuột Có Dây', mediaPath('mice', 'types', 'wired'), null, 'fa-solid fa-plug'),
      media('vertical', 'Chuột Vertical (Dọc)', mediaPath('mice', 'types', 'vertical'), null, 'fa-solid fa-hand'),
      media('silent', 'Chuột Silent (Êm)', mediaPath('mice', 'types', 'silent'), null, 'fa-solid fa-volume-xmark')
    ]),
    prices: rows(['<300K', '300K – 700K', '700K – 1.5TR', '1.5TR – 3TR', '>3TR'], 'fa-solid fa-coins'),
    features: rows([
      { label: 'DPI cao (tùy chỉnh)', icon: 'fa-solid fa-crosshairs' },
      { label: 'Led RGB', icon: 'fa-solid fa-lightbulb' },
      { label: 'Trọng lượng tùy chỉnh', icon: 'fa-solid fa-weight-hanging' },
      { label: 'Pin lâu / Sạc nhanh', icon: 'fa-solid fa-battery-full' },
      { label: 'Kết nối đa thiết bị', icon: 'fa-solid fa-mobile-screen-button' }
    ]),
    brands: rows([
      logo('logitech', 'Logitech', 'assets/media/menu/keyboard/brands/logitech.svg'),
      logo('razer', 'Razer', 'assets/media/menu/keyboard/brands/razer.svg'),
      logo('corsair', 'Corsair', 'assets/media/menu/keyboard/brands/corsair.svg'),
      logo('dareu', 'DAREU', 'assets/media/menu/keyboard/brands/dareu.svg'),
      logo('rapoo', 'Rapoo', null),
      logo('asus-rog', 'ASUS ROG', 'assets/media/menu/keyboard/brands/asus-rog.svg'),
      logo('steelseries', 'SteelSeries', 'assets/media/menu/keyboard/brands/steelseries.svg'),
      logo('hyperx', 'HyperX', null),
      logo('fuhlen', 'Fuhlen', 'assets/media/menu/keyboard/brands/fuhlen.svg')
    ]),
    accessories: rows([
      media('mouse-pad', 'Lót chuột', mediaPath('mice', 'accessories', 'mouse-pad'), null, 'fa-solid fa-square'),
      media('mouse-feet', 'Feet chuột', mediaPath('mice', 'accessories', 'mouse-feet'), null, 'fa-solid fa-circle'),
      media('grip-tape', 'Grip tape (miếng dán cầm chuột)', mediaPath('mice', 'accessories', 'grip-tape'), ['Grip tape', '(miếng dán cầm chuột)'], 'fa-solid fa-hand'),
      media('charging-hub', 'Cáp sạc / Hub chuột', mediaPath('mice', 'accessories', 'charging-hub'), ['Cáp sạc /', 'Hub chuột'], 'fa-solid fa-plug'),
      media('hub', 'Hub chuột', mediaPath('mice', 'accessories', 'hub'), null, 'fa-solid fa-usb')
    ])
  };

  const headphonesFlyout = {
    type: 'media-columns-showcase',
    variant: 'headphones',
    columns: [
      { sections: [section('types', 'CHỌN LOẠI', 'purple', 'fa-solid fa-headphones', [
        media('true-wireless', 'Tai nghe không dây (True Wireless)', mediaPath('headphones', 'types', 'true-wireless'), ['Tai nghe không dây', '(True Wireless)']),
        media('bluetooth-over-ear', 'Tai nghe Bluetooth chụp tai', mediaPath('headphones', 'types', 'bluetooth-over-ear'), ['Tai nghe Bluetooth', 'chụp tai']),
        media('wired', 'Tai nghe có dây', mediaPath('headphones', 'types', 'wired')),
        media('gaming', 'Tai nghe gaming', mediaPath('headphones', 'types', 'gaming')),
        media('in-ear', 'Tai nghe nhét tai (In-ear)', mediaPath('headphones', 'types', 'in-ear'), ['Tai nghe nhét tai', '(In-ear)']),
        media('over-ear', 'Tai nghe chụp tai (Over-ear)', mediaPath('headphones', 'types', 'over-ear'), ['Tai nghe chụp tai', '(Over-ear)']),
        media('business', 'Tai nghe doanh nhân (call center/headset)', mediaPath('headphones', 'types', 'business'), ['Tai nghe doanh nhân', '(call center/headset)'])
      ], { presentation: 'media', density: 'dense' })] },
      { sections: [section('brands', 'HÃNG', 'blue', 'fa-solid fa-star', [
        logo('sony', 'Sony'), logo('jbl', 'JBL'), logo('razer', 'Razer', 'assets/media/menu/keyboard/brands/razer.svg'),
      logo('logitech', 'Logitech', 'assets/media/menu/keyboard/brands/logitech.svg'), logo('hyperx', 'HyperX'), logo('sennheiser', 'Sennheiser'),
        logo('xiaomi', 'Xiaomi'), logo('apple-airpods', 'Apple (AirPods)', null, { icon: 'fa-brands fa-apple' }),
        logo('samsung-galaxy-buds', 'Samsung (Galaxy Buds)'), logo('asus', 'ASUS')
      ], { presentation: 'logo', density: 'dense' })] },
      { sections: [
        section('prices', 'CHỌN THEO GIÁ', 'green', 'fa-solid fa-tags', rows(['Dưới 300.000đ', '300.000đ – 700.000đ', '700.000đ – 1.500.000đ', '1.500.000đ – 3.000.000đ', 'Trên 3.000.000đ'], 'fa-solid fa-coins'), { density: 'compact' }),
        section('connections', 'CHỌN THEO KẾT NỐI', 'blue', 'fa-solid fa-bluetooth', rows(['Bluetooth', 'Có dây (3.5mm / Type-C / Lightning)', 'USB / Wireless Dongle (Gaming)'], 'fa-solid fa-plug'), { density: 'compact' })
      ] },
      { sections: [
        section('needs', 'CHỌN THEO NHU CẦU', 'orange', 'fa-solid fa-crosshairs', rows(['Nghe nhạc', 'Chơi game', 'Làm việc, học online', 'Thể thao, gym', 'Chống ồn chủ động (ANC)'], 'fa-solid fa-chevron-right'), { density: 'compact' }),
        section('accessories', 'PHỤ KIỆN', 'pink', 'fa-solid fa-gift', rows(['Giá đỡ / dock', 'Dây kết nối AUX / Type-C / Lightning', 'Hộp sạc / Case bảo vệ', 'Bộ chia âm thanh', 'Đệm tai / Mút tai nghe thay thế'], 'fa-solid fa-chevron-right'), { density: 'compact' })
      ] }
    ]
  };

  const speakersFlyout = {
    type: 'media-columns-showcase',
    variant: 'speakers',
    columns: [
      { sections: [section('types', 'THEO LOẠI', 'blue', 'fa-solid fa-grip', [
        media('bluetooth', 'Loa Bluetooth', mediaPath('speakers', 'types', 'bluetooth')),
        media('computer', 'Loa vi tính', mediaPath('speakers', 'types', 'computer')),
        media('soundbar', 'Loa soundbar (TV)', mediaPath('speakers', 'types', 'soundbar')),
        media('portable-outdoor', 'Loa di động, loa outdoor', mediaPath('speakers', 'types', 'portable-outdoor'), ['Loa di động,', 'loa outdoor']),
        media('karaoke', 'Loa karaoke', mediaPath('speakers', 'types', 'karaoke')),
        media('mini', 'Loa mini/loa xách tay', mediaPath('speakers', 'types', 'mini'), ['Loa mini/', 'loa xách tay']),
        media('smart', 'Loa thông minh (Smart Speaker)', mediaPath('speakers', 'types', 'smart'), ['Loa thông minh', '(Smart Speaker)'])
      ], { presentation: 'media', density: 'dense' })] },
      { sections: [section('brands', 'THEO HÃNG', 'purple', 'fa-solid fa-star', [
        logo('jbl', 'JBL'), logo('sony', 'SONY'), logo('bose', 'BOSE'), logo('lg', 'LG'), logo('samsung', 'Samsung'),
        logo('harman-kardon', 'Harman Kardon'), logo('soundmax', 'SoundMax'), logo('edifier', 'Edifier'), logo('marshall', 'Marshall'), logo('xiaomi', 'Xiaomi')
      ], { presentation: 'logo', density: 'dense' })] },
      { sections: [
        section('prices', 'CHỌN THEO GIÁ', 'green', 'fa-solid fa-tags', rows(['Dưới 500.000đ', '500.000đ – 1.000.000đ', '1.000.000đ – 2.000.000đ', '2.000.000đ – 5.000.000đ', 'Trên 5.000.000đ'], 'fa-solid fa-coins'), { density: 'compact' }),
        section('connections', 'CHỌN THEO KẾT NỐI', 'blue', 'fa-solid fa-link', rows(['Bluetooth', 'Có dây (AUX/USB)', 'Wi-Fi', 'HDMI/Optical', 'Kết nối đa thiết bị (multi-device)'], 'fa-solid fa-plug'), { density: 'compact' })
      ] },
      { sections: [
        section('needs', 'CHỌN THEO NHU CẦU', 'orange', 'fa-solid fa-crosshairs', rows(['Nghe nhạc gia đình', 'Dành cho TV', 'Dành cho laptop/PC', 'Dễ mang theo (di động)', 'Dành cho tiệc ngoài trời', 'Dành cho phòng họp/giảng dạy'], 'fa-solid fa-chevron-right'), { density: 'compact' }),
        section('accessories', 'PHỤ KIỆN', 'pink', 'fa-solid fa-gift', rows(['Giá đỡ / dock', 'Dây kết nối AUX / Type-C / Lightning', 'Hộp sạc / Case bảo vệ', 'Bộ chia âm thanh', 'Đệm tai / Mút tai nghe thay thế'], 'fa-solid fa-chevron-right'), { density: 'compact' })
      ] }
    ]
  };

  const gamingFlyout = {
    type: 'media-columns-showcase',
    variant: 'gaming-consoles',
    columns: [
      { sections: [
        section('types', 'CHỌN LOẠI', 'blue', 'fa-solid fa-gamepad', [
          media('console', 'Máy chơi game console', mediaPath('gaming-consoles', 'types', 'console')),
          media('controllers', 'Tay cầm & phụ kiện chơi game', mediaPath('gaming-consoles', 'types', 'controllers'), ['Tay cầm & phụ kiện', 'chơi game']),
          media('handheld', 'Thiết bị cầm tay (handheld)', mediaPath('gaming-consoles', 'types', 'handheld')),
          media('retro', 'Máy chơi game retro (hoài cổ)', mediaPath('gaming-consoles', 'types', 'retro')),
          media('arcade', 'Máy chơi game mini / arcade', mediaPath('gaming-consoles', 'types', 'arcade')),
          media('gaming-pc', 'Gaming PC / Mini PC cho game', mediaPath('gaming-consoles', 'types', 'gaming-pc'), ['Gaming PC / Mini PC', 'cho game']),
          media('streaming', 'Thiết bị streaming (capture card)', mediaPath('gaming-consoles', 'types', 'streaming'))
        ], { presentation: 'media', density: 'dense' }),
        section('systems', 'CHỌN THEO HỆ MÁY', 'blue', 'fa-solid fa-computer', rows([
          { label: 'PlayStation 5 / PS5 Slim', icon: 'fa-brands fa-playstation' },
          { label: 'Xbox Series X / S', icon: 'fa-brands fa-xbox' },
          { label: 'Nintendo Switch / OLED / Lite', icon: 'fa-solid fa-gamepad' },
          { label: 'Steam Deck', icon: 'fa-brands fa-steam' },
          { label: 'PC Gaming', icon: 'fa-solid fa-desktop' }
        ]), { density: 'compact' })
      ] },
      { sections: [section('brands', 'HÃNG SẢN XUẤT', 'purple', 'fa-solid fa-star', [
        logo('sony', 'Sony (PlayStation)'), logo('microsoft', 'Microsoft (Xbox)'), logo('nintendo', 'Nintendo (Switch, 3DS...)'), logo('valve', 'Valve (Steam Deck)'),
        logo('asus-rog', 'ASUS ROG', 'assets/media/menu/keyboard/brands/asus-rog.svg'), logo('msi', 'MSI'), logo('logitech', 'Logitech', 'assets/media/menu/keyboard/brands/logitech.svg'), logo('8bitdo', '8BitDo'), logo('razer', 'Razer', 'assets/media/menu/keyboard/brands/razer.svg')
      ], { presentation: 'logo', density: 'dense' })] },
      { sections: [
        section('prices', 'CHỌN THEO GIÁ', 'green', 'fa-solid fa-tags', rows(['Dưới 5 triệu', '5 – 10 triệu', '10 – 15 triệu', '15 – 20 triệu', 'Trên 20 triệu'], 'fa-solid fa-coins'), { density: 'compact' }),
        section('digital', 'GAME & NỘI DUNG SỐ', 'teal', 'fa-solid fa-cloud', rows([
          { label: 'Game bản quyền (PlayStation, Xbox, Nintendo)', icon: 'fa-solid fa-gamepad', lines: ['Game bản quyền', '(PlayStation, Xbox, Nintendo)'] },
          { label: 'Gift card & nạp tiền eShop / PSN / Xbox Live', icon: 'fa-solid fa-credit-card', lines: ['Gift card & nạp tiền', 'eShop / PSN / Xbox Live'] },
          { label: 'Gói dịch vụ & thuê bao (PS Plus, Game Pass, Switch Online)', icon: 'fa-solid fa-gamepad', lines: ['Gói dịch vụ & thuê bao', '(PS Plus, Game Pass, Switch Online)'] }
        ]), { density: 'compact' })
      ] },
      { sections: [
        section('needs', 'CHỌN THEO NHU CẦU', 'orange', 'fa-solid fa-crosshairs', rows([
          { label: 'Chơi game tại nhà (console cố định)', icon: 'fa-solid fa-house', lines: ['Chơi game tại nhà', '(console cố định)'] },
          { label: 'Chơi game di động (handheld)', icon: 'fa-solid fa-gamepad', lines: ['Chơi game di động', '(handheld)'] },
          'Giải trí gia đình / nhóm bạn', 'Stream và chia sẻ nội dung', 'Phục vụ eSports / thi đấu'
        ]), { density: 'compact' }),
        section('accessories', 'PHỤ KIỆN & THIẾT BỊ LIÊN QUAN', 'pink', 'fa-solid fa-gift', rows([
          'Tay cầm, cần analog, joystick', 'Dock sạc & bộ sạc nhanh', 'Ốp bảo vệ & túi đựng máy',
          'Đĩa game, thẻ game, code bản quyền', 'Màn hình & tai nghe gaming', 'Ổ cứng mở rộng, thẻ nhớ SD'
        ]), { density: 'compact' })
      ] }
    ]
  };

  const printerFlyout = {
    type: 'media-columns-showcase',
    variant: 'printers',
    columns: [
      { sections: [section('types', 'CHỌN LOẠI', 'blue', 'fa-solid fa-grip', [
        media('inkjet', 'Máy in phun', mediaPath('printers', 'types', 'inkjet')), media('laser', 'Máy in laser', mediaPath('printers', 'types', 'laser')),
        media('multifunction', 'Máy in đa năng (in – scan – copy – fax)', mediaPath('printers', 'types', 'multifunction'), ['Máy in đa năng', '(in – scan – copy – fax)']),
        media('single-function', 'Máy in đơn năng', mediaPath('printers', 'types', 'single-function')), media('color', 'Máy in màu', mediaPath('printers', 'types', 'color')),
        media('mono', 'Máy in trắng đen', mediaPath('printers', 'types', 'mono')), media('receipt', 'Máy in hóa đơn / máy in bill', mediaPath('printers', 'types', 'receipt'), ['Máy in hóa đơn /', 'máy in bill']),
        media('barcode', 'Máy in mã vạch', mediaPath('printers', 'types', 'barcode')), media('photo', 'Máy in ảnh', mediaPath('printers', 'types', 'photo'))
      ], { presentation: 'media', density: 'dense' })] },
      { sections: [section('brands', 'HÃNG SẢN XUẤT', 'green', 'fa-solid fa-star', [logo('hp', 'HP'), logo('canon', 'Canon'), logo('brother', 'Brother'), logo('epson', 'Epson'), logo('fujifilm', 'FujiFilm'), logo('pantum', 'Pantum'), logo('ricoh', 'Ricoh'), logo('xerox', 'Xerox')], { presentation: 'logo', density: 'dense' })] },
      { sections: [section('prices', 'CHỌN THEO GIÁ', 'orange', 'fa-solid fa-tags', rows(['Dưới 2 triệu', '2 – 5 triệu', '5 – 10 triệu', 'Trên 10 triệu'], 'fa-solid fa-coins'), { density: 'compact' })] },
      { sections: [
        section('needs', 'CHỌN THEO NHU CẦU', 'purple', 'fa-solid fa-crosshairs', rows(['Cho văn phòng', 'Cho cá nhân / hộ gia đình', 'Cho cửa hàng bán lẻ', 'Cho studio / in ảnh', 'Dành cho sinh viên']), { density: 'compact' }),
        section('supplies', 'VẬT TƯ & PHỤ KIỆN', 'blue', 'fa-solid fa-cart-shopping', rows(['Mực in / hộp mực', 'Giấy in', 'Trống in / linh kiện thay thế', 'Cáp, adapter máy in']), { density: 'compact' })
      ] }
    ]
  };

  const projectorFlyout = {
    type: 'media-columns-showcase',
    variant: 'projectors',
    columns: [
      { sections: [section('types', 'CHỌN LOẠI', 'blue', 'fa-solid fa-grip', [
        media('office', 'Máy chiếu văn phòng', mediaPath('projectors', 'types', 'office')), media('school', 'Máy chiếu trường học', mediaPath('projectors', 'types', 'school')),
        media('home', 'Máy chiếu gia đình / giải trí', mediaPath('projectors', 'types', 'home'), ['Máy chiếu gia đình /', 'giải trí']), media('mini', 'Máy chiếu mini / di động', mediaPath('projectors', 'types', 'mini'), ['Máy chiếu mini /', 'di động']),
        media('interactive', 'Máy chiếu tương tác', mediaPath('projectors', 'types', 'interactive')), media('laser', 'Máy chiếu laser', mediaPath('projectors', 'types', 'laser')), media('4k', 'Máy chiếu 4K / Full HD', mediaPath('projectors', 'types', '4k'))
      ], { presentation: 'media', density: 'dense' })] },
      { sections: [section('brands', 'HÃNG SẢN XUẤT', 'green', 'fa-solid fa-star', [logo('epson', 'Epson'), logo('benq', 'BenQ'), logo('viewsonic', 'ViewSonic'), logo('optoma', 'Optoma'), logo('panasonic', 'Panasonic'), logo('sony', 'Sony'), logo('xiaomi', 'Xiaomi')], { presentation: 'logo', density: 'dense' })] },
      { sections: [section('prices', 'CHỌN THEO GIÁ', 'orange', 'fa-solid fa-tags', rows(['Dưới 10 triệu', '10 – 20 triệu', '20 – 50 triệu', 'Trên 50 triệu'], 'fa-solid fa-coins'), { density: 'compact' })] },
      { sections: [
        section('brightness', 'CHỌN THEO ĐỘ SÁNG (LUMENS)', 'purple', 'fa-solid fa-sun', rows(['Dưới 2000 lumens', '2000 – 4000 lumens', '4000 – 6000 lumens', 'Trên 6000 lumens'], 'fa-solid fa-sun'), { density: 'compact' }),
        section('accessories', 'PHỤ KIỆN MÁY CHIẾU', 'blue', 'fa-solid fa-bag-shopping', rows(['Màn chiếu', 'Giá treo trần / giá đỡ', 'Remote / dây tín hiệu', 'Bóng đèn máy chiếu']), { density: 'compact' })
      ] }
    ]
  };

  const taxonomy = (variant, columns) => ({ type: 'taxonomy-columns-showcase', variant, columns });

  const gpuFlyout = taxonomy('gpu', [
    { sections: [
      section('needs', 'CHỌN THEO NHU CẦU', 'purple', 'fa-solid fa-gamepad', rows(['Gaming phổ thông', 'Văn phòng / đa nhiệm', 'Gaming cao cấp', 'eSports / FPS', 'Render 3D / dựng phim', 'AI / Deep Learning', 'Workstation', 'Mini PC / case nhỏ'], 'fa-solid fa-chevron-right'), { density: 'dense' }),
      section('outputs', 'THEO CỔNG XUẤT HÌNH', 'purple', 'fa-solid fa-display', rows(['HDMI', 'DisplayPort', 'HDMI + DisplayPort', 'DVI', 'VGA', 'Multi-port'], 'fa-solid fa-chevron-right'), { density: 'compact' })
    ] },
    { sections: [section('series', 'CHỌN THEO SERIES', 'green', 'fa-solid fa-microchip', rows(['NVIDIA GeForce RTX 30 Series', 'NVIDIA GeForce RTX 40 Series', 'NVIDIA GeForce RTX 50 Series', 'AMD Radeon RX 500 Series', 'AMD Radeon RX 5000 Series', 'AMD Radeon RX 6000 Series', 'AMD Radeon RX 7000 Series', 'AMD Radeon RX 9000 Series', 'Professional / Workstation NVIDIA RTX'], 'fa-solid fa-chevron-right'), { density: 'dense' })] },
    { sections: [
      section('chip-brands', 'THEO HÃNG CHIP', 'blue', 'fa-solid fa-microchip', [logo('nvidia', 'NVIDIA'), logo('amd', 'AMD'), logo('intel', 'Intel')], { presentation: 'logo', density: 'compact' }),
      section('prices', 'THEO PHÂN KHÚC GIÁ', 'blue', 'fa-solid fa-tags', rows(['Dưới 3 triệu', '3 – 5 triệu', '5 – 7 triệu', '7 – 10 triệu', '10 – 15 triệu', '15 – 20 triệu', '20 – 30 triệu', 'Trên 30 triệu'], 'fa-solid fa-chevron-right'), { density: 'dense' })
    ] },
    { sections: [
      section('manufacturers', 'THEO HÃNG SẢN XUẤT', 'orange', 'fa-solid fa-building', [logo('asus', 'ASUS'), logo('msi', 'MSI'), logo('gigabyte', 'GIGABYTE'), logo('colorful', 'Colorful'), logo('pny', 'PNY'), logo('asrock', 'ASRock'), logo('inno3d', 'Inno3D'), logo('galax', 'GALAX'), logo('leadtek', 'Leadtek'), logo('sapphire', 'SAPPHIRE'), logo('simorchip', 'SimorChip'), logo('zotac', 'ZOTAC')], { presentation: 'logo', density: 'dense' }),
      section('vram', 'LOẠI VRAM', 'orange', 'fa-solid fa-memory', rows(['GDDR4', 'GDDR5', 'GDDR6', 'GDDR7'], 'fa-solid fa-chevron-right'), { density: 'compact' })
    ] },
    { sections: [section('capacity', 'THEO DUNG LƯỢNG', 'pink', 'fa-solid fa-memory', rows(['2GB', '4GB', '6GB', '8GB', '12GB', '16GB', '20GB', '24GB', '32GB', '48GB', '72GB'], 'fa-solid fa-chevron-right'), { density: 'dense' })] }
  ]);

  const cpuFlyout = taxonomy('cpu', [
    { sections: [section('series', 'CHỌN THEO SERIES', 'purple', 'fa-solid fa-microchip', rows(['Intel Pentium', 'Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'Intel Core Ultra 3', 'Intel Core Ultra 5', 'Intel Core Ultra 7', 'Intel Core Ultra 9', 'Intel Xeon', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9', 'AMD Ryzen AI 300 Series', 'AMD Athlon', 'AMD Threadripper', 'AMD EPYC', 'Hàng workstation / server'], 'fa-solid fa-chevron-right'), { density: 'dense' })] },
    { sections: [
      section('socket', 'THEO SOCKET', 'green', 'fa-solid fa-microchip', rows(['Intel LGA 1200', 'Intel LGA 1700', 'Intel LGA 1851', 'AMD AM4', 'AMD AM5', 'AMD sTR5', 'AMD sTRX4', 'Socket server / workstation']), { density: 'dense' }),
      section('prices', 'THEO PHÂN KHÚC GIÁ', 'blue', 'fa-solid fa-tags', rows(['1 – 2 triệu', '2 – 3 triệu', '3 – 5 triệu', '5 – 7 triệu', '7 – 10 triệu', '10 – 15 triệu', '15 – 20 triệu', 'Trên 20 triệu']), { density: 'dense' })
    ] },
    { sections: [
      section('generation', 'THEO THẾ HỆ', 'orange', 'fa-solid fa-microchip', rows(['Intel Gen 10', 'Intel Gen 11', 'Intel Gen 12', 'Intel Gen 13', 'Intel Gen 14', 'Intel Core Ultra 3', 'Intel Core Ultra 5', 'Intel Core Ultra 7', 'Intel Core Ultra 7', 'AMD Ryzen 3000 Series', 'AMD Ryzen 5000 Series', 'AMD Ryzen 7000 Series', 'AMD Ryzen 8000 Series', 'AMD Ryzen 9000 Series']), { density: 'dense' }),
      section('graphics', 'THEO ĐỒ HỌA TÍCH HỢP', 'teal', 'fa-solid fa-display', rows(['Có iGPU', 'Không iGPU', 'Intel UHD Graphics', 'Intel Iris Xe', 'AMD Radeon Graphics', 'AMD Radeon Vega', 'Apple GPU tích hợp'], 'fa-solid fa-chevron-right'), { density: 'compact' })
    ] },
    { sections: [
      section('cores', 'THEO SỐ NHÂN / LUỒNG', 'purple', 'fa-solid fa-user-group', rows(['4 nhân', '6 nhân', '8 nhân', '10 nhân', '12 nhân', '14 nhân', '16 nhân', '24 nhân', '32 nhân', '64 nhân trở lên']), { density: 'dense' }),
      section('tdp', 'THEO TDP / ĐIỆN NĂNG', 'pink', 'fa-solid fa-bolt', rows(['65W – 95W', '95W – 125W', '125W – 170W', 'Trên 170W']), { density: 'compact' })
    ] }
  ]);

  const mainboardFlyout = taxonomy('mainboard', [
    { sections: [
      section('socket', 'SOCKET MAINBOARD', 'blue', 'fa-solid fa-microchip', rows(['Intel LGA 1200', 'Intel LGA 1700', 'Intel LGA 1851', 'AMD AM4', 'AMD AM5', 'AMD sTR5']), { density: 'compact' }),
      section('graphics', 'THEO ĐỒ HỌA TÍCH HỢP', 'purple', 'fa-solid fa-display', rows(['Có cổng HDMI', 'Có cổng DisplayPort', 'Có cổng VGA', 'Không có xuất hình']), { density: 'compact' })
    ] },
    { sections: [
      section('size', 'THEO KÍCH THƯỚC MAIN', 'green', 'fa-solid fa-expand', rows(['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX', 'XL-ATX', 'Thin Mini-ITX', 'Server / Workstation form factor']), { density: 'compact' }),
      section('ram', 'THEO RAM HỖ TRỢ', 'orange', 'fa-solid fa-memory', rows(['DDR4', 'DDR5', 'DDR4 / DDR5', '2 khe RAM', '4 khe RAM', 'Trên 8 khe RAM', 'Hỗ trợ ECC', 'Hỗ trợ non-ECC']), { density: 'dense' })
    ] },
    { sections: [section('brands', 'THEO HÃNG SẢN XUẤT', 'blue', 'fa-solid fa-building', [logo('asus', 'ASUS'), logo('msi', 'MSI'), logo('gigabyte', 'GIGABYTE'), logo('asrock', 'ASRock'), logo('biostar', 'BIOSTAR'), logo('colorful', 'Colorful'), logo('great-wall', 'Great Wall'), logo('evga', 'EVGA'), logo('supermicro', 'Supermicro'), logo('nzxt', 'NZXT')], { presentation: 'logo', density: 'dense' })] },
    { sections: [
      section('prices', 'THEO PHÂN KHÚC GIÁ', 'orange', 'fa-solid fa-tags', rows(['Dưới 15 triệu', '15 – 25 triệu', '25 – 40 triệu', '40 – 60 triệu', '60 – 80 triệu', '80 – 120 triệu', '12 – 20 triệu', 'Trên 20 triệu']), { density: 'dense' }),
      section('features', 'THEO TÍNH NĂNG', 'teal', 'fa-solid fa-gear', rows(['Có WiFi', 'Có Bluetooth', 'Có PCIe 5.0', 'Có PCIe 4.0', 'Hỗ trợ RGB', 'Có cổng USB-C', 'Có Thunderbolt 3 / 4', 'Có LAN 2.5G', 'Có LAN 10G']), { density: 'dense' })
    ] }
  ]);

  const ramFlyout = taxonomy('ram', [
    { sections: [
      section('needs', 'CHỌN THEO NHU CẦU', 'purple', 'fa-solid fa-bullseye', rows(['RAM PC', 'RAM cho laptop', 'RAM cho workstation', 'RAM ép xung', 'RAM gaming RGB', 'RAM low profile', 'RAM high performance']), { density: 'compact' })
    ] },
    { sections: [
      section('generation', 'CHỌN THEO DÒNG / THẾ HỆ', 'blue', 'fa-solid fa-microchip', rows(['DDR2', 'DDR3', 'DDR4', 'DDR5', 'RAM ECC', 'RAM Non-ECC']), { density: 'compact' }),
      section('bus', 'CHỌN THEO BUS / TỐC ĐỘ', 'blue', 'fa-solid fa-gauge-high', rows(['2133MHz', '2400MHz', '2666MHz', '3000MHz', '3200MHz', '3600MHz', '4000MHz', '4400MHz', '4800MHz', '5200MHz', '5600MHz', '6000MHz', '6400MHz', '6800MHz', '7200MHz trở lên']), { density: 'dense' })
    ] },
    { sections: [
      section('capacity', 'CHỌN THEO DUNG LƯỢNG', 'green', 'fa-solid fa-memory', rows(['4GB', '8GB', '16GB', '32GB', '64GB', 'Kit 8GB x 2', 'Kit 16GB x 2', 'Kit 32GB x 2', 'Kit 16GB x 4', 'Kit 32GB x 4']), { density: 'dense' }),
      section('prices', 'CHỌN THEO PHÂN KHÚC GIÁ', 'orange', 'fa-solid fa-tags', rows(['Dưới 1 triệu', '1 – 2 triệu', '2 – 3 triệu', '3 – 5 triệu', '5 – 8 triệu', 'Trên 8 triệu']), { density: 'compact' })
    ] },
    { sections: [section('brands', 'CHỌN THEO HÃNG', 'pink', 'fa-solid fa-building', [
      logo('kingston', 'Kingston'), logo('corsair', 'Corsair', 'assets/media/menu/keyboard/brands/corsair.svg'), logo('gskill', 'GSkill'), logo('teamgroup', 'TeamGroup'), logo('crucial', 'Crucial'), logo('samsung', 'Samsung'), logo('adata', 'ADATA'), logo('lexar', 'Lexar'), logo('patriot', 'Patriot'), logo('pny', 'PNY'), logo('apacer', 'Apacer'), logo('geil', 'GeIL'), logo('transcend', 'Transcend'), logo('silicon-power', 'Silicon Power'), logo('v-color', 'V-Color'), logo('adata-xpg', 'Adata XPG'), logo('galax', 'Galax'), logo('colorful', 'Colorful'), logo('vsp', 'VSP'), logo('simorchip', 'Simorchip')
    ], { presentation: 'logo', density: 'dense' })] }
  ]);

  const coolingFlyout = taxonomy('cooling', [
    { sections: [
      section('types', 'CHỌN THEO LOẠI', 'blue', 'fa-solid fa-fan', rows(['Tản nhiệt khí', 'Tản nhiệt nước AIO', 'Tản nhiệt nước custom', 'Tản nhiệt low profile', 'Tản nhiệt stock', 'Tản nhiệt cho SSD M2']), { density: 'compact' }),
      section('socket', 'CHỌN THEO SOCKET HỖ TRỢ', 'purple', 'fa-solid fa-microchip', rows(['Intel LGA 115x', 'Intel LGA 1200', 'Intel LGA 1700', 'Intel LGA 1851', 'AMD AM4', 'AMD AM5', 'AMD TR4', 'AMD sTR5', 'Socket server', 'Socket workstation']), { density: 'dense' })
    ] },
    { sections: [
      section('prices', 'CHỌN THEO PHÂN KHÚC GIÁ', 'green', 'fa-solid fa-tags', rows(['Dưới 500 nghìn', '500 nghìn – 1 triệu', '1 – 3 triệu', '3 – 5 triệu', '5 – 8 triệu', 'Trên 8 triệu']), { density: 'compact' }),
      section('features', 'CHỌN THEO TÍNH NĂNG', 'teal', 'fa-solid fa-gear', rows(['Có RGB', 'Không RGB', 'ARGB', 'Có màn hình LCD', 'Có phần mềm điều khiển']), { density: 'compact' })
    ] },
    { sections: [
      section('size', 'CHỌN THEO KÍCH THƯỚC', 'orange', 'fa-solid fa-ruler-vertical', rows(['92mm', '120mm', '140mm', '240mm', '280mm', '360mm', '420mm', 'Low profile', 'Mid tower compatible', 'Full tower compatible', 'Single tower', 'Dual tower']), { density: 'dense' }),
      section('fans', 'CHỌN THEO KIỂU QUẠT', 'pink', 'fa-solid fa-fan', rows(['1 fan', '2 fan', '3 fan', 'RGB fan', 'Silent fan', 'High airflow fan']), { density: 'compact' })
    ] },
    { sections: [section('brands', 'CHỌN THEO HÃNG', 'purple', 'fa-solid fa-building', [
      logo('deepcool', 'DeepCool'), logo('thermalright', 'Thermalright'), logo('noctua', 'Noctua'), logo('cooler-master', 'Cooler Master'), logo('id-cooling', 'ID-COOLING'), logo('corsair', 'Corsair', 'assets/media/menu/keyboard/brands/corsair.svg'), logo('nzxt', 'NZXT'), logo('arctic', 'Arctic'), logo('cooler-master-duplicate', 'Cooler Master'), logo('gamdias', 'Gamdias'), logo('jonsbo', 'Jonsbo'), logo('lian-li', 'Lian Li'), logo('thermaltake', 'Thermaltake'), logo('asus', 'ASUS'), logo('msi', 'MSI'), logo('gigabyte-aorus', 'GIGABYTE / AORUS'), logo('xigmatek', 'Xigmatek'), logo('aigo', 'Aigo'), logo('silverstone', 'SilverStone'), logo('pccooler', 'PCCOOLER')
    ], { presentation: 'logo', density: 'dense' })] }
  ]);

  const chairsFlyout = taxonomy('chairs', [
    { sections: [
      section('needs', 'CHỌN THEO NHU CẦU', 'blue', 'fa-solid fa-crosshairs', rows(['Ghế gaming', 'Ghế văn phòng', 'Ghế công thái học', 'Ghế họp / hội nghị', 'Ghế trẻ em', 'Ghế massage', 'Ghế cho phòng net / cyber', 'Ghế cho gaming setup', 'Ghế cho doanh nghiệp']), { density: 'dense' }),
      section('materials', 'CHỌN THEO CHẤT LIỆU', 'purple', 'fa-solid fa-border-all', rows(['Lưới', 'Da PU', 'Da thật', 'Vải fabric']), { density: 'compact' })
    ] },
    { sections: [section('functions', 'CHỨC NĂNG', 'green', 'fa-solid fa-gear', rows(['Ghế xoay', 'Ghế nâng hạ', 'Có ngả lưng', 'Có gác chân', 'Có tựa đầu', 'Có đệm lưng', 'Có bánh xe', 'Có trụ nâng hạ', 'Có massage', 'Có hỗ trợ công thái học', 'Có kê chân', 'Có thoáng khí']), { density: 'dense' })] },
    { sections: [
      section('size', 'CHỌN THEO KÍCH THƯỚC / TẢI TRỌNG', 'orange', 'fa-solid fa-weight-hanging', rows(['Dưới 80kg', '80 – 100kg', '100 – 120kg', '120 – 150kg', 'Trên 150kg', 'Ghế nhỏ', 'Ghế vừa', 'Ghế lớn', 'Ghế cho người cao', 'Ghế cho người thấp', 'Ghế compact']), { density: 'dense' }),
      section('prices', 'CHỌN THEO PHÂN KHÚC GIÁ', 'purple', 'fa-solid fa-tags', rows(['Dưới 2 triệu', '2 – 3 triệu', '3 – 5 triệu', '5 – 8 triệu', '8 – 12 triệu', '12 – 20 triệu', 'Trên 20 triệu']), { density: 'compact' })
    ] },
    { sections: [section('brands', 'CHỌN THEO HÃNG', 'pink', 'fa-solid fa-building', [logo('sihoo', 'Sihoo'), logo('noblechairs', 'Noble Chairs'), logo('andaseat', 'Anda SEAT'), logo('cougar', 'Cougar'), logo('corsair', 'Corsair', 'assets/media/menu/keyboard/brands/corsair.svg'), logo('dxracer', 'DXRacer'), logo('razer', 'Razer', 'assets/media/menu/keyboard/brands/razer.svg'), logo('msi', 'MSI'), logo('cooler-master', 'Cooler Master'), logo('warrior', 'Warrior'), logo('edra', 'E-Dra'), logo('extreme-zero', 'Extreme Zero'), logo('vitra', 'Vitra'), logo('hoa-phat', 'Hòa Phát'), logo('ikea', 'IKEA')], { presentation: 'logo', density: 'dense' })] }
  ]);

  const networkFlyout = taxonomy('network', [
    { sections: [section('types', 'CHỌN THEO LOẠI', 'blue', 'fa-solid fa-network-wired', rows(['Router', 'Modem', 'Mesh WiFi', 'Access Point', 'Repeater', 'Switch', 'PoE Switch', 'Hub', 'Cân bằng tải', 'USB WiFi', 'PCIe network card', 'SFP module', 'Bộ phát 4G/5G', 'Bridge / converter mạng']), { density: 'dense' })] },
    { sections: [
      section('ports', 'CHỌN THEO SỐ CỔNG', 'green', 'fa-solid fa-ethernet', rows(['2 cổng', '3 cổng', '4 cổng', '5 cổng', '8 cổng', '16 cổng', '24 cổng', '48 cổng', 'Nhiều hơn 48 cổng']), { density: 'dense' }),
      section('prices', 'CHỌN THEO PHÂN KHÚC GIÁ', 'teal', 'fa-solid fa-tags', rows(['Dưới 1 triệu', '1 – 2 triệu', '2 – 3 triệu', '3 – 5 triệu', '5 – 10 triệu', '10 – 20 triệu', 'Trên 20 triệu']), { density: 'dense' })
    ] },
    { sections: [section('standards', 'CHỌN THEO CHUẨN KẾT NỐI', 'orange', 'fa-solid fa-wifi', rows(['WiFi 5', 'WiFi 6', 'WiFi 7', '4G', '5G']), { density: 'compact' })] },
    { sections: [section('brands', 'CHỌN THEO HÃNG', 'purple', 'fa-solid fa-building', [logo('tp-link', 'TP-Link'), logo('asus', 'ASUS'), logo('d-link', 'D-Link'), logo('tenda', 'Tenda'), logo('mercusys', 'Mercusys'), logo('xiaomi', 'Xiaomi'), logo('netgear', 'Netgear'), logo('ubiquiti', 'Ubiquiti'), logo('mikrotik', 'MikroTik'), logo('cisco', 'Cisco'), logo('juniper', 'Juniper'), logo('hpe-aruba', 'HPE Aruba'), logo('zyxel', 'Zyxel'), logo('ruijie', 'Ruijie'), logo('reyee', 'Reyee'), logo('keenetic', 'Keenetic'), logo('draytek', 'DrayTek'), logo('linksys', 'Linksys'), logo('asus-rog', 'ASUS ROG', 'assets/media/menu/keyboard/brands/asus-rog.svg'), logo('synology', 'Synology')], { presentation: 'logo', density: 'dense' })] }
  ]);

  const homeAppliancesFlyout = taxonomy('home-appliances', [
    { sections: [section('home-care', 'CHĂM SÓC NHÀ CỬA', 'blue', 'fa-solid fa-house', rows(['Máy Hút Bụi Cầm Tay', 'Robot Hút Bụi', 'Máy Lọc Không Khí', 'Máy Hút Ẩm', 'Tivi', 'Máy Giặt', 'Tủ Lạnh', 'Điều Hòa', 'Máy Sấy Quần Áo', 'Thiết Bị Điện Thông Minh', 'Quạt']), { density: 'dense' })] },
    { sections: [section('personal-care', 'CHĂM SÓC CÁ NHÂN', 'green', 'fa-solid fa-user', rows(['Máy Massage', 'Máy Sấy Tóc', 'Máy Tạo Ẩm', 'Tông Đơ Cắt Tóc', 'Máy Cạo Râu', 'Máy Tỉa Lông Mũi', 'Bàn Chải Điện', 'Máy Tăm Nước', 'Máy Triệt Lông', 'Máy Rửa Mặt', 'Mặt nạ Chăm Sóc Da']), { density: 'dense' })] },
    { sections: [section('spaces', 'THEO KHÔNG GIAN SỬ DỤNG', 'orange', 'fa-solid fa-house', rows(['Bếp', 'Phòng khách', 'Phòng ngủ', 'Phòng tắm', 'Ban công', 'Nhà bếp nhỏ', 'Chung cư', 'Nhà phố', 'Văn phòng', 'Phòng trọ', 'Gia đình ít người', 'Gia đình đông người']), { density: 'dense' })] },
    { sections: [section('brands', 'CHỌN THEO HÃNG', 'purple', 'fa-solid fa-tags', [logo('samsung', 'Samsung'), logo('lg', 'LG'), logo('panasonic', 'Panasonic'), logo('sharp', 'Sharp'), logo('toshiba', 'Toshiba'), logo('electrolux', 'Electrolux'), logo('philips', 'Philips'), logo('sunhouse', 'Sunhouse'), logo('elmich', 'Elmich'), logo('kangaroo', 'Kangaroo'), logo('lock-lock', 'Lock&Lock'), logo('xiaomi', 'Xiaomi'), logo('xiaomi-mijia', 'Xiaomi Mijia'), logo('robam', 'Robam'), logo('bear', 'Bear'), logo('bluestone', 'Bluestone'), logo('goldsun', 'Goldsun'), logo('senko', 'Senko'), logo('comet', 'Comet')], { presentation: 'logo', density: 'dense' })] }
  ]);

  const cameraFlyout = taxonomy('cameras', [
    { sections: [
      section('needs', 'CHỌN THEO NHU CẦU', 'blue', 'fa-solid fa-camera', rows(['Camera gia đình', 'Camera văn phòng', 'Camera ngoài trời', 'Camera trong nhà', 'Camera cho cửa hàng', 'Camera cho nhà xưởng', 'Camera hành trình', 'Camera giám sát 24/7', 'Camera không dây', 'Bộ kit camera', 'Camera IP WiFi', 'Camera có dây analog']), { density: 'dense' }),
      section('prices', 'CHỌN THEO PHÂN KHÚC GIÁ', 'purple', 'fa-solid fa-tags', rows(['Dưới 500 nghìn', '500 nghìn – 1 triệu', '1 – 3 triệu', '3 – 5 triệu', 'Trên 5 triệu']), { density: 'compact' })
    ] },
    { sections: [
      section('types', 'CHỌN THEO LOẠI', 'green', 'fa-solid fa-share-nodes', rows(['Có WiFi', 'Có SIM 4G', 'Có micro', 'Có loa 2 chiều', 'Phát hiện chuyển động', 'Theo dõi thông minh', 'Phát hiện người', 'Phát hiện khuôn mặt', 'Hỗ trợ thẻ nhớ', 'App điều khiển', 'Có còi báo động', 'Đèn cảnh báo']), { density: 'dense' }),
      section('services', 'DỊCH VỤ', 'teal', 'fa-solid fa-gear', rows(['Thi Công Lắp Đặt', 'Khảo sát - Tư Vấn', 'Trọn Bộ Giải Pháp']), { density: 'compact' })
    ] },
    { sections: [
      section('resolution', 'CHỌN THEO ĐỘ PHÂN GIẢI', 'orange', 'fa-solid fa-display', rows(['1MP (720p)', '2MP (1080p)', '3MP', '4MP', '5MP', '8MP (4K)', '12MP', 'Trên 12MP']), { density: 'dense' }),
      section('camera-count', 'CHỌN THEO SỐ MẮT CAMERA', 'pink', 'fa-solid fa-camera', rows(['1 mắt', '2 mắt', '4 mắt', '8 mắt', '16 mắt', '32 mắt']), { density: 'compact' })
    ] },
    { sections: [section('brands', 'CHỌN THEO HÃNG', 'purple', 'fa-solid fa-tags', [logo('hikvision', 'Hikvision'), logo('dahua', 'Dahua'), logo('kbvision', 'KBVISION'), logo('avtech', 'AVTECH'), logo('ezviz', 'EZVIZ'), logo('xiaomi', 'Xiaomi'), logo('tp-link', 'TP-Link'), logo('imou', 'Imou'), logo('yoosee', 'Yoosee'), logo('vantech', 'Vantech'), logo('dahua-oem', 'Dahua OEM'), logo('hikvision-oem', 'Hikvision OEM'), logo('kbone', 'KBONE'), logo('imou-uppercase', 'IMOU'), logo('reolink', 'Reolink'), logo('foscam', 'Foscam'), logo('wanscam', 'Wanscam'), logo('zosi', 'ZOSI')], { presentation: 'logo', density: 'dense' })] }
  ]);

  const businessFlyout = {
    type: 'business-showcase',
    navigation: [
      { id: 'installation', label: 'DỊCH VỤ LẮP ĐẶT TRỌN BỘ', icon: 'fa-solid fa-screwdriver-wrench', accent: 'orange' },
      { id: 'computers', label: 'MÁY TÍNH DOANH NGHIỆP', icon: 'fa-solid fa-server', accent: 'blue' },
      { id: 'maintenance', label: 'BẢO TRÌ BẢO DƯỠNG', icon: 'fa-solid fa-gears', accent: 'green' },
      { id: 'operations', label: 'CÀI ĐẶT - VẬN HÀNH', icon: 'fa-solid fa-display', accent: 'purple' }
    ],
    columns: [
      { id: 'installation', title: 'DỊCH VỤ LẮP ĐẶT TRỌN BỘ', subtitle: 'DÀNH CHO DOANH NGHIỆP', icon: 'fa-solid fa-building', accent: 'orange', items: rows(['Trọn bộ camera', 'Trọn bộ báo trộm', 'Trọn bộ khóa cửa', 'Trọn bộ máy chấm công', 'Trọn bộ hệ thống Wifi', 'Trọn bộ chuông hình màu', 'Trọn bộ tổng đài điện thoại', 'Trọn bộ nhà thông minh']) },
      { id: 'computers', title: 'MÁY TÍNH DOANH NGHIỆP', icon: 'fa-solid fa-server', accent: 'blue', items: rows(['Máy chủ', 'Máy server', 'Giải pháp A.I', 'Máy A.I xử lý dữ liệu nội bộ', 'Máy văn phòng trọn bộ', 'Họp - Hội Nghị']) },
      { id: 'maintenance', title: 'BẢO TRÌ BẢO DƯỠNG', icon: 'fa-solid fa-gears', accent: 'green', items: rows(['Bảo dưỡng thiết bị văn phòng', 'Hệ thống Mạng', 'Hệ thống tổng đài']) },
      { id: 'operations', title: 'CÀI ĐẶT - VẬN HÀNH', icon: 'fa-solid fa-display', accent: 'purple', items: rows(['Máy tính', 'Máy chấm công', 'Win server', 'Bảo mật', 'Website', 'Database']) }
    ]
  };

  window.__hacomFlyoutData = Object.freeze({
    mice: mouseFlyout,
    headphones: headphonesFlyout,
    speakers: speakersFlyout,
    gamingConsoles: gamingFlyout,
    printers: printerFlyout,
    projectors: projectorFlyout,
    gpu: gpuFlyout,
    cpu: cpuFlyout,
    mainboard: mainboardFlyout,
    ram: ramFlyout,
    cooling: coolingFlyout,
    chairs: chairsFlyout,
    network: networkFlyout,
    homeAppliances: homeAppliancesFlyout,
    cameras: cameraFlyout,
    business: businessFlyout
  });
})();
