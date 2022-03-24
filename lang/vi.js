export const transValidation = {
  email_incorrect: "Email phải có dạng example@email.com",
  gender_incorrect: "Chọn một giới tính",
  password_incorrect: "Vui lòng nhập mật khẩu và ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
  password_confirm_incorrect: "Mật khẩu nhập lại không trùng nhau.",
  update_username: "Username quá dài vui lòng thu ngắn. Không chứa ký tự đặc biệt.",
  update_gender: "Vui lòng chọn đúng giới tính.",
  update_address: "Địa chỉ quá dài, vui lòng thu ngắn.",
  update_phone: "Số điện thoại bắt đầu bằng 0, giới hạn 10 ký tự."
}

export const transError = {
  account_in_use: "Email đã được sử dụng.",
  account_removed: "Tài khoản đã bị xoá.",
  account_isNotActive: "Tài khoản chưa kích hoạt.",
  account_undefined: "Tài khoản không tồn tại.",
  account_current_password_failed: "Mật khẩu hiện tại không đúng",
  token_undefined: "Token không tồn tại.",
  login_failed: "Đăng nhập không thành công.",
  server_error: "Hệ thống không phản hồi. Vui lòng thử lại.",
  avatar_type: "File không hợp lệ.",
  avatar_size: "File quá lớn không thể upload tối đa 1mb."
}

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã tạo thành công. Kiểm tra email để kích hoạt tài khoản.`
  },
  account_active_success: "Kích hoạt thành công. Hãy đăng nhập.",
  login_success: (username) => {
    return `Tài khoản ${username}. Đã đăng nhập thành công.!`
  },
  logout_success: "Đăng xuất thành công.",
  info_updated: "Thay đổi thông tin thành công.",
  account_password_updated: "Thay đổi mật khẩu thành công"
}

export const transMail = {
  subject_active: "Mesenger App: Kích hoạt tài khoản.",
  template_active: (url_active) => {
    return `<center>
      <h2>Kích hoạt tài khoản bằng cách nhấp vào đường link phía dưới.</h2>
      <h3><a href="${url_active}" target="_blank">${url_active}</a></h3>
      <h4>Cảm ơn.</h4></center>
    `
  },
  send_failed: "Gửi email thất bại."
}