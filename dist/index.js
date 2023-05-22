var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express2 = __toESM(require("express"));
var import_dotenv2 = __toESM(require("dotenv"));
var import_cors = __toESM(require("cors"));

// src/routes.ts
var import_express = __toESM(require("express"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = __toESM(require("dotenv"));

// src/utils/justify.ts
function justify(textToJustify, limitLength) {
  const spaceNewLine = RegExp("(?:\\.)(\\s\\n|\\n\\s)", "g");
  const multiSpace = RegExp("(\\n\\s{1,})", "g");
  const endOfLine = RegExp(".$");
  let newTextToJustify = textToJustify.toString().replace(spaceNewLine, ".\n").replace(multiSpace, "\n");
  let stringToLimitLength = RegExp("(?:\\s|^)(.{1," + limitLength + "})(?=\\s|$)", "g");
  let resultWithLimitLength = [];
  let textJustified = [];
  let line;
  while ((line = stringToLimitLength.exec(newTextToJustify)) !== null) {
    resultWithLimitLength.push(line[1]);
  }
  ;
  for (let i = 0; i < resultWithLimitLength.length - 1; i++) {
    let result = resultWithLimitLength[i];
    if (endOfLine.exec(result)[0] !== ".") {
      if (result.indexOf(" ") !== -1) {
        while (result.length < limitLength) {
          for (let j = 0; j < result.length - 1; j++) {
            if (result[j] == " ") {
              result = result.substring(0, j) + " " + result.substring(j);
              if (result.length == limitLength)
                break;
              while (result[j] == " ")
                j++;
            }
          }
        }
      }
    }
    textJustified.push(result);
  }
  textJustified.push(resultWithLimitLength[resultWithLimitLength.length - 1]);
  return textJustified.join("\n");
}

// src/routes.ts
import_dotenv.default.config();
var router = import_express.default.Router();
var secret_key = process.env.SECRET_TOKEN;
var user = /* @__PURE__ */ new Map();
var wordDaily = /* @__PURE__ */ new Map();
router.post("/token", (req, res) => {
  const { email } = req.body;
  if (user.has(email)) {
    const token = user.get(email);
    res.json({ token });
  } else {
    const token = import_jsonwebtoken.default.sign({ email }, secret_key);
    user.set(email, token);
    res.json({ token });
  }
});
function autoriseToken(req, res, next) {
  const token = req.headers.authorization;
  import_jsonwebtoken.default.verify(token, secret_key, (err) => {
    if (err) {
      res.status(401).json({ message: "invalid access" });
    } else {
      next();
    }
  });
}
function wordLimit(limit) {
  return function(req, res, next) {
    const textToJustify = req.body;
    const numberOfWords = textToJustify.split(" ").length;
    const currentDate = (/* @__PURE__ */ new Date()).toLocaleDateString();
    if (wordDaily.has(currentDate)) {
      const currentWord = wordDaily.get(currentDate);
      const totalWord = currentWord + numberOfWords;
      if (totalWord > limit) {
        return res.status(402).json({ message: "Payment Required" });
      }
      wordDaily.set(currentDate, totalWord);
    } else {
      wordDaily.set(currentDate, 0);
    }
    next();
  };
}
router.post("/justify", import_express.default.text(), autoriseToken, wordLimit(8e4), (req, res) => {
  const textToJustify = req.body;
  const justifiedText = justify(textToJustify, 80);
  res.type("text/plain");
  res.send(justifiedText);
});
var routes_default = router;

// src/index.ts
import_dotenv2.default.config();
var app = (0, import_express2.default)();
var port = parseInt(process.env.PORT);
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use("/api", routes_default);
app.listen(port, () => {
  console.log(`Serveur en cours sur le port ${port}`);
});
