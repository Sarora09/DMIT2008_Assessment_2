window.addEventListener("load", function (e) {
    let userInsert = document.querySelector('.importedusersdata') // referencing to the importedusersdata class so as to append the data received from the API
        let url = "/api/v1/users";
        fetch(url).then(res=>res.json()).then(data=>{
            console.log(data);
            data.map(element=>{
                const template = `
                <aside class="app-form usersdata">
            <div style="text-align: center ">
                <p style="margin-bottom:18px;">User Name: ${element.fullname}</p>
                <p style="margin-bottom:18px;">Email Address: ${element.email}</p>
                <p style="margin-bottom:18px;">Password: ${element.password}</p>
                <p style="margin-bottom:18px;">Unique ID#: ${element.uuidCode}</p>
            </div>
            </aside>`;
            const elem = document.createRange().createContextualFragment(template).children[0];
            userInsert.append(elem);
            })
        });
});