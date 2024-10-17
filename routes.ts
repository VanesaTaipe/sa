import fetch from "node-fetch";

const routeHello = (): ApiResponse <string> => ({
  status:"SUCCESS",
  data:"Hello World"
});
const routeAPINames = async (): Promise<ApiResponse<string>> => {
const url = "https://www.usemodernfullstack.dev/api/v1/users";
    try {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`HTTP error ${response.status}`);  
    }
    const data = (await response.json()) as responseItemType[];
    const names = data
     .map((item) => `id: ${item.id}, name: ${item.name}`)
     .join("<br>");
    return {
      status:"SUCCESS",
      data:names
    };
    } catch (err) {
        console.error("Error fetching SPI names:",err)
        return {
            status:"ERROR",
            message: `Error fetching API names: ${err instanceof Error ? err.message : String(err)}`
        }
}
};

function processData<T>(data: T): T {
  return data;
}

const routeWeather = (query: WeatherQueryInterface):ApiResponse<WeatherDetailType>=>
queryWeatherData(query);

const queryWeatherData = (query: WeatherQueryInterface):ApiResponse< WeatherDetailType> => {
 const {zipcode}=query
 if (zipcode.toString().length === 5) {
    return {
      status:"SUCCESS",
      data:{
        zipcode,
        weather: "sunny",
        temp: 35
      }
     
    };
  } else {
    console.error("Error: El código postal debe tener exactamente 5 dígitos");
    return{
        status:"VALIDACION_ERROR",
        messages:`Error El código postal debe tener exactamente 5 dígitos S{zipcode.toString().length()}`
    }
  }
};


const routeCyty=(query:CityQueryInterface):ApiResponse<CityType>=>
    queryCyty(query);

const queryCyty=(query:CityQueryInterface):ApiResponse<CityType>=>
{
    return {
        status:"SUCCESS",
        data:{
          nombre:query.nombre,
          poblacion:8574974
        }
    }
}
const routeCities = ():ApiResponse<CityType[]> => {
    return {

      status:"SUCCESS",
      data:[ 
        { nombre: "Lima", poblacion: 8574974 },
        { nombre: "Arequipa", poblacion: 1008290 },
        { nombre: "Trujillo", poblacion: 811979 },
        { nombre: "Chiclayo", poblacion: 552508 },
        { nombre: "Piura", poblacion: 484475 }
      ]
   
    }
    
  };
enum OrderStatus{
    Pendieng="pendieng",
    Shipped="shipped",
    Delivered="delivered"
}
const routeOrder=():ApiResponse<OrderType[]>|OrderStatus=>{
  return{
    status:"SUCCESS",
    data: [
      { id: "1", status: OrderStatus.Pendieng, items: ["item1", "item2"] },
      { id: "2", status: OrderStatus.Shipped, items: ["item3"] },
      { id: "3", status: OrderStatus.Delivered, items: ["item4", "item5", "item6"] }
    ]
  }
}
export { routeHello, routeAPINames, routeWeather,routeCyty,routeCities,routeOrder,OrderStatus};