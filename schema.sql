-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'vendedor',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Etapas del Pipeline
CREATE TABLE IF NOT EXISTS etapas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    orden INT NOT NULL
);

-- Insertar etapas por defecto
INSERT INTO etapas (nombre, orden) VALUES 
('Prospecto', 1),
('Contacto Inicial', 2),
('Propuesta Enviada', 3),
('Ganado', 4),
('Perdido', 5)
ON CONFLICT DO NOTHING;

-- Tabla de Contactos / Leads
CREATE TABLE IF NOT EXISTS contactos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    empresa VARCHAR(100),
    monto_estimado DECIMAL(10, 2) DEFAULT 0.00,
    etapa_id INT REFERENCES etapas(id) ON DELETE SET NULL,
    usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Notas / Historial
CREATE TABLE IF NOT EXISTS notas (
    id SERIAL PRIMARY KEY,
    contacto_id INT REFERENCES contactos(id) ON DELETE CASCADE,
    contenido TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);