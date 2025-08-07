document.querySelector('#formRegister').onsubmit = async (e) => {
    e.preventDefault();

    // Lấy tất cả input
    let arrTag = document.querySelectorAll('#formRegister input');

    // Biến chứa dữ liệu người dùng
    let nguoiDung = {};
    let password = '';
    let passwordConfirm = '';
    let isValid = true;
    let message = '';

    for (let tag of arrTag) {
        let { id, value, type, checked } = tag;
        let val = value.trim();

        // Bỏ qua radio chưa được chọn
        if (type === 'radio' && !checked) continue;

        // Kiểm tra rỗng
        if (!val) {
            isValid = false;
            message = 'Vui lòng nhập đầy đủ thông tin.';
            break;
        }

        // Xử lý từng trường
        if (id) {
            switch (id) {
                case 'email':
                    if (!/^\S+@\S+\.\S+$/.test(val)) {
                        isValid = false;
                        message = 'Email không hợp lệ.';
                    } else {
                        nguoiDung.email = val;
                    }
                    break;

                case 'name':
                    nguoiDung.name = val;
                    break;

                case 'password':
                    if (val.length < 6) {
                        isValid = false;
                        message = 'Mật khẩu phải từ 6 ký tự trở lên.';
                    }
                    password = val;
                    nguoiDung.password = val;
                    break;

                case 'phone':
                    if (!/^[0-9]{9,11}$/.test(val)) {
                        isValid = false;
                        message = 'Số điện thoại không hợp lệ.';
                    } else {
                        nguoiDung.phone = val;
                    }
                    break;

                case 'male':
                case 'female':
                    nguoiDung.gender = val === 'true';
                    break;

                default:
                    break;
            }
        } else if (type === 'password' && !id) {
            // Đây là ô xác nhận mật khẩu (password confirm)
            passwordConfirm = val;
        }

        if (!isValid) break;
    }

    // Kiểm tra password confirm
    if (isValid && password !== passwordConfirm) {
        isValid = false;
        message = 'Mật khẩu xác nhận không khớp.';
    }

    if (!isValid) {
        alert(message);
        return;
    }

    console.log('Dữ liệu hợp lệ:', nguoiDung);

    // Gửi dữ liệu
    try {
        let res = await axios({
            url: `https://shop.cyberlearn.vn/api/Users/signup`,
            method: 'POST',
            data: nguoiDung,
        });
        alert('Đăng ký thành công!');
    } catch (err) {
        console.log(err);
        alert('Đăng ký thất bại! Email này có thể đã tồn tại.');
    }
};
