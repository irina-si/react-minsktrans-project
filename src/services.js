function stopConstructorCreator (arr) {
    return function () {
        for (let key = 0; key < arr.length; key++) {
            this[arr[key]] = arguments[key];
        }
    }
}

function createArrOfStops(arr, stopObjConstructor) {
    return arr.map(string => {
        let stopInfoArr = string.split(";");
        return new stopObjConstructor(...stopInfoArr);
    });
}

export default function parceResponse(response) {
    let array = response.split(/(?<=[0-9])\s(?=[0-9])/g);
    let objKeys = array[0].split(";");
    let stopObjConstructor = stopConstructorCreator(objKeys);

    return createArrOfStops(array, stopObjConstructor);
}
