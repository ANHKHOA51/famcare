export const mockAiResponse = {
  patient: {
    name: "Nguyễn Văn A",
    id: "284902",
    diagnosis: "Tiểu đường Type 2 & Gout",
  },
  medications: [
    { name: "Glucophage (Metformin)", dosage: "500mg", frequency: "2 lần/ngày, sau bữa ăn", purpose: "Kiểm soát đường huyết" },
    { name: "Allopurinol", dosage: "300mg", frequency: "1 lần/ngày", purpose: "Giảm acid uric" },
    { name: "Losartan", dosage: "50mg", frequency: "1 lần/ngày, buổi sáng", purpose: "Kiểm soát huyết áp" },
  ],
  nutriHealthPlan: {
    recommended: [
      { name: "Salad Quinoa & Bơ", reason: "Chỉ số đường huyết (GI) thấp", icon: "🥗" },
      { name: "Cá hồi hấp chanh", reason: "Giàu Omega-3, tốt cho khớp", icon: "🐟" },
      { name: "Rau xanh luộc", reason: "Giàu chất xơ, ổn định đường huyết", icon: "🥦" },
      { name: "Trái cây ít đường", reason: "Bưởi, táo xanh — GI thấp", icon: "🍏" },
    ],
    avoid: [
      { name: "Thịt đỏ & nội tạng", reason: "Tăng acid uric, nguy cơ Gout", icon: "🥩" },
      { name: "Đồ uống có đường", reason: "Tăng đường huyết đột ngột", icon: "🥤" },
      { name: "Cơm trắng (nhiều)", reason: "GI cao, ảnh hưởng đường huyết", icon: "🍚" },
      { name: "Rượu bia", reason: "Tương tác thuốc & tăng acid uric", icon: "🍺" },
    ],
  },
  expertNotes: [
    { title: "Hạn chế Purin", description: "Tránh các loại thịt đỏ và nội tạng động vật trong 3 ngày tới để kiểm soát chỉ số Acid Uric." },
    { title: "Tăng cường nước", description: "Uống ít nhất 2.5 lít nước mỗi ngày để hỗ trợ đào thải đường huyết dư thừa." },
  ],
};

export const scanningMessages = [
  "AI đang phân tích đơn thuốc...",
  "Nhận diện chữ viết tay...",
  "Trích xuất danh sách thuốc...",
  "Phân tích tương tác thuốc...",
  "Tạo kế hoạch dinh dưỡng...",
];
