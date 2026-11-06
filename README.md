# Cổng thông tin phần mềm Oanh Sơn

Đã cấu hình 5 phần mềm chính và giữ nguyên 4 vị trí dự phòng.

## 5 phần mềm
1. Gia phả Nguyễn Đình — đã gắn website GitHub Pages.
2. OANH SƠN HRM — đã gắn website GitHub Pages.
3. Quản lý thông tin khách hàng (CRM) — đã khai báo repository; cần gắn URL Pages sau khi xác nhận triển khai.
4. Hệ thống đặt hàng HABECO — đã có thẻ; cần gắn URL website sau khi đưa bản ZIP mới lên repository và bật GitHub Pages.
5. Tính điểm ăn sáng — đã khai báo repository; cần gắn URL Pages sau khi xác nhận triển khai.

## Cập nhật lên GitHub
Repository cổng thông tin: `cong-phan-mem-oanh-son`.
Giải nén ZIP và tải các tệp trong thư mục gốc lên repository, ghi đè phiên bản cũ. Nếu chỉ cập nhật danh sách ứng dụng, có thể thay riêng `apps.js`.

Các thẻ có URL sẽ hiện nút **Mở phần mềm**. Các thẻ chưa có URL vẫn hiển thị nhưng báo **Chưa kết nối**. Khi có địa chỉ website thực tế, điền vào trường `appUrl` trong `apps.js`.

GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.

Lưu ý: Cổng chỉ điều hướng, không tự đồng bộ dữ liệu giữa các phần mềm.
