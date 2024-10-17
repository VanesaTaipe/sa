


const Estado={
    DISP:"Disponible",
    PRES:"Prestado",
    PROCES: "Proceso"
}

class Book{
    constructor(id,titulo,autor) {
        this.id=id,
        this.titulo=titulo,
        this.autor=autor,
        this.estado=Estado.DISP
    }
    cambiarEstado(nuevoEstado){
        if (Object.values(Estado).includes(nuevoEstado)) {
            this.estado = nuevoEstado;
        } else {
            throw new Error("Estado no válido");
        }
    }
}
class Library{
    //CONSTRUCTOR 
    constructor(){
        this.libros=[]//--> para colecccionar todo en un array
    }
    //Para simular el tiempo settimeout pero si es una restriccion puede ser promise
    agregarLibro(libro){
        return new Promise((resolve,reject)=>{
            try {
                process.nextTick(()=>
               {
                this.libros.push(libro)
                resolve(libro)
               } )
            } catch (error) {
                reject(error)
            }
        })
    }
    prestarlibro(id){
        return new Promise((resolve,reject)=>{
            const libro=this.libros.find(l=>l.id===id)
            if(libro && libro.estado===Estado.DISP){
                libro.cambiarEstado(Estado.PRES)
                resolve(libro)
            }
            else{
                reject(new Error ("El libro no esta disponible"))
            }
        })

    }
    devolverLibro(id){
        return new Promise((resolve,reject)=>{
            const libro=this.libros.find(l=>l.id===id)
            if(libro && libro.estado===Estado.PRES){
                libro.cambiarEstado(Estado.PROCES)
                resolve(libro)
            }
            else{
                reject(new Error ("El libro "))
            }
        })
    }
}

const biblioteca = new Library();
const nuevoLibro = new Book(1, "1984", "George Orwell");

async function agregarLibroABiblioteca() {
    try {
        const nuevoLibro = new Book(1, "1984", "George Orwell");
        const libroAgregado = await biblioteca.agregarLibro(nuevoLibro);
        console.log(`Libro añadido: ${libroAgregado.titulo}`);
    } catch (error) {
        console.error("Error al añadir el libro:", error);
    }
    biblioteca.prestarlibro(1)
            .then(libro => {
                console.log(`Libro prestado: ${libro.titulo}`);
                return biblioteca.devolverLibro(1);
            })
            .then(libro => {
                console.log(`Libro devuelto: ${libro.titulo}`);
            })
            .catch(err => console.error(err));
}

agregarLibroABiblioteca();


///////////////////////////////////


// Datos de ejemplo
const salesData = [
  { id: 1, date: '2024-01-15', amount: 100, category: 'Electronics' },
  { id: 2, date: '2024-01-16', amount: 200, category: 'Clothing' },
  { id: 3, date: '2024-01-17', amount: 150, category: 'Electronics' },
  { id: 4, date: '2024-01-18', amount: 300, category: 'Furniture' },
  { id: 5, date: '2024-01-19', amount: 250, category: 'Clothing' },
];

// Función para filtrar ventas
const filterSales = (sales, criteria) => {
  return sales.filter(sale => 
    (!criteria.date || sale.date === criteria.date) &&
    (!criteria.minAmount || sale.amount >= criteria.minAmount) &&
    (!criteria.maxAmount || sale.amount <= criteria.maxAmount) &&
    (!criteria.category || sale.category === criteria.category)
  );
};

// Función para transformar ventas
const transformSales = sales => {
  return sales.map(sale => ({
    ...sale,
    date: new Date(sale.date),
    taxAmount: sale.amount * 0.1
  }));
};

// Función para analizar ventas
const analyzeSales = sales => {
  const total = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const average = total / sales.length;
  const max = Math.max(...sales.map(sale => sale.amount));
  const min = Math.min(...sales.map(sale => sale.amount));

  return { total, average, max, min };
};

// Función para componer análisis
const composeAnalysis = (...functions) => {
  return data => functions.reduceRight((acc, fn) => fn(acc), data);
};

// Función para simular carga asíncrona de datos
const loadSalesData = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(salesData), 1000);
  });
};

// Demostración del sistema
const demonstrateSystem = async () => {
  try {
    const data = await loadSalesData();

    const analysis = composeAnalysis(
      analyzeSales,
      transformSales,
      sales => filterSales(sales, { minAmount: 150, category: 'Electronics' })
    );

    console.log('Análisis de ventas de Electrónica con monto >= 150:');
    console.log(await analysis(data));

    // Procesamiento en paralelo
    const categories = ['Electronics', 'Clothing', 'Furniture'];
    const parallelAnalysis = await Promise.all(
      categories.map(async category => {
        const categoryAnalysis = composeAnalysis(
          analyzeSales,
          transformSales,
          sales => filterSales(sales, { category })
        );
        return { category, analysis: await categoryAnalysis(data) };
      })
    );

    console.log('Análisis por categoría:');
    console.log(parallelAnalysis);

  } catch (error) {
    console.error('Error:', error.message);
  }
};

demonstrateSystem();
/////////////////////



// Definición de tipos
type TaskStatus = 'pending' | 'in-progress' | 'completed';

interface Task<T> {
  id: string;
  description: string;
  status: TaskStatus;
  result: T | null;
}

// Tipo utilitario para extraer T de Task<T>
type TaskResult<T> = T extends Task<infer R> ? R : never;

// Clase TaskManager<T>
class TaskManager<T> {
  private tasks: Map<string, Task<T>> = new Map();

  async addTask(description: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.tasks.set(id, { id, description, status: 'pending', result: null });
        resolve(id);
      }, 100);
    });
  }

  async startTask(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = this.tasks.get(id);
        if (!task) {
          reject(new Error('Task not found'));
        } else if (task.status !== 'pending') {
          reject(new Error('Task is not pending'));
        } else {
          task.status = 'in-progress';
          resolve();
        }
      }, 100);
    });
  }

  async completeTask(id: string, result: T): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = this.tasks.get(id);
        if (!task) {
          reject(new Error('Task not found'));
        } else if (task.status !== 'in-progress') {
          reject(new Error('Task is not in progress'));
        } else {
          task.status = 'completed';
          task.result = result;
          resolve();
        }
      }, 100);
    });
  }

  async getTaskStatus(id: string): Promise<TaskStatus> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = this.tasks.get(id);
        if (!task) {
          reject(new Error('Task not found'));
        } else {
          resolve(task.status);
        }
      }, 100);
    });
  }
}

// Demostración del sistema
async function demoTaskManager() {
  const taskManager = new TaskManager<string>();

  try {
    // Añadir tareas
    const task1Id = await taskManager.addTask('Completar informe');
    const task2Id = await taskManager.addTask('Revisar código');

    // Iniciar una tarea
    await taskManager.startTask(task1Id);
    console.log(`Task ${task1Id} status:`, await taskManager.getTaskStatus(task1Id));

    // Completar una tarea
    await taskManager.completeTask(task1Id, 'Informe completado');
    console.log(`Task ${task1Id} status:`, await taskManager.getTaskStatus(task1Id));

    // Intentar iniciar una tarea completada
    try {
      await taskManager.startTask(task1Id);
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }

    // Intentar completar una tarea no iniciada
    try {
      await taskManager.completeTask(task2Id, 'Revisión completada');
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }

    // Intentar obtener el estado de una tarea inexistente
    try {
      await taskManager.getTaskStatus('non-existent-id');
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }

  } catch (error) {
    console.error('Unexpected error:', (error as Error).message);
  }
}

demoTaskManager();////////




// Definición de tipos
interface Venta {
  id: string;
  fecha: Date;
  clienteId: string;
  productos: {
    productoId: string;
    cantidad: number;
    precioUnitario: number;
  }[];
  total: number;
}

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  tipoCliente: 'regular' | 'premium';
}

interface Producto {
  id: string;
  nombre: string;
  categoria: 'electronica' | 'ropa' | 'alimentos';
  precio: number;
  stock: number;
}

// Tipos unión para categorías de productos y tipos de ventas
type CategoriaProducto = 'electronica' | 'ropa' | 'alimentos';
type TipoVenta = 'online' | 'tiendaFisica';

// Tipo genérico para representar informes
type Informe<T> = {
  fecha: Date;
  datos: T;
};

// Función genérica para analizar datos
function analizarDatos<T extends Venta | Cliente | Producto>(datos: T[]): Informe<T[]> {
  return {
    fecha: new Date(),
    datos: datos
  };
}

// Funciones de análisis
function calcularTotalVentas(ventas: Venta[]): number {
  return ventas.reduce((total, venta) => total + venta.total, 0);
}

function obtenerProductosMasVendidos(ventas: Venta[], limite: number = 5): { productoId: string; cantidadTotal: number }[] {
  const productoVentas = ventas.flatMap(venta => venta.productos);
  const ventasPorProducto = productoVentas.reduce((acc, { productoId, cantidad }) => {
    acc[productoId] = (acc[productoId] || 0) + cantidad;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(ventasPorProducto)
    .map(([productoId, cantidadTotal]) => ({ productoId, cantidadTotal }))
    .sort((a, b) => b.cantidadTotal - a.cantidadTotal)
    .slice(0, limite);
}

function obtenerClientesFrecuentes(ventas: Venta[], clientes: Cliente[], limite: number = 5): { cliente: Cliente; cantidadCompras: number }[] {
  const comprasPorCliente = ventas.reduce((acc, venta) => {
    acc[venta.clienteId] = (acc[venta.clienteId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(comprasPorCliente)
    .map(([clienteId, cantidadCompras]) => ({
      cliente: clientes.find(c => c.id === clienteId)!,
      cantidadCompras
    }))
    .sort((a, b) => b.cantidadCompras - a.cantidadCompras)
    .slice(0, limite);
}

// Tipos avanzados y utility types
type SoloLectura<T> = {
  readonly [K in keyof T]: T[K];
};

type InformeTipo<T> = T extends Venta ? 'ventas' :
                      T extends Cliente ? 'clientes' :
                      T extends Producto ? 'productos' :
                      never;

type FiltroVentas = Partial<Pick<Venta, 'fecha' | 'clienteId'>>;
type FiltroProductos = Partial<Pick<Producto, 'categoria' | 'precio'>>;

// Narrowing y type guards
function esVenta(item: Venta | Cliente | Producto): item is Venta {
  return 'total' in item;
}

function esProductoElectronico(producto: Producto): producto is Producto & { categoria: 'electronica' } {
  return producto.categoria === 'electronica';
}

function procesarProducto(producto: Producto) {
  if (esProductoElectronico(producto)) {
    console.log(`Producto electrónico: ${producto.nombre}`);
  } else {
    console.log(`Producto no electrónico: ${producto.nombre}`);
  }
}

// Ejemplo de uso
const ventas: Venta[] = [
  {
    id: 'v1',
    fecha: new Date('2024-01-15'),
    clienteId: 'c1',
    productos: [{ productoId: 'p1', cantidad: 2, precioUnitario: 100 }],
    total: 200
  },
  // ... más ventas
];

const clientes: Cliente[] = [
  { id: 'c1', nombre: 'Juan Pérez', email: 'juan@email.com', tipoCliente: 'regular' },
  // ... más clientes
];

const productos: Producto[] = [
  { id: 'p1', nombre: 'Smartphone', categoria: 'electronica', precio: 500, stock: 10 },
  // ... más productos
];

// Demostración del sistema
console.log('Total de ventas:', calcularTotalVentas(ventas));
console.log('Productos más vendidos:', obtenerProductosMasVendidos(ventas));
console.log('Clientes frecuentes:', obtenerClientesFrecuentes(ventas, clientes));

const informeVentas = analizarDatos(ventas);
console.log('Tipo de informe:', InformeTipo<typeof informeVentas.datos[0]>);

const filtroVentas: FiltroVentas = { fecha: new Date('2024-01-15') };
const ventasFiltradas = ventas.filter(venta => 
  (!filtroVentas.fecha || venta.fecha.getTime() === filtroVentas.fecha.getTime()) &&
  (!filtroVentas.clienteId || venta.clienteId === filtroVentas.clienteId)
);
console.log('Ventas filtradas:', ventasFiltradas);

productos.forEach(procesarProducto);
