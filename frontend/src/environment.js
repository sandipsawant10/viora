let isProd = false;

const server = isProd
  ? "https://viora-backend.onrender.com"
  : "http://localhost:3000";

export default server;
