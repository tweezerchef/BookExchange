"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateBookISBN = void 0;
var prismaClient_1 = require("../prismaClient");
var findOrCreateBookISBN = function (_a) {
    var book = _a.book;
    return __awaiter(void 0, void 0, void 0, function () {
        var title, ISBN10, author, image, description, subTitle, pubDate, pageCount, genre, buyLink, viewAbility, rating, content, mainGenre, newBook;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    title = book.title, ISBN10 = book.ISBN10, author = book.author, image = book.image, description = book.description, subTitle = book.subTitle, pubDate = book.pubDate, pageCount = book.pageCount, genre = book.genre, buyLink = book.buyLink, viewAbility = book.viewAbility, rating = book.rating, content = book.content, mainGenre = book.mainGenre;
                    return [4 /*yield*/, prismaClient_1.default.books.findUnique({
                            where: { ISBN10: ISBN10 },
                            select: {
                                // include all columns from the books table
                                id: true,
                                title: true,
                                subTitle: true,
                                pubDate: true,
                                pageCount: true,
                                author: true,
                                selfLink: true,
                                description: true,
                                content: true,
                                image: true,
                                mainGenre: true,
                                buyLink: true,
                                viewAbility: true,
                                rating: true,
                                ISBN10: true,
                                Activity: true,
                                Clubs_Books: true,
                                Discussions: true,
                                Genre: true,
                                Posts: true,
                                BookAccess: true,
                                UserBooks: {
                                    select: {
                                        id: true,
                                        wishlist: true,
                                        owned: true,
                                        booksId: true,
                                        userId: true,
                                        rating: true,
                                        review: true,
                                        LendingTable: true,
                                        Books: {
                                            select: {
                                                id: true,
                                                title: true,
                                                author: true,
                                                ISBN10: true,
                                                description: true,
                                                image: true,
                                                UserBooks: {
                                                    select: {
                                                        id: true,
                                                        wishlist: true,
                                                        owned: true,
                                                        booksId: true,
                                                        userId: true,
                                                        rating: true,
                                                        review: true,
                                                        LendingTable: true,
                                                        User: true,
                                                    },
                                                },
                                                Discussions: true,
                                                Activity: true,
                                            },
                                        },
                                        User: true,
                                    },
                                },
                            },
                        })];
                case 1:
                    newBook = _b.sent();
                    if (!newBook) {
                        newBook = prismaClient_1.default.books.create({
                            data: {
                                title: title,
                                subTitle: subTitle,
                                pubDate: pubDate,
                                pageCount: pageCount,
                                author: author,
                                selfLink: book.selfLink,
                                description: description,
                                content: content,
                                image: image,
                                mainGenre: mainGenre,
                                buyLink: buyLink,
                                viewAbility: viewAbility,
                                rating: rating,
                                ISBN10: ISBN10,
                            },
                        });
                    }
                    return [2 /*return*/, newBook];
            }
        });
    });
};
exports.findOrCreateBookISBN = findOrCreateBookISBN;
