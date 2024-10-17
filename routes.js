var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
const routeHello = () => ({
    status: "SUCCESS",
    data: "Hello World"
});
const routeAPINames = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://www.usemodernfullstack.dev/api/v1/users";
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const data = (yield response.json());
        const names = data
            .map((item) => `id: ${item.id}, name: ${item.name}`)
            .join("<br>");
        return {
            status: "SUCCESS",
            data: names
        };
    }
    catch (err) {
        console.error("Error fetching SPI names:", err);
        return {
            status: "ERROR",
            message: `Error fetching API names: ${err instanceof Error ? err.message : String(err)}`
        };
    }
});
function processData(data) {
    return data;
}
const routeWeather = (query) => queryWeatherData(query);
const queryWeatherData = (query) => {
    const { zipcode } = query;
    if (zipcode.toString().length === 5) {
        return {
            status: "SUCCESS",
            data: {
                zipcode,
                weather: "sunny",
                temp: 35
            }
        };
    }
    else {
        console.error("Error: El código postal debe tener exactamente 5 dígitos");
        return {
            status: "VALIDACION_ERROR",
            messages: `Error El código postal debe tener exactamente 5 dígitos S{zipcode.toString().length()}`
        };
    }
};
const routeCyty = (query) => queryCyty(query);
const queryCyty = (query) => {
    return {
        status: "SUCCESS",
        data: {
            nombre: query.nombre,
            poblacion: 8574974
        }
    };
};
const routeCities = () => {
    return {
        status: "SUCCESS",
        data: [
            { nombre: "Lima", poblacion: 8574974 },
            { nombre: "Arequipa", poblacion: 1008290 },
            { nombre: "Trujillo", poblacion: 811979 },
            { nombre: "Chiclayo", poblacion: 552508 },
            { nombre: "Piura", poblacion: 484475 }
        ]
    };
};
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pendieng"] = "pendieng";
    OrderStatus["Shipped"] = "shipped";
    OrderStatus["Delivered"] = "delivered";
})(OrderStatus || (OrderStatus = {}));
const routeOrder = () => {
    return {
        status: "SUCCESS",
        data: [
            { id: "1", status: OrderStatus.Pendieng, items: ["item1", "item2"] },
            { id: "2", status: OrderStatus.Shipped, items: ["item3"] },
            { id: "3", status: OrderStatus.Delivered, items: ["item4", "item5", "item6"] }
        ]
    };
};
export { routeHello, routeAPINames, routeWeather, routeCyty, routeCities, routeOrder, OrderStatus };
