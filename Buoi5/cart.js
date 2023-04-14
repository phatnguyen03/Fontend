lst = [];
curItem = null;
$(function () {
    var data = [
        {
            "value": "Quạt Bàn YANFAN B202",
            "label": "Quạt Bàn YANFAN B202 - 179.000Đ",
            "maSP": 'SP001',
            "tenSP": "Quạt Bàn YANFAN B202",
            "DG": 179000,
            "DVT": "Cái",
            "Loai": "Gia dụng"
        }, {
            "value": "Quạt Điều Hòa Không Khí Rapido Everest 3000-D",
            "label": "Quạt Điều Hòa Không Khí Rapido Everest 3000-D - 999.000Đ",
            "maSP": 'SP002',
            "tenSP": "Quạt Điều Hòa Không Khí Rapido Everest 3000-D",
            "DG": 999000,
            "DVT": "Cái",
            "Loai": "Gia dụng"
        }, {
            "value": "Máy Lạnh Sunhouse 1.0 HP SHR-AW09C110",
            "label": "Máy Lạnh Sunhouse 1.0 HP SHR-AW09C110 - 3.999.000Đ",
            "maSP": 'SP003',
            "tenSP": "Máy Lạnh Sunhouse 1.0 HP SHR-AW09C110",
            "DG": 3999000,
            "DVT": "Cái",
            "Loai": "Điện lạnh"
        }, {
            "value": "Smart Tivi Samsung 4K UHD 55 Inch UA55AU8000",
            "label": "Smart Tivi Samsung 4K UHD 55 Inch UA55AU8000 - 9.999.000Đ",
            "maSP": 'SP004',
            "tenSP": "Smart Tivi Samsung 4K UHD 55 Inch UA55AU8000",
            "DG": 9999000,
            "DVT": "Cái",
            "Loai": "Tivi"
        }
    ];
    $("#txtSanPham").autocomplete({
        source: data,
        select: function (e, ui) {
            curItem = ui.item;
            $("#lblChon").html("Bạn đã chọn <b>[" + ui.item.tenSP + "]</b> với giá " + formatNumber(ui.item.DG) + " VNĐ");
        }
    });
});

function themSP() {
    sl = parseInt($("#txtSL").val());
    curItem.SoLuong = sl
    curItem.ThanhTien = sl * curItem.DG;

    var i = 0;
    for (i = 0; i < lst.length; i++) {
        if (lst[i].maSP == curItem.maSP)
            break;
    }
    if (i < lst.length) {
        // tồn tại trong lst
        curItem.SoLuong = sl + lst[i].SoLuong;
        curItem.ThanhTien = curItem.SoLuong * curItem.DG;
        lst[i] = curItem;
    }
    else {
        lst.push(curItem);
    }

    ///console.log(lst);    
    TinhTongDon();
}

function TinhTongDon() {
    tong = 0;
    for (i = 0; i < lst.length; i++) {
        tong = tong + lst[i].ThanhTien;
    }
    $("#txtTongTien").html(formatNumber(tong));
    $("#totSP").text(lst.length);
    $("#ulCart").html("");
    $("#cartTemplate").tmpl(lst).appendTo("#ulCart");
}

function xoaSP(id) {
    console.log(lst);
    var i = 0;
    for (i = 0; i < lst.length; i++) {
        if (lst[i].maSP == id)
            break;
    }
    if (i < lst.length) {
        lst.splice(i, 1);
        TinhTongDon();
    }
}

function formatNumber(n) {
    return new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(n);
}