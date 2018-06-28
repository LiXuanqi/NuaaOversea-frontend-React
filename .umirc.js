export default {
  context: {
    title: 'NuaaOversea',
  },
  plugins: ['umi-plugin-dva'],
  pages: {
    '/profile': { Route: './src/routes/PrivateRoute.jsx' },
    '/case_report': { Route: './src/routes/PrivateRoute.jsx' },
    '/user_report': { Route: './src/routes/PrivateRoute.jsx' },
  },
}
