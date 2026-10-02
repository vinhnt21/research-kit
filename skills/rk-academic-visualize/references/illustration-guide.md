# Cẩm Nang Trực Quan Hóa Học Thuật (Academic Visualization Guide)

Tài liệu này cung cấp các nguyên lý thiết kế khoa học tổng quát, kèm theo phân tích các case study thực tế nhằm hỗ trợ tạo hình minh họa chất lượng cao (LaTeX TikZ, Mermaid, SVG, kiến trúc luồng) cho bài báo khoa học, báo cáo nghiên cứu và slide hội thảo.

---

# PHẦN I: CÁC NGUYÊN LÝ THIẾT KẾ KHOA HỌC TỔNG QUÁT

## 1. Trực Quan Hóa Hướng Nhận Thức & Lọc Thông Tin (Cognitive Clarity & Filtering)
- **Quy tắc 5 giây**: Mỗi hình vẽ khoa học cần tập trung truyền đạt một thông điệp cơ chế (mechanism) hoặc so sánh (comparison) trọng tâm. Người đọc phải nắm được ý chính trong vòng 5 giây quan sát đầu tiên.
- **Lọc chi tiết thứ yếu**: Tránh nhồi nhét mọi chi tiết kỹ thuật hay tham số triển khai vào hình vẽ. Hãy chuyển các dữ liệu thứ cấp, định nghĩa dài dòng hoặc bảng số liệu chi tiết sang phần chú thích hình (caption), văn bản chính (body text) hoặc phụ lục.
- **Mật độ thông tin thích ứng**: Cân đối số lượng nút (nodes) và lượng chữ trên mỗi nút theo kích thước khung hình, đảm bảo tính súc tích và tránh gây quá tải thị giác.

## 2. Bố Cục Không Gian & Phân Cấp Thị Giác (Spatial Hygiene & Visual Hierarchy)
- **Căn chỉnh & Nhóm trực quan**: Nhóm các thực thể có mối liên hệ logic chặt chẽ lại gần nhau. Sử dụng khoảng cách (whitespace) và kích thước nhất quán để người xem nhận biết ngay cấu trúc phân cấp.
- **Khoảng thở an toàn (Padding & Margins)**: Luôn duy trì khoảng cách đệm tối thiểu giữa nội dung chữ và đường biên của thẻ chứa để chống tràn chữ (text overflow) hoặc chạm viền gây tức mắt.

## 3. Ngữ Nghĩa Dòng Chảy & Đường Nối (Flow Semantics & Connector Legibility)
- **Phản ánh đúng bản chất tương tác**:
  - Dùng **mũi tên 1 chiều** cho dòng dữ liệu tuần tự, truyền tin đơn hướng hoặc chuyển trạng thái tuyến tính.
  - Dùng **mũi tên 2 chiều** cho các mắt xích có trao đổi phản hồi (feedback loop), đàm phán, cộng tác đa bên hoặc tương tác có sự can thiệp của con người (Human-in-the-loop).
- **Nguyên tắc không che khuất (Zero Occlusion)**:
  - Nhãn chú thích trên đường nối tuyệt đối không được đè bẹp hay cắt đứt thân mũi tên.
  - Luôn định vị nhãn lệch lên trên hoặc sang bên với khoảng cách an toàn, duy trì tính liên tục và trọn vẹn của đường kết nối.

## 4. Bảng Màu Ngữ Nghĩa & Khả Năng Tiếp Cận (Accessibility & Grayscale QA)
- **Bảng màu có chủ đích**: Phân bổ màu sắc theo vai trò thông tin (ví dụ: cảnh báo/thất bại vs. module trung tính vs. thành công/kiểm chứng).
- **Kiểm định in ấn thang xám (Grayscale QA)**:
  - Không bao giờ chỉ dùng màu sắc đơn độc để mã hóa thông tin.
  - Luôn kết hợp màu với các ký hiệu hình học độc lập (icon, hình dạng nút khác biệt, đường viền nét đứt/liền) để hình vẽ vẫn giữ nguyên 100% ngữ nghĩa khi in đen trắng hoặc đọc trên máy đọc sách E-ink.

## 5. Tái Lập Từ Mã Nguồn (Code-First Reproducibility)
- Ưu tiên mô tả hình ảnh bằng mã nguồn có thể lập trình và biên dịch lại tự động (XeLaTeX TikZ, Mermaid script, SVG vector).
- Quản lý mã nguồn hình ảnh qua Git để thuận tiện cho việc tinh chỉnh, sửa đổi và bảo trì lâu dài cùng tài liệu bài báo.

---

# PHẦN II: CASE STUDY THỰC TẾ & BÀI HỌC TINH CHỈNH

Phần này phân tích một bài toán thực tế: **Thiết kế sơ đồ so sánh quy trình nghiên cứu có sự hỗ trợ của AI (Comparative Human-Agent Pipeline)**.

```
[Researcher] <=====> [Skills Catalog] <=====> [Agent Execution] <=====> [Results & Review]
```

### 1. Bối cảnh & Yêu cầu bài toán
- **Mục tiêu**: So sánh 2 tiếp cận:
  - *Luồng 1 (Ad-hoc / Rối)*: Nhà nghiên cứu đối mặt danh mục hàng chục skill chưa phân loại $\rightarrow$ Agent gọi nhầm công cụ $\rightarrow$ Kết quả khó kiểm định.
  - *Luồng 2 (Research Kit / Chuẩn hóa)*: Nhà nghiên cứu chọn skill theo 6 chặng chuẩn $\rightarrow$ Agent thực thi đúng phạm vi $\rightarrow$ Bàn giao có minh chứng rõ ràng.
- **Bố cục lựa chọn**: Xếp 2 luồng song song trên dưới (Row 1 vs. Row 2) với cùng trục tọa độ hoành $x$, đồng nhất số lượng và kích thước thẻ để tạo sự đối xứng so sánh trực tiếp.

### 2. Vấn đề thực tế 1: Nhãn đè che mất thân mũi tên
- **Tình huống gặp phải**: Ban đầu, nhãn mô tả hành động đặt ở giữa đường nối với `node[midway, fill=white]`. Kết quả là hộp nền trắng của nhãn che gần hết thân mũi tên, chỉ lộ ra một mẩu đầu mũi tên, tạo cảm giác đường truyền bị đứt gãy.
- **Giải pháp**:
  - Nhấc nhãn **nổi hoàn toàn phía trên** đường nối với khoảng cách an toàn (ví dụ: `above=8pt` trong TikZ).
  - Dùng thẻ nhãn pill badge có màu nền nhạt tương ứng (`dangerbg`, `greenbg`) và viền bo góc mỏng.
  - Giữ khoảng hở $\sim 2\text{--}3\text{mm}$ không khí giữa đáy thẻ nhãn và đỉnh thân mũi tên. Thân mũi tên được vẽ liền mạch từ khối này sang khối kia.

### 3. Vấn đề thực tế 2: Tương tác Người - Agent cần mũi tên 2 chiều
- **Tình huống gặp phải**: Ban đầu các mũi tên được vẽ 1 chiều ($A \rightarrow B \rightarrow C$). Tuy nhiên, quy trình nghiên cứu thực tế giữa con người và AI là quy trình cộng tác lặp (iterative feedback loop) chứ không phải đường ống một chiều.
- **Giải pháp**:
  - Chuyển toàn bộ các đường nối sang dạng **mũi tên 2 chiều** (`<--->`, `{Stealth}-{Stealth}`).
  - Tăng khoảng cách giữa các khối (ví dụ: từ $1.6\text{cm}$ lên $2.4\text{cm}$) để thân mũi tên và 2 đầu mũi tên hiển thị thanh thoát, không bị co cụm.

### 4. Vấn đề thực tế 3: Tràn viền chữ do căn giữa (Text Overflow)
- **Tình huống gặp phải**: Khi thẻ có chiều rộng cố định (ví dụ: $4.0\text{cm}$), việc căn giữa (`align=center`) khiến các cụm từ dài hoặc in đậm (`\textbf{}`) bị nở đều sang 2 bên và chạm sát viền thẻ.
- **Giải pháp**:
  - Tăng chiều rộng thẻ lên mức hợp lý (ví dụ: $4.6\text{cm}$).
  - Cắt ngắn các câu dài thành các bullet point dưới 26 ký tự.
  - Đảm bảo padding trong tối thiểu $\ge 4\text{mm}$.

### 5. Vấn đề thực tế 4: Câu chữ cộc lốc hoặc dịch máy
- **Tình huống gặp phải**: Ban đầu sử dụng các nhãn rút gọn quá mức như *"Mơ hồ chọn"*, *"Lệch hướng"*, *"Log thô"*, gây khó hiểu cho người đọc.
- **Giải pháp**:
  - Dùng câu từ tiếng Việt tự nhiên và có tính đối xứng rõ ràng:
    - *Khó chọn đúng skill* $\longleftrightarrow$ *Dễ chọn theo chặng*
    - *Dễ gọi nhầm skill* $\longleftrightarrow$ *Đúng việc, đúng skill*
    - *Log thô, thiếu nguồn* $\longleftrightarrow$ *Kèm minh chứng rõ*
    - *Quá tải đối chiếu log* $\longleftrightarrow$ *Dễ đối chiếu nguồn*

---

### 6. Mẫu triển khai mã nguồn tham khảo (Reference TikZ Pattern)

```latex
% Thiết lập style thẻ và nhãn nổi
\tikzset{
  card/.style={
    draw=navy, rounded corners=6pt, fill=white,
    text width=4.6cm, minimum height=3.0cm, align=center, inner sep=10pt
  },
  arrowlabel/.style={
    above=8pt, font=\scriptsize\bfseries, rounded corners=3pt,
    inner sep=2.5pt, fill=greenbg, draw=green!40
  },
  twoway/.style={
    {Stealth[length=2.5mm]}-{Stealth[length=2.5mm]}, very thick, draw=navy!80
  }
}

% Vẽ đường nối 2 chiều với nhãn nổi không che mũi tên
\draw[twoway] (cardA.east) -- node[arrowlabel] {Dễ chọn theo chặng} (cardB.west);
```
