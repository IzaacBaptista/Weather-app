# **Weather App**

> Um projeto para previsão do tempo com backend em Laravel, frontend em React e containerização com Docker.

---

## **Descrição do Projeto**

Este projeto é um sistema completo para previsão do tempo, incluindo busca de condições climáticas de cidades, comparação entre cidades e salvamento de consultas no banco de dados. Ele foi desenvolvido utilizando **Laravel** para o backend, **React** para o frontend e **Docker** para facilitar a configuração do ambiente.

### **Principais Funcionalidades**

- Consultar previsão do tempo por cidade ou CEP.
- Comparar condições meteorológicas entre duas cidades.
- Salvar consultas como favoritas.
- Visualizar histórico de previsões.

---

## **Motivação e Organização do Projeto**

A organização dos arquivos e o design do sistema seguem princípios de **Clean Code** e **Clean Architecture** para garantir um código claro, escalável e fácil de manter.

### **Backend (Laravel)**

#### **Padrão de Repositórios**

- Separação entre lógica de negócios (**Services/Repositories**) e lógica de persistência (**Models**).
- Facilita manutenção e substituição de implementações no futuro.

#### **Controllers Leves**

- Controllers minimalistas que delegam as operações ao **Service Layer** e **Repository Layer**.
- Centralização de regras de negócios no repositório, promovendo reutilização de código.

#### **Padrões e Estrutura**

- **Migration**: Cada tabela tem uma migration dedicada para facilitar rastreamento de mudanças no banco.
- **Validation**: Regras de validação aplicadas nos Controllers para garantir integridade dos dados.

#### **API RESTful**

- Rotas bem definidas para manter o padrão REST, como:
  - `/weather`: Previsões do tempo.
  - `/forecast-comparisons`: Comparações meteorológicas.

---

### **Frontend (React)**

#### **Componentização**

- Divisão do frontend em componentes reutilizáveis como `WeatherCard`, `CityCard` e `ComparisonCard`.
- **Props e State**: Uso extensivo de `props` e `useState` para gerenciar dados entre os componentes.

#### **Estilo Responsivo**

- CSS organizado por páginas e componentes (`HomePage.css`, `ComparePage.css`) para manter separação de estilos.
- Design adaptado para desktop e dispositivos móveis.

#### **Integração com Backend**

- Configuração de uma variável de ambiente `REACT_APP_API_URL` para gerenciar URLs da API.

#### **Limpeza de Código**

- Funções reutilizáveis para filtros (`handleChange`, `limparFiltros`).
- Componentes desacoplados para evitar duplicação de código.

---

### **Docker**

#### **Ambiente Padronizado**

- Configurado para rodar o backend (PHP-Laravel), frontend (React) e banco de dados (MySQL) em containers separados.
- Facilita o setup em qualquer máquina, reduzindo problemas de configuração.

#### **Estrutura**

- **Backend**: PHP 8.0 com dependências do Laravel.
- **Frontend**: Node.js 16 para rodar o React.
- **Database**: MySQL 8.0 com volumes persistentes para dados.

#### **Rede Docker**

- Todos os containers estão conectados a uma rede Docker chamada `weather-network`, permitindo comunicação direta entre eles.

---

## **Padrões de Código**

### **Clean Code**

- Código organizado em métodos pequenos e autossuficientes.
- Nomes de variáveis e funções descritivos.
- Eliminação de duplicação de código.

### **Arquitetura em Camadas**

- Divisão entre **Controller**, **Service**, e **Repository** para responsabilidades bem definidas.

---

## **Tecnologias Utilizadas**

### **Backend**

- **Laravel**: Framework PHP para construção de APIs RESTful.
- **MySQL**: Banco de dados relacional.
- **Carbon**: Biblioteca para manipulação de datas.
- **Laravel Observers**: Para atualização automática de dados.

### **Frontend**

- **React**: Biblioteca JavaScript para interfaces.
- **Axios**: Para requisições HTTP.
- **CSS3**: Para estilização responsiva.

### **DevOps**

- **Docker**: Para containerização.
- **Adminer**: Interface para gerenciar o banco de dados MySQL.
- **Git**: Controle de versão.

---

## **Como Rodar o Projeto**

### **Pré-requisitos**

- Docker e Docker Compose instalados.

### **Instruções**

1. Clone o repositório:

   ```bash
   git clone https://github.com/IzaacBaptista/Weather-app.git

2. Suba os containers:

   ```bash
   cd weather-app/docker
   
   docker-compose up -d

3. Acesse o frontend:

    ```bash
    Abra http://localhost:3000 no navegador.

4. Gerenciar banco:

    ```bash
    Acesse o Adminer em http://localhost:8081
