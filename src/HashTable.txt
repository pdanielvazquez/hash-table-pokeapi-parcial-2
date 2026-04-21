// Definición la clase HashTable, que implementa una tabla hash con chainning para resolver colisiones

export class HashTable {
    constructor(size) {
        this.size = size;
        this.length = 0;
        this.load_ptc = 0;
        this.table = new Array(size);
    }

    // Función hash que convierte una clave en un índice de la tabla
    hash = (key) => {
        return key % this.size;
    }

    // Función para insertar un elemento en la tabla
    insert = (key, value) => {
        const index = this.hash(key);
        // Validar si el bucket ya cuenta con la clave
        if (this.search(key)) return; 
        // Si no hay elementos en ese índice, crear una nueva lista para almacenar los elementos
        if (!this.table[index]) {
            this.table[index] = [];
        }
        // Agregar el nuevo elemento a la lista del bucket correspondiente
        this.table[index].push({ key, value });
        this.length++;
        this.load_ptc = this.length / this.size;
        // Si el porcentaje de carga es mayor al 0.7, realizar rehashing para aumentar el tamaño de la tabla
        if (this.load_ptc > 0.7) {
            this.rehash();
        }
    }

    // Función para buscar un elemento en la tabla a partir de su clave
    search = (key) => {
        // Obtener el índice de la tabla a partir de la clave usando la función hash
        const index = this.hash(key);
        // Si hay elementos en ese índice, recorrer la lista de
        //  elementos para encontrar el que tenga la clave buscada
        if (this.table[index]) {
            // Si se encuentra el elemento con la clave buscada, devolver su valor, de lo contrario devolver null
            return this.table[index].find(el => el.key === key) ? true : false;
        }
        return null;
    }

    // Función de rehashing para aumentar el tamaño de la tabla y reducir la carga
    rehash = () => {
        // Copia de la tabla original
        const oldTable = this.table;
        // Aumentar el tamaño de la tabla al doble
        this.size *= 2;
        // Reiniciar la longitud y el porcentaje de carga
        this.length = 0;
        this.load_ptc = 0;
        // Crear una nueva tabla con el nuevo tamaño
        this.table = new Array(this.size);
        for (let i = 0; i < oldTable.length; i++) {
            if (oldTable[i]) {
                for (let j = 0; j < oldTable[i].length; j++) {
                    this.insert(oldTable[i][j].key, oldTable[i][j].value);
                }
            }
        }
        // Devolver la nueva tabla después del rehashing
        return this.table;
    }
}