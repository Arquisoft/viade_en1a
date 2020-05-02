export async function getFileContent(file, callback){
    var fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function () {
        callback(fileReader.result);
    };
}