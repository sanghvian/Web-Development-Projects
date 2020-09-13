function billingFunction() {
    if (document.getElementById('same').checked) { // find whether checkbox is checked or not
        document.getElementById('billingName').value = document.getElementById('shippingName').value;
        document.getElementById('billingZip').value = document.getElementById('shippingZip').value;
    }
    else {
        document.getElementById('billingName').value = "";
        document.getElementById('billingZip').value = "";
    }
}
