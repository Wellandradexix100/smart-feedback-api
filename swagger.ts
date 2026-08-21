
import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: 'Smart Feedback API',
        description: 'API de feedbacks integrados com IA (Gemini)'
    },
    host: 'localhost:3000'
};

const outputFile = './swagger_output.json';
const routes = ['./src/app.ts'];

swaggerAutogen(outputFile, routes, doc);
