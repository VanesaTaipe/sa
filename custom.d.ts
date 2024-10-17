type responseItemType = {
    id: string;
    name: string;
};
type WeatherDetailType = {
    zipcode: string;
    weather: string;
    temp?: number;
};
type CityType={
    nombre:string;
    poblacion:number
}
interface WeatherQueryInterface {
    zipcode: string;
}
interface CityQueryInterface{
    nombre:string;
}
type ErrorResponse={
    status:"ERROR"
    message:string
}
type ValidacionError={
    status:"VALIDACION_ERROR"
    messages:string
}
type SuccessResponse<T> = {
    status: "SUCCESS";
    data: T;
  };
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse|ValidacionError;

declare enum OrderStatus{
    Pendieng="pendieng",
    Shipped="shipped",
    Delivered="delivered"
}
type OrderType={
    id:string;
    status:OrderStatus;
    items:string[]
}
