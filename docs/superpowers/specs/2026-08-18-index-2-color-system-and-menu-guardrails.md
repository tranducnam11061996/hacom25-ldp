# HACOM 2.0 Color System and Menu Guardrails

## Mục tiêu

Định nghĩa hướng màu sắc cho `index-2.html` theo phong cách Spectrum Tech: nhiều màu sắc, giàu năng lượng công nghệ và nổi bật trên toàn trang, đồng thời xác lập ranh giới kỹ thuật để quá trình phát triển version 2.0 không làm thay đổi giao diện hiện tại.

Version 2.0 phải tiếp tục nhận diện rõ là HACOM nhờ hệ đỏ và navy hiện có, nhưng không còn sử dụng phong cách sáng “Ice-Tech” làm định hướng chủ đạo. Hệ màu đa sắc, gradient công nghệ, ánh sáng điện tử và nền có chiều sâu phải được áp dụng xuyên suốt các section, header, gateway, khu vực khám phá, dịch vụ, banner và footer. Các màu phụ được phân vai theo khu vực; chúng không được phân tán ngẫu nhiên hoặc biến thành một bảng màu cầu vồng thiếu kiểm soát.

Tài liệu này là đặc tả thiết kế. Nó không yêu cầu sửa HTML, CSS hoặc JavaScript trong cùng bước tạo tài liệu.

## Cập nhật định hướng chủ đạo: Spectrum Tech toàn trang

Quy tắc này thay thế mọi mô tả trước đó về “Ice-Tech”, “Ice-Tech Boulevard”, nền trắng/xám lạnh làm canvas mặc định hoặc cách phối lấy vùng sáng trung tính làm điểm nghỉ chính trong `index-2.html`.

- Toàn trang dùng ngôn ngữ thị giác công nghệ đa sắc: nền sâu, gradient có chủ đích, glow điện tử, lưới kỹ thuật, đường sáng, lớp depth và các điểm nhấn màu có vai trò rõ ràng.
- Không dùng nền trắng hoặc xám lạnh phẳng làm nền mặc định cho một section lớn. Nếu cần bề mặt sáng để tạo tương phản, phải dùng nền sáng có sắc độ công nghệ như lavender, cyan rất nhạt hoặc blue-violet, kèm lớp màu/texture nhẹ.
- Mỗi section được phép có một palette chủ đạo riêng nhưng phải nối tiếp section kế bên bằng một màu chuyển tiếp, dải gradient hoặc mô-típ ánh sáng chung để toàn trang vẫn là một hệ thống.
- Mỗi component chỉ sở hữu một họ màu nhấn chính; section có thể kết hợp tối đa hai đến ba họ màu tương thích. Độ nổi bật đến từ phân cấp nền, ánh sáng và tương phản, không phải từ việc đặt nhiều màu bão hòa cạnh nhau một cách ngẫu nhiên.
- Đỏ HACOM tiếp tục là tín hiệu thương mại và CTA chính; navy, tím điện, xanh cyan, xanh dương, magenta, xanh lá neon và cam/vàng được dùng để phân loại nội dung công nghệ, gaming, AI, builder và deal.
- Quy tắc Spectrum Tech áp dụng cho toàn bộ bề mặt và banner mới của `index-2.html`. Nội dung bên trong card sản phẩm, cấu trúc submenu, dữ liệu dùng chung và các contract tương tác đã đóng băng vẫn được bảo toàn.

## Phạm vi và nguồn tham chiếu

Hai ảnh do người dùng cung cấp là nguồn tham chiếu thị giác, không phải chỉ dẫn kỹ thuật hoặc nội dung cần sao chép nguyên trạng.

Phạm vi phân tích gồm:

- Màu nền và cách tạo chiều sâu cho section.
- Quan hệ giữa màu thương hiệu, màu chức năng và màu trang trí.
- Cách phối màu trên card danh mục và card dịch vụ.
- Nguyên tắc áp dụng màu cho các khu vực còn lại của `index-2.html`.
- Ranh giới thay đổi menu cấp 1 và vùng submenu phải bảo toàn.
- Ranh giới bảo toàn thiết kế card sản phẩm.

Các thư mục ảnh, font, dữ liệu sản phẩm và biến môi trường tiếp tục dùng chung giữa hai phiên bản.

## Phân tích ảnh tham chiếu

### Ảnh 1 — khu vực danh mục nhiều màu

Khu vực danh mục sử dụng một nền tối liên tục thay vì đặt từng card trên nền trắng. Nền chuyển từ navy `#07182F` ở bên trái, qua tím mận `#57164A`, đến magenta `#8D245E` ở bên phải. Lớp lưới mờ và vùng sáng xanh có độ tương phản thấp tạo cảm giác công nghệ nhưng không cạnh tranh với nội dung chính.

Hệ phân cấp màu của khu vực này gồm:

1. Nền gradient tối giữ vai trò không gian chủ đạo.
2. Tiêu đề màu trắng tạo điểm neo có độ tương phản cao.
3. Eyebrow xanh cyan tạo tín hiệu khám phá và kết nối với lớp sáng nền.
4. Các card danh mục dùng màu bão hòa hơn nền, giúp từng nhóm sản phẩm dễ nhận diện.
5. Ảnh sản phẩm giữ màu tự nhiên và có bóng đổ vừa đủ để tách khỏi nền card.

Các card không dùng màu hoàn toàn khác nhau một cách tùy ý. Chúng chia sẻ cùng kiểu gradient, độ sáng, bo góc, viền sáng và cách đặt chữ; sự nhất quán về cấu trúc giúp dải màu rộng vẫn được nhìn như một hệ thống.

Các cặp gradient hiện có trong `assets/styles-2.css` được dùng làm bảng màu danh mục chuẩn:

| Nhóm màu | Điểm đầu | Điểm cuối | Vai trò gợi ý |
|---|---:|---:|---|
| Coral | `#F44969` | `#FF8D78` | Gaming, đồ họa, nội dung giàu năng lượng |
| Blue | `#2896EC` | `#78D0FF` | Văn phòng, công nghệ phổ thông |
| Amber | `#F3A05A` | `#FFD07B` | Mỏng nhẹ, ưu đãi mềm, nội dung ấm |
| Green | `#4FCF78` | `#94E692` | Sinh viên, tiết kiệm, trạng thái tích cực |
| Purple | `#A865E5` | `#E5A2FF` | Gaming, hiệu năng, dịch vụ số |
| Teal | `#43BFC3` | `#7FE5DA` | Cảm ứng, kết nối, phụ kiện |
| Red | `#FF5664` | `#FF9988` | Build PC, linh kiện nổi bật |
| Azure | `#3C9EEA` | `#83D3FF` | PC lắp sẵn, case, hệ thống hoàn chỉnh |
| Rose | `#DE72AA` | `#FFB0CC` | All-in-one, âm thanh, lifestyle |
| Periwinkle | `#6D76DC` | `#A9B1FF` | Linh kiện, nhóm kỹ thuật |

### Ảnh 2 — card dịch vụ tối với accent đa sắc

Ảnh thứ hai tham chiếu cách dùng bốn card gần đen, mỗi card có một sắc nền và ánh sáng nhẹ theo màu chức năng riêng. Canvas sáng trung tính trong ảnh chỉ là ngữ cảnh tham chiếu; version 2.0 không dùng nó làm mặc định. Khi triển khai, card dịch vụ phải nằm trong một hệ nền công nghệ đa sắc, có độ tương phản và chiều sâu đủ mạnh để tạo ấn tượng cao cấp.

Mỗi card chỉ sở hữu một họ màu nhấn:

| Dịch vụ | Màu nhấn | Cách sử dụng |
|---|---|---|
| AI | `#FF5236` → `#FFB029` | Nhãn, phần tiêu đề nhấn, viền và ánh sáng ấm |
| Ứng dụng | `#7E53FF` → `#A977FF` | Nhãn, tiêu đề nhấn và viền tím |
| PC Builder | `#73E08E` → `#B7F05B` | Nhãn, tiêu đề và CTA chính màu xanh |
| Flash Sale | `#FFAA23` → `#FF772F` | Nhãn, tiêu đề và tín hiệu khẩn cấp |

Chữ tiêu đề chính dùng trắng hoặc gần trắng; chữ mô tả dùng xám lạnh `#AEB7C5`. Màu nhấn được lặp lại có chủ đích ở nhãn, một phần tiêu đề, viền, glow và CTA. Card không trộn nhiều họ màu, nhờ đó người dùng có thể nhận ra vai trò của từng khối ngay cả khi toàn khu vực có nhiều màu.

## Chiến lược màu HACOM 2.0

### Tính cách thị giác

- Nhiệt độ: cân bằng giữa nền công nghệ lạnh và các điểm nhấn thương mại ấm.
- Quan hệ màu chủ đạo: đỏ HACOM và navy là trục nhận diện; spectrum là lớp phân loại nội dung.
- Dải tương phản: mạnh ở section khám phá và dịch vụ, vừa phải ở khu vực mua sắm dày thông tin.
- Liều lượng: không áp dụng tỷ lệ màu cứng; màu mạnh phải sở hữu một khu vực hoặc vai trò rõ ràng thay vì xuất hiện thành nhiều điểm trang trí nhỏ.

### Màu thương hiệu và màu nền

| Vai trò | Giá trị chuẩn | Nguyên tắc |
|---|---:|---|
| Brand red | `#EA2127` | Nhận diện HACOM, CTA mua hàng và tín hiệu khuyến mại |
| Brand red dark | `#C81820` | Hover, CTA đậm và vùng thương hiệu có độ tương phản cao |
| Brand red deep | `#941319` | Chiều sâu, shadow và trạng thái nhấn mạnh |
| Brand navy | `#2C2F75` | Điều hướng, tiêu đề thông tin và đối trọng với đỏ |
| Chromatic tech canvas | `#0A0F2A` → `#24134F` hoặc các biến thể navy/tím/cyan | Nền mặc định cho section và vùng chuyển tiếp toàn trang |
| Tinted light surface | `#EEF0FF`, `#E8F8FF`, `#F6ECFF` | Chỉ dùng cho panel tương phản cục bộ; không dùng làm canvas trắng phẳng cho section lớn |
| Dark service surface | `#07090D` – `#0D1118` | Card dịch vụ hoặc khu vực trải nghiệm tối |
| Spectrum backdrop | `#07182F` → `#57164A` → `#8D245E` | Khu vực danh mục và khám phá giàu màu sắc |
| Primary light text | `#F8FBFF` | Tiêu đề và nội dung chính trên nền tối |
| Secondary dark-surface text | `#AEB7C5` | Mô tả trên card tối |

### Quy tắc phối màu

- Mỗi component chỉ dùng một họ màu nhấn. Không đặt nhiều gradient cạnh tranh trong cùng một card.
- Gradient chức năng ưu tiên hai điểm màu. Gradient ba điểm chỉ dùng cho nền section lớn cần chuyển dịch không gian.
- Đỏ HACOM phải tiếp tục là màu hành động thương mại nổi bật nhất; không dùng đỏ dày đặc cho trang trí khiến CTA bị mất ưu tiên.
- Xanh lá phù hợp với PC Builder, trạng thái hoàn thành hoặc tín hiệu tích cực.
- Vàng và cam phù hợp với deal, giới hạn thời gian và ưu đãi.
- Tím phù hợp với ứng dụng, AI, gaming hoặc trải nghiệm số.
- Xanh dương và teal phù hợp với khám phá, điều hướng và nhóm nội dung công nghệ phổ thông.
- Không lấy section sáng làm nhịp mặc định và không yêu cầu vùng nghỉ trung tính giữa các section. Các section tối, gradient và tinted-light được nối bằng màu chuyển tiếp, texture hoặc glow chung; tránh để hai gradient bão hòa cạnh nhau nếu không có phân cấp rõ ràng.
- Mọi vùng nhìn thấy trên toàn trang phải thể hiện ngôn ngữ Spectrum Tech ở mức nền, viền, ánh sáng, typography hoặc CTA; không để một khu vực lớn rơi trở lại phong cách Ice-Tech trắng/xanh nhạt độc lập với hệ thống.
- Trên nền có ảnh hoặc gradient, màu chữ phải được tính theo nền thực tế. Có thể dùng lớp phủ cục bộ phía sau chữ nếu cần, nhưng không dựa vào text-shadow để thay thế tương phản.
- Màu không được là tín hiệu duy nhất. Active, selected, lỗi, thành công và trạng thái tồn kho phải có thêm chữ, icon, viền, vị trí hoặc hình dạng.

### Phân bổ màu theo khu vực

Được phép thay đổi trong version 2.0:

- Nền trang và nền từng section.
- Tiêu đề, eyebrow, tab, nhãn và liên kết điều hướng.
- Card chức năng, card dịch vụ, card danh mục và banner truyền thông.
- Viền, ánh sáng nền, gradient trang trí và nhịp chuyển tiếp giữa các section.
- Menu cấp 1 trong phạm vi được định nghĩa bên dưới.
- Nền, tiêu đề, tab và bộ lọc bao quanh lưới sản phẩm.

Không được áp màu phân loại hoặc gradient trực tiếp lên card sản phẩm.

## Vùng bảo toàn: card sản phẩm

Card sản phẩm trong `index-2.html` phải giữ nguyên thiết kế hiện tại. Vùng bảo toàn gồm toàn bộ `.product-card` và các phần tử con do `assets/product-cards.js` cùng logic collection hiện tại tạo ra.

Các đặc điểm không được thay đổi:

- Cấu trúc HTML và thứ tự thông tin.
- Nền, viền, bo góc, bóng đổ và khoảng cách nội bộ.
- Tỷ lệ, vị trí, surface và cách hiển thị ảnh sản phẩm.
- Tên sản phẩm, SKU, thông số, đánh giá, giá hiện tại, giá cũ và phần trăm giảm.
- Badge, trạng thái tồn kho, nút giỏ hàng, nút yêu thích và icon.
- Hover, active, `:focus-visible` và reduced-motion.
- Kích thước card, mật độ lưới, số lượng card mỗi hàng và responsive hiện tại.
- Logic dựng card, dữ liệu sản phẩm và các asset đang dùng chung.

Các selector rộng dành cho section v2 không được ghi đè `.product-card` hoặc các selector con. Mọi màu sắc mới quanh lưới sản phẩm phải được scope vào wrapper, heading, tab, filter hoặc thành phần trang trí bên ngoài card.

## Vùng bảo toàn: submenu

Submenu là vùng đóng băng. Điều này áp dụng cho gateway flyout, mega menu desktop và các chế độ submenu trên mobile.

Các contract phải giữ nguyên:

- Tên, thứ tự, dữ liệu, liên kết, mã sản phẩm và tài nguyên hình ảnh.
- Cấu trúc nhóm và toàn bộ loại flyout chuyên biệt.
- Nội dung, bố cục, phong cách trực quan và responsive.
- Hành vi đóng/mở sau khi submenu đã xuất hiện.
- Điều hướng bàn phím, `aria-expanded`, focus ban đầu và focus-return.
- Các điểm móc `#gatewayFlyout`, `#gatewayFlyoutTitle` và `#gatewayFlyoutContent`.
- Dữ liệu `categoryTree` và payload được công bố qua `window.HacomGatewayData`.

Menu cấp 1 chỉ được chọn một category và chuyển category đó đến contract submenu hiện tại. Nó không được sửa, sắp xếp lại, lọc hoặc bổ sung thuộc tính vào dữ liệu submenu.

## Nguyên tắc thiết kế lại menu cấp 1

Menu cấp 1 của version 2.0 được phép thay đổi:

- Bố cục, vị trí và cách nhóm mục menu.
- Hình khối, màu nền, icon, typography và trạng thái active.
- Cách kích hoạt bằng click, pointer hoặc bàn phím trước khi submenu mở.
- Chuyển động và phản hồi vi mô, với reduced-motion fallback.
- Cách trình bày khác nhau giữa mobile, tablet và desktop.

Ranh giới menu cấp 1 kết thúc khi người dùng chọn category và submenu được mở. Từ thời điểm đó, nội dung và hành vi thuộc contract submenu đóng băng.

Do `index-2.html` hiện vẫn dùng `assets/app.js`, trước khi triển khai menu mới phải tạo JavaScript riêng cho v2, dự kiến `assets/app-2.js`, và chuyển riêng `index-2.html` sang file này. `index.html` tiếp tục dùng `assets/app.js`.

`assets/app-2.js` phải bắt đầu từ cùng dữ liệu và renderer hiện tại. Chỉ controller hoặc renderer menu cấp 1 được phép thay đổi. Các renderer submenu và renderer card sản phẩm phải được giữ nguyên. Không sửa `assets/app.js` để phục vụ thay đổi chỉ dành cho version 2.0.

## Khả năng tiếp cận và tương tác

Mọi tổ hợp màu chữ, icon và điều khiển phải đáp ứng WCAG AA trong trạng thái mặc định lẫn trạng thái tương tác.

- Chữ thường phải đạt tương phản tối thiểu 4.5:1.
- Chữ lớn, icon, viền điều khiển và focus indicator phải đạt tối thiểu 3:1.
- Interactive target cần đạt ít nhất 44px ở mỗi chiều khi component cho phép.
- `:focus-visible` phải nhìn rõ trên cả nền sáng, nền tối và gradient.
- Hover lift phải sử dụng `--hover-lift-control`, `--hover-lift-button`, `--hover-lift-feature` hoặc `--hover-lift-card`.
- Khi phần tử lift nằm gần vùng `overflow: hidden` hoặc `overflow: clip`, vùng chứa phải có `.hover-lift-safe-zone` hoặc khoảng trống block-axis tương đương ít nhất 12px.
- Không được truyền đạt trạng thái chỉ bằng màu sắc.
- Chuyển động trang trí phải được vô hiệu hóa hoặc giảm đáng kể dưới `prefers-reduced-motion: reduce`.

## Quy tắc artwork marketing dạng ảnh phẳng

Đối với carousel chiến dịch khuyến mãi của `index-2.html` và các banner marketing mới trong version 2.0:

- Mỗi banner phải là một asset raster hoàn chỉnh, bao gồm artwork, eyebrow, headline, thông tin ưu đãi và CTA trong cùng một ảnh.
- Artwork mới phải theo phong cách Spectrum Tech: nền công nghệ có chiều sâu, màu đa sắc có phân vai, ánh sáng điện tử và điểm nhấn thị giác đủ mạnh; không sử dụng artwork trắng/xanh nhạt thuần Ice-Tech làm hướng mặc định.
- Mỗi banner chọn một palette chính và tối đa hai màu hỗ trợ. Các banner liền kề phải khác nhau đủ để nổi bật nhưng vẫn chia sẻ typography, độ tương phản, cấu trúc CTA và ngôn ngữ ánh sáng.
- Không dựng lại phần copy marketing nhìn thấy bằng HTML hoặc CSS phủ lên background ảnh.
- HTML chỉ giữ lớp tương tác và ngữ nghĩa: liên kết thật, `aria-label`, ảnh trang trí `alt=""`, điều khiển carousel và metadata nguồn.
- Toàn bộ banner là vùng click; CTA được đóng vào ảnh là tín hiệu thị giác, không phải một control HTML riêng.
- Mỗi campaign dùng một asset duy nhất cho desktop, tablet và mobile. Vùng an toàn của text phải được kiểm tra với crop `object-fit: cover` tại `320px`, `768px`, `1440px` và `1920px`.
- Asset hero gateway dùng tỷ lệ 4:3; asset tile dùng tỷ lệ 1:1. Không tạo biến thể mobile nếu chưa có quyết định thiết kế mới.
- Các file ảnh marketing v2 phải nằm trong thư mục riêng `assets/media/gateway-campaigns-v2/` và không được ghi đè ảnh đang dùng chung với `index.html`.
- Mỗi liên kết campaign phải có `data-source-url` và `data-verified-at`; mức giảm chỉ được dùng khi còn được xác nhận bởi nguồn HACOM chính thức.

Quy tắc ảnh phẳng này không áp dụng cho ảnh sản phẩm, card sản phẩm, logo, icon, ảnh danh mục, ảnh editorial hoặc banner cũ chưa được chuyển đổi trong cùng task. Tuy nhiên, quy tắc phối màu Spectrum Tech toàn trang vẫn áp dụng cho nền section, wrapper và các lớp bao quanh mọi khu vực, bao gồm cả Quantum Deals.

## Ranh giới triển khai tương lai

- `index-2.html`: được thay đổi cấu trúc menu cấp 1 và thêm wrapper phục vụ màu sắc, nhưng không thay đổi markup submenu hoặc contract card sản phẩm.
- `assets/styles-2.css`: chứa toàn bộ màu, gradient và responsive chỉ dành cho v2; các rule mới phải scope rõ để không ảnh hưởng card sản phẩm.
- `assets/app-2.js`: controller riêng cho v2; giữ nguyên dữ liệu và renderer của submenu và card sản phẩm.
- `index.html`, `assets/styles.css` và `assets/app.js`: không được sửa cho công việc thiết kế version 2.0.
- Các thư mục media, font, product data và biến môi trường: tiếp tục dùng chung.

## Kiểm tra và tiêu chí chấp nhận

### Kiểm tra tĩnh

- Xác nhận tất cả màu trong đặc tả có vai trò rõ ràng hoặc mục đích không khí cụ thể.
- Xác nhận các selector, DOM ID và nguồn dữ liệu được nêu trong tài liệu tồn tại trong source.
- So sánh cấu trúc `.product-card` giữa hai phiên bản; mọi thay đổi ngoài ý muốn phải làm test thất bại.
- So sánh dữ liệu, loại flyout và cấu trúc submenu giữa hai phiên bản; mọi khác biệt phải làm test thất bại.
- Kiểm tra `index.html` vẫn tham chiếu file hiện tại và `index-2.html` chỉ tham chiếu asset riêng khi bước tách v2 được triển khai.

### Kiểm tra responsive và trình duyệt

Khi triển khai giao diện, kiểm tra tại các viewport tối thiểu `320px`, `768px`, `1440px` và `1920px`:

- Menu cấp 1 mới hoạt động đúng bằng chuột, cảm ứng và bàn phím.
- Submenu giữ nguyên nội dung, layout, hành vi và focus contract.
- Card sản phẩm giữ nguyên kích thước, mật độ, màu nền và các trạng thái tương tác.
- Không có overflow ngang ngoài các rail/carousel được thiết kế để cuộn.
- Focus ring, border-radius, border và shadow không bị cắt.
- Các section nhiều màu vẫn có tiêu đề và CTA dễ nhận diện.
- Console và page errors không phát sinh lỗi mới.

### Điều kiện hoàn thành

- Version 2.0 có cảm giác nhiều màu rõ ràng nhưng vẫn nhận diện là HACOM.
- Màu được dùng theo vai trò, không như trang trí rời rạc.
- Đỏ HACOM vẫn là tín hiệu thương mại chính.
- Menu cấp 1 có thể được thiết kế lại độc lập.
- Submenu và card sản phẩm không thay đổi về nội dung, cấu trúc, thiết kế hoặc hành vi.
- Việc phát triển `index-2.html` không gây thay đổi cho phiên bản `index.html` hiện tại.

## Giả định đã khóa

- Hai ảnh đính kèm chỉ là tham chiếu thị giác.
- “Nhiều màu sắc” nghĩa là màu có phân cấp, ý nghĩa và vùng sử dụng rõ ràng trên toàn trang; không quay lại nền Ice-Tech sáng đơn sắc và cũng không phủ màu bão hòa ngẫu nhiên lên mọi component.
- Card sản phẩm và submenu là hai vùng bảo toàn tuyệt đối.
- Menu cấp 1 được phép thiết kế lại cả cấu trúc và tương tác.
- Công việc hiện tại chỉ tạo tài liệu; chỉnh sửa giao diện và tách JavaScript v2 là bước triển khai riêng.
