export const transValidation = {
  email_incorrect: "Email phải có dạng example@email.com",
  gender_incorrect: "Chọn một giới tính",
  password_incorrect: "Vui lòng nhập mật khẩu và ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
  password_confirm_incorrect: "Mật khẩu nhập lại không trùng nhau."
}

export const transError = {
  account_in_use: "Email đã được sử dụng.",
  account_removed: "Tài khoản đã bị xoá.",
  accout_isNotActive: "Tài khoản chưa kích hoạt.",
  token_undefined: "Token không tồn tại."
}

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã tạo thành công. Kiểm tra email để kích hoạt tài khoản.`
  },
  account_active_success: "Kích hoạt thành công. Hãy đăng nhập."
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