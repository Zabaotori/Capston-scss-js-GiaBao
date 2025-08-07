let renderProduct = (arr) => {
    let strHTML = '';
    for (let element of arr) {
        strHTML += `
            <div class="col-md-4 mb-4 d-flex justify-content-center">
                <div class="card" style="width: 16rem;">
                    <img src=${element.image} class="card-img-top" alt="Adidas Prophere">
                    <div class="card-body text-center p-2">
                        <h5 class="card-title mb-1">${element.name}</h5>
                        <p class="card-text text-muted" style="font-size: 14px;">${element.shortDescription}</p>
                    </div>
                    <div class="d-flex">
                        <a href="./detail.html?productid=${element.id}" class="btn flex-fill text-white"
                            style="background-color: #eac16a; border-radius: 0;">Buy now</a>
                        <div class="flex-fill bg-light text-end px-2 d-flex align-items-center justify-content-end"
                            style="border-radius: 0;">
                            <strong>${element.price}$</strong>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    return strHTML;
}

let getAllProduct = async () => {
    let res = await axios({
        url: 'https://shop.cyberlearn.vn/api/Product',
        method: 'GET',
    });
    console.log(res.data.content);
    let html = renderProduct(res.data.content);
    document.querySelector('#listProduct').innerHTML = html;
}
getAllProduct();

let getProductDetail = async (id) => {
    try {
        let res = await axios.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`);
        let product = res.data.content;

        let html = `
            <div class="container py-5">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <h2>${product.name}</h2>
                        <p class="text-muted">${product.description}</p>
                        <div class="d-flex align-items-center mb-3">
                            <span class="me-2">Size:</span>
                            ${product.size.map(size => `<button class="btn btn-outline-dark btn-sm me-2">${size}</button>`).join('')}
                        </div>
                        <h4 class="text-danger">${product.price}$</h4>
                        <button class="btn btn-dark mt-3">Add to cart</button>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.infoProduct').innerHTML = html;

    } catch (err) {
        console.error("Lỗi khi load chi tiết sản phẩm", err);
    }
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("productid");
    getProductDetail(id);
};
