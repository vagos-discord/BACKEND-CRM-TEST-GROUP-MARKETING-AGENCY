/*
Módulo: MÓDULO 1: Pipeline de Ventas & Oportunidades
Objetivo: Crear las tablas necesarias para soportar el embudo de ventas.

Lógica SQL:
Tabla stages (id INT PK, name VARCHAR, order_index INT).
Tabla deals 
(id UUID PK, title VARCHAR, amount DECIMAL(12,2), contact_id UUID, stage_id INT FK -> 
stages.id, assigned_to UUID FK -> users.id, created_at TIMESTAMP)

Semilla con etapas por defecto: Prospecto, Contactado, Propuesta, Cierre.
*/

-- 1. Tabla de etapas del embudo
CREATE TABLE IF NOT EXISTS stages (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    order_index INT NOT NULL
);

-- 2. Tabla de oportunidades/ventas
CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(12,2),
    contact_id UUID,
    stage_id INT REFERENCES stages(id),
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Semilla con etapas por defecto
INSERT INTO stages (id, name, order_index) VALUES
    (1, 'Prospecto', 1),
    (2, 'Contactado', 2),
    (3, 'Propuesta', 3),
    (4, 'Cierre', 4)
ON CONFLICT (id) DO NOTHING;