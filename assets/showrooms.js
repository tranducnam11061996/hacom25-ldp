(function exposeShowroomData() {
  const items = [
    {
      id: 'hai-ba-trung', ordinal: 1, name: 'HACOM - HAI BÀ TRƯNG', region: 'north', province: 'Hà Nội',
      address: '131 Lê Thanh Nghị - Bạch Mai - Hà Nội', mapUrl: 'https://maps.app.goo.gl/3KB3gRdVuuVTq1DM7',
      photoUrl: 'https://hacom.vn/hinh-anh-thuc-te-showroom-hai-ba-trung', salesPhone: '1900 1903 (máy lẻ 127) - (0247) 3020386',
      warrantyPhone: '1900 1903 (máy lẻ 128)', email: 'kdbl.haibatrung@hacom.vn', openHours: 'Từ 8h-20h30 hàng ngày', lunchBreak: ''
    },
    {
      id: 'dong-da', ordinal: 2, name: 'HACOM - ĐỐNG ĐA', region: 'north', province: 'Hà Nội',
      address: '284 Thái Hà - Ô Chợ Dừa - Hà Nội', mapUrl: 'https://maps.app.goo.gl/DhaiEz6kr1KcRiUw7',
      photoUrl: 'https://hacom.vn/hinh-anh-thuc-te-showroom-dong-da', salesPhone: '1900 1903 (máy lẻ 130) - (0243) 5380088',
      warrantyPhone: '1900 1903 (máy lẻ 131)', email: 'kdbl.dongda@hacom.vn', openHours: 'Từ 8h-21h hàng ngày', lunchBreak: ''
    },
    {
      id: 'hai-phong', ordinal: 3, name: 'HACOM - HẢI PHÒNG', region: 'north', province: 'Hải Phòng',
      address: '36 Lê Lợi - Gia Viên - Hải Phòng', mapUrl: 'https://maps.app.goo.gl/6UK1hcJ665gF74UG7',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-hai-phong', salesPhone: '1900 1903 (máy lẻ 150) - (022) 58830013',
      warrantyPhone: '1900 1903 (máy lẻ 151)', email: 'kdbl.haiphong@hacom.vn', openHours: 'Từ 8h30-20h30 hàng ngày', lunchBreak: ''
    },
    {
      id: 'cau-giay', ordinal: 4, name: 'HACOM - CẦU GIẤY', region: 'north', province: 'Hà Nội',
      address: '79 Nguyễn Văn Huyên - Nghĩa Đô - Hà Nội', mapUrl: 'https://maps.app.goo.gl/miAmHLkx2jiMp7nt6',
      photoUrl: 'https://hacom.vn/hinh-anh-thuc-te-showroom-cau-giay', salesPhone: '1900 1903 (máy lẻ 132) - (024) 38610088',
      warrantyPhone: '1900 1903 (máy lẻ 133)', email: 'kdbl.caugiay@hacom.vn', openHours: 'Từ 8h-20h30 hàng ngày', lunchBreak: ''
    },
    {
      id: 'ha-dong-1', ordinal: 5, name: 'HACOM - HÀ ĐÔNG 1', region: 'north', province: 'Hà Nội',
      address: '313 Quang Trung - Hà Đông - Hà Nội', mapUrl: 'https://maps.app.goo.gl/rAWK58xRSDnGjydY6',
      photoUrl: 'https://hacom.vn/hinh-anh-thuc-te-showroom-ha-dong', salesPhone: '1900 1903 (máy lẻ 138) - (024) 38580088',
      warrantyPhone: '1900 1903 (máy lẻ 139)', email: 'kdbl.hadong1@hacom.vn', openHours: 'Từ 8h-20h30 hàng ngày', lunchBreak: ''
    },
    {
      id: 'long-bien', ordinal: 6, name: 'HACOM - LONG BIÊN', region: 'north', province: 'Hà Nội',
      address: '622 Nguyễn Văn Cừ - Bồ Đề - Hà Nội', mapUrl: 'https://maps.app.goo.gl/yfzdTTRJJ9WeiQBz8',
      photoUrl: 'https://hacom.vn/hinh-anh-thuc-te-showroom-long-bien', salesPhone: '1900 1903 (máy lẻ 143) - (024) 73045668',
      warrantyPhone: '1900 1903 (máy lẻ 144)', email: 'kdbl.longbien@hacom.vn', openHours: 'Từ 8h30-20h hàng ngày', lunchBreak: ''
    },
    {
      id: 'tu-son', ordinal: 7, name: 'HACOM - TỪ SƠN', region: 'north', province: 'Bắc Ninh',
      address: '299 Minh Khai - Từ Sơn - Bắc Ninh', mapUrl: 'https://maps.app.goo.gl/vhQmB6AXBSoGa6TQA',
      photoUrl: 'https://hacom.vn/hinh-anh-thuc-te-showroom-tu-son', salesPhone: '1900 1903 (máy lẻ 152) - (022) 27304286',
      warrantyPhone: '1900 1903 (máy lẻ 153)', email: 'kdbl.tuson@hacom.vn', openHours: 'Từ 8h30-19h hàng ngày', lunchBreak: ''
    },
    {
      id: 'dong-anh', ordinal: 8, name: 'HACOM - ĐÔNG ANH', region: 'north', province: 'Hà Nội',
      address: '35 Cao Lỗ - Đông Anh - Hà Nội', mapUrl: 'https://maps.app.goo.gl/NCVAu6BhxGJdtUT3A',
      photoUrl: 'https://hacom.vn/hinh-anh-thuc-te-showroom-dong-anh', salesPhone: '1900 1903 (máy lẻ 145) - (024) 32001088',
      warrantyPhone: '1900 1903 (máy lẻ 30480)', email: 'kdbl.donganh@hacom.vn', openHours: 'Từ 9h-18h30 hàng ngày', lunchBreak: 'Từ 12h-13h30 hàng ngày'
    },
    {
      id: 'bac-giang', ordinal: 9, name: 'HACOM - BẮC GIANG', region: 'north', province: 'Bắc Giang',
      address: '356 Nguyễn Thị Minh Khai - Bắc Giang - Bắc Ninh', mapUrl: 'https://maps.app.goo.gl/nycYG6hYY2uLVSET6',
      photoUrl: 'https://hacom.vn/hinh-anh-thuc-te-showroom-bac-giang', salesPhone: '1900 1903 (máy lẻ 154) - (020) 47303668',
      warrantyPhone: '1900 1903 (máy lẻ 31868)', email: 'kdbl.bacgiang@hacom.vn', openHours: 'Từ 9h-18h30 hàng ngày', lunchBreak: 'Từ 12h-13h30 hàng ngày'
    },
    {
      id: 'ha-dong-2', ordinal: 10, name: 'HACOM - HÀ ĐÔNG 2', region: 'north', province: 'Hà Nội',
      address: '57 Trần Phú - Hà Đông - Hà Nội', mapUrl: 'https://maps.app.goo.gl/PYH7ebe9kxHRFRb6A',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-ha-dong-2', salesPhone: '1900 1903 (máy lẻ 140) - (024) 73062868',
      warrantyPhone: '', email: 'kdbl.hadong2@hacom.vn', openHours: 'Từ 8h30-19h hàng ngày', lunchBreak: ''
    },
    {
      id: 'phu-ly', ordinal: 11, name: 'HACOM - PHỦ LÝ', region: 'north', province: 'Ninh Bình',
      address: '124 Biên Hòa - Phủ Lý - Ninh Bình', mapUrl: 'https://maps.app.goo.gl/tediy8CpethQTfGX6',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-phu-ly', salesPhone: '1900 1903 (máy lẻ 155) - (022) 67302868',
      warrantyPhone: '', email: 'kdbl.phuly@hacom.vn', openHours: 'Từ 9h-18h30 hàng ngày', lunchBreak: 'Từ 12h-13h30 hàng ngày'
    },
    {
      id: 'vinh', ordinal: 12, name: 'HACOM - VINH', region: 'central', province: 'Nghệ An',
      address: '99 Lê Lợi - Thành Vinh - Nghệ An', mapUrl: 'https://maps.app.goo.gl/AyCNgDgRaU9PQyg77',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-vinh', salesPhone: '1900 1903 (máy lẻ 157) - (023) 87302868',
      warrantyPhone: '', email: 'kdbl.vinh@hacom.vn', openHours: 'Từ 9h-18h30 hàng ngày', lunchBreak: 'Từ 12h-13h30 hàng ngày'
    },
    {
      id: 'thai-nguyen', ordinal: 13, name: 'HACOM - THÁI NGUYÊN', region: 'north', province: 'Thái Nguyên',
      address: '118 Lương Ngọc Quyến - Phan Đình Phùng - Thái Nguyên', mapUrl: 'https://maps.app.goo.gl/CWuMetphzrC8W8Tzh6',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-thai-nguyen', salesPhone: '1900 1903 (máy lẻ 156) - (020) 87302868',
      warrantyPhone: '', email: 'kdbl.thainguyen@hacom.vn', openHours: 'Từ 9h-18h30 hàng ngày', lunchBreak: 'Từ 12h-13h30 hàng ngày'
    },
    {
      id: 'thanh-hoa', ordinal: 14, name: 'HACOM - THANH HÓA', region: 'central', province: 'Thanh Hóa',
      address: '164 Lạc Long Quân - Hạc Thành - Thanh Hóa', mapUrl: 'https://maps.app.goo.gl/HvvTy7oWgRUdPXCW9',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-thanh-hoa', salesPhone: '1900 1903 (máy lẻ 158) - (023) 77308868',
      warrantyPhone: '', email: 'kdbl.thanhhoa@hacom.vn', openHours: 'Từ 9h-18h30 hàng ngày', lunchBreak: 'Từ 12h-13h30 hàng ngày'
    },
    {
      id: 'hoang-mai', ordinal: 15, name: 'HACOM - HOÀNG MAI', region: 'north', province: 'Hà Nội',
      address: '805 Giải Phóng - Tương Mai - Hà Nội', mapUrl: 'https://maps.app.goo.gl/L8N9JfMEbzzTdDvt6',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-hoang-mai', salesPhone: '1900 1903 (máy lẻ 137) - (024) 73015286',
      warrantyPhone: '', email: 'kdbl.hoangmai@hacom.vn', openHours: 'Từ 8h30-19h hàng ngày', lunchBreak: ''
    },
    {
      id: 'cau-giay-2', ordinal: 16, name: 'HACOM - CẦU GIẤY 2', region: 'north', province: 'Hà Nội',
      address: '87 Trần Duy Hưng - Yên Hòa - Hà Nội', mapUrl: 'https://maps.app.goo.gl/7uC5u1odzcEq61Tw5',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-cau-giay-2', salesPhone: '1900 1903 (máy lẻ 134) - (024) 73015286',
      warrantyPhone: '', email: 'kdbl.caugiay2@hacom.vn', openHours: 'Từ 8h-19h hàng ngày', lunchBreak: ''
    },
    {
      id: 'gia-lam-ocean-park', ordinal: 17, name: 'HACOM - GIA LÂM (Ocean Park 1)', region: 'north', province: 'Hà Nội',
      address: 'Căn TMDV19 - Tòa H2 - Ocean Park 1 - Gia Lâm - Hà Nội', mapUrl: 'https://maps.app.goo.gl/PFW2chgdbPDh1dCx9',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-gia-lam', salesPhone: '1900 1903 (máy lẻ 141) - (024) 73015286',
      warrantyPhone: '', email: 'kdbl.gialam@hacom.vn', openHours: 'Từ 9h-18h30 hàng ngày', lunchBreak: 'Từ 12h-13h30 hàng ngày'
    },
    {
      id: 'gia-lam-2', ordinal: 18, name: 'HACOM - GIA LÂM 2', region: 'north', province: 'Hà Nội',
      address: '38 Thành Trung - Gia Lâm - Hà Nội', mapUrl: 'https://maps.app.goo.gl/2ikKfHXXtxS12EkT9',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-gia-lam-2', salesPhone: '1900 1903 (máy lẻ 142) - (024) 73015286',
      warrantyPhone: '', email: 'kdbl.gialam2@hacom.vn', openHours: 'Từ 9h-18h30 hàng ngày', lunchBreak: 'Từ 12h-13h30 hàng ngày'
    },
    {
      id: 'dinh-cong', ordinal: 19, name: 'HACOM - ĐỊNH CÔNG', region: 'north', province: 'Hà Nội',
      address: '62 Nguyễn Hữu Thọ - Định Công - Hà Nội', mapUrl: 'https://maps.app.goo.gl/E9WLx3QpJhhvqumRA',
      photoUrl: 'https://hacom.vn/hinh-anh-thuc-te-showroom-dinh-cong', salesPhone: '1900 1903 (máy lẻ 135) - (024) 73015286',
      warrantyPhone: '1900 1903 (máy lẻ 136)', email: 'kdbl.dinhcong@hacom.vn', openHours: 'Từ 8h30-20h30 hàng ngày', lunchBreak: ''
    },
    {
      id: 'thu-duc', ordinal: 20, name: 'HACOM - THỦ ĐỨC, TP. HCM', region: 'south', province: 'TP. Hồ Chí Minh',
      address: '34 Trần Não - An Khánh - TP. Hồ Chí Minh', mapUrl: 'https://maps.app.goo.gl/54nSn28uecqcSpjW7',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-thu-duc', salesPhone: '1900 1903 (máy lẻ 161) - (028) 73000322',
      warrantyPhone: '', email: 'kdbl.thuduc@hacom.vn', openHours: 'Từ 8h30-19h hàng ngày', lunchBreak: 'Từ 12h-13h30 hàng ngày'
    },
    {
      id: 'go-vap', ordinal: 21, name: 'HACOM - GÒ VẤP, TP. HCM', region: 'south', province: 'TP. Hồ Chí Minh',
      address: '783 Phan Văn Trị - Hạnh Thông - TP. Hồ Chí Minh', mapUrl: 'https://maps.app.goo.gl/XRN1g7cSVgYAnfpg9',
      photoUrl: 'https://hacom.vn/hinh-anh-showroom-hacom-go-vap', salesPhone: '1900 1903 (máy lẻ 159) - (028) 73000322',
      warrantyPhone: '1900 1903 (máy lẻ 160)', email: 'kdbl.govap@hacom.vn', openHours: 'Từ 8h30-19h30 hàng ngày', lunchBreak: ''
    }
  ];

  window.HacomShowrooms = Object.freeze({
    sourceUrl: 'https://hacom.vn/showroom',
    retrievedAt: '2026-08-17',
    items: Object.freeze(items.map((item) => Object.freeze(item)))
  });
}());
