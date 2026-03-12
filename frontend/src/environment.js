let isProd = true;

const server = isProd
  ? "http://localhost:8000"
  : "https://viora-backend.onrender.com";

export default server;
