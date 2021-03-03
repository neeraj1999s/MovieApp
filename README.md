# MovieApp

* Description
* Technologies
* Database Schema

## Description

MovieApp is a small CRUD app that allows you to manage your movies.

## Technologies

* Front End
	* React
* Back End 
	* Flask RESTful
* Database
	* MariaDB

## Database Schema

### Categories Table

| Field | Type         | Null | KEY     | Default | Extra          |
|-------|--------------|------|---------|---------|----------------|
| id    | int          | no   | primary |         | auto_increment |
| name  | varchar(100) | no   |         |         | unique         |

### Movies Table

| Field       | Type         | Null | KEY     | Default     | Extra          |
|-------------|--------------|------|---------|-------------|----------------|
| id          | int          | no   | primary |             | auto_increment |
| title       | varchar(100) | no   |         |             | unique         |
| image       | varchar(100) | no   |         | default.png |                |
| rating      | float        | no   |         |             |                |
| category_id | int          | no   | foreign |             |                |
