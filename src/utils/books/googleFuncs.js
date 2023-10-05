"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLargestImage = exports.getISBN = void 0;
var getISBN = function (volumeInfo) {
    var identifiers = volumeInfo;
    if (identifiers) {
        for (var _i = 0, identifiers_1 = identifiers; _i < identifiers_1.length; _i++) {
            var identifierObj = identifiers_1[_i];
            if (identifierObj.type === 'ISBN_10') {
                return identifierObj.identifier;
            }
            if (identifierObj.type === 'ISBN_13') {
                return identifierObj.identifier;
            }
        }
    }
    return ''; // return an empty string when no ISBN-10 is found
};
exports.getISBN = getISBN;
var getLargestImage = function (imageLinks) {
    var imageSizes = ['extraLarge', 'large', 'medium', 'small', 'thumbnail', 'smallThumbnail'];
    for (var _i = 0, imageSizes_1 = imageSizes; _i < imageSizes_1.length; _i++) {
        var size = imageSizes_1[_i];
        if (imageLinks[size]) {
            return imageLinks[size];
        }
    }
    return ''; // return an empty string when no image is found
};
exports.getLargestImage = getLargestImage;
