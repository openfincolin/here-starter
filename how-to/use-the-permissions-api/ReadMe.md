
# Entitlements API Starter

## Welcome to the Entitlements API How To

This how to provides an example of how to query the Entitlements api provided by the Here platform.

## Running the Sample

To run this sample you can

- Clone this repo and follow the instructions below. This will let you customise the sample.

## Getting Started

1. Install the dependencies.

```shell
npm install
```

2. Provide domain (without the trailing "/") and api key in the code file index.ts that can be found in ./client/src. The values to provide are for the variables shown below.

```js
    const DOMAIN = <PROVIDE YOUR DOMAIN HERE. Eg. https://my-domain/com>
    const API_KEY = <PROVIDE A VALID API KEY>
```

3. To build your application please run the following command

```shell
npm run build
```

4. Run the application.

```shell
npm run start
```

5. On the application screen select any or all of the apis for which you want to produce an output and then click on the "Call API" button. In a few seconds you should see the area below the buttons populate with the requisite information.

6. The resulting json files will be automatically downloaded to your computer.
