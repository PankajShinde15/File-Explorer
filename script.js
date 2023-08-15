function checkFileName(event) {
    const regex = /^(?!.{11,})[a-zA-Z0-9]*$/;
    if (!fileName.match(regex)) {
        window.alert("File name should be less than 10 char & it should not contain number!!")
    }
}