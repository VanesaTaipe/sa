import { routeHello, routeAPINames, routeWeather,routeCyty, routeCities,routeOrder,OrderStatus } from './routes'
import express, { Request, Response } from "express";
const server = express();
const port = 3000;
server.get("/hello", function (_req: Request, res: Response): void {
const response = routeHello();
res.send(response);
});
server.get("/api/names", async function (_req: Request, res: Response): Promise<void> {
    try {
      const response = await routeAPINames();
      if (typeof response === 'string') {
        res.send(response);
      } else {
        // Si es un ErrorResponse, enviamos un estado 500 con el mensaje de error
        res.status(500).json(response);
      }
    } catch (err) {
      console.error("Unexpected error in /api/names route:", err);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  });

server.get("/api/weather/:zipcode", function (req: Request, res: Response): void {
    const response = routeWeather({ zipcode: req.params.zipcode });
    res.send(response);
    });
server.get("/api/city/:nombre", function(req: Request, res: Response): void {
        console.log(`Recibida petición para ciudad: ${req.params.nombre}`);
        const response = routeCyty({ nombre: req.params.nombre });
        console.log('Respuesta:', response);
        res.send(response);
      });
server.get("/cities",function(req: Request, res: Response): void {
        const response = routeCities();
        res.json(response);
        }); 4
server.get("/api/orders", function(req: Request, res: Response): void {
          const response = routeOrder();
          res.json(response);
        });
server.listen(port, function (): void {
    console.log("Listening on " + port);
    });