import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'http://localhost:5000'; // Your backend server URL

const proxy = createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/dashboard': '', // Remove the /api/dashboard prefix
  },
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
  });
};
