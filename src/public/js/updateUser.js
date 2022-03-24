let userAvatar = null
let userInfo = {}
let originAvatarSrc = null
let originUserInfo = {}
let userUpdatePassword = {}

function callLogout() {
  let timerInterval

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Tự động đăng xuất sau 5 giây.",
    html: "Thời gian: <strong></strong>",
    timerProgressBar: true,
    timer: 5000,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector("strong")
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }  
  }).then((result) => {
    $.get("/logout", function() {
      location.reload()
    })
  })
}

function updateUserInfo() {
  $("#input-change-avatar").bind("change", function(){
    let fileData = $(this).prop("files")[0]
    let math = ["image/png", "image/jpg", "image/jpeg"]
    let limit = 1048576 //byte = 1mb
    
    if ($.inArray(fileData.type, math) === -1) {
      alertify.notify("File không hợp lệ. (png,jpg,jpeg)", "error", 7)
      $(this).val(null)
      return false
    }

    if (fileData.size > limit) {
      alertify.notify("File Quá lớn tối đa 1mb", "error", 7)
      $(this).val(null)
      return false
    }

    if (typeof (FileReader) != "undefined") {
      let imagePreview = $("#image-edit-profile")
      imagePreview.empty()

      let fileReader = new FileReader()
      fileReader.onload = function(element) {
        $("<img>", {
          "src": element.target.result,
          "class": "avatar img-circle",
          "id": "avatar img-circle",
          "alt": "avatar"
        }).appendTo(imagePreview)
      }
      imagePreview.show()
      fileReader.readAsDataURL(fileData)

      let formData = new FormData()
      formData.append("avatar", fileData)
      userAvatar = formData

    } else {
      alertify("Trình duyệt của bạn không hỗ trợ FileReader.", "error", 7)
    }
    
  })

  $("#username").bind("change", function() {
    let username = $(this).val()
    let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)

    if (!regexUsername.test(username) || username.length < 3 || username.length > 17) {
      alertify.notify("Username quá dài vui lòng thu ngắn. Không chứa ký tự đặc biệt.", "error", 7)
      $(this).val(originUserInfo.username)
      delete userInfo.username
      return false
    }
    userInfo.username = username
  })
  $("#gender-male").bind("click", function() {
    let gender = $(this).val()
    
    if (gender !== "male") {
      alertify.notify("Vui lòng chọn đúng giới tính.", "error", 7)
      $(this).val(originUserInfo.gender)
      delete userInfo.gender
      return false
    }

    userInfo.gender = gender
  })
  $("#gender-female").bind("click", function() {
    let gender = $(this).val()
    
    if (gender !== "female") {
      alertify.notify("Vui lòng chọn đúng giới tính.", "error", 7)
      $(this).val(originUserInfo.gender)
      delete userInfo.gender
      return false
    }

    userInfo.gender = gender
  })
  $("#address").bind("change", function() {
    let address = $(this).val()

    if (address.length < 3 || address.length > 30) {
      alertify.notify("Địa chỉ quá dài, vui lòng thu ngắn.", "error", 7)
      $(this).val(originUserInfo.address)
      delete userInfo.address
      return false
    }

    userInfo.address = address
  })
  $("#phone").bind("change", function() {
    let phone = $(this).val()

    let regexPhone = new RegExp(/^(0)[0-9]{9,10}$/)

    if (!regexPhone.test(phone) || phone.length < 1 || phone.length > 11) {
      alertify.notify("Số điện thoại bắt đầu bằng 0, giới hạn 10 ký tự.", "error", 7)
      $(this).val(originUserInfo.phone)
      delete userInfo.phone
      return false
    }

    userInfo.phone = phone
  })

  $("#password-current").bind("change", function() {
    let currentPassword = $(this).val()

    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)

    if (!regexPassword.test(currentPassword)) {
      alertify.notify("Vui lòng nhập mật khẩu và ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.", "error", 7)
      $(this).val(null)
      delete userUpdatePassword.currentPassword
      return false
    }

    userUpdatePassword.currentPassword = currentPassword
  })

  $("#new-password").bind("change", function() {
    let newPassword = $(this).val()

    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)

    if (!regexPassword.test(newPassword)) {
      alertify.notify("Vui lòng nhập mật khẩu và ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.", "error", 7)
      $(this).val(null)
      delete userUpdatePassword.newPassword
      return false
    }

    userUpdatePassword.newPassword = newPassword
  })

  $("#new-password-confirm").bind("change", function() {
    let confirmNewPassword = $(this).val()


    if (!userUpdatePassword.newPassword) {
      alertify.notify("Vui lòng nhập mật khẩu mới.", "error", 7)
      $(this).val(null)
      delete userUpdatePassword.confirmNewPassword
      return false
    }
    if (confirmNewPassword !== userUpdatePassword.newPassword) {
      alertify.notify("Nhập lại mật khẩu không giống nhau.", "error", 7)
      $(this).val(null)
      delete userUpdatePassword.confirmNewPassword
      return false
    }

    userUpdatePassword.confirmNewPassword = confirmNewPassword
  })
}

function callUpdateUserAvatar() {
  $.ajax({
    url: "/user/update-avatar",
    type: "put",
    cache: false,
    contentType: false,
    processData: false,
    data: userAvatar, 
    success: function(result) {
      //
      $(".user-modal-alert-success").find("span").text(result.message)
      $(".user-modal-alert-success").css("display", "block")

      // avatar small nav
      $("#navbar-avatar").attr("src", result.imageSrc)
      originAvatarSrc = result.imageSrc

      $("#input-btn-cancel-update-user").click()
    },
    error: function(error) {
      //
      $(".user-modal-alert-error").find("span").text(error.responseText)
      $(".user-modal-alert-error").css("display", "block")

      //
      $("#input-btn-cancel-update-user").click()
    }
  })
}

function callUpdateUserInfo() {
  $.ajax({
    url: "/user/update-info",
    type: "put",
    data: userInfo, 
    success: function(result) {
      //
      $(".user-modal-alert-success").find("span").text(result.message)
      $(".user-modal-alert-success").css("display", "block")

      originUserInfo = Object.assign(originUserInfo, userInfo)

      //nav username
      $("#nav-username").text(originUserInfo.username)

      $("#input-btn-cancel-update-user").click()
    },
    error: function(error) {
      //
      $(".user-modal-alert-error").find("span").text(error.responseText)
      $(".user-modal-alert-error").css("display", "block")

      //
      $("#input-btn-cancel-update-user").click()
    }
  })
}

function callUpdateUserPassword() {
  $.ajax({
    url: "/user/update-password",
    type: "put",
    data: userUpdatePassword, 
    success: function(result) {
      //
      $(".user-modal-password-alert-success").find("span").text(result.message)
      $(".user-modal-password-alert-success").css("display", "block")

      //
      $("#input-btn-cancel-user-password").click()

      // logout after change password success
      callLogout()
    },
    error: function(error) {
      //
      $(".user-modal-password-alert-error").find("span").text(error.responseText)
      $(".user-modal-password-alert-error").css("display", "block")

      //
      $("#input-btn-cancel-user-password").click()
    }
  })
}

$(document).ready(function() {
  originAvatarSrc = $("#user-modal-avatar").attr("src")
  originUserInfo = {
    username: $("#username").val(),
    gender: ($("#gender-male").is(":checked")) ? $("#gender-male").val() : $("#gender-female").val(),
    address: $("#address").val(),
    phone: $("#phone").val()
  }

  updateUserInfo()

  $("#input-btn-update-user").bind("click", function() {
    if ($.isEmptyObject(userInfo) && !userAvatar) {
      alertify.notify("Bạn chưa thay đổi thông tin mới.", "error", 7)
      return false
    }
    if (userAvatar) {
      callUpdateUserAvatar()
    }
    if (!$.isEmptyObject(userInfo)) {
      callUpdateUserInfo()
    }
  })

  $("#input-btn-cancel-update-user").bind("click", function() {
    userAvatar = null
    userInfo = {}
    $("#input-change-avatar").val(null)
    $("#user-modal-avatar").attr("src", originAvatarSrc)

    $("#username").val(originUserInfo.username)
    $(originUserInfo.gender === "male") ? $("#gender-male").click() : $("#gender-female").click()
    $("#address").val(originUserInfo.address)
    $("#phone").val(originUserInfo.phone)
  })

  $("#input-btn-update-user-password").bind("click", function() {
    if (!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword) {
      alertify.notify("Bạn chưa nhập đủ thông tin.", "error", 7)
      return false
    }
    Swal.fire({
      title: "Bạn có muốn thay đổi mật khẩu?",
      text: "Không thể hoàn tác lại quá trình này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ECC71",
      cancelButtonColor: "#ff7675",
      confirmButtonText: "Xác nhận!",
      cancelButtonText: "Huỷ"
    }).then((result) => {
      if (!result.value) {
        $("#input-btn-cancel-user-password").click()
        return false
      }
      callUpdateUserPassword()
    })

  })

  $("#input-btn-cancel-user-password").bind("click", function() {
    userUpdatePassword = {}
    $("#password-current").val(null)
    $("#new-password").val(null)
    $("#new-password-confirm").val(null)
  })
})