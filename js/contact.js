const send_btn = document.getElementById("send_btn")
const contact_data=[];
send_btn?.addEventListener("click", function (e) {
    e.preventDefault()
    let contact_fullname = document.getElementById("contact_fullname").value.trim();
    let contact_email = document.getElementById("contact_email").value.trim();
    let contact_adress = document.getElementById("contact_adress").value.trim();
    let contact_phone = document.getElementById("contact_phone").value.trim();
    let contact_note = document.getElementById("contact_note").value.trim();

    if (!contact_fullname || !contact_email || !contact_adress || !contact_phone) {
        alert("Please fill in all fields!")
    } else {
        const contactObj = {
            fullName: contact_fullname,
            adress: contact_adress,
            email: contact_email,
            phone: contact_phone,
            note: contact_note
        };
        contact_data.push(contactObj);
        document.getElementById("contact_fullname").value = "";
        document.getElementById("contact_email").value = "";
        document.getElementById("contact_adress").value = "";
        document.getElementById("contact_phone").value = "";
        document.getElementById("contact_note").value = "";
        alert("it is okay")

        console.log(contact_data)
    }
   
})

