let userAvatar = null
let userInfo = {}
let originAvatarSrc = null

function updateUserInfo() {
  $("#input-change-avatar").bind('change', function(){
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
    userInfo.username = $(this).val()
  })
  $("#gender-male").bind("click", function() {
    userInfo.gender = $(this).val()
  })
  $("#gender-female").bind("click", function() {
    userInfo.gender = $(this).val()
  })
  $("#address").bind("change", function() {
    userInfo.address = $(this).val()
  })
  $("#phone").bind("change", function() {
    userInfo.phone = $(this).val()
  })
}

$(document).ready(function() {
  updateUserInfo()
  originAvatarSrc = $("#user-modal-avatar").attr("src")

  $("#input-btn-update-user").bind("click", function() {
    if ($.isEmptyObject(userInfo) && !userAvatar) {
      alertify.notify("Bạn chưa thay đổi thông tin mới.", "error", 7)
      return false
    }

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

  })
  $("#input-btn-cancel-update-user").bind("click", function() {
    userAvatar = null
    userInfo = {}
    $("#input-change-avatar").val(null)
    $("#user-modal-avatar").attr("src", originAvatarSrc)
  })
})