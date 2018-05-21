export default {
  context: {
    title: 'NuaaOversea',
  },
  plugins: ['umi-plugin-dva'],
  pages: {
    '/profile': { Route: './src/routes/PrivateRoute.js' },
    '/case_report': { Route: './src/routes/PrivateRoute.js' },
    '/user_report': { Route: './src/routes/PrivateRoute.js' },
  },
}
