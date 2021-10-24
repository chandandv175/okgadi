const checkMandatory = (array, body) => {
    let valid = true;
    let fields = new Array();

    if (Array.isArray(array)) {
        array.forEach(each => {
            if (!body[each] && body) {
                valid = false;
                fields.push(each);
            }
        })
    }
    else {
        valid = false;
    }

    return [valid,fields];
}

export {checkMandatory}