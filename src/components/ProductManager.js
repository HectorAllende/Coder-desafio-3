// const fs = require('fs')
import { promises as fs } from 'fs';


export default class ProductManager {
    constructor() {
        this.patch = './productos.txt';
        this.products = []
    }
    static id = 0

    addProduct = async (title, description, price, imagen, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        }
        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, 'utf8')
        return JSON.parse(respuesta)
    }

    getProducts = async () => {

        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)) {
            console.log('Producto no encontrado')
        } else {
            console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Product clear")
    }

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productsModif = [
            { id, ...producto },
            ...productOld
        ]
        await fs.writeFile(this.patch, JSON.stringify(productsModif))
    }
}

const productos = new ProductManager

// productos.addProduct("title1", "description1", 1000, "Imagen1", "abc123", 5)
// productos.addProduct("title2", "description2", 2000, "Imagen2", "abc124", 10)
// productos.addProduct("title3", "description3", 3000, "Imagen3", "abc125", 1)
// productos.addProduct("title4", "description4", 3000, "Imagen4", "abc125", 16)
// productos.addProduct("title5", "description5", 3000, "Imagen5", "abc125", 14)
// productos.addProduct("title6", "description6", 3000, "Imagen6", "abc125", 13)
// productos.addProduct("title7", "description7", 3000, "Imagen7", "abc125", 152)
// productos.addProduct("title8", "description8", 3000, "Imagen8", "abc125", 154)
// productos.addProduct("title9", "description9", 3000, "Imagen9", "abc125", 155)
// productos.addProduct("title10", "description10", 3000, "Imagen10", "abc125", 165)



// productos.getProducts()
// productos.getProductsById(3)
// productos.deleteProductsById(2)

// productos.updateProducts({
//     title: 'title1',
//     description: 'description1',
//     price: 8000,
//     imagen: 'Imagen1',
//     code: 'abc123',
//     stock: 5,
//     id: 1
// })
