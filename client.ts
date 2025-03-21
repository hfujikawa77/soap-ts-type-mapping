import * as soap from "soap";

const wsdlUrl = "http://localhost:8000/wsdl?wsdl";

soap.createClient(wsdlUrl, (err: Error | null, client?: soap.Client) => {
    if (err) {
        console.error("SOAP Client Error:", err);
        return;
    }

    console.log("Available methods:", client?.describe());

    if (!client?.TestService?.TestServicePort?.GetNumbers) {
        console.error("Error: GetNumbers method not found!");
        return;
    }

    const requestData = {
        longValue: 1234567890123,
        intValue: 42,
    };

    console.log("Sending request:", requestData);

    client.TestService.TestServicePort.GetNumbers(requestData, (err: any, result: any) => {
        if (err) {
            console.error("SOAP Call Error:", err);
            return;
        }
        console.log("SOAP Response:", result);
    });
});
