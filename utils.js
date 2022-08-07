exports.included = (text, keyWords) =>{
    for(const w of keyWords){
        if (text?.search(w) !== -1) {
            return true;
        }
    }

    return false;
}