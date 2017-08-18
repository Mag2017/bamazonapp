DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;
DROP TABLE IF EXISTS products;
CREATE TABLE products (

item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR (100)NULL,
department_name VARCHAR (100) NULL,
price DECIMAL(10,2)NULL,
stock_quantity DECIMAL(10,4) NULL,
PRIMARY KEY (item_id)
 );
 
select * from products;
insert intoproducts  products(item_id,product_name,department_name,price,stock_quantity) VALUES (01,"Echo dot","Electronics", 49.99,50);

    

