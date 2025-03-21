import express from "express";
import * as soap from "soap";
import fs from "fs";
import path from "path";

// サーバーポート
const PORT = 8000;

// WSDL の読み込み
const wsdlFilePath = path.join(__dirname, "test-service.wsdl");
const wsdl = fs.readFileSync(wsdlFilePath, "utf8");

// サービス実装
const service = {
    TestService: {
        TestServicePort: {
            GetNumbers: (args: { longValue: number; intValue: number }) => { // これはOK
            // GetNumbers: (args: { longValue: bigint; intValue: number }) => { // これはNG    

                console.log("Received request:", args);
                try {
                    const response = {
                        longValue: args.longValue + 1, // これはOK
                        // longValue: args.longValue + BigInt(1), // これはNG
                        intValue: args.intValue + 1
                    };

                    console.log("Sending response:", response);
                    return response;

                } catch (err) {
                    // SOAP Fault を明示的に返す
                    console.error("GetNumbers の処理中にエラーが発生しました:", err);
                    throw {
                        Fault: {
                            faultcode: "SOAP-ENV:Server",
                            faultstring: "InternalServerError: " + (err as Error).message,
                        }
                    };
                }
            }
        }
    }
};


const app = express();
const server = app.listen(PORT, () => {
    console.log(`SOAP server listening on http://localhost:${PORT}/wsdl?wsdl`);
});

// WSDL ファイルの提供
app.get("/test-schema.xsd", (req, res) => {
    res.setHeader("Content-Type", "application/xml");
    res.sendFile(path.join(__dirname, "test-schema.xsd"));
});

const wsdlUrl = "/wsdl";
soap.listen(server, wsdlUrl, service, wsdl);
