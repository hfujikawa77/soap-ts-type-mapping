# soap-ts-type-mapping
This project verifies type mapping between numeric fields in SOAP and TypeScript.

# Setup (First time only)
```
npm install express soap
npm install --save-dev typescript ts-node @types/node @types/express
```

# How to Run
## Run the Server
```
npx ts-node server.ts
```
## Confirm WSDL and XSD
```
http://localhost:8000/wsdl?wsdl
http://localhost:8000/test-schema.xsd
```
## Run the Client
```
npx ts-node client.ts
```