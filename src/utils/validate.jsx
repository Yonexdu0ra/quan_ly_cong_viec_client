class Validate {
  isUsername(username) {
    // username = username.trim();
    try {
      if (!username || username.trim() === "")
        throw new Error("Vui lòng nhập username");
      username = username.trim();
      if (username.length < 5) {
        throw new Error("username phải có độ dài tối thiểu 5 ký tự");
      }
      if (username.length > 25) {
        throw new Error("username có độ dài tối đa 25 ký tự");
      }
      // if(username.length < 5 || username.length > 25) {
      //   throw new Error(
      //     "username phải có độ dài tối thiểu là 5 và tối đa là 25 ký tự và không chứa ký tự đặc biệt"
      //   );
      // }
      const regex = /^[a-zA-Z0-9]+$/;
      if (!regex.test(username)) {
        throw new Error("username không được chứa ký tự đặc biệt");
      }
      return {
        status: true,
        message: "",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message || "Tài khoản không hợp lệ",
      };
    }
  }
  isFullname(fullname) {
    try {
      if (!fullname || fullname.trim() === "")
        throw new Error("Vui lòng nhập fullname");
      fullname = fullname.trim();
      if (fullname.length < 6) {
        throw new Error("fullname phải có độ dài tối thiểu 5 ký tự");
      }
      if (fullname.length > 25) {
        throw new Error("fullname phải có độ dài tối đa 25 ký tự");
      }
      // if(fullname.length < 6 || fullname.length > 25) {
      //   throw new Error(
      //     "fullname phải có độ dài tối thiểu là 5 và tối đa là 25 ký tự"
      //   );
      // }
      // const regex = /^[a-zA-Z\s]+$/;
      // if (!regex.test(fullname)) {
      //   throw new Error("Họ và tên không được chứa ký tự đặc biệt");
      // }
      return {
        status: true,
        message: "",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message || "Họ và tên không hợp lệ",
      };
    }
  }
  isEmail(email) {
    
    try {
      if (!email || email.trim() === "")
        throw new Error("Vui lòng nhập email");
      email = email.trim();
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(email)) {
        throw new Error("Email không hợp lệ");
      }
      return {
        status: true,
        message: "",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message || "Email không hợp lệ",
      };
    }
  }
  isPassword(password) {
    try {
      if (!password || password.trim() === "")
        throw new Error("Vui lòng nhập password");
      password = password.trim();
      if (password.length < 6) {
        throw new Error("password phải có tối thiểu 6 ký tự");
      }
      if (password.length > 25) {
        throw new Error("password có tối đa 25 ký tự");
      }
      // if(password.length < 6 || password.length > 25) {
      //   throw new Error(
      //     "password phải có độ dài tối thiểu là 6 ký và tối đa là 25 ký tự"
      //   );
      // }
      return {
        status: true,
        message: "",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message || "Mật khẩu không hợp lệ",
      };
    }
  }
  isPhone(phone) {
    phone = phone.trim();
    try {
      const regex = /^[0-9]{10}$/;
      if (!regex.test(phone)) {
        throw new Error("Số điện thoại không hợp lệ");
      }
      return {
        status: true,
        message: "",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message || "Số điện thoại không hợp lệ",
      };
    }
  }
}
export default new Validate();
