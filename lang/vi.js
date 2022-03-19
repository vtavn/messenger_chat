export const transValidation = {
  email_incorrect: "Email phải có dạng example@email.com",
  gender_incorrect: "Chọn một giới tính",
  password_incorrect: "Vui lòng nhập mật khẩu và ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
  password_confirm_incorrect: "Mật khẩu nhập lại không trùng nhau."
}

export const transError = {
  account_in_use: "Email đã được sử dụng.",
  account_removed: "Tài khoản đã bị xoá.",
  accout_isNotActive: "Tài khoản chưa kích hoạt."
}

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã tạo thành công. Kiểm tra email để kích hoạt tài khoản.`
  }
}