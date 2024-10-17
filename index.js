var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { routeHello, routeAPINames, routeWeather, routeCyty, routeCities, routeOrder } from './routes.js';
import express from "express";
const server = express();
const port = 3000;
server.get("/hello", function (_req, res) {
    const response = routeHello();
    res.send(response);
});
server.get("/api/names", function (_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield routeAPINames();
            if (typeof response === 'string') {
                res.send(response);
            }
            else {
                // Si es un ErrorResponse, enviamos un estado 500 con el mensaje de error
                res.status(500).json(response);
            }
        }
        catch (err) {
            console.error("Unexpected error in /api/names route:", err);
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    });
});
server.get("/api/weather/:zipcode", function (req, res) {
    const response = routeWeather({ zipcode: req.params.zipcode });
    res.send(response);
});
server.get("/api/city/:nombre", function (req, res) {
    console.log(`Recibida petición para ciudad: ${req.params.nombre}`);
    const response = routeCyty({ nombre: req.params.nombre });
    console.log('Respuesta:', response);
    res.send(response);
});
server.get("/cities", function (req, res) {
    const response = routeCities();
    res.json(response);
});
4;
server.get("/api/orders", function (req, res) {
    const response = routeOrder();
    res.json(response);
});
server.listen(port, function () {
    console.log("Listening on " + port);
});
