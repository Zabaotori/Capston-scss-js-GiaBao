console.log(axios);

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